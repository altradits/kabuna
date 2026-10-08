"use client";

import type { Product } from "@spree/sdk";
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
  const [quantity, setQuantity] = useState(1);

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

  // All products are available unless all quantities have been bought or explicitly marked out of stock
  const isOutOfStock =
    product.purchasable === false ||
    product.in_stock === false ||
    (typeof (product as unknown as Record<string, unknown>).total_on_hand ===
      "number" &&
      ((product as unknown as Record<string, unknown>)
        .total_on_hand as number) <= 0);
  const isAvailable = !isOutOfStock;

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
      await cart.addItem(variantId, quantity);
      setIsSuccess(true);
      if (currency) {
        trackAddToCart(
          product,
          product.default_variant ?? null,
          quantity,
          currency,
        );
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
      <div className="p-3 sm:p-4 flex flex-col flex-1">
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

        {/* Bottom Section: Price in line with Add to Cart, space between (responsive across all screen sizes) */}
        <div className="mt-auto pt-2.5 sm:pt-3 flex flex-wrap items-center justify-between gap-y-2 gap-x-2">
          <div className="flex items-baseline gap-1 sm:gap-1.5 min-w-0">
            {displayPrice ? (
              <span className="text-sm sm:text-base md:text-lg font-bold text-stone-900 tracking-tight whitespace-nowrap">
                {displayPrice}
              </span>
            ) : (
              // Null price: a deliberate hide inside a HiddenPricingProvider
              // (renders a sign-in prompt), otherwise renders nothing.
              <HiddenPricePrompt />
            )}
            {onSale && strikethroughPrice && (
              <span className="text-[10px] sm:text-xs text-stone-400 line-through whitespace-nowrap">
                {strikethroughPrice}
              </span>
            )}
          </div>

          {/* Actions: Quantity Stepper & Add to Cart button */}
          {isAvailable ? (
            <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
              {/* Quantity Stepper (clean, no icon, unicode minus/plus) */}
              <div className="inline-flex items-center border border-stone-200/90 rounded-full bg-stone-50/90 px-1 py-0.5 shadow-2xs">
                <button
                  type="button"
                  disabled={isAdding || quantity <= 1}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuantity((q) => Math.max(1, q - 1));
                  }}
                  className="w-5 h-5 sm:w-6 sm:h-6 inline-flex items-center justify-center rounded-full text-xs font-bold text-stone-700 hover:bg-stone-200/80 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-5 sm:w-6 text-center text-[11px] sm:text-xs font-bold text-stone-900 tabular-nums select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={isAdding}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuantity((q) => q + 1);
                  }}
                  className="w-5 h-5 sm:w-6 sm:h-6 inline-flex items-center justify-center rounded-full text-xs font-bold text-stone-700 hover:bg-stone-200/80 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                type="button"
                disabled={isAdding}
                onClick={handleAddToCart}
                className="shrink-0 inline-flex items-center justify-center min-h-[30px] sm:min-h-[34px] py-1 sm:py-1.5 px-2.5 sm:px-3.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide bg-stone-900 hover:bg-[#a37947] active:bg-[#8e6534] text-white shadow-xs hover:shadow transition-all duration-200 active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none cursor-pointer whitespace-nowrap"
                aria-label={`${t("addToCart")} - ${product.name}`}
              >
                {isAdding ? t("adding") : isSuccess ? "Added" : t("addToCart")}
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled
              className="relative z-10 shrink-0 inline-flex items-center justify-center min-h-[30px] sm:min-h-[34px] py-1 sm:py-1.5 px-2.5 sm:px-3.5 rounded-full text-[11px] sm:text-xs font-medium tracking-wide bg-stone-100 text-stone-400 cursor-not-allowed whitespace-nowrap"
            >
              {t("outOfStock")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
