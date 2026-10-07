import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { SupportedLocale } from "@/i18n/locales";

interface HeroSectionProps {
  basePath: string;
  locale: string;
}

export async function HeroSection({ basePath, locale }: HeroSectionProps) {
  const t = await getTranslations({
    locale: locale as SupportedLocale,
    namespace: "home",
  });

  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Banner: Highlands Origin Landscape */}
      <section className="relative w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[600px] flex items-center bg-stone-950 text-white overflow-visible">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-mountain.jpg"
            alt="Majestic Ethiopian highlands mountain landscape at twilight"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-black/20" />
        </div>

        {/* Hero Left Content */}
        <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-28">
          <div className="max-w-xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.15]">
              <span>{t("heroTitleLine1")}</span>
              <br />
              <span>{t("heroTitleLine2")}</span>
            </h1>

            <div className="mt-8 sm:mt-10">
              <Link
                href={`${basePath}/products`}
                className="inline-flex items-center justify-center rounded-full bg-[#a37947] hover:bg-[#8e6534] text-white px-8 py-3.5 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {t("orderNow")}
              </Link>
            </div>
          </div>
        </div>

        {/* Focal Image: Ceramic Cup Overlapping Hero Banner and Feature Section */}
        <div className="absolute right-4 sm:right-10 md:right-14 lg:right-20 bottom-[-45px] sm:bottom-[-70px] md:bottom-[-95px] lg:bottom-[-125px] w-48 sm:w-64 md:w-80 lg:w-[410px] z-20 pointer-events-none drop-shadow-2xl">
          <Image
            src="/images/hero-cup.png"
            alt="Freshly brewed artisan latte in ceramic cup on wooden tray"
            width={512}
            height={512}
            priority
            className="w-full h-auto select-none"
          />
        </div>
      </section>

      {/* Bottom Section: Why choose us? */}
      <section className="relative z-10 bg-[#f4efe8] border-b border-stone-200/70 pt-16 sm:pt-20 lg:pt-24 pb-14 sm:pb-16 lg:pb-20">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-stone-900 tracking-tight mb-8 sm:mb-10 lg:mb-12">
            {t("whyChooseUs")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {/* Feature 1: High-quality ingredients */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3.5 mb-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-[#a37947] shrink-0"
                  aria-hidden="true"
                >
                  <path d="M18.8 6.2c-2.4-2.4-6.3-2.4-8.7 0l-.3.3c-2.4 2.4-2.4 6.3 0 8.7l.3.3c2.4 2.4 6.3 2.4 8.7 0s2.4-6.3 0-8.7zm-1.4 7.3c-.6.6-1.5.8-2.3.5-1.1-.4-2.2-1.5-2.6-2.6-.3-.8-.1-1.7.5-2.3.6-.6 1.5-.8 2.3-.5 1.1.4 2.2 1.5 2.6 2.6.3.8.1 1.7-.5 2.3z" />
                  <path
                    d="M5.5 13.5c-2-2-2-5.2 0-7.2.5-.5 1.1-.8 1.8-1 0 .6.2 1.2.6 1.7.6.7 1.5 1.2 2.5 1.5-.2 1.2-.8 2.4-1.7 3.3l-.2.2c-.9.9-2 1.4-3 1.5z"
                    opacity="0.85"
                  />
                </svg>
                <h3 className="font-medium text-stone-900 text-base sm:text-lg leading-tight">
                  {t("featureIngredientsTitle1")}
                  <br />
                  {t("featureIngredientsTitle2")}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                {t("featureIngredientsDesc")}
              </p>
            </div>

            {/* Feature 2: Professional baristas / roasting */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3.5 mb-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-[#a37947] shrink-0"
                  aria-hidden="true"
                >
                  <path d="M9 11a4 4 0 100-8 4 4 0 000 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  <path
                    d="M17.5 10a3 3 0 100-6 3 3 0 000 6zm0 2c-.92 0-1.8.21-2.58.58 1.34.88 2.25 2.26 2.5 3.92H22v-1.5c0-1.99-3-3-4.5-3z"
                    opacity="0.85"
                  />
                </svg>
                <h3 className="font-medium text-stone-900 text-base sm:text-lg leading-tight">
                  {t("featureBaristasTitle1")}
                  <br />
                  {t("featureBaristasTitle2")}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                {t("featureBaristasDesc")}
              </p>
            </div>

            {/* Feature 3: Friendly atmosphere / Buna hospitality */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3.5 mb-3">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-[#a37947] shrink-0"
                  aria-hidden="true"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <h3 className="font-medium text-stone-900 text-base sm:text-lg leading-tight">
                  {t("featureAtmosphereTitle1")}
                  <br />
                  {t("featureAtmosphereTitle2")}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                {t("featureAtmosphereDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
