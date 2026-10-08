import type {
  Address,
  AddressParams,
  Cart,
  Fulfillment,
  LineItem,
  PaymentMethod,
  Product,
  Variant,
} from "@spree/sdk";
import {
  clearCartCookies,
  clearLocalCartRaw,
  DEFAULT_SURFACE,
  getLocalCartRaw,
  type Surface,
  setCartCookies,
  setLocalCartRaw,
} from "@/lib/spree";
import { enrichProductWithImages, KABUNA_PRODUCTS } from "./kabuna-coffee-data";

export interface LocalCartItem {
  id: string;
  variantId: string;
  quantity: number;
}

export interface LocalCartData {
  id: string;
  token: string;
  surface: Surface;
  email?: string | null;
  shipping_address?: Address | null;
  billing_address?: Address | null;
  selected_delivery_rate_id?: string | null;
  completed?: boolean;
  items: LocalCartItem[];
}

/** Check whether a cart ID belongs to an in-session local fallback cart. */
export function isLocalCartId(cartId?: string | null): boolean {
  return Boolean(cartId?.startsWith("cart_local_"));
}

/** Detect if an error is a network connection failure (e.g. Spree API down/unreachable). */
export function isNetworkError(error: unknown): boolean {
  if (!error) return false;
  if (
    error instanceof TypeError &&
    error.message.toLowerCase().includes("fetch")
  ) {
    return true;
  }
  if (typeof error === "object" && error !== null) {
    const err = error as {
      message?: string;
      code?: string;
      status?: number;
      cause?: { code?: string; message?: string };
    };
    if (err.status && [502, 503, 504].includes(err.status)) {
      return true;
    }
    const msg = (err.message || "").toLowerCase();
    if (
      msg.includes("fetch failed") ||
      msg.includes("econnrefused") ||
      msg.includes("enotfound") ||
      msg.includes("failed to fetch") ||
      msg.includes("network error") ||
      msg.includes("connection refused") ||
      msg.includes("etimedout") ||
      msg.includes("econnreset")
    ) {
      return true;
    }
    const causeCode = err.cause?.code;
    if (
      causeCode &&
      ["ECONNREFUSED", "ENOTFOUND", "ETIMEDOUT", "ECONNRESET"].includes(
        causeCode,
      )
    ) {
      return true;
    }
    const causeMsg = (err.cause?.message || "").toLowerCase();
    if (
      causeMsg.includes("econnrefused") ||
      causeMsg.includes("fetch failed")
    ) {
      return true;
    }
  }
  return false;
}

/** Look up a product and variant from KABUNA_PRODUCTS matching the variantId or slug or productId. */
export function findProductAndVariant(
  variantId: string,
): { product: Product; variant: Variant } | null {
  // 1. Direct match on variant.id across all products
  for (const rawProduct of KABUNA_PRODUCTS) {
    const product = enrichProductWithImages(rawProduct);
    if (product.variants) {
      const match = product.variants.find((v) => v.id === variantId);
      if (match) return { product, variant: match };
    }
  }

  // 2. Direct match on product.id or default_variant.id
  for (const rawProduct of KABUNA_PRODUCTS) {
    const product = enrichProductWithImages(rawProduct);
    if (
      product.id === variantId ||
      product.default_variant?.id === variantId ||
      (product as unknown as Record<string, unknown>).default_variant_id ===
        variantId
    ) {
      const variant = product.default_variant || product.variants?.[0];
      if (variant) return { product, variant };
    }
  }

  // 3. Match on product slug
  const productBySlug = KABUNA_PRODUCTS.find(
    (p) =>
      p.slug === variantId || p.slug.toLowerCase() === variantId.toLowerCase(),
  );
  if (productBySlug) {
    const product = enrichProductWithImages(productBySlug);
    if (product.variants?.[0]) {
      return {
        product,
        variant: product.default_variant || product.variants[0],
      };
    }
  }

  // 4. Case-insensitive or partial match
  for (const rawProduct of KABUNA_PRODUCTS) {
    const product = enrichProductWithImages(rawProduct);
    const vMatch = product.variants?.find(
      (v) => v.id.toLowerCase() === variantId.toLowerCase(),
    );
    if (vMatch) return { product, variant: vMatch };
  }

  // 5. Default fallback to first product if somehow completely unknown
  if (KABUNA_PRODUCTS[0]) {
    const product = enrichProductWithImages(KABUNA_PRODUCTS[0]);
    const variant = product.default_variant || product.variants?.[0];
    if (variant) {
      return { product, variant };
    }
  }

  return null;
}

/** Convert raw LocalCartData into a full @spree/sdk Cart object. */
export function hydrateLocalCart(data: LocalCartData): Cart {
  let totalQuantity = 0;
  let totalCents = 0;

  const lineItems: LineItem[] = [];

  for (const item of data.items) {
    const lookup = findProductAndVariant(item.variantId);
    if (!lookup) continue;

    const { product, variant } = lookup;
    const priceCents = variant.price?.amount_in_cents ?? 0;
    const lineTotalCents = priceCents * item.quantity;
    const unitPriceStr = (priceCents / 100).toFixed(2);
    const lineTotalStr = (lineTotalCents / 100).toFixed(2);

    totalQuantity += item.quantity;
    totalCents += lineTotalCents;

    const compareAtAmount = variant.price?.compare_at_amount ?? null;
    const displayCompareAtAmount =
      variant.price?.display_compare_at_amount ?? null;

    lineItems.push({
      id: item.id,
      variant_id: variant.id,
      seller_id: null,
      preorder: false,
      preorder_ships_at: null,
      quantity: item.quantity,
      currency: "USD",
      name: product.name,
      slug: product.slug,
      options_text: variant.options_text || "",
      price: unitPriceStr,
      display_price: `$${unitPriceStr}`,
      total: lineTotalStr,
      display_total: `$${lineTotalStr}`,
      adjustment_total: "0.00",
      display_adjustment_total: "$0.00",
      additional_tax_total: "0.00",
      display_additional_tax_total: "$0.00",
      included_tax_total: "0.00",
      display_included_tax_total: "$0.00",
      discount_total: "0.00",
      display_discount_total: "$0.00",
      pre_tax_amount: lineTotalStr,
      display_pre_tax_amount: `$${lineTotalStr}`,
      discounted_amount: lineTotalStr,
      display_discounted_amount: `$${lineTotalStr}`,
      compare_at_amount: compareAtAmount,
      display_compare_at_amount: displayCompareAtAmount,
      thumbnail_url:
        product.thumbnail_url || product.primary_media?.mini_url || null,
      option_values: variant.option_values || [],
    } as LineItem);
  }

  // Calculate delivery fee if applicable
  let deliveryCents = 0;
  if (data.selected_delivery_rate_id === "rate_express") {
    deliveryCents = 1500;
  }
  const deliveryStr = (deliveryCents / 100).toFixed(2);
  const displayDeliveryStr = `$${deliveryStr}`;

  const grandTotalCents = totalCents + deliveryCents;
  const subtotalStr = (totalCents / 100).toFixed(2);
  const displaySubtotal = `$${subtotalStr}`;
  const grandTotalStr = (grandTotalCents / 100).toFixed(2);
  const displayGrandTotal = `$${grandTotalStr}`;

  // Standard fulfillment delivery rates
  const fulfillments: Fulfillment[] = data.shipping_address
    ? [
        {
          id: `ful_${data.id}`,
          state: "ready",
          stock_location: {
            id: "loc_addis",
            name: "Addis Ababa Roastery & Central Vault",
          },
          delivery_rates: [
            {
              id: "rate_standard",
              name: "Standard Insured Courier (3–5 business days)",
              cost: "0.00",
              display_cost: "Free",
              selected: data.selected_delivery_rate_id !== "rate_express",
            },
            {
              id: "rate_express",
              name: "Highland Priority Air Express (1–2 business days)",
              cost: "15.00",
              display_cost: "$15.00",
              selected: data.selected_delivery_rate_id === "rate_express",
            },
          ],
        } as unknown as Fulfillment,
      ]
    : [];

  const paymentMethods: PaymentMethod[] = [
    {
      id: "pm_kabuna_direct",
      name: "Direct Invoice / Bank Transfer / M-Pesa",
      description: "Secure payment arrangement upon order confirmation",
      session_required: false,
      available_to_users: true,
      available_to_admin: true,
    } as unknown as PaymentMethod,
  ];

  return {
    id: data.id,
    market_id: "market_us",
    channel_id: null,
    preferred_stock_location_id: null,
    company_id: null,
    company_name: null,
    po_number_required: false,
    po_document_filename: null,
    po_document_byte_size: null,
    number: `KBN-${data.id.slice(-6).toUpperCase()}`,
    token: data.token,
    email: data.email || null,
    customer_note: null,
    po_number: null,
    currency: "USD",
    locale: "en",
    total_quantity: totalQuantity,
    warnings: [],
    coupon_code: null,
    item_total: subtotalStr,
    display_item_total: displaySubtotal,
    adjustment_total: "0.00",
    display_adjustment_total: "$0.00",
    discount_total: "0.00",
    display_discount_total: "$0.00",
    tax_total: "0.00",
    display_tax_total: "$0.00",
    included_tax_total: "0.00",
    display_included_tax_total: "$0.00",
    additional_tax_total: "0.00",
    display_additional_tax_total: "$0.00",
    delivery_total: deliveryStr,
    display_delivery_total: displayDeliveryStr,
    total: grandTotalStr,
    display_total: displayGrandTotal,
    amount_due: grandTotalStr,
    gift_card_total: "0.00",
    items: lineItems,
    state: data.completed ? "complete" : "cart",
    current_step: data.completed ? "complete" : "address",
    payment_state: data.completed ? "paid" : "checkout",
    shipment_state: data.completed ? "ready" : "pending",
    shipping_address: data.shipping_address || null,
    billing_address: data.billing_address || null,
    fulfillments,
    payments: [],
    payment_methods: paymentMethods,
    requirements: [],
  } as unknown as Cart;
}

/** Read raw local cart from cookies and hydrate to Cart. */
export async function getLocalCart(
  surface: Surface = DEFAULT_SURFACE,
): Promise<Cart | null> {
  try {
    const raw = await getLocalCartRaw(surface);
    if (!raw) return null;
    const parsed: LocalCartData = JSON.parse(raw);
    if (!parsed.id || !Array.isArray(parsed.items)) return null;
    return hydrateLocalCart(parsed);
  } catch {
    return null;
  }
}

/** Read raw LocalCartData directly from cookies. */
export async function getRawLocalCartData(
  surface: Surface = DEFAULT_SURFACE,
): Promise<LocalCartData | null> {
  try {
    const raw = await getLocalCartRaw(surface);
    if (!raw) return null;
    const parsed: LocalCartData = JSON.parse(raw);
    if (!parsed.id || !Array.isArray(parsed.items)) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Save LocalCartData to cookies. */
export async function saveLocalCart(
  data: LocalCartData,
  surface: Surface = DEFAULT_SURFACE,
): Promise<void> {
  try {
    await setLocalCartRaw(JSON.stringify(data), surface);
    await setCartCookies(data.id, data.token, surface);
  } catch {
    // Cookie writing is best-effort if executed outside action
  }
}

/** Create a new empty LocalCartData. */
export function createNewLocalCartData(
  surface: Surface = DEFAULT_SURFACE,
): LocalCartData {
  const rand = Math.random().toString(36).slice(2, 9);
  const time = Date.now().toString(36);
  return {
    id: `cart_local_${time}_${rand}`,
    token: `token_local_${time}_${rand}`,
    surface,
    items: [],
  };
}

/** Add an item to local cart, create if doesn't exist, and return hydrated Cart. */
export async function addItemToLocalCart(
  variantId: string,
  quantity: number,
  surface: Surface = DEFAULT_SURFACE,
): Promise<Cart> {
  let cartData = await getRawLocalCartData(surface);
  if (!cartData) {
    cartData = createNewLocalCartData(surface);
  }

  // Check if item already exists in local cart
  const existingItemIndex = cartData.items.findIndex(
    (item) => item.variantId === variantId,
  );

  if (existingItemIndex >= 0) {
    cartData.items[existingItemIndex].quantity += quantity;
  } else {
    const lineId = `li_local_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
    cartData.items.push({
      id: lineId,
      variantId,
      quantity,
    });
  }

  await saveLocalCart(cartData, surface);
  return hydrateLocalCart(cartData);
}

/** Update an item quantity in local cart and return hydrated Cart. */
export async function updateItemInLocalCart(
  lineItemId: string,
  quantity: number,
  surface: Surface = DEFAULT_SURFACE,
): Promise<Cart> {
  let cartData = await getRawLocalCartData(surface);
  if (!cartData) {
    cartData = createNewLocalCartData(surface);
  }

  if (quantity <= 0) {
    cartData.items = cartData.items.filter(
      (item) => item.id !== lineItemId && item.variantId !== lineItemId,
    );
  } else {
    const item = cartData.items.find(
      (item) => item.id === lineItemId || item.variantId === lineItemId,
    );
    if (item) {
      item.quantity = quantity;
    }
  }

  await saveLocalCart(cartData, surface);
  return hydrateLocalCart(cartData);
}

/** Remove an item from local cart and return hydrated Cart. */
export async function removeItemFromLocalCart(
  lineItemId: string,
  surface: Surface = DEFAULT_SURFACE,
): Promise<Cart> {
  let cartData = await getRawLocalCartData(surface);
  if (!cartData) {
    cartData = createNewLocalCartData(surface);
  }

  cartData.items = cartData.items.filter(
    (item) => item.id !== lineItemId && item.variantId !== lineItemId,
  );

  await saveLocalCart(cartData, surface);
  return hydrateLocalCart(cartData);
}

/** Update addresses on local cart. */
export async function updateLocalCartAddresses(
  cartId: string,
  addresses: {
    shipping_address?: AddressParams;
    billing_address?: AddressParams;
    email?: string;
  },
  surface: Surface = DEFAULT_SURFACE,
): Promise<Cart> {
  let cartData = await getRawLocalCartData(surface);
  if (!cartData || cartData.id !== cartId) {
    cartData = createNewLocalCartData(surface);
    cartData.id = cartId;
  }

  if (addresses.email) {
    cartData.email = addresses.email;
  }
  if (addresses.shipping_address) {
    cartData.shipping_address =
      addresses.shipping_address as unknown as Address;
  }
  if (addresses.billing_address) {
    cartData.billing_address = addresses.billing_address as unknown as Address;
  }

  await saveLocalCart(cartData, surface);
  return hydrateLocalCart(cartData);
}

/** Select a delivery rate on local cart. */
export async function selectLocalDeliveryRate(
  cartId: string,
  deliveryRateId: string,
  surface: Surface = DEFAULT_SURFACE,
): Promise<Cart> {
  let cartData = await getRawLocalCartData(surface);
  if (!cartData || cartData.id !== cartId) {
    cartData = createNewLocalCartData(surface);
    cartData.id = cartId;
  }

  cartData.selected_delivery_rate_id = deliveryRateId;
  await saveLocalCart(cartData, surface);
  return hydrateLocalCart(cartData);
}

/** Mark local cart as complete and clear active cookies. */
export async function completeLocalCart(
  cartId: string,
  surface: Surface = DEFAULT_SURFACE,
): Promise<Cart | null> {
  const cartData = await getRawLocalCartData(surface);
  if (!cartData || cartData.id !== cartId) {
    return null;
  }

  cartData.completed = true;
  const completedCart = hydrateLocalCart(cartData);

  // Clear active cart from cookies
  await clearLocalCartRaw(surface);
  await clearCartCookies(surface);

  return completedCart;
}
