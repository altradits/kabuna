import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export interface HeroPillar {
  icon: ReactNode;
  titleLine1: string;
  titleLine2?: string;
  description: string;
}

export interface PageHeroSectionProps {
  badge?: string;
  titleLine1: string;
  titleLine2?: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  bgImageSrc: string;
  bgImageAlt: string;
  focalImageSrc: string;
  focalImageAlt: string;
  focalImageWidth?: number;
  focalImageHeight?: number;
  /** Set to true for transparent PNG cutouts (e.g., hero-cup.png), or false for photographic badges */
  focalImageIsCutout?: boolean;
  breadcrumbs?: ReactNode;
  pillarsTitle?: string;
  pillars?: HeroPillar[];
  compact?: boolean;
}

export function PageHeroSection({
  badge,
  titleLine1,
  titleLine2,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  bgImageSrc,
  bgImageAlt,
  focalImageSrc,
  focalImageAlt,
  focalImageWidth = 460,
  focalImageHeight = 460,
  focalImageIsCutout = false,
  breadcrumbs,
  pillarsTitle = "The Kabuna Craft & Tradition",
  pillars,
  compact = false,
}: PageHeroSectionProps) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Banner: Atmospheric Origin / Ritual Landscape */}
      <section
        className={`relative w-full ${
          compact
            ? "min-h-[340px] sm:min-h-[380px] lg:min-h-[420px]"
            : "min-h-[400px] sm:min-h-[460px] lg:min-h-[520px]"
        } flex items-center bg-stone-950 text-white overflow-visible`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImageSrc}
            alt={bgImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle gradient overlays for pristine readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/92 via-stone-950/65 to-stone-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/30" />
        </div>

        {/* Hero Left Content */}
        <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-18">
          {breadcrumbs && (
            <div className="mb-4 text-xs text-stone-300 font-sans">
              {breadcrumbs}
            </div>
          )}

          <div className="max-w-[68%] sm:max-w-xl">
            {badge && (
              <span className="inline-block text-xs font-semibold tracking-widest text-[#d8a870] uppercase mb-2">
                {badge}
              </span>
            )}

            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.15]">
              <span>{titleLine1}</span>
              {titleLine2 && (
                <>
                  <br />
                  <span>{titleLine2}</span>
                </>
              )}
            </h1>

            <p className="mt-3 sm:mt-4 text-stone-300 text-xs sm:text-sm lg:text-base leading-relaxed">
              {description}
            </p>

            {(ctaText || secondaryCtaText) && (
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
                {ctaText && ctaHref && (
                  <Link
                    href={ctaHref}
                    className="inline-flex items-center justify-center rounded-full bg-[#a37947] hover:bg-[#8e6534] text-white px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {ctaText}
                  </Link>
                )}
                {secondaryCtaText && secondaryCtaHref && (
                  <Link
                    href={secondaryCtaHref}
                    className="inline-flex items-center justify-center rounded-full border border-white/25 hover:border-white/50 hover:bg-white/10 text-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200"
                  >
                    {secondaryCtaText}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Focal Image: Signature Overlapping Visual */}
        <div className="absolute right-4 sm:right-8 md:right-12 lg:right-16 bottom-[-24px] sm:bottom-[-40px] md:bottom-[-55px] lg:bottom-[-70px] w-28 sm:w-48 md:w-60 lg:w-72 z-20 pointer-events-none drop-shadow-2xl">
          {focalImageIsCutout ? (
            <Image
              src={focalImageSrc}
              alt={focalImageAlt}
              width={focalImageWidth}
              height={focalImageHeight}
              priority
              className="w-full h-auto select-none"
            />
          ) : (
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-stone-900/60 backdrop-blur-sm">
              <Image
                src={focalImageSrc}
                alt={focalImageAlt}
                fill
                priority
                sizes="(max-width: 640px) 112px, (max-width: 1024px) 240px, 288px"
                className="object-cover object-center select-none"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
            </div>
          )}
        </div>
      </section>

      {/* Bottom Section: Warm Sandstone 3 Value Pillars */}
      {pillars && pillars.length > 0 && (
        <section className="relative z-10 bg-[#f4efe8] border-b border-stone-200/70 pt-10 sm:pt-14 lg:pt-16 pb-9 sm:pb-12 lg:pb-14">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            {pillarsTitle && (
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal text-stone-900 tracking-tight mb-7 sm:mb-9">
                {pillarsTitle}
              </h2>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 sm:gap-9 lg:gap-11">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="text-[#a37947] shrink-0 [&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-7 sm:[&>svg]:h-7">
                      {pillar.icon}
                    </div>
                    <h3 className="font-medium text-stone-900 text-sm sm:text-base lg:text-lg leading-tight">
                      {pillar.titleLine1}
                      {pillar.titleLine2 && (
                        <>
                          <br />
                          {pillar.titleLine2}
                        </>
                      )}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
