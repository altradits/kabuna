import Image from "next/image";
import Link from "next/link";

interface EthiopianOriginsSectionProps {
  basePath: string;
}

const REGIONS = [
  {
    name: "Yirgacheffe",
    amharic: "ይርጋጨፌ",
    elevation: "1,950 - 2,200m",
    notes: ["Jasmine Floral", "Bergamot Tea", "Blueberry", "Meyer Lemon"],
    process: "Washed & Natural",
    tagline: "The crown jewel of floral aromatics",
    slug: "single-origin/yirgacheffe",
    bgColor: "bg-amber-50/80 border-amber-200",
    badgeColor: "bg-amber-100 text-amber-800",
    image:
      "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Guji Zone",
    amharic: "ጉጂ",
    elevation: "2,050 - 2,300m",
    notes: ["Orange Blossom", "White Peach", "Wild Honey", "Black Tea"],
    process: "Natural & Washed",
    tagline: "Volcanic soils producing exotic nectar sweetness",
    slug: "single-origin/guji",
    bgColor: "bg-orange-50/80 border-orange-200",
    badgeColor: "bg-orange-100 text-orange-800",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sidama (Sidamo)",
    amharic: "ሲዳማ",
    elevation: "1,900 - 2,150m",
    notes: ["Strawberry Jam", "Milk Chocolate", "Vanilla", "Cane Sugar"],
    process: "Sun-Dried Natural",
    tagline: "Famous for luscious berry compote & balanced body",
    slug: "single-origin/sidama",
    bgColor: "bg-rose-50/80 border-rose-200",
    badgeColor: "bg-rose-100 text-rose-800",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Harrar Longberry",
    amharic: "ሐረር",
    elevation: "1,600 - 1,850m",
    notes: ["Wild Blueberry", "Dark Mocha", "Cardamom", "Winey Body"],
    process: "Dry Natural Heirloom",
    tagline: "Arid highlands delivering wild winey mocha intensity",
    slug: "single-origin/harrar",
    bgColor: "bg-stone-50/80 border-stone-200",
    badgeColor: "bg-stone-200 text-stone-800",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Kaffa & Limu",
    amharic: "ካፋ / ሊሙ",
    elevation: "1,750 - 2,100m",
    notes: ["Wild Forest Berries", "Spiced Apple", "Dried Fig", "Cedar"],
    process: "Wild Harvest & Washed",
    tagline: "The historic botanical birthplace of Coffea Arabica",
    slug: "single-origin/limu-kaffa",
    bgColor: "bg-emerald-50/80 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-800",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80",
  },
];

export function EthiopianOriginsSection({
  basePath,
}: EthiopianOriginsSectionProps) {
  return (
    <section className="py-20 bg-neutral-50/50 border-b border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Explore Ethiopian Coffee Origins
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            Each coffee growing region of Ethiopia is an ecosystem unto itself.
            High altitudes, heirloom varieties dating back millennia, and
            artisanal sun-drying produce flavors found nowhere else on earth.
          </p>
        </div>

        {/* Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REGIONS.map((region) => (
            <div
              key={region.name}
              className={`group rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${region.bgColor}`}
            >
              <div>
                {/* Photo Banner */}
                <div className="relative h-44 -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-2xl">
                  <Image
                    src={region.image}
                    alt={region.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md ${region.badgeColor}`}
                    >
                      {region.amharic}
                    </span>
                    <span className="text-xs font-semibold text-white drop-shadow-sm">
                      {region.elevation}
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">
                      {region.name}
                    </h3>
                  </div>
                  <div className="text-right text-xs font-medium text-neutral-500">
                    <span>{region.process}</span>
                  </div>
                </div>

                <p className="mt-2 text-sm text-neutral-600 font-medium italic">
                  &ldquo;{region.tagline}&rdquo;
                </p>

                <div className="mt-4 pt-4 border-t border-neutral-200/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                    Cupping Flavor Profile
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {region.notes.map((note) => (
                      <span
                        key={note}
                        className="inline-block bg-white/90 text-neutral-800 text-xs px-2.5 py-1 rounded-md border border-neutral-200/70 shadow-2xs font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-2">
                <Link
                  href={`${basePath}/c/${region.slug}`}
                  className="inline-flex items-center text-xs font-bold text-amber-900 hover:text-amber-700 transition-colors uppercase tracking-wider"
                >
                  Shop {region.name} Beans &rarr;
                </Link>
              </div>
            </div>
          ))}

          {/* Buna Ceremony Callout Card */}
          <div className="group rounded-2xl border border-stone-800 bg-stone-900 text-stone-100 p-6 flex flex-col justify-between shadow-xl">
            <div>
              {/* Photo Banner */}
              <div className="relative h-44 -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80"
                  alt="Traditional Ethiopian Buna Ceremony"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-500/80 text-white text-xs font-semibold backdrop-blur-md">
                    የቡና ማፍላት ሥነ-ሥርዓት
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white">
                The Sacred Buna Ceremony
              </h3>
              <p className="mt-2 text-sm text-stone-300 leading-relaxed">
                In Ethiopia, coffee isn&apos;t just drank — it is celebrated.
                The 3-round Buna ritual brings family, friends, and neighbors
                together in peaceful fellowship.
              </p>
              <div className="mt-4 space-y-2 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-400">
                    1. Abol (አቦል):
                  </span>{" "}
                  First, bold awakening brew
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-400">
                    2. Tona (ቶና):
                  </span>{" "}
                  Second, deep conversation
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-400">
                    3. Baraka (በረካ):
                  </span>{" "}
                  Final, blessings & peace
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800">
              <Link
                href={`${basePath}/c/buna-ceremony`}
                className="inline-flex items-center text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider"
              >
                Get Traditional Jebena Kit &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
