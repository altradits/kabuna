"use client";

import type { Product } from "@spree/sdk";
import { Check, Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { memo, useState } from "react";
import { HiddenPricePrompt } from "@/components/products/HiddenPricePrompt";
import { ProductImage } from "@/components/ui/product-image";
import { useOptionalCart } from "@/contexts/CartContext";
import { trackAddToCart, trackSelectItem } from "@/lib/analytics/gtm";
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
  const cart = useOptionalCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isLocalOrMissing =
    !product.thumbnail_url ||
    product.thumbnail_url.includes("localhost:") ||
    product.thumbnail_url.includes("127.0.0.1") ||
    product.thumbnail_url.includes("/rails/active_storage");

  const imageUrl = isLocalOrMissing
    ? getCoffeeImage(product.slug || product.name) || product.thumbnail_url
    : product.thumbnail_url;

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

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const variantId =
      product.default_variant?.id ||
      product.default_variant_id ||
      product.variants?.[0]?.id ||
      product.id;

    if (!variantId || !cart?.addItem) return;

    try {
      setIsAdding(true);
      await cart.addItem(variantId, 1);
      setIsSuccess(true);
      if (currency) {
        trackAddToCart(product, product.default_variant ?? null, 1, currency);
      }
      setTimeout(() => {
        setIsSuccess(false);
      }, 1800);
    } catch (err) {
      console.error("Failed to add item to cart:", err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-xl border border-stone-200/80 hover:border-stone-300 hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Image with subtle hover zoom */}
      <div className="relative aspect-square bg-[#fbf9f6] overflow-hidden">
        <ProductImage
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 300px"
          iconClassName="w-16 h-16"
          fetchPriority={fetchPriority}
        />
        {onSale && (
          <span className="absolute top-2.5 left-2.5 bg-[#a37947] text-white text-[10px] font-medium tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs">
            {t("sale")}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-stone-900 group-hover:text-[#a37947] transition-colors leading-snug line-clamp-1">
          {/* Stretched link: the ::after overlay keeps the whole card clickable
              without wrapping the content in an <a> — HiddenPricePrompt renders
              its own link, and anchors can't nest. */}
          <Link
            href={`${basePath}/products/${product.slug}${categoryId ? `?category_id=${categoryId}` : ""}`}
            className="after:absolute after:inset-0"
            onClick={handleClick}
          >
            {product.name}
          </Link>
        </h3>

        {product.meta_description && (
          <p className="mt-1 text-xs text-stone-500 line-clamp-1">
            {product.meta_description}
          </p>
        )}

        {/* Bottom Section: Price & Add to Cart button */}
        <div className="mt-auto pt-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              {displayPrice ? (
                <span className="text-base sm:text-lg font-semibold text-stone-900">
                  {displayPrice}
                </span>
              ) : (
                // Null price: a deliberate hide inside a HiddenPricingProvider
                // (renders a sign-in prompt), otherwise renders nothing.
                <HiddenPricePrompt />
              )}
              {onSale && strikethroughPrice && (
                <span className="text-xs sm:text-sm text-stone-400 line-through">
                  {strikethroughPrice}
                </span>
              )}
            </div>
          </div>

          {/* Strategic, elegant Add to Cart button */}
          <div className="pt-0.5">
            {product.purchasable ? (
              <button
                type="button"
                disabled={isAdding}
                onClick={handleAddToCart}
                className="relative z-10 w-full inline-flex items-center justify-center gap-2 py-2 px-3 sm:py-2.5 sm:px-4 rounded-full text-xs font-medium tracking-wide bg-stone-900 hover:bg-[#a37947] active:bg-[#8e6534] text-white shadow-xs hover:shadow transition-all duration-200 active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
                aria-label={`${t("addToCart")} - ${product.name}`}
              >
                {isAdding ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>{t("adding")}</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 text-[#d8a870] transition-colors" />
                    <span>{t("addToCart")}</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="relative z-10 w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 sm:py-2.5 sm:px-4 rounded-full text-xs font-medium tracking-wide bg-stone-100 text-stone-400 cursor-not-allowed"
              >
                <span>{t("outOfStock")}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
