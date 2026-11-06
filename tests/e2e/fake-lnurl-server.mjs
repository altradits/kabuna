/**
 * Standalone fake LNURL-pay server for the Bitcoin e2e (node, no deps).
 *
 * Mirrors src/lib/bitcoin/__tests__/fake-lnurl-server.ts over real HTTP:
 * LUD-06/16 payRequest + callback, LUD-21 verify that flips to settled
 * after SETTLE_AFTER_POLLS polls (default 2) with a preimage that hashes
 * to the payment hash.
 *
 * Usage: FAKE_LNURL_PORT=4197 node tests/e2e/fake-lnurl-server.mjs
 */
import { createHash, randomBytes } from "node:crypto";
import { createServer } from "node:http";

const PORT = Number(process.env.FAKE_LNURL_PORT || 4197);
const SETTLE_AFTER_POLLS = Number(process.env.SETTLE_AFTER_POLLS ?? 2);
const invoices = new Map();

const json = (res, status, body) => {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
};

const server = createServer((req, res) => {
  const url = new URL(req.url || "/", "http://127.0.0.1");
  const baseUrl = `http://127.0.0.1:${PORT}`;

  if (url.pathname.startsWith("/.well-known/lnurlp/")) {
    json(res, 200, {
      tag: "payRequest",
      callback: `${baseUrl}/lnurlp/callback`,
      minSendable: 1000,
      maxSendable: 100_000_000_000,
      metadata: JSON.stringify([
        ["text/plain", "Kabuna e2e test payment"],
        ["text/identifier", "5tan@altradits.com"],
      ]),
      commentAllowed: 120,
    });
    return;
  }

  if (url.pathname === "/lnurlp/callback") {
    const msats = Number(url.searchParams.get("amount"));
    if (!Number.isSafeInteger(msats) || msats < 1000 || msats > 100_000_000_000) {
      json(res, 400, { status: "ERROR", reason: "Amount out of range." });
      return;
    }
    const preimage = randomBytes(32).toString("hex");
    const paymentHash = createHash("sha256")
      .update(Buffer.from(preimage, "hex"))
      .digest("hex");
    const pr = `lnbc${msats / 100}n1${"q".repeat(64)}`;
    invoices.set(paymentHash, { preimage, polls: 0 });
    console.log(`invoice ${paymentHash.slice(0, 12)}… for ${msats} msat`);
    json(res, 200, { pr, verify: `${baseUrl}/lnurlp/verify/${paymentHash}` });
    return;
  }

  if (url.pathname.startsWith("/lnurlp/verify/")) {
    const hash = (url.pathname.split("/").pop() || "").toLowerCase();
    const invoice = invoices.get(hash);
    if (!invoice) {
      json(res, 404, { status: "ERROR", reason: "Unknown invoice." });
      return;
    }
    invoice.polls += 1;
    const settled = invoice.polls > SETTLE_AFTER_POLLS;
    if (settled) console.log(`settled ${hash.slice(0, 12)}…`);
    json(res, 200, {
      settled,
      preimage: settled ? invoice.preimage : undefined,
    });
    return;
  }

  json(res, 404, { status: "ERROR", reason: "Not found." });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`fake LNURL server on http://127.0.0.1:${PORT}`);
});
