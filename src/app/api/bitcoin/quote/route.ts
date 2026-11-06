import { NextResponse } from "next/server";
import { getBitcoinConfig } from "@/lib/bitcoin/config";
import { QuoteError, quoteForCart } from "@/lib/bitcoin/quote";
import { formatFiat, formatSats } from "@/lib/bitcoin/rates";

interface QuoteBody {
  cartId?: string;
}

/**
 * POST /api/bitcoin/quote — order total converted to sats.
 * The amount comes from the server-side cart, never from the browser.
 */
export async function POST(request: Request): Promise<NextResponse> {
  let body: QuoteBody;
  try {
    body = (await request.json()) as QuoteBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body.cartId) {
    return NextResponse.json({ error: "Cart is missing." }, { status: 400 });
  }
  try {
    const quote = await quoteForCart(body.cartId);
    const config = getBitcoinConfig();
    return NextResponse.json({
      sats: quote.sats,
      satsFormatted: formatSats(quote.sats),
      fiatTotalCents: quote.fiatTotalCents,
      fiatTotalFormatted: formatFiat(quote.fiatTotalCents, quote.currency),
      currency: quote.currency,
      btcUsdRate: quote.btcUsdRate,
      rateSource: quote.rateSource,
      lightningAddress: config.lightningAddress,
      supportEmail: config.supportEmail,
      supportPhone: config.supportPhone,
    });
  } catch (error) {
    if (error instanceof QuoteError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }
    return NextResponse.json(
      { error: "Couldn't price this order in sats." },
      { status: 502 },
    );
  }
}
