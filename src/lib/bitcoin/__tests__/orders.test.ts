import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cancelOrder,
  createOrder,
  findLatestOrderForCart,
  findPendingOrderForCart,
  getOrder,
  markOrderPaid,
} from "../orders";
import { settleOrderIfPaid } from "../settle";
import {
  type FakeLnurlServer,
  startFakeLnurlServer,
} from "./fake-lnurl-server";

const CART_ID = "cart_local_test_1";

function orderInput() {
  return {
    cartId: CART_ID,
    email: "5tan@altradits.com",
    items: [
      {
        name: "Chelbesa 250g",
        quantity: 2,
        unitPrice: "$21.00",
        total: "$42.00",
      },
    ],
    fiatTotalCents: 4250,
    currency: "USD",
    sats: 42_500,
    btcUsdRate: 100_000,
    rateSource: "owner" as const,
    lightningAddress: "shop@example.com",
    invoice: "lnbc425000n1test",
    paymentHash: null,
    verifyUrl: null,
  };
}

let dir = "";
let server: FakeLnurlServer | null = null;

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "kabuna-orders-"));
  vi.stubEnv("KABUNA_ORDER_DIR", dir);
});

afterEach(async () => {
  vi.unstubAllEnvs();
  if (server) {
    await server.close();
    server = null;
  }
  await rm(dir, { recursive: true, force: true });
});

describe("order store", () => {
  it("round-trips an order and returns null for unknown or hostile ids", async () => {
    const created = await createOrder(orderInput());
    expect(created.status).toBe("pending");
    expect(created.shippingAddress).toBeNull();
    const loaded = await getOrder(created.id);
    expect(loaded).toMatchObject({ id: created.id, sats: 42_500 });
    expect(await getOrder("kbn_missing")).toBeNull();
    expect(await getOrder("../kabuna")).toBeNull();
  });

  it("finds the live pending order for a cart, newest paid-or-pending overall", async () => {
    const first = await createOrder(orderInput());
    expect(await findPendingOrderForCart(CART_ID)).toMatchObject({
      id: first.id,
    });
    await markOrderPaid(first.id);
    expect(await findPendingOrderForCart(CART_ID)).toBeNull();
    // A second cart payment mints a new order; the latest lookup prefers it
    // while pending, and the paid one stays answered as paid.
    const second = await createOrder(orderInput());
    expect(await findLatestOrderForCart(CART_ID)).toMatchObject({
      id: second.id,
    });
    await cancelOrder(second.id);
    expect(await findLatestOrderForCart(CART_ID)).toMatchObject({
      id: first.id,
    });
    expect(await findLatestOrderForCart("cart_other")).toBeNull();
  });

  it("markOrderPaid flips once and never resurrects finished orders", async () => {
    const order = await createOrder(orderInput());
    const first = await markOrderPaid(order.id, "preimage");
    expect(first).toMatchObject({ flipped: true });
    expect(first.order?.status).toBe("paid");
    expect(first.order?.preimage).toBe("preimage");
    const second = await markOrderPaid(order.id);
    expect(second.flipped).toBe(false);

    const cancelled = await createOrder({
      ...orderInput(),
      cartId: "cart_other",
    });
    await cancelOrder(cancelled.id);
    expect((await markOrderPaid(cancelled.id)).flipped).toBe(false);
  });
});

describe("paid only after verify says settled", () => {
  it("stays pending while verify says pending, flips once it says settled", async () => {
    server = await startFakeLnurlServer({ settleAfterPolls: 1 });
    const { requestLnurlInvoice } = await import("../lnurl");
    const invoice = await requestLnurlInvoice(server.payUrl, 5000, undefined, {
      allowInsecure: true,
    });
    const order = await createOrder({
      ...orderInput(),
      sats: 5000,
      invoice: invoice.pr,
      paymentHash: invoice.paymentHash,
      verifyUrl: invoice.verifyUrl,
    });

    const pending = await settleOrderIfPaid(order.id, { allowInsecure: true });
    expect(pending.settled).toBe(false);
    expect((await getOrder(order.id))?.status).toBe("pending");

    const paid = await settleOrderIfPaid(order.id, { allowInsecure: true });
    expect(paid).toMatchObject({ settled: true, flipped: true });
    expect(paid.order?.status).toBe("paid");
    expect(paid.order?.paidAt).toBeTruthy();

    // Settling again is a no-op, not a double flip.
    const again = await settleOrderIfPaid(order.id, { allowInsecure: true });
    expect(again).toMatchObject({ settled: true, flipped: false });
  });

  it("never marks paid when the preimage proof fails", async () => {
    server = await startFakeLnurlServer({ wrongPreimage: true });
    const { requestLnurlInvoice } = await import("../lnurl");
    const invoice = await requestLnurlInvoice(server.payUrl, 5000, undefined, {
      allowInsecure: true,
    });
    const order = await createOrder({
      ...orderInput(),
      sats: 5000,
      invoice: invoice.pr,
      paymentHash: invoice.paymentHash,
      verifyUrl: invoice.verifyUrl,
    });
    await expect(
      settleOrderIfPaid(order.id, { allowInsecure: true }),
    ).rejects.toThrow(/proof doesn't match/);
    expect((await getOrder(order.id))?.status).toBe("pending");
  });

  it("never marks paid without a verify URL or when the order is gone", async () => {
    const order = await createOrder(orderInput());
    const noVerify = await settleOrderIfPaid(order.id, { allowInsecure: true });
    expect(noVerify.settled).toBe(false);
    expect((await getOrder(order.id))?.status).toBe("pending");
    expect(
      (await settleOrderIfPaid("kbn_missing", { allowInsecure: true })).settled,
    ).toBe(false);
  });
});
