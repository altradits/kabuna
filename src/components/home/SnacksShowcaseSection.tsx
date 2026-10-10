import { ArrowRight, Wheat } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { KABUNA_PRODUCTS } from "@/lib/data/kabuna-coffee-data";

interface SnacksShowcaseSectionProps {
  basePath: string;
  currency?: string;
}

export function SnacksShowcaseSection({
  basePath,
  currency,
}: SnacksShowcaseSectionProps) {
  const snackProducts = KABUNA_PRODUCTS.filter((p) =>
    p.categories?.some(
      (c) =>
        c.id === "cat_snacks" ||
        c.permalink === "snacks" ||
        c.name.toLowerCase().includes("snack"),
    ),
  );

  return (
    <section className="bg-gradient-to-b from-[#fdfbf7] to-[#f7f2ea] border-b border-stone-200/70 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900/10 text-amber-900 border border-amber-800/20 text-xs font-semibold uppercase tracking-wider mb-2">
              <Wheat className="w-3.5 h-3.5 text-[#a37947]" />
              Ancient Buna Tetu Companion
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-normal tracking-tight">
              Organic Highland Snacks
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
              Harvested from volcanic highland soils — slow-roasted Heritage
              Kolo, crunchy berbere-spiced Dabo Kolo, wild acacia honey Beso
              clusters, high-omega Telba seed crisps, and ember-roasted Shimbra
              chickpeas.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-stone-300 hover:border-stone-900 text-stone-800 font-medium text-xs sm:text-sm"
            >
              <Link
                href={`${basePath}/c/snacks`}
                className="inline-flex items-center gap-1.5"
              >
                <span>View All 5 Snack Foods</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* 5 Snacks Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5 lg:gap-6">
          {snackProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              basePath={basePath}
              categoryId="cat_snacks"
              index={index}
              listId="home-organic-snacks"
              listName="Home Organic Snacks"
              currency={currency}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
