"use server";

import { cacheLife, cacheTag } from "next/cache";
import { getClient, getLocaleOptions } from "@/lib/spree";
import { KABUNA_MARKET } from "./kabuna-coffee-data";

export async function getCountries() {
  const options = await getLocaleOptions();
  try {
    return await getClient().countries.list(options);
  } catch {
    return { data: KABUNA_MARKET.countries || [] } as unknown as Awaited<
      ReturnType<ReturnType<typeof getClient>["countries"]["list"]>
    >;
  }
}

async function cachedGetCountry(
  iso: string,
  options: { locale?: string; country?: string },
) {
  "use cache: remote";
  cacheLife("hours");
  cacheTag("country", `country-${iso}`);
  try {
    return await getClient().countries.get(
      iso,
      { expand: ["states"] },
      options,
    );
  } catch {
    const found = KABUNA_MARKET.countries?.find(
      (c) => c.iso.toLowerCase() === iso.toLowerCase(),
    );
    return {
      data: found || {
        id: `country_${iso}`,
        name: iso.toUpperCase(),
        iso: iso.toUpperCase(),
        iso3: iso.toUpperCase(),
        states_required: false,
      },
    } as unknown as Awaited<
      ReturnType<ReturnType<typeof getClient>["countries"]["get"]>
    >;
  }
}

export async function getCountry(iso: string) {
  const options = await getLocaleOptions();
  return cachedGetCountry(iso, options);
}
