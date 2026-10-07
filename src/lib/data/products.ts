"use server";

import type { ProductListParams } from "@spree/sdk";
import { cacheLife, cacheTag } from "next/cache";
import {
  cacheTagSuffix,
  DEFAULT_SURFACE,
  getAccessToken,
  type getClientForSurface,
  getLocaleOptions,
  type Surface,
} from "@/lib/spree";
import { enrichProductWithImages, KABUNA_PRODUCTS } from "./kabuna-coffee-data";

/**
 * Cached product list fetch. Cache key is derived from all function
 * arguments by Next.js "use cache":
 *
 * - locale/country: determines language and market-specific pricing
 * - surface: DTC vs wholesale — different catalog + channel pricing. Baked
 *   into both the cache tag and the arguments so the two never share entries.
 * - userToken: per-user cache segmentation (separate arg, NOT passed to
 *   SDK). Authenticated users may see different prices (B2B, loyalty).
 *   Each user's JWT is unique so the cache is segmented per user.
 *   Guest users pass undefined. On the wholesale surface the token is
 *   always present — the channel 401s guests.
 */
export async function cachedListProducts(
  params: ProductListParams | undefined,
  _options: { locale?: string; country?: string },
  surface: Surface,
  _userToken?: string,
) {
  "use cache: remote";
  cacheLife("tenMinutes");
  cacheTag(`products${cacheTagSuffix(surface)}`);

  let filtered = [...KABUNA_PRODUCTS];

  // 1. Category filter
  if (params?.in_category) {
    const cat = params.in_category.toLowerCase();
    filtered = filtered.filter((p) =>
      p.categories?.some(
        (c) =>
          c.id.toLowerCase() === cat ||
          c.permalink?.toLowerCase() === cat ||
          c.permalink?.toLowerCase().endsWith(`/${cat}`) ||
          c.name.toLowerCase() === cat,
      ),
    );
  }

  // 2. Search query filter
  const qObj = params as Record<string, unknown> | undefined;
  const rawQuery = (
    qObj?.q ||
    qObj?.query ||
    (typeof qObj?.filter === "object" && qObj.filter
      ? (qObj.filter as Record<string, unknown>).name
      : undefined)
  )
    ?.toString()
    .toLowerCase()
    .trim();

  if (rawQuery) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(rawQuery) ||
        p.slug.toLowerCase().includes(rawQuery) ||
        p.description?.toLowerCase().includes(rawQuery) ||
        p.meta_description?.toLowerCase().includes(rawQuery) ||
        p.tags?.some((t) => t.toLowerCase().includes(rawQuery)) ||
        p.custom_fields?.some((cf) =>
          cf.value?.toString().toLowerCase().includes(rawQuery),
        ),
    );
  }

  // 3. Sorting
  const sortParam = qObj?.sort?.toString();
  if (sortParam) {
    if (
      sortParam.includes("price") &&
      (sortParam.includes("desc") || sortParam === "price_high_to_low")
    ) {
      filtered.sort(
        (a, b) =>
          (b.price?.amount_in_cents || 0) - (a.price?.amount_in_cents || 0),
      );
    } else if (sortParam.includes("price")) {
      filtered.sort(
        (a, b) =>
          (a.price?.amount_in_cents || 0) - (b.price?.amount_in_cents || 0),
      );
    } else if (sortParam.includes("name") && sortParam.includes("desc")) {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortParam.includes("name")) {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  const limit = params?.limit ?? 12;
  const page = params?.page ?? 1;
  const start = (page - 1) * limit;
  const data = filtered
    .slice(start, start + limit)
    .map((p) => enrichProductWithImages(p));
  const totalPages = Math.ceil(filtered.length / limit) || 1;

  return {
    data,
    meta: {
      count: filtered.length,
      total_count: filtered.length,
      pages: totalPages,
      total_pages: totalPages,
    },
  } as unknown as Awaited<
    ReturnType<ReturnType<typeof getClientForSurface>["products"]["list"]>
  >;
}

export async function getProducts(
  params?: ProductListParams,
  surface: Surface = DEFAULT_SURFACE,
) {
  const options = await getLocaleOptions();
  const userToken = await getAccessToken();
  return cachedListProducts(params, options, surface, userToken);
}

/**
 * Persistent cached product detail fetch. Cache key is derived from:
 *
 * - slugOrId, expand: identify the product and response shape
 * - locale/country: determines language and market-specific pricing
 * - surface: DTC vs wholesale — see cachedListProducts
 * - userToken: per-user cache segmentation (separate arg, NOT passed to
 *   SDK). Authenticated users may see different prices (B2B, loyalty).
 *   Guest users pass undefined, so all guests share one entry.
 */
export async function cachedGetProduct(
  slugOrId: string,
  _expand: string[],
  _options: { locale?: string; country?: string },
  surface: Surface,
  _userToken?: string,
) {
  "use cache: remote";
  cacheLife("tenMinutes");
  cacheTag(
    `products${cacheTagSuffix(surface)}`,
    `product:${slugOrId}${cacheTagSuffix(surface)}`,
  );

  const product = KABUNA_PRODUCTS.find(
    (p) =>
      p.slug.toLowerCase() === slugOrId.toLowerCase() ||
      p.id.toLowerCase() === slugOrId.toLowerCase() ||
      p.name.toLowerCase() === slugOrId.toLowerCase(),
  );

  if (product) {
    return { data: enrichProductWithImages(product) } as unknown as Awaited<
      ReturnType<ReturnType<typeof getClientForSurface>["products"]["get"]>
    >;
  }

  throw new Error(`Product not found: ${slugOrId}`);
}

export async function getProduct(
  slugOrId: string,
  params?: { expand?: string[] },
  surface: Surface = DEFAULT_SURFACE,
) {
  const options = await getLocaleOptions();
  const userToken = await getAccessToken();
  return cachedGetProduct(
    slugOrId,
    params?.expand ?? [],
    options,
    surface,
    userToken,
  );
}

async function cachedGetProductFilters(
  _params: Record<string, unknown> | undefined,
  _options: { locale?: string; country?: string },
  surface: Surface,
  _userToken?: string,
) {
  "use cache: remote";
  cacheLife("tenMinutes");
  cacheTag(`product-filters${cacheTagSuffix(surface)}`);

  return {
    filters: [
      {
        id: "filter_price",
        name: "Price",
        type: "price_range",
        min: 21,
        max: 68,
        currency: "USD",
      },
      {
        id: "filter_process",
        name: "Process",
        type: "option",
        options: [
          { id: "washed", name: "Washed", count: 3 },
          { id: "natural", name: "Natural", count: 3 },
        ],
      },
      {
        id: "filter_bag_size",
        name: "Bag Size",
        type: "option",
        options: [
          { id: "250g", name: "250g", count: 6 },
          { id: "500g", name: "500g", count: 6 },
          { id: "1kg", name: "1kg", count: 6 },
        ],
      },
    ],
    sort_options: [
      { id: "default" },
      { id: "price_asc" },
      { id: "price_desc" },
      { id: "name_asc" },
    ],
    default_sort: "default",
    total_count: KABUNA_PRODUCTS.length,
  } as unknown as Awaited<
    ReturnType<ReturnType<typeof getClientForSurface>["products"]["filters"]>
  >;
}

export async function getProductFilters(
  params?: Record<string, unknown>,
  surface: Surface = DEFAULT_SURFACE,
) {
  const options = await getLocaleOptions();
  const userToken = await getAccessToken();
  return cachedGetProductFilters(params, options, surface, userToken);
}
