import { expect, type Page, test } from "@playwright/test";

/**
 * Lightning checkout happy path — standalone, no Spree backend.
 *
 * Guest walks products listing → PDP → cart → checkout, fills an address,
 * keeps the free standard delivery, and pays the Lightning invoice from
 * the fake LNURL server (auto-settles after 2 verify polls). Ends on the
 * Kabuna receipt showing the order number and the payment hash.
 *
 * Run with: pnpm run test:e2e:bitcoin (bundled Chromium, headless only)
 */

const TEST_EMAIL = "5tan@altradits.com";

test("guest can pay with Lightning and sees the payment hash receipt", async ({
  page,
}) => {
  // 1. Products listing → first product.
  await page.goto("/us/en/products");
  const firstProduct = page.locator('a[href*="/products/"]').first();
  await expect(firstProduct).toBeVisible({ timeout: 30_000 });
  await expect(async () => {
    if (!/\/products\/[^/]+/.test(page.url())) {
      await firstProduct.click({ timeout: 5_000 });
    }
    await page.waitForURL(/\/products\/[^/]+/, { timeout: 5_000 });
  }).toPass({ timeout: 60_000 });

  // 2. Add to cart, follow the drawer checkout link (read its href inside
  // the retry — the drawer remounts as the cart revalidates).
  const addToCart = page.getByRole("button", { name: /add to cart/i });
  await expect(addToCart).toBeEnabled({ timeout: 10_000 });
  await addToCart.click();

  const cartButton = page.getByRole("button", { name: /open cart/i });
  const drawerCheckout = page
    .getByRole("dialog")
    .getByRole("link", { name: /^checkout$/i });
  let checkoutHref: string | null = null;
  await expect(async () => {
    if (!(await drawerCheckout.count())) {
      const badge = (await cartButton.textContent({ timeout: 3_000 })) ?? "";
      if (/\d/.test(badge)) {
        await cartButton.click({ timeout: 3_000 });
      } else {
        await addToCart.click({ timeout: 3_000 });
      }
    }
    await expect(drawerCheckout).toBeVisible({ timeout: 5_000 });
    checkoutHref = await drawerCheckout.getAttribute("href", {
      timeout: 3_000,
    });
    if (!checkoutHref) {
      throw new Error("Drawer checkout link has no href");
    }
  }).toPass({ timeout: 60_000 });
  if (!checkoutHref) {
    throw new Error("Drawer checkout link has no href");
  }
  await page.goto(checkoutHref);

  // 3. Contact + shipping address. Ethiopia needs no states, so the
  // address form stays a plain text flow in standalone mode.
  const email = page.getByPlaceholder(/email address/i);
  await expect(email).toHaveCount(1, { timeout: 30_000 });
  await email.fill(TEST_EMAIL);
  await fillAddress(page);
  await page.getByRole("heading", { name: /shipping method/i }).click();

  // 4. Keep the free standard rate (first radio).
  const firstRate = page.getByRole("radio").first();
  await expect(firstRate).toBeVisible({ timeout: 30_000 });
  await firstRate.check();

  // 5. Lightning is the default method: the invoice QR appears, the fake
  // server settles after 2 polls, and the form reports paid.
  const form = page.getByTestId("bitcoin-form");
  await expect(form).toBeVisible({ timeout: 30_000 });
  await expect(page.getByTestId("bitcoin-qr")).toBeVisible();
  await expect(page.getByTestId("bitcoin-sats")).toContainText("sats");
  const invoice = await page.getByTestId("bitcoin-invoice").textContent();
  expect(invoice ?? "").toMatch(/^lnbc\d+n1/);
  const walletHref = await page
    .getByTestId("bitcoin-open-wallet")
    .getAttribute("href");
  expect(walletHref ?? "").toMatch(/^lightning:lnbc/);
  await page.getByTestId("bitcoin-copy").click();
  await expect(page.getByTestId("bitcoin-copy")).toContainText(/copied/i);
  await expect(page.getByTestId("bitcoin-paid")).toBeVisible({
    timeout: 60_000,
  });

  // 6. Accept policies + place the order, land on the Kabuna receipt.
  await page.getByRole("checkbox", { name: /i agree/i }).check();
  await page
    .getByRole("button", { name: /pay now|place order/i })
    .click({ timeout: 10_000 });
  await page.waitForURL(/\/order-placed\/kbn_/, { timeout: 60_000 });

  await expect(page.getByTestId("bitcoin-receipt")).toBeVisible();
  await expect(page.getByText(/order #/i)).toBeVisible();
  const hash = await page.getByTestId("bitcoin-receipt-hash").textContent();
  expect(hash?.trim() ?? "").toMatch(/^[0-9a-f]{64}$/i);
});

async function fillAddress(page: Page) {
  await page.getByLabel(/country/i).selectOption({ label: "Ethiopia" });

  await page
    .getByLabel(/first name/i)
    .first()
    .fill("Test");
  await page
    .getByLabel(/last name/i)
    .first()
    .fill("Buyer");
  await page
    .getByLabel(/^address$/i)
    .first()
    .fill("123 Test St");
  await page.getByLabel(/city/i).first().fill("Addis Ababa");
  await page.getByLabel(/phone/i).first().fill("0707172370");

  // Ethiopia requires no state or postcode — fill them only if rendered.
  const state = page.getByLabel(/state|province/i).first();
  if (await state.count()) {
    const tag = await state.evaluate((el) => el.tagName.toLowerCase());
    if (tag === "input") {
      await state.fill("Addis Ababa");
    }
  }
  const zip = page.getByLabel(/zip|postal code/i).first();
  if (await zip.count()) {
    await zip.fill("1000");
  }
}
