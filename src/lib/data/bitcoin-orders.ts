"use server";

import { updateTag } from "next/cache";
import { getBitcoinConfig } from "@/lib/bitcoin/config";
import { getOrder, type KabunaOrder, saveOrder } from "@/lib/bitcoin/orders";
import { settleOrderIfPaid } from "@/lib/bitcoin/settle";
import { cacheTagSuffix, clearCartCookies } from "@/lib/spree";
import { getCheckoutOrder, resolveSurfaceForCart } from "./checkout";
import { completeLocalCart, isLocalCartId } from "./local-cart";
import { actionResult, withFallback } from "./utils";

/**
 * The receipt-safe view of a Kabuna order: everything the order-placed
 * page shows, minus server internals (invoice, verify URL, preimage).
 */
export interface PublicKabunaOrder {
  id: string;
  number: string;
  email: string | null;
  shippingAddress: Record<string, unknown> | null;
  billingAddress: Record<string, unknown> | null;
  items: KabunaOrder["items"];
  fiatTotalCents: number;
  currency: string;
  sats: number;
  btcUsdRate: number;
  lightningAddress: string;
  paymentHash: string | null;
  status: KabunaOrder["status"];
  createdAt: string;
  paidAt: string | null;
}

function toPublicOrder(order: KabunaOrder): PublicKabunaOrder {
  return {
    id: order.id,
    number: order.number,
    email: order.email,
    shippingAddress: order.shippingAddress,
    billingAddress: order.billingAddress,
    items: order.items,
    fiatTotalCents: order.fiatTotalCents,
    currency: order.currency,
    sats: order.sats,
    btcUsdRate: order.btcUsdRate,
    lightningAddress: order.lightningAddress,
    paymentHash: order.paymentHash,
    status: order.status,
    createdAt: order.createdAt,
    paidAt: order.paidAt,
  };
}

export async function getKabunaOrder(
  orderId: string,
): Promise<PublicKabunaOrder | null> {
  return withFallback(async () => {
    const order = await getOrder(orderId);
    return order ? toPublicOrder(order) : null;
  }, null);
}

/**
 * Complete a Lightning-paid order: re-verify settlement server-side (fail
 * closed), snapshot the final cart addresses into the order, then close
 * the cart. Only a settled order completes — the browser claiming "paid"
 * is never enough.
 */
export async function completeBitcoinOrder(orderId: string, cartId: string) {
  return actionResult(async () => {
    const config = getBitcoinConfig();
    const { order, settled } = await settleOrderIfPaid(orderId, {
      allowInsecure: config.allowInsecureLnurl,
    });
    if (!order) {
      throw new Error("Order not found.");
    }
    if (!settled) {
      throw new Error("Payment not confirmed yet.");
    }
    const surface = await resolveSurfaceForCart(cartId);
    const cart = await getCheckoutOrder(cartId).catch(() => null);
    if (cart) {
      order.email = order.email ?? cart.email ?? null;
      if (cart.shipping_address) {
        order.shippingAddress = JSON.parse(
          JSON.stringify(cart.shipping_address),
        ) as Record<string, unknown>;
      }
      if (cart.billing_address) {
        order.billingAddress = JSON.parse(
          JSON.stringify(cart.billing_address),
        ) as Record<string, unknown>;
      }
      await saveOrder(order);
    }
    if (isLocalCartId(cartId)) {
      await completeLocalCart(cartId, surface);
    } else {
      // A Lightning payment isn't a Spree payment, so Spree can't complete
      // this cart — drop it and let the Kabuna order be the record.
      await clearCartCookies(surface).catch(() => {});
    }
    updateTag(`checkout${cacheTagSuffix(surface)}`);
    updateTag(`cart${cacheTagSuffix(surface)}`);
    return { order: toPublicOrder(order) };
  }, "Failed to complete order");
}
