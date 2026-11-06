[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)

# Kabuna

Kabuna is an online shop for Ethiopian coffee and gifts, built with Next.js 16
and React 19. It started as a fork of the Spree storefront starter and is
being rebuilt around what the shop actually needs: a local product catalog
and Bitcoin (Lightning) payments that go straight to the shop owner.

The catalog lives in the repo (`src/lib/data/kabuna-coffee-data.ts`):
Ethiopian single-origin coffees alongside buna ceremony goods, pantry snacks,
body care, artisan gifts, and office goods.

## Payments: Bitcoin (Lightning)

Pay with Bitcoin (Lightning) is the main — and currently the only enabled —
way to pay at checkout.

How a payment flows, end to end:

1. The customer fills their address, picks delivery, and Lightning is already
   selected as the payment method.
2. The server converts the order total to sats (see Rates below) and requests
   a BOLT11 invoice for exactly that amount from the shop owner's own
   Lightning address via LNURL-pay (LUD-06/16).
3. The customer scans the QR with any Lightning wallet (or copies the invoice,
   or opens it in their wallet) and pays.
4. The server polls the LUD-21 verify URL. Only when it says settled does the
   order flip to paid. The browser saying "paid" never counts.
5. The customer lands on the order-placed page, which shows the Lightning
   payment hash as the receipt reference.

Non-custodial, by construction: the invoice comes from the shop owner's own
Lightning address, so sats go straight to the owner. Kabuna — and Altradits —
never receive or hold customers' money. There is no Altradits wallet, account,
or payout step in the middle.

The amount, the invoice request, and the verification all happen server-side
(`src/lib/bitcoin/`, `src/app/api/bitcoin/`). The invoice is checked before
it is shown (exact amount, and the LNURL metadata commitment when the
invoice carries one), and a cart that changes after payment cannot complete
on a stale invoice.

Card processors (Stripe, PayPal, Adyen) are still in the tree but switched
off by default behind feature flags — see Configuration.

## Rates

The BTC price is an owner-set rate: `KABUNA_BTC_USD_RATE`. This is deliberate:

- The shop owner controls the price customers see — no mid-checkout re-quotes
  from a volatile spot API.
- Checkout works offline and deterministically — payment never depends on a
  third-party rate API at the critical moment.
- Tests stay hermetic — exact-amount assertions with no network.

An optional live fetch exists for shops that prefer it: when no owner rate is
set and `KABUNA_ALLOW_LIVE_RATE=true`, the server fetches BTC/USD from
Coinbase then Kraken (cached 5 minutes, last good value served stale).
Non-USD currencies convert through USD-base fiat rates, cached an hour.

## Standalone mode (no Spree backend needed)

Kabuna's checkout works without a Spree backend running. The catalog, cart,
countries, and markets all fall back to local data when the API is
unreachable, and Lightning orders are kept in a small order store inside
Kabuna itself: one JSON file per order under `KABUNA_ORDER_DIR`
(default `.data/kabuna-orders/`, git-ignored).

Plainly: this store is just enough for cart → Lightning payment → confirmed
order. It is a local file store, ephemeral on serverless hosts — not a
production order system. When a Spree backend is configured it remains the
system of record for everything except Lightning payments, whose record is
the Kabuna order.

## Configuration

| Variable | Default | What it is |
|----------|---------|------------|
| `KABUNA_LIGHTNING_ADDRESS` | `kabuna@example.com` (placeholder) | **The shop owner's own Lightning address. Stanley must set this to his own Ye₿ente `handle@altradits.com` or node address before taking payments. Money goes here and nowhere else.** |
| `KABUNA_CURRENCY` | `USD` | Checkout currency (ISO 4217). |
| `KABUNA_BTC_USD_RATE` | _(unset)_ | Owner-set BTC price in USD (preferred rate). |
| `KABUNA_ALLOW_LIVE_RATE` | `false` | `true` to fetch a live BTC/USD rate when no owner rate is set. |
| `KABUNA_ORDER_DIR` | `.data/kabuna-orders` | File order store directory. |
| `KABUNA_SUPPORT_PHONE` / `KABUNA_SUPPORT_EMAIL` | `0707172370` / `5tan@altradits.com` | Support contact shown on payment errors. |
| `NEXT_PUBLIC_KABUNA_BITCOIN_ENABLED` | _(on)_ | Set to `false` to hide Lightning. |
| `NEXT_PUBLIC_KABUNA_ENABLE_STRIPE` / `_PAYPAL` / `_ADYEN` | _(off)_ | Set to `true` to switch a card processor back on. |

Test-only: `KABUNA_LNURL_ENDPOINT` points the invoice flow at a direct
LNURL-pay URL (the e2e fake server), and `KABUNA_ALLOW_INSECURE_LNURL`
(defaults on outside production) permits `http://` LNURL endpoints for
localhost only.

## Run it locally

Prerequisites: Node.js 20+, pnpm.

```bash
pnpm install
cp .env.example .env.local
```

Edit `.env.local`: set `KABUNA_LIGHTNING_ADDRESS` to the shop's address and
`KABUNA_BTC_USD_RATE` to the BTC price in USD. No Spree backend is needed —
leave `SPREE_API_URL` unset (or pointing nowhere) to run standalone.

```bash
pnpm run dev        # http://localhost:3001
```

To run against a real Spree backend instead, set `SPREE_API_URL` and
`SPREE_PUBLISHABLE_KEY`.

### Tests

```bash
pnpm test              # vitest: conversion, BOLT11, LNURL flow + verify polling
                       # against a fake LNURL server, paid-only-after-settled
pnpm run test:e2e:bitcoin  # headless Playwright happy path (standalone, no Spree)
pnpm run check         # Biome lint + format
pnpm exec tsc --noEmit # typecheck
```

The full Spree-backed Stripe e2e (`pnpm run test:e2e`) still exists but needs
its Docker backend and Stripe keys; card payments are off by default.

## Tech stack

| Technology | Role |
|------------|------|
| **Next.js 16** | App Router, Server Actions, route handlers |
| **React 19** | Server Components, `use()`/`useActionState` patterns |
| **Tailwind CSS 4** | Utility-first styling |
| **TypeScript** | Strict, full type safety |
| **Lightning / LNURL-pay** | BOLT11 invoices from the owner's address (LUD-06/16), settlement proof via LUD-21 verify |
| **@spree/sdk** | Optional Spree Commerce backend (catalog/cart fallback to local data without one) |
| **Biome** | Lint + format |
| **Vitest / Playwright** | Unit + e2e tests |

## Project structure

```
src/
├── app/
│   ├── api/bitcoin/            # quote / invoice / status route handlers
│   └── [country]/[locale]/     # internationalized routes (checkout + storefront)
├── components/checkout/        # incl. BitcoinPaymentForm (Lightning is default)
├── lib/
│   ├── bitcoin/                # LNURL client, rates, BOLT11 checks, order store
│   └── data/                   # server actions (catalog, cart, checkout, orders)
└── types/
tests/e2e/                      # Lightning e2e + fake LNURL server
```

## License

MIT — see [LICENSE](LICENSE).
