/**
 * Server-side settlement check for Kabuna Lightning orders.
 *
 * Single place where an order flips to paid: only when the LUD-21 verify
 * URL says settled (with a preimage that hashes to the payment hash, when
 * one is revealed). Both the status route (browser polling) and the order
 * completion action use this — the browser can never mark an order paid.
 */

import { pollVerify } from "./lnurl";
import {
  getOrder,
  isOrderOverdue,
  type KabunaOrder,
  markOrderExpired,
  markOrderPaid,
} from "./orders";

export interface SettleResult {
  order: KabunaOrder | null;
  /** True when the order is paid (whether flipped now or earlier). */
  settled: boolean;
  /** True when this call flipped the order to paid. */
  flipped: boolean;
}

export async function settleOrderIfPaid(
  orderId: string,
  options?: { allowInsecure?: boolean },
): Promise<SettleResult> {
  const order = await getOrder(orderId);
  if (!order) return { order: null, settled: false, flipped: false };
  if (order.status === "paid") return { order, settled: true, flipped: false };
  if (order.status !== "pending")
    return { order, settled: false, flipped: false };
  if (isOrderOverdue(order)) {
    const expired = await markOrderExpired(order.id);
    return { order: expired, settled: false, flipped: false };
  }
  if (!order.verifyUrl) return { order, settled: false, flipped: false };
  // Fail closed: any verify error leaves the order pending.
  const { settled, preimage } = await pollVerify(
    order.verifyUrl,
    order.paymentHash,
    {
      allowInsecure: options?.allowInsecure,
    },
  );
  if (!settled) return { order, settled: false, flipped: false };
  const { order: paidOrder, flipped } = await markOrderPaid(order.id, preimage);
  return { order: paidOrder, settled: true, flipped };
}
