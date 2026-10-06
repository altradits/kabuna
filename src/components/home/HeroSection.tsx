import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  basePath: string;
  locale: string;
}

export async function HeroSection({ basePath, locale }: HeroSectionProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });

  return (
    <section className="relative overflow-hidden bg-stone-950 text-stone-100 border-b border-amber-950/40 min-h-[520px] flex items-center">
      {/* Ambient background glows */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-amber-600/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-orange-600/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-1/3 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Description & One-Word Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Taste the Birthplace of Coffee,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                Freshly Roasted.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg md:text-xl text-stone-300 max-w-2xl leading-relaxed">
              {t("heroDescription") ||
                "Hand-picked heirloom Arabica from generational family farms across Yirgacheffe, Guji, Sidama, and Harrar. Sourced direct-trade, roasted to order, and shipped fresh to your cup."}
            </p>

            {/* Action Buttons: strictly ONE word per button */}
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                asChild
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-8 h-12 text-base shadow-lg shadow-amber-500/20 flex-1 sm:flex-initial cursor-pointer"
              >
                <Link href={`${basePath}/products`}>Shop</Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-stone-700 bg-stone-900/70 hover:bg-stone-800 text-stone-100 font-semibold px-8 h-12 text-base flex-1 sm:flex-initial cursor-pointer"
              >
                <Link href={`${basePath}/c/single-origin`}>Explore</Link>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                asChild
                className="text-stone-300 hover:text-amber-300 hover:bg-stone-900 font-semibold px-8 h-12 text-base w-full sm:w-auto cursor-pointer"
              >
                <Link href={`${basePath}/c/buna-ceremony`}>Ceremony</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Hero Image Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-amber-950/50 bg-stone-900 group">
              <div className="relative aspect-[4/3] sm:aspect-[1/1] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85"
                  alt="Authentic Ethiopian specialty coffee freshly brewed"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 550px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              </div>

              <div className="p-5 bg-stone-900/95 backdrop-blur-md border-t border-stone-800">
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  Yirgacheffe Misty Valley Natural
                </h3>
                <p className="mt-1 text-xs text-stone-300 line-clamp-1">
                  Aromatics: Jasmine floral, ripe blueberry & bergamot citrus.
                </p>
                <div className="mt-3 flex items-center justify-between pt-3 border-t border-stone-800/80">
                  <span className="text-sm font-bold text-amber-300">
                    $22.00
                  </span>
                  <Link
                    href={`${basePath}/products/yirgacheffe-misty-valley-grade-1`}
                    className="text-xs font-semibold text-white hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    Buy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
