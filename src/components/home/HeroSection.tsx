import Image from "next/image";
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
    <section className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              {storeName}
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              {t("heroDescription")}
            </p>
            <div className="mt-8 flex justify-center lg:justify-start gap-4">
              <Button
                size="lg"
                asChild
                className="h-12 px-8 text-base rounded-lg"
              >
                <Link href={`${basePath}/products`}>{t("shopNow")}</Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85"
                alt="Welcoming cup of freshly brewed specialty coffee"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
