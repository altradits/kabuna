import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { KABUNA_PRODUCTS } from "@/lib/data/kabuna-coffee-data";

interface HairCareShowcaseSectionProps {
  basePath: string;
  currency?: string;
}

export function HairCareShowcaseSection({
  basePath,
  currency,
}: HairCareShowcaseSectionProps) {
  const hairProducts = KABUNA_PRODUCTS.filter((p) =>
    p.categories?.some(
      (c) =>
        c.id === "cat_hair" ||
        c.permalink === "hair" ||
        c.name.toLowerCase().includes("hair"),
    ),
  );

  return (
    <section className="bg-gradient-to-b from-[#f9f6f0] to-[#f4efe8] border-b border-stone-200/70 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/10 text-emerald-800 border border-emerald-800/20 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              Native Ethiopian Botanicals
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-normal tracking-tight">
              Ancestral Habesha Hair Care
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
              Passed down through generational highland rituals — grass-fed
              YeTsehur Kibe, cold-pressed Nug oil, wild saponin Endod washes,
              and solid Wanza wood combs for intense moisture and scalp
              vitality.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-stone-300 hover:border-stone-900 text-stone-800 font-medium text-xs sm:text-sm"
            >
              <Link
                href={`${basePath}/c/hair`}
                className="inline-flex items-center gap-1.5"
              >
                <span>View All 5 Hair Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* 5 Hair Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5 lg:gap-6">
          {hairProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              basePath={basePath}
              categoryId="cat_hair"
              index={index}
              listId="home-hair-care"
              listName="Home Organic Hair Care"
              currency={currency}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
