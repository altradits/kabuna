import type { Category } from "@spree/sdk";
import {
  Droplets,
  Flame,
  HeartHandshake,
  Mountain,
  Sparkles,
  SunMedium,
  Wind,
} from "lucide-react";
import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";
import { PageHeroSection } from "@/components/layout/PageHeroSection";

interface CategoryBannerProps {
  category: Category;
  basePath: string;
  locale: string;
}

export async function CategoryBanner({
  category,
  basePath,
  locale,
}: CategoryBannerProps) {
  "use cache: remote";
  cacheLife("minutes");
  cacheTag("category-banner");

  const permalink = (category.permalink || "").toLowerCase();

  let heroProps = {
    badge: undefined as string | undefined,
    titleLine1: category.name,
    titleLine2: undefined as string | undefined,
    description:
      category.description ||
      "Discover authentic Ethiopian specialty harvests and time-honored coffee traditions.",
    bgImageSrc: "/images/hero-mountain.jpg",
    bgImageAlt: "Majestic Ethiopian mountain landscape",
    focalImageSrc: "/images/products/chelbesa.jpg",
    focalImageAlt: category.name,
    focalImageIsCutout: false,
    ctaText: "Explore Collection",
    ctaHref: "#category-products",
    secondaryCtaText: "All Products",
    secondaryCtaHref: `${basePath}/products`,
    pillarsTitle: "The Kabuna Craft & Tradition",
    pillars: [
      {
        icon: <Mountain className="w-6 h-6" />,
        titleLine1: "High-Altitude",
        titleLine2: "Volcanic Terroirs",
        description:
          "Cultivated in nutrient-rich highlands exceeding 2,000 meters for exceptional bean density and clarity.",
      },
      {
        icon: <HeartHandshake className="w-6 h-6" />,
        titleLine1: "Direct-Trade",
        titleLine2: "Farmer Equity",
        description:
          "Traceable partnerships with smallholder family farms and washing stations across Ethiopia.",
      },
      {
        icon: <Flame className="w-6 h-6" />,
        titleLine1: "Small-Batch",
        titleLine2: "Roasted to Order",
        description:
          "Expertly roasted only upon order confirmation to guarantee peak floral aromatics and freshness.",
      },
    ],
  };

  if (permalink.includes("buna-ceremony") || permalink.includes("ceremony")) {
    heroProps = {
      badge: undefined,
      titleLine1: "Authentic Ethiopian",
      titleLine2: "Buna Ceremony Wares",
      description:
        "Handcrafted black clay Jebena pots, vibrant Tibeb Cini cups, brass Rekebot tables, and frankincense burners for the sacred Buna Tetu ritual.",
      bgImageSrc: "/images/ceremony/ceremony-kit.jpg",
      bgImageAlt:
        "Authentic Ethiopian Buna Ceremony Kit on green ceremonial ketema grass",
      focalImageSrc: "/images/ceremony/jebena.jpg",
      focalImageAlt: "Traditional hand-burnished clay Jebena pot",
      focalImageIsCutout: false,
      ctaText: "Explore Ceremony Wares",
      ctaHref: "#category-products",
      secondaryCtaText: "Single-Origin Coffees",
      secondaryCtaHref: `${basePath}/c/single-origin`,
      pillarsTitle: "Sacred Elements of the Ethiopian Buna Ritual",
      pillars: [
        {
          icon: <Flame className="w-6 h-6" />,
          titleLine1: "Hand-Thrown",
          titleLine2: "Earthenware Jebena",
          description:
            "Formed from porous Ethiopian river clay and pit-fired with charcoal to season every brew with balanced thermal retention.",
        },
        {
          icon: <Sparkles className="w-6 h-6" />,
          titleLine1: "Abol, Tona &",
          titleLine2: "Bereka Rounds",
          description:
            "Three consecutive pourings honoring friendship, philosophical kinship, and communal divine blessings.",
        },
        {
          icon: <Wind className="w-6 h-6" />,
          titleLine1: "Fragrant Itan &",
          titleLine2: "Green Ketema Grass",
          description:
            "Sacred frankincense smoke purifies the space as fresh river grass welcomes cherished guests to the gathering.",
        },
      ],
    };
  } else if (permalink === "coffee" || permalink.endsWith("/coffee")) {
    heroProps = {
      badge: undefined,
      titleLine1: "Authentic Ethiopian",
      titleLine2: "Specialty Coffees",
      description:
        "Explore Ethiopia's legendary coffee heritage. From high-altitude single-origin micro-lots to sun-dried natural beans and unroasted green lots, discover coffees grown where Arabica was born.",
      bgImageSrc: "/images/heroes/products-hero.jpg",
      bgImageAlt: "Ethiopian high-altitude coffee plantation at sunrise",
      focalImageSrc: "/images/products/chelbesa.jpg",
      focalImageAlt: "Ethiopian specialty coffee selection",
      focalImageIsCutout: false,
      ctaText: "Shop All Coffees",
      ctaHref: "#category-products",
      secondaryCtaText: "Ceremony Wares",
      secondaryCtaHref: `${basePath}/c/buna-ceremony`,
      pillarsTitle: "The Ethiopian Coffee Heritage",
      pillars: [
        {
          icon: <Mountain className="w-6 h-6" />,
          titleLine1: "High-Altitude",
          titleLine2: "Volcanic Terroirs",
          description:
            "Cultivated in nutrient-rich highlands exceeding 2,000 meters for exceptional bean density and clarity.",
        },
        {
          icon: <Droplets className="w-6 h-6" />,
          titleLine1: "Washed & Natural",
          titleLine2: "Artisan Fermentations",
          description:
            "Pristine spring water washing and raised-bed sun drying preserve delicate floral aromatics and fruit sweetness.",
        },
        {
          icon: <HeartHandshake className="w-6 h-6" />,
          titleLine1: "Direct-Trade",
          titleLine2: "Farmer Equity",
          description:
            "Fully traceable partnerships with smallholder family farms and washing stations across Ethiopia.",
        },
      ],
    };
  } else if (
    permalink === "hair" ||
    permalink.startsWith("hair/") ||
    permalink.includes("/hair") ||
    permalink.includes("hair")
  ) {
    if (permalink.includes("butter")) {
      heroProps = {
        badge: "HERBAL BUTTERS & BALMS",
        titleLine1: "YeTsehur Kibe",
        titleLine2: "Cultured Hair Butter",
        description:
          "Hand-churned grass-fed highland butter slowly infused with wild Koseret, mountain rosemary, and green cardamom for intense moisture and coil repair.",
        bgImageSrc: "/images/heroes/hair-hero.jpg",
        bgImageAlt: "Traditional Ethiopian herbal hair butter ritual",
        focalImageSrc: "/images/hair/yetsehur-kibe.jpg",
        focalImageAlt: "YeTsehur Kibe Ethiopian herbal hair butter",
        focalImageIsCutout: false,
        ctaText: "Shop Hair Butters",
        ctaHref: "#category-products",
        secondaryCtaText: "All Hair Care",
        secondaryCtaHref: `${basePath}/c/hair`,
        pillarsTitle: "Highland Butter Infusion Benefits",
        pillars: [
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Grass-Fed Highland",
            titleLine2: "Clarified Butter",
            description:
              "Rich in vitamins A, D, and E with essential fatty acids that seal moisture without weight.",
          },
          {
            icon: <Droplets className="w-6 h-6" />,
            titleLine1: "Wild Koseret &",
            titleLine2: "Rosemary Infusion",
            description:
              "Wild Lippia adoensis calms itchy scalp and clarifies follicle roots with natural thymol.",
          },
          {
            icon: <HeartHandshake className="w-6 h-6" />,
            titleLine1: "Protective Styling",
            titleLine2: "Deep Hydration",
            description:
              "Ideal for locking in post-wash hydration prior to braiding or twisting natural textures.",
          },
        ],
      };
    } else if (permalink.includes("oil") || permalink.includes("elixir")) {
      heroProps = {
        badge: "SCALP OILS & ELIXIRS",
        titleLine1: "Koseret & Nug",
        titleLine2: "Scalp Growth Elixir",
        description:
          "Cold-pressed indigenous Ethiopian Nug seed oil, wild-foraged Koseret, and Tikur Azmud (black seed) formulated for follicle stimulation and mirror shine.",
        bgImageSrc: "/images/heroes/hair-hero.jpg",
        bgImageAlt: "Cold-pressed Ethiopian herbal hair oil",
        focalImageSrc: "/images/hair/koseret-scalp-elixir.jpg",
        focalImageAlt: "Koseret and Nug Scalp Elixir",
        focalImageIsCutout: false,
        ctaText: "Shop Scalp Oils",
        ctaHref: "#category-products",
        secondaryCtaText: "All Hair Care",
        secondaryCtaHref: `${basePath}/c/hair`,
        pillarsTitle: "Native Highland Oil Properties",
        pillars: [
          {
            icon: <Droplets className="w-6 h-6" />,
            titleLine1: "Cold-Pressed Nug",
            titleLine2: "Linoleic Acid Rich",
            description:
              "Indigenous Guizotia abyssinica seeds deliver omega-6 fatty acids to boost cellular renewal.",
          },
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Tikur Azmud",
            titleLine2: "Black Seed Vitality",
            description:
              "Packed with thymoquinone to soothe scalp inflammation, combat dandruff, and reduce shedding.",
          },
          {
            icon: <HeartHandshake className="w-6 h-6" />,
            titleLine1: "Lightweight & Fast",
            titleLine2: "Non-Greasy Finish",
            description:
              "Absorbs rapidly without pore clogging, providing a lustrous weightless botanical sheen.",
          },
        ],
      };
    } else if (permalink.includes("cleanser") || permalink.includes("endod")) {
      heroProps = {
        badge: "BOTANICAL CLEANSERS",
        titleLine1: "Endod Botanical",
        titleLine2: "Herbal Scalp Cleansers",
        description:
          "Wild-harvested Endod (African soapberry) and ancestral washing powders that clarify gently with natural plant saponins without stripping natural oils.",
        bgImageSrc: "/images/heroes/hair-hero.jpg",
        bgImageAlt: "Wild-harvested Endod scalp cleanser",
        focalImageSrc: "/images/hair/endod-cleanser.jpg",
        focalImageAlt: "Endod Botanical Cleanser",
        focalImageIsCutout: false,
        ctaText: "Shop Cleansers",
        ctaHref: "#category-products",
        secondaryCtaText: "All Hair Care",
        secondaryCtaHref: `${basePath}/c/hair`,
        pillarsTitle: "Wild Saponin Clarifying Science",
        pillars: [
          {
            icon: <Droplets className="w-6 h-6" />,
            titleLine1: "Wild Endod Saponins",
            titleLine2: "Zero Sulfates",
            description:
              "Phytolacca dodecandra produces rich botanical foam that sweeps buildup away naturally.",
          },
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Microbiome Friendly",
            titleLine2: "Optimal pH Balance",
            description:
              "Maintains the scalp's delicate protective acid mantle without stripping vital lipids.",
          },
          {
            icon: <HeartHandshake className="w-6 h-6" />,
            titleLine1: "Ancestral Recipe",
            titleLine2: "100% Biodegradable",
            description:
              "Foraged sustainably from wild riverbanks by highland cooperative gatherers.",
          },
        ],
      };
    } else if (permalink.includes("treatment") || permalink.includes("mask")) {
      heroProps = {
        badge: "TREATMENTS & MASKS",
        titleLine1: "Shuruba Restorative",
        titleLine2: "Highland Hair Masks",
        description:
          "Deep conditioning botanical treatment infused with Ethiopian highland Moringa stenopetala to fortify coils, prevent breakage, and revive braided textures.",
        bgImageSrc: "/images/heroes/hair-hero.jpg",
        bgImageAlt: "Shuruba deep conditioning hair mask",
        focalImageSrc: "/images/hair/shuruba-mask.jpg",
        focalImageAlt: "Shuruba Deep Conditioning Mask",
        focalImageIsCutout: false,
        ctaText: "Shop Hair Masks",
        ctaHref: "#category-products",
        secondaryCtaText: "All Hair Care",
        secondaryCtaHref: `${basePath}/c/hair`,
        pillarsTitle: "Highland Moringa Conditioning Power",
        pillars: [
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Moringa Stenopetala",
            titleLine2: "Highland Superfood",
            description:
              "Packed with amino acids, plant keratin precursors, and minerals for tensile strength.",
          },
          {
            icon: <Droplets className="w-6 h-6" />,
            titleLine1: "Intense Elasticity",
            titleLine2: "Split End Shield",
            description:
              "Restores slip and curl elasticity for effortless detangling without strand snap.",
          },
          {
            icon: <HeartHandshake className="w-6 h-6" />,
            titleLine1: "Braiding Preparation",
            titleLine2: "Long-Lasting Silk",
            description:
              "Deeply conditions before and after traditional Shuruba cornrows and protective styles.",
          },
        ],
      };
    } else if (permalink.includes("tool") || permalink.includes("comb")) {
      heroProps = {
        badge: "WOODEN COMBS & ACCESSORIES",
        titleLine1: "Hand-Carved Wanza",
        titleLine2: "Artisan Wide-Tooth Combs",
        description:
          "Traditional Ethiopian afro picks hand-carved from dense mountain Wanza hardwood with delicate Habesha motifs to detangle curls without static.",
        bgImageSrc: "/images/heroes/hair-hero.jpg",
        bgImageAlt: "Hand-carved Wanza hardwood hair comb",
        focalImageSrc: "/images/hair/wanza-comb.jpg",
        focalImageAlt: "Wanza Carved Hair Comb",
        focalImageIsCutout: false,
        ctaText: "Shop Combs",
        ctaHref: "#category-products",
        secondaryCtaText: "All Hair Care",
        secondaryCtaHref: `${basePath}/c/hair`,
        pillarsTitle: "Artisanal Wanza Wood Craftsmanship",
        pillars: [
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Solid Mountain Wanza",
            titleLine2: "Cordia Africana Wood",
            description:
              "Prized for centuries for its velvety grain, durability, and smooth seamless tooth finish.",
          },
          {
            icon: <Droplets className="w-6 h-6" />,
            titleLine1: "Static-Free Glide",
            titleLine2: "Snag-Free Teeth",
            description:
              "Naturally distributes scalp oils through strands without micro-tearing hair cuticles.",
          },
          {
            icon: <HeartHandshake className="w-6 h-6" />,
            titleLine1: "Gondar Guild Carvers",
            titleLine2: "Generational Art",
            description:
              "Individually hand-chiseled by master carvers using traditional geometrical Habesha crosses.",
          },
        ],
      };
    } else {
      heroProps = {
        badge: undefined,
        titleLine1: "Traditional Ethiopian",
        titleLine2: "Organic Hair Care",
        description:
          "Centuries of Habesha beauty wisdom crafted with 100% native Ethiopian botanicals — cultured herbal hair butter (YeTsehur Kibe), cold-pressed Nug scalp elixirs, wild Endod cleansers, and hand-carved Wanza combs.",
        bgImageSrc: "/images/heroes/hair-hero.jpg",
        bgImageAlt: "Traditional Ethiopian botanical hair care ritual",
        focalImageSrc: "/images/hair/yetsehur-kibe.jpg",
        focalImageAlt: "YeTsehur Kibe Ethiopian herbal hair butter",
        focalImageIsCutout: false,
        ctaText: "Shop Hair Care",
        ctaHref: "#category-products",
        secondaryCtaText: "Specialty Coffees",
        secondaryCtaHref: `${basePath}/c/coffee`,
        pillarsTitle: "The Ancient Habesha Botanical Ritual",
        pillars: [
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Cultured Grass-Fed",
            titleLine2: "Herbal Butter (Kibe)",
            description:
              "Slow-simmered with wild Koseret and rosemary to penetrate natural coils and deliver deep, long-lasting moisture.",
          },
          {
            icon: <Droplets className="w-6 h-6" />,
            titleLine1: "Cold-Pressed Nug &",
            titleLine2: "Black Seed Elixirs",
            description:
              "Indigenous highland oils packed with linoleic acid and thymoquinone to nourish scalp follicles and encourage growth.",
          },
          {
            icon: <HeartHandshake className="w-6 h-6" />,
            titleLine1: "Wild Endod &",
            titleLine2: "Zero Synthetics",
            description:
              "Pure, saponin-rich botanical berries and hand-carved Wanza hardwood combs honoring ancestral Ethiopian heritage.",
          },
        ],
      };
    }
  } else if (
    permalink === "snacks" ||
    permalink.startsWith("snacks/") ||
    permalink.includes("/snacks") ||
    permalink.includes("snack")
  ) {
    if (permalink.includes("kolo") && !permalink.includes("dabo")) {
      heroProps = {
        badge: "HERITAGE KOLO GRAINS",
        titleLine1: "Highland Heritage Kolo",
        titleLine2: "Whole Roasted Grains",
        description:
          "Traditional Ethiopian dry-roasted whole barley kernels, toasted golden chickpeas, and mineral-rich niger seeds — prepared on earthenware skillets for the ultimate buna pairing.",
        bgImageSrc: "/images/heroes/snacks-hero.jpg",
        bgImageAlt: "Highland Heritage Kolo with Ethiopian Buna Jebena",
        focalImageSrc: "/images/snacks/heritage-kolo.jpg",
        focalImageAlt: "Highland Heritage Kolo",
        focalImageIsCutout: false,
        ctaText: "Shop Kolo Grains",
        ctaHref: "#category-products",
        secondaryCtaText: "All Snacks",
        secondaryCtaHref: `${basePath}/c/snacks`,
        pillarsTitle: "Highland Grain Roasting Craft",
        pillars: [
          {
            icon: <Flame className="w-6 h-6" />,
            titleLine1: "Mitad Skillet Roasted",
            titleLine2: "Zero Added Oils",
            description:
              "Slow-toasted over gentle embers to produce a crisp, satisfying crunch while preserving dietary fiber.",
          },
          {
            icon: <Mountain className="w-6 h-6" />,
            titleLine1: "Heirloom Barley &",
            titleLine2: "Volcanic Chickpeas",
            description:
              "Directly harvested from high-elevation agricultural cooperatives in Shewa and Amhara.",
          },
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Ancient Buna Tetu",
            titleLine2: "Social Companion",
            description:
              "The time-honored snack served across three ceremonial rounds of Ethiopian coffee.",
          },
        ],
      };
    } else if (permalink.includes("dabo")) {
      heroProps = {
        badge: "SPICED DABO KOLO",
        titleLine1: "Berbere Spiced",
        titleLine2: "Artisan Dabo Kolo",
        description:
          "Crisp diamond-cut pastry morsels seasoned with fragrant sun-dried Berbere chili spices, korarima cardamom, and aromatic black cumin seeds (Tikur Azmud).",
        bgImageSrc: "/images/heroes/snacks-hero.jpg",
        bgImageAlt: "Artisanal crunchy Dabo Kolo",
        focalImageSrc: "/images/snacks/dabo-kolo.jpg",
        focalImageAlt: "Berbere Spiced Dabo Kolo",
        focalImageIsCutout: false,
        ctaText: "Shop Dabo Kolo",
        ctaHref: "#category-products",
        secondaryCtaText: "All Snacks",
        secondaryCtaHref: `${basePath}/c/snacks`,
        pillarsTitle: "Habesha Spice & Pastry Tradition",
        pillars: [
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Sun-Dried Berbere",
            titleLine2: "Aromatic Warmth",
            description:
              "Mild chili warmth balanced with garlic, rue, and sweet korarima cardamom aromatics.",
          },
          {
            icon: <Droplets className="w-6 h-6" />,
            titleLine1: "Cold-Pressed Nug Oil",
            titleLine2: "Diamond Cut Crisp",
            description:
              "Hand-rolled and baked to deliver a shatteringly crisp texture without heavy grease.",
          },
          {
            icon: <HeartHandshake className="w-6 h-6" />,
            titleLine1: "Tikur Azmud Seeds",
            titleLine2: "Black Cumin Finish",
            description:
              "Nutty, peppery black seeds renowned for digestive wellness and festive hospitality.",
          },
        ],
      };
    } else if (permalink.includes("beso")) {
      heroProps = {
        badge: "BESO ENERGY CLUSTERS",
        titleLine1: "Wild Forest Honey",
        titleLine2: "Beso Energy Bites",
        description:
          "Ancient Ethiopian runner superfood — roasted highland barley flour (Beso) hand-rolled with raw organic acacia forest honey and golden toasted sesame seeds.",
        bgImageSrc: "/images/heroes/snacks-hero.jpg",
        bgImageAlt: "Ethiopian Beso and honey energy clusters",
        focalImageSrc: "/images/snacks/beso-clusters.jpg",
        focalImageAlt: "Wild Honey Beso Energy Clusters",
        focalImageIsCutout: false,
        ctaText: "Shop Beso Bites",
        ctaHref: "#category-products",
        secondaryCtaText: "All Snacks",
        secondaryCtaHref: `${basePath}/c/snacks`,
        pillarsTitle: "Highland Endurance Nutrition",
        pillars: [
          {
            icon: <Mountain className="w-6 h-6" />,
            titleLine1: "Roasted Barley Beso",
            titleLine2: "Complex Carbs",
            description:
              "Slow-burning sustainable energy cherished by legendary Ethiopian long-distance runners.",
          },
          {
            icon: <Droplets className="w-6 h-6" />,
            titleLine1: "Bale Rainforest",
            titleLine2: "Raw Wild Honey",
            description:
              "Pure unheated acacia honey bursting with live natural enzymes and floral sweetness.",
          },
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Toasted Sesame",
            titleLine2: "Mineral Rich",
            description:
              "High in calcium, iron, and healthy plant fats for a nutritious midday snack.",
          },
        ],
      };
    } else if (permalink.includes("seed") || permalink.includes("telba")) {
      heroProps = {
        badge: "HIGH-OMEGA SEED CRISPS",
        titleLine1: "Toasted Telba & Nug",
        titleLine2: "Artisan Seed Crisps",
        description:
          "Gourmet wafer crackers baked purely from whole roasted golden Ethiopian flaxseed (Telba) and niger seeds (Nug), lightly seasoned with volcanic salt.",
        bgImageSrc: "/images/heroes/snacks-hero.jpg",
        bgImageAlt: "Artisanal Ethiopian Telba seed crisps",
        focalImageSrc: "/images/snacks/telba-crisps.jpg",
        focalImageAlt: "Toasted Telba and Nug Seed Crisps",
        focalImageIsCutout: false,
        ctaText: "Shop Seed Crisps",
        ctaHref: "#category-products",
        secondaryCtaText: "All Snacks",
        secondaryCtaHref: `${basePath}/c/snacks`,
        pillarsTitle: "Ethiopian Oilseed Superfoods",
        pillars: [
          {
            icon: <Droplets className="w-6 h-6" />,
            titleLine1: "Plant Omega-3s",
            titleLine2: "High-Alpha Linolenic",
            description:
              "Ethiopian Telba contains one of nature's highest botanical concentrations of heart-healthy ALA.",
          },
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Prebiotic Fiber",
            titleLine2: "Gut Health Boost",
            description:
              "Whole ground flax and nug seeds deliver soluble mucilage fiber for healthy digestion.",
          },
          {
            icon: <Mountain className="w-6 h-6" />,
            titleLine1: "Naturally Grain-Free",
            titleLine2: "Keto Friendly",
            description:
              "100% plant-based seed crackers with clean, low-net-carb nutrition.",
          },
        ],
      };
    } else if (permalink.includes("pulse") || permalink.includes("shimbra")) {
      heroProps = {
        badge: "CRISPY HIGHLAND PULSES",
        titleLine1: "Crispy Smoked Shimbra",
        titleLine2: "Ember-Roasted Chickpeas",
        description:
          "Whole heirloom chickpeas slow-roasted over acacia embers and tossed with volcanic sea salt and wild mountain rosemary for a savory, high-protein bite.",
        bgImageSrc: "/images/heroes/snacks-hero.jpg",
        bgImageAlt: "Crispy smoked roasted chickpeas",
        focalImageSrc: "/images/snacks/smoked-shimbra.jpg",
        focalImageAlt: "Crispy Smoked Shimbra",
        focalImageIsCutout: false,
        ctaText: "Shop Roasted Shimbra",
        ctaHref: "#category-products",
        secondaryCtaText: "All Snacks",
        secondaryCtaHref: `${basePath}/c/snacks`,
        pillarsTitle: "High-Protein Highland Superfoods",
        pillars: [
          {
            icon: <Flame className="w-6 h-6" />,
            titleLine1: "Ember-Roasted",
            titleLine2: "Shattering Crunch",
            description:
              "Dry-roasted over embers to achieve irresistible crispiness without deep-frying.",
          },
          {
            icon: <Mountain className="w-6 h-6" />,
            titleLine1: "19g Plant Protein",
            titleLine2: "Heirloom Chickpeas",
            description:
              "Grown in nutrient-rich Shewa volcanic soils for exceptional mineral richness.",
          },
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Volcanic Rift Salt &",
            titleLine2: "Alpine Rosemary",
            description:
              "Fragrant mountain botanicals infuse every bite with an earthy, savory aroma.",
          },
        ],
      };
    } else {
      heroProps = {
        badge: undefined,
        titleLine1: "Authentic Ethiopian",
        titleLine2: "Organic Highland Snacks",
        description:
          "Ancient whole grains, sun-toasted oilseeds, and spiced artisan morsels native to Ethiopia — Heritage roasted Kolo, Berbere Dabo Kolo, wild honey Beso bites, Telba flax crisps, and ember-roasted Shimbra.",
        bgImageSrc: "/images/heroes/snacks-hero.jpg",
        bgImageAlt: "Artisan Ethiopian snacks with coffee ceremony setting",
        focalImageSrc: "/images/snacks/heritage-kolo.jpg",
        focalImageAlt: "Highland Heritage Kolo snack",
        focalImageIsCutout: false,
        ctaText: "Shop All Snacks",
        ctaHref: "#category-products",
        secondaryCtaText: "Specialty Coffees",
        secondaryCtaHref: `${basePath}/c/coffee`,
        pillarsTitle: "The Ethiopian Highland Snacking Heritage",
        pillars: [
          {
            icon: <Mountain className="w-6 h-6" />,
            titleLine1: "Ancient Highland Grains",
            titleLine2: "Barley & Heirloom Pulses",
            description:
              "Cultivated in volcanic highland soils and roasted on traditional mitad earthen cookware.",
          },
          {
            icon: <Droplets className="w-6 h-6" />,
            titleLine1: "Wild Acacia Honey &",
            titleLine2: "Native High-Omega Seeds",
            description:
              "Pure rainforest forest honey, organic Telba flax, and cold-pressed Nug seeds for clean energy.",
          },
          {
            icon: <HeartHandshake className="w-6 h-6" />,
            titleLine1: "The Buna Tetu Ritual",
            titleLine2: "Warm Hospitality",
            description:
              "Generational snacking traditions passed down to honor community, conversation, and coffee ceremonies.",
          },
        ],
      };
    }
  } else if (permalink.includes("single-origin")) {
    if (permalink.includes("yirgacheffe")) {
      heroProps = {
        badge: undefined,
        titleLine1: "Yirgacheffe Micro-Lots",
        titleLine2: "Jasmine & Bergamot",
        description:
          "Celebrated as the birthplace of floral coffee excellence. Grown at 2,000–2,200m in rich volcanic soil, delivering ethereal jasmine and tea-like elegance.",
        bgImageSrc: "/images/hero-mountain.jpg",
        bgImageAlt: "Ethiopian highlands mountain mist",
        focalImageSrc: "/images/products/chelbesa.jpg",
        focalImageAlt: "Chelbesa Yirgacheffe specialty coffee",
        focalImageIsCutout: false,
        ctaText: "Shop Yirgacheffe",
        ctaHref: "#category-products",
        secondaryCtaText: "Buna Ceremony",
        secondaryCtaHref: `${basePath}/c/buna-ceremony`,
        pillarsTitle: "Why Yirgacheffe is Revered Globally",
        pillars: [
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Ethereal Floral",
            titleLine2: "Jasmine Aromatics",
            description:
              "World-famous aromatics of jasmine blossom, lemon verbena, and sparkling bergamot tea.",
          },
          {
            icon: <Mountain className="w-6 h-6" />,
            titleLine1: "2,000–2,200m",
            titleLine2: "Highland Elevation",
            description:
              "Extreme mountain altitudes foster high bean density and crisp crystalline acidity.",
          },
          {
            icon: <HeartHandshake className="w-6 h-6" />,
            titleLine1: "Direct Washing",
            titleLine2: "Station Lots",
            description:
              "Traceable to individual mill sites like Chelbesa, ensuring uncompromising cup quality.",
          },
        ],
      };
    } else if (permalink.includes("guji")) {
      heroProps = {
        badge: undefined,
        titleLine1: "Guji Highland Harvests",
        titleLine2: "Stone Fruit & Wild Honey",
        description:
          "Ancient forests and volcanic red soils produce intensely sweet, complex cups with ripe peach, wild honey, and nectarine clarity.",
        bgImageSrc: "/images/hero-mountain.jpg",
        bgImageAlt: "Guji mountain ranges at dusk",
        focalImageSrc: "/images/products/dimtu-tora.jpg",
        focalImageAlt: "Dimtu Tora Guji specialty coffee",
        focalImageIsCutout: false,
        ctaText: "Shop Guji",
        ctaHref: "#category-products",
        secondaryCtaText: "Buna Ceremony",
        secondaryCtaHref: `${basePath}/c/buna-ceremony`,
        pillarsTitle: "The Guji Highland Character",
        pillars: [
          {
            icon: <SunMedium className="w-6 h-6" />,
            titleLine1: "Dense Volcanic",
            titleLine2: "Forest Soils",
            description:
              "Deep organic matter from indigenous semi-forest canopies imparts luscious sweetness.",
          },
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Peach, Honey &",
            titleLine2: "Hibiscus Nectar",
            description:
              "Layered cup profile of golden honey, ripe yellow peach, and delicate hibiscus acidity.",
          },
          {
            icon: <Flame className="w-6 h-6" />,
            titleLine1: "Modern Anaerobic",
            titleLine2: "& Classic Curing",
            description:
              "Pioneering anaerobic fermentation lots alongside pristine washed millings.",
          },
        ],
      };
    } else if (permalink.includes("sidama")) {
      heroProps = {
        badge: undefined,
        titleLine1: "Sidama Heirloom Roasts",
        titleLine2: "Ripe Berries & Cocoa",
        description:
          "Generational farming heritage yielding coffees with intense notes of sun-ripened strawberry, cane sugar, and rich chocolate ganache.",
        bgImageSrc: "/images/hero-mountain.jpg",
        bgImageAlt: "Sidama coffee hills at sunset",
        focalImageSrc: "/images/products/hamasho.jpg",
        focalImageAlt: "Hamasho Sidama specialty coffee",
        focalImageIsCutout: false,
        ctaText: "Shop Sidama",
        ctaHref: "#category-products",
        secondaryCtaText: "Buna Ceremony",
        secondaryCtaHref: `${basePath}/c/buna-ceremony`,
        pillarsTitle: "The Sidama Heritage Terroir",
        pillars: [
          {
            icon: <Mountain className="w-6 h-6" />,
            titleLine1: "Generational",
            titleLine2: "Garden Coffee",
            description:
              "Grown in biodiverse home gardens alongside enset banana and native shade trees.",
          },
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Sun-Dried Fruit &",
            titleLine2: "Dark Cocoa",
            description:
              "Bursting with sweet strawberry compote, lavender blossoms, and milk chocolate.",
          },
          {
            icon: <HeartHandshake className="w-6 h-6" />,
            titleLine1: "Cooperative",
            titleLine2: "Farmer Pride",
            description:
              "Decades of collective cooperative mastery in post-harvest selection.",
          },
        ],
      };
    } else if (permalink.includes("harrar")) {
      heroProps = {
        badge: undefined,
        titleLine1: "Harrar Longberry Harvests",
        titleLine2: "Wild Blueberry & Mocha",
        description:
          "Arid terraced highlands cultivating rare elongated Longberry genetics for over a millennium. Sun-cured in whole cherries for intense wild blueberry, dark cocoa, and cardamom spice.",
        bgImageSrc: "/images/hero-mountain.jpg",
        bgImageAlt: "Eastern Harar arid mountains at dusk",
        focalImageSrc: "/images/products/harrar.jpg",
        focalImageAlt: "Harrar Wild Horse specialty coffee",
        focalImageIsCutout: false,
        ctaText: "Shop Harrar",
        ctaHref: "#category-products",
        secondaryCtaText: "Buna Ceremony",
        secondaryCtaHref: `${basePath}/c/buna-ceremony`,
        pillarsTitle: "The Ancient Harrar Heritage",
        pillars: [
          {
            icon: <SunMedium className="w-6 h-6" />,
            titleLine1: "Arid Desert Sun",
            titleLine2: "Dry-Cured Cherry",
            description:
              "Equatorial arid mountain heat slowly concentrates sugars inside the intact fruit.",
          },
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Elongated Longberry",
            titleLine2: "Genetic Rarity",
            description:
              "Distinctive pointed bean structure prized worldwide for heavy syrupy body.",
          },
          {
            icon: <Flame className="w-6 h-6" />,
            titleLine1: "Wild Blueberry &",
            titleLine2: "Dark Baker's Mocha",
            description:
              "Unmistakable aroma of simmering blueberry compote and bittersweet raw cacao.",
          },
        ],
      };
    } else if (permalink.includes("limu") || permalink.includes("kaffa")) {
      heroProps = {
        badge: undefined,
        titleLine1: "Kaffa & Limu Ancient Forests",
        titleLine2: "Wild Mother Tree Harvests",
        description:
          "Sourced from the UNESCO Kaffa Biosphere Reserve — the sacred botanical origin where Coffea Arabica was discovered. Foraged under ancient rainforest canopies for unmatched primordial depth.",
        bgImageSrc: "/images/hero-mountain.jpg",
        bgImageAlt: "Kaffa ancient cloud forest canopy",
        focalImageSrc: "/images/products/kaffa.jpg",
        focalImageAlt: "Kaffa Ancient Forest specialty coffee",
        focalImageIsCutout: false,
        ctaText: "Shop Kaffa",
        ctaHref: "#category-products",
        secondaryCtaText: "Buna Ceremony",
        secondaryCtaHref: `${basePath}/c/buna-ceremony`,
        pillarsTitle: "The Sacred Mother Trees of Kaffa",
        pillars: [
          {
            icon: <Mountain className="w-6 h-6" />,
            titleLine1: "Birthplace of Arabica",
            titleLine2: "UNESCO Biosphere",
            description:
              "Harvested from wild mother trees thriving undisturbed for thousands of years.",
          },
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Black Fig, Plum &",
            titleLine2: "Sacred Cedar Notes",
            description:
              "Deep forest profile laden with wild blackberries, spiced figs, and frankincense cedar.",
          },
          {
            icon: <HeartHandshake className="w-6 h-6" />,
            titleLine1: "Wild Forager Guilds",
            titleLine2: "Canopy Stewardship",
            description:
              "Preserving Ethiopia's virgin rainforest through direct-trade community equity.",
          },
        ],
      };
    } else {
      heroProps = {
        badge: undefined,
        titleLine1: "Single-Origin Varieties",
        titleLine2: "& Indigenous Landraces",
        description:
          "Exceptional unblended micro-lots cultivated above 2,000 meters in mineral-dense volcanic soils across Yirgacheffe, Guji, and Sidama.",
        bgImageSrc: "/images/hero-mountain.jpg",
        bgImageAlt: "Ethiopian mountain highlands at dusk",
        focalImageSrc: "/images/products/chelbesa.jpg",
        focalImageAlt: "Chelbesa single origin coffee",
        focalImageIsCutout: false,
        ctaText: "Shop Single-Origins",
        ctaHref: "#category-products",
        secondaryCtaText: "Buna Ceremony",
        secondaryCtaHref: `${basePath}/c/buna-ceremony`,
        pillarsTitle: "The Power of Ethiopian Terroir",
        pillars: [
          {
            icon: <Mountain className="w-6 h-6" />,
            titleLine1: "2,000+ Meters",
            titleLine2: "Extreme Elevation",
            description:
              "High mountain elevations slow maturation, packing dense beans with floral aromatics and fruit sugars.",
          },
          {
            icon: <Sparkles className="w-6 h-6" />,
            titleLine1: "Indigenous Kurume,",
            titleLine2: "Dega & 74110 Varieties",
            description:
              "Ancient forest varieties native to southwestern Ethiopia offering unparalleled genetic cup complexity.",
          },
          {
            icon: <HeartHandshake className="w-6 h-6" />,
            titleLine1: "Single-Station",
            titleLine2: "Transparent Lots",
            description:
              "Direct-trade relationships ensure complete traceability to individual washing stations and growers.",
          },
        ],
      };
    }
  } else if (permalink.includes("washed")) {
    heroProps = {
      badge: undefined,
      titleLine1: "Washed Process Coffees",
      titleLine2: "Floral Aromas & Clarity",
      description:
        "Depulped and fermented in pristine mountain spring water, showcasing crystalline cup clarity, fragrant jasmine blossoms, and crisp citrus brightness.",
      bgImageSrc: "/images/hero-mountain.jpg",
      bgImageAlt: "Ethiopian highlands mountain mist",
      focalImageSrc: "/images/products/benti-neka.jpg",
      focalImageAlt: "Benti Neka Washed coffee",
      focalImageIsCutout: false,
      ctaText: "Shop Washed Coffees",
      ctaHref: "#category-products",
      secondaryCtaText: "Buna Ceremony",
      secondaryCtaHref: `${basePath}/c/buna-ceremony`,
      pillarsTitle: "Purity of Washed Processing",
      pillars: [
        {
          icon: <Droplets className="w-6 h-6" />,
          titleLine1: "Cold Spring Water",
          titleLine2: "Slow Fermentation",
          description:
            "Slow 36-to-48 hour fermentation dissolves fruit mucilage while locking in delicate floral volatile oils.",
        },
        {
          icon: <Sparkles className="w-6 h-6" />,
          titleLine1: "Jasmine Blossom &",
          titleLine2: "Bergamot Clarity",
          description:
            "Celebrated worldwide for tea-like translucence, fragrant jasmine bouquets, and candied lemon notes.",
        },
        {
          icon: <SunMedium className="w-6 h-6" />,
          titleLine1: "Shaded African",
          titleLine2: "Raised Mesh Beds",
          description:
            "Turned by hand several times daily to achieve consistent moisture loss and uniform bean density.",
        },
      ],
    };
  } else if (permalink.includes("natural")) {
    heroProps = {
      badge: undefined,
      titleLine1: "Natural Process Coffees",
      titleLine2: "Wild Berries & Syrupy Nectar",
      description:
        "Whole coffee cherries sun-dried slowly on raised mesh beds for up to four weeks, infusing intense sweetness, wild blueberries, and dark cocoa into each seed.",
      bgImageSrc: "/images/hero-mountain.jpg",
      bgImageAlt: "Ethiopian highlands sunset",
      focalImageSrc: "/images/products/hamasho.jpg",
      focalImageAlt: "Hamasho Natural coffee",
      focalImageIsCutout: false,
      ctaText: "Shop Natural Coffees",
      ctaHref: "#category-products",
      secondaryCtaText: "Buna Ceremony",
      secondaryCtaHref: `${basePath}/c/buna-ceremony`,
      pillarsTitle: "The Depth of Natural Processing",
      pillars: [
        {
          icon: <SunMedium className="w-6 h-6" />,
          titleLine1: "21–28 Days Intact",
          titleLine2: "Sun-Drying Method",
          description:
            "Ripe coffee cherries dry intact under equatorial sun, allowing rich natural mucilage sugars to seep into the seed.",
        },
        {
          icon: <Sparkles className="w-6 h-6" />,
          titleLine1: "Wild Blueberries &",
          titleLine2: "Lavender Nectar",
          description:
            "Unfiltered fruit aromatics delivering jammy blueberries, strawberries, ripe stone fruits, and dark chocolate.",
        },
        {
          icon: <Flame className="w-6 h-6" />,
          titleLine1: "Heavy Coating",
          titleLine2: "Syrupy Mouthfeel",
          description:
            "Rich, luscious mouthfeel with balanced wine-like acidity and an enduring sweet finish.",
        },
      ],
    };
  } else if (permalink.includes("roast")) {
    heroProps = {
      badge: undefined,
      titleLine1: "Artisanal Roast Profiles",
      titleLine2: "Heritage Ethiopian Roasts",
      description:
        "From delicate, floral cinnamon roasts preserving high-altitude citrus acidity to deep, caramelized dark roasts perfected for the traditional stovetop Jebena.",
      bgImageSrc: "/images/hero-mountain.jpg",
      bgImageAlt: "Ethiopian highlands coffee roastery",
      focalImageSrc: "/images/products/djimmah.jpg",
      focalImageAlt: "Djimmah Traditional Roast specialty coffee",
      focalImageIsCutout: false,
      ctaText: "Shop Roast Profiles",
      ctaHref: "#category-products",
      secondaryCtaText: "Buna Ceremony",
      secondaryCtaHref: `${basePath}/c/buna-ceremony`,
      pillarsTitle: "Roasting Mastery for Ethiopian Beans",
      pillars: [
        {
          icon: <Flame className="w-6 h-6" />,
          titleLine1: "Origin-Calibrated",
          titleLine2: "Thermal Profiling",
          description:
            "Custom heat curves respect dense high-altitude seed cell walls to preserve vibrant origin terroir.",
        },
        {
          icon: <Sparkles className="w-6 h-6" />,
          titleLine1: "Floral to Cocoa",
          titleLine2: "Flavor Expression",
          description:
            "Highlighting delicate jasmine at light roasts and rich dark chocolate at deeper roasts.",
        },
        {
          icon: <HeartHandshake className="w-6 h-6" />,
          titleLine1: "Traditional & Modern",
          titleLine2: "Brew Versatility",
          description:
            "Tailored roasts optimized for pour-over, espresso, or traditional Jebena boiling.",
        },
      ],
    };
  } else if (permalink.includes("green")) {
    heroProps = {
      badge: undefined,
      titleLine1: "Raw Green Coffee Lots",
      titleLine2: "Grade 1 Unroasted Micro-Lots",
      description:
        "Pristine, high-altitude raw Arabica beans directly imported from Ethiopia's premier micro-regions for home roasters and artisan coffee craftspeople.",
      bgImageSrc: "/images/hero-mountain.jpg",
      bgImageAlt: "Ethiopian green coffee harvest",
      focalImageSrc: "/images/products/green-coffee.jpg",
      focalImageAlt: "Yirgacheffe Raw Green Coffee Grade 1",
      focalImageIsCutout: false,
      ctaText: "Shop Green Coffee",
      ctaHref: "#category-products",
      secondaryCtaText: "Roast Profiles",
      secondaryCtaHref: `${basePath}/c/roast-profiles`,
      pillarsTitle: "Artisanal Roasting at Home",
      pillars: [
        {
          icon: <SunMedium className="w-6 h-6" />,
          titleLine1: "Direct-Trade",
          titleLine2: "Grade 1 Purity",
          description:
            "Meticulously sorted raw beans with zero primary defects and optimal moisture balance.",
        },
        {
          icon: <Mountain className="w-6 h-6" />,
          titleLine1: "Extreme Altitude",
          titleLine2: "Bean Density",
          description:
            "Grown above 2,000 meters for rock-solid density that withstands high roasting heat.",
        },
        {
          icon: <Flame className="w-6 h-6" />,
          titleLine1: "Traditional Pan or",
          titleLine2: "Modern Roaster",
          description:
            "Perfect for roasting in an authentic iron Menkeskesha pan or drum roaster.",
        },
      ],
    };
  }

  return (
    <>
      <PageHeroSection
        badge={heroProps.badge}
        titleLine1={heroProps.titleLine1}
        titleLine2={heroProps.titleLine2}
        description={heroProps.description}
        ctaText={heroProps.ctaText}
        ctaHref={heroProps.ctaHref}
        secondaryCtaText={heroProps.secondaryCtaText}
        secondaryCtaHref={heroProps.secondaryCtaHref}
        bgImageSrc={heroProps.bgImageSrc}
        bgImageAlt={heroProps.bgImageAlt}
        focalImageSrc={heroProps.focalImageSrc}
        focalImageAlt={heroProps.focalImageAlt}
        focalImageIsCutout={heroProps.focalImageIsCutout}
        pillarsTitle={heroProps.pillarsTitle}
        pillars={heroProps.pillars}
      />

      {/* Subcategories Pills */}
      {category.children && category.children.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-wrap gap-2 items-center border-b border-stone-200/80 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 mr-2">
              {permalink === "coffee" ||
              permalink.endsWith("/coffee") ||
              permalink === "hair" ||
              permalink.endsWith("/hair")
                ? "Classifications:"
                : "Regions:"}
            </span>
            {category.children.map((child) => (
              <Link
                key={child.id}
                href={`${basePath}/c/${child.permalink}`}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-stone-100 hover:bg-[#a37947] hover:text-white text-stone-700 transition-colors"
              >
                {child.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
