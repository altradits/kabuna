/**
 * Fiat-to-sats conversion.
 *
 * Rate choice: the owner-set rate (KABUNA_BTC_USD_RATE) is preferred, with
 * an optional live fetch. Why:
 * 1. The shop owner controls the price customers see — no mid-checkout
 *    re-quotes from a volatile spot API.
 * 2. Checkout works offline and deterministically — payment never depends
 *    on a third-party rate API at the critical moment.
 * 3. Tests are hermetic — no network needed for exact-amount assertions.
 *
 * Live fetch (Coinbase then Kraken — the same sources Altradits uses in
 * lib/lightning.js) is available via KABUNA_ALLOW_LIVE_RATE=true when no
 * owner rate is set. Non-USD currencies convert through USD-base fiat rates
 * (the same open rates feed kTown uses), cached an hour.
 */

import { MAX_MONEY_SATS } from "./bolt11";

export type RateSource = "owner" | "live";

export interface BtcUsdQuote {
  rate: number;
  source: RateSource;
}

export class RateError extends Error {}

/**
 * Convert a fiat amount to whole sats, always rounding up so the merchant
 * never receives less than the order total.
 *
 * @param amountCents fiat amount in minor units (cents), a safe integer >= 0
 * @param currency ISO 4217 code, e.g. "USD"
 * @param btcUsd BTC price in USD (> 0)
 * @param fiatRates USD-base rates (1 USD = X currency) for non-USD currencies
 */
export function fiatToSats(
  amountCents: number,
  currency: string,
  btcUsd: number,
  fiatRates?: Record<string, number>,
): number {
  if (!Number.isSafeInteger(amountCents) || amountCents < 0) {
    throw new RateError("Amount must be a whole number of cents.");
  }
  if (!Number.isFinite(btcUsd) || btcUsd <= 0) {
    throw new RateError("BTC/USD rate must be positive.");
  }
  const code = currency.toUpperCase();
  let usd: number;
  if (code === "USD") {
    usd = amountCents / 100;
  } else {
    const rate = fiatRates?.[code];
    if (!rate || !Number.isFinite(rate) || rate <= 0) {
      throw new RateError(`No USD rate for ${code}.`);
    }
    usd = amountCents / 100 / rate;
  }
  const sats = Math.ceil((usd / btcUsd) * 1e8);
  if (!Number.isSafeInteger(sats) || sats < 1) {
    throw new RateError("That amount is below 1 sat.");
  }
  if (sats > MAX_MONEY_SATS) {
    throw new RateError("That amount is too large.");
  }
  return sats;
}

/** Parse a decimal money string (e.g. cart.total "42.50") to minor units. */
export function decimalToCents(
  amount: string | number | null | undefined,
): number {
  if (amount === null || amount === undefined) {
    throw new RateError("Order total is missing.");
  }
  const n = typeof amount === "number" ? amount : Number(String(amount).trim());
  if (!Number.isFinite(n) || n < 0) {
    throw new RateError("Order total is invalid.");
  }
  return Math.round(n * 100);
}

export function formatSats(sats: number): string {
  return sats.toLocaleString("en-US");
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

// ------------------------------------------------------------- BTC/USD rate

type FetchLike = (url: string, init?: RequestInit) => Promise<Response>;

let priceCache = { usd: 0, at: 0 };
const PRICE_TTL_MS = 5 * 60 * 1000;

export function clearRateCaches(): void {
  priceCache = { usd: 0, at: 0 };
  fiatCache = null;
}

async function fetchLiveBtcUsd(fetchFn: FetchLike = fetch): Promise<number> {
  if (priceCache.usd && Date.now() - priceCache.at < PRICE_TTL_MS) {
    return priceCache.usd;
  }
  const sources: Array<[string, (body: unknown) => number]> = [
    [
      "https://api.coinbase.com/v2/prices/BTC-USD/spot",
      (j) => Number((j as { data: { amount: string } }).data.amount),
    ],
    [
      "https://api.kraken.com/0/public/Ticker?pair=XBTUSD",
      (j) =>
        Number(
          Object.values(
            (j as { result: Record<string, { c: string[] }> }).result,
          )[0].c[0],
        ),
    ],
  ];
  for (const [url, pick] of sources) {
    try {
      const res = await fetchFn(url, { signal: AbortSignal.timeout(6000) });
      const usd = pick(await res.json());
      if (usd > 1000) {
        priceCache = { usd, at: Date.now() };
        return usd;
      }
    } catch {
      // try the next source
    }
  }
  if (priceCache.usd) return priceCache.usd; // stale beats nothing
  throw new RateError("BTC price unavailable.");
}

export async function getBtcUsdRate(options?: {
  ownerRate?: number | null;
  allowLive?: boolean;
  fetchFn?: FetchLike;
}): Promise<BtcUsdQuote> {
  const ownerRate = options?.ownerRate ?? null;
  if (ownerRate !== null && Number.isFinite(ownerRate) && ownerRate > 0) {
    return { rate: ownerRate, source: "owner" };
  }
  if (options?.allowLive) {
    return { rate: await fetchLiveBtcUsd(options.fetchFn), source: "live" };
  }
  throw new RateError(
    "Set KABUNA_BTC_USD_RATE to the shop's BTC price in USD, or set KABUNA_ALLOW_LIVE_RATE=true to fetch a live rate.",
  );
}

// ------------------------------------------------------------- fiat rates

const FIAT_RATES_URL = "https://open.er-api.com/v6/latest/USD";
const FIAT_RATES_TTL_MS = 3600 * 1000;

let fiatCache: { atMs: number; rates: Record<string, number> } | null = null;

/** USD-base fiat rates (1 USD = X currency), cached an hour. */
export async function getFiatRates(options?: {
  fetchFn?: FetchLike;
  now?: number;
}): Promise<Record<string, number>> {
  const now = options?.now ?? Date.now();
  if (fiatCache && now - fiatCache.atMs < FIAT_RATES_TTL_MS) {
    return fiatCache.rates;
  }
  const fetchFn = options?.fetchFn ?? fetch;
  try {
    const res = await fetchFn(FIAT_RATES_URL, {
      signal: AbortSignal.timeout(8000),
      headers: { Accept: "application/json" },
    });
    const type = String(res.headers.get("content-type") || "")
      .split(";")[0]
      .trim()
      .toLowerCase();
    if (!res.ok || type !== "application/json") throw new Error("bad rates");
    const body = (await res.json().catch(() => null)) as {
      result?: string;
      rates?: Record<string, unknown>;
    } | null;
    const got =
      body && body.result === "success" && body.rates ? body.rates : null;
    if (!got) throw new Error("bad rates");
    const rates: Record<string, number> = { USD: 1 };
    for (const [code, value] of Object.entries(got)) {
      const v = Number(value);
      if (Number.isFinite(v) && v > 0) rates[code.toUpperCase()] = v;
    }
    fiatCache = { atMs: now, rates };
    return rates;
  } catch {
    if (fiatCache) return fiatCache.rates; // stale beats nothing
    throw new RateError("Exchange rates aren't reachable right now.");
  }
}
