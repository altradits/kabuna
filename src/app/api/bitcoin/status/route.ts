import { NextResponse } from "next/server";
import { getBitcoinConfig } from "@/lib/bitcoin/config";
import { LnurlError, pollVerify } from "@/lib/bitcoin/lnurl";
import {
  getOrder,
  isOrderOverdue,
  markOrderExpired,
  markOrderPaid,
} from "@/lib/bitcoin/orders";
import { resolveSurfaceForCart } from "@/lib/data/checkout";
import { completeLocalCart, isLocalCartId } from "@/lib/data/local-cart";
import { clearCartCookies } from "@/lib/spree";

export const runtime = "nodejs";

/**
 * GET /api/bitcoin/status?orderId=… — poll a Lightning payment.
 *
 * Verification happens here on the server on every poll: the order flips
 * to paid only when the LUD-21 verify URL says settled. The browser saying
 * "paid" never counts. Failures fail closed (still pending).
 */
export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");
  if (!orderId) {
    return NextResponse.json({ error: "Order is missing." }, { status: 400 });
  }
  const order = await getOrder(orderId);
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }
  if (order.status === "paid") {
    return NextResponse.json({
      status: "paid",
      settled: true,
      orderId: order.id,
      number: order.number,
      paymentHash: order.paymentHash,
    });
  }
  if (order.status !== "pending") {
    return NextResponse.json({
      status: order.status,
      settled: false,
      orderId: order.id,
      number: order.number,
      paymentHash: order.paymentHash,
    });
  }
  if (isOrderOverdue(order)) {
    await markOrderExpired(order.id);
    return NextResponse.json({
      status: "expired",
      settled: false,
      orderId: order.id,
      number: order.number,
      paymentHash: order.paymentHash,
    });
  }
  if (!order.verifyUrl) {
    // The owner's Lightning address gives no LUD-21 verify URL: the payment
    // can't confirm itself, so the owner confirms it out of band.
    return NextResponse.json({
      status: "pending",
      settled: false,
      verifiable: false,
      orderId: order.id,
      number: order.number,
      paymentHash: order.paymentHash,
      expiresAt: order.expiresAt,
    });
  }
  const config = getBitcoinConfig();
  try {
    const { settled, preimage } = await pollVerify(
      order.verifyUrl,
      order.paymentHash,
      {
        allowInsecure: config.allowInsecureLnurl,
      },
    );
    if (!settled) {
      return NextResponse.json({
        status: "pending",
        settled: false,
        verifiable: true,
        orderId: order.id,
        number: order.number,
        paymentHash: order.paymentHash,
        expiresAt: order.expiresAt,
      });
    }
    const { order: paidOrder, flipped } = await markOrderPaid(
      order.id,
      preimage,
    );
    if (flipped && paidOrder) {
      // Payment confirmed: close the cart so a fresh one starts. Local
      // carts complete in place; Spree carts just drop their cookies —
      // the Kabuna order (above) is the record of a Lightning payment.
      try {
        if (isLocalCartId(paidOrder.cartId)) {
          const surface = await resolveSurfaceForCart(paidOrder.cartId);
          await completeLocalCart(paidOrder.cartId, surface);
        } else {
          const surface = await resolveSurfaceForCart(paidOrder.cartId);
          await clearCartCookies(surface);
        }
      } catch {
        // Cart cleanup is best-effort — the paid order is already stored.
      }
    }
    return NextResponse.json({
      status: "paid",
      settled: true,
      orderId: order.id,
      number: order.number,
      paymentHash: order.paymentHash,
    });
  } catch (error) {
    // Fail closed: a verify outage never marks an order paid.
    if (error instanceof LnurlError) {
      return NextResponse.json({
        status: "pending",
        settled: false,
        verifiable: true,
        verifyError: error.message,
        orderId: order.id,
        number: order.number,
        paymentHash: order.paymentHash,
        expiresAt: order.expiresAt,
      });
    }
    return NextResponse.json({
      status: "pending",
      settled: false,
      verifiable: true,
      orderId: order.id,
      number: order.number,
      paymentHash: order.paymentHash,
      expiresAt: order.expiresAt,
    });
  }
}
