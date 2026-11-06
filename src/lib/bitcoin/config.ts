/**
 * Kabuna Bitcoin (Lightning) configuration.
 *
 * All money movement goes straight to the shop owner's own Lightning
 * address (non-custodial: Kabuna and Altradits never receive or hold the
 * customer's money). Stanley must set KABUNA_LIGHTNING_ADDRESS to his own
 * Ye\u20BFente handle@altradits.com or node address — see README.
 */

export interface BitcoinConfig {
  /** Shop owner's own Lightning address, e.g. owner@altradits.com. */
  lightningAddress: string;
  /** Checkout currency (ISO 4217), e.g. USD. */
  currency: string;
  /** Owner-set BTC price in USD, or null when unset. Preferred rate. */
  ownerBtcUsdRate: number | null;
  /** When true and no owner rate is set, fetch a live BTC/USD rate. */
  allowLiveRate: boolean;
  /** Test-only override: direct LNURL-pay endpoint URL (skips address lookup). */
  lnurlEndpointOverride: string | null;
  /** Allow http:// LNURL endpoints for localhost (dev/test fake server). */
  allowInsecureLnurl: boolean;
  /** Directory for the file-backed Kabuna order store. */
  orderDir: string;
  /** Support contact shown on payment errors (placeholder default). */
  supportPhone: string;
  supportEmail: string;
}

function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

/** Placeholder Lightning address used when none is configured (dev). */
export const PLACEHOLDER_LIGHTNING_ADDRESS = "kabuna@example.com";

/** Placeholder contacts for tests and development. */
export const PLACEHOLDER_SUPPORT_PHONE = "0707172370";
export const PLACEHOLDER_SUPPORT_EMAIL = "5tan@altradits.com";

export function isPlaceholderLightningAddress(address: string): boolean {
  const domain = address.split("@")[1]?.toLowerCase() ?? "";
  return (
    domain === "" || domain === "example.com" || domain.endsWith(".example.com")
  );
}

function parseOwnerRate(raw: string | undefined): number | null {
  if (!raw) return null;
  const rate = Number(raw);
  if (!Number.isFinite(rate) || rate <= 0) return null;
  return rate;
}

export function getBitcoinConfig(): BitcoinConfig {
  const nodeEnv = process.env.NODE_ENV ?? "development";
  return {
    lightningAddress:
      env("KABUNA_LIGHTNING_ADDRESS") ?? PLACEHOLDER_LIGHTNING_ADDRESS,
    currency: (env("KABUNA_CURRENCY") ?? "USD").toUpperCase(),
    ownerBtcUsdRate: parseOwnerRate(env("KABUNA_BTC_USD_RATE")),
    allowLiveRate: env("KABUNA_ALLOW_LIVE_RATE") === "true",
    lnurlEndpointOverride: env("KABUNA_LNURL_ENDPOINT") ?? null,
    allowInsecureLnurl:
      env("KABUNA_ALLOW_INSECURE_LNURL") !== undefined
        ? env("KABUNA_ALLOW_INSECURE_LNURL") === "true"
        : nodeEnv !== "production",
    orderDir: env("KABUNA_ORDER_DIR") ?? ".data/kabuna-orders",
    supportPhone: env("KABUNA_SUPPORT_PHONE") ?? PLACEHOLDER_SUPPORT_PHONE,
    supportEmail: env("KABUNA_SUPPORT_EMAIL") ?? PLACEHOLDER_SUPPORT_EMAIL,
  };
}

/**
 * Which payment methods the checkout offers. Lightning is the main way to
 * pay and is on unless explicitly disabled; the card processors are off
 * unless explicitly enabled (their code stays, behind flags).
 */
export interface PaymentFlags {
  bitcoinEnabled: boolean;
  stripeEnabled: boolean;
  paypalEnabled: boolean;
  adyenEnabled: boolean;
}

export function getPaymentFlags(): PaymentFlags {
  const enabled = (name: string): boolean =>
    process.env[`NEXT_PUBLIC_${name}`] === "true" ||
    process.env[name] === "true";
  return {
    bitcoinEnabled:
      process.env.NEXT_PUBLIC_KABUNA_BITCOIN_ENABLED !== "false" &&
      process.env.KABUNA_BITCOIN_ENABLED !== "false",
    stripeEnabled: enabled("KABUNA_ENABLE_STRIPE"),
    paypalEnabled: enabled("KABUNA_ENABLE_PAYPAL"),
    adyenEnabled: enabled("KABUNA_ENABLE_ADYEN"),
  };
}
