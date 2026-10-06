import { Flame, HeartHandshake, ShieldCheck } from "lucide-react";
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
    <section className="relative overflow-hidden bg-stone-950 text-stone-100 border-b border-amber-950/40 min-h-[600px] flex items-center">
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

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & One-Word Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Origin & Heritage Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-inner mb-6">
              <span>የኢትዮጵያ ምርጥ ቡና • Specialty Grade 1 Ethiopian Coffee</span>
            </div>

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

            {/* Specialty Coffee Value Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-300">
              <div className="flex items-center gap-1.5 bg-stone-900/80 border border-stone-800 px-3 py-1.5 rounded-lg">
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-amber-200">SCA 87+</span>
                <span>Specialty Grade</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-900/80 border border-stone-800 px-3 py-1.5 rounded-lg">
                <HeartHandshake className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-amber-200">100%</span>
                <span>Direct Trade</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-900/80 border border-stone-800 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-amber-200">
                  Fresh Roast
                </span>
                <span>Within 48h</span>
              </div>
            </div>

            {/* Action Buttons: strictly ONE word per button */}
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                asChild
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-8 h-12 text-base shadow-lg shadow-amber-500/20 flex-1 sm:flex-initial"
              >
                <Link href={`${basePath}/products`}>Shop</Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-stone-700 bg-stone-900/70 hover:bg-stone-800 text-stone-100 font-semibold px-8 h-12 text-base flex-1 sm:flex-initial"
              >
                <Link href={`${basePath}/c/single-origin`}>Explore</Link>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                asChild
                className="text-stone-300 hover:text-amber-300 hover:bg-stone-900 font-semibold px-8 h-12 text-base w-full sm:w-auto"
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

                <div className="absolute top-3 right-3 bg-stone-900/90 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  In Stock • Fresh Roast
                </div>
              </div>

              <div className="p-5 bg-stone-900/95 backdrop-blur-md border-t border-stone-800">
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                  <span>Featured Lot</span>
                  <span className="text-stone-400">SCA 88.5 pts</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  Yirgacheffe Misty Valley (Grade 1 Natural)
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
                    className="text-xs font-semibold text-white hover:text-amber-300 flex items-center gap-1"
                  >
                    Buy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Micro-origin Pill Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex items-center justify-center gap-3 sm:gap-6 flex-wrap text-xs sm:text-sm font-semibold text-stone-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-stone-300">Yirgacheffe</span>
            <span className="text-stone-500">(Floral & Bergamot)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            <span className="text-stone-300">Guji</span>
            <span className="text-stone-500">(Peach & Nectar)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span className="text-stone-300">Sidama</span>
            <span className="text-stone-500">(Sweet Strawberry)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span className="text-stone-300">Harrar</span>
            <span className="text-stone-500">(Wild Mocha)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-stone-300">Kaffa</span>
            <span className="text-stone-500">(Ancient Forest)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
