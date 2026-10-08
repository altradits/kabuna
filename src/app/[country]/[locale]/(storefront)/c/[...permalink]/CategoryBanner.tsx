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
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

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
    badge: "CURATED ETHIOPIAN COLLECTION",
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
      badge: "ANCIENT COFFEE RITUAL",
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
  } else if (permalink.includes("single-origin")) {
    if (permalink.includes("yirgacheffe")) {
      heroProps = {
        badge: "YIRGACHEFFE HIGHLAND ZONE",
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
        badge: "GUJI VOLCANIC HIGHLANDS",
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
        badge: "SIDAMA ARORESA VALLEY",
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
    } else {
      heroProps = {
        badge: "UNBLENDED HIGHLAND HARVESTS",
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
      badge: "SPRING WATER FERMENTATION",
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
      badge: "EQUATORIAL SUN-DRIED WHOLE CHERRY",
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
        breadcrumbs={
          <div className="[&_span]:text-stone-300 [&_a]:text-stone-300 [&_a:hover]:text-white [&_svg]:text-stone-400 [&_nav]:mb-0">
            <Breadcrumbs
              category={category}
              basePath={basePath}
              locale={locale}
            />
          </div>
        }
        pillarsTitle={heroProps.pillarsTitle}
        pillars={heroProps.pillars}
      />

      {/* Subcategories Pills */}
      {category.children && category.children.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-wrap gap-2 items-center border-b border-stone-200/80 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 mr-2">
              Regions:
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
