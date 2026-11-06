import { describe, expect, it } from "vitest";
import {
  bolt11DescriptionHash,
  bolt11Msats,
  bolt11PaymentHash,
  MAX_MONEY_SATS,
} from "../bolt11";

const BECH32 = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";

/** 8-bit bytes -> 5-bit words (test-side convertbits for building vectors). */
function toWords(bytes: Buffer): number[] {
  let acc = 0;
  let bits = 0;
  const words: number[] = [];
  for (const byte of bytes) {
    acc = (acc << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      bits -= 5;
      words.push((acc >> bits) & 31);
    }
  }
  if (bits > 0) words.push((acc << (5 - bits)) & 31);
  return words;
}

/**
 * A synthetic BOLT11 invoice with a real p field (and optional h field).
 * The parser under test skips signature/checksum verification, so the
 * timestamp, signature area, and checksum are filler — the tagged fields
 * are honestly encoded.
 */
function buildInvoice(
  paymentHashHex: string,
  descriptionHashHex?: string,
): string {
  const field = (type: number, hashHex: string): number[] => {
    const data = toWords(Buffer.from(hashHex, "hex"));
    if (data.length !== 52)
      throw new Error("test vector must encode to 52 words");
    return [type, 1, 20, ...data]; // length 52 = 1*32 + 20
  };
  const words = [
    0,
    0,
    0,
    0,
    0,
    0,
    0, // timestamp
    ...field(1, paymentHashHex),
    ...(descriptionHashHex ? field(23, descriptionHashHex) : []),
  ];
  return `lnbc100n1${words.map((w) => BECH32[w]).join("")}qqqqqq`;
}

describe("bolt11Msats", () => {
  it("parses each multiplier unit", () => {
    expect(bolt11Msats("lnbc1u1test")).toBe(100_000);
    expect(bolt11Msats("lnbc2500u1test")).toBe(250_000_000);
    expect(bolt11Msats("lnbc10m1test")).toBe(1_000_000_000);
    expect(bolt11Msats("lnbc1n1test")).toBe(100);
    expect(bolt11Msats("lnbc50000n1test")).toBe(5_000_000);
    expect(bolt11Msats("lnbc1p1test")).toBe(0);
  });

  it("parses whole-bitcoin amounts", () => {
    expect(bolt11Msats("lnbc11test")).toBe(100_000_000_000);
  });

  it("accepts testnet and regtest prefixes, any case", () => {
    expect(bolt11Msats("lntb1n1test")).toBe(100);
    expect(bolt11Msats("lnbcrt1n1test")).toBe(100);
    expect(bolt11Msats("LNBC2500U1TEST")).toBe(250_000_000);
  });

  it("returns null for amountless, oversized, or malformed invoices", () => {
    expect(bolt11Msats("lnbc1test")).toBeNull();
    expect(bolt11Msats(`${"not an invoice"}`)).toBeNull();
    expect(bolt11Msats("")).toBeNull();
    // More than every bitcoin that can exist is not an amount.
    expect(bolt11Msats(`lnbc${MAX_MONEY_SATS + 1}1test`)).toBeNull();
  });
});

describe("bolt11PaymentHash / bolt11DescriptionHash", () => {
  const paymentHash =
    "000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f";
  const descriptionHash = "ff".repeat(32);

  it("extracts the payment hash from the p field", () => {
    expect(bolt11PaymentHash(buildInvoice(paymentHash))).toBe(paymentHash);
  });

  it("extracts the description hash from the h field, null when absent", () => {
    expect(
      bolt11DescriptionHash(buildInvoice(paymentHash, descriptionHash)),
    ).toBe(descriptionHash);
    expect(bolt11DescriptionHash(buildInvoice(paymentHash))).toBeNull();
  });

  it("returns null when the invoice has no tagged fields", () => {
    const filler = `lnbc50000n1${"q".repeat(64)}`;
    expect(bolt11PaymentHash(filler)).toBeNull();
    expect(bolt11DescriptionHash(filler)).toBeNull();
  });
});
