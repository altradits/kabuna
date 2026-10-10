import type { Metadata } from "next";
import { CategoryShowcaseSection } from "@/components/home/CategoryShowcaseSection";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { HairCareShowcaseSection } from "@/components/home/HairCareShowcaseSection";
import { HeroSection } from "@/components/home/HeroSection";
import { SnacksShowcaseSection } from "@/components/home/SnacksShowcaseSection";
import { resolveCurrency } from "@/lib/data/markets";
import { generateHomeMetadata } from "@/lib/metadata/home";

interface HomePageProps {
  params: Promise<{
    country: string;
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { country, locale } = await params;
  return generateHomeMetadata({ country, locale });
}

export default async function HomePage({ params }: HomePageProps) {
  const { country, locale } = await params;
  const basePath = `/${country}/${locale}`;
  const currency = await resolveCurrency(country);

  return (
    <div>
      <HeroSection basePath={basePath} locale={locale} />
      <CategoryShowcaseSection basePath={basePath} />
      <HairCareShowcaseSection basePath={basePath} currency={currency} />
      <SnacksShowcaseSection basePath={basePath} currency={currency} />
      <FeaturedProductsSection
        basePath={basePath}
        locale={locale}
        country={country}
        currency={currency}
      />
    </div>
  );
}
