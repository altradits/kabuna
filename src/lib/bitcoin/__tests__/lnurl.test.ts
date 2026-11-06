import { afterEach, describe, expect, it } from "vitest";
import { bolt11Msats } from "../bolt11";
import {
  buildVerifyUrl,
  LnurlError,
  lnurlPayUrl,
  parseLnAddress,
  pollVerify,
  requestLnurlInvoice,
  resolveLnurlPay,
} from "../lnurl";
import {
  type FakeLnurlServer,
  startFakeLnurlServer,
} from "./fake-lnurl-server";

let server: FakeLnurlServer | null = null;

afterEach(async () => {
  if (server) {
    await server.close();
    server = null;
  }
});

describe("parseLnAddress", () => {
  it("parses strict user@domain addresses", () => {
    expect(parseLnAddress("5tan@altradits.com")).toEqual({
      user: "5tan",
      domain: "altradits.com",
    });
    expect(parseLnAddress("lightning:Stan@Wallet.COM")).toEqual({
      user: "stan",
      domain: "wallet.com",
    });
  });

  it("rejects anything that isn't one @ with a sound domain", () => {
    for (const bad of [
      "",
      "no-at-sign",
      "two@@ats.com",
      "user@127.0.0.1",
      "user@localhost",
      "user@nodot",
      ".user@wallet.com",
      "user@wallet.com.",
      `${"u".repeat(65)}@wallet.com`,
    ]) {
      expect(() => parseLnAddress(bad)).toThrow(LnurlError);
    }
  });

  it("builds the LUD-16 pay endpoint", () => {
    expect(lnurlPayUrl("5tan@altradits.com")).toBe(
      "https://altradits.com/.well-known/lnurlp/5tan",
    );
  });
});

describe("requestLnurlInvoice against a fake LNURL server", () => {
  it("returns an invoice for exactly the asked amount", async () => {
    server = await startFakeLnurlServer();
    const invoice = await requestLnurlInvoice(
      server.payUrl,
      5000,
      "Kabuna order KBN-1",
      {
        allowInsecure: true,
      },
    );
    expect(bolt11Msats(invoice.pr)).toBe(5_000_000);
    expect(invoice.paymentHash).toMatch(/^[0-9a-f]{64}$/);
    expect(invoice.verifyUrl).toContain(invoice.paymentHash);
    expect(invoice.metadata).toContain("5tan@altradits.com");
    const stored = server.invoices.get(invoice.paymentHash ?? "");
    expect(stored?.comment).toBe("Kabuna order KBN-1");
  });

  it("rejects amounts outside the address limits", async () => {
    server = await startFakeLnurlServer();
    await expect(
      requestLnurlInvoice(server.payUrl, 0, undefined, { allowInsecure: true }),
    ).rejects.toThrow(LnurlError);
    // maxSendable is 100M sats; beyond it the address refuses.
    await expect(
      requestLnurlInvoice(server.payUrl, 200_000_000, undefined, {
        allowInsecure: true,
      }),
    ).rejects.toThrow(/accepts .* sats/);
  });

  it("never hands out an invoice for a different amount", async () => {
    server = await startFakeLnurlServer({ wrongAmount: true });
    await expect(
      requestLnurlInvoice(server.payUrl, 5000, undefined, {
        allowInsecure: true,
      }),
    ).rejects.toThrow(/different amount/);
  });

  it("surfaces the server's ERROR reason when the callback fails", async () => {
    server = await startFakeLnurlServer({ callbackFails: true });
    await expect(
      requestLnurlInvoice(server.payUrl, 5000, undefined, {
        allowInsecure: true,
      }),
    ).rejects.toThrow(/Test failure/);
  });

  it("rejects non-payRequest endpoints", async () => {
    server = await startFakeLnurlServer();
    await expect(
      resolveLnurlPay(`${server.baseUrl}/lnurlp/wrong-tag`, {
        allowInsecure: true,
      }),
    ).rejects.toThrow(LnurlError);
  });
});

describe("untrusted-server guards", () => {
  it("follows no redirects and accepts JSON only", async () => {
    server = await startFakeLnurlServer();
    await expect(
      resolveLnurlPay(`${server.baseUrl}/lnurlp/redirect`, {
        allowInsecure: true,
      }),
    ).rejects.toThrow(/isn't reachable/);
    await expect(
      resolveLnurlPay(`${server.baseUrl}/lnurlp/text`, { allowInsecure: true }),
    ).rejects.toThrow(/isn't reachable/);
  });

  it("allows http only for localhost, and collapses network failures", async () => {
    await expect(
      resolveLnurlPay("http://example.com/.well-known/lnurlp/test", {
        allowInsecure: true,
      }),
    ).rejects.toThrow(/isn't reachable/);
    // Nothing listens on this port: one sentence, no internals leaked.
    await expect(
      resolveLnurlPay("https://127.0.0.1:1/.well-known/lnurlp/test", {
        allowInsecure: true,
      }),
    ).rejects.toThrow(/isn't reachable/);
  });
});

describe("LUD-21 verify polling", () => {
  it("reports pending until the server says settled, checking the preimage", async () => {
    server = await startFakeLnurlServer({ settleAfterPolls: 1 });
    const invoice = await requestLnurlInvoice(server.payUrl, 5000, undefined, {
      allowInsecure: true,
    });
    const first = await pollVerify(
      invoice.verifyUrl ?? "",
      invoice.paymentHash,
      {
        allowInsecure: true,
      },
    );
    expect(first.settled).toBe(false);
    const second = await pollVerify(
      invoice.verifyUrl ?? "",
      invoice.paymentHash,
      {
        allowInsecure: true,
      },
    );
    expect(second.settled).toBe(true);
    expect(second.preimage).toMatch(/^[0-9a-f]{64}$/);
  });

  it("refuses a preimage that doesn't hash to the payment hash", async () => {
    server = await startFakeLnurlServer({ wrongPreimage: true });
    const invoice = await requestLnurlInvoice(server.payUrl, 5000, undefined, {
      allowInsecure: true,
    });
    await expect(
      pollVerify(invoice.verifyUrl ?? "", invoice.paymentHash, {
        allowInsecure: true,
      }),
    ).rejects.toThrow(/proof doesn't match/);
  });
});

describe("buildVerifyUrl", () => {
  const hash = "ab".repeat(32);

  it("fills placeholders, appends to base URLs, keeps complete URLs", () => {
    expect(
      buildVerifyUrl("https://w.example/verify/{payment_hash}", hash),
    ).toBe(`https://w.example/verify/${hash}`);
    expect(buildVerifyUrl("https://w.example/verify", hash)).toBe(
      `https://w.example/verify/${hash}`,
    );
    expect(buildVerifyUrl(`https://w.example/verify/${hash}`, hash)).toBe(
      `https://w.example/verify/${hash}`,
    );
  });
});
