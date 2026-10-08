import { Flame, HeartHandshake, Mountain } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeroSection } from "@/components/layout/PageHeroSection";
import { ProductListing } from "@/components/products/ProductListing";
import { resolveCurrency } from "@/lib/data/markets";
import { getProductFilters, getProducts } from "@/lib/data/products";
import { generateProductsMetadata } from "@/lib/metadata/products";
import { parseListingSearchParams } from "@/lib/utils/listing-search-params";

interface ProductsPageProps {
  params: Promise<{
    country: string;
    locale: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const { country, locale } = await params;
  return generateProductsMetadata({ country, locale });
}

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const { country, locale } = await params;
  const rawSearchParams = await searchParams;
  const basePath = `/${country}/${locale}`;
  const currency = await resolveCurrency(country);

  const listingState = parseListingSearchParams(rawSearchParams);
  const query = listingState.query;

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "products",
  });

  const listId = query ? "search-results" : "all-products";
  const listName = query ? "Search Results" : "All Products";

  return (
    <div>
      <PageHeroSection
        badge={query ? "SEARCH DISCOVERIES" : "SPECIALTY ETHIOPIAN COLLECTION"}
        titleLine1={
          query ? t("searchResultsFor", { query }) : "Direct-Trade Heirlooms"
        }
        titleLine2={query ? undefined : "& Buna Ceremony Wares"}
        description={
          query
            ? "Discover exceptional single-origin Ethiopian micro-lots and sacred Buna ceremony essentials matching your search."
            : "Sourced directly from smallholder farms in Yirgacheffe, Sidama, and Guji. Roasted fresh in small batches alongside authentic handcrafted ritual pottery."
        }
        ctaText={query ? undefined : "Explore Roasts"}
        ctaHref={query ? undefined : "#products-collection"}
        secondaryCtaText={query ? undefined : "Buna Ceremony"}
        secondaryCtaHref={query ? undefined : `${basePath}/c/buna-ceremony`}
        bgImageSrc="/images/hero-mountain.jpg"
        bgImageAlt="Majestic Ethiopian highlands mountain landscape at dusk"
        focalImageSrc={
          query ? "/images/hero-cup.png" : "/images/products/chelbesa.jpg"
        }
        focalImageAlt={
          query
            ? "Ceramic coffee cup"
            : "Chelbesa Yirgacheffe specialty coffee bag"
        }
        focalImageIsCutout={Boolean(query)}
        pillarsTitle="The Kabuna Ethiopian Heritage"
        pillars={[
          {
            icon: <Mountain className="w-6 h-6" />,
            titleLine1: "2,000m+ Volcanic",
            titleLine2: "Highland Terroir",
            description:
              "High elevation slows cherry development, unlocking complex jasmine, stone fruit, and vibrant bergamot acidity.",
          },
          {
            icon: <HeartHandshake className="w-6 h-6" />,
            titleLine1: "Ethical & Direct",
            titleLine2: "Cooperative Trade",
            description:
              "We work directly with generational smallholders and washing stations, ensuring equity, transparency, and dignity.",
          },
          {
            icon: <Flame className="w-6 h-6" />,
            titleLine1: "Small-Batch Fresh",
            titleLine2: "Roast to Order",
            description:
              "Every harvest micro-lot is roasted strictly upon order and heat-sealed with a one-way aroma degassing valve.",
          },
        ]}
      />

      <div
        id="products-collection"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      >
        <ProductListing
          state={listingState}
          basePath={basePath}
          currency={currency}
          locale={locale as Locale}
          listId={listId}
          listName={listName}
          fetchProducts={getProducts}
          fetchFilters={getProductFilters}
          emptyMessage={
            query
              ? t("noMatchingProducts", { query })
              : t("tryAdjustingFilters")
          }
        />
      </div>
    </div>
  );
}
