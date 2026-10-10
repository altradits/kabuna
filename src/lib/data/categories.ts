"use server";

import type {
  Category,
  CategoryListParams,
  ProductListParams,
} from "@spree/sdk";
import { cacheLife, cacheTag } from "next/cache";
import { getAccessToken, getClient, getLocaleOptions } from "@/lib/spree";
import {
  CAT_COFFEE,
  enrichProductWithImages,
  KABUNA_CATEGORIES,
  KABUNA_PRODUCTS,
} from "./kabuna-coffee-data";

function flattenCategories(categories: Category[]): Category[] {
  const result: Category[] = [];
  function recurse(list: Category[]) {
    for (const cat of list) {
      result.push(cat);
      if (cat.children && cat.children.length > 0) {
        recurse(cat.children);
      }
    }
  }
  recurse(categories);
  return result;
}

async function cachedListCategories(
  params: CategoryListParams | undefined,
  options: { locale?: string; country?: string },
) {
  "use cache: remote";
  cacheLife("hours");
  cacheTag("categories");
  try {
    const res = await getClient().categories.list(params, options);
    const hasCeremony = res.data?.some(
      (c) =>
        c.permalink?.includes("buna-ceremony") ||
        c.permalink?.includes("ceremony") ||
        c.id === "cat_ceremony",
    );
    const hasCoffee = res.data?.some(
      (c) => c.permalink === "coffee" || c.id === "cat_coffee",
    );
    if (res.data && res.data.length > 0 && hasCeremony && hasCoffee) {
      return res;
    }
    return { data: KABUNA_CATEGORIES } as unknown as Awaited<
      ReturnType<ReturnType<typeof getClient>["categories"]["list"]>
    >;
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

  const idOrPermaLower = idOrPermalink.toLowerCase();

  // Specifically resolve Coffee category to CAT_COFFEE
  if (
    idOrPermaLower === "coffee" ||
    idOrPermaLower === "cat_coffee" ||
    idOrPermaLower.endsWith("/coffee")
  ) {
    return CAT_COFFEE as unknown as Awaited<
      ReturnType<ReturnType<typeof getClient>["categories"]["get"]>
    >;
  }

  // Specifically resolve Buna Ceremony category to KABUNA_CATEGORIES
  if (
    idOrPermaLower.includes("buna-ceremony") ||
    idOrPermaLower.includes("ceremony") ||
    idOrPermaLower === "cat_ceremony" ||
    idOrPermaLower === "ctg_so8jagonyx"
  ) {
    const ceremonyCat = KABUNA_CATEGORIES.find(
      (c) => c.permalink === "buna-ceremony" || c.id === "cat_ceremony",
    );
    if (ceremonyCat) {
      return ceremonyCat as unknown as Awaited<
        ReturnType<ReturnType<typeof getClient>["categories"]["get"]>
      >;
    }
  }

  const all = flattenCategories(KABUNA_CATEGORIES);
  const found = all.find(
    (c) =>
      c.permalink?.toLowerCase() === idOrPermaLower ||
      c.id.toLowerCase() === idOrPermaLower ||
      c.permalink?.toLowerCase().endsWith(`/${idOrPermaLower}`) ||
      c.name.toLowerCase() === idOrPermaLower,
  );
  if (found) {
    return found as unknown as Awaited<
      ReturnType<ReturnType<typeof getClient>["categories"]["get"]>
    >;
  }

  try {
    return await getClient().categories.get(idOrPermalink, params, options);
  } catch {
    throw new Error(`Category not found: ${idOrPermalink}`);
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

  const catLower = (categoryId || "").toLowerCase();
  const isCoffee =
    catLower === "coffee" ||
    catLower === "cat_coffee" ||
    catLower.endsWith("/coffee");

  const isCeremonyCategory =
    catLower.includes("ceremony") ||
    catLower.includes("buna") ||
    catLower === "cat_ceremony" ||
    catLower === "ctg_so8jagonyx";

  const isYirgacheffe =
    catLower.includes("yirgacheffe") ||
    catLower === "cat_yirgacheffe" ||
    catLower === "ctg_3uwpptcf5w";

  const isGuji =
    catLower.includes("guji") ||
    catLower === "cat_guji" ||
    catLower === "ctg_d6psx31wat";

  const isSidama =
    catLower.includes("sidama") ||
    catLower.includes("sidamo") ||
    catLower === "cat_sidama" ||
    catLower === "ctg_msx3nojap6";

  const isHarrar =
    catLower.includes("harrar") ||
    catLower.includes("harar") ||
    catLower === "cat_harrar" ||
    catLower === "ctg_5cqzncrf8j";

  const isLimuKaffa =
    catLower.includes("kaffa") ||
    catLower.includes("limu") ||
    catLower === "cat_limu_kaffa" ||
    catLower === "ctg_m2nylohtruq";

  const isWashed = catLower.includes("washed") || catLower === "cat_washed";

  const isNatural = catLower.includes("natural") || catLower === "cat_natural";

  const isRoast =
    catLower.includes("roast") ||
    catLower === "cat_roast" ||
    catLower === "ctg_prklvemgbn";

  const isGreen =
    catLower.includes("green") ||
    catLower === "cat_green" ||
    catLower === "ctg_rsclytecfi";

  const isSingleOriginParent =
    catLower === "single-origin" ||
    catLower === "cat_single_origin" ||
    catLower === "ctg_kokt9mvfb0";

  const localFiltered = KABUNA_PRODUCTS.filter((p) => {
    if (isCoffee) {
      return (
        p.categories?.some(
          (c) =>
            c.id === "cat_coffee" ||
            c.permalink === "coffee" ||
            c.name.toLowerCase() === "coffee",
        ) || !p.categories?.some((c) => c.id === "cat_ceremony")
      );
    }
    if (isCeremonyCategory) {
      return p.categories?.some(
        (c) =>
          c.id === "cat_ceremony" ||
          c.permalink === "buna-ceremony" ||
          c.name.toLowerCase().includes("ceremony"),
      );
    }
    if (isYirgacheffe) {
      return p.categories?.some(
        (c) =>
          c.id === "cat_yirgacheffe" || c.permalink?.includes("yirgacheffe"),
      );
    }
    if (isGuji) {
      return p.categories?.some(
        (c) => c.id === "cat_guji" || c.permalink?.includes("guji"),
      );
    }
    if (isSidama) {
      return p.categories?.some(
        (c) => c.id === "cat_sidama" || c.permalink?.includes("sidama"),
      );
    }
    if (isHarrar) {
      return p.categories?.some(
        (c) => c.id === "cat_harrar" || c.permalink?.includes("harrar"),
      );
    }
    if (isLimuKaffa) {
      return p.categories?.some(
        (c) =>
          c.id === "cat_limu_kaffa" ||
          c.permalink?.includes("kaffa") ||
          c.permalink?.includes("limu"),
      );
    }
    if (isWashed) {
      return p.categories?.some(
        (c) => c.id === "cat_washed" || c.permalink === "washed",
      );
    }
    if (isNatural) {
      return p.categories?.some(
        (c) => c.id === "cat_natural" || c.permalink === "natural",
      );
    }
    if (isRoast) {
      return p.categories?.some(
        (c) => c.id === "cat_roast" || c.permalink === "roast-profiles",
      );
    }
    if (isGreen) {
      return p.categories?.some(
        (c) => c.id === "cat_green" || c.permalink === "green-coffee",
      );
    }
    if (isSingleOriginParent) {
      return p.categories?.some(
        (c) =>
          c.id === "cat_single_origin" ||
          c.permalink === "single-origin" ||
          c.permalink?.startsWith("single-origin/"),
      );
    }
    return p.categories?.some(
      (c) =>
        (c?.id && c.id.toLowerCase() === catLower) ||
        (c?.permalink && c.permalink.toLowerCase() === catLower) ||
        (c?.permalink &&
          catLower &&
          c.permalink.toLowerCase().endsWith(`/${catLower}`)) ||
        (c?.name && c.name.toLowerCase() === catLower),
    );
  });

  // Support sort param if requested
  const sortParam = (
    params as Record<string, unknown> | undefined
  )?.sort?.toString();
  if (sortParam && localFiltered.length > 0) {
    if (
      sortParam.includes("price") &&
      (sortParam.includes("desc") || sortParam === "price_high_to_low")
    ) {
      localFiltered.sort(
        (a, b) =>
          (b.price?.amount_in_cents || 0) - (a.price?.amount_in_cents || 0),
      );
    } else if (
      sortParam.includes("price") &&
      (sortParam.includes("asc") || sortParam === "price_low_to_high")
    ) {
      localFiltered.sort(
        (a, b) =>
          (a.price?.amount_in_cents || 0) - (b.price?.amount_in_cents || 0),
      );
    }
  }

  if (localFiltered.length > 0) {
    return {
      data: localFiltered.map(enrichProductWithImages),
      meta: {
        total_count: localFiltered.length,
        total_pages: 1,
      },
    } as unknown as Awaited<
      ReturnType<ReturnType<typeof getClient>["products"]["list"]>
    >;
  }

  try {
    const res = await getClient().products.list(
      { ...params, in_category: categoryId },
      options,
    );
    if (res.data && res.data.length > 0) {
      return {
        ...res,
        data: res.data.map(enrichProductWithImages),
      };
    }
  } catch {
    // ignore Spree error and fall back
  }

  return {
    data: localFiltered.map(enrichProductWithImages),
    meta: {
      total_count: localFiltered.length,
      total_pages: 1,
    },
  } as unknown as Awaited<
    ReturnType<ReturnType<typeof getClient>["products"]["list"]>
  >;
}

export async function getCategoryProducts(
  categoryId: string,
  params?: ProductListParams,
) {
  const options = await getLocaleOptions();
  const userToken = await getAccessToken();
  return cachedListCategoryProducts(categoryId, params, options, userToken);
}
