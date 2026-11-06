import { NextResponse } from "next/server";
import {
  getBitcoinConfig,
  isPlaceholderLightningAddress,
} from "@/lib/bitcoin/config";
import {
  LnurlError,
  lnurlPayUrl,
  requestLnurlInvoice,
} from "@/lib/bitcoin/lnurl";
import {
  cancelOrder,
  createOrder,
  findPendingOrderForCart,
  type KabunaOrder,
} from "@/lib/bitcoin/orders";
import { formatFiat, QuoteError, quoteForCart } from "@/lib/bitcoin/quote";
import { formatSats } from "@/lib/bitcoin/rates";

export const runtime = "nodejs";

interface InvoiceBody {
  cartId?: string;
  email?: string;
}

function orderResponse(order: KabunaOrder): NextResponse {
  const config = getBitcoinConfig();
  return NextResponse.json({
    orderId: order.id,
    number: order.number,
    pr: order.invoice,
    sats: order.sats,
    satsFormatted: formatSats(order.sats),
    fiatTotalFormatted: formatFiat(order.fiatTotalCents, order.currency),
    currency: order.currency,
    paymentHash: order.paymentHash,
    expiresAt: order.expiresAt,
    lightningAddress: order.lightningAddress,
    supportEmail: config.supportEmail,
    supportPhone: config.supportPhone,
  });
}

/**
 * POST /api/bitcoin/invoice — mint (or reuse) a BOLT11 invoice for a cart.
 * The invoice comes from the shop owner's own Lightning address via
 * LNURL-pay, so the sats go straight to the owner — never through Kabuna.
 */
export async function POST(request: Request): Promise<NextResponse> {
  let body: InvoiceBody;
  try {
    body = (await request.json()) as InvoiceBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body.cartId) {
    return NextResponse.json({ error: "Cart is missing." }, { status: 400 });
  }
  const config = getBitcoinConfig();
  if (
    !config.lnurlEndpointOverride &&
    isPlaceholderLightningAddress(config.lightningAddress)
  ) {
    return NextResponse.json(
      {
        error:
          "Bitcoin payments aren't set up yet — the shop owner must set KABUNA_LIGHTNING_ADDRESS.",
      },
      { status: 503 },
    );
  }
  try {
    const quote = await quoteForCart(body.cartId);
    // Retries reuse the live invoice instead of minting a new one per click
    // — but only when it was priced at the same total and rate.
    const existing = await findPendingOrderForCart(body.cartId);
    if (existing) {
      if (
        existing.fiatTotalCents === quote.fiatTotalCents &&
        existing.currency === quote.currency &&
        existing.sats === quote.sats
      ) {
        return orderResponse(existing);
      }
      await cancelOrder(existing.id);
    }
    const target =
      config.lnurlEndpointOverride ?? lnurlPayUrl(config.lightningAddress);
    const invoice = await requestLnurlInvoice(
      target,
      quote.sats,
      `Kabuna order ${quote.cart.number}`,
      {
        allowInsecure: config.allowInsecureLnurl,
      },
    );
    const order = await createOrder({
      cartId: quote.cart.id,
      email: body.email?.trim() || quote.cart.email || null,
      items: quote.items,
      fiatTotalCents: quote.fiatTotalCents,
      currency: quote.currency,
      sats: quote.sats,
      btcUsdRate: quote.btcUsdRate,
      rateSource: quote.rateSource,
      lightningAddress: config.lnurlEndpointOverride
        ? "test-lnurl-endpoint"
        : config.lightningAddress,
      invoice: invoice.pr,
      paymentHash: invoice.paymentHash,
      verifyUrl: invoice.verifyUrl,
    });
    return orderResponse(order);
  } catch (error) {
    if (error instanceof QuoteError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    if (error instanceof LnurlError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    return NextResponse.json(
      { error: "Couldn't create a Lightning invoice." },
      { status: 502 },
    );
  }
}
