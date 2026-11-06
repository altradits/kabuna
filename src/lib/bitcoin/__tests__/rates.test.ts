import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearRateCaches,
  decimalToCents,
  fiatToSats,
  formatFiat,
  formatSats,
  getBtcUsdRate,
  getFiatRates,
  RateError,
} from "../rates";

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

describe("fiatToSats", () => {
  it("converts USD at the owner rate", () => {
    expect(fiatToSats(4250, "USD", 100_000)).toBe(42_500);
  });

  it("always rounds up so the merchant never gets less", () => {
    // $1 at $60k/BTC = 1666.667 sats -> 1667.
    expect(fiatToSats(100, "USD", 60_000)).toBe(1667);
    expect(fiatToSats(1, "USD", 100_000)).toBe(10);
  });

  it("converts non-USD currencies through USD-base rates", () => {
    // 100 EUR at 0.92 EUR/USD and $100k/BTC.
    expect(fiatToSats(10_000, "EUR", 100_000, { EUR: 0.92 })).toBe(108_696);
  });

  it("rejects bad amounts, rates, and missing currency rates", () => {
    expect(() => fiatToSats(-1, "USD", 100_000)).toThrow(RateError);
    expect(() => fiatToSats(1.5, "USD", 100_000)).toThrow(RateError);
    expect(() => fiatToSats(100, "USD", 0)).toThrow(RateError);
    expect(() => fiatToSats(100, "EUR", 100_000)).toThrow(RateError);
    expect(() => fiatToSats(100, "EUR", 100_000, { EUR: 0 })).toThrow(
      RateError,
    );
    // Zero total is below 1 sat — free orders never reach Lightning.
    expect(() => fiatToSats(0, "USD", 100_000)).toThrow(RateError);
  });
});

describe("decimalToCents", () => {
  it("parses cart totals to minor units", () => {
    expect(decimalToCents("42.50")).toBe(4250);
    expect(decimalToCents("42.505")).toBe(4251);
    expect(decimalToCents(7)).toBe(700);
  });

  it("fails closed on missing or invalid totals", () => {
    expect(() => decimalToCents(null)).toThrow(RateError);
    expect(() => decimalToCents(undefined)).toThrow(RateError);
    expect(() => decimalToCents("abc")).toThrow(RateError);
    expect(() => decimalToCents("-1")).toThrow(RateError);
  });
});

describe("getBtcUsdRate", () => {
  beforeEach(() => clearRateCaches());

  it("prefers the owner-set rate and never fetches", async () => {
    const fetchFn = vi.fn();
    await expect(
      getBtcUsdRate({ ownerRate: 100_000, fetchFn }),
    ).resolves.toEqual({
      rate: 100_000,
      source: "owner",
    });
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it("fetches live (Coinbase first) when allowed and no owner rate", async () => {
    const fetchFn = vi.fn(async () =>
      jsonResponse({ data: { amount: "97500.00" } }),
    );
    await expect(getBtcUsdRate({ allowLive: true, fetchFn })).resolves.toEqual({
      rate: 97_500,
      source: "live",
    });
  });

  it("falls back to Kraken when Coinbase fails", async () => {
    const fetchFn = vi.fn(async (url: string) => {
      if (url.includes("coinbase")) throw new Error("down");
      return jsonResponse({ result: { XXBTZUSD: { c: ["97400.0", "1"] } } });
    });
    await expect(getBtcUsdRate({ allowLive: true, fetchFn })).resolves.toEqual({
      rate: 97_400,
      source: "live",
    });
  });

  it("tells the owner to set a rate when fetching is off", async () => {
    await expect(getBtcUsdRate()).rejects.toThrow(/KABUNA_BTC_USD_RATE/);
  });
});

describe("getFiatRates", () => {
  beforeEach(() => clearRateCaches());

  it("parses USD-base rates and caches them for an hour", async () => {
    const fetchFn = vi.fn(async () =>
      jsonResponse({ result: "success", rates: { EUR: 0.92, KES: 129.5 } }),
    );
    const first = await getFiatRates({ fetchFn, now: 1_000 });
    expect(first).toMatchObject({ USD: 1, EUR: 0.92, KES: 129.5 });
    const second = await getFiatRates({ fetchFn, now: 2_000 });
    expect(second).toBe(first);
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it("serves stale rates when a refresh fails", async () => {
    let calls = 0;
    const fetchFn = vi.fn(async () => {
      calls += 1;
      if (calls === 1)
        return jsonResponse({ result: "success", rates: { EUR: 0.92 } });
      throw new Error("down");
    });
    const seeded = await getFiatRates({ fetchFn, now: 1_000 });
    expect(seeded.EUR).toBe(0.92);
    const stale = await getFiatRates({ fetchFn, now: 1_000 + 3_601_000 });
    expect(stale).toBe(seeded);
  });
});

describe("formatters", () => {
  it("formats sats and fiat for display", () => {
    expect(formatSats(42500)).toBe("42,500");
    expect(formatFiat(4250, "USD")).toBe("$42.50");
  });
});
