import { NextResponse } from "next/server";
import { getBitcoinConfig } from "@/lib/bitcoin/config";
import { LnurlError } from "@/lib/bitcoin/lnurl";
import { getOrder } from "@/lib/bitcoin/orders";
import { settleOrderIfPaid } from "@/lib/bitcoin/settle";

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
  const config = getBitcoinConfig();
  try {
    const { order, settled } = await settleOrderIfPaid(orderId, {
      allowInsecure: config.allowInsecureLnurl,
    });
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }
    if (settled) {
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
    return NextResponse.json({
      status: "pending",
      settled: false,
      // Without a LUD-21 verify URL the payment can't confirm itself —
      // the owner confirms it out of band.
      verifiable: order.verifyUrl !== null,
      orderId: order.id,
      number: order.number,
      paymentHash: order.paymentHash,
      expiresAt: order.expiresAt,
    });
  } catch (error) {
    // Fail closed: a verify outage never marks an order paid.
    const order = await getOrder(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }
    return NextResponse.json({
      status: "pending",
      settled: false,
      verifiable: order.verifyUrl !== null,
      verifyError: error instanceof LnurlError ? error.message : undefined,
      orderId: order.id,
      number: order.number,
      paymentHash: order.paymentHash,
      expiresAt: order.expiresAt,
    });
  }
}
