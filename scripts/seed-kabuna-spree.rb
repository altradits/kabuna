# frozen_string_literal: true

puts "==> Starting Kabuna Ethiopian Coffee Seeding for Spree Commerce"

store = Spree::Store.default
store.update!(
  name: "Kabuna",
  code: "kabuna",
  url: "localhost:3001",
  mail_from_address: "hello@kabunacoffee.com",
  customer_support_email: "support@kabunacoffee.com",
  new_order_notifications_email: "orders@kabunacoffee.com",
  seo_title: "Kabuna | Ethiopian Specialty Coffee",
  meta_description: "Direct-trade, single-origin specialty Ethiopian coffee varieties from Yirgacheffe, Guji, Sidama, and Harrar.",
  meta_keywords: "Ethiopian coffee, Yirgacheffe, Guji, Sidama, Harrar, specialty coffee, direct trade"
)

ref_prod = Spree::Product.first
delivery_profile_id = ref_prod&.delivery_profile_id
product_type_id = ref_prod&.product_type_id

# Categories Setup
taxonomy = Spree::Taxonomy.where(name: "Categories", store: store).first_or_create!

def find_or_create_cat(store, name, permalink, description, parent = nil, taxonomy = nil)
  cat = Spree::Category.where(permalink: permalink, store: store).first_or_initialize
  cat.assign_attributes(
    name: name,
    description: description,
    parent: parent
  )
  cat.save!
  cat
end

cat_single_origin = find_or_create_cat(store, "Single Origin Varieties", "single-origin", "Single-origin Ethiopian specialty coffees")
cat_yirgacheffe   = find_or_create_cat(store, "Yirgacheffe", "single-origin/yirgacheffe", "Floral aromas, bergamot, and sweet citrus", cat_single_origin)
cat_guji          = find_or_create_cat(store, "Guji", "single-origin/guji", "Highland volcanic soils producing honeyed stone fruit", cat_single_origin)
cat_sidama        = find_or_create_cat(store, "Sidama (Sidamo)", "single-origin/sidama", "Sun-dried strawberry, milk chocolate, and cane sugar", cat_single_origin)
cat_harrar        = find_or_create_cat(store, "Harrar Longberry", "single-origin/harrar", "Wild blueberry mocha sweetness and rich body", cat_single_origin)
cat_limu_kaffa    = find_or_create_cat(store, "Limu & Kaffa Ancient Forest", "single-origin/limu-kaffa", "From the historic botanical origin of Arabica in Kaffa", cat_single_origin)

cat_roast         = find_or_create_cat(store, "Roast Profiles", "roast-profiles", "Artisanal roast levels calibrated to enhance natural origin characteristics")
cat_ceremony      = find_or_create_cat(store, "Buna Ceremony & Accessories", "buna-ceremony", "Authentic clay Jebena pots, Cini cups, and traditional accessories")
cat_green         = find_or_create_cat(store, "Green Coffee (Unroasted)", "green-coffee", "Direct-trade Grade 1 raw green coffee beans for home roasting")

puts "==> Categories ready"

coffee_products = [
  {
    name: "Yirgacheffe Misty Valley (Grade 1 Natural)",
    slug: "yirgacheffe-misty-valley-grade-1",
    price: 22.00,
    description: "Hand-picked from smallholder garden plots in the high-elevation Gedeo zone (1,950m - 2,200m). Dried slowly on raised African beds under mountain mist and sunshine. Features intoxicating jasmine aromas, bright bergamot tea, and luscious blueberry finish.",
    categories: [cat_single_origin, cat_yirgacheffe]
  },
  {
    name: "Guji Highland Amber (Grade 1 Washed)",
    slug: "guji-highland-amber-grade-1",
    price: 24.00,
    description: "Grown in deep red volcanic soils across the majestic forested ridges of Shakiso and Uraga at 2,050 - 2,300 meters. Washed in mountain spring waters. Exceptionally clean and tea-like with notes of orange blossom honey, white peach, and fresh lemon verbena.",
    categories: [cat_single_origin, cat_guji]
  },
  {
    name: "Sidama Bensa Sun-Dried (Grade 1)",
    slug: "sidama-bensa-sun-dried-grade-1",
    price: 21.00,
    description: "A stunning micro-lot from generational farmers in Bensa, Sidama. Ripe cherries are meticulously hand-sorted before laying on raised beds for 21 days. Deep and jammy sweetness, reminiscent of ripe strawberry compote, milk chocolate, and unrefined cane sugar.",
    categories: [cat_single_origin, cat_sidama]
  },
  {
    name: "Harrar Wild Horse (Heirloom Longberry)",
    slug: "harrar-wild-horse-longberry",
    price: 23.00,
    description: "Cultivated on the arid slopes of eastern Harar where coffee has grown wild for centuries. Celebrated for distinctive elongated 'Longberry' genetics and heavy syrupy body. Intense natural notes of sun-ripened blueberry, baker's cocoa, and exotic cardamom spice.",
    categories: [cat_single_origin, cat_harrar]
  },
  {
    name: "Kaffa Ancient Forest (Wild Harvested)",
    slug: "kaffa-ancient-wild-forest",
    price: 26.00,
    description: "Harvested directly from wild ancient mother trees in the UNESCO Kaffa Biosphere Reserve — the botanical origin where Arabica coffee was discovered. This sacred coffee offers deep notes of wild blackberries, cardamom, cloves, and dried fig.",
    categories: [cat_single_origin, cat_limu_kaffa]
  },
  {
    name: "Limu Forest Reserve (Grade 2 Washed)",
    slug: "limu-forest-reserve-washed",
    price: 20.00,
    description: "Sourced from the lush cloud forests of Limu Kosa, southwestern Ethiopia. Pure spring water washing yields sweet baked apple notes, cedar, toffee, and a round, silky mouthfeel with gentle malic acidity.",
    categories: [cat_single_origin, cat_limu_kaffa]
  },
  {
    name: "Djimmah Traditional Roast (Heritage Blend)",
    slug: "djimmah-traditional-roast-heritage",
    price: 19.00,
    description: "Crafted specifically for stove-top Jebena brewing, Moka pot, and full-bodied espresso. Dark roasted Ethiopian heirloom beans offering thick body, rich dark chocolate, roasted almond, and sweet molasses.",
    categories: [cat_single_origin, cat_roast]
  },
  {
    name: "Ethiopian Buna Ceremony Starter Kit",
    slug: "ethiopian-buna-ceremony-starter-kit",
    price: 68.00,
    description: "Experience the warmth and connection of an authentic Ethiopian coffee ceremony at home. Kit includes a hand-turned Ethiopian clay Jebena pot, 6 hand-painted porcelain Cini cups and saucers, traditional straw woven Rekebot mat, unroasted green heirloom coffee beans (250g), and natural frankincense incense.",
    categories: [cat_ceremony]
  }
]

stock_location = Spree::StockLocation.where(active: true).first

coffee_products.each do |p_data|
  product = Spree::Product.where(slug: p_data[:slug]).first_or_initialize
  product.name = p_data[:name]
  product.description = p_data[:description]
  product.store_id = store.id
  product.status = "active"
  product.available_on = 1.day.ago
  product.delivery_profile_id = delivery_profile_id
  product.product_type_id = product_type_id
  product.save!

  variant = product.default_variant
  if variant.nil?
    variant = product.create_default_variant!(sku: "KBN-#{p_data[:slug].first(12).upcase}")
  end

  price = variant.prices.where(currency: "USD").first_or_initialize
  price.amount = p_data[:price]
  price.save!

  p_data[:categories].each do |cat|
    product.categories << cat unless product.categories.include?(cat)
  end

  if stock_location
    stock_item = stock_location.stock_items.where(variant: variant).first_or_initialize
    stock_item.set_count_on_hand(100)
    stock_item.save!
  end

  puts "  + Seeded product: #{product.name} ($#{price.amount})"
end

puts "==> Successfully seeded all #{coffee_products.size} Ethiopian coffee varieties into Spree!"
