"use server";

import type { ProductListParams } from "@spree/sdk";
import { cacheLife, cacheTag } from "next/cache";
import {
  cacheTagSuffix,
  DEFAULT_SURFACE,
  getAccessToken,
  getClientForSurface,
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
  options: { locale?: string; country?: string },
  surface: Surface,
  userToken?: string,
) {
  "use cache: remote";
  cacheLife("tenMinutes");
  cacheTag(`products${cacheTagSuffix(surface)}`);
  try {
    const res = await getClientForSurface(surface).products.list(params, {
      ...options,
      // Wholesale catalog requires the customer JWT — the channel is gated.
      ...(surface === "wholesale" && userToken
        ? { token: userToken }
        : undefined),
    });
    return {
      ...res,
      data: (res.data || []).map((p) => enrichProductWithImages(p)),
    } as typeof res;
  } catch {
    let filtered = [...KABUNA_PRODUCTS];
    if (params?.in_category) {
      filtered = filtered.filter((p) =>
        p.categories?.some(
          (c) =>
            c.id === params.in_category ||
            c.permalink === params.in_category ||
            c.permalink?.endsWith(`/${params.in_category}`),
        ),
      );
    }
    const limit = params?.limit ?? 12;
    const page = params?.page ?? 1;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);
    return {
      data,
      meta: {
        total_count: filtered.length,
        total_pages: Math.ceil(filtered.length / limit) || 1,
      },
    } as unknown as Awaited<
      ReturnType<ReturnType<typeof getClientForSurface>["products"]["list"]>
    >;
  }
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
  expand: string[],
  options: { locale?: string; country?: string },
  surface: Surface,
  userToken?: string,
) {
  "use cache: remote";
  cacheLife("tenMinutes");
  cacheTag(
    `products${cacheTagSuffix(surface)}`,
    `product:${slugOrId}${cacheTagSuffix(surface)}`,
  );
  try {
    const res = await getClientForSurface(surface).products.get(
      slugOrId,
      { expand },
      {
        ...options,
        ...(surface === "wholesale" && userToken
          ? { token: userToken }
          : undefined),
      },
    );
    if ("data" in res && res.data) {
      return {
        ...res,
        data: enrichProductWithImages(res.data),
      } as typeof res;
    }
    return enrichProductWithImages(res) as typeof res;
  } catch (error) {
    const product = KABUNA_PRODUCTS.find(
      (p) => p.slug === slugOrId || p.id === slugOrId,
    );
    if (product) {
      return { data: enrichProductWithImages(product) } as unknown as Awaited<
        ReturnType<ReturnType<typeof getClientForSurface>["products"]["get"]>
      >;
    }
    throw error;
  }
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
  params: Record<string, unknown> | undefined,
  options: { locale?: string; country?: string },
  surface: Surface,
  userToken?: string,
) {
  "use cache: remote";
  cacheLife("tenMinutes");
  cacheTag(`product-filters${cacheTagSuffix(surface)}`);
  try {
    return await getClientForSurface(surface).products.filters(params, {
      ...options,
      ...(surface === "wholesale" && userToken
        ? { token: userToken }
        : undefined),
    });
  } catch {
    return {
      data: {
        price: [
          { value: "0-20", count: 2 },
          { value: "20-25", count: 4 },
          { value: "25-30", count: 1 },
          { value: "50+", count: 1 },
        ],
        option_types: [],
      },
    } as unknown as Awaited<
      ReturnType<ReturnType<typeof getClientForSurface>["products"]["filters"]>
    >;
  }
}

export async function getProductFilters(
  params?: Record<string, unknown>,
  surface: Surface = DEFAULT_SURFACE,
) {
  const options = await getLocaleOptions();
  const userToken = await getAccessToken();
  return cachedGetProductFilters(params, options, surface, userToken);
}
