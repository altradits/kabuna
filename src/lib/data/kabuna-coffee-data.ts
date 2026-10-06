import type {
  Category,
  Market,
  Media,
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

export function createVariant(id: string, sku: string, cents: number): Variant {
  const price = createPrice(cents);
  return {
    id,
    product_id: "",
    sku,
    options_text: "",
    track_inventory: true,
    media_count: 0,
    preorder_ships_at: null,
    thumbnail_url: null,
    weight: 0.25,
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
    option_values: [],
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
        "Sidama (Sidamo)",
        "single-origin/sidama",
        "Sun-dried strawberry, milk chocolate, and cane sugar.",
      ),
      createCategory(
        "cat_harrar",
        "Harrar Longberry",
        "single-origin/harrar",
        "Wild blueberry mocha sweetness and rich body.",
      ),
      createCategory(
        "cat_limu_kaffa",
        "Limu & Kaffa Ancient Forest",
        "single-origin/limu-kaffa",
        "From the historic botanical origin of Arabica in Kaffa.",
      ),
    ],
  ),
  createCategory(
    "cat_roast_profiles",
    "Roast Profiles",
    "roast-profiles",
    "Artisanal roast levels calibrated to enhance natural origin characteristics.",
  ),
  createCategory(
    "cat_ceremony",
    "Buna Ceremony & Accessories",
    "buna-ceremony",
    "Authentic clay Jebena pots, Cini cups, and traditional accessories for Ethiopian Buna Tetu.",
  ),
  createCategory(
    "cat_green_coffee",
    "Green Coffee (Unroasted)",
    "green-coffee",
    "Direct-trade Grade 1 raw green coffee beans for craft roasters and home roasting.",
  ),
];

function createProduct(
  id: string,
  name: string,
  slug: string,
  description: string,
  cents: number,
  imageUrl: string,
  categories: Category[],
  compareAtCents: number | null = null,
  extraVariants: Variant[] = [],
): Product {
  const price = createPrice(cents, compareAtCents);
  const mediaItem = createMedia(`media_${id}_1`, imageUrl, name);
  const defaultVariant = createVariant(
    `var_${id}_default`,
    `KBN-${slug}-250G`,
    cents,
  );
  const allVariants = [defaultVariant, ...extraVariants];

  return {
    id,
    name,
    slug,
    meta_title: `${name} | Kabuna Ethiopian Coffee`,
    meta_description: description,
    meta_keywords: `Ethiopian specialty coffee, ${name}`,
    variant_count: allVariants.length,
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
    tags: ["Ethiopian Specialty Coffee", "Single Origin", "Direct Trade"],
    price,
    original_price: price,
    seller_id: null,
    primary_media: mediaItem,
    media: [mediaItem],
    variants: allVariants,
    default_variant: defaultVariant,
    option_types: [],
    option_values: [],
    categories,
    custom_fields: [],
    prior_price: null,
  };
}

export const KABUNA_PRODUCTS: Product[] = [
  createProduct(
    "prod_yirgacheffe",
    "Yirgacheffe Misty Valley (Grade 1 Natural)",
    "yirgacheffe-misty-valley-grade-1",
    "Hand-picked from smallholder plots in the high-elevation Gedeo zone (1,950m - 2,200m). Dried slowly on raised African beds under mountain mist and sunshine. Features intoxicating jasmine aromas, bright bergamot tea, and luscious blueberry finish. Roasted light-medium to preserve its aromatic delicacy.",
    2200,
    "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80",
    [KABUNA_CATEGORIES[0]],
    null,
    [
      createVariant("var_yirgacheffe_500g", "KBN-YIR-500G", 4000),
      createVariant("var_yirgacheffe_1kg", "KBN-YIR-1KG", 7400),
    ],
  ),
  createProduct(
    "prod_guji",
    "Guji Highland Amber (Grade 1 Washed)",
    "guji-highland-amber-grade-1",
    "Grown in deep red volcanic soils across the majestic forested ridges of Shakiso and Uraga at 2,050 - 2,300 meters. Washed in mountain spring waters. Exceptionally clean and tea-like with notes of orange blossom honey, white peach, and fresh lemon verbena.",
    2400,
    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
    [KABUNA_CATEGORIES[0]],
  ),
  createProduct(
    "prod_sidama",
    "Sidama Bensa Sun-Dried (Grade 1)",
    "sidama-bensa-sun-dried-grade-1",
    "A stunning micro-lot from generational farmers in Bensa, Sidama. Ripe cherries are meticulously hand-sorted before laying on raised beds for 21 days. Deep and jammy sweetness, reminiscent of ripe strawberry compote, milk chocolate, and unrefined cane sugar.",
    2100,
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    [KABUNA_CATEGORIES[0]],
  ),
  createProduct(
    "prod_harrar",
    "Harrar Wild Horse (Heirloom Longberry)",
    "harrar-wild-horse-longberry",
    "Cultivated on the arid slopes of eastern Harar where coffee has grown wild for centuries. Celebrated for distinctive elongated 'Longberry' genetics and heavy syrupy body. Intense natural notes of sun-ripened blueberry, baker's cocoa, and exotic cardamom spice.",
    2300,
    "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
    [KABUNA_CATEGORIES[0]],
  ),
  createProduct(
    "prod_kaffa",
    "Kaffa Ancient Forest (Wild Harvested)",
    "kaffa-ancient-wild-forest",
    "Harvested directly from wild ancient mother trees in the UNESCO Kaffa Biosphere Reserve — the botanical origin where Arabica coffee was discovered. This sacred coffee offers deep notes of wild blackberries, cardamom, cloves, and dried fig.",
    2600,
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
    [KABUNA_CATEGORIES[0]],
  ),
  createProduct(
    "prod_limu",
    "Limu Forest Reserve (Grade 2 Washed)",
    "limu-forest-reserve-washed",
    "Sourced from the lush cloud forests of Limu Kosa, southwestern Ethiopia. Pure spring water washing yields sweet baked apple notes, cedar, toffee, and a round, silky mouthfeel with gentle malic acidity.",
    2000,
    "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80",
    [KABUNA_CATEGORIES[0]],
  ),
  createProduct(
    "prod_djimmah",
    "Djimmah Traditional Roast (Heritage Blend)",
    "djimmah-traditional-roast-heritage",
    "Crafted specifically for stove-top Jebena brewing, Moka pot, and full-bodied espresso. Dark roasted Ethiopian heirloom beans offering thick body, rich dark chocolate, roasted almond, and sweet molasses.",
    1900,
    "https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&w=800&q=80",
    [KABUNA_CATEGORIES[0], KABUNA_CATEGORIES[1]],
  ),
  createProduct(
    "prod_buna_ceremony_kit",
    "Ethiopian Buna Ceremony Starter Kit",
    "ethiopian-buna-ceremony-starter-kit",
    "Experience the warmth and connection of an authentic Ethiopian coffee ceremony at home. Kit includes a hand-turned Ethiopian clay Jebena pot, 6 hand-painted porcelain Cini cups and saucers, traditional straw woven Rekebot mat, unroasted green heirloom coffee beans (250g), and natural frankincense incense.",
    6800,
    "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    [KABUNA_CATEGORIES[2]],
    7800,
  ),
];
