"use server";

import type { CategoryListParams, ProductListParams } from "@spree/sdk";
import { cacheLife, cacheTag } from "next/cache";
import { getAccessToken, getClient, getLocaleOptions } from "@/lib/spree";
import { KABUNA_CATEGORIES, KABUNA_PRODUCTS } from "./kabuna-coffee-data";

async function cachedListCategories(
  params: CategoryListParams | undefined,
  options: { locale?: string; country?: string },
) {
  "use cache: remote";
  cacheLife("hours");
  cacheTag("categories");
  try {
    return await getClient().categories.list(params, options);
  } catch {
    return { data: KABUNA_CATEGORIES } as unknown as Awaited<
      ReturnType<ReturnType<typeof getClient>["categories"]["list"]>
    >;
  }
}

export async function getCategories(
  params?: CategoryListParams,
  options?: { locale?: string; country?: string },
) {
  const localeOptions = options ?? (await getLocaleOptions());
  return cachedListCategories(params, localeOptions);
}

export async function cachedGetCategory(
  idOrPermalink: string,
  params: { expand?: string[] } | undefined,
  options: { locale?: string; country?: string },
) {
  "use cache: remote";
  cacheLife("tenMinutes");
  cacheTag("category");
  try {
    return await getClient().categories.get(idOrPermalink, params, options);
  } catch {
    const all = [
      ...KABUNA_CATEGORIES,
      ...KABUNA_CATEGORIES.flatMap((c) => c.children || []),
    ];
    const found = all.find(
      (c) =>
        c.permalink === idOrPermalink ||
        c.id === idOrPermalink ||
        c.permalink?.endsWith(`/${idOrPermalink}`),
    );
    if (found) {
      return { data: found } as unknown as Awaited<
        ReturnType<ReturnType<typeof getClient>["categories"]["get"]>
      >;
    }
    throw new Error("Category not found");
  }
}

export async function getCategory(
  idOrPermalink: string,
  params?: { expand?: string[] },
) {
  const options = await getLocaleOptions();
  return cachedGetCategory(idOrPermalink, params, options);
}

/**
 * Persistent cached category products fetch. Cache key is derived from
 * all function arguments (categoryId, params, locale, country, userToken).
 * Guest users pass undefined so the cache entry is shared.
 */
async function cachedListCategoryProducts(
  categoryId: string,
  params: ProductListParams | undefined,
  options: { locale?: string; country?: string },
  _userToken?: string,
) {
  "use cache: remote";
  cacheLife("tenMinutes");
  cacheTag("products", `category-products:${categoryId}`);
  try {
    return await getClient().products.list(
      { ...params, in_category: categoryId },
      options,
    );
  } catch {
    const filtered = KABUNA_PRODUCTS.filter((p) =>
      p.categories?.some(
        (c) =>
          c.id === categoryId ||
          c.permalink === categoryId ||
          c.permalink?.endsWith(`/${categoryId}`),
      ),
    );
    return {
      data: filtered,
      meta: {
        total_count: filtered.length,
        total_pages: 1,
      },
    } as unknown as Awaited<
      ReturnType<ReturnType<typeof getClient>["products"]["list"]>
    >;
  }
}

export async function getCategoryProducts(
  categoryId: string,
  params?: ProductListParams,
) {
  const options = await getLocaleOptions();
  const userToken = await getAccessToken();
  return cachedListCategoryProducts(categoryId, params, options, userToken);
}
