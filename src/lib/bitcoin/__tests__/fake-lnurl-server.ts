/**
 * Fake LNURL-pay server for tests (LUD-06/16 payRequest + callback, LUD-21
 * verify). Binds 127.0.0.1 on an ephemeral port; the client under test
 * talks to it over plain http with allowInsecure (dev/test only).
 *
 * Invoices are fake BOLT11 strings with a real amount in the human-readable
 * part (`lnbc{sats*10}n1…`, nano-bitcoin units) so amount checks run for
 * real; the payment hash travels in the LUD-21 verify URL, and settlement
 * flips after a configurable number of verify polls with a preimage that
 * hashes to the payment hash.
 */

import { createHash, randomBytes } from "node:crypto";
import {
  createServer,
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from "node:http";

export interface FakeInvoice {
  pr: string;
  paymentHash: string;
  preimage: string;
  verifyUrl: string;
  polls: number;
  comment: string | null;
}

export interface FakeLnurlOptions {
  /** Verify polls before an invoice reports settled (default 0 = at once). */
  settleAfterPolls?: number;
  /** Return an invoice for the wrong amount (default false). */
  wrongAmount?: boolean;
  /** Reveal a preimage that does NOT match the payment hash (default false). */
  wrongPreimage?: boolean;
  /** Callback answers HTTP 500 (default false). */
  callbackFails?: boolean;
}

export interface FakeLnurlServer {
  baseUrl: string;
  payUrl: string;
  invoices: Map<string, FakeInvoice>;
  options: Required<FakeLnurlOptions>;
  close: () => Promise<void>;
}

function json(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
}

export async function startFakeLnurlServer(
  options: FakeLnurlOptions = {},
): Promise<FakeLnurlServer> {
  const opts: Required<FakeLnurlOptions> = {
    settleAfterPolls: options.settleAfterPolls ?? 0,
    wrongAmount: options.wrongAmount ?? false,
    wrongPreimage: options.wrongPreimage ?? false,
    callbackFails: options.callbackFails ?? false,
  };
  const invoices = new Map<string, FakeInvoice>();

  const server: Server = createServer(
    (req: IncomingMessage, res: ServerResponse) => {
      const url = new URL(req.url ?? "/", "http://127.0.0.1");
      const baseUrl = `http://127.0.0.1:${(server.address() as { port: number }).port}`;

      if (url.pathname.startsWith("/.well-known/lnurlp/")) {
        const metadata = JSON.stringify([
          ["text/plain", "Kabuna test payment"],
          ["text/identifier", "5tan@altradits.com"],
        ]);
        json(res, 200, {
          tag: "payRequest",
          callback: `${baseUrl}/lnurlp/callback`,
          minSendable: 1000,
          maxSendable: 100_000_000_000,
          metadata,
          commentAllowed: 120,
        });
        return;
      }

      if (url.pathname === "/lnurlp/callback") {
        if (opts.callbackFails) {
          json(res, 500, { status: "ERROR", reason: "Test failure." });
          return;
        }
        const msats = Number(url.searchParams.get("amount"));
        if (
          !Number.isSafeInteger(msats) ||
          msats < 1000 ||
          msats > 100_000_000_000
        ) {
          json(res, 400, { status: "ERROR", reason: "Amount out of range." });
          return;
        }
        const preimage = randomBytes(32).toString("hex");
        const paymentHash = createHash("sha256")
          .update(Buffer.from(preimage, "hex"))
          .digest("hex");
        // Nano-bitcoin HRP: value * 100 msat, so sats*10 encodes sats exactly.
        const amount = opts.wrongAmount ? msats + 1000 : msats;
        const pr = `lnbc${amount / 100}n1${"q".repeat(64)}`;
        const invoice: FakeInvoice = {
          pr,
          paymentHash,
          preimage,
          verifyUrl: `${baseUrl}/lnurlp/verify/${paymentHash}`,
          polls: 0,
          comment: url.searchParams.get("comment"),
        };
        invoices.set(paymentHash, invoice);
        json(res, 200, { pr, verify: invoice.verifyUrl });
        return;
      }

      if (url.pathname.startsWith("/lnurlp/verify/")) {
        const hash = (url.pathname.split("/").pop() ?? "").toLowerCase();
        const invoice = invoices.get(hash);
        if (!invoice) {
          json(res, 404, { status: "ERROR", reason: "Unknown invoice." });
          return;
        }
        invoice.polls += 1;
        const settled = invoice.polls > opts.settleAfterPolls;
        json(res, 200, {
          settled,
          preimage: settled
            ? opts.wrongPreimage
              ? randomBytes(32).toString("hex")
              : invoice.preimage
            : undefined,
        });
        return;
      }

      if (url.pathname === "/lnurlp/redirect") {
        res.writeHead(302, { location: `${baseUrl}/.well-known/lnurlp/test` });
        res.end();
        return;
      }

      if (url.pathname === "/lnurlp/text") {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("not json");
        return;
      }

      if (url.pathname === "/lnurlp/wrong-tag") {
        json(res, 200, {
          tag: "withdrawRequest",
          callback: `${baseUrl}/lnurlp/callback`,
        });
        return;
      }

      json(res, 404, { status: "ERROR", reason: "Not found." });
    },
  );

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = (server.address() as { port: number }).port;
  const baseUrl = `http://127.0.0.1:${port}`;
  return {
    baseUrl,
    payUrl: `${baseUrl}/.well-known/lnurlp/test`,
    invoices,
    options: opts,
    close: () =>
      new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      ),
  };
}
