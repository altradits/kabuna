import type {
  Category,
  CustomField,
  Market,
  Media,
  OptionType,
  OptionValue,
  Price,
  Product,
  Variant,
} from "@spree/sdk";

export function createPrice(
  cents: number,
  compareAtCents: number | null = null,
  currency = "USD",
): Price {
  const amount = (cents / 100).toFixed(2);
  const compareAmount = compareAtCents
    ? (compareAtCents / 100).toFixed(2)
    : null;
  return {
    id: `price_${cents}_${currency}`,
    amount,
    amount_in_cents: cents,
    currency,
    display_amount: `$${amount}`,
    compare_at_amount: compareAmount,
    compare_at_amount_in_cents: compareAtCents,
    display_compare_at_amount: compareAmount ? `$${compareAmount}` : null,
    price_list_id: null,
  };
}

export function createMedia(
  id: string,
  url: string,
  alt: string,
  position = 1,
): Media {
  return {
    id,
    product_id: null,
    variant_ids: [],
    position,
    alt,
    media_type: "image",
    focal_point_x: null,
    focal_point_y: null,
    external_video_url: null,
    video_provider: null,
    video_embed_url: null,
    video_url: null,
    poster_url: null,
    original_url: url,
    mini_url: url,
    small_url: url,
    medium_url: url,
    large_url: url,
    xlarge_url: url,
    og_image_url: url,
  };
}

export const DEFAULT_COFFEE_IMAGE = "/images/products/chelbesa.jpg";

export const COFFEE_IMAGE_GALLERIES: Record<string, string[]> = {
  chelbesa: [
    "/images/products/chelbesa.jpg",
    "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85",
  ],
  hamasho: [
    "/images/products/hamasho.jpg",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1200&q=85",
  ],
  "dimtu-tora": [
    "/images/products/dimtu-tora.jpg",
    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85",
  ],
  "benti-neka": [
    "/images/products/benti-neka.jpg",
    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=85",
  ],
  "worku-buche": [
    "/images/products/worku-buche.jpg",
    "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&w=1200&q=85",
  ],
  uraga: [
    "/images/products/uraga.jpg",
    "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=1200&q=85",
  ],
  // Traditional Ethiopian Buna Ceremony Accessories
  jebena: [
    "/images/ceremony/jebena.jpg",
    "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85",
  ],
  cini: [
    "/images/ceremony/cini.jpg",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85",
  ],
  rekebot: [
    "/images/ceremony/rekebot.jpg",
    "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85",
  ],
  girgira: [
    "/images/ceremony/girgira.jpg",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85",
  ],
  menkeskesha: [
    "/images/ceremony/menkeskesha.jpg",
    "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1200&q=85",
  ],
  mukecha: [
    "/images/ceremony/mukecha.jpg",
    "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=85",
  ],
  "ceremony-kit": [
    "/images/ceremony/ceremony-kit.jpg",
    "/images/ceremony/jebena.jpg",
    "/images/ceremony/cini.jpg",
  ],
  harrar: [
    "/images/products/harrar.jpg",
    "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85",
  ],
  kaffa: [
    "/images/products/kaffa.jpg",
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1200&q=85",
  ],
  djimmah: [
    "/images/products/djimmah.jpg",
    "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=1200&q=85",
  ],
  "green-coffee": [
    "/images/products/green-coffee.jpg",
    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=85",
  ],
  // Traditional Ethiopian Organic Hair Care Botanicals
  "yetsehur-kibe": ["/images/hair/yetsehur-kibe.jpg"],
  "koseret-scalp-elixir": ["/images/hair/koseret-scalp-elixir.jpg"],
  "endod-cleanser": ["/images/hair/endod-cleanser.jpg"],
  "shuruba-mask": ["/images/hair/shuruba-mask.jpg"],
  "wanza-comb": ["/images/hair/wanza-comb.jpg"],

  // Traditional Ethiopian Organic Snacks
  "heritage-kolo": ["/images/snacks/heritage-kolo.jpg"],
  "dabo-kolo": ["/images/snacks/dabo-kolo.jpg"],
  "beso-clusters": ["/images/snacks/beso-clusters.jpg"],
  "telba-crisps": ["/images/snacks/telba-crisps.jpg"],
  "smoked-shimbra": ["/images/snacks/smoked-shimbra.jpg"],

  // Traditional Ethiopian Organic Body & Native Scents
  "itan-perfume": ["/images/body/itan-perfume.jpg"],
  "koseret-body-wash": ["/images/body/koseret-body-wash.jpg"],
  "korarima-ointment": ["/images/body/korarima-ointment.jpg"],
  "tenadam-mist": ["/images/body/tenadam-mist.jpg"],
  "volcanic-clay-scrub": ["/images/body/volcanic-clay-scrub.jpg"],

  // Sacred Ethiopian Incense & Itan Resins
  "tigray-frankincense": ["/images/body/tigray-frankincense.jpg"],
  "ogaden-myrrh": ["/images/body/ogaden-myrrh.jpg"],
  "borena-black-incense": ["/images/body/borena-black-incense.jpg"],
  "ceremony-itan-blend": ["/images/body/ceremony-itan-blend.jpg"],

  // Authentic Ethiopian Artisan Gifts & Heirlooms
  "gondar-parchment-art": ["/images/gifts/gondar-parchment-art.jpg"],
  "gondar-parchment": ["/images/gifts/gondar-parchment-art.jpg"],
  "lalibela-processional-cross": [
    "/images/gifts/lalibela-processional-cross.jpg",
  ],
  "lalibela-cross": ["/images/gifts/lalibela-processional-cross.jpg"],
  "axum-silver-filigree-cuff": ["/images/gifts/axum-silver-filigree-cuff.jpg"],
  "axum-cuff": ["/images/gifts/axum-silver-filigree-cuff.jpg"],
  "lalibela-cross-signet-ring": [
    "/images/gifts/lalibela-cross-signet-ring.jpg",
  ],
  "lalibela-ring": ["/images/gifts/lalibela-cross-signet-ring.jpg"],
  "habesha-hair-jewelry-set": ["/images/gifts/habesha-hair-jewelry-set.jpg"],
  "habesha-hair-jewelry": ["/images/gifts/habesha-hair-jewelry-set.jpg"],
  "harari-amber-coral-bangle": ["/images/gifts/harari-amber-coral-bangle.jpg"],
  "harari-bangle": ["/images/gifts/harari-amber-coral-bangle.jpg"],
  "shemma-cotton-towel": ["/images/gifts/shemma-cotton-towel.jpg"],
  "shemma-towel": ["/images/gifts/shemma-cotton-towel.jpg"],
  "tibeb-handkerchief-set": ["/images/gifts/tibeb-handkerchief-set.jpg"],
  "tibeb-handkerchief": ["/images/gifts/tibeb-handkerchief-set.jpg"],
  "ethiopian-gabi-throw": ["/images/gifts/ethiopian-gabi-throw.jpg"],
  "ethiopian-gabi": ["/images/gifts/ethiopian-gabi-throw.jpg"],
  "wanza-vanity-mirror": ["/images/gifts/wanza-vanity-mirror.jpg"],
  "wanza-mirror": ["/images/gifts/wanza-vanity-mirror.jpg"],
  "brass-kohl-flask": ["/images/gifts/brass-kohl-flask.jpg"],
  "brass-kohl": ["/images/gifts/brass-kohl-flask.jpg"],
  "harari-woven-trinket-box": ["/images/gifts/harari-woven-trinket-box.jpg"],
  "harari-trinket-box": ["/images/gifts/harari-woven-trinket-box.jpg"],

  // Executive Office Collection
  "iphone-16-pro-max": ["/images/office/iphone-16-pro-max.jpg"],
  "iphone-16-pro": ["/images/office/iphone-16-pro.jpg"],
  "macbook-pro-m-series": ["/images/office/macbook-pro-m-series.jpg"],
  "macbook-air-m-series": ["/images/office/macbook-air-m-series.jpg"],
  "highland-leather-notebook": ["/images/office/highland-leather-notebook.jpg"],
  "tibeb-hardcover-notebook": ["/images/office/tibeb-hardcover-notebook.jpg"],
  "axum-brass-rollerball-pen": ["/images/office/axum-brass-rollerball-pen.jpg"],
  "lalibela-golden-fountain-pen": [
    "/images/office/lalibela-golden-fountain-pen.jpg",
  ],
  "executive-leather-document-file": [
    "/images/office/executive-leather-document-file.jpg",
  ],
  "highland-archival-expanding-file": [
    "/images/office/highland-archival-expanding-file.jpg",
  ],
  "ethiopian-leather-laptop-bag": [
    "/images/office/ethiopian-leather-laptop-bag.jpg",
  ],
  "highland-commuter-laptop-bag": [
    "/images/office/highland-commuter-laptop-bag.jpg",
  ],
  "ergonomic-executive-office-chair": [
    "/images/office/ergonomic-executive-office-chair.jpg",
  ],
  "highland-leather-executive-chair": [
    "/images/office/highland-leather-executive-chair.jpg",
  ],
  "wanza-hardwood-executive-desk": [
    "/images/office/wanza-hardwood-executive-desk.jpg",
  ],
  "ergonomic-wanza-standing-desk": [
    "/images/office/ergonomic-wanza-standing-desk.jpg",
  ],
};

export function getCoffeeImageKey(slugOrName?: string | null): string | null {
  if (!slugOrName) return null;
  const s = slugOrName.toLowerCase().trim();
  if (COFFEE_IMAGE_GALLERIES[s]) return s;

  // 0. Executive Office Products (Exact device, furniture & supply checks)
  if (
    s.includes("iphone-16-pro-max") ||
    (s.includes("iphone") && (s.includes("max") || s.includes("pro-max")))
  )
    return "iphone-16-pro-max";
  if (s.includes("iphone-16-pro") || s.includes("iphone"))
    return "iphone-16-pro";
  if (
    s.includes("macbook-pro") ||
    (s.includes("macbook") &&
      (s.includes("pro") || s.includes("max") || s.includes("workstation")))
  )
    return "macbook-pro-m-series";
  if (s.includes("macbook-air") || s.includes("macbook"))
    return "macbook-air-m-series";
  if (
    s.includes("highland-leather-notebook") ||
    (s.includes("leather") && s.includes("notebook"))
  )
    return "highland-leather-notebook";
  if (
    s.includes("tibeb-hardcover-notebook") ||
    (s.includes("tibeb") && (s.includes("notebook") || s.includes("journal")))
  )
    return "tibeb-hardcover-notebook";
  if (
    s.includes("axum-brass-rollerball-pen") ||
    (s.includes("brass") && (s.includes("pen") || s.includes("rollerball")))
  )
    return "axum-brass-rollerball-pen";
  if (
    s.includes("lalibela-golden-fountain-pen") ||
    (s.includes("fountain") && s.includes("pen"))
  )
    return "lalibela-golden-fountain-pen";
  if (
    s.includes("executive-leather-document-file") ||
    (s.includes("leather") && (s.includes("file") || s.includes("folio")))
  )
    return "executive-leather-document-file";
  if (
    s.includes("highland-archival-expanding-file") ||
    s.includes("expanding-file") ||
    (s.includes("archival") && s.includes("file"))
  )
    return "highland-archival-expanding-file";
  if (
    s.includes("ethiopian-leather-laptop-bag") ||
    (s.includes("leather") && s.includes("laptop-bag"))
  )
    return "ethiopian-leather-laptop-bag";
  if (
    s.includes("highland-commuter-laptop-bag") ||
    s.includes("laptop-bag") ||
    s.includes("briefcase")
  )
    return "highland-commuter-laptop-bag";
  if (
    s.includes("ergonomic-executive-office-chair") ||
    (s.includes("ergonomic") && s.includes("chair"))
  )
    return "ergonomic-executive-office-chair";
  if (
    s.includes("highland-leather-executive-chair") ||
    (s.includes("leather") && s.includes("chair")) ||
    s.includes("office-chair") ||
    s.includes("desk-chair")
  )
    return "highland-leather-executive-chair";
  if (
    s.includes("wanza-hardwood-executive-desk") ||
    (s.includes("wanza") && s.includes("desk")) ||
    s.includes("office-desk")
  )
    return "wanza-hardwood-executive-desk";
  if (
    s.includes("ergonomic-wanza-standing-desk") ||
    s.includes("standing-desk")
  )
    return "ergonomic-wanza-standing-desk";

  // 1. Authentic Ethiopian Artisan Gifts & Heirlooms (High-priority exact specificity)
  if (
    s.includes("gondar-parchment") ||
    (s.includes("gondar") && (s.includes("art") || s.includes("parchment")))
  )
    return "gondar-parchment-art";
  if (
    s.includes("lalibela-cross-signet-ring") ||
    s.includes("signet") ||
    s.includes("ring") ||
    (s.includes("lalibela") && s.includes("ring"))
  )
    return "lalibela-cross-signet-ring";
  if (
    s.includes("lalibela-processional-cross") ||
    s.includes("lalibela-cross") ||
    (s.includes("lalibela") && (s.includes("cross") || s.includes("meskel")))
  )
    return "lalibela-processional-cross";
  if (
    s.includes("axum-silver-filigree-cuff") ||
    s.includes("axum-cuff") ||
    s.includes("axum") ||
    s.includes("filigree-cuff")
  )
    return "axum-silver-filigree-cuff";
  if (
    s.includes("habesha-hair-jewelry") ||
    s.includes("hair-jewelry") ||
    (s.includes("shuruba") &&
      (s.includes("jewelry") || s.includes("cuff") || s.includes("bead")))
  )
    return "habesha-hair-jewelry-set";
  if (
    s.includes("harari-amber-coral-bangle") ||
    s.includes("harari-bangle") ||
    (s.includes("harar") &&
      (s.includes("bangle") || s.includes("amber") || s.includes("coral")))
  )
    return "harari-amber-coral-bangle";
  if (
    s.includes("harari-woven-trinket-box") ||
    s.includes("harari-trinket-box") ||
    s.includes("trinket") ||
    (s.includes("harar") && (s.includes("box") || s.includes("mesob")))
  )
    return "harari-woven-trinket-box";
  if (
    s.includes("wanza-vanity-mirror") ||
    s.includes("wanza-mirror") ||
    s.includes("vanity-mirror") ||
    s.includes("mirror") ||
    (s.includes("wanza") && s.includes("mirror"))
  )
    return "wanza-vanity-mirror";
  if (
    s.includes("shemma-cotton-towel") ||
    s.includes("shemma-towel") ||
    s.includes("shemma") ||
    s.includes("towel")
  )
    return "shemma-cotton-towel";
  if (
    s.includes("tibeb-handkerchief-set") ||
    s.includes("tibeb-handkerchief") ||
    s.includes("handkerchief") ||
    (s.includes("tibeb") && s.includes("pocket"))
  )
    return "tibeb-handkerchief-set";
  if (
    s.includes("ethiopian-gabi-throw") ||
    s.includes("ethiopian-gabi") ||
    s.includes("gabi") ||
    s.includes("throw")
  )
    return "ethiopian-gabi-throw";
  if (
    s.includes("brass-kohl-flask") ||
    s.includes("brass-kohl") ||
    s.includes("kohl") ||
    s.includes("flask") ||
    s.includes("mekula")
  )
    return "brass-kohl-flask";

  // 2. Specific Ethiopian Ceremony Accessories
  if (
    s.includes("buna-ceremony-kit") ||
    s.includes("ceremony-kit") ||
    (s.includes("ceremony") && s.includes("kit"))
  )
    return "ceremony-kit";
  if (s.includes("jebena")) return "jebena";
  if (s.includes("cini")) return "cini";
  if (s.includes("rekebot")) return "rekebot";
  if (s.includes("girgira")) return "girgira";
  if (s.includes("menkeskesha")) return "menkeskesha";
  if (s.includes("mukecha") || s.includes("zenezena")) return "mukecha";
  if (s.includes("ceremony") || s.includes("buna-ceremony"))
    return "ceremony-kit";

  // 3. Specific Ethiopian Organic Hair Care Botanicals
  if (s.includes("yetsehur") || s.includes("kibe")) return "yetsehur-kibe";
  if (
    (s.includes("koseret") &&
      (s.includes("elixir") || s.includes("scalp") || s.includes("nug"))) ||
    s.includes("koseret-scalp")
  )
    return "koseret-scalp-elixir";
  if (s.includes("endod") || (s.includes("cleanser") && !s.includes("body")))
    return "endod-cleanser";
  if (s.includes("shuruba") || s.includes("mask") || s.includes("conditioning"))
    return "shuruba-mask";
  if (s.includes("wanza") || s.includes("comb")) return "wanza-comb";

  // 4. Specific Ethiopian Incense & Sacred Itan Resins
  if (
    s.includes("tigray") ||
    (s.includes("frankincense") &&
      !s.includes("borena") &&
      !s.includes("black"))
  )
    return "tigray-frankincense";
  if (s.includes("ogaden") || s.includes("myrrh") || s.includes("karam"))
    return "ogaden-myrrh";
  if (
    s.includes("borena") ||
    s.includes("black-incense") ||
    s.includes("black-frankincense") ||
    s.includes("neglecta")
  )
    return "borena-black-incense";
  if (
    s.includes("ceremony-itan") ||
    s.includes("itan-blend") ||
    (s.includes("ceremony") && s.includes("itan"))
  )
    return "ceremony-itan-blend";

  // 5. Specific Ethiopian Organic Body & Scents
  if (s.includes("itan") || s.includes("perfume") || s.includes("boswellia"))
    return "itan-perfume";
  if (
    s.includes("enset") ||
    s.includes("body-wash") ||
    (s.includes("koseret") && s.includes("wash"))
  )
    return "koseret-body-wash";
  if (
    s.includes("ointment") ||
    s.includes("balm") ||
    (s.includes("korarima") && !s.includes("telba"))
  )
    return "korarima-ointment";
  if (s.includes("tenadam") || s.includes("mist")) return "tenadam-mist";
  if (s.includes("volcanic") || s.includes("scrub") || s.includes("polish"))
    return "volcanic-clay-scrub";

  // 6. Specific Ethiopian Organic Snacks
  if (s.includes("dabo-kolo") || s.includes("dabo")) return "dabo-kolo";
  if (s.includes("heritage-kolo") || s.includes("kolo")) return "heritage-kolo";
  if (s.includes("beso")) return "beso-clusters";
  if (s.includes("telba") || s.includes("crisps")) return "telba-crisps";
  if (s.includes("shimbra")) return "smoked-shimbra";

  // 7. Ethiopian Coffee Single-Origins & Regions
  if (s.includes("chelbesa")) return "chelbesa";
  if (s.includes("hamasho")) return "hamasho";
  if (s.includes("dimtu") || s.includes("tora")) return "dimtu-tora";
  if (s.includes("benti") || s.includes("neka")) return "benti-neka";
  if (s.includes("worku") || s.includes("buche")) return "worku-buche";
  if (s.includes("uraga")) return "uraga";
  if (
    (s.includes("harrar") || s.includes("harar")) &&
    !s.includes("harari") &&
    !s.includes("bangle") &&
    !s.includes("box") &&
    !s.includes("trinket") &&
    !s.includes("mesob")
  )
    return "harrar";
  if (s.includes("kaffa") || s.includes("limu")) return "kaffa";
  if (s.includes("djimmah") || s.includes("jimma")) return "djimmah";
  if (s.includes("green") || s.includes("raw")) return "green-coffee";
  if (s.includes("yirgacheffe")) return "chelbesa";
  if (s.includes("sidama") || s.includes("sidamo")) return "hamasho";
  if (s.includes("guji")) return "dimtu-tora";
  return null;
}

export function getCoffeeImage(slugOrName?: string | null): string | null {
  const key = getCoffeeImageKey(slugOrName);
  if (!key) return null;
  return COFFEE_IMAGE_GALLERIES[key]?.[0] || DEFAULT_COFFEE_IMAGE;
}

export function getCoffeeGalleryImages(slugOrName?: string | null): string[] {
  const key = getCoffeeImageKey(slugOrName);
  if (!key) return [DEFAULT_COFFEE_IMAGE];
  return COFFEE_IMAGE_GALLERIES[key] || [DEFAULT_COFFEE_IMAGE];
}

export function getCoffeeGallery(
  slugOrName?: string | null,
  productName = "Kabuna Ethiopian Specialty Coffee",
  productId = "prod",
): Media[] {
  const images = getCoffeeGalleryImages(slugOrName);
  return images.map((url, idx) =>
    createMedia(
      `media_${productId}_${idx + 1}`,
      url,
      `${productName} photo ${idx + 1}`,
      idx + 1,
    ),
  );
}

export function enrichProductWithImages<T extends Partial<Product>>(
  product: T,
): T {
  if (!product) return product;
  const slugOrName = product.slug || product.name || "";
  const coffeeImg = getCoffeeImage(slugOrName);
  const isLocalOrMissing =
    !product.thumbnail_url ||
    product.thumbnail_url.includes("localhost:") ||
    product.thumbnail_url.includes("127.0.0.1") ||
    product.thumbnail_url.includes("/rails/active_storage");

  const mainImage = isLocalOrMissing
    ? coffeeImg || product.thumbnail_url || DEFAULT_COFFEE_IMAGE
    : product.thumbnail_url;
  const mediaList =
    product.media && product.media.length > 0 && !isLocalOrMissing
      ? product.media
      : getCoffeeGallery(
          slugOrName,
          product.name || undefined,
          product.id || undefined,
        );
  const primaryMedia = isLocalOrMissing
    ? mediaList[0] || null
    : product.primary_media || mediaList[0] || null;

  return {
    ...product,
    thumbnail_url: mainImage,
    primary_media: primaryMedia,
    media: mediaList,
  };
}

/* =========================================================================
   Option Types & Option Values (Bag Size & Grind Options)
   ========================================================================= */

export const OPTION_TYPE_BAG_SIZE: OptionType = {
  id: "opt_bag_size",
  name: "bag_size",
  label: "Bag Size",
  position: 1,
  kind: "buttons",
};

export const OPTION_TYPE_GRIND: OptionType = {
  id: "opt_grind",
  name: "grind",
  label: "Grind Option",
  position: 2,
  kind: "buttons",
};

export const BAG_SIZES: OptionValue[] = [
  {
    id: "ov_size_250g",
    option_type_id: "opt_bag_size",
    name: "250g",
    label: "250g (8.8 oz)",
    position: 1,
    color_code: null,
    option_type_name: "bag_size",
    option_type_label: "Bag Size",
    image_url: null,
  },
  {
    id: "ov_size_500g",
    option_type_id: "opt_bag_size",
    name: "500g",
    label: "500g (1.1 lb)",
    position: 2,
    color_code: null,
    option_type_name: "bag_size",
    option_type_label: "Bag Size",
    image_url: null,
  },
  {
    id: "ov_size_1kg",
    option_type_id: "opt_bag_size",
    name: "1kg",
    label: "1kg (2.2 lb)",
    position: 3,
    color_code: null,
    option_type_name: "bag_size",
    option_type_label: "Bag Size",
    image_url: null,
  },
];

export const GRIND_OPTIONS: OptionValue[] = [
  {
    id: "ov_grind_whole",
    option_type_id: "opt_grind",
    name: "whole_bean",
    label: "Whole Bean",
    position: 1,
    color_code: null,
    option_type_name: "grind",
    option_type_label: "Grind Option",
    image_url: null,
  },
  {
    id: "ov_grind_filter",
    option_type_id: "opt_grind",
    name: "filter_pour_over",
    label: "Filter / Pour-Over",
    position: 2,
    color_code: null,
    option_type_name: "grind",
    option_type_label: "Grind Option",
    image_url: null,
  },
  {
    id: "ov_grind_espresso",
    option_type_id: "opt_grind",
    name: "espresso",
    label: "Espresso",
    position: 3,
    color_code: null,
    option_type_name: "grind",
    option_type_label: "Grind Option",
    image_url: null,
  },
  {
    id: "ov_grind_press",
    option_type_id: "opt_grind",
    name: "french_press",
    label: "French Press",
    position: 4,
    color_code: null,
    option_type_name: "grind",
    option_type_label: "Grind Option",
    image_url: null,
  },
];

function createCustomField(
  id: string,
  label: string,
  key: string,
  value: string,
): CustomField {
  return {
    id,
    label,
    key,
    value,
    type: "Spree::CustomFields::ShortText",
    field_type: "short_text",
  };
}

export function createVariant(
  id: string,
  sku: string,
  cents: number,
  optionValues: OptionValue[] = [],
  optionsText = "",
  weight = 0.25,
): Variant {
  const price = createPrice(cents);
  return {
    id,
    product_id: "",
    sku,
    options_text: optionsText,
    track_inventory: true,
    media_count: 0,
    preorder_ships_at: null,
    thumbnail_url: null,
    weight,
    height: null,
    width: null,
    depth: null,
    weight_unit: "kg",
    dimensions_unit: "cm",
    minimum_order_quantity: 1,
    order_multiple: 1,
    purchase_unit: "unit",
    units_per_carton: null,
    in_stock: true,
    backorderable: false,
    purchasable: true,
    preorder: false,
    price,
    original_price: price,
    seller_id: null,
    option_values: optionValues,
    custom_fields: [],
    media: [],
  };
}

export const KABUNA_MARKET: Market = {
  id: "market_us",
  name: "United States",
  currency: "USD",
  default_locale: "en",
  tax_inclusive: false,
  default: true,
  country_codes: ["US", "ET", "CA", "GB", "DE"],
  country_isos: ["US", "ET", "CA", "GB", "DE"],
  supported_locales: ["en", "de", "fr", "es"],
  countries: [
    {
      name: "United States",
      iso: "US",
      iso3: "USA",
      states_required: true,
      zipcode_required: true,
    },
    {
      name: "Ethiopia",
      iso: "ET",
      iso3: "ETH",
      states_required: false,
      zipcode_required: false,
    },
    {
      name: "Canada",
      iso: "CA",
      iso3: "CAN",
      states_required: true,
      zipcode_required: true,
    },
    {
      name: "United Kingdom",
      iso: "GB",
      iso3: "GBR",
      states_required: false,
      zipcode_required: false,
    },
    {
      name: "Germany",
      iso: "DE",
      iso3: "DEU",
      states_required: false,
      zipcode_required: false,
    },
  ],
};

function createCategory(
  id: string,
  name: string,
  permalink: string,
  description: string,
  children: Category[] = [],
  imageUrl: string | null = null,
): Category {
  return {
    id,
    name,
    permalink,
    position: 0,
    depth: 0,
    meta_title: `${name} | Kabuna Ethiopian Coffee`,
    meta_description: description,
    meta_keywords: `Ethiopian coffee, ${name}`,
    children_count: children.length,
    parent_id: null,
    description,
    description_html: `<p>${description}</p>`,
    image_url: imageUrl,
    square_image_url: imageUrl,
    is_root: true,
    is_child: false,
    is_leaf: children.length === 0,
    children,
  };
}

export const CAT_YIRGACHEFFE = createCategory(
  "cat_yirgacheffe",
  "Yirgacheffe",
  "single-origin/yirgacheffe",
  "Floral aromas, bergamot, and sweet citrus.",
);

export const CAT_GUJI = createCategory(
  "cat_guji",
  "Guji",
  "single-origin/guji",
  "Highland volcanic soils producing honeyed stone fruit.",
);

export const CAT_SIDAMA = createCategory(
  "cat_sidama",
  "Sidama",
  "single-origin/sidama",
  "Sun-dried strawberry, milk chocolate, and cane sugar.",
);

export const CAT_HARRAR = createCategory(
  "cat_harrar",
  "Harrar Longberry",
  "single-origin/harrar",
  "Wild blueberry mocha sweetness and rich body.",
);

export const CAT_LIMU_KAFFA = createCategory(
  "cat_limu_kaffa",
  "Limu & Kaffa Ancient Forest",
  "single-origin/limu-kaffa",
  "From the historic botanical origin of Arabica in Kaffa.",
);

export const CAT_SINGLE_ORIGIN = createCategory(
  "cat_single_origin",
  "Single Origin Varieties",
  "single-origin",
  "Exceptional single-origin specialty coffees from distinct micro-regions of Ethiopia.",
  [CAT_YIRGACHEFFE, CAT_GUJI, CAT_SIDAMA, CAT_HARRAR, CAT_LIMU_KAFFA],
);

export const CAT_WASHED = createCategory(
  "cat_washed",
  "Washed Process",
  "washed",
  "Pristine mountain spring water fermentation showcasing delicate florals and bright clarity.",
);

export const CAT_NATURAL = createCategory(
  "cat_natural",
  "Natural Process",
  "natural",
  "Sun-dried whole coffee cherries on raised African beds with intense fruit sweetness.",
);

export const CAT_ROAST = createCategory(
  "cat_roast",
  "Roast Profiles",
  "roast-profiles",
  "Artisanal roast levels calibrated to enhance natural origin characteristics.",
);

export const CAT_GREEN = createCategory(
  "cat_green",
  "Green Coffee (Unroasted)",
  "green-coffee",
  "Direct-trade Grade 1 raw green coffee beans for home roasting.",
);

export const CAT_CEREMONY = createCategory(
  "cat_ceremony",
  "Ceremony & Accessories",
  "coffee/ceremony",
  "Authentic clay Jebena pots, Cini cups, and traditional accessories for Ethiopian Buna Tetu.",
  [],
  "/images/ceremony/ceremony-kit.jpg",
);

export const CAT_COFFEE = createCategory(
  "cat_coffee",
  "Coffee",
  "coffee",
  "Exceptional single-origin micro-lots, pristine washed and natural fermentations, heritage roast profiles, unroasted green coffee, and sacred Ethiopian Buna ceremony wares.",
  [
    CAT_SINGLE_ORIGIN,
    CAT_CEREMONY,
    CAT_WASHED,
    CAT_NATURAL,
    CAT_ROAST,
    CAT_GREEN,
  ],
  "/images/products/chelbesa.jpg",
);

export const CAT_HAIR_BUTTERS = createCategory(
  "cat_hair_butters",
  "Herbal Butters & Balms",
  "hair/butters",
  "Cultured grass-fed herbal hair butter (YeTsehur Kibe) infused with wild mountain aromatics for intense moisture and curl definition.",
);

export const CAT_HAIR_OILS = createCategory(
  "cat_hair_oils",
  "Scalp Oils & Elixirs",
  "hair/oils",
  "Cold-pressed Ethiopian Nug seed oil, wild Koseret, and Tikur Azmud (black seed) formulated for follicle stimulation and length retention.",
);

export const CAT_HAIR_CLEANSERS = createCategory(
  "cat_hair_cleansers",
  "Botanical Cleansers",
  "hair/cleansers",
  "Wild-harvested Endod (African soapberry) and herbal washing powders that clarify gently without stripping natural scalp moisture.",
);

export const CAT_HAIR_MASKS = createCategory(
  "cat_hair_masks",
  "Treatments & Masks",
  "hair/treatments",
  "Restorative deep conditioning masks enriched with highland Moringa stenopetala and ancestral herbal infusions for strengthening braids and natural coils.",
);

export const CAT_HAIR_TOOLS = createCategory(
  "cat_hair_tools",
  "Wooden Combs & Accessories",
  "hair/tools",
  "Authentic hand-carved Wanza hardwood wide-tooth combs and traditional Habesha afro picks designed to detangle delicate curls seamlessly.",
);

export const CAT_HAIR = createCategory(
  "cat_hair",
  "Organic Hair Care",
  "hair",
  "Ancestral Habesha beauty rituals formulated with 100% native Ethiopian botanicals — herbal hair butters (YeTsehur Kibe), cold-pressed Nug oils, wild Endod cleansers, and hand-carved Wanza combs.",
  [
    CAT_HAIR_BUTTERS,
    CAT_HAIR_OILS,
    CAT_HAIR_CLEANSERS,
    CAT_HAIR_MASKS,
    CAT_HAIR_TOOLS,
  ],
  "/images/hair/yetsehur-kibe.jpg",
);

export const CAT_SNACKS_KOLO = createCategory(
  "cat_snacks_kolo",
  "Heritage Kolo Grains",
  "snacks/kolo",
  "Traditional dry-roasted whole barley, crunchy chickpeas, and toasted niger seeds — the beloved grain accompaniment to Buna Tetu.",
);

export const CAT_SNACKS_DABO_KOLO = createCategory(
  "cat_snacks_dabo_kolo",
  "Spiced Dabo Kolo",
  "snacks/dabo-kolo",
  "Artisanal crunchy diamond-cut spiced pastry morsels seasoned with highland Berbere and whole black cumin seeds (Tikur Azmud).",
);

export const CAT_SNACKS_BESO = createCategory(
  "cat_snacks_beso",
  "Beso Energy Clusters",
  "snacks/beso",
  "Roasted highland barley flour bites gently rolled with raw wild acacia forest honey and toasted sesame seeds.",
);

export const CAT_SNACKS_SEEDS = createCategory(
  "cat_snacks_seeds",
  "Telba & Nug Seed Crisps",
  "snacks/seeds",
  "Artisan high-omega seed wafer crackers crafted from whole roasted Ethiopian flaxseeds (Telba) and niger seeds (Nug).",
);

export const CAT_SNACKS_PULSES = createCategory(
  "cat_snacks_pulses",
  "Roasted Shimbra & Pulses",
  "snacks/pulses",
  "Ember-roasted whole highland chickpeas seasoned with volcanic mineral sea salt and wild mountain rosemary.",
);

export const CAT_SNACKS = createCategory(
  "cat_snacks",
  "Organic Snacks",
  "snacks",
  "Time-honored Ethiopian highland grain, seed, and pulse snacks — Heritage roasted Kolo, Berbere spiced Dabo Kolo, wild honey Beso energy bites, Telba flax crisps, and ember-roasted Shimbra.",
  [
    CAT_SNACKS_KOLO,
    CAT_SNACKS_DABO_KOLO,
    CAT_SNACKS_BESO,
    CAT_SNACKS_SEEDS,
    CAT_SNACKS_PULSES,
  ],
  "/images/snacks/heritage-kolo.jpg",
);

export const CAT_BODY_FRAGRANCE = createCategory(
  "cat_body_fragrance",
  "Highland Fragrances & Perfume Oils",
  "body/fragrances",
  "Sacred wild Tigray Boswellia frankincense (Itan) and pure botanical perfume distillations without synthetic additives.",
);

export const CAT_BODY_OINTMENTS = createCategory(
  "cat_body_ointments",
  "Restorative Herbal Ointments & Balms",
  "body/ointments",
  "Deep-penetrating warming herbal salves crafted with highland Korarima cardamom, black cumin (Tikur Azmud), and virgin beeswax.",
);

export const CAT_BODY_WASH = createCategory(
  "cat_body_wash",
  "Botanical Body Washes & Cleansers",
  "body/wash",
  "Invigorating botanical body washes formulated with wild mountain Koseret herbs and moisturizing Enset false banana mucilage.",
);

export const CAT_BODY_MISTS = createCategory(
  "cat_body_mists",
  "Herbal Scents & Botanical Mists",
  "body/mists",
  "Clarifying aromatherapeutic body and space mists distilled from sacred Tenadam (rue) and wild citrus blossoms.",
);

export const CAT_BODY_SCRUBS = createCategory(
  "cat_body_scrubs",
  "Volcanic Clay & Body Polishes",
  "body/scrubs",
  "Exfoliating mineral polishes blending Great Rift Valley volcanic obsidian clay, micro-milled Teff, and alpine rosemary.",
);

export const CAT_BODY_INCENSE = createCategory(
  "cat_body_incense",
  "Sacred Incense & Itan Resins",
  "body/incense",
  "Ancestral raw incense resins wild-harvested across Ethiopia — sacred Tigray Boswellia frankincense (Itan), Ogaden sweet myrrh (Karam), Borena black frankincense, and sacred Buna ceremony resin blends.",
  [],
  "/images/body/tigray-frankincense.jpg",
);

export const CAT_BODY = createCategory(
  "cat_body",
  "Organic Body",
  "body",
  "Highland scents, sacred incense resins, restorative ointments, and botanical body washes native to Ethiopia — wild Boswellia frankincense (Itan), Ogaden myrrh, warming Korarima salves, Koseret enset cleansers, and Tenadam mists.",
  [
    CAT_BODY_FRAGRANCE,
    CAT_BODY_OINTMENTS,
    CAT_BODY_WASH,
    CAT_BODY_MISTS,
    CAT_BODY_SCRUBS,
    CAT_BODY_INCENSE,
  ],
  "/images/body/itan-perfume.jpg",
);

export const CAT_GIFTS = createCategory(
  "cat_gifts",
  "Gifts",
  "gifts",
  "Artisanal heirloom gifts and handcrafted treasures native to Ethiopia — illuminated Gondar parchment art, Axum silver filigree bracelets and hair jewelry, Lalibela brass crosses and signet rings, handwoven Shemma cotton towels and Tibeb linens, hand-carved Wanza vanity mirrors, and Harari sweetgrass craft.",
  [],
  "/images/heroes/gifts-hero.jpg",
);

export const CAT_OFFICE_DEVICES = createCategory(
  "cat_office_devices",
  "iPhones & MacBooks",
  "office/devices",
  "High-performance Apple technology for executive leadership — flagship iPhones and MacBook Pro and Air M-series silicon workstations.",
);

export const CAT_OFFICE_STATIONERY = createCategory(
  "cat_office_stationery",
  "Notebooks, Pens & Folios",
  "office/stationery",
  "Heirloom writing instruments, acid-free notebooks, and executive document organizer files — full-grain leather journals, solid brass rollerball pens, and archival expanding files.",
);

export const CAT_OFFICE_BAGS = createCategory(
  "cat_office_bags",
  "Laptop Bags & Briefcases",
  "office/bags",
  "Handcrafted Ethiopian full-grain leather and waxed canvas laptop bags, messenger bags, and commuter briefcases.",
);

export const CAT_OFFICE_FURNITURE = createCategory(
  "cat_office_furniture",
  "Office Chairs & Desks",
  "office/furniture",
  "Ergonomic executive desk chairs with adaptive lumbar support and handcrafted solid Ethiopian Wanza hardwood writing and standing desks.",
);

export const CAT_OFFICE = createCategory(
  "cat_office",
  "Office",
  "office",
  "Executive workstations, high-performance Apple devices, handcrafted Ethiopian Wanza furniture, and fine stationery — iPhones, MacBook M-series, full-grain leather notebooks, solid brass pens, archival files, laptop bags, ergonomic office chairs, and executive desks.",
  [
    CAT_OFFICE_DEVICES,
    CAT_OFFICE_STATIONERY,
    CAT_OFFICE_BAGS,
    CAT_OFFICE_FURNITURE,
  ],
  "/images/heroes/office-hero.jpg",
);

export const KABUNA_CATEGORIES: Category[] = [
  CAT_COFFEE,
  CAT_SNACKS,
  CAT_HAIR,
  CAT_BODY,
  CAT_GIFTS,
  CAT_OFFICE,
];

interface CoffeeSpecProps {
  id: string;
  name: string; // The single featured name
  slug: string;
  subtitle: string;
  description: string;
  baseCents: number;
  imageUrl: string;
  categories: Category[];
  specs: {
    region: string;
    station: string;
    altitude: string;
    variety: string;
    process: string;
    grade: string;
    roast: string;
    score: string;
    notes: string;
    acidity: string;
    body: string;
    harvest: string;
  };
}

function buildCoffeeProduct({
  id,
  name,
  slug,
  subtitle,
  description,
  baseCents,
  imageUrl,
  categories,
  specs,
}: CoffeeSpecProps): Product {
  const price = createPrice(baseCents);
  const gallery = getCoffeeGallery(
    slug,
    `${name} Ethiopian Specialty Coffee`,
    id,
  );
  const primaryMedia =
    gallery[0] || createMedia(`media_${id}_1`, imageUrl, name);

  // Generate variants for 3 sizes × 4 grind types = 12 variants
  const variants: Variant[] = [];
  const sizeMultipliers: Record<
    string,
    { multiplier: number; weight: number }
  > = {
    "250g": { multiplier: 1.0, weight: 0.25 },
    "500g": { multiplier: 1.8, weight: 0.5 },
    "1kg": { multiplier: 3.3, weight: 1.0 },
  };

  for (const size of BAG_SIZES) {
    const { multiplier, weight } = sizeMultipliers[size.name] || {
      multiplier: 1.0,
      weight: 0.25,
    };
    const variantCents = Math.round(baseCents * multiplier);

    for (const grind of GRIND_OPTIONS) {
      const variantId = `var_${id}_${size.name}_${grind.name}`;
      const sku = `KBN-${slug.toUpperCase()}-${size.name.toUpperCase()}-${grind.name.toUpperCase()}`;
      const optionsText = `${size.label}, ${grind.label}`;
      variants.push(
        createVariant(
          variantId,
          sku,
          variantCents,
          [size, grind],
          optionsText,
          weight,
        ),
      );
    }
  }

  const defaultVariant = variants[0];

  const customFields: CustomField[] = [
    createCustomField(
      `cf_${id}_region`,
      "Region & Origin",
      "region",
      specs.region,
    ),
    createCustomField(
      `cf_${id}_station`,
      "Washing Station / Mill",
      "station",
      specs.station,
    ),
    createCustomField(
      `cf_${id}_altitude`,
      "Elevation",
      "altitude",
      specs.altitude,
    ),
    createCustomField(
      `cf_${id}_variety`,
      "Variety / Cultivars",
      "variety",
      specs.variety,
    ),
    createCustomField(
      `cf_${id}_process`,
      "Processing Method",
      "process",
      specs.process,
    ),
    createCustomField(`cf_${id}_grade`, "Quality Grade", "grade", specs.grade),
    createCustomField(`cf_${id}_roast`, "Roast Profile", "roast", specs.roast),
    createCustomField(`cf_${id}_score`, "Cupping Score", "score", specs.score),
    createCustomField(`cf_${id}_notes`, "Tasting Notes", "notes", specs.notes),
    createCustomField(`cf_${id}_acidity`, "Acidity", "acidity", specs.acidity),
    createCustomField(`cf_${id}_body`, "Mouthfeel & Body", "body", specs.body),
    createCustomField(
      `cf_${id}_harvest`,
      "Harvest Season",
      "harvest",
      specs.harvest,
    ),
  ];

  return {
    id,
    name,
    slug,
    meta_title: `${name} | Kabuna Ethiopian Specialty Coffee`,
    meta_description: subtitle,
    meta_keywords: `Ethiopian specialty coffee, ${name}, ${specs.region}, ${specs.variety}, ${specs.process}`,
    variant_count: variants.length,
    available_on: "2024-01-01T00:00:00.000Z",
    preorder_ships_at: null,
    purchasable: true,
    preorder: false,
    in_stock: true,
    backorderable: false,
    available: true,
    description,
    description_html: `<p>${description}</p>`,
    default_variant_id: defaultVariant.id,
    buy_box_variant_id: defaultVariant.id,
    thumbnail_url: imageUrl,
    tags: [
      "Ethiopian Specialty Coffee",
      specs.region,
      specs.variety,
      specs.process,
      "Direct Trade",
    ],
    price,
    original_price: price,
    seller_id: null,
    primary_media: primaryMedia,
    media: gallery,
    variants,
    default_variant: defaultVariant,
    option_types: [OPTION_TYPE_BAG_SIZE, OPTION_TYPE_GRIND],
    option_values: [...BAG_SIZES, ...GRIND_OPTIONS],
    categories: categories.some((c) => c.id === "cat_coffee")
      ? categories
      : [CAT_COFFEE, ...categories],
    custom_fields: customFields,
    prior_price: null,
  };
}

interface CeremonyProductProps {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  baseCents: number;
  compareAtCents?: number;
  imageUrl: string;
  sku: string;
  weight: number;
  tags: string[];
  specs: {
    material: string;
    origin: string;
    dimensionsOrCapacity: string;
    ritualUse: string;
    care: string;
  };
}

function buildCeremonyProduct({
  id,
  name,
  slug,
  subtitle,
  description,
  baseCents,
  compareAtCents,
  imageUrl,
  sku,
  weight,
  tags,
  specs,
}: CeremonyProductProps): Product {
  const price = createPrice(baseCents, compareAtCents);
  const gallery = getCoffeeGallery(
    slug,
    `${name} - Traditional Ethiopian Buna Ceremony`,
    id,
  );
  const primaryMedia =
    gallery[0] || createMedia(`media_${id}_1`, imageUrl, name);
  const variant = createVariant(
    `var_${id}_default`,
    sku,
    baseCents,
    [],
    "Standard",
    weight,
  );

  const customFields: CustomField[] = [
    createCustomField(
      `cf_${id}_material`,
      "Craft Materials",
      "material",
      specs.material,
    ),
    createCustomField(
      `cf_${id}_origin`,
      "Artisan Provenance",
      "origin",
      specs.origin,
    ),
    createCustomField(
      `cf_${id}_capacity`,
      "Capacity / Dimensions",
      "capacity",
      specs.dimensionsOrCapacity,
    ),
    createCustomField(
      `cf_${id}_use`,
      "Traditional Ritual Role",
      "use",
      specs.ritualUse,
    ),
    createCustomField(
      `cf_${id}_care`,
      "Care & Maintenance",
      "care",
      specs.care,
    ),
  ];

  return {
    id,
    name,
    slug,
    meta_title: `${name} | Ethiopian Buna Ceremony Accessories | Kabuna`,
    meta_description: subtitle,
    meta_keywords: `Ethiopian coffee ceremony, Buna Tetu, ${name}, ${tags.join(", ")}`,
    variant_count: 1,
    available_on: "2024-01-01T00:00:00.000Z",
    preorder_ships_at: null,
    purchasable: true,
    preorder: false,
    in_stock: true,
    backorderable: false,
    available: true,
    description: `${subtitle}\n\n${description}`,
    description_html: `<p><strong>${subtitle}</strong></p><p>${description}</p>`,
    default_variant_id: variant.id,
    buy_box_variant_id: variant.id,
    thumbnail_url: imageUrl,
    tags: [
      "Buna Ceremony",
      "Accessories",
      "Authentic Ethiopian Craft",
      ...tags,
    ],
    price,
    original_price: compareAtCents ? createPrice(compareAtCents) : price,
    seller_id: null,
    primary_media: primaryMedia,
    media: gallery.length > 0 ? gallery : [primaryMedia],
    variants: [variant],
    default_variant: variant,
    option_types: [],
    option_values: [],
    categories: [CAT_COFFEE, CAT_CEREMONY],
    custom_fields: customFields,
    prior_price: null,
  };
}

interface HairProductProps {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  baseCents: number;
  compareAtCents?: number;
  imageUrl: string;
  sku: string;
  weight: number;
  tags: string[];
  categories: Category[];
  specs: {
    ingredients: string;
    botanicalOrigin: string;
    hairType: string;
    ritualUse: string;
    scentProfile: string;
  };
}

function buildHairProduct({
  id,
  name,
  slug,
  subtitle,
  description,
  baseCents,
  compareAtCents,
  imageUrl,
  sku,
  weight,
  tags,
  categories,
  specs,
}: HairProductProps): Product {
  const price = createPrice(baseCents, compareAtCents);
  const primaryMedia = createMedia(`media_${id}_1`, imageUrl, name);
  const gallery = [primaryMedia];
  const variant = createVariant(
    `var_${id}_default`,
    sku,
    baseCents,
    [],
    "Standard",
    weight,
  );

  const customFields: CustomField[] = [
    createCustomField(
      `cf_${id}_ingredients`,
      "Active Botanicals",
      "ingredients",
      specs.ingredients,
    ),
    createCustomField(
      `cf_${id}_origin`,
      "Harvest Provenance",
      "origin",
      specs.botanicalOrigin,
    ),
    createCustomField(
      `cf_${id}_hair_type`,
      "Recommended Hair Textures",
      "hair_type",
      specs.hairType,
    ),
    createCustomField(
      `cf_${id}_use`,
      "Traditional Habesha Ritual",
      "use",
      specs.ritualUse,
    ),
    createCustomField(
      `cf_${id}_scent`,
      "Aromatherapeutic Notes",
      "scent",
      specs.scentProfile,
    ),
  ];

  const productCategories = categories.some((c) => c.id === "cat_hair")
    ? categories
    : [CAT_HAIR, ...categories];

  return {
    id,
    name,
    slug,
    meta_title: `${name} | Ethiopian Organic Hair Care | Kabuna`,
    meta_description: subtitle,
    meta_keywords: `Ethiopian organic hair care, Habesha hair, ${name}, ${tags.join(", ")}`,
    variant_count: 1,
    available_on: "2024-01-01T00:00:00.000Z",
    preorder_ships_at: null,
    purchasable: true,
    preorder: false,
    in_stock: true,
    backorderable: false,
    available: true,
    description: `${subtitle}\n\n${description}`,
    description_html: `<p><strong>${subtitle}</strong></p><p>${description}</p>`,
    default_variant_id: variant.id,
    buy_box_variant_id: variant.id,
    thumbnail_url: imageUrl,
    tags: [
      "Organic Hair Care",
      "Ethiopian Botanicals",
      "Habesha Hair Ritual",
      ...tags,
    ],
    price,
    original_price: compareAtCents ? createPrice(compareAtCents) : price,
    seller_id: null,
    primary_media: primaryMedia,
    media: gallery.length > 0 ? gallery : [primaryMedia],
    variants: [variant],
    default_variant: variant,
    option_types: [],
    option_values: [],
    categories: productCategories,
    custom_fields: customFields,
    prior_price: null,
  };
}

interface SnackProductProps {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  baseCents: number;
  compareAtCents?: number;
  imageUrl: string;
  sku: string;
  weight: number;
  tags: string[];
  categories: Category[];
  specs: {
    ingredients: string;
    origin: string;
    dietary: string;
    pairing: string;
    flavor: string;
  };
}

function buildSnackProduct({
  id,
  name,
  slug,
  subtitle,
  description,
  baseCents,
  compareAtCents,
  imageUrl,
  sku,
  weight,
  tags,
  categories,
  specs,
}: SnackProductProps): Product {
  const price = createPrice(baseCents, compareAtCents);
  const primaryMedia = createMedia(`media_${id}_1`, imageUrl, name);
  const gallery = [primaryMedia];
  const variant = createVariant(
    `var_${id}_default`,
    sku,
    baseCents,
    [],
    "Standard",
    weight,
  );

  const customFields: CustomField[] = [
    createCustomField(
      `cf_${id}_ingredients`,
      "Ingredients",
      "ingredients",
      specs.ingredients,
    ),
    createCustomField(
      `cf_${id}_origin`,
      "Harvest Provenance",
      "origin",
      specs.origin,
    ),
    createCustomField(
      `cf_${id}_dietary`,
      "Dietary & Nutritional Profile",
      "dietary",
      specs.dietary,
    ),
    createCustomField(
      `cf_${id}_pairing`,
      "Buna Tetu Pairing",
      "pairing",
      specs.pairing,
    ),
    createCustomField(
      `cf_${id}_flavor`,
      "Flavor & Texture Profile",
      "flavor",
      specs.flavor,
    ),
  ];

  const productCategories = categories.some((c) => c.id === "cat_snacks")
    ? categories
    : [CAT_SNACKS, ...categories];

  return {
    id,
    name,
    slug,
    meta_title: `${name} | Ethiopian Organic Snacks | Kabuna`,
    meta_description: subtitle,
    meta_keywords: `Ethiopian organic snacks, Buna Tetu, ${name}, ${tags.join(", ")}`,
    variant_count: 1,
    available_on: "2024-01-01T00:00:00.000Z",
    preorder_ships_at: null,
    purchasable: true,
    preorder: false,
    in_stock: true,
    backorderable: false,
    available: true,
    description: `${subtitle}\n\n${description}`,
    description_html: `<p><strong>${subtitle}</strong></p><p>${description}</p>`,
    default_variant_id: variant.id,
    buy_box_variant_id: variant.id,
    thumbnail_url: imageUrl,
    tags: ["Organic Snacks", "Ethiopian Grains", "Buna Tetu Snack", ...tags],
    price,
    original_price: compareAtCents ? createPrice(compareAtCents) : price,
    seller_id: null,
    primary_media: primaryMedia,
    media: gallery,
    variants: [variant],
    default_variant: variant,
    option_types: [],
    option_values: [],
    categories: productCategories,
    custom_fields: customFields,
    prior_price: null,
  };
}

interface BodyProductProps {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  baseCents: number;
  compareAtCents?: number;
  imageUrl: string;
  sku: string;
  weight: number;
  tags: string[];
  categories: Category[];
  specs: {
    ingredients: string;
    origin: string;
    scent: string;
    use: string;
    format: string;
  };
}

function buildBodyProduct({
  id,
  name,
  slug,
  subtitle,
  description,
  baseCents,
  compareAtCents,
  imageUrl,
  sku,
  weight,
  tags,
  categories,
  specs,
}: BodyProductProps): Product {
  const price = createPrice(baseCents, compareAtCents);
  const primaryMedia = createMedia(`media_${id}_1`, imageUrl, name);
  const gallery = [primaryMedia];
  const variant = createVariant(
    `var_${id}_default`,
    sku,
    baseCents,
    [],
    "Standard",
    weight,
  );

  const customFields: CustomField[] = [
    createCustomField(
      `cf_${id}_ingredients`,
      "Native Botanical Ingredients",
      "ingredients",
      specs.ingredients,
    ),
    createCustomField(
      `cf_${id}_origin`,
      "Harvest Provenance",
      "origin",
      specs.origin,
    ),
    createCustomField(
      `cf_${id}_scent`,
      "Scent Profile & Notes",
      "scent",
      specs.scent,
    ),
    createCustomField(
      `cf_${id}_use`,
      "Ritual Application & Use",
      "use",
      specs.use,
    ),
    createCustomField(
      `cf_${id}_format`,
      "Formulation & Packaging",
      "format",
      specs.format,
    ),
  ];

  const productCategories = categories.some((c) => c.id === "cat_body")
    ? categories
    : [CAT_BODY, ...categories];

  return {
    id,
    name,
    slug,
    meta_title: `${name} | Ethiopian Organic Body | Kabuna`,
    meta_description: subtitle,
    meta_keywords: `Ethiopian organic body, native fragrances, ${name}, ${tags.join(", ")}`,
    variant_count: 1,
    available_on: "2024-01-01T00:00:00.000Z",
    preorder_ships_at: null,
    purchasable: true,
    preorder: false,
    in_stock: true,
    backorderable: false,
    available: true,
    description: `${subtitle}\n\n${description}`,
    description_html: `<p><strong>${subtitle}</strong></p><p>${description}</p>`,
    default_variant_id: variant.id,
    buy_box_variant_id: variant.id,
    thumbnail_url: imageUrl,
    tags: [
      "Organic Body",
      "Native Ethiopian Botanicals",
      "Highland Fragrance",
      ...tags,
    ],
    price,
    original_price: compareAtCents ? createPrice(compareAtCents) : price,
    seller_id: null,
    primary_media: primaryMedia,
    media: gallery,
    variants: [variant],
    default_variant: variant,
    option_types: [],
    option_values: [],
    categories: productCategories,
    custom_fields: customFields,
    prior_price: null,
  };
}

interface GiftProductProps {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  baseCents: number;
  compareAtCents?: number;
  imageUrl: string;
  sku: string;
  weight: number;
  tags: string[];
  categories?: Category[];
  specs: {
    artisanOrigin: string;
    materials: string;
    dimensionsOrSize: string;
    craftsmanship: string;
    careOrUse: string;
  };
}

function buildGiftProduct({
  id,
  name,
  slug,
  subtitle,
  description,
  baseCents,
  compareAtCents,
  imageUrl,
  sku,
  weight,
  tags,
  categories = [CAT_GIFTS],
  specs,
}: GiftProductProps): Product {
  const price = createPrice(baseCents, compareAtCents);
  const primaryMedia = createMedia(
    `media_${id}_1`,
    imageUrl,
    `${name} - Ethiopian Heirloom Gift`,
    1,
  );
  const gallery = [primaryMedia];
  const variant = createVariant(
    `var_${id}_default`,
    sku,
    baseCents,
    [],
    "Standard",
    weight,
  );

  const customFields: CustomField[] = [
    createCustomField(
      `cf_${id}_origin`,
      "Artisan Provenance",
      "origin",
      specs.artisanOrigin,
    ),
    createCustomField(
      `cf_${id}_materials`,
      "Materials & Craft",
      "materials",
      specs.materials,
    ),
    createCustomField(
      `cf_${id}_dimensions`,
      "Dimensions & Specifications",
      "dimensions",
      specs.dimensionsOrSize,
    ),
    createCustomField(
      `cf_${id}_craftsmanship`,
      "Artisan Tradition",
      "craftsmanship",
      specs.craftsmanship,
    ),
    createCustomField(
      `cf_${id}_care`,
      "Care & Maintenance",
      "care",
      specs.careOrUse,
    ),
  ];

  const productCategories = categories.some((c) => c.id === "cat_gifts")
    ? categories
    : [CAT_GIFTS, ...categories];

  return {
    id,
    name,
    slug,
    meta_title: `${name} | Ethiopian Heirloom Gifts | Kabuna`,
    meta_description: subtitle,
    meta_keywords: `Ethiopian gifts, ${name}, ${tags.join(", ")}, Habesha handmade crafts`,
    variant_count: 1,
    available_on: "2024-01-01T00:00:00.000Z",
    preorder_ships_at: null,
    purchasable: true,
    preorder: false,
    in_stock: true,
    backorderable: false,
    available: true,
    description: `${subtitle}\n\n${description}`,
    description_html: `<p><strong>${subtitle}</strong></p><p>${description}</p>`,
    default_variant_id: variant.id,
    buy_box_variant_id: variant.id,
    thumbnail_url: imageUrl,
    tags: [
      "Ethiopian Gifts",
      "Artisan Heirloom",
      "Handmade in Ethiopia",
      ...tags,
    ],
    price,
    original_price: compareAtCents ? createPrice(compareAtCents) : price,
    seller_id: null,
    primary_media: primaryMedia,
    media: gallery.length > 0 ? gallery : [primaryMedia],
    variants: [variant],
    default_variant: variant,
    option_types: [],
    option_values: [],
    categories: productCategories,
    custom_fields: customFields,
    prior_price: null,
  };
}

interface OfficeProductProps {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  baseCents: number;
  compareAtCents?: number;
  imageUrl: string;
  sku: string;
  weight: number;
  tags: string[];
  categories?: Category[];
  specs: {
    itemType: string;
    specifications: string;
    materials: string;
    dimensions: string;
    origin: string;
    warrantyOrCare: string;
  };
}

function buildOfficeProduct({
  id,
  name,
  slug,
  subtitle,
  description,
  baseCents,
  compareAtCents,
  imageUrl,
  sku,
  weight,
  tags,
  categories = [CAT_OFFICE],
  specs,
}: OfficeProductProps): Product {
  const price = createPrice(baseCents, compareAtCents);
  const primaryMedia = createMedia(
    `media_${id}_1`,
    imageUrl,
    `${name} - Executive Office Workstation`,
    1,
  );
  const gallery = [primaryMedia];
  const variant = createVariant(
    `var_${id}_default`,
    sku,
    baseCents,
    [],
    "Standard",
    weight,
  );

  const customFields: CustomField[] = [
    createCustomField(
      `cf_${id}_type`,
      "Product Category",
      "type",
      specs.itemType,
    ),
    createCustomField(
      `cf_${id}_specifications`,
      "Technical Specs & Features",
      "specifications",
      specs.specifications,
    ),
    createCustomField(
      `cf_${id}_specs`,
      "Technical Specs & Features",
      "specs",
      specs.specifications,
    ),
    createCustomField(
      `cf_${id}_materials`,
      "Materials & Craft",
      "materials",
      specs.materials,
    ),
    createCustomField(
      `cf_${id}_dimensions`,
      "Dimensions & Sizing",
      "dimensions",
      specs.dimensions,
    ),
    createCustomField(
      `cf_${id}_origin`,
      "Provenance & Supply",
      "origin",
      specs.origin,
    ),
    createCustomField(
      `cf_${id}_warranty`,
      "Warranty & Care",
      "warranty",
      specs.warrantyOrCare,
    ),
  ];

  const productCategories = categories.some((c) => c.id === "cat_office")
    ? categories
    : [CAT_OFFICE, ...categories];

  return {
    id,
    name,
    slug,
    meta_title: `${name} | Executive Office Workstation | Kabuna`,
    meta_description: subtitle,
    meta_keywords: `Office supplies, ${name}, ${tags.join(", ")}, Apple workstation, ergonomic furniture`,
    variant_count: 1,
    available_on: "2024-01-01T00:00:00.000Z",
    preorder_ships_at: null,
    purchasable: true,
    preorder: false,
    in_stock: true,
    backorderable: false,
    available: true,
    description: `${subtitle}\n\n${description}`,
    description_html: `<p><strong>${subtitle}</strong></p><p>${description}</p>`,
    default_variant_id: variant.id,
    buy_box_variant_id: variant.id,
    thumbnail_url: imageUrl,
    tags: [
      "Executive Office",
      "Modern Workstation",
      "Office Essentials",
      ...tags,
    ],
    price,
    original_price: compareAtCents ? createPrice(compareAtCents) : price,
    seller_id: null,
    primary_media: primaryMedia,
    media: gallery,
    variants: [variant],
    default_variant: variant,
    option_types: [],
    option_values: [],
    categories: productCategories,
    custom_fields: customFields,
    prior_price: null,
  };
}

export const KABUNA_PRODUCTS: Product[] = [
  // 1. Chelbesa (Yirgacheffe Washed)
  buildCoffeeProduct({
    id: "prod_chelbesa",
    name: "Chelbesa",
    slug: "chelbesa",
    subtitle: "Yirgacheffe Washed G1 • Jasmine, White Peach, Bergamot",
    description:
      "Chelbesa is sourced from smallholder family plots in the famed Chelbesa Kebele within the high-elevation Gedeo Zone (Yirgacheffe). Grown between 1,950 and 2,200 meters above sea level, indigenous Kurume and Dega heirloom cultivars flourish in rich red-brown clay soil under semi-forest shade. Processed using ceramic fermentation tanks that stabilize temperatures during the 36-hour wet fermentation, then slow-dried on raised African beds for 14 days. The cup reveals an ethereal, crystal-clear profile of white jasmine floral aromatics, juicy white peach, candied lemon, and a silky black-tea finish.",
    baseCents: 2200,
    imageUrl: "/images/products/chelbesa.jpg",
    categories: [CAT_SINGLE_ORIGIN, CAT_YIRGACHEFFE, CAT_WASHED],
    specs: {
      region: "Yirgacheffe, Gedeo Zone (Chelbesa Kebele)",
      station: "Chelbesa Wet Mill (Ceramic Fermentation)",
      altitude: "1,950m – 2,200m MASL",
      variety: "Kurume & Dega Heirloom",
      process: "Fully Washed (Ceramic Fermentation)",
      grade: "Grade 1 Specialty",
      roast: "Light Roast (Floral & Bright)",
      score: "88.5",
      notes: "Jasmine Blossom, White Peach, Bergamot, Candied Lemon",
      acidity: "Vibrant Citric & Delicate Malic",
      body: "Silky, Tea-Like, Pristine Clean",
      harvest: "Current Crop 2024",
    },
  }),

  // 2. Hamasho (Sidama Natural)
  buildCoffeeProduct({
    id: "prod_hamasho",
    name: "Hamasho",
    slug: "hamasho",
    subtitle:
      "Sidama Natural G1 • Blueberry Compote, Wild Lavender, Dark Honey",
    description:
      "Hamasho is an extraordinary natural micro-lot from the Bura Hamasho mill in the high mountain ridges of the Sidama Zone, perched at staggering elevations between 2,100 and 2,300 meters. Generational growers cultivate regional JARC 74110 and 74112 heirloom selections, rigorously hand-sorting cherries for peak ripeness. The whole cherries dry naturally under mountain sun on raised ventilated beds for 21 days with hourly hand-turning. Hamasho exemplifies peak Ethiopian natural processing: an explosion of lush blueberry compote, lavender blossoms, dried apricot, and raw dark honey, supported by a velvety winey mouthfeel.",
    baseCents: 2300,
    imageUrl: "/images/products/hamasho.jpg",
    categories: [CAT_SINGLE_ORIGIN, CAT_SIDAMA, CAT_NATURAL],
    specs: {
      region: "Sidama Zone (Bura Hamasho Mill)",
      station: "Bura Hamasho Mill",
      altitude: "2,100m – 2,300m MASL",
      variety: "JARC 74110 & 74112 Heirloom",
      process: "Sun-Dried Natural (Raised Beds)",
      grade: "Grade 1 Specialty",
      roast: "Light-Medium Roast (Fruity & Sweet)",
      score: "89.0",
      notes: "Blueberry Compote, Wild Lavender, Dried Apricot, Dark Honey",
      acidity: "Complex Winey & Juicy",
      body: "Velvety, Syrupy & Full",
      harvest: "Current Crop 2024",
    },
  }),

  // 3. Dimtu Tora (Guji Anaerobic Natural)
  buildCoffeeProduct({
    id: "prod_dimtu_tora",
    name: "Dimtu Tora",
    slug: "dimtu-tora",
    subtitle:
      "Guji Anaerobic Natural G1 • Wild Strawberry, Red Hibiscus, Milk Chocolate",
    description:
      "Dimtu Tora is an organic specialty lot from the Hambela Wamena woreda of the Guji Zone, grown at altitudes ranging from 1,900 to 2,300 meters. Smallholders in this highland enclave hand-pick heirloom Bedessa and Gibirinna varieties from deep semi-forest plots. Processed using a slow anaerobic dry maceration before transferring to raised beds, Dimtu Tora delivers an electrifying and intensely aromatic cup. The profile overflows with ripe wild strawberries, tart red hibiscus flower, tropical papaya, and passionfruit, culminating in a creamy milk chocolate and raw cacao finish.",
    baseCents: 2400,
    imageUrl: "/images/products/dimtu-tora.jpg",
    categories: [CAT_SINGLE_ORIGIN, CAT_GUJI, CAT_NATURAL],
    specs: {
      region: "Guji Zone (Hambela Wamena)",
      station: "Dimtu Tora Washing Station",
      altitude: "1,900m – 2,300m MASL",
      variety: "Bedessa & Gibirinna Heirloom",
      process: "Anaerobic Natural (Slow Maceration)",
      grade: "Grade 1 (Certified Organic)",
      roast: "Light Roast (Intense & Complex)",
      score: "88.75",
      notes: "Wild Strawberry, Red Hibiscus, Papaya, Milk Chocolate",
      acidity: "Bright Phosphoric & Tropical",
      body: "Creamy, Round & Resonant",
      harvest: "Current Crop 2024",
    },
  }),

  // 4. Benti Neka (West Guji Washed)
  buildCoffeeProduct({
    id: "prod_benti_neka",
    name: "Benti Neka",
    slug: "benti-neka",
    subtitle: "West Guji Washed G1 • Meyer Lemon, Wildflower Honey, Crisp Pear",
    description:
      "Benti Neka is produced at the acclaimed Benti Neka washing station in West Guji, surrounded by virgin forest and pristine mountain river springs at 2,000 to 2,250 meters altitude. This lot consists of certified organic Kurume and 74110 heirloom varieties meticulously pulped, fermented for 48 hours in cold mountain water, and washed twice through serpentine grading channels. Benti Neka is renowned for its crystalline cup clarity and sparkling balance, delivering notes of sweet Meyer lemon, wildflower honey, crisp Anjou pear, ginger blossom, and a lingering botanical finish.",
    baseCents: 2250,
    imageUrl: "/images/products/benti-neka.jpg",
    categories: [CAT_SINGLE_ORIGIN, CAT_GUJI, CAT_WASHED],
    specs: {
      region: "West Guji Zone (Benti Neka Station)",
      station: "Benti Neka Washing Station",
      altitude: "2,000m – 2,250m MASL",
      variety: "Kurume & 74110 Heirloom",
      process: "Fully Washed (Channel Graded)",
      grade: "Grade 1 (Certified Organic)",
      roast: "Light Roast (Crisp & Clean)",
      score: "87.75",
      notes: "Meyer Lemon, Wildflower Honey, Crisp Anjou Pear, Ginger Blossom",
      acidity: "Sparkling, Effervescent & Balanced",
      body: "Crisp, Delicate & Refreshing",
      harvest: "Current Crop 2024",
    },
  }),

  // 5. Worku Buche (Sidama Natural)
  buildCoffeeProduct({
    id: "prod_worku_buche",
    name: "Worku Buche",
    slug: "worku-buche",
    subtitle: "Sidama Natural G1 • Concord Grape, Dark Cherry, Cacao Nibs",
    description:
      "Worku Buche is an authentic single-producer natural micro-lot from the Kadela wet mill in the Aroresa woreda, situated on the remote eastern mountain ridge of Sidama at 2,000 to 2,150 meters. Harvested from old-growth indigenous landrace trees shaded by Ensete (false banana) and native acacias, the cherries are slowly dried whole in single layers to ensure uniform drying. The resulting cup delivers a deep, satisfying sweetness dominated by sweet Concord grape, dark Rainier cherry, orange blossom, and raw cacao nibs, supported by a thick, velvety mouthfeel.",
    baseCents: 2150,
    imageUrl: "/images/products/worku-buche.jpg",
    categories: [CAT_SINGLE_ORIGIN, CAT_SIDAMA, CAT_NATURAL],
    specs: {
      region: "Sidama Zone (Aroresa Woreda, Kadela)",
      station: "Kadela Mill (Worku Buche Lot)",
      altitude: "2,000m – 2,150m MASL",
      variety: "Indigenous Heirloom Landraces",
      process: "Sun-Dried Natural (Single Layer)",
      grade: "Grade 1 Specialty",
      roast: "Medium-Light Roast (Rich & Syrupy)",
      score: "88.25",
      notes: "Concord Grape, Dark Rainier Cherry, Orange Blossom, Raw Cacao",
      acidity: "Smooth & Balanced Malic",
      body: "Heavy, Syrupy & Velvety",
      harvest: "Current Crop 2024",
    },
  }),

  // 6. Uraga (Guji High-Altitude Washed)
  buildCoffeeProduct({
    id: "prod_uraga",
    name: "Uraga",
    slug: "uraga",
    subtitle: "Guji Washed G1 • Orange Marmalade, Honeysuckle, Red Apple",
    description:
      "Uraga is harvested from extreme high-altitude smallholdings scaling up to 2,350 meters on the slopes of Kuri Mountain in the Uraga woreda of Guji. At these freezing night temperatures, coffee cherries mature at a dramatically slowed pace, condensing sugar and aromatic complexity into dense, compact beans of Dega and Wolisho varieties. Washed in pure high-altitude glacial springs, Uraga expresses a luminous citrus-and-floral profile: orange marmalade, honeysuckle nectar, crisp red Honeycrisp apple, and raw turbinado cane sugar, concluding with an immaculate, sparkling finish.",
    baseCents: 2350,
    imageUrl: "/images/products/uraga.jpg",
    categories: [CAT_SINGLE_ORIGIN, CAT_GUJI, CAT_WASHED],
    specs: {
      region: "Guji Zone (Uraga District, Kuri Mountain)",
      station: "Kuri Mountain Washing Station",
      altitude: "2,150m – 2,350m MASL",
      variety: "Dega & Wolisho Heirloom",
      process: "High-Altitude Glacial Washed",
      grade: "Grade 1 Specialty",
      roast: "Light Roast (Floral & Sweet)",
      score: "88.5",
      notes: "Orange Marmalade, Honeysuckle Nectar, Red Apple, Turbinado Sugar",
      acidity: "Crystalline Tartaric & Citric",
      body: "Smooth, Silky & Elegant",
      harvest: "Current Crop 2024",
    },
  }),

  // 7. Harrar Wild Horse (Heirloom Longberry)
  buildCoffeeProduct({
    id: "prod_harrar_longberry",
    name: "Harrar Wild Horse",
    slug: "harrar-wild-horse-longberry",
    subtitle:
      "Harrar Longberry G1 • Wild Blueberry, Dark Baker's Cocoa, Cardamom",
    description:
      "Cultivated on the sun-baked arid mountain terraces of Eastern Harar, where wild Coffea Arabica has thrived for well over a millennium. This legendary micro-lot is celebrated for its distinctive elongated 'Longberry' bean morphology, hand-harvested from ancient indigenous shrubs and sun-dried whole on raised beds under the fierce desert sun. Harrar Wild Horse yields a thick, syrupy cup bursting with ripe wild blueberry jam, heavy baker's cocoa, raw cane molasses, and exotic green cardamom, framed by an enchanting, lingering winey finish.",
    baseCents: 2300,
    imageUrl: "/images/products/harrar.jpg",
    categories: [CAT_SINGLE_ORIGIN, CAT_HARRAR, CAT_NATURAL],
    specs: {
      region: "Eastern Harar Highlands (Oromia)",
      station: "Harar Jugol Heirloom Sun-Drying Beds",
      altitude: "1,600m – 1,850m MASL",
      variety: "Longberry Heirloom",
      process: "Dry Natural Heirloom (Whole Cherry Sun-Cured)",
      grade: "Grade 1 Specialty Longberry",
      roast: "Medium Roast (Winey & Heavy Body)",
      score: "88.0",
      notes: "Wild Blueberry Compote, Baker's Cocoa, Cardamom, Raw Molasses",
      acidity: "Gentle Winey & Sweet Malic",
      body: "Heavy, Syrupy & Velvet-Coating",
      harvest: "Current Crop 2024",
    },
  }),

  // 8. Kaffa Ancient Forest (Wild Harvested)
  buildCoffeeProduct({
    id: "prod_kaffa_forest",
    name: "Kaffa Ancient Forest",
    slug: "kaffa-ancient-wild-forest",
    subtitle: "Kaffa Wild Biosphere G1 • Black Fig, Spiced Plum, Sacred Cedar",
    description:
      "Harvested directly from wild ancient mother trees growing under the virgin rainforest canopy of the UNESCO Kaffa Biosphere Reserve — the sacred botanical origin where Coffea Arabica was first discovered in ancient Abyssinia. Local indigenous gatherers selectively forage wild red cherries from primeval mountain forests at 1,750 to 2,100 meters elevation. Slow sun-dried on shaded forest raised beds, Kaffa Ancient Forest offers an unforgettable cup of deep forest character: spiced ripe black fig, stewed Damson plum, raw wildflower honey, and an intoxicating finish of frankincense and sacred mountain cedar.",
    baseCents: 2600,
    imageUrl: "/images/products/kaffa.jpg",
    categories: [CAT_SINGLE_ORIGIN, CAT_LIMU_KAFFA, CAT_NATURAL],
    specs: {
      region: "Kaffa Biosphere Reserve (Mankira Ancient Forest)",
      station: "Kaffa Forest Foragers Guild & Raised Beds",
      altitude: "1,750m – 2,100m MASL",
      variety: "Indigenous Kaffa Wild Forest Mother Trees (7440 & 7454)",
      process: "Wild Rainforest Natural (Canopy Shade-Dried)",
      grade: "Grade 1 Wild Specialty",
      roast: "Light-Medium Roast (Aromatic & Complex)",
      score: "89.5",
      notes: "Dried Black Fig, Spiced Damson Plum, Wild Honey, Sacred Cedar",
      acidity: "Complex Phosphoric & Wild Blackberry",
      body: "Round, Resonant & Tea-Like Silky",
      harvest: "Current Crop 2024",
    },
  }),

  // 9. Djimmah Traditional Roast (Heritage Blend)
  buildCoffeeProduct({
    id: "prod_djimmah_roast",
    name: "Djimmah Traditional Roast",
    slug: "djimmah-traditional-roast-heritage",
    subtitle:
      "Heritage Dark Roast • Roasted Almond, Dark Chocolate Ganache, Molasses",
    description:
      "Crafted specifically for authentic stove-top Jebena boiling, Moka pot, and full-bodied espresso. Sourced from generational heritage smallholdings across the Jimma and Djimmah highlands of southwestern Ethiopia. Expertly roasted to a rich French-Italian dark roast profile that brings forth deep caramelized sweetness without astringency. Offers a profound, dense body laden with dark chocolate ganache, toasted almonds, sweet smoky molasses, and a velvety Crema.",
    baseCents: 1900,
    imageUrl: "/images/products/djimmah.jpg",
    categories: [CAT_SINGLE_ORIGIN, CAT_ROAST],
    specs: {
      region: "Djimmah & Jimma Highlands",
      station: "Traditional Heritage Roasting Lot",
      altitude: "1,650m – 1,950m MASL",
      variety: "Djimmah Heritage Landraces",
      process: "Traditional Deep Roast (Optimized for Jebena)",
      grade: "Specialty Heritage Dark Roast",
      roast: "Dark Roast (Rich, Bold & Heavy)",
      score: "86.5",
      notes: "Dark Chocolate Ganache, Roasted Almond, Burnt Sugar, Molasses",
      acidity: "Low, Mellow & Balanced",
      body: "Dense, Syrupy & Extremely Bold",
      harvest: "Current Crop 2024",
    },
  }),

  // 10. Yirgacheffe Raw Green Coffee (Unroasted)
  buildCoffeeProduct({
    id: "prod_green_coffee_raw",
    name: "Yirgacheffe Raw Green Coffee",
    slug: "yirgacheffe-raw-green-coffee-beans",
    subtitle: "Grade 1 Direct-Trade Raw Beans • For Home Artisan Roasting",
    description:
      "For home roasters and coffee purists. Pristine unroasted raw green Arabica coffee beans directly imported from high-altitude micro-lots in Yirgacheffe. Sourced at 2,000–2,200m elevation and carefully sorted for zero primary defects. Featuring dense, moisture-stable jade-green beans of Metu Bishari and Gera 74158 highland heirloom selections. Ready for roasting in a traditional iron Menkeskesha pan over embers, or modern home drum and air roasters.",
    baseCents: 1800,
    imageUrl: "/images/products/green-coffee.jpg",
    categories: [CAT_SINGLE_ORIGIN, CAT_GREEN, CAT_WASHED],
    specs: {
      region: "Yirgacheffe (Chelbesa Kebele)",
      station: "Chelbesa Wet Mill (Raw Lot)",
      altitude: "2,000m – 2,200m MASL",
      variety: "Metu Bishari & Gera 74158 Highland Heirloom",
      process: "Raw Unroasted Green (Spring Water Washed)",
      grade: "Grade 1 Raw Specialty (Zero Primary Defects)",
      roast: "Unroasted Raw Green Beans",
      score: "88.5 Potential Cup",
      notes: "Raw Jasmine Floral, Crisp Green Apple, White Grape, Bergamot",
      acidity: "Bright Citric & Malic",
      body: "Dense High-Altitude Bean Structure",
      harvest: "Current Crop 2024 Fresh Crop",
    },
  }),

  // 7. Jebena (Traditional Clay Coffee Boiling Pot)
  buildCeremonyProduct({
    id: "prod_jebena_pot",
    name: "Jebena",
    slug: "jebena-clay-pot",
    subtitle:
      "Handcrafted Highland Clay Boiling Pot with Woven Straw Ring Base",
    description:
      "The beating heart of the Ethiopian coffee ritual. Hand-thrown from iron-rich highland clay by master potters and pit-fired with dried eucalyptus leaves, the Jebena features a bulbous boiling chamber, slender pouring neck, and precision spout designed to separate fine grounds naturally. Includes a hand-woven straw ring base (mat) and natural straw filter stopper. Suitable for stovetop embers, gas flame with heat diffuser, or electric cooktops.",
    baseCents: 3600,
    compareAtCents: 4400,
    imageUrl: "/images/ceremony/jebena.jpg",
    sku: "KBN-CEREMONY-JEBENA",
    weight: 0.95,
    tags: [
      "Jebena",
      "Clay Pot",
      "Buna Tetu",
      "Earthenware",
      "Traditional Brewing",
    ],
    specs: {
      material: "Highland Terracotta Clay & Natural Woven Straw Base",
      origin: "Addis Ababa & Wolaita Potter Guilds, Ethiopia",
      dimensionsOrCapacity: "850ml (Serves 6–8 traditional Cini cups)",
      ritualUse:
        "Boils coarse coffee grounds; long neck allows sediment to settle naturally before pouring",
      care: "Rinse with boiling water only; never use detergents or abrasive scourers",
    },
  }),

  // 8. Cini (Ceremonial Porcelain Cups & Saucers)
  buildCeremonyProduct({
    id: "prod_cini_cups",
    name: "Cini",
    slug: "cini-cups-set",
    subtitle:
      "Set of 6 Authentic Handleless Porcelain Demitasse Cups & Saucers with Tibeb Motifs",
    description:
      "Authentic Ethiopian handleless demitasse cups and matching saucers, decorated with iconic vibrant Tibeb geometric patterns in crimson red, emerald green, and gold trim. Sized specifically for the traditional three rounds of ceremony blessing: Abol (first brew), Tona (second brew), and Bereka (third blessing). Each box includes a full set of 6 cups and 6 matching saucers.",
    baseCents: 3200,
    compareAtCents: 3800,
    imageUrl: "/images/ceremony/cini.jpg",
    sku: "KBN-CEREMONY-CINI",
    weight: 0.75,
    tags: ["Cini", "Ceremony Cups", "Tibeb", "Porcelain", "Demitasse Set"],
    specs: {
      material:
        "High-Fire Fine Porcelain with Gold Trim and Traditional Tibeb Enamel",
      origin: "Ethiopian Cultural Heritage Ware",
      dimensionsOrCapacity: "65ml per cup; 11cm diameter saucer (Set of 6)",
      ritualUse:
        "Serves Abol, Tona, and Bereka ceremonial pourings in continuous stream from the Jebena",
      care: "Gentle hand wash recommended to protect gold-leaf filigree",
    },
  }),

  // 9. Rekebot (Ceremonial Wooden Service Table)
  buildCeremonyProduct({
    id: "prod_rekebot_table",
    name: "Rekebot",
    slug: "rekebot-serving-table",
    subtitle: "Handcrafted Dark Hardwood Ceremony Service Table & Cup Tray",
    description:
      "The ceremonial centerpiece around which guests gather. Handcrafted from rich dark Ethiopian hardwood, this two-tiered presentation box features engraved geometric lattice panels, polished brass corner reinforcements, and recessed circular slots engineered to cradle Cini cups securely during service. An interior compartment stores extra cups, frankincense, and ceremony essentials.",
    baseCents: 8500,
    compareAtCents: 9800,
    imageUrl: "/images/ceremony/rekebot.jpg",
    sku: "KBN-CEREMONY-REKEBOT",
    weight: 2.2,
    tags: [
      "Rekebot",
      "Ceremony Table",
      "Wooden Chest",
      "Brass Accents",
      "Coffee Tray",
    ],
    specs: {
      material: "Solid Ethiopian Hardwood & Antiqued Brass Hardware",
      origin: "Addis Ababa Master Carpenters",
      dimensionsOrCapacity:
        "38cm (L) × 26cm (W) × 18cm (H); holds 6–12 Cini cups",
      ritualUse:
        "Elevates cups during service, protects against spills, and stores ceremonial utensils",
      care: "Wipe with damp cloth; nourish wood biannually with natural beeswax",
    },
  }),

  // 10. Girgira (Handcrafted Terracotta Incense Burner)
  buildCeremonyProduct({
    id: "prod_girgira_burner",
    name: "Girgira",
    slug: "girgira-incense-burner",
    subtitle:
      "Hand-Carved Terracotta Censer with Raw Tigray Frankincense (Itan)",
    description:
      "No Buna ceremony begins without the sacred scent of Itan. Hand-carved from natural terracotta with traditional sunburst and cross geometric carvings, the Girgira cradles glowing coconut charcoal and raw tears of wild-harvested Ethiopian frankincense and myrrh. The aromatic smoke cleanses the room, elevates the atmosphere, and honors guests before the first roast begins.",
    baseCents: 2400,
    compareAtCents: 2900,
    imageUrl: "/images/ceremony/girgira.jpg",
    sku: "KBN-CEREMONY-GIRGIRA",
    weight: 0.55,
    tags: [
      "Girgira",
      "Incense Burner",
      "Frankincense",
      "Itan",
      "Clay Chalice",
      "Aromatics",
    ],
    specs: {
      material: "High-Heat Pit-Fired Terracotta Clay",
      origin: "Tigray & Amhara Artisan Kilns, Ethiopia",
      dimensionsOrCapacity:
        "15cm height × 11cm diameter; includes 50g Tigray Frankincense (Itan)",
      ritualUse:
        "Burns frankincense resin over hot embers to perfume and sanctify the ceremony room",
      care: "Allow embers to extinguish fully; empty ash before storing",
    },
  }),

  // 11. Menkeskesha (Traditional Iron Roasting Pan)
  buildCeremonyProduct({
    id: "prod_menkeskesha_pan",
    name: "Menkeskesha",
    slug: "menkeskesha-roasting-pan",
    subtitle:
      "Hand-Forged Perforated Iron Coffee Roasting Pan with Extended Handle",
    description:
      "Experience the mesmerizing ritual of roasting coffee right at your table. Hand-forged from seasoned heavy-gauge black iron, the Menkeskesha features micro-perforations that ensure even airflow and gentle heat transfer over charcoal or flame. Its slender, heat-dissipating handle allows the host to rhythmically toss green beans until they reach a deep glossy brown, then circulate the smoking pan for guests to waft and admire.",
    baseCents: 2800,
    compareAtCents: 3400,
    imageUrl: "/images/ceremony/menkeskesha.jpg",
    sku: "KBN-CEREMONY-MENKESKESHA",
    weight: 0.65,
    tags: [
      "Menkeskesha",
      "Roasting Pan",
      "Wafting Skillet",
      "Iron Craft",
      "Manual Roasting",
    ],
    specs: {
      material: "Hand-Hammered Seasoned Carbon Iron",
      origin: "Traditional Blacksmith Guild of Oromia",
      dimensionsOrCapacity:
        "22cm diameter skillet; 28cm elongated iron handle; 250g batch capacity",
      ritualUse:
        "Hand-roasts raw beans over open coals; wafted warm under guests' noses as a welcome blessing",
      care: "Season with edible vegetable oil after washing; keep completely dry to prevent rust",
    },
  }),

  // 12. Mukecha & Zenezena (Carved Wooden Mortar & Pestle)
  buildCeremonyProduct({
    id: "prod_mukecha_mortar",
    name: "Mukecha & Zenezena",
    slug: "mukecha-zenezena-mortar-pestle",
    subtitle:
      "Solid Hand-Carved Hardwood Mortar and Pestle for Ceremonial Crushing",
    description:
      "The authentic way to grind ceremony coffee. Carved from a solid block of dense Ethiopian eucalyptus hardwood, the deep-welled Mukecha (mortar) and weighted ergonomic Zenezena (pestle) hand-crush hot freshly roasted beans without overheating or shearing bean oils. Produces an uneven, rustic coarse-to-medium grind prized for rich body and deep extraction in the Jebena.",
    baseCents: 3400,
    compareAtCents: 4200,
    imageUrl: "/images/ceremony/mukecha.jpg",
    sku: "KBN-CEREMONY-MUKECHA",
    weight: 1.1,
    tags: [
      "Mukecha",
      "Zenezena",
      "Mortar and Pestle",
      "Hand-Carved Hardwood",
      "Manual Grinder",
    ],
    specs: {
      material: "Solid Mountain Eucalyptus Hardwood",
      origin: "Southern Nations & Sidama Woodcarvers",
      dimensionsOrCapacity:
        "18cm mortar height × 12cm rim; 24cm heavy pestle; 100g bean capacity",
      ritualUse:
        "Hand-pounds roasted coffee beans immediately prior to boiling in the Jebena",
      care: "Wipe dry with clean cloth; condition monthly with food-safe mineral oil",
    },
  }),

  // 13. Jebena Ceremony Kit (Complete Heirloom Ritual Set)
  buildCeremonyProduct({
    id: "prod_buna_ceremony_kit",
    name: "Jebena Ceremony Kit",
    slug: "jebena-buna-ceremony-kit",
    subtitle:
      "Complete Heirloom Ethiopian Buna Tetu Ritual Package with All 6 Accessories",
    description:
      "The ultimate heirloom collection for authentic Ethiopian Buna Tetu at home. This master set contains all 6 ceremonial accessories: a handcrafted clay Jebena pot with straw base, 6 porcelain Cini cups and saucers with Tibeb motifs, a dark hardwood Rekebot table box, a terracotta Girgira incense burner with Tigray frankincense resin, an iron Menkeskesha roasting pan, a carved wooden Mukecha & Zenezena mortar and pestle, plus 250g unroasted green heirloom coffee beans and ceremonial Ketema grass mat.",
    baseCents: 14500,
    compareAtCents: 17500,
    imageUrl: "/images/ceremony/ceremony-kit.jpg",
    sku: "KBN-CEREMONY-KIT-FULL",
    weight: 4.8,
    tags: [
      "Buna Ceremony",
      "Jebena Kit",
      "Complete Set",
      "Ethiopian Heirloom",
      "Gift Set",
    ],
    specs: {
      material:
        "Highland Terracotta, Fine Porcelain, Solid Hardwood, and Hand-Forged Iron",
      origin: "Artisan Guilds of Addis Ababa, Sidama & Tigray, Ethiopia",
      dimensionsOrCapacity:
        "Complete 6-person ritual setup; packaged in handcrafted presentation crate",
      ritualUse:
        "Enables the full three-round traditional Buna Tetu ceremony: roasting, grinding, incense, and serving",
      care: "Includes comprehensive illustrated English/Amharic ritual care and brewing manual",
    },
  }),

  // 18. YeTsehur Kibe (Highland Herbal Hair Butter)
  buildHairProduct({
    id: "prod_yetsehur_kibe",
    name: "YeTsehur Kibe",
    slug: "yetsehur-kibe-herbal-hair-butter",
    subtitle:
      "Cultured Grass-Fed Butter Infused with Wild Koseret, Rosemary & Cardamom",
    description:
      "An ancient secret of Habesha hair care passed down across generations. Hand-churned from grass-fed highland milk and slowly infused over low embers with wild Koseret (Lippia adoensis), Ethiopian highland rosemary, and green cardamom pods. This rich, whipped golden butter melts effortlessly upon skin and scalp contact, delivering vital fatty acids and deep cellular moisture to replenish dry coils, lock in post-wash hydration, and shield natural hair from harsh sun exposure.",
    baseCents: 2800,
    compareAtCents: 3400,
    imageUrl: "/images/hair/yetsehur-kibe.jpg",
    sku: "KBN-HAIR-KIBE",
    weight: 0.35,
    tags: [
      "YeTsehur Kibe",
      "Hair Butter",
      "Koseret",
      "Deep Moisture",
      "Habesha Hair",
    ],
    categories: [CAT_HAIR, CAT_HAIR_BUTTERS],
    specs: {
      ingredients:
        "Clarified Grass-Fed Highland Butter, Wild Koseret (Lippia adoensis), Rosemary Extract, Green Cardamom, Black Seed (Tikur Azmud)",
      botanicalOrigin:
        "Shewa Highlands & Gojjam Organic Cooperatives, Ethiopia",
      hairType: "Textured, Type 3 & 4 Coils, High Porosity, Protective Styles",
      ritualUse:
        "Warm a hazelnut-sized portion between palms; gently massage into scalp and smooth through ends after washing or prior to braiding",
      scentProfile:
        "Warm herbal Koseret, comforting minty citrus, and roasted mountain butter",
    },
  }),

  // 19. Koseret & Nug Scalp Elixir (100% Organic Cold-Pressed Hair Oil)
  buildHairProduct({
    id: "prod_koseret_scalp_elixir",
    name: "Koseret & Nug Scalp Elixir",
    slug: "koseret-nug-scalp-elixir",
    subtitle:
      "Cold-Pressed Ethiopian Nug Seed Oil with Wild Koseret & Black Cumin",
    description:
      "A sacred growth and scalp vitality elixir formulating Ethiopia's indigenous golden Nug seed (Guizotia abyssinica) with wild-foraged Koseret and Tikur Azmud (Nigella sativa / Black Cumin). Rich in linoleic acid, omega-6 fatty acids, and thymoquinone, this fast-absorbing botanical oil stimulates blood microcirculation around follicles, calms dry or irritated scalps, reduces shedding, and leaves a lustrous, weightless mirror shine.",
    baseCents: 3200,
    compareAtCents: 3800,
    imageUrl: "/images/hair/koseret-scalp-elixir.jpg",
    sku: "KBN-HAIR-ELIXIR",
    weight: 0.25,
    tags: ["Scalp Elixir", "Nug Oil", "Koseret", "Hair Growth", "Cold Pressed"],
    categories: [CAT_HAIR, CAT_HAIR_OILS],
    specs: {
      ingredients:
        "Cold-Pressed Ethiopian Nug Seed Oil (Guizotia abyssinica), Wild Koseret Infusion, Tikur Azmud (Black Cumin Seed Oil), Cold-Pressed Sesame Seed Oil",
      botanicalOrigin:
        "Gondar Volcanic Plateaus & Tigray Valley Farms, Ethiopia",
      hairType:
        "All Curls & Coils, Dry Scalp, Thinning Edges, Low & High Porosity",
      ritualUse:
        "Part hair into sections; apply 3–5 drops directly to scalp and massage in circular motions for 5 minutes; ideal for nightly scalp stimulation or hot oil treatments",
      scentProfile:
        "Earthy botanical seed warmth with invigorating wild herbal Koseret top notes",
    },
  }),

  // 20. Endod Botanical Cleanser (Wild Saponin Hair & Scalp Wash)
  buildHairProduct({
    id: "prod_endod_cleanser",
    name: "Endod Botanical Cleanser",
    slug: "endod-botanical-cleanser",
    subtitle:
      "Wild Saponin-Rich Phytolacca Dodecandra Powder for Gentle Scalp Clarifying",
    description:
      "Centuries before modern shampoos existed, Ethiopian communities relied on Endod (African soapberry / Phytolacca dodecandra) to purify hair naturally. Harvested sustainably from wild riverbank shrubs in the central plateau, our dried Endod berries are ground into a silky cleansing powder rich in botanical saponins. When mixed with warm water, it creates a gentle, low-lather foam that lifts product buildup, excess sebum, and environmental impurities without stripping the scalp's delicate acid mantle.",
    baseCents: 2400,
    compareAtCents: 2900,
    imageUrl: "/images/hair/endod-cleanser.jpg",
    sku: "KBN-HAIR-ENDOD",
    weight: 0.3,
    tags: [
      "Endod",
      "Saponin Wash",
      "Clarifying Powder",
      "Zero Chemicals",
      "Herbal Cleanser",
    ],
    categories: [CAT_HAIR, CAT_HAIR_CLEANSERS],
    specs: {
      ingredients:
        "100% Wild-Crafted Phytolacca Dodecandra (Endod Berry Powder), Gesho Leaf Powder, Dried Hibiscus Calyx",
      botanicalOrigin:
        "Bishoftu Rift Valley & Blue Nile Basin Wild Groves, Ethiopia",
      hairType:
        "Sensitive Scalp, Sensitive Skin, Product-Heavy Curls, Color-Treated Hair",
      ritualUse:
        "Mix 1–2 tablespoons with 1 cup warm water until a gentle frothy tea forms; pour slowly over damp hair, massage through scalp, and rinse thoroughly",
      scentProfile:
        "Clean earthy green tea with subtle wild mountain berry undertones",
    },
  }),

  // 21. Shuruba Deep Conditioning Mask (Moringa & Herbal Fortifying Treatment)
  buildHairProduct({
    id: "prod_shuruba_mask",
    name: "Shuruba Deep Conditioning Mask",
    slug: "shuruba-deep-conditioning-mask",
    subtitle:
      "Highland Moringa Stenopetala & Traditional Herbal Strengthening Cream",
    description:
      "Specially crafted for traditional Ethiopian cornrow and braid ceremonies (*Shuruba*), this decadent fortifying treatment delivers intensive protein-moisture balance. Formulated with wild-harvested Ethiopian Moringa stenopetala leaves (celebrated in the Konso highlands as the tree of life), cold-pressed Nug butter, and softening marshmallow root. It repairs damaged keratin bonds, seals porous cuticles, and provides unmatched slip for effortless finger-detangling.",
    baseCents: 3400,
    compareAtCents: 4000,
    imageUrl: "/images/hair/shuruba-mask.jpg",
    sku: "KBN-HAIR-SHURUBA",
    weight: 0.45,
    tags: [
      "Shuruba",
      "Conditioning Mask",
      "Moringa Stenopetala",
      "Deep Treatment",
      "Slip & Elasticity",
    ],
    categories: [CAT_HAIR, CAT_HAIR_MASKS],
    specs: {
      ingredients:
        "Wild Highland Moringa Stenopetala Extract, Cold-Pressed Nug Butter, Shea Fruit Butter, Aloe Ferox Gel, Herbal Rosemary & Clove Infusion",
      botanicalOrigin:
        "Konso Cultural Landscape & Southern Rift Highlands, Ethiopia",
      hairType:
        "Damaged, Dry, High Porosity, Transitioning Curls, Braided Protective Styles",
      ritualUse:
        "Apply generously from roots to ends on clean, damp hair; leave on for 20–30 minutes under a warm towel or steamer, then rinse with cool water",
      scentProfile:
        "Lush green Moringa canopy, sweet herbal clove, and subtle citrus zest",
    },
  }),

  // 22. Wanza Carved Hair Comb (Handcrafted Habesha Hardwood Pick)
  buildHairProduct({
    id: "prod_wanza_comb",
    name: "Wanza Carved Hair Comb",
    slug: "wanza-carved-hair-comb",
    subtitle: "Handcrafted Ethiopian Cordia Africana Hardwood Detangling Comb",
    description:
      "An heirloom styling artifact handcrafted by master woodcarvers in Gondar from dense Ethiopian Wanza (Cordia africana) hardwood. Each wide tooth is individually hand-sanded to a glass-smooth finish to glide effortlessly through the densest 4C coils without friction, snagging, or static. Features traditional etched Habesha cross geometry on the ergonomic handle. Naturally anti-static and conditions over time as it absorbs herbal hair butters and oils.",
    baseCents: 2200,
    compareAtCents: 2800,
    imageUrl: "/images/hair/wanza-comb.jpg",
    sku: "KBN-HAIR-COMB",
    weight: 0.18,
    tags: [
      "Wanza Wood",
      "Habesha Comb",
      "Afro Pick",
      "Hand Carved",
      "Anti-Static",
    ],
    categories: [CAT_HAIR, CAT_HAIR_TOOLS],
    specs: {
      ingredients:
        "Solid Ethiopian Wanza (Cordia africana) Mountain Hardwood; conditioned with organic Nug oil",
      botanicalOrigin: "Gondar Artisan Guilds & Amhara Highlands, Ethiopia",
      hairType: "All Curl Types (3A–4C), Thick Textured Hair, Beards",
      ritualUse:
        "Use on damp or buttered hair to gently detangle from ends upward; excellent for lifting roots and creating fullness",
      scentProfile: "Subtle natural woody warmth from mountain hardwood",
    },
  }),

  // 23. Highland Heritage Kolo (Roasted Barley, Chickpeas & Niger Seed Mix)
  buildSnackProduct({
    id: "prod_heritage_kolo",
    name: "Highland Heritage Kolo",
    slug: "heritage-kolo",
    subtitle:
      "Traditional Roasted Whole Barley, Chickpeas & Niger Seed Buna Tetu Snack",
    description:
      "The quintessential grain companion to the Ethiopian Buna Tetu ceremony. Sourced directly from smallholder grain cooperatives in the high-elevation volcanic plains of Shewa and Amhara. Hand-selected whole highland barley (Gebs), plump golden chickpeas (Shimbra), and nutty black niger seeds (Nug) are slow-roasted to crunchy perfection on an artisanal earthenware mitad without added oils. Seasoned lightly with solar-evaporated volcanic rift salt.",
    baseCents: 1400,
    compareAtCents: 1800,
    imageUrl: "/images/snacks/heritage-kolo.jpg",
    sku: "KBN-SNACK-KOLO",
    weight: 0.35,
    tags: [
      "Heritage Kolo",
      "Roasted Barley",
      "Buna Snack",
      "Oil-Free Roasted",
      "High Fiber",
    ],
    categories: [CAT_SNACKS, CAT_SNACKS_KOLO],
    specs: {
      ingredients:
        "Dry-Roasted Highland Whole Barley (Gebs), Golden Chickpeas (Shimbra), Toasted Niger Seeds (Nug), Flaky Volcanic Salt",
      origin: "Amhara & Shewa Highlands, Ethiopia",
      dietary:
        "100% Organic, 100% Plant-Based / Vegan, Whole Grain, Non-GMO, Oil-Free Roasted",
      pairing:
        "Traditionally enjoyed alongside hot freshly brewed Buna from the Jebena; also wonderful as a crisp midday grain snack",
      flavor:
        "Nutty, earthy, deeply toasty grain crunch with delicate aromatic warmth from toasted niger seeds",
    },
  }),

  // 24. Berbere Spiced Dabo Kolo (Artisanal Diamond-Cut Crunchy Morsels)
  buildSnackProduct({
    id: "prod_dabo_kolo",
    name: "Berbere Spiced Dabo Kolo",
    slug: "dabo-kolo",
    subtitle:
      "Artisanal Crunchy Diamond-Cut Morsels with Highland Berbere & Tikur Azmud",
    description:
      "Beloved across Ethiopian holiday tables and festive gatherings. These bite-sized diamond-cut wheat flour pastry morsels are handcrafted, lightly kneaded with cold-pressed Nug oil, and baked until shatteringly crisp. Infused with aromatic highland Berbere chili blend, Ethiopian black cardamom (Korarima), and whole black cumin seeds (Tikur Azmud) for a balanced warm kick.",
    baseCents: 1600,
    compareAtCents: 2000,
    imageUrl: "/images/snacks/dabo-kolo.jpg",
    sku: "KBN-SNACK-DABO",
    weight: 0.3,
    tags: [
      "Dabo Kolo",
      "Berbere Spiced",
      "Black Cumin",
      "Artisan Pastry",
      "Habesha Snack",
    ],
    categories: [CAT_SNACKS, CAT_SNACKS_DABO_KOLO],
    specs: {
      ingredients:
        "Highland Organic Wheat Flour, Cold-Pressed Nug Seed Oil, Sun-Dried Berbere Spice Blend (Chili, Garlic, Korarima, Fenugreek, Rue), Tikur Azmud (Black Seed), Cane Sugar, Sea Salt",
      origin: "Addis Ababa & Central Highlands, Ethiopia",
      dietary:
        "100% Organic, Vegan, Dairy-Free, Low Sugar, No Artificial Preservatives",
      pairing:
        "Pairs remarkably with bright citrusy Yirgacheffe washed coffee, spiced black tea, or craft beverages",
      flavor:
        "Crunchy, savory-spicy warmth, gentle sweetness, and lingering peppery aromatics of black cardamom",
    },
  }),

  // 25. Wild Honey Beso Energy Clusters (Roasted Barley & Raw Acacia Honey Bites)
  buildSnackProduct({
    id: "prod_beso_clusters",
    name: "Wild Honey Beso Energy Clusters",
    slug: "beso-clusters",
    subtitle:
      "Roasted Highland Barley Flour Bites Rolled with Wild Acacia Honey & Sesame",
    description:
      "Rooted in ancient Ethiopian endurance nutrition favored by high-altitude runners and highland travellers. Crafted from Beso — whole barley grains that are slowly roasted over embers and stone-ground into a fine aromatic flour. Hand-kneaded with pure, unheated raw acacia forest honey gathered from the wild woodlands of Bale and rolled in golden toasted sesame seeds.",
    baseCents: 1800,
    compareAtCents: 2200,
    imageUrl: "/images/snacks/beso-clusters.jpg",
    sku: "KBN-SNACK-BESO",
    weight: 0.28,
    tags: [
      "Beso",
      "Wild Acacia Honey",
      "Energy Clusters",
      "Barley Superfood",
      "Highland Fuel",
    ],
    categories: [CAT_SNACKS, CAT_SNACKS_BESO],
    specs: {
      ingredients:
        "Stone-Ground Roasted Highland Barley Flour (Beso), 100% Raw Wild Acacia Forest Honey, Toasted White Sesame Seeds, Ground Korarima (Cardamom)",
      origin: "Bale Mountain Forest & Arsi Highlands, Ethiopia",
      dietary:
        "100% Organic, Vegetarian, Dairy-Free, Refined-Sugar Free, High Complex Carbohydrates",
      pairing:
        "Ideal morning coffee companion, natural endurance booster before running, or wholesome afternoon sweet bite",
      flavor:
        "Malty roasted barley richness, delicate floral honey notes, and nutty sesame finish",
    },
  }),

  // 26. Toasted Telba & Nug Seed Crisps (High-Omega Flax & Niger Seed Crackers)
  buildSnackProduct({
    id: "prod_telba_crisps",
    name: "Toasted Telba & Nug Seed Crisps",
    slug: "telba-crisps",
    subtitle:
      "Artisan High-Omega Crisp Crackers from Ethiopian Golden Flaxseed & Niger Seeds",
    description:
      "A tribute to Ethiopia's ancient seed biodiversity. Golden Telba (highland flaxseed) and mineral-packed Nug (niger seeds) are gently sprouted, lightly roasted, and crisp-baked into paper-thin wafer crackers. Lightly seasoned with volcanic black salt and Korarima. Exceptionally nutrient-dense with abundant plant-based Omega-3 fatty acids, plant lignans, and prebiotic gut fiber.",
    baseCents: 1500,
    compareAtCents: 1900,
    imageUrl: "/images/snacks/telba-crisps.jpg",
    sku: "KBN-SNACK-TELBA",
    weight: 0.22,
    tags: [
      "Telba Crisps",
      "Flaxseed",
      "Nug Seeds",
      "Omega-3 Superfood",
      "Keto Friendly",
    ],
    categories: [CAT_SNACKS, CAT_SNACKS_SEEDS],
    specs: {
      ingredients:
        "Whole Roasted Ethiopian Flaxseeds (Telba), Roasted Niger Seeds (Nug), White Sesame Seeds, Crushed Korarima (Cardamom), Flaky Rift Sea Salt",
      origin: "Gojjam & Gondar Highlands, Ethiopia",
      dietary:
        "100% Organic, Vegan, Naturally Gluten-Free, Keto-Friendly, High Omega-3 & Prebiotic Fiber",
      pairing:
        "Savor standalone, dip into raw forest honey, or pair with a dark roast Djimmah or Limu coffee",
      flavor:
        "Intensely nutty, crisp, delicately savory with a warm citrus-cardamom undertone",
    },
  }),

  // 27. Crispy Smoked Shimbra (Ember-Roasted Highland Chickpeas)
  buildSnackProduct({
    id: "prod_smoked_shimbra",
    name: "Crispy Smoked Shimbra",
    slug: "smoked-shimbra",
    subtitle:
      "Ember-Roasted Highland Chickpeas with Volcanic Sea Salt & Wild Mountain Rosemary",
    description:
      "Harvested from nutrient-dense volcanic black cotton soils in the Shewa heartland. Whole heirloom chickpeas (Shimbra) are soaked, dried under highland sunshine, and roasted over slow-burning acacia embers until delightfully crunchy. Tossed while warm with volcanic smoked rift salt and wild mountain rosemary (Yetetsehur Tsid) gathered from alpine ravines.",
    baseCents: 1300,
    compareAtCents: 1700,
    imageUrl: "/images/snacks/smoked-shimbra.jpg",
    sku: "KBN-SNACK-SHIMBRA",
    weight: 0.3,
    tags: [
      "Smoked Shimbra",
      "Roasted Chickpeas",
      "High Protein",
      "Wild Rosemary",
      "Volcanic Salt",
    ],
    categories: [CAT_SNACKS, CAT_SNACKS_PULSES],
    specs: {
      ingredients:
        "Roasted Whole Highland Chickpeas (Shimbra), Smoked Black Volcanic Sea Salt, Wild Dried Mountain Rosemary, Touch of Cold-Pressed Nug Seed Oil",
      origin: "Shewa Volcanic Plains, Ethiopia",
      dietary:
        "100% Organic, Vegan, Naturally Gluten-Free, High Plant-Based Protein (19g/serving), High Fiber",
      pairing:
        "The ultimate savory finger snack for social Buna gatherings, road trips, and afternoon energy dips",
      flavor:
        "Crunchy, lightly smoky, savory, with aromatic herbal pine notes from wild mountain rosemary",
    },
  }),

  // 28. Itan Boswellia Highland Perfume Oil (Wild Frankincense & Myrrh Botanical Extract)
  buildBodyProduct({
    id: "prod_itan_perfume",
    name: "Itan Boswellia Highland Perfume Oil",
    slug: "itan-boswellia-perfume",
    subtitle:
      "High-Altitude Pure Botanical Perfume Oil with Wild Tigray Boswellia Papyrifera & Rare Myrrh",
    description:
      "Crafted from sacred Ethiopian resins harvested across the rugged highland cliffs of Tigray and Ogaden. Distilled in micro-batches with wild-foraged Boswellia papyrifera (sacred Frankincense / Itan) and sweet Ogaden Myrrh (Karam), steeped in cold-pressed golden jojoba and Ethiopian moringa oil. Opens with crystalline citrus-pine incensed resin, melting into warm balsamic amber, sacred smoke, and velvety highland woods. 100% pure botanical oil with zero synthetic aldehydes or chemical fixatives.",
    baseCents: 5400,
    compareAtCents: 6800,
    imageUrl: "/images/body/itan-perfume.jpg",
    sku: "KBN-BODY-ITAN",
    weight: 0.15,
    tags: [
      "Itan Frankincense",
      "Boswellia Papyrifera",
      "Wild Myrrh",
      "Botanical Perfume",
      "Sacred Resin",
      "Highland Fragrance",
    ],
    categories: [CAT_BODY, CAT_BODY_FRAGRANCE],
    specs: {
      ingredients:
        "100% Wild Ethiopian Boswellia Papyrifera (Frankincense) Resin Distillate, Commiphora Myrrha Resin, Cold-Pressed Moringa Stenopetala Seed Oil, Organic Simmondsia Chinensis Seed Oil",
      origin: "Tigray & Ogaden Highland Escarpments, Ethiopia",
      scent:
        "Crystalline incense resin, warm balsam, wild golden amber, sacred smoked cedar, delicate citrus-pine undertones",
      use: "Warm 2-3 drops between pulse points, wrists, and neck. Inhale deeply for grounding ancestral presence.",
      format:
        "50ml Heavy Amber Crystal Flacon with Ornate Brass Dropper Pipette",
    },
  }),

  // 29. Koseret & Enset Clarifying Body Wash (Wild Mountain Herbs & False Banana Hydration)
  buildBodyProduct({
    id: "prod_koseret_body_wash",
    name: "Koseret & Enset Clarifying Body Wash",
    slug: "koseret-enset-body-wash",
    subtitle:
      "Hydrating Botanical Cleanser with Wild Koseret Herbs & Highland False Banana (Enset) Mucilage",
    description:
      "An invigorating daily cleansing ritual inspired by the volcanic mountain streams of Gurage and Sidama. Infused with wild-harvested highland Koseret (Lippia abyssinica) known for its crisp herbal lemon-verbena aroma and antibacterial clarity, whipped with nutritive soothing mucilage extracted from indigenous Enset (false banana). Creates a velvety, ultra-gentle foaming lather that dissolves impurities without stripping the cutaneous barrier.",
    baseCents: 3400,
    compareAtCents: 4200,
    imageUrl: "/images/body/koseret-body-wash.jpg",
    sku: "KBN-BODY-WASH",
    weight: 0.35,
    tags: [
      "Koseret Cleanser",
      "Enset Hydration",
      "Wild Herbs",
      "Clarifying Body Wash",
      "Botanical Bath",
      "Sulfate Free",
    ],
    categories: [CAT_BODY, CAT_BODY_WASH],
    specs: {
      ingredients:
        "Highland Koseret (Lippia abyssinica) Hydrosol, Wild Saponin Endod Berry Extract, Raw Enset Leaf Mucilage, Vegetable Glycerin, Wild Mountain Rosemary Leaf Oil",
      origin: "Sidama & Gurage Highlands, Ethiopia",
      scent:
        "Crisp wild mountain lemon verbena, fresh rain on green volcanic soil, sweet crushed herbs",
      use: "Massage onto damp skin to create a rich botanical foam. Rinse thoroughly in warm water.",
      format: "250ml Frosted Apothecary Pump Bottle with Brass Finish",
    },
  }),

  // 30. Korarima & Black Cumin Warming Ointment (Ancestral Restorative Herbal Balm)
  buildBodyProduct({
    id: "prod_korarima_ointment",
    name: "Korarima & Black Cumin Warming Ointment",
    slug: "korarima-warming-ointment",
    subtitle:
      "Ancestral Restorative Herbal Balm with Ethiopian Korarima Cardamom & Cold-Pressed Tikur Azmud",
    description:
      "A deeply penetrating ancestral ointment formulation crafted for joint recovery, muscle tension, and dry weather resilience. Blends cold-pressed Tikur Azmud (black seed / Nigella sativa) oil with stone-crushed Korarima (Ethiopian false cardamom / Aframomum corrorima) seeds and wild beeswax. Creates a soothing radiant warmth that stimulates circulation and relieves fatigue across shoulders, legs, and dry joints.",
    baseCents: 3800,
    compareAtCents: 4800,
    imageUrl: "/images/body/korarima-ointment.jpg",
    sku: "KBN-BODY-OINT",
    weight: 0.2,
    tags: [
      "Korarima Balm",
      "Tikur Azmud",
      "Black Seed",
      "Warming Ointment",
      "Ancestral Salve",
      "Muscle Relief",
    ],
    categories: [CAT_BODY, CAT_BODY_OINTMENTS],
    specs: {
      ingredients:
        "Cold-Pressed Tikur Azmud (Black Seed Oil), Wild Aframomum Corrorima (Korarima) Seed Extract, Raw Ethiopian Highland Beeswax, Grass-Fed Tallow Infusion, Wild Ginger Rhizome Oil",
      origin: "Kaffa Cloud Forest & Gojjam Highlands, Ethiopia",
      scent:
        "Warming smoky black cardamom, spicy peppery resin, deep earthy herbal warmth",
      use: "Warm a dime-sized amount between palms and massage firmly into fatigued joints, muscles, or dry elbows.",
      format:
        "100ml Heavy Amber Glass Ointment Tub with Turned Bamboo Wooden Lid",
    },
  }),

  // 31. Tenadam & Citrus Blossom Botanical Mist (Purifying Highland Facial & Body Spritz)
  buildBodyProduct({
    id: "prod_tenadam_mist",
    name: "Tenadam & Citrus Blossom Botanical Mist",
    slug: "tenadam-botanical-mist",
    subtitle:
      "Clarifying Highland Aromatherapeutic Mist with Sacred Rue (Tenadam) & Wild Orange Blossoms",
    description:
      "The sacred uplifting aura of Ethiopian household gardens distilled into a luminous fine body mist. Features steam-distilled Tenadam (Ruta chalepensis / Rue), a revered highland herb celebrated for purifying energy, sharpening mental clarity, and warding off spiritual heaviness. Layered with wild Rift Valley citrus blossoms and highland spring water for an instantly revitalizing morning and midday spritz.",
    baseCents: 3600,
    compareAtCents: 4400,
    imageUrl: "/images/body/tenadam-mist.jpg",
    sku: "KBN-BODY-MIST",
    weight: 0.22,
    tags: [
      "Tenadam Mist",
      "Sacred Rue",
      "Highland Citrus",
      "Purifying Spritz",
      "Aromatherapeutic",
      "Floral Hydrosol",
    ],
    categories: [CAT_BODY, CAT_BODY_MISTS],
    specs: {
      ingredients:
        "100% Pure Steam-Distilled Tenadam (Ruta Chalepensis) Floral Water, Wild Orange Blossom Hydrosol, Highland Spring Water, Frankincense Resin Distillate",
      origin: "Shewa Highlands & Rift Valley Escarpment, Ethiopia",
      scent:
        "Bright uplifting herbal rue, delicate orange blossom floral, citrus peel freshness, dew drops",
      use: "Mist generously across face, neck, and body throughout the day for an aromatic uplifting reset.",
      format: "100ml Frosted Cylindrical Glass Atomizer with Matte Finish",
    },
  }),

  // 32. Rift Valley Volcanic Clay & Rosemary Body Polish (Exfoliating Mineral Scrub)
  buildBodyProduct({
    id: "prod_volcanic_clay_scrub",
    name: "Rift Valley Volcanic Clay & Rosemary Body Polish",
    slug: "volcanic-clay-body-polish",
    subtitle:
      "Exfoliating Mineral Body Scrub with Obsidian Mineral Earth, Teff Grains & Wild Alpine Rosemary",
    description:
      "Formulated with mineral-dense volcanic earth and basalt silt gathered from the mineral hot springs of the Great Rift Valley. Blended with micro-milled golden Teff flour and wild highland rosemary for gentle mechanical and enzymatic exfoliation. Sloughs away dead skin cells, stimulates lymph flow, and leaves skin touchably smooth, illuminated, and supple.",
    baseCents: 3200,
    compareAtCents: 4000,
    imageUrl: "/images/body/volcanic-clay-scrub.jpg",
    sku: "KBN-BODY-SCRUB",
    weight: 0.32,
    tags: [
      "Volcanic Polish",
      "Obsidian Clay",
      "Teff Scrub",
      "Wild Rosemary",
      "Mineral Body Polish",
      "Highland Spa",
    ],
    categories: [CAT_BODY, CAT_BODY_SCRUBS],
    specs: {
      ingredients:
        "Rift Valley Volcanic Obsidian Clay, Micro-Milled Golden Teff (Eragrostis tef) Flour, Wild Highland Rosemary Leaf Extract, Cold-Pressed Nug Seed Oil, Mineral Salt",
      origin: "Great Rift Valley & Entoto Highlands, Ethiopia",
      scent:
        "Earthy warm volcanic stone, crisp piney mountain rosemary, fresh highland rain",
      use: "Buff gently in circular motions over damp skin in the bath or shower 2-3 times per week. Rinse thoroughly.",
      format: "200ml Artisanal Terracotta Ceramic Jar with Wooden Lid",
    },
  }),

  // 33. Tigray White Boswellia Papyrifera Incense (Grade 1 Pure Highland Itan)
  buildBodyProduct({
    id: "prod_tigray_frankincense",
    name: "Tigray White Boswellia Papyrifera Incense",
    slug: "tigray-frankincense-itan",
    subtitle:
      "Grade 1 Translucent Frankincense Tears (Pure Highland Itan) from Ancient Tigray Escarpments",
    description:
      "Harvested from wild Boswellia papyrifera trees clinging to the high limestone cliffs of Tigray. Revered for millennia as the world's most aromatic sacred resin, these grade 1 translucent golden-white tears are dried naturally under highland sunshine. When placed on warm charcoal or an incense burner, they release an ethereal citrus-pine, honeyed balsamic smoke that purifies space and induces meditative tranquility.",
    baseCents: 2800,
    compareAtCents: 3400,
    imageUrl: "/images/body/tigray-frankincense.jpg",
    sku: "KBN-BODY-TIGRAY-ITAN",
    weight: 0.18,
    tags: [
      "Tigray Frankincense",
      "Boswellia Papyrifera",
      "White Itan",
      "Sacred Resin",
      "Natural Incense",
      "Highland Tears",
    ],
    categories: [CAT_BODY, CAT_BODY_INCENSE],
    specs: {
      ingredients:
        "100% Pure Wild-Harvested Ethiopian Boswellia Papyrifera Resin Tears (Grade 1)",
      origin: "Tigray Highland Escarpments, Northern Ethiopia",
      scent:
        "Crystalline citrus, sacred temple pine, sweet balsamic warmth, clean purifying smoke",
      use: "Place 1-2 small crystal tears upon hot natural charcoal in a Girgira burner or electric resin diffuser.",
      format:
        "150g Artisanal Resealable Kraft Pouch with Traditional Habesha Foil Stamp",
    },
  }),

  // 34. Ogaden Wild Commiphora Myrrha Resin (Sacred Karam Tears)
  buildBodyProduct({
    id: "prod_ogaden_myrrh",
    name: "Ogaden Wild Commiphora Myrrha Resin",
    slug: "ogaden-sacred-myrrh",
    subtitle:
      "Sacred Karam Aromatic Resin Tears Harvested from Wild Acacia-Commiphora Woodlands",
    description:
      "Gathered by traditional harvesters from wild thorny Commiphora myrrha trees in the arid eastern plateaus of Ogaden. Characterized by glistening deep mahogany and ruby-amber crystal droplets rich in natural essential oils. Releases a deeply grounding, woody, warm-spicy smoke treasured for cleansing rituals, spiritual centering, and sacred gatherings.",
    baseCents: 3200,
    compareAtCents: 4000,
    imageUrl: "/images/body/ogaden-myrrh.jpg",
    sku: "KBN-BODY-OGADEN-MYRRH",
    weight: 0.16,
    tags: [
      "Ogaden Myrrh",
      "Commiphora Myrrha",
      "Karam",
      "Sacred Resin",
      "Ancient Aromatics",
      "Grounding Incense",
    ],
    categories: [CAT_BODY, CAT_BODY_INCENSE],
    specs: {
      ingredients:
        "100% Wild-Foraged Ethiopian Commiphora Myrrha (Karam) Resin Tears",
      origin: "Ogaden Arid Escarpments, Eastern Ethiopia",
      scent:
        "Deep earthy resin, smoky mahogany, warm bitter-spicy balsamic undertones",
      use: "Burn alone on glowing charcoal or blend with Boswellia frankincense for a balanced sacred aroma.",
      format: "120g Heavy Amber Glass Apothecary Jar with Airtight Seal",
    },
  }),

  // 35. Borena Black Frankincense (Tikur Itan / Boswellia Neglecta)
  buildBodyProduct({
    id: "prod_borena_black_incense",
    name: "Borena Black Frankincense (Tikur Itan)",
    slug: "borena-black-frankincense",
    subtitle:
      "Rare Dark Boswellia Neglecta Resin Tears Foraged by Pastoralists in Southern Bushlands",
    description:
      "An exceptionally rare and mystical variety of Ethiopian incense gathered in the acacia scrublands of southern Borena. Unlike highland white itan, Boswellia neglecta exudes dark charcoal-colored glossy tears with earthy, herbaceous undertones. Delivers an intensely rich, calming, forest-like aromatic smoke long utilized in ancestral pastoral purification rites.",
    baseCents: 2600,
    compareAtCents: 3200,
    imageUrl: "/images/body/borena-black-incense.jpg",
    sku: "KBN-BODY-BORENA-BLACK",
    weight: 0.16,
    tags: [
      "Borena Black Incense",
      "Tikur Itan",
      "Boswellia Neglecta",
      "Dark Frankincense",
      "Ancestral Incense",
      "Pastoral Aromatics",
    ],
    categories: [CAT_BODY, CAT_BODY_INCENSE],
    specs: {
      ingredients:
        "100% Pure Wild Ethiopian Boswellia Neglecta (Tikur Itan) Dark Resin Tears",
      origin: "Borena Semi-Arid Woodlands, Southern Ethiopia",
      scent:
        "Herbaceous pine, dark earthy musk, roasted forest wood, meditative balsam",
      use: "Gently place on glowing charcoal embers for evening grounding and reflective relaxation.",
      format: "120g Hand-Stamped Sustainable Kraft Paper Pouch",
    },
  }),

  // 36. Sacred Buna Ceremony Itan Blend (Girgira Aromatics)
  buildBodyProduct({
    id: "prod_ceremony_itan_blend",
    name: "Sacred Buna Ceremony Itan Blend",
    slug: "buna-ceremony-itan-blend",
    subtitle:
      "Master Artisanal Resin Blend of Tigray Frankincense, Ogaden Myrrh & Highland Aromatics",
    description:
      "The quintessential aromatic fragrance of the sacred Ethiopian Buna Tetu (coffee ceremony). Hand-blended by highland elders using golden Tigray Frankincense tears, dark Ogaden Myrrh, sweet fragrant Hagar opoponax, and freshly stone-crushed Korarima cardamom pods. Fills the home with an inviting, hospitable aura that honors gathered guests during the preparation and pouring of the coffee.",
    baseCents: 2400,
    compareAtCents: 3000,
    imageUrl: "/images/body/ceremony-itan-blend.jpg",
    sku: "KBN-BODY-CEREMONY-ITAN",
    weight: 0.18,
    tags: [
      "Ceremony Itan Blend",
      "Girgira Aromatics",
      "Buna Incense",
      "Sacred Blend",
      "Frankincense & Myrrh",
      "Habesha Hospitality",
    ],
    categories: [CAT_BODY, CAT_BODY_INCENSE, CAT_CEREMONY],
    specs: {
      ingredients:
        "Wild Tigray Boswellia Papyrifera Tears, Ogaden Commiphora Myrrha, Sweet Hagar Opoponax, Stone-Crushed Ethiopian Korarima Pods, Mountain Rosemary",
      origin: "Artisanal Highland Guilds, Ethiopia",
      scent:
        "Warm ceremonial frankincense, sweet myrrh, spicy cardamom, uplifting wild mountain herbs",
      use: "Sprinkle a pinch onto the hot charcoal of the terracotta Girgira right before brewing each round of Buna.",
      format: "150g Embroidered Habesha Linen Bag with Inner Protective Pouch",
    },
  }),

  // 37. Gondar Hand-Painted Parchment Icon Art
  buildGiftProduct({
    id: "prod_gondar_parchment",
    name: "Gondar Hand-Painted Parchment Icon Art",
    slug: "gondar-parchment-art",
    subtitle:
      "Handmade Sacred Icon Painting on Cured Goat Vellum Framed in Weathered Ethiopian Olivewood",
    description:
      "A sacred piece of ancient Ethiopian spiritual art created by generational icon scribes in the historic imperial city of Gondar. Painted on traditional sun-cured goat skin parchment (Biranna) using hand-ground mineral pigments—lapis lazuli blue, warm cinnabar red, and volcanic iron ochre. Features large, expressive almond-eyed celestial figures and archaic Ge'ez blessings. Mounted in a rustic handcrafted frame fashioned from native Ethiopian olivewood (Woyra).",
    baseCents: 6500,
    compareAtCents: 8000,
    imageUrl: "/images/gifts/gondar-parchment-art.jpg",
    sku: "KBN-GIFT-GONDAR-ART",
    weight: 0.85,
    tags: [
      "Gondar Art",
      "Parchment Art",
      "Biranna Vellum",
      "Ethiopian Icon",
      "Olivewood Frame",
      "Spiritual Keepsake",
    ],
    specs: {
      artisanOrigin: "Gondar Artisan & Icon Guilds, Northern Ethiopia",
      materials:
        "Hand-cured Goat Vellum Parchment, Natural Earth & Mineral Pigments, Hand-Carved Woyra Olivewood Frame",
      dimensionsOrSize: "32cm × 24cm × 2.5cm Framed Artwork",
      craftsmanship:
        "100% hand-painted by master scribes following 17th-century Solomonic manuscript traditions",
      careOrUse:
        "Display indoors away from direct high humidity or intense direct sunlight; dust with a dry soft cloth.",
    },
  }),

  // 38. Lalibela Lost-Wax Cast Handheld Brass Cross
  buildGiftProduct({
    id: "prod_lalibela_cross",
    name: "Lalibela Lost-Wax Cast Handheld Brass Cross",
    slug: "lalibela-processional-cross",
    subtitle:
      "Traditional Hand-Forged Handheld Meskel Blessing Cross in Antiqued Golden Brass",
    description:
      "An authentic handheld blessing cross (Meskel) individually created by highland metalsmiths in the rock-hewn sanctuary town of Lalibela. Cast using the time-honored lost-wax method, each cross features openwork interlaced knotwork symbolizing eternity and divine protection, finished with a smooth flared handle. Warm golden brass with an antique hand-burnished patina, presented in an artisanal linen gift pouch.",
    baseCents: 4800,
    compareAtCents: 6000,
    imageUrl: "/images/gifts/lalibela-processional-cross.jpg",
    sku: "KBN-GIFT-LALIBELA-CROSS",
    weight: 0.38,
    tags: [
      "Lalibela Cross",
      "Meskel",
      "Handheld Blessing Cross",
      "Lost-Wax Brass",
      "Antiqued Brass",
      "Sacred Heritage",
    ],
    specs: {
      artisanOrigin: "Lalibela Sanctuary Metalsmiths, Wollo, Ethiopia",
      materials:
        "100% Solid Cast Golden Brass with Hand-Burnished Antiqued Patina",
      dimensionsOrSize: "21cm Height × 9.5cm Width × 1.2cm Thickness",
      craftsmanship:
        "Individually hand-molded and lost-wax cast; no two crosses are exactly identical",
      careOrUse:
        "Wipe clean with a soft dry cloth; brass develops a deeper warm heirloom patina over time.",
    },
  }),

  // 39. Axum Hand-Hammered Silver Filigree Cuff
  buildGiftProduct({
    id: "prod_axum_cuff",
    name: "Axum Hand-Hammered Silver Filigree Cuff",
    slug: "axum-silver-filigree-cuff",
    subtitle:
      "Master Handcrafted Sterling Silver Wire Filigree & Granulation Open Cuff Bracelet",
    description:
      "Exquisite Ethiopian royal wrist adornment handcrafted by master silversmiths in Axum, home of ancient metallurgy. Features microscopic twisted sterling silver wires woven into delicate concentric rosettes and concentric spiral filigree, bordered with hand-beaded granulation. Gently adjustable to fit all wrists comfortably while imparting timeless regal elegance.",
    baseCents: 7800,
    compareAtCents: 9500,
    imageUrl: "/images/gifts/axum-silver-filigree-cuff.jpg",
    sku: "KBN-GIFT-AXUM-CUFF",
    weight: 0.08,
    tags: [
      "Axum Silver",
      "Filigree Cuff",
      "Ethiopian Silver",
      "Royal Adornment",
      "Handcrafted Bracelet",
      "Heirloom Jewelry",
    ],
    specs: {
      artisanOrigin: "Axumite Silversmith Guilds, Tigray, Ethiopia",
      materials:
        "925 Fine Sterling Coin Silver, Twisted Filigree Wire, Granulated Silver Beads",
      dimensionsOrSize:
        "6.5cm Inner Diameter (Adjustable Open Cuff), 3.2cm Band Width",
      craftsmanship:
        "Over 18 hours of meticulous hand-assembly using ancient Habesha wire-drawing tools",
      careOrUse:
        "Store in the included anti-tarnish cotton pouch; polish gently with a silver jewelry cloth.",
    },
  }),

  // 40. Lalibela Solomonic Cross Signet Ring
  buildGiftProduct({
    id: "prod_lalibela_ring",
    name: "Lalibela Solomonic Cross Signet Ring",
    slug: "lalibela-cross-signet-ring",
    subtitle:
      "Hand-Cast Golden Brass & Coin Silver Solomonic Cross Statement Signet Ring",
    description:
      "A bold, unisex statement signet ring bearing the deeply etched Solomonic cross of the Ethiopian highlands. Individually hand-cast by artisan jewelers combining radiant golden highland brass with coin silver inlays. Substantial in hand yet contoured for everyday comfort, evoking the enduring strength and architectural mystery of Lalibela.",
    baseCents: 3800,
    compareAtCents: 4800,
    imageUrl: "/images/gifts/lalibela-cross-signet-ring.jpg",
    sku: "KBN-GIFT-LALIBELA-RING",
    weight: 0.03,
    tags: [
      "Signet Ring",
      "Solomonic Cross",
      "Lalibela Ring",
      "Brass & Silver",
      "Unisex Statement Ring",
      "Highland Jewelry",
    ],
    specs: {
      artisanOrigin: "Addis Ababa & Lalibela Metalsmith Collectives, Ethiopia",
      materials:
        "Solid Highland Golden Brass with Recycled Ethiopian Coin Silver Inlay",
      dimensionsOrSize:
        "Standard US Size 8 (Gently Sizable open-split back), 16mm × 14mm Oval Signet Face",
      craftsmanship:
        "Individually hand-chiseled and flame-forged with authentic raw texture",
      careOrUse:
        "Buff with a soft cloth; avoid prolonged exposure to harsh detergents or chlorine.",
    },
  }),

  // 41. Habesha Silver Shuruba Hair Jewelry Set
  buildGiftProduct({
    id: "prod_habesha_hair_jewelry",
    name: "Habesha Silver Shuruba Hair Jewelry Set",
    slug: "habesha-hair-jewelry-set",
    subtitle:
      "Handcrafted Silver Filigree Braid Cuffs, Spiral Beads & Cross Bell Charms (Set of 12)",
    description:
      "Traditional hair adornment honoring the celebrated Ethiopian Shuruba braiding art. This 12-piece heirloom gift set includes hand-carved silver filigree cuffs that slide seamlessly onto braids, twisted coil beads for dreadlocks and twists, and delicate jingling bell charms engraved with protective crosses. Adds radiant cultural splendor to braids, locs, crowns, and protective styles.",
    baseCents: 3200,
    compareAtCents: 4200,
    imageUrl: "/images/gifts/habesha-hair-jewelry-set.jpg",
    sku: "KBN-GIFT-SHURUBA-JEWELRY",
    weight: 0.06,
    tags: [
      "Hair Jewelry",
      "Shuruba Accessories",
      "Habesha Hair Adornment",
      "Braid Cuffs",
      "Silver Hair Beads",
      "Ethiopian Beauty",
    ],
    specs: {
      artisanOrigin: "Gondar & Addis Ababa Filigree Workshops, Ethiopia",
      materials:
        "Fine Ethiopian Silver-Plated Brass Alloy, Beaded Filigree Wire",
      dimensionsOrSize:
        "Set of 12 Pieces (4 Cuffs 10mm, 4 Spiral Beads 15mm, 4 Cross Bell Charms 20mm)",
      craftsmanship:
        "Flexible lightweight design crafted to bend gently without snagging delicate hair fibers",
      careOrUse:
        "Gently open and squeeze onto braids or twists; wipe clean after styling with oils.",
    },
  }),

  // 42. Harari Trade Amber & Coral Bangle
  buildGiftProduct({
    id: "prod_harari_bangle",
    name: "Harari Trade Amber & Coral Bangle",
    slug: "harari-amber-coral-bangle",
    subtitle:
      "Walled-City Harar Copal Amber, Mediterranean Coral & Vintage Brass Bead Bracelet",
    description:
      "Rooted in the historic walled city of Harar—famed crossroad of ancient Red Sea trade caravans. Hand-strung with warm honey-golden copal amber beads, deep red coral rondelles, and antique lost-wax cast Ethiopian brass spacer beads. Elasticized and resilient, this vibrant bracelet brings rich warmth, cultural color, and joyous energy to any outfit.",
    baseCents: 4400,
    compareAtCents: 5500,
    imageUrl: "/images/gifts/harari-amber-coral-bangle.jpg",
    sku: "KBN-GIFT-HARARI-BANGLE",
    weight: 0.05,
    tags: [
      "Harari Jewelry",
      "Amber Bangle",
      "Coral Beads",
      "Trade Beads",
      "Red Sea Trade",
      "Bohemian Bracelet",
    ],
    specs: {
      artisanOrigin: "Harar Jugol Walled City Crafts Guild, Eastern Ethiopia",
      materials:
        "Natural Copal Amber Resin, Dyed Mediterranean Bamboo Coral, Vintage Ethiopian Brass Rondelles",
      dimensionsOrSize:
        "18cm Stretch Circumference (Fits wrists 15cm–20cm comfortably)",
      craftsmanship:
        "Hand-knotted on high-tensile triple-ply silicone elastic cord",
      careOrUse:
        "Roll gently over hand onto wrist; keep dry and away from heavy direct alcohol perfumes.",
    },
  }),

  // 43. Shemma Handwoven Cotton Bath Towel
  buildGiftProduct({
    id: "prod_shemma_towel",
    name: "Shemma Handwoven Cotton Bath Towel",
    slug: "shemma-cotton-towel",
    subtitle:
      "100% Organic Highland Cotton Hand-Spun Waffle Weave Towel with Hand-Twisted Fringe",
    description:
      "Handcrafted by generational Shemma weavers on wooden pit looms in the Ethiopian highlands. Spun entirely from 100% raw, unbleached, chemical-free organic cotton. Its breathable textured waffle weave absorbs moisture instantly while drying in half the time of conventional terry towels. Finished with artisanal hand-twisted fringe tassels.",
    baseCents: 3600,
    compareAtCents: 4600,
    imageUrl: "/images/gifts/shemma-cotton-towel.jpg",
    sku: "KBN-GIFT-SHEMMA-TOWEL",
    weight: 0.42,
    tags: [
      "Shemma Towel",
      "Ethiopian Cotton",
      "Handwoven Linen",
      "Waffle Towel",
      "Fringe Tassels",
      "Highland Spa Linen",
    ],
    specs: {
      artisanOrigin:
        "Chencha & Dorze Weaving Villages, Southern Highlands, Ethiopia",
      materials:
        "100% Raw Unbleached Ethiopian Highland Cotton (Organic, Non-GMO)",
      dimensionsOrSize: "160cm × 85cm Generous Bath Sheet Size",
      craftsmanship:
        "Spun by hand on traditional drop spindles and loomed on wooden pedal foot-looms",
      careOrUse:
        "Machine wash cool on gentle cycle; line dry or tumble dry low. Becomes softer with each wash.",
    },
  }),

  // 44. Artisanal Tibeb Embroidered Handkerchief Set
  buildGiftProduct({
    id: "prod_tibeb_handkerchief",
    name: "Artisanal Tibeb Embroidered Handkerchief Set",
    slug: "tibeb-handkerchief-set",
    subtitle:
      "Trio of Fine Hand-Spun Cotton Pocket Squares with Colorful Geometric Tibeb Borders",
    description:
      "A set of three heirloom pocket handkerchiefs woven from featherweight Ethiopian highland cotton. Each handkerchief features a unique, dazzling geometric Tibeb jacquard border in vibrant tones of burgundy, imperial gold, and emerald green—the ceremonial textile art traditionally reserved for Ethiopian royalty and festive holidays. Packaged in a hand-tied kraft box.",
    baseCents: 2400,
    compareAtCents: 3200,
    imageUrl: "/images/gifts/tibeb-handkerchief-set.jpg",
    sku: "KBN-GIFT-TIBEB-HANKIE",
    weight: 0.12,
    tags: [
      "Tibeb Handkerchief",
      "Pocket Square",
      "Embroidered Linen",
      "Habesha Textile",
      "Gift Set",
      "Heirloom Cotton",
    ],
    specs: {
      artisanOrigin: "Shiro Meda Master Weavers Guild, Addis Ababa, Ethiopia",
      materials:
        "100% Fine Hand-Spun Cotton with Colorfast Mercerized Embroidery Thread",
      dimensionsOrSize: "Set of 3 (Each 32cm × 32cm Square)",
      craftsmanship:
        "Hand-guided jacquard borders woven directly on traditional shuttle looms",
      careOrUse:
        "Gentle hand wash or delicate machine wash; press with warm iron while slightly damp.",
    },
  }),

  // 45. Four-Layer Ethiopian Gabi Cloud Cotton Throw
  buildGiftProduct({
    id: "prod_ethiopian_gabi",
    name: "Four-Layer Ethiopian Gabi Cloud Cotton Throw",
    slug: "ethiopian-gabi-throw",
    subtitle:
      "Heirloom Quadruple-Weave Gauze Highland Cotton Blanket with Royal Tibeb Borders",
    description:
      "The legendary Ethiopian Gabi—renowned as the softest, most breathable natural blanket in the world. Constructed from four gossamer-thin layers of hand-spun Ethiopian cotton that trap insulating warmth in chilly mountain evenings while allowing supreme airflow on warm days. Embellished on both ends with a magnificent 12cm ceremonial Tibeb woven border in radiant gold and crimson.",
    baseCents: 8400,
    compareAtCents: 11000,
    imageUrl: "/images/gifts/ethiopian-gabi-throw.jpg",
    sku: "KBN-GIFT-GABI-THROW",
    weight: 0.95,
    tags: [
      "Ethiopian Gabi",
      "Cloud Cotton Throw",
      "Four Layer Blanket",
      "Tibeb Border",
      "Highland Bedding",
      "Luxury Handwoven Gift",
    ],
    specs: {
      artisanOrigin: "Gonder & Dorze Artisan Cooperatives, Ethiopia",
      materials:
        "100% Pure Highland Organic Raw Cotton (Quadruple Gauze Weave), Silk-Cotton Blend Tibeb Yarn",
      dimensionsOrSize: "220cm × 130cm All-Season Throw Size",
      craftsmanship:
        "Hand-carded, hand-spun, and loomed over 3 weeks by master weaver collectives",
      careOrUse:
        "Machine wash cold delicate in a wash bag; line dry in shade. Air fluff for maximum cloud softness.",
    },
  }),

  // 46. Wanza Carved Handheld Vanity Mirror
  buildGiftProduct({
    id: "prod_wanza_mirror",
    name: "Wanza Carved Handheld Vanity Mirror",
    slug: "wanza-vanity-mirror",
    subtitle:
      "Hand-Turned Dark Wanza Hardwood Vanity Mirror with Engraved Habesha Cross Medallion",
    description:
      "A striking artisanal beauty essential hand-turned from Ethiopian Wanza (Cordia africana)—the celebrated dark indigenous hardwood cherished for its swirling grain and lustrous natural oils. The reverse face features a masterfully hand-chiseled Habesha geometric cross medallion. Fitted with high-clarity optical glass mirror and a balanced ergonomic handle.",
    baseCents: 4200,
    compareAtCents: 5200,
    imageUrl: "/images/gifts/wanza-vanity-mirror.jpg",
    sku: "KBN-GIFT-WANZA-MIRROR",
    weight: 0.35,
    tags: [
      "Vanity Mirror",
      "Wanza Wood",
      "Handheld Mirror",
      "Cordia Africana",
      "Hand-Carved Mirror",
      "Beauty Accessory",
    ],
    specs: {
      artisanOrigin: "Entoto Mountain Woodcarvers Guild, Shewa, Ethiopia",
      materials:
        "Sustainably Foraged Ethiopian Wanza (Cordia africana) Hardwood, High-Clarity Optical Glass Mirror",
      dimensionsOrSize:
        "26cm Length × 13.5cm Mirror Diameter × 2cm Handle Thickness",
      craftsmanship:
        "Turned on artisanal foot-lathes and hand-polished with organic beeswax and koseret oil",
      careOrUse:
        "Clean glass with microfiber cloth; nourish the hardwood handle once a year with a drop of hair or olive oil.",
    },
  }),

  // 47. Antique Ethiopian Brass Kohl & Scent Flask
  buildGiftProduct({
    id: "prod_brass_kohl",
    name: "Antique Ethiopian Brass Kohl & Scent Flask",
    slug: "brass-kohl-flask",
    subtitle:
      "Hand-Chiseled Brass Cosmetic Mekula Flask with Dip Wand & Pocket Suspension Chain",
    description:
      "An authentic traditional Ethiopian cosmetic vessel (Mekula) used for generations across highland and Harari households. Hand-hammered from solid brass with intricate hand-chiseled floral and sunburst etchings. The threaded finial unscrews to reveal a slender brass applicator wand designed for traditional botanical kohl eyeliner or precious concentrated perfume oils.",
    baseCents: 2800,
    compareAtCents: 3600,
    imageUrl: "/images/gifts/brass-kohl-flask.jpg",
    sku: "KBN-GIFT-BRASS-KOHL",
    weight: 0.12,
    tags: [
      "Kohl Flask",
      "Mekula",
      "Antique Brass Flask",
      "Beauty Keepsake",
      "Perfume Flacon",
      "Habesha Cosmetic Ware",
    ],
    specs: {
      artisanOrigin: "Historic Harar Jugol & Wollo Coppersmiths, Ethiopia",
      materials:
        "100% Solid Brass with Hand-Etched Engravings, Integrated Brass Applicator Wand, Brass Hanging Chain",
      dimensionsOrSize: "8.5cm Flask Height × 3.5cm Width × 10cm Chain Drop",
      craftsmanship:
        "Crafted using ancient cold-chisel repoussé metal techniques",
      careOrUse:
        "Fill with mineral kohl powder or botanical perfume oil; tighten screw wand after each application.",
    },
  }),

  // 48. Harari Handwoven Mesob Trinket Box
  buildGiftProduct({
    id: "prod_harari_trinket_box",
    name: "Harari Handwoven Mesob Trinket Box",
    slug: "harari-woven-trinket-box",
    subtitle:
      "Miniature Conical Sweetgrass Keepsake Basket Box with Geometric Natural Dyed Reed Motif",
    description:
      "A miniature authentic Mesob jewelry and keepsake box handwoven by Harari women artisans. Made from sun-dried highland sweetgrass and natural dyed wild palm reeds in radiant motifs of cobalt, saffron, and magenta. The tightly fitted conical lid protects rings, earrings, hair charms, or sacred frankincense tears while serving as a vibrant cultural centerpiece.",
    baseCents: 2600,
    compareAtCents: 3400,
    imageUrl: "/images/gifts/harari-woven-trinket-box.jpg",
    sku: "KBN-GIFT-HARARI-MESOB",
    weight: 0.14,
    tags: [
      "Mesob Trinket Box",
      "Harari Basketry",
      "Sweetgrass Box",
      "Jewelry Keepsake",
      "Miniature Mesob",
      "Handwoven Craft",
    ],
    specs: {
      artisanOrigin: "Harari Women Weavers Guild, Harar, Eastern Ethiopia",
      materials:
        "Wild Highland Sweetgrass, Natural Sun-Dried Palm Leaf Reeds, Plant-Based Mineral Dyes",
      dimensionsOrSize:
        "12cm Total Height (with Conical Lid) × 11cm Base Diameter",
      craftsmanship:
        "Coiled sweetgrass technique requiring over 10 days of precision needle-weaving",
      careOrUse:
        "Keep in a dry environment; dust lightly with a dry soft brush. Ideal for storing jewelry and keepsakes.",
    },
  }),

  // 49. Apple iPhone 16 Pro Max
  buildOfficeProduct({
    id: "prod_office_iphone_16_pro_max",
    name: "Apple iPhone 16 Pro Max",
    slug: "iphone-16-pro-max",
    subtitle:
      "Grade 5 Titanium Chassis, A18 Pro Bionic, Super Retina XDR OLED & Pro Camera Array",
    description:
      "The ultimate executive flagship smartphone engineered for high-mobility corporate leadership and creative production. Built with an aerospace-grade Grade 5 titanium enclosure, edge-to-edge 6.9-inch Super Retina XDR display with ProMotion 120Hz, and the groundbreaking A18 Pro silicon. Features 4K 120fps Dolby Vision video capture, USB-C 10Gbps transfer speeds, and all-day executive battery endurance.",
    baseCents: 119900,
    compareAtCents: 129900,
    imageUrl: "/images/office/iphone-16-pro-max.jpg",
    sku: "KBN-OFF-IPHONE-16-PROMAX",
    weight: 0.227,
    tags: [
      "iPhone",
      "iPhone 16 Pro Max",
      "Apple Silicon",
      "Executive Tech",
      "Titanium Smartphone",
      "Mobile Workstation",
    ],
    categories: [CAT_OFFICE, CAT_OFFICE_DEVICES],
    specs: {
      itemType: "Flagship Executive Smartphone",
      specifications:
        "Apple A18 Pro 6-Core CPU with 6-Core GPU and 16-Core Neural Engine • 256GB NVMe",
      materials:
        "Aerospace-Grade Grade 5 Titanium Band, Textured Matte Glass Back, Ceramic Shield Front",
      dimensions:
        "6.9-inch Super Retina XDR Display • 163mm × 77.6mm × 8.25mm • 227g",
      origin: "Apple Enterprise Corporate Supply Channel",
      warrantyOrCare:
        "1-Year Official International Apple Limited Warranty and 90-day technical support.",
    },
  }),

  // 50. Apple iPhone 16 Pro
  buildOfficeProduct({
    id: "prod_office_iphone_16_pro",
    name: "Apple iPhone 16 Pro",
    slug: "iphone-16-pro",
    subtitle:
      "6.3-inch Super Retina XDR OLED, Titanium Enclosure, A18 Pro Chip & Camera Control",
    description:
      "A precision executive powerhouse in an ergonomic palm-fitting footprint. Encased in featherweight natural titanium with ultra-thin display borders, powered by the A18 Pro chip for instantaneous multitasking, encrypted on-device communications, and studio-grade audio recording.",
    baseCents: 99900,
    compareAtCents: 109900,
    imageUrl: "/images/office/iphone-16-pro.jpg",
    sku: "KBN-OFF-IPHONE-16-PRO",
    weight: 0.199,
    tags: [
      "iPhone",
      "iPhone 16 Pro",
      "Apple Device",
      "Pro Smartphone",
      "Executive Mobile",
    ],
    categories: [CAT_OFFICE, CAT_OFFICE_DEVICES],
    specs: {
      itemType: "Compact Pro Smartphone",
      specifications:
        "A18 Pro Silicon, 128GB High-Speed Storage, 48MP Fusion Triple Camera with 5x Telephoto",
      materials: "Grade 5 Titanium Frame with Micro-Blasted Matte Texture",
      dimensions:
        "6.3-inch Super Retina XDR Display • 149.6mm × 71.5mm × 8.25mm • 199g",
      origin: "Apple Enterprise Corporate Supply Channel",
      warrantyOrCare: "1-Year Official International Apple Limited Warranty.",
    },
  }),

  // 51. Apple MacBook Pro 16" M-Series
  buildOfficeProduct({
    id: "prod_office_macbook_pro_m_series",
    name: 'Apple MacBook Pro 16" M-Series Workstation',
    slug: "macbook-pro-m-series",
    subtitle:
      "Space Black M-Series Max Silicon, 36GB Unified Memory, Liquid Retina XDR & 1TB SSD",
    description:
      "The definitive laptop workstation for developers, designers, and business leaders. Engineered with high-bandwidth M-series Max architecture, offering unthrottled performance whether plugged in or operating on battery. Features an expansive 16.2-inch Liquid Retina XDR display with 1,600 nits peak HDR brightness, 22-hour battery life, studio-quality 6-speaker spatial audio system, and full connectivity ports.",
    baseCents: 249900,
    compareAtCents: 269900,
    imageUrl: "/images/office/macbook-pro-m-series.jpg",
    sku: "KBN-OFF-MACBOOK-PRO-16",
    weight: 2.16,
    tags: [
      "MacBook Pro",
      "M Series",
      "Apple Laptop",
      "Executive Workstation",
      "M3 Max",
      "Space Black",
    ],
    categories: [CAT_OFFICE, CAT_OFFICE_DEVICES],
    specs: {
      itemType: "Pro Studio Laptop Workstation",
      specifications:
        "Apple M-Series Max (14-Core CPU, 30-Core GPU, 16-Core Neural Engine) • 36GB Unified Memory • 1TB SSD",
      materials:
        "100% Recycled Space Black Anodized Aluminum with Anodization Seal",
      dimensions:
        "16.2-inch Liquid Retina XDR (3456 × 2234 at 120Hz) • 35.57cm × 24.81cm × 1.68cm • 2.16kg",
      origin: "Apple Enterprise Workstation Channel",
      warrantyOrCare:
        "1-Year Official International AppleCare Hardware Warranty.",
    },
  }),

  // 52. Apple MacBook Air 15" M-Series
  buildOfficeProduct({
    id: "prod_office_macbook_air_m_series",
    name: 'Apple MacBook Air 15" M-Series Ultra-Thin',
    slug: "macbook-air-m-series",
    subtitle:
      'Midnight Blue Aluminum, Fanless Silent M-Series Silicon, 15.3" Liquid Retina & 18hr Battery',
    description:
      "Impossibly thin, completely fanless, and whisper quiet. The 15-inch MacBook Air combines expansive screen real estate with effortless portability. Driven by energy-efficient Apple M-series silicon for lightning-quick productivity, video calls, spreadsheets, and creative presentations on an 18-hour single charge.",
    baseCents: 129900,
    compareAtCents: 139900,
    imageUrl: "/images/office/macbook-air-m-series.jpg",
    sku: "KBN-OFF-MACBOOK-AIR-15",
    weight: 1.51,
    tags: [
      "MacBook Air",
      "M Series",
      "Apple Laptop",
      "Ultra-Thin Notebook",
      "Fanless Laptop",
      "Midnight Blue",
    ],
    categories: [CAT_OFFICE, CAT_OFFICE_DEVICES],
    specs: {
      itemType: "Ultra-Portable Executive Laptop",
      specifications:
        "Apple M-Series 8-Core CPU & 10-Core GPU • 16GB Unified RAM • 512GB SSD",
      materials: "Durable Anodized Midnight Aluminum Uni-Body Construction",
      dimensions:
        "15.3-inch Liquid Retina Display (2880 × 1864) • 34.04cm × 23.76cm × 1.15cm • 1.51kg",
      origin: "Apple Enterprise Workstation Channel",
      warrantyOrCare:
        "1-Year Official International AppleCare Manufacturer Warranty.",
    },
  }),

  // 53. Highland Full-Grain Leather Executive Notebook
  buildOfficeProduct({
    id: "prod_office_leather_notebook",
    name: "Highland Full-Grain Leather Executive Notebook",
    slug: "highland-leather-notebook",
    subtitle:
      "Refillable Vegetable-Tanned Ethiopian Leather Journal with 240 Ivory Bleedproof Pages",
    description:
      "An heirloom executive notebook handcrafted by generational leather artisans in Addis Ababa. Fashioned from supple, rich chestnut-tan Ethiopian highland cowhide tanned using traditional plant extracts and beeswax. Contains 240 fountain-pen friendly, bleedproof 100gsm ivory pages with lay-flat binding, an interior document pocket, and an elasticized closure strap.",
    baseCents: 4800,
    compareAtCents: 5800,
    imageUrl: "/images/office/highland-leather-notebook.jpg",
    sku: "KBN-OFF-LEATHER-NOTEBOOK",
    weight: 0.42,
    tags: [
      "Leather Notebook",
      "Executive Journal",
      "Ethiopian Leather",
      "Refillable Notebook",
      "Fountain Pen Friendly",
      "Stationery",
    ],
    categories: [CAT_OFFICE, CAT_OFFICE_STATIONERY],
    specs: {
      itemType: "Refillable Leather Executive Notebook",
      specifications:
        "240 Lined Pages of 100gsm Acid-Free Ivory Paper • Lay-Flat 180° Binding",
      materials:
        "100% Ethiopian Full-Grain Vegetable-Tanned Cowhide, Silk Ribbon, Brass Rivets",
      dimensions:
        "A5 Executive Size (22cm × 15.5cm × 2.5cm) • Fits Standard A5 Refills",
      origin: "Artisan Leather Craftsmen Guild, Addis Ababa, Ethiopia",
      warrantyOrCare:
        "Nourish leather once annually with natural beeswax or leather balm.",
    },
  }),

  // 54. Embroidered Tibeb Hardcover Archival Notebook
  buildOfficeProduct({
    id: "prod_office_tibeb_hardcover_notebook",
    name: "Embroidered Tibeb Hardcover Archival Notebook",
    slug: "tibeb-hardcover-notebook",
    subtitle:
      "Handwoven Natural Cotton Cover with Jewel-Tone Geometric Tibeb Border & Dot-Grid Pages",
    description:
      "A harmonious blend of cultural Ethiopian textile heritage and modern executive organization. Bound in pure unbleached hand-spun Habesha cotton fabric accented with a vibrant royal burgundy and gold geometric Tibeb woven border. Features 192 archival dot-grid pages ideal for sketching, project blueprints, bullet journaling, and meeting minutes.",
    baseCents: 3200,
    compareAtCents: 4000,
    imageUrl: "/images/office/tibeb-hardcover-notebook.jpg",
    sku: "KBN-OFF-TIBEB-NOTEBOOK",
    weight: 0.35,
    tags: [
      "Hardcover Notebook",
      "Tibeb Journal",
      "Dot Grid Notebook",
      "Habesha Textile",
      "Executive Stationery",
    ],
    categories: [CAT_OFFICE, CAT_OFFICE_STATIONERY],
    specs: {
      itemType: "Hardcover Archival Fabric Notebook",
      specifications:
        "192 Numbered Dot-Grid Pages (120gsm Heavyweight Paper) • Dual Ribbon Bookmarks",
      materials:
        "100% Hand-Spun Ethiopian Cotton Textile Cover with Silk-Cotton Tibeb Inlay",
      dimensions: "A5 Standard Format (21.5cm × 14.5cm × 2cm) • 350g",
      origin: "Shiro Meda Weavers & Bookbinding Guild, Addis Ababa, Ethiopia",
      warrantyOrCare:
        "Keep dry; wipe fabric gently with a dry lint-free cloth.",
    },
  }),

  // 55. Axum Hand-Turned Solid Brass Rollerball Pen
  buildOfficeProduct({
    id: "prod_office_brass_rollerball_pen",
    name: "Axum Hand-Turned Solid Brass Rollerball Pen",
    slug: "axum-brass-rollerball-pen",
    subtitle:
      "Weight-Balanced Solid Brass & African Ebony Wood Executive Pen with German Ceramic Tip",
    description:
      "Expertly turned from solid C36000 golden brass stock and aged African ebony hardwood by metalsmiths in Tigray. Perfectly weighted to create a natural momentum that glides effortlessly across paper without writing fatigue. Fitted with a precision German Schmidt ceramic rollerball cartridge producing crisp, fast-drying archival black lines.",
    baseCents: 5400,
    compareAtCents: 6500,
    imageUrl: "/images/office/axum-brass-rollerball-pen.jpg",
    sku: "KBN-OFF-AXUM-BRASS-PEN",
    weight: 0.052,
    tags: [
      "Brass Pen",
      "Rollerball Pen",
      "Executive Pen",
      "Solid Brass",
      "Ebony Wood",
      "Fine Writing Instrument",
    ],
    categories: [CAT_OFFICE, CAT_OFFICE_STATIONERY],
    specs: {
      itemType: "Handcrafted Luxury Rollerball Pen",
      specifications:
        "German Schmidt 888 Ceramic Safety Rollerball Refill (0.7mm Fine Line, Archival Black)",
      materials:
        "Solid Lead-Free Architectural Brass Billet, Hand-Turned African Ebony Hardwood",
      dimensions: "138mm Length × 12.5mm Barrel Diameter • 52g Total Weight",
      origin: "Axum Metalsmiths & Woodturners Collective, Ethiopia",
      warrantyOrCare:
        "Brass develops an organic golden patina over time; buff with microfiber cloth.",
    },
  }),

  // 56. Heritage Lalibela Engraved Golden Fountain Pen
  buildOfficeProduct({
    id: "prod_office_lalibela_fountain_pen",
    name: "Heritage Lalibela Engraved Golden Fountain Pen",
    slug: "lalibela-golden-fountain-pen",
    subtitle:
      "Hand-Chiseled Lalibela Cross Knotwork Barrel, 24k Gold Accents & Titanium-Iridium Nib",
    description:
      "A prestigious signing instrument created for executive contract signings and personal correspondence. The solid brass barrel is hand-chiseled with intricate interlocking Lalibela cross geometric knotwork and layered in radiant 24k gold. Fitted with a velvety smooth medium titanium-coated iridium nib and includes a piston ink converter and five international black cartridges.",
    baseCents: 6800,
    compareAtCents: 8200,
    imageUrl: "/images/office/lalibela-golden-fountain-pen.jpg",
    sku: "KBN-OFF-LALIBELA-FOUNTAIN-PEN",
    weight: 0.048,
    tags: [
      "Fountain Pen",
      "Golden Pen",
      "Lalibela Engraving",
      "Executive Pen",
      "Calligraphy & Signing",
    ],
    categories: [CAT_OFFICE, CAT_OFFICE_STATIONERY],
    specs: {
      itemType: "Executive Collector Fountain Pen",
      specifications:
        "Medium (0.6mm) Titanium-Coated Stainless-Iridium Nib • Piston Converter & Cartridge Compatible",
      materials:
        "Hand-Engraved Brass Body, 24k Hard Gold Electroplating, Acrylic Grip Section",
      dimensions: "142mm Length (Capped) × 13mm Diameter • 48g Weight",
      origin: "Lalibela Artisan Guild & Addis Metalsmiths, Ethiopia",
      warrantyOrCare:
        "Flush nib with lukewarm distilled water every 3 months for peak flow.",
    },
  }),

  // 57. Executive Full-Grain Leather Document File Folder
  buildOfficeProduct({
    id: "prod_office_leather_document_file",
    name: "Executive Full-Grain Leather Document File Folder",
    slug: "executive-leather-document-file",
    subtitle:
      "A4 Executive Document Portfolio Folio with Magnetic Closure & Business Card Slots",
    description:
      "Command respect in executive boardrooms and client presentations with this immaculate leather document folder. Handcrafted from vegetable-tanned Ethiopian calfskin with burnished edges and suede microfiber interior lining. Comfortably accommodates up to 100 sheets of A4 contracts, certificates, tablet devices, pens, and credentials in pristine security.",
    baseCents: 6200,
    compareAtCents: 7500,
    imageUrl: "/images/office/executive-leather-document-file.jpg",
    sku: "KBN-OFF-LEATHER-DOC-FILE",
    weight: 0.38,
    tags: [
      "Leather File",
      "Document Folder",
      "Executive Folio",
      "A4 Organizer",
      "Ethiopian Calfskin",
      "Boardroom Accessories",
    ],
    categories: [CAT_OFFICE, CAT_OFFICE_STATIONERY],
    specs: {
      itemType: "Executive Leather Document Portfolio",
      specifications:
        'Fits 100 A4 / US Letter Sheets • Padded Tablet Pocket (up to 11") • 4 Business Card Slots • Pen Loop',
      materials:
        "100% Ethiopian Full-Grain Calfskin Leather, Microfiber Suede Lining, Concealed Neodymium Magnets",
      dimensions: "33cm × 24.5cm × 2cm • 380g",
      origin: "Bole Leather Artisans Collective, Addis Ababa, Ethiopia",
      warrantyOrCare:
        "Condition annually with natural leather cream; store flat in a dry environment.",
    },
  }),

  // 58. Highland Multi-Pocket Archival Expanding Folio File
  buildOfficeProduct({
    id: "prod_office_archival_expanding_file",
    name: "Highland Multi-Pocket Archival Expanding Folio File",
    slug: "highland-archival-expanding-file",
    subtitle:
      "6-Pocket Accordion Document Organizer in Waxed Canvas with Vegetable-Tanned Leather Trim",
    description:
      "Keep confidential contracts, financial archives, and corporate records meticulously sorted. Constructed from rugged 16oz weather-treated waxed canvas reinforced with chestnut Ethiopian leather gussets and antiqued brass snap closures. Features six expanding accordion partitions with blank customizable index labels.",
    baseCents: 4200,
    compareAtCents: 5200,
    imageUrl: "/images/office/highland-archival-expanding-file.jpg",
    sku: "KBN-OFF-EXPANDING-FILE",
    weight: 0.45,
    tags: [
      "Expanding File",
      "Archival Organizer",
      "Document Folio",
      "Waxed Canvas File",
      "Accordion Folder",
      "Office Storage",
    ],
    categories: [CAT_OFFICE, CAT_OFFICE_STATIONERY],
    specs: {
      itemType: "Archival Expanding Document File",
      specifications:
        "6 Expanding Accordion Compartments (Holds up to 400 A4 Sheets) • Customizable Index Tabs Included",
      materials:
        "16oz Heavy-Duty Water-Repellent Waxed Cotton Canvas, Full-Grain Leather Gussets, Solid Brass Snaps",
      dimensions: "34cm Width × 25cm Height × 3cm–12cm Expanding Depth • 450g",
      origin: "Highland Canvas & Leather Workshops, Shewa, Ethiopia",
      warrantyOrCare:
        "Spot clean with cold water; rewax canvas as needed every few years.",
    },
  }),

  // 59. Handcrafted Ethiopian Leather Executive Laptop Bag
  buildOfficeProduct({
    id: "prod_office_ethiopian_leather_laptop_bag",
    name: "Handcrafted Ethiopian Leather Executive Laptop Bag",
    slug: "ethiopian-leather-laptop-bag",
    subtitle:
      'Full-Grain Saddle Tan Highland Leather Briefcase with Padded 16" MacBook Sleeve',
    description:
      'The definitive professional briefcase crafted from legendary Ethiopian highland cowhide—cherished internationally for its superior fiber density, supple hand-feel, and remarkable longevity. Features a dedicated high-density padded compartment for up to 16" laptops, reinforced top carry handles, solid brass hardware, and an ergonomic detachable shoulder strap.',
    baseCents: 18500,
    compareAtCents: 22000,
    imageUrl: "/images/office/ethiopian-leather-laptop-bag.jpg",
    sku: "KBN-OFF-LEATHER-LAPTOP-BAG",
    weight: 1.45,
    tags: [
      "Laptop Bag",
      "Leather Briefcase",
      "Messenger Bag",
      "Ethiopian Leather",
      "Full-Grain Cowhide",
      "Executive Commute",
    ],
    categories: [CAT_OFFICE, CAT_OFFICE_BAGS],
    specs: {
      itemType: "Executive Leather Laptop Briefcase",
      specifications:
        'Padded Sleeve for 16" MacBook Pro / Laptop • Dual Main Dividers • Luggage Trolley Pass-Through Sleeve',
      materials:
        "100% Ethiopian Full-Grain Vegetable-Tanned Cowhide, Solid Antiqued Brass Hardware, 10oz Cotton Canvas Lining",
      dimensions:
        "41.5cm Width × 31cm Height × 10.5cm Depth • Shoulder Strap 125cm Adjustable",
      origin: "Shiro Meda Master Leathercraft Guild, Addis Ababa, Ethiopia",
      warrantyOrCare:
        "Condition twice yearly with natural leather balm; store in included cotton dust bag.",
    },
  }),

  // 60. Highland Commuter Canvas & Leather Laptop Bag
  buildOfficeProduct({
    id: "prod_office_canvas_leather_laptop_bag",
    name: "Highland Commuter Canvas & Leather Laptop Bag",
    slug: "highland-commuter-laptop-bag",
    subtitle:
      'Weather-Resistant Waxed Canvas Messenger with Dark Chocolate Leather Accents & 15" Sleeve',
    description:
      "Designed for the dynamic executive navigating urban transit and high-energy coffee shops. Blends water-resistant 18oz olive waxed canvas with chocolate-brown Ethiopian pull-up leather flap and trim. Features quick-access magnetic buckle closures, padded laptop protection, and multiple internal device organizers.",
    baseCents: 12500,
    compareAtCents: 15000,
    imageUrl: "/images/office/highland-commuter-laptop-bag.jpg",
    sku: "KBN-OFF-COMMUTER-BAG",
    weight: 1.15,
    tags: [
      "Laptop Bag",
      "Messenger Bag",
      "Waxed Canvas Bag",
      "Leather & Canvas",
      "Commuter Briefcase",
    ],
    categories: [CAT_OFFICE, CAT_OFFICE_BAGS],
    specs: {
      itemType: "Everyday Executive Commuter Laptop Bag",
      specifications:
        'Dedicated Suspended 15" Laptop Compartment • Tablet Slip Pocket • Exterior Zippered Passport Pocket',
      materials:
        "18oz Waxed Army Duck Canvas, Genuine Ethiopian Pull-Up Leather, Heavy Cast Brass Buckles",
      dimensions: "39cm Width × 29cm Height × 9cm Depth • 1.15kg",
      origin: "Highland Artisan Guilds, Addis Ababa, Ethiopia",
      warrantyOrCare:
        "Wipe clean with a damp cloth; avoid machine wash to maintain waterproof wax barrier.",
    },
  }),

  // 61. Ergonomic Executive Mesh & Leather Office Desk Chair
  buildOfficeProduct({
    id: "prod_office_ergonomic_desk_chair",
    name: "Ergonomic Executive Mesh & Leather Office Desk Chair",
    slug: "ergonomic-executive-office-chair",
    subtitle:
      "Adaptive Dynamic Lumbar System, 4D Multi-Way Armrests & Breathable High-Tensile Mesh",
    description:
      "Engineered to provide unmatched spinal alignment and zero-pressure comfort during marathon 12+ hour workdays. Incorporates an adaptive dynamic lumbar support system that automatically flexes with posture changes, a 4-position synchro-tilt mechanism (90°–135°), multi-directional 4D armrests, and an aerospace-grade die-cast aluminum 5-star wheelbase with silent floor-safe casters.",
    baseCents: 49500,
    compareAtCents: 59500,
    imageUrl: "/images/office/ergonomic-executive-office-chair.jpg",
    sku: "KBN-OFF-ERGO-CHAIR-MESH",
    weight: 19.5,
    tags: [
      "Office Chair",
      "Ergonomic Chair",
      "Executive Desk Chair",
      "Lumbar Support",
      "4D Armrests",
      "Workstation Seating",
    ],
    categories: [CAT_OFFICE, CAT_OFFICE_FURNITURE],
    specs: {
      itemType: "High-Performance Ergonomic Office Chair",
      specifications:
        "Self-Adjusting Dynamic Lumbar Support • 4D Multi-Way Armrests • 135° Recline Lock • BIFMA Certified Class-4 Gas Lift",
      materials:
        "Breathable German Elastomer Mesh Back, High-Density Molded Foam Seat with Leather Trim, Die-Cast Polished Aluminum Base",
      dimensions:
        "68cm Width × 68cm Depth × 118cm–128cm Adjustable Height • 150kg Weight Capacity",
      origin: "Precision Ergonomic Workstation Engineering",
      warrantyOrCare:
        "5-Year Comprehensive Mechanical & Frame Manufacturer Warranty.",
    },
  }),

  // 62. Highland Top-Grain Leather High-Back Executive Chair
  buildOfficeProduct({
    id: "prod_office_high_back_leather_chair",
    name: "Highland Top-Grain Leather High-Back Executive Chair",
    slug: "highland-leather-executive-chair",
    subtitle:
      "Presidential Boardroom Leather Chair with Hand-Carved Wanza Wood Accents & Synchro-Tilt",
    description:
      "The pinnacle of executive prestige. Upholstered by hand in deep cognac top-grain Ethiopian leather over multi-layered ergonomic pressure-relief foam. Features hand-carved Ethiopian Wanza hardwood padded armrests, integrated high-back headrest support, pneumatic smooth height adjustment, and effortless 360-degree silent swivel.",
    baseCents: 65000,
    compareAtCents: 78000,
    imageUrl: "/images/office/highland-leather-executive-chair.jpg",
    sku: "KBN-OFF-LEATHER-HIGHBACK-CHAIR",
    weight: 23.0,
    tags: [
      "Office Chair",
      "Leather Executive Chair",
      "High Back Chair",
      "Wanza Wood Accent",
      "Boardroom Seating",
      "Luxury Furniture",
    ],
    categories: [CAT_OFFICE, CAT_OFFICE_FURNITURE],
    specs: {
      itemType: "Luxury High-Back Executive Boardroom Chair",
      specifications:
        "Pneumatic Height Adjustment (48cm–58cm Seat Height) • 360° Smooth Swivel • Dual-Paddle Synchro-Tilt Mechanism",
      materials:
        "100% Ethiopian Top-Grain Cowhide Leather, Hand-Carved Wanza Hardwood Arm Accents, Heavy Steel Reinforced Frame",
      dimensions:
        "72cm Width × 74cm Depth × 124cm–134cm Total Height • 180kg Max Load",
      origin:
        "Entoto Mountain Furniture Collective & Master Upholsterers, Ethiopia",
      warrantyOrCare:
        "Nourish leather once per year with leather conditioner; 5-Year Structural Frame Warranty.",
    },
  }),

  // 63. Handcrafted Ethiopian Wanza Hardwood Executive Office Desk
  buildOfficeProduct({
    id: "prod_office_wanza_hardwood_desk",
    name: "Handcrafted Ethiopian Wanza Hardwood Executive Office Desk",
    slug: "wanza-hardwood-executive-desk",
    subtitle:
      "Solid Native Cordia Africana Writing Desk with Soft-Close Drawers & Brass Wire Grommet",
    description:
      "A monumental centerpiece for discerning executives, hand-built from solid Ethiopian Wanza (Cordia africana)—the legendary native dark hardwood renowned for its amber chatoyancy, rich swirling grain, and extraordinary lifetime stability. Constructed with traditional mortise-and-tenon joinery, two whisper-quiet soft-close side drawers, a concealed velvet-lined center laptop drawer, and integrated solid brass cable management grommets.",
    baseCents: 115000,
    compareAtCents: 135000,
    imageUrl: "/images/office/wanza-hardwood-executive-desk.jpg",
    sku: "KBN-OFF-WANZA-DESK-SOLID",
    weight: 58.0,
    tags: [
      "Office Desk",
      "Wanza Hardwood",
      "Executive Desk",
      "Solid Wood Desk",
      "Cordia Africana",
      "Handcrafted Furniture",
    ],
    categories: [CAT_OFFICE, CAT_OFFICE_FURNITURE],
    specs: {
      itemType: "Executive Solid Hardwood Office Desk",
      specifications:
        "160cm Wide Desktop with Beveled Edges • 2 Soft-Close Drawers • 1 Wide Lap Drawer • Integrated Brass Cable Port",
      materials:
        "100% Sustainably Foraged Ethiopian Wanza (Cordia africana) Hardwood, Solid Brushed Brass Hardware",
      dimensions:
        "160cm Length × 80cm Width × 76cm Height • Desktop Thickness 3.5cm • 58kg",
      origin: "Entoto Mountain Master Woodcrafters Guild, Shewa, Ethiopia",
      warrantyOrCare:
        "Finished with organic Koseret oil & natural beeswax; dust with soft cloth and buff annually.",
    },
  }),

  // 64. Ergonomic Dual-Motor Wanza Wood Executive Standing Desk
  buildOfficeProduct({
    id: "prod_office_ergonomic_standing_desk",
    name: "Ergonomic Dual-Motor Wanza Wood Executive Standing Desk",
    slug: "ergonomic-wanza-standing-desk",
    subtitle:
      "Solid Native Wanza Hardwood Top with Dual Ultra-Quiet Motors & 4 Memory Presets",
    description:
      "The flawless synthesis of timeless Ethiopian native hardwood and modern workplace ergonomics. A solid, hand-planed 3cm-thick Wanza hardwood desktop mounted onto a heavy-duty three-stage dual-motor steel lifting frame. Transitions smoothly and silently from sitting to standing height (62cm to 128cm) with the tap of a touch-sensitive digital memory keypad.",
    baseCents: 89000,
    compareAtCents: 105000,
    imageUrl: "/images/office/ergonomic-wanza-standing-desk.jpg",
    sku: "KBN-OFF-WANZA-STANDING-DESK",
    weight: 46.0,
    tags: [
      "Standing Desk",
      "Office Desk",
      "Ergonomic Desk",
      "Electric Sit-Stand",
      "Wanza Wood",
      "Dual Motor Desk",
    ],
    categories: [CAT_OFFICE, CAT_OFFICE_FURNITURE],
    specs: {
      itemType: "Electric Height-Adjustable Standing Desk",
      specifications:
        "Dual Ultra-Quiet Motors (<45dB) • Digital LED Touch Keypad with 4 Memory Presets • Anti-Collision Sensor",
      materials:
        "Solid Ethiopian Wanza Hardwood Desktop (3cm Solid Plank), Heavy-Gauge Powder-Coated Steel Frame",
      dimensions:
        "140cm Length × 75cm Width • Height Range 62cm to 128cm • 120kg Lifting Capacity",
      origin: "Highland Artisan Hardwoods & Precision Ergonomics Assembly",
      warrantyOrCare:
        "5-Year Motor, Electrical & Structural Warranty. Wipe tabletop with damp cloth.",
    },
  }),
];
