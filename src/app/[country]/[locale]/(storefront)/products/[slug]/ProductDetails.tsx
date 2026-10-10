"use client";

import type { Media, Product, Variant } from "@spree/sdk";
import { ChevronDown, ChevronUp, CircleCheckBig, CircleX } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { QuantityPickerField } from "@/components/cart/QuantityPickerField";
import { HiddenPricePrompt } from "@/components/products/HiddenPricePrompt";
import { MediaGallery } from "@/components/products/MediaGallery";
import { ProductCustomFields } from "@/components/products/ProductCustomFields";
import { VariantPicker } from "@/components/products/VariantPicker";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useHiddenPricing } from "@/contexts/HiddenPricingContext";
import { useStore } from "@/contexts/StoreContext";
import { trackAddToCart, trackViewItem } from "@/lib/analytics/gtm";
import { getCoffeeGallery } from "@/lib/data/kabuna-coffee-data";

interface ProductDetailsProps {
  product: Product;
  basePath: string;
}

export function ProductDetails({ product, basePath }: ProductDetailsProps) {
  const { addItem } = useCart();
  const { currency } = useStore();
  const t = useTranslations("products");

  // Non-null inside a HiddenPricingProvider (wholesale `prices_hidden`, guest
  // view): prices are null on purpose, and ordering is gated behind sign-in.
  const hiddenPricing = useHiddenPricing();
  const pricesHidden = hiddenPricing !== null;

  // Filter variants list
  const variants = useMemo(() => {
    return (product.variants || []).filter(Boolean);
  }, [product.variants]);

  const hasVariants = variants.length > 0;
  const optionTypes = product.option_types || [];

  // Initialize with default variant or first available variant
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(() => {
    if (product.default_variant) {
      return product.default_variant;
    }
    if (hasVariants) {
      return (
        variants.find((v) => v.purchasable !== false && v.in_stock !== false) ||
        variants[0]
      );
    }
    return product.default_variant || null;
  });

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Accordion state: keep compact so users can click to buy, revealing full details on demand
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    description: false,
    brewing: false,
    terroir: false,
    details: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Track product view (analytics - client-only side effect)
  useEffect(() => {
    trackViewItem(product, currency);
  }, [product, currency]);

  const galleryImages = useMemo((): Media[] => {
    const hasValidMedia =
      product.media &&
      product.media.length > 0 &&
      product.media.some(
        (m) =>
          m.original_url &&
          !m.original_url.includes("localhost:") &&
          !m.original_url.includes("127.0.0.1") &&
          !m.original_url.includes("/rails/active_storage"),
      );

    if (hasValidMedia && product.media) return product.media;
    return getCoffeeGallery(
      product.slug || product.name,
      product.name,
      product.id,
    );
  }, [product.media, product.slug, product.name, product.id]);

  const variantImageIndex = useMemo((): number | null => {
    if (!selectedVariant) return null;
    const index = galleryImages.findIndex((m) =>
      m.variant_ids.includes(selectedVariant.id),
    );
    return index >= 0 ? index : null;
  }, [selectedVariant, galleryImages]);

  const price = selectedVariant?.price ?? product.price;
  const originalPrice =
    selectedVariant?.original_price ?? product.original_price;
  const displayPrice = price?.display_amount;

  const currentAmountCents = price?.amount_in_cents;
  const originalAmountCents = originalPrice?.amount_in_cents;
  const compareAtAmountCents = price?.compare_at_amount_in_cents;
  const onSale =
    (currentAmountCents != null &&
      originalAmountCents != null &&
      currentAmountCents < originalAmountCents) ||
    (compareAtAmountCents != null &&
      currentAmountCents != null &&
      currentAmountCents < compareAtAmountCents);

  const strikethroughPrice = onSale
    ? ((originalPrice?.display_amount &&
      originalPrice.display_amount !== displayPrice
        ? originalPrice.display_amount
        : price?.display_compare_at_amount) ?? null)
    : null;

  const sku = selectedVariant?.sku ?? product.default_variant?.sku;

  // All products/variants are available unless all quantities have been bought or explicitly marked out of stock
  const isVariantOutOfStock =
    selectedVariant?.purchasable === false ||
    selectedVariant?.in_stock === false ||
    (typeof (selectedVariant as unknown as Record<string, unknown>)
      ?.total_on_hand === "number" &&
      ((selectedVariant as unknown as Record<string, unknown>)
        .total_on_hand as number) <= 0);

  const isProductOutOfStock =
    product.purchasable === false ||
    product.in_stock === false ||
    (typeof (product as unknown as Record<string, unknown>)?.total_on_hand ===
      "number" &&
      ((product as unknown as Record<string, unknown>)
        .total_on_hand as number) <= 0);

  const isPurchasable = hasVariants
    ? !isVariantOutOfStock
    : !isProductOutOfStock;

  const inStock = isPurchasable;

  const handleAddToCart = async () => {
    const variantId =
      selectedVariant?.id ||
      product.default_variant?.id ||
      product.default_variant_id;
    if (!variantId) {
      throw new Error("No variant selected");
    }

    setLoading(true);
    await addItem(variantId, quantity);
    setLoading(false);
    trackAddToCart(product, selectedVariant, quantity, currency);
  };

  const getField = (k: string) =>
    product.custom_fields?.find(
      (f) =>
        f.key === k ||
        f.id.endsWith(`_${k}`) ||
        f.label.toLowerCase().includes(k),
    )?.value;

  const isHairProduct = Boolean(
    product.categories?.some(
      (c) =>
        c.id === "cat_hair" ||
        c.permalink === "hair" ||
        c.permalink?.startsWith("hair/") ||
        c.name?.toLowerCase().includes("hair"),
    ) ||
      product.id?.startsWith("prod_yetsehur") ||
      product.id?.startsWith("prod_koseret") ||
      product.id?.startsWith("prod_endod") ||
      product.id?.startsWith("prod_shuruba") ||
      product.id?.startsWith("prod_wanza"),
  );

  const isCeremonyProduct = Boolean(
    product.categories?.some(
      (c) =>
        c.id === "cat_ceremony" ||
        c.permalink === "buna-ceremony" ||
        c.name?.toLowerCase().includes("ceremony"),
    ) ||
      product.id?.startsWith("prod_jebena") ||
      product.id?.startsWith("prod_cini") ||
      product.id?.startsWith("prod_rekebot") ||
      product.id?.startsWith("prod_girgira") ||
      product.id?.startsWith("prod_menkeskesha") ||
      product.id?.startsWith("prod_mukecha") ||
      product.id?.startsWith("prod_buna_ceremony"),
  );

  const isCoffeeProduct = !isHairProduct && !isCeremonyProduct;

  // Coffee fields
  const tastingNotes = getField("notes");
  const processMethod = getField("process");
  const roastProfile = getField("roast");
  const elevation = getField("altitude");
  const region =
    getField("region") || (isHairProduct ? getField("origin") : undefined);
  const _washingStation = getField("station");
  const variety = getField("variety");
  const cuppingScore = getField("score");
  const qualityGrade = getField("grade");

  // Hair fields
  const hairIngredients = getField("ingredients");
  const hairOrigin = getField("origin");
  const hairType = getField("hair_type");
  const hairUse = getField("use");
  const hairScent = getField("scent");

  // Ceremony fields
  const ceremonyMaterial = getField("material");
  const ceremonyOrigin = getField("origin");
  const ceremonyDimensions = getField("dimensions");
  const ceremonyUse = getField("use");
  const ceremonyCare = getField("care");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
        {/* Media Gallery */}
        <div>
          <MediaGallery
            images={galleryImages}
            productName={product.name}
            activeIndex={variantImageIndex}
          />
        </div>

        {/* Product Info & Buy Box */}
        <div className="flex flex-col">
          {/* Product Name */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
            {product.name}
          </h1>

          {/* Subtitle / Region */}
          {region && (
            <p className="mt-1 text-sm font-medium text-amber-900">{region}</p>
          )}

          {/* Price & Sale */}
          <div className="mt-3 flex items-baseline gap-3 flex-wrap">
            {displayPrice ? (
              <span className="text-3xl font-extrabold text-stone-900">
                {displayPrice}
              </span>
            ) : (
              <HiddenPricePrompt className="inline-flex items-center gap-1.5 text-base font-medium text-slate-600 underline underline-offset-4 hover:text-slate-900" />
            )}
            {onSale && strikethroughPrice && (
              <>
                <span className="text-lg text-stone-400 line-through">
                  {strikethroughPrice}
                </span>
                <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded shadow-2xs">
                  {t("sale")}
                </span>
              </>
            )}
            {inStock ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full ml-auto sm:ml-0">
                <CircleCheckBig className="w-3.5 h-3.5" />
                {t("inStock")}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full ml-auto sm:ml-0">
                <CircleX className="w-3.5 h-3.5" />
                {t("outOfStock")}
              </span>
            )}
          </div>

          {/* Tasting Notes & Coffee Highlights Box for Consumers */}
          {isCoffeeProduct && tastingNotes && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-200/70">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                Cupping Profile & Tasting Notes
              </div>
              <div className="text-base font-bold text-stone-900 mt-1">
                {tastingNotes}
              </div>
              <div className="flex flex-wrap gap-2 mt-2.5">
                {processMethod && (
                  <span className="text-xs bg-white text-stone-800 px-3 py-1 rounded-full border border-stone-200/90 font-medium shadow-2xs">
                    {processMethod}
                  </span>
                )}
                {roastProfile && (
                  <span className="text-xs bg-white text-stone-800 px-3 py-1 rounded-full border border-stone-200/90 font-medium shadow-2xs">
                    {roastProfile}
                  </span>
                )}
                {elevation && (
                  <span className="text-xs bg-white text-stone-800 px-3 py-1 rounded-full border border-stone-200/90 font-medium shadow-2xs">
                    {elevation}
                  </span>
                )}
                {cuppingScore && (
                  <span className="text-xs bg-amber-900 text-amber-50 px-3 py-1 rounded-full font-bold shadow-2xs">
                    Score: {cuppingScore} pts
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Hair Botanical Profile Box */}
          {isHairProduct && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/70">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                Native Highland Botanical Profile
              </div>
              {hairIngredients && (
                <div className="text-sm font-semibold text-stone-900 mt-1">
                  {hairIngredients}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-2.5">
                {hairType && (
                  <span className="text-xs bg-white text-stone-800 px-3 py-1 rounded-full border border-stone-200/90 font-medium shadow-2xs">
                    {hairType}
                  </span>
                )}
                {hairScent && (
                  <span className="text-xs bg-emerald-900 text-emerald-50 px-3 py-1 rounded-full font-medium shadow-2xs">
                    Notes: {hairScent}
                  </span>
                )}
                {hairOrigin && (
                  <span className="text-xs bg-white text-stone-800 px-3 py-1 rounded-full border border-stone-200/90 font-medium shadow-2xs">
                    {hairOrigin}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Ceremony Artifact Box */}
          {isCeremonyProduct && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-200/70">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                Traditional Buna Tetu Heirloom
              </div>
              {ceremonyMaterial && (
                <div className="text-sm font-semibold text-stone-900 mt-1">
                  Crafted from: {ceremonyMaterial}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-2.5">
                {ceremonyOrigin && (
                  <span className="text-xs bg-white text-stone-800 px-3 py-1 rounded-full border border-stone-200/90 font-medium shadow-2xs">
                    {ceremonyOrigin}
                  </span>
                )}
                {ceremonyDimensions && (
                  <span className="text-xs bg-amber-900 text-amber-50 px-3 py-1 rounded-full font-medium shadow-2xs">
                    {ceremonyDimensions}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Variant Picker */}
          {hasVariants && optionTypes.length > 0 && (
            <div className="mt-6 border-t border-stone-100 pt-5">
              <VariantPicker
                variants={variants}
                optionTypes={optionTypes}
                selectedVariant={selectedVariant}
                onVariantChange={setSelectedVariant}
              />
            </div>
          )}

          {/* Quantity & Direct Buy Action Box */}
          <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200/80 shadow-2xs">
            {pricesHidden ? (
              <Button asChild size="lg" className="w-full">
                <Link href={hiddenPricing.signInHref}>Login</Link>
              </Button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="self-center sm:self-auto">
                  <QuantityPickerField
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                    size="lg"
                  />
                </div>

                {/* Primary Add to Cart Button: same as across the website */}
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={loading || !isPurchasable}
                  className="flex-1 bg-stone-900 hover:bg-[#a37947] active:bg-[#8e6534] text-white font-bold h-12 text-base rounded-full shadow-md transition-all active:scale-[0.99] cursor-pointer"
                >
                  {loading
                    ? t("adding")
                    : isPurchasable
                      ? t("addToCart")
                      : t("outOfStock")}
                </Button>
              </div>
            )}
          </div>

          {/* Collapsible Disclosures: One-word button labels */}
          <div className="mt-8 space-y-3">
            {/* 1. Story */}
            {product.description_html && (
              <div className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-2xs transition-colors">
                <button
                  type="button"
                  onClick={() => toggleSection("description")}
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-stone-900 hover:bg-stone-50 transition-colors"
                >
                  <span>Story</span>
                  {expandedSections.description ? (
                    <ChevronUp className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-amber-800" />
                  )}
                </button>

                {expandedSections.description && (
                  <div className="px-5 pb-5 pt-1 border-t border-stone-100 text-stone-600 text-sm leading-relaxed prose prose-sm max-w-none">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.description_html,
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* 2. How to Use / Ritual / Brewing */}
            <div className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-2xs transition-colors">
              <button
                type="button"
                onClick={() => toggleSection("brewing")}
                className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-stone-900 hover:bg-stone-50 transition-colors"
              >
                <span>
                  {isHairProduct
                    ? "Habesha Ritual & Application"
                    : isCeremonyProduct
                      ? "Ritual Role & Ceremony Use"
                      : "Brewing"}
                </span>
                {expandedSections.brewing ? (
                  <ChevronUp className="w-4 h-4 text-stone-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-amber-800" />
                )}
              </button>

              {expandedSections.brewing && (
                <div className="px-5 pb-5 pt-2 border-t border-stone-100 text-stone-700 text-sm space-y-3">
                  {isHairProduct ? (
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                        <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-1">
                          Ancestral Application Method
                        </h4>
                        <p className="text-xs text-stone-700 leading-relaxed">
                          {hairUse ||
                            "Apply gently into clean, damp curls or massage directly into scalp with fingertip pads."}
                        </p>
                      </div>
                      {hairType && (
                        <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/80">
                          <span className="text-xs font-semibold text-stone-900">
                            Recommended Textures:{" "}
                          </span>
                          <span className="text-xs text-stone-600">
                            {hairType}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : isCeremonyProduct ? (
                    <div className="p-3.5 rounded-lg bg-amber-50/60 border border-amber-100 space-y-2">
                      <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                        Ceremonial Function in Buna Tetu
                      </h4>
                      <p className="text-xs text-stone-700 leading-relaxed">
                        {ceremonyUse ||
                          "Essential component in the three-round traditional Buna ceremony: Abol (first round), Tona (second), and Baraka (blessing)."}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-100">
                        <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-1">
                          Pour-Over (V60 / Kalita)
                        </h4>
                        <p className="text-xs text-stone-600">
                          Ratio: 1:16 (15g coffee / 240g water). Temp: 92–94°C.
                          Accentuates delicate floral aromatics and fruit
                          acidity.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-100">
                        <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-1">
                          Traditional Buna (Jebena)
                        </h4>
                        <p className="text-xs text-stone-600">
                          Fine grind, bring to a slow boil in Jebena pot, rest
                          for sediment settling, and serve in traditional cini
                          cups.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-100">
                        <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-1">
                          Aeropress & Cold Brew
                        </h4>
                        <p className="text-xs text-stone-600">
                          Inverted Aeropress or 16-hour cold steep to extract
                          rich peach and blueberry compote sweetness.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-100">
                        <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-1">
                          Espresso Extraction
                        </h4>
                        <p className="text-xs text-stone-600">
                          1:2 to 1:2.2 ratio in 28–30 seconds. Produces vibrant
                          citrus crema with velvety berry sweetness.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3. Origin / Materials */}
            <div className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-2xs transition-colors">
              <button
                type="button"
                onClick={() => toggleSection("terroir")}
                className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-stone-900 hover:bg-stone-50 transition-colors"
              >
                <span>
                  {isHairProduct
                    ? "Botanical Origin"
                    : isCeremonyProduct
                      ? "Materials & Craft"
                      : "Origin"}
                </span>
                {expandedSections.terroir ? (
                  <ChevronUp className="w-4 h-4 text-stone-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-amber-800" />
                )}
              </button>

              {expandedSections.terroir && (
                <div className="px-5 pb-5 pt-2 border-t border-stone-100 text-stone-700 text-sm">
                  {isHairProduct ? (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                      <div>
                        <dt className="text-xs font-medium text-stone-500">
                          Harvest Provenance
                        </dt>
                        <dd className="text-xs font-bold text-stone-900">
                          {hairOrigin || "Ethiopian Highlands"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-stone-500">
                          Texture Suitability
                        </dt>
                        <dd className="text-xs font-bold text-stone-900">
                          {hairType ||
                            "Textured Curls, Coils & Protective Styles"}
                        </dd>
                      </div>
                      {hairScent && (
                        <div className="col-span-1 sm:col-span-2">
                          <dt className="text-xs font-medium text-stone-500">
                            Aromatherapeutic Profile
                          </dt>
                          <dd className="text-xs font-bold text-stone-900">
                            {hairScent}
                          </dd>
                        </div>
                      )}
                      {hairIngredients && (
                        <div className="col-span-1 sm:col-span-2">
                          <dt className="text-xs font-medium text-stone-500">
                            Active Botanicals
                          </dt>
                          <dd className="text-xs font-bold text-stone-900">
                            {hairIngredients}
                          </dd>
                        </div>
                      )}
                    </dl>
                  ) : isCeremonyProduct ? (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                      <div>
                        <dt className="text-xs font-medium text-stone-500">
                          Artisan Provenance
                        </dt>
                        <dd className="text-xs font-bold text-stone-900">
                          {ceremonyOrigin || "Artisan Guilds of Ethiopia"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-stone-500">
                          Material
                        </dt>
                        <dd className="text-xs font-bold text-stone-900">
                          {ceremonyMaterial ||
                            "Traditional Terracotta & Hardwood"}
                        </dd>
                      </div>
                      {ceremonyDimensions && (
                        <div className="col-span-1 sm:col-span-2">
                          <dt className="text-xs font-medium text-stone-500">
                            Dimensions / Capacity
                          </dt>
                          <dd className="text-xs font-bold text-stone-900">
                            {ceremonyDimensions}
                          </dd>
                        </div>
                      )}
                      {ceremonyCare && (
                        <div className="col-span-1 sm:col-span-2">
                          <dt className="text-xs font-medium text-stone-500">
                            Care & Maintenance
                          </dt>
                          <dd className="text-xs font-bold text-stone-900">
                            {ceremonyCare}
                          </dd>
                        </div>
                      )}
                    </dl>
                  ) : (
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                      <div>
                        <dt className="text-xs font-medium text-stone-500">
                          Country & Region
                        </dt>
                        <dd className="text-xs font-bold text-stone-900">
                          {region || "Ethiopian Highlands"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-stone-500">
                          Elevation
                        </dt>
                        <dd className="text-xs font-bold text-stone-900">
                          {elevation || "1,850m – 2,300m"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-stone-500">
                          Varietals
                        </dt>
                        <dd className="text-xs font-bold text-stone-900">
                          {variety || "100% Indigenous Heirloom"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-stone-500">
                          Quality Grade
                        </dt>
                        <dd className="text-xs font-bold text-stone-900">
                          {qualityGrade || "Specialty Grade"}
                        </dd>
                      </div>
                    </dl>
                  )}
                </div>
              )}
            </div>

            {/* 4. Specs */}
            <div className="rounded-xl border border-stone-200 bg-white overflow-hidden shadow-2xs transition-colors">
              <button
                type="button"
                onClick={() => toggleSection("details")}
                className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-stone-900 hover:bg-stone-50 transition-colors"
              >
                <span>Specs</span>
                {expandedSections.details ? (
                  <ChevronUp className="w-4 h-4 text-stone-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-amber-800" />
                )}
              </button>

              {expandedSections.details && (
                <div className="px-5 pb-5 pt-2 border-t border-stone-100 text-stone-700 text-sm space-y-3">
                  <ProductCustomFields customFields={product.custom_fields} />

                  <dl className="space-y-2 pt-2 border-t border-stone-100">
                    {sku && (
                      <div className="flex justify-between">
                        <dt className="text-xs text-stone-500">{t("sku")}</dt>
                        <dd className="text-xs font-semibold text-stone-900">
                          {sku}
                        </dd>
                      </div>
                    )}
                    {selectedVariant?.options_text && (
                      <div className="flex justify-between">
                        <dt className="text-xs text-stone-500">
                          {t("options")}
                        </dt>
                        <dd className="text-xs font-semibold text-stone-900">
                          {selectedVariant.options_text}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
