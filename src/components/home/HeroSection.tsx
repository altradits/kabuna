import { Coffee, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { getStoreName } from "@/lib/store";

interface HeroSectionProps {
  basePath: string;
  locale: string;
}

export async function HeroSection({ basePath, locale }: HeroSectionProps) {
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "home",
  });
  const storeName = getStoreName();

  return (
    <section className="relative overflow-hidden border-b border-amber-900/10 bg-linear-to-b from-amber-50/60 via-stone-50 to-white min-h-[560px] flex items-center">
      {/* Decorative ambient coffee steam glow */}
      <div
        className="absolute top-0 right-1/4 -mt-16 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-amber-400/10 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Origin Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold tracking-wide uppercase shadow-2xs mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Direct Trade • Ethiopian Heirloom Arabica • ካቡና</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.15]">
            From the Cradle of Coffee,{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-800 via-amber-700 to-amber-900">
              Roasted for Your Cup.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {t("heroDescription") ||
              "Single-origin specialty coffees sourced directly from generational smallholder farms across Yirgacheffe, Guji, Sidama, Harrar, and Limu."}
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Button
              size="lg"
              asChild
              className="bg-amber-900 hover:bg-amber-800 text-amber-50 shadow-md font-semibold px-8 h-12 text-base"
            >
              <Link href={`${basePath}/products`}>
                <Coffee className="w-4 h-4 mr-2" />
                {t("shopNow")}
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-stone-300 bg-white/80 hover:bg-stone-100 text-stone-800 font-semibold h-12 text-base"
            >
              <Link href={`${basePath}/c/single-origin`}>
                <MapPin className="w-4 h-4 mr-2 text-amber-700" />
                Explore Origins
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              asChild
              className="text-stone-700 hover:text-amber-900 hover:bg-amber-50 font-semibold h-12 text-base"
            >
              <Link href={`${basePath}/c/buna-ceremony`}>
                Buna Ceremony Sets &rarr;
              </Link>
            </Button>
          </div>

          {/* Micro-origin Pill Bar */}
          <div className="mt-14 pt-8 border-t border-stone-200/80 flex items-center justify-center gap-3 sm:gap-6 flex-wrap text-xs sm:text-sm font-semibold text-stone-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>Yirgacheffe (Floral)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-600" />
              <span>Guji (Stone Fruit)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <span>Sidama (Sweet Berry)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-stone-700" />
              <span>Harrar (Wild Mocha)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Kaffa (Forest Wild)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
