"use client";

import type { Product } from "@spree/sdk";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { HiddenPricePrompt } from "@/components/products/HiddenPricePrompt";
import { ProductImage } from "@/components/ui/product-image";
import { trackSelectItem } from "@/lib/analytics/gtm";
import { getCoffeeImage } from "@/lib/data/kabuna-coffee-data";

interface ProductCardProps {
  product: Product;
  basePath?: string;
  categoryId?: string;
  index?: number;
  listId?: string;
  listName?: string;
  fetchPriority?: "high" | "low" | "auto";
  /** Optional currency used for analytics; omit to skip the select_item event. */
  currency?: string;
}

export const ProductCard = memo(function ProductCard({
  product,
  basePath = "",
  categoryId,
  index,
  listId,
  listName,
  fetchPriority,
  currency,
}: ProductCardProps) {
  const t = useTranslations("products");
  const imageUrl =
    product.thumbnail_url || getCoffeeImage(product.slug || product.name);

  // Current display price
  const displayPrice = product.price?.display_amount;

  const currentAmountCents = product.price?.amount_in_cents;
  const originalAmountCents = product.original_price?.amount_in_cents;
  const compareAtAmountCents = product.price?.compare_at_amount_in_cents;
  const onSale =
    (currentAmountCents != null &&
      originalAmountCents != null &&
      currentAmountCents < originalAmountCents) ||
    (compareAtAmountCents != null &&
      currentAmountCents != null &&
      currentAmountCents < compareAtAmountCents);

  const strikethroughPrice = onSale
    ? ((product.original_price?.display_amount &&
      product.original_price.display_amount !== displayPrice
        ? product.original_price.display_amount
        : product.price?.display_compare_at_amount) ?? null)
    : null;

  const handleClick = () => {
    if (index != null && listId && listName && currency) {
      trackSelectItem(product, listId, listName, index, currency);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl border border-stone-200/80 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Image */}
        <div className="relative aspect-square bg-stone-100 overflow-hidden">
          <ProductImage
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 300px"
            iconClassName="w-16 h-16"
            fetchPriority={fetchPriority}
          />
          {onSale && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
              {t("sale")}
            </span>
          )}
          <span className="absolute top-2 right-2 bg-stone-900/80 backdrop-blur-xs text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
            Grade 1
          </span>
        </div>

        {/* Content */}
        <div className="p-3.5 pb-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 mb-1">
            Ethiopian Specialty
          </p>
          <h3 className="text-sm font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
            <Link
              href={`${basePath}/products/${product.slug}${categoryId ? `?category_id=${categoryId}` : ""}`}
              className="after:absolute after:inset-0"
              onClick={handleClick}
            >
              {product.name}
            </Link>
          </h3>

          <div className="mt-2 flex items-baseline gap-2">
            {displayPrice ? (
              <span className="text-base font-extrabold text-stone-900">
                {displayPrice}
              </span>
            ) : (
              <HiddenPricePrompt />
            )}
            {onSale && strikethroughPrice && (
              <span className="text-xs text-stone-400 line-through">
                {strikethroughPrice}
              </span>
            )}
          </div>

          {!product.purchasable && (
            <span className="mt-1 text-xs text-stone-400 block font-medium">
              {t("outOfStock")}
            </span>
          )}
        </div>
      </div>

      {/* Buy / View Action Button */}
      <div className="p-3.5 pt-0">
        <div className="w-full mt-2 bg-stone-900 group-hover:bg-amber-900 text-white text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs">
          <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
          <span>Buy / Details &rarr;</span>
        </div>
      </div>
    </div>
  );
});
