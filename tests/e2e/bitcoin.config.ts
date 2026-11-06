import { defineConfig, devices } from "@playwright/test";

/**
 * Bitcoin (Lightning) checkout e2e — standalone, no Spree backend.
 *
 * Boots the fake LNURL server plus `next dev` pointed at it
 * (KABUNA_LNURL_ENDPOINT) with an owner-set rate, and SPREE_API_URL aimed
 * at a dead port so every Spree call falls back to Kabuna's local
 * catalog, cart, and order store.
 *
 * Browsers: bundled Chromium, headless only. Never --headed, never the
 * system Chrome app.
 *
 * Run with: pnpm run test:e2e:bitcoin
 */
const FAKE_LNURL_PORT = process.env.FAKE_LNURL_PORT || "4197";

export default defineConfig({
  testDir: ".",
  testMatch: "bitcoin.spec.ts",
  timeout: 180_000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
    {
      // Commands run from the config directory by default; root them at
      // the repo so both servers share one working tree.
      cwd: "../..",
      command: "node tests/e2e/fake-lnurl-server.mjs",
      port: Number(FAKE_LNURL_PORT),
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
      stdout: "pipe",
      stderr: "pipe",
      env: {
        FAKE_LNURL_PORT,
        SETTLE_AFTER_POLLS: "2",
      },
    },
    {
      cwd: "../..",
      command: "pnpm exec next dev -p 3001 --turbopack",
      url: "http://localhost:3001/us/en",
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
      stdout: "pipe",
      stderr: "pipe",
      env: {
        KABUNA_LNURL_ENDPOINT: `http://127.0.0.1:${FAKE_LNURL_PORT}/.well-known/lnurlp/test`,
        KABUNA_BTC_USD_RATE: "100000",
        KABUNA_ALLOW_INSECURE_LNURL: "true",
        KABUNA_ORDER_DIR: "test-results/kabuna-orders",
        SPREE_API_URL: "http://127.0.0.1:9",
      },
    },
  ],
});
