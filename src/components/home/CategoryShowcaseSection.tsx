import { ArrowRight, Coffee, Sparkles, Wheat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CategoryShowcaseSectionProps {
  basePath: string;
}

const DEPARTMENTS = [
  {
    id: "coffee",
    title: "Coffee & Ceremony Wares",
    subtitle: "17 Coffees & Ritual Artifacts",
    description:
      "Direct-trade single-origin Arabica from Yirgacheffe, Guji & Kaffa alongside authentic clay Jebena pots and ceremony heirlooms.",
    image: "/images/products/chelbesa.jpg",
    alt: "Kabuna specialty Ethiopian coffee and traditional Jebena pot",
    href: "/c/coffee",
    icon: Coffee,
    badgeText: "17 Curated Heirlooms",
    accentBg: "bg-amber-950/60",
    accentBorder: "border-amber-700/40",
  },
  {
    id: "snacks",
    title: "Organic Highland Snacks",
    subtitle: "5 Native Grain & Seed Snacks",
    description:
      "Heritage roasted Kolo grains, Berbere Dabo Kolo, wild honey Beso bites, Telba flax crisps & smoked Shimbra.",
    image: "/images/heroes/snacks-hero.jpg",
    alt: "Artisanal Ethiopian snacks with traditional Jebena and Buna table",
    href: "/c/snacks",
    icon: Wheat,
    badgeText: "Native Superfoods",
    accentBg: "bg-amber-950/60",
    accentBorder: "border-amber-700/40",
    featuredBadge: "NEW COLLECTION",
  },
  {
    id: "hair",
    title: "Organic Habesha Hair Care",
    subtitle: "5 Native Highland Botanicals",
    description:
      "YeTsehur Kibe herbal butter, cold-pressed Nug scalp elixirs, wild Endod cleansers & carved Wanza combs.",
    image: "/images/heroes/hair-hero.jpg",
    alt: "Ethiopian woman with healthy textured hair and botanical hair products",
    href: "/c/hair",
    icon: Sparkles,
    badgeText: "Native Botanicals",
    accentBg: "bg-emerald-950/60",
    accentBorder: "border-emerald-700/40",
  },
];

export function CategoryShowcaseSection({
  basePath,
}: CategoryShowcaseSectionProps) {
  return (
    <section className="bg-stone-50/80 border-b border-stone-200/70 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#a37947]">
              Curated Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 mt-1 tracking-tight font-normal">
              Explore by Department
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md mt-2 md:mt-0">
            From volcanic single-origin coffee and sacred ceremony wares to
            native highland snacks and ancestral organic hair care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {DEPARTMENTS.map((dept) => {
            const Icon = dept.icon;
            return (
              <Link
                key={dept.id}
                href={`${basePath}${dept.href}`}
                className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-stone-900 min-h-[380px] sm:min-h-[420px] p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-black/5 hover:ring-[#a37947]/40"
              >
                {/* Background Image with Zoom on Hover */}
                <Image
                  src={dept.image}
                  alt={dept.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-black/20 group-hover:via-stone-950/50 transition-colors" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between mb-auto">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white/95 backdrop-blur-md ${dept.accentBg} border ${dept.accentBorder}`}
                  >
                    <Icon className="w-3.5 h-3.5 text-[#e4b982]" />
                    {dept.badgeText}
                  </span>
                  {dept.featuredBadge && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-stone-950">
                      {dept.featuredBadge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10 pt-6">
                  <span className="text-xs font-medium tracking-wide uppercase text-[#e4b982]">
                    {dept.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-white mt-1 group-hover:text-[#f3d9b8] transition-colors leading-tight">
                    {dept.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300/90 mt-2 line-clamp-2 leading-relaxed">
                    {dept.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-white group-hover:text-[#e4b982] transition-colors">
                    <span>Discover Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
