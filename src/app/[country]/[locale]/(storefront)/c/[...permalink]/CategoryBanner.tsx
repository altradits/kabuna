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
              {permalink === "coffee" || permalink.endsWith("/coffee")
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
