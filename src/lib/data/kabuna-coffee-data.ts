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
  ceremony: [
    "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85",
  ],
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
  if (
    s.includes("ceremony") ||
    s.includes("jebena") ||
    s.includes("buna") ||
    s.includes("kit")
  )
    return "ceremony";
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
    image_url: null,
    square_image_url: null,
    is_root: true,
    is_child: false,
    is_leaf: children.length === 0,
    children,
  };
}

export const KABUNA_CATEGORIES: Category[] = [
  createCategory(
    "cat_single_origin",
    "Single Origin Varieties",
    "single-origin",
    "Exceptional single-origin specialty coffees from distinct micro-regions of Ethiopia.",
    [
      createCategory(
        "cat_yirgacheffe",
        "Yirgacheffe",
        "single-origin/yirgacheffe",
        "Floral aromas, bergamot, and sweet citrus.",
      ),
      createCategory(
        "cat_guji",
        "Guji",
        "single-origin/guji",
        "Highland volcanic soils producing honeyed stone fruit.",
      ),
      createCategory(
        "cat_sidama",
        "Sidama",
        "single-origin/sidama",
        "Sun-dried strawberry, milk chocolate, and cane sugar.",
      ),
    ],
  ),
  createCategory(
    "cat_washed",
    "Washed Process",
    "washed",
    "Pristine mountain spring water fermentation showcasing delicate florals and bright clarity.",
  ),
  createCategory(
    "cat_natural",
    "Natural Process",
    "natural",
    "Sun-dried whole coffee cherries on raised African beds with intense fruit sweetness.",
  ),
  createCategory(
    "cat_ceremony",
    "Ceremony & Accessories",
    "buna-ceremony",
    "Authentic clay Jebena pots, Cini cups, and traditional accessories for Ethiopian Buna Tetu.",
  ),
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
    categories,
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
    categories: [KABUNA_CATEGORIES[0], KABUNA_CATEGORIES[1]],
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
    categories: [KABUNA_CATEGORIES[0], KABUNA_CATEGORIES[2]],
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
    categories: [KABUNA_CATEGORIES[0], KABUNA_CATEGORIES[2]],
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
    categories: [KABUNA_CATEGORIES[0], KABUNA_CATEGORIES[1]],
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
    categories: [KABUNA_CATEGORIES[0], KABUNA_CATEGORIES[2]],
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
    categories: [KABUNA_CATEGORIES[0], KABUNA_CATEGORIES[1]],
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

  // 7. Jebena Ceremony Kit (Buna Ceremony Accessories)
  (() => {
    const kitPrice = createPrice(6800, 7800);
    const kitMedia = createMedia(
      "media_ceremony_kit_1",
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
      "Traditional Ethiopian Buna Ceremony Starter Kit",
    );
    const kitVariant = createVariant(
      "var_ceremony_kit_default",
      "KBN-CEREMONY-KIT",
      6800,
      [],
      "Standard Kit",
      2.5,
    );

    const kitCustomFields: CustomField[] = [
      createCustomField(
        "cf_kit_items",
        "Included Items",
        "items",
        "Clay Jebena Pot, 6 Cini Cups & Saucers, Straw Rekebot Mat, 250g Green Coffee, Frankincense",
      ),
      createCustomField(
        "cf_kit_origin",
        "Craft Origin",
        "origin",
        "Hand-Turned Clay & Hand-Painted Ceramic from Addis Ababa",
      ),
      createCustomField(
        "cf_kit_material",
        "Materials",
        "material",
        "Natural Ethiopian Terra Cotta Clay & Porcelain",
      ),
      createCustomField(
        "cf_kit_capacity",
        "Pot Capacity",
        "capacity",
        "800ml (Serves 6–8 traditional servings)",
      ),
    ];

    return {
      id: "prod_buna_ceremony_kit",
      name: "Jebena Ceremony Kit",
      slug: "jebena-buna-ceremony-kit",
      meta_title: "Jebena Ceremony Kit | Kabuna Ethiopian Specialty Coffee",
      meta_description:
        "Authentic Ethiopian Buna Ceremony Kit with handcrafted clay Jebena pot, 6 porcelain Cini cups, and Rekebot mat.",
      meta_keywords:
        "Buna ceremony, Jebena pot, Cini cups, Rekebot, Ethiopian coffee ritual",
      variant_count: 1,
      available_on: "2024-01-01T00:00:00.000Z",
      preorder_ships_at: null,
      purchasable: true,
      preorder: false,
      in_stock: true,
      backorderable: false,
      available: true,
      description:
        "Experience the warmth, hospitality, and sacred tradition of an authentic Ethiopian Buna Tetu ceremony at home. This heirloom kit includes a hand-turned Ethiopian clay Jebena pot, 6 hand-painted porcelain Cini cups and saucers, a traditional straw woven Rekebot mat, unroasted green heirloom coffee beans (250g), and natural frankincense incense.",
      description_html:
        "<p>Experience the warmth, hospitality, and sacred tradition of an authentic Ethiopian Buna Tetu ceremony at home. This heirloom kit includes a hand-turned Ethiopian clay Jebena pot, 6 hand-painted porcelain Cini cups and saucers, a traditional straw woven Rekebot mat, unroasted green heirloom coffee beans (250g), and natural frankincense incense.</p>",
      default_variant_id: kitVariant.id,
      buy_box_variant_id: kitVariant.id,
      thumbnail_url:
        "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
      tags: ["Buna Ceremony", "Jebena", "Accessories", "Traditional Ritual"],
      price: kitPrice,
      original_price: createPrice(7800),
      seller_id: null,
      primary_media: kitMedia,
      media: [kitMedia],
      variants: [kitVariant],
      default_variant: kitVariant,
      option_types: [],
      option_values: [],
      categories: [KABUNA_CATEGORIES[3]],
      custom_fields: kitCustomFields,
      prior_price: null,
    };
  })(),
];
