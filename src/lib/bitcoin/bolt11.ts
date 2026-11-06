/**
 * BOLT11 invoice parsing for verification.
 *
 * Ported from Altradits' lib/lightning.js (bolt11Msats, bolt11PaymentHash,
 * bolt11DescriptionHash): before showing or trusting an invoice, Kabuna
 * checks it asks for exactly the order amount, and — when the invoice
 * commits to a description — that it commits to this order's LNURL metadata.
 */

/** 21 million BTC in sats: no amount can be larger (2010 overflow lesson). */
export const MAX_MONEY_SATS = 2_100_000_000_000_000;

/**
 * Amount in a BOLT11 human-readable part, in millisats.
 * Null when amountless or larger than all bitcoin that can exist.
 */
export function bolt11Msats(pr: string): number | null {
  const m = /^ln(?:bc|tb|bcrt)(\d+)([munp]?)1/i.exec(pr);
  if (!m) return null;
  // BigInt() calls (not literals) so this compiles under the ES2017 target.
  const n = BigInt(m[1]);
  const per: Record<string, bigint> = {
    "": BigInt(100_000_000_000),
    m: BigInt(100_000_000),
    u: BigInt(100_000),
    n: BigInt(100),
    p: BigInt(0),
  };
  const unit = m[2].toLowerCase();
  const msats = unit === "p" ? n / BigInt(10) : n * (per[unit] ?? BigInt(0));
  return msats > BigInt(MAX_MONEY_SATS) * BigInt(1000) ? null : Number(msats);
}

const BECH32 = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";

/** The payment hash inside a BOLT11 invoice (tagged field "p"). Null if unreadable. */
export function bolt11PaymentHash(pr: string): string | null {
  return bolt11Hash32(pr, 1);
}

/** The description hash ("h" field, LUD-06). Null when the invoice has none. */
export function bolt11DescriptionHash(pr: string): string | null {
  return bolt11Hash32(pr, 23);
}

function bolt11Hash32(pr: string, want: number): string | null {
  const s = String(pr || "").toLowerCase();
  const sep = s.lastIndexOf("1");
  if (!s.startsWith("ln") || sep < 0) return null;
  const words = [...s.slice(sep + 1, -6)].map((c) => BECH32.indexOf(c));
  if (words.some((w) => w < 0)) return null;
  // After the 35-bit timestamp: type (5 bits), length (10 bits), data.
  for (let i = 7; i + 3 <= words.length; ) {
    const type = words[i];
    const len = words[i + 1] * 32 + words[i + 2];
    const data = words.slice(i + 3, i + 3 + len);
    if (type === want && len === 52) {
      // A 32-byte hash: 52 five-bit words.
      let acc = 0;
      let bits = 0;
      let hex = "";
      for (const w of data) {
        acc = (acc << 5) | w;
        bits += 5;
        while (bits >= 8) {
          bits -= 8;
          hex += ((acc >> bits) & 255).toString(16).padStart(2, "0");
        }
      }
      return hex.slice(0, 64);
    }
    i += 3 + len;
  }
  return null;
}
