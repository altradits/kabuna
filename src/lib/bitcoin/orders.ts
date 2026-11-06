/**
 * Kabuna order store (server-side).
 *
 * A small file-backed store — one JSON file per order — just enough for
 * cart → Lightning payment → confirmed order when no Spree backend is
 * running. The order is only ever marked paid after the LUD-21 verify URL
 * says settled (see the status route); the browser can never mark an
 * order paid by itself.
 *
 * This is standalone-mode persistence, not a production order system: files
 * live under KABUNA_ORDER_DIR (default .data/kabuna-orders, git-ignored)
 * and are ephemeral on serverless hosts. Spree remains the system of
 * record when a backend is configured.
 */

import { mkdir, readdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { getBitcoinConfig } from "./config";
import type { RateSource } from "./rates";

export type KabunaOrderStatus = "pending" | "paid" | "expired" | "cancelled";

export interface KabunaOrderItem {
  name: string;
  quantity: number;
  unitPrice: string;
  total: string;
  variantId?: string | null;
  thumbnailUrl?: string | null;
}

export interface KabunaOrder {
  id: string;
  number: string;
  cartId: string;
  email: string | null;
  items: KabunaOrderItem[];
  fiatTotalCents: number;
  currency: string;
  sats: number;
  btcUsdRate: number;
  rateSource: RateSource;
  lightningAddress: string;
  invoice: string | null;
  paymentHash: string | null;
  verifyUrl: string | null;
  status: KabunaOrderStatus;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  paidAt: string | null;
  preimage: string | null;
}

/** Invoice window: LNURL invoices typically expire after ~10 minutes. */
export const ORDER_TTL_MS = 10 * 60 * 1000;

const ORDER_ID_RE = /^[A-Za-z0-9_-]{1,128}$/;

function orderDir(): string {
  // The order dir is runtime data, not bundled code, so it stays out of
  // the build trace by design.
  return join(
    /*turbopackIgnore: true*/ process.cwd(),
    getBitcoinConfig().orderDir,
  );
}

function orderPath(orderId: string): string {
  if (!ORDER_ID_RE.test(orderId)) {
    throw new Error("Unknown order.");
  }
  return join(orderDir(), `${orderId}.json`);
}

export function newOrderId(): string {
  const time = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 10);
  return `kbn_${time}_${rand}`;
}

export function newOrderNumber(): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `KBN-${rand}`;
}

export function isOrderOverdue(order: KabunaOrder, now = Date.now()): boolean {
  return Date.parse(order.expiresAt) <= now;
}

export async function saveOrder(order: KabunaOrder): Promise<void> {
  const dir = orderDir();
  await mkdir(dir, { recursive: true });
  const path = orderPath(order.id);
  const tmp = `${path}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(order, null, 2), "utf8");
  await rename(tmp, path);
}

export async function getOrder(orderId: string): Promise<KabunaOrder | null> {
  try {
    const raw = await readFile(orderPath(orderId), "utf8");
    const order = JSON.parse(raw) as KabunaOrder;
    if (!order || order.id !== orderId || typeof order.status !== "string") {
      return null;
    }
    return order;
  } catch {
    return null;
  }
}

export interface CreateOrderInput {
  cartId: string;
  email: string | null;
  items: KabunaOrderItem[];
  fiatTotalCents: number;
  currency: string;
  sats: number;
  btcUsdRate: number;
  rateSource: RateSource;
  lightningAddress: string;
  invoice: string | null;
  paymentHash: string | null;
  verifyUrl: string | null;
}

export async function createOrder(
  input: CreateOrderInput,
): Promise<KabunaOrder> {
  const now = new Date().toISOString();
  const order: KabunaOrder = {
    id: newOrderId(),
    number: newOrderNumber(),
    cartId: input.cartId,
    email: input.email,
    items: input.items,
    fiatTotalCents: input.fiatTotalCents,
    currency: input.currency,
    sats: input.sats,
    btcUsdRate: input.btcUsdRate,
    rateSource: input.rateSource,
    lightningAddress: input.lightningAddress,
    invoice: input.invoice,
    paymentHash: input.paymentHash,
    verifyUrl: input.verifyUrl,
    status: "pending",
    createdAt: now,
    updatedAt: now,
    expiresAt: new Date(Date.now() + ORDER_TTL_MS).toISOString(),
    paidAt: null,
    preimage: null,
  };
  await saveOrder(order);
  return order;
}

/**
 * Mark an order paid. Only call this after the verify URL said settled —
 * callers must re-check server-side on every status poll. Returns the
 * order and whether this call flipped it (idempotent: already-paid
 * returns unchanged).
 */
export async function markOrderPaid(
  orderId: string,
  preimage: string | null = null,
): Promise<{ order: KabunaOrder | null; flipped: boolean }> {
  const order = await getOrder(orderId);
  if (!order) return { order: null, flipped: false };
  if (order.status === "paid") return { order, flipped: false };
  if (order.status !== "pending") return { order, flipped: false };
  if (isOrderOverdue(order)) {
    order.status = "expired";
    order.updatedAt = new Date().toISOString();
    await saveOrder(order);
    return { order, flipped: false };
  }
  order.status = "paid";
  order.paidAt = new Date().toISOString();
  order.updatedAt = order.paidAt;
  order.preimage = preimage;
  await saveOrder(order);
  return { order, flipped: true };
}

export async function cancelOrder(
  orderId: string,
): Promise<KabunaOrder | null> {
  const order = await getOrder(orderId);
  if (order?.status !== "pending") return order;
  order.status = "cancelled";
  order.updatedAt = new Date().toISOString();
  await saveOrder(order);
  return order;
}

export async function markOrderExpired(
  orderId: string,
): Promise<KabunaOrder | null> {
  const order = await getOrder(orderId);
  if (order?.status !== "pending") return order;
  order.status = "expired";
  order.updatedAt = new Date().toISOString();
  await saveOrder(order);
  return order;
}

/**
 * Find a live pending order for a cart, so retries reuse the same invoice
 * instead of minting a new one per click.
 */
export async function findPendingOrderForCart(
  cartId: string,
): Promise<KabunaOrder | null> {
  let files: string[];
  try {
    files = await readdir(orderDir());
  } catch {
    return null;
  }
  const now = Date.now();
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const order = await getOrder(file.slice(0, -".json".length));
    if (
      order &&
      order.cartId === cartId &&
      order.status === "pending" &&
      order.invoice &&
      !isOrderOverdue(order, now)
    ) {
      return order;
    }
  }
  return null;
}
