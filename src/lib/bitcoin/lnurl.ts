/**
 * LNURL-pay client (LUD-06/16) with LUD-21 payment verification.
 *
 * Follows the Altradits pattern (lib/lnaddr.js, lib/lightning.js):
 * - The shop owner's own Lightning address is the destination (kTown
 *   non-custodial pattern: front the merchant's address, never hold money).
 * - The address and the LNURL server are untrusted: https only (http only
 *   for localhost in dev/test), no userinfo, no bare IPs, no redirects,
 *   short timeout, 64 kB cap, JSON only.
 * - Never hand out an invoice for a different amount than asked for, and
 *   when the invoice commits to a description it must commit to this
 *   order's metadata.
 * - Payment counts only when the LUD-21 verify URL says settled.
 */

import crypto from "node:crypto";
import net from "node:net";
import {
  bolt11DescriptionHash,
  bolt11Msats,
  bolt11PaymentHash,
} from "./bolt11";

export class LnurlError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

const UNREACHABLE = "That Lightning address isn't reachable.";
const MAX_BYTES = 65536;

type FetchLike = (url: string, init?: RequestInit) => Promise<Response>;

// ------------------------------------------------------------- addresses

const USER_RE = /^[a-z0-9._+-]{1,64}$/;
const LABEL_RE = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const TLD_RE = /^[a-z]{2,}$/;

export interface LnAddressParts {
  user: string;
  domain: string;
}

/** Strict user@domain parse. Throws LnurlError on anything else. */
export function parseLnAddress(input: string): LnAddressParts {
  const bad = "Enter a Lightning address like name@wallet.com.";
  const cleaned = String(input || "")
    .trim()
    .replace(/^lightning:/i, "")
    .toLowerCase();
  const at = cleaned.indexOf("@");
  if (cleaned.length > 254 || at < 0 || at !== cleaned.lastIndexOf("@")) {
    throw new LnurlError(bad);
  }
  const user = cleaned.slice(0, at);
  const domain = cleaned.slice(at + 1);
  if (
    !USER_RE.test(user) ||
    user.startsWith(".") ||
    user.endsWith(".") ||
    user.includes("..")
  ) {
    throw new LnurlError(bad);
  }
  const labels = domain.split(".");
  if (
    domain.length > 253 ||
    labels.length < 2 ||
    !labels.every((l) => LABEL_RE.test(l)) ||
    !TLD_RE.test(labels[labels.length - 1])
  ) {
    throw new LnurlError(bad);
  }
  return { user, domain };
}

/** LNURL-pay endpoint for a Lightning address (LUD-16). */
export function lnurlPayUrl(address: string): string {
  const { user, domain } = parseLnAddress(address);
  return `https://${domain}/.well-known/lnurlp/${encodeURIComponent(user)}`;
}

// ------------------------------------------------------------- safe fetch

function isLocalhost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

export interface LnurlFetchOptions {
  allowInsecure?: boolean;
  fetchFn?: FetchLike;
}

/**
 * One LNURL request: plain https (http for localhost only when allowed),
 * no redirects, JSON only, 64 kB cap. Network and protocol failures
 * collapse to one sentence so the endpoint can't map our network.
 */
export async function fetchLnurlJson(
  url: string,
  options?: LnurlFetchOptions,
): Promise<Record<string, unknown>> {
  let parsed: URL | null = null;
  try {
    parsed = new URL(url);
  } catch {
    parsed = null;
  }
  const allowInsecure = options?.allowInsecure ?? false;
  const isLocal = parsed ? isLocalhost(parsed.hostname) : false;
  const protocolOk =
    parsed?.protocol === "https:" ||
    (allowInsecure && isLocal && parsed?.protocol === "http:");
  if (
    !parsed ||
    !protocolOk ||
    parsed.username ||
    parsed.password ||
    !parsed.hostname
  ) {
    throw new LnurlError(UNREACHABLE, 502);
  }
  if (!isLocal && net.isIP(parsed.hostname.replace(/^\[|\]$/g, ""))) {
    throw new LnurlError(UNREACHABLE, 502);
  }
  const fetchFn = options?.fetchFn ?? fetch;
  let res: Response;
  try {
    res = await fetchFn(parsed.href, {
      signal: AbortSignal.timeout(8000),
      headers: { Accept: "application/json" },
      redirect: "manual",
    });
  } catch {
    throw new LnurlError(UNREACHABLE, 502);
  }
  if (res.status >= 300 && res.status < 400) {
    throw new LnurlError(UNREACHABLE, 502); // no redirects followed, none accepted
  }
  const type = String(res.headers.get("content-type") || "")
    .split(";")[0]
    .trim()
    .toLowerCase();
  if (type !== "application/json") {
    throw new LnurlError(UNREACHABLE, 502);
  }
  const text = await res.text().catch(() => "");
  if (text.length > MAX_BYTES) {
    throw new LnurlError(UNREACHABLE, 502);
  }
  const data = ((): unknown => {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  })();
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new LnurlError(UNREACHABLE, 502);
  }
  const body = data as Record<string, unknown>;
  if (!res.ok || body.status === "ERROR") {
    throw new LnurlError(String(body.reason || UNREACHABLE).slice(0, 200), 502);
  }
  return body;
}

// ------------------------------------------------------------- pay request

export interface LnurlPayParams {
  callback: string;
  minSendableMsat: number;
  maxSendableMsat: number;
  metadata: string;
  commentAllowed: number;
}

export async function resolveLnurlPay(
  endpoint: string,
  options?: LnurlFetchOptions,
): Promise<LnurlPayParams> {
  const pay = await fetchLnurlJson(endpoint, options);
  if (
    pay.tag !== "payRequest" ||
    typeof pay.callback !== "string" ||
    !pay.callback
  ) {
    throw new LnurlError(UNREACHABLE, 502);
  }
  const min = Number(pay.minSendable);
  const max = Number(pay.maxSendable);
  const commentChars = Math.floor(Number(pay.commentAllowed) || 0);
  return {
    callback: pay.callback,
    minSendableMsat: Number.isFinite(min) ? Math.max(0, min) : 1000,
    maxSendableMsat: Number.isFinite(max) ? Math.max(0, max) : 100_000_000_000,
    metadata: typeof pay.metadata === "string" ? pay.metadata : "",
    commentAllowed:
      Number.isSafeInteger(commentChars) && commentChars > 0
        ? Math.min(commentChars, 1000)
        : 0,
  };
}

// ------------------------------------------------------------- invoice

export interface LnurlInvoice {
  /** BOLT11 invoice, exact amount verified. */
  pr: string;
  /** Payment hash, when it could be determined. */
  paymentHash: string | null;
  /** LUD-21 verify URL, when the server provides one. */
  verifyUrl: string | null;
  metadata: string;
}

function hashFromVerifyUrl(verifyUrl: string | null): string | null {
  if (!verifyUrl) return null;
  try {
    const tail =
      new URL(verifyUrl).pathname.split("/").filter(Boolean).pop() ?? "";
    return /^[0-9a-f]{64}$/i.test(tail) ? tail.toLowerCase() : null;
  } catch {
    return null;
  }
}

/**
 * An invoice for exactly `sats`, from the address's own callback.
 * `target` is the LNURL-pay endpoint URL (derived from the shop's
 * Lightning address, or the test override in dev/test).
 */
export async function requestLnurlInvoice(
  target: string,
  sats: number,
  comment?: string,
  options?: LnurlFetchOptions,
): Promise<LnurlInvoice> {
  if (!Number.isSafeInteger(sats) || sats < 1) {
    throw new LnurlError("Enter a whole number of sats.");
  }
  const msats = sats * 1000;
  if (!Number.isSafeInteger(msats)) {
    throw new LnurlError("That amount isn't possible.");
  }
  const pay = await resolveLnurlPay(target, options);
  if (msats < pay.minSendableMsat || msats > pay.maxSendableMsat) {
    const lo = Math.ceil(pay.minSendableMsat / 1000).toLocaleString("en-US");
    const hi = Math.floor(pay.maxSendableMsat / 1000).toLocaleString("en-US");
    throw new LnurlError(`This address accepts ${lo} to ${hi} sats.`);
  }
  let callback: URL | null = null;
  try {
    callback = new URL(pay.callback);
  } catch {
    callback = null;
  }
  // The callback may name another host (real wallets do); it must still be
  // plain https without userinfo, never a bare IP literal. Localhost http is
  // allowed only for the dev/test fake server.
  const allowInsecure = options?.allowInsecure ?? false;
  const callbackLocal = callback ? isLocalhost(callback.hostname) : false;
  const callbackProtocolOk =
    callback?.protocol === "https:" ||
    (allowInsecure && callbackLocal && callback?.protocol === "http:");
  if (
    !callback ||
    !callbackProtocolOk ||
    callback.username ||
    callback.password ||
    !callback.hostname ||
    (!callbackLocal && net.isIP(callback.hostname.replace(/^\[|\]$/g, "")))
  ) {
    throw new LnurlError(UNREACHABLE, 502);
  }
  callback.searchParams.set("amount", String(msats));
  const cleanComment = String(comment ?? "")
    .trim()
    .slice(0, 500);
  if (pay.commentAllowed > 0 && cleanComment) {
    callback.searchParams.set(
      "comment",
      cleanComment.slice(0, pay.commentAllowed),
    );
  }
  const inv = await fetchLnurlJson(callback.href, options);
  const pr = String(inv.pr || "");
  // Never hand out an invoice for a different amount than asked for.
  if (!pr || bolt11Msats(pr) !== msats) {
    throw new LnurlError(
      "The address returned an invoice for a different amount.",
      502,
    );
  }
  // An invoice that commits to a description must commit to this metadata (LUD-06).
  const descriptionHash = bolt11DescriptionHash(pr.toLowerCase());
  if (descriptionHash && pay.metadata) {
    const expected = crypto
      .createHash("sha256")
      .update(pay.metadata)
      .digest("hex");
    if (descriptionHash !== expected) {
      throw new LnurlError(
        "The address returned an invoice for something else.",
        502,
      );
    }
  }
  const verifyUrl =
    typeof inv.verify === "string" && inv.verify ? inv.verify : null;
  const paymentHash =
    bolt11PaymentHash(pr.toLowerCase()) ??
    (typeof inv.payment_hash === "string" &&
    /^[0-9a-f]{64}$/i.test(inv.payment_hash)
      ? inv.payment_hash.toLowerCase()
      : null) ??
    hashFromVerifyUrl(verifyUrl);
  return { pr, paymentHash, verifyUrl, metadata: pay.metadata };
}

// ------------------------------------------------------------- LUD-21 verify

export interface VerifyResult {
  settled: boolean;
  preimage: string | null;
}

/**
 * Build the URL to poll: providers either return a complete per-invoice
 * URL or a template/base needing the payment hash appended.
 */
export function buildVerifyUrl(
  verify: string,
  paymentHash: string | null,
): string {
  if (/\{(payment_?hash|hash)\}/i.test(verify)) {
    return verify.replace(/\{(payment_?hash|hash)\}/gi, paymentHash ?? "");
  }
  if (
    paymentHash &&
    !verify.toLowerCase().includes(paymentHash.toLowerCase())
  ) {
    return `${verify.replace(/\/$/, "")}/${paymentHash}`;
  }
  return verify;
}

/**
 * Poll the LUD-21 verify URL. Returns settled only when the server says so;
 * when a preimage is revealed it must hash to the payment hash.
 */
export async function pollVerify(
  verify: string,
  paymentHash: string | null,
  options?: LnurlFetchOptions,
): Promise<VerifyResult> {
  let body: Record<string, unknown>;
  const primary = buildVerifyUrl(verify, paymentHash);
  try {
    body = await fetchLnurlJson(primary, options);
  } catch (error) {
    // A complete per-invoice URL (e.g. token-style, with no visible hash)
    // breaks if the hash was appended above — try it exactly as the server
    // returned it before giving up.
    if (primary !== verify) {
      body = await fetchLnurlJson(verify, options);
    } else {
      throw error;
    }
  }
  const settled =
    body.settled === true ||
    body.status === "settled" ||
    body.paid === true ||
    body.isPaid === true;
  const preimage =
    typeof body.preimage === "string" ? body.preimage.toLowerCase() : null;
  if (settled && preimage && paymentHash) {
    const digest = crypto
      .createHash("sha256")
      .update(Buffer.from(preimage, "hex"))
      .digest("hex");
    if (digest !== paymentHash.toLowerCase()) {
      throw new LnurlError(
        "The payment proof doesn't match this invoice.",
        502,
      );
    }
  }
  return { settled, preimage };
}
