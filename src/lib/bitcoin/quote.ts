/**
 * Server-side Lightning quote for a checkout cart.
 *
 * The amount is always derived here from the cart the server reads — never
 * from a number the browser sends — so a tampered total can't mint a
 * cheaper invoice.
 */

import type { Cart } from "@spree/sdk";
import { getCheckoutOrder } from "@/lib/data/checkout";
import { getBitcoinConfig } from "./config";
import type { KabunaOrderItem } from "./orders";
import {
  decimalToCents,
  fiatToSats,
  getBtcUsdRate,
  getFiatRates,
  type RateSource,
} from "./rates";

export class QuoteError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export interface CartQuote {
  cart: Cart;
  currency: string;
  fiatTotalCents: number;
  sats: number;
  btcUsdRate: number;
  rateSource: RateSource;
  items: KabunaOrderItem[];
}

export async function quoteForCart(cartId: string): Promise<CartQuote> {
  if (!cartId || typeof cartId !== "string") {
    throw new QuoteError("Cart is missing.");
  }
  const cart = await getCheckoutOrder(cartId);
  if (!cart) {
    throw new QuoteError("Order not found.", 404);
  }
  if (cart.current_step === "complete") {
    throw new QuoteError("This order is already complete.");
  }
  const config = getBitcoinConfig();
  const currency = String(cart.currency || config.currency).toUpperCase();
  let fiatTotalCents: number;
  try {
    fiatTotalCents = decimalToCents(cart.amount_due ?? cart.total);
  } catch {
    throw new QuoteError("Order total is missing.");
  }
  if (fiatTotalCents < 1) {
    throw new QuoteError("No payment needed for a zero total.");
  }
  let rate: number;
  let rateSource: RateSource;
  try {
    ({ rate, source: rateSource } = await getBtcUsdRate({
      ownerRate: config.ownerBtcUsdRate,
      allowLive: config.allowLiveRate,
    }));
  } catch (error) {
    throw new QuoteError(
      error instanceof Error ? error.message : "Rate unavailable.",
      502,
    );
  }
  let sats: number;
  try {
    const fiatRates = currency === "USD" ? undefined : await getFiatRates();
    sats = fiatToSats(fiatTotalCents, currency, rate, fiatRates);
  } catch (error) {
    throw new QuoteError(
      error instanceof Error ? error.message : "Conversion failed.",
      502,
    );
  }
  const items: KabunaOrderItem[] = (cart.items ?? []).map((item) => ({
    name: item.name,
    quantity: item.quantity,
    unitPrice: item.display_price || item.price || "",
    total: item.display_total || item.total || "",
    variantId: item.variant_id ?? null,
    thumbnailUrl: item.thumbnail_url ?? null,
  }));
  return {
    cart,
    currency,
    fiatTotalCents,
    sats,
    btcUsdRate: rate,
    rateSource,
    items,
  };
}

/** Display string for a minor-units amount, e.g. 4250 USD -> "$42.50". */
export function formatFiat(cents: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(cents / 100);
  } catch {
    return `${(cents / 100).toFixed(2)} ${currency}`;
  }
}
