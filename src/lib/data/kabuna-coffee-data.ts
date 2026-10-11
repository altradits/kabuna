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
};

export function getCoffeeImageKey(slugOrName?: string | null): string | null {
  if (!slugOrName) return null;
  const s = slugOrName.toLowerCase();
  if (s.includes("chelbesa")) return "chelbesa";
  if (s.includes("hamasho")) return "hamasho";
  if (s.includes("dimtu") || s.includes("tora")) return "dimtu-tora";
  if (s.includes("benti") || s.includes("neka")) return "benti-neka";
  if (s.includes("worku") || s.includes("buche")) return "worku-buche";
  if (s.includes("uraga")) return "uraga";
  if (s.includes("harrar") || s.includes("harar")) return "harrar";
  if (s.includes("kaffa") || s.includes("limu")) return "kaffa";
  if (s.includes("djimmah") || s.includes("jimma")) return "djimmah";
  if (s.includes("green") || s.includes("raw")) return "green-coffee";

  // Specific Ethiopian Ceremony Accessories
  if (s.includes("kit") || s.includes("buna-ceremony-kit"))
    return "ceremony-kit";
  if (s.includes("jebena")) return "jebena";
  if (s.includes("cini")) return "cini";
  if (s.includes("rekebot")) return "rekebot";
  if (s.includes("girgira")) return "girgira";
  if (s.includes("menkeskesha")) return "menkeskesha";
  if (s.includes("mukecha") || s.includes("zenezena")) return "mukecha";
  if (s.includes("ceremony") || s.includes("buna")) return "ceremony-kit";

  // Specific Ethiopian Organic Hair Care Botanicals
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

  // Specific Ethiopian Organic Body & Scents
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

  // Specific Ethiopian Organic Snacks
  if (s.includes("dabo-kolo") || s.includes("dabo")) return "dabo-kolo";
  if (s.includes("heritage-kolo") || s.includes("kolo")) return "heritage-kolo";
  if (s.includes("beso")) return "beso-clusters";
  if (s.includes("telba") || s.includes("crisps")) return "telba-crisps";
  if (s.includes("shimbra")) return "smoked-shimbra";

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

export const CAT_BODY = createCategory(
  "cat_body",
  "Organic Body",
  "body",
  "Highland scents, restorative ointments, and botanical body washes native to Ethiopia — wild Boswellia frankincense (Itan) perfume oils, warming Korarima salves, Koseret enset cleansers, and Tenadam mists.",
  [
    CAT_BODY_FRAGRANCE,
    CAT_BODY_OINTMENTS,
    CAT_BODY_WASH,
    CAT_BODY_MISTS,
    CAT_BODY_SCRUBS,
  ],
  "/images/body/itan-perfume.jpg",
);

export const KABUNA_CATEGORIES: Category[] = [
  CAT_COFFEE,
  CAT_SNACKS,
  CAT_HAIR,
  CAT_BODY,
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
];
