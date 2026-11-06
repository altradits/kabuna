"use client";

import { Check, Copy, Loader2, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";

interface InvoiceData {
  orderId: string;
  number: string;
  pr: string;
  sats: number;
  satsFormatted: string;
  fiatTotalFormatted: string;
  currency: string;
  paymentHash: string | null;
  expiresAt: string;
  supportEmail: string;
  supportPhone: string;
}

interface StatusData {
  status: "pending" | "paid" | "expired" | "cancelled";
  settled: boolean;
  verifiable?: boolean;
  paymentHash: string | null;
  expiresAt?: string;
}

interface BitcoinPaymentFormProps {
  cartId: string;
  email?: string | null;
  /** Current cart total — a change re-prices (or freezes) the invoice. */
  cartTotal: string | null;
  onPaid: (orderId: string) => void;
}

type FormState =
  | { kind: "loading" }
  | { kind: "ready"; invoice: InvoiceData; verifiable: boolean }
  | { kind: "paid"; invoice: InvoiceData }
  | { kind: "expired"; invoice: InvoiceData | null }
  | { kind: "stale"; invoice: InvoiceData }
  | {
      kind: "error";
      message: string;
      supportEmail: string;
      supportPhone: string;
    };

function formatCountdown(expiresAt: string, now: number): string {
  const ms = Date.parse(expiresAt) - now;
  if (ms <= 0) return "0:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function BitcoinPaymentForm({
  cartId,
  email,
  cartTotal,
  onPaid,
}: BitcoinPaymentFormProps) {
  const t = useTranslations("checkout");
  const [state, setState] = useState<FormState>({ kind: "loading" });
  const [copied, setCopied] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [attempt, setAttempt] = useState(0);
  // Cart total the live invoice was priced at. A change before payment
  // re-mints the invoice; a change after payment freezes the form so the
  // customer can never pay twice for one cart.
  const [pricedTotal, setPricedTotal] = useState<string | null>(null);
  const pollRef = useRef<number | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;
  const onPaidRef = useRef(onPaid);
  onPaidRef.current = onPaid;
  const cartTotalRef = useRef(cartTotal);
  cartTotalRef.current = cartTotal;

  // Create the invoice once, then poll our own status endpoint (which
  // verifies against the LUD-21 URL server-side) until it settles.
  useEffect(() => {
    void attempt; // re-runs when the customer requests a new invoice
    let cancelled = false;

    const stopPolling = () => {
      if (pollRef.current !== null) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };

    const poll = async (orderId: string) => {
      try {
        const res = await fetch(
          `/api/bitcoin/status?orderId=${encodeURIComponent(orderId)}`,
        );
        const data = (await res.json()) as StatusData;
        if (cancelled) return;
        if (data.status === "paid" || data.settled) {
          stopPolling();
          setState((prev) =>
            prev.kind === "ready" || prev.kind === "paid"
              ? { kind: "paid", invoice: prev.invoice }
              : prev,
          );
          onPaidRef.current(orderId);
        } else if (data.status === "expired" || data.status === "cancelled") {
          // Cancelled happens when the total changed and the server voided
          // this invoice for a new one — same remedy as expiry.
          stopPolling();
          setState((prev) => ({
            kind: "expired",
            invoice: prev.kind === "ready" ? prev.invoice : null,
          }));
        } else if (data.verifiable === false) {
          setState((prev) =>
            prev.kind === "ready" ? { ...prev, verifiable: false } : prev,
          );
        }
      } catch {
        // Transient poll failure — keep polling; verification fails closed.
      }
    };

    const start = async () => {
      try {
        const res = await fetch("/api/bitcoin/invoice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId, email: email ?? undefined }),
        });
        const data = (await res.json()) as InvoiceData & { error?: string };
        if (cancelled) return;
        if (!res.ok || !data.pr) {
          setState({
            kind: "error",
            message: data.error || t("bitcoinError"),
            supportEmail: data.supportEmail || "",
            supportPhone: data.supportPhone || "",
          });
          return;
        }
        setState({ kind: "ready", invoice: data, verifiable: true });
        setPricedTotal(cartTotalRef.current);
        pollRef.current = window.setInterval(() => poll(data.orderId), 3000);
        poll(data.orderId);
      } catch {
        if (!cancelled) {
          setState({
            kind: "error",
            message: t("bitcoinError"),
            supportEmail: "",
            supportPhone: "",
          });
        }
      }
    };

    start();
    return () => {
      cancelled = true;
      stopPolling();
    };
  }, [cartId, email, t, attempt]);

  // Countdown ticker.
  useEffect(() => {
    if (state.kind !== "ready") return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [state.kind]);

  // Local expiry: the server also reports expired, this just stops the wait.
  useEffect(() => {
    if (state.kind === "ready" && Date.parse(state.invoice.expiresAt) <= now) {
      if (pollRef.current !== null) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
      setState({ kind: "expired", invoice: state.invoice });
    }
  }, [now, state]);

  // Cart total changed after the invoice was priced. Before payment the
  // invoice is re-minted (the server voids the stale one); after payment
  // the form freezes — the customer must not pay again, the shop resolves
  // the difference out of band.
  useEffect(() => {
    if (pricedTotal === null || cartTotal === pricedTotal) return;
    if (state.kind === "paid") {
      if (pollRef.current !== null) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
      setState({ kind: "stale", invoice: state.invoice });
    } else if (state.kind === "ready") {
      setState({ kind: "loading" });
      setAttempt((a) => a + 1);
    }
  }, [cartTotal, pricedTotal, state]);

  const handleCopy = async (pr: string) => {
    try {
      await navigator.clipboard.writeText(pr);
    } catch {
      const area = document.createElement("textarea");
      area.value = pr;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleNewInvoice = () => {
    setNow(Date.now());
    setState({ kind: "loading" });
    setAttempt((a) => a + 1);
  };

  if (state.kind === "loading") {
    return (
      <div
        className="flex items-center justify-center py-10"
        data-testid="bitcoin-loading"
      >
        <Loader2 className="animate-spin h-5 w-5 text-gray-400" />
        <span className="ml-2 text-sm text-gray-500">
          {t("bitcoinLoading")}
        </span>
      </div>
    );
  }

  if (state.kind === "error") {
    return (
      <div className="px-4 py-6 text-center" data-testid="bitcoin-error">
        <p className="text-sm text-red-700">{state.message}</p>
        {(state.supportEmail || state.supportPhone) && (
          <p className="mt-2 text-sm text-gray-500">
            {t("bitcoinNeedHelp", {
              email: state.supportEmail,
              phone: state.supportPhone,
            })}
          </p>
        )}
      </div>
    );
  }

  if (state.kind === "expired") {
    return (
      <div className="px-4 py-6 text-center" data-testid="bitcoin-expired">
        <p className="text-sm text-gray-700">{t("bitcoinExpired")}</p>
        <button
          type="button"
          onClick={handleNewInvoice}
          className="mt-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
        >
          {t("bitcoinNewInvoice")}
        </button>
      </div>
    );
  }

  if (state.kind === "stale") {
    return (
      <div className="px-4 py-6 text-center" data-testid="bitcoin-stale">
        <p className="text-sm text-gray-700">{t("bitcoinStale")}</p>
        <p className="mt-2 text-sm text-gray-500">
          {t("bitcoinNeedHelp", {
            email: state.invoice.supportEmail,
            phone: state.invoice.supportPhone,
          })}
        </p>
      </div>
    );
  }

  if (state.kind === "paid") {
    return (
      <div className="px-4 py-8 text-center" data-testid="bitcoin-paid">
        <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
          <Check className="h-5 w-5 text-green-700" />
        </span>
        <p className="text-sm font-medium text-gray-900">{t("bitcoinPaid")}</p>
      </div>
    );
  }

  const { invoice, verifiable } = state;

  return (
    <div className="px-4 py-4" data-testid="bitcoin-form">
      <div className="text-center">
        <p
          className="text-lg font-bold text-gray-900"
          data-testid="bitcoin-sats"
        >
          {invoice.satsFormatted} sats
        </p>
        <p className="text-sm text-gray-500">
          {invoice.fiatTotalFormatted} {invoice.currency}
        </p>
      </div>

      <div
        className="mx-auto mt-4 w-fit rounded-lg border bg-white p-3"
        data-testid="bitcoin-qr"
      >
        <QRCode
          value={invoice.pr}
          size={224}
          bgColor="#FFFFFF"
          fgColor="#111827"
        />
      </div>
      <p className="mt-2 text-center text-xs text-gray-500">
        {t("bitcoinScan")}
      </p>

      <div className="mt-3 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => handleCopy(invoice.pr)}
          data-testid="bitcoin-copy"
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? t("bitcoinCopied") : t("bitcoinCopy")}
        </button>
        <a
          href={`lightning:${invoice.pr}`}
          data-testid="bitcoin-open-wallet"
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
        >
          <Wallet className="h-4 w-4" />
          {t("bitcoinOpenWallet")}
        </a>
      </div>

      <details className="mt-3">
        <summary className="cursor-pointer text-center text-xs text-gray-500">
          {t("bitcoinInvoice")}
        </summary>
        <p
          className="mt-1 break-all rounded-md bg-gray-100 p-2 text-[11px] text-gray-600"
          data-testid="bitcoin-invoice"
        >
          {invoice.pr}
        </p>
      </details>

      <div
        className="mt-3 flex items-center justify-center gap-2"
        data-testid="bitcoin-status"
      >
        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
        <p className="text-sm text-gray-600">
          {verifiable ? t("bitcoinWaiting") : t("bitcoinManualVerify")}
        </p>
      </div>
      <p className="mt-1 text-center text-xs text-gray-500">
        {t("bitcoinExpiresIn", {
          time: formatCountdown(invoice.expiresAt, now),
        })}
      </p>
    </div>
  );
}
