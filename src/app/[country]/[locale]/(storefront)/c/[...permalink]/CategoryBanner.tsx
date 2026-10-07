import type { Category } from "@spree/sdk";
import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";
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

  return (
    <>
      <div
        className="relative flex flex-col justify-end min-h-[320px] sm:min-h-[380px] bg-neutral-900 bg-cover bg-center overflow-hidden"
        style={
          category.image_url
            ? { backgroundImage: `url(${category.image_url})` }
            : undefined
        }
      >
        {category.image_url && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30 pointer-events-none" />
        )}
        <div
          className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 ${
            category.image_url ? "text-white" : ""
          }`}
        >
          <Breadcrumbs
            category={category}
            basePath={basePath}
            locale={locale}
          />

          <div className="mb-3 mt-4">
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
                category.image_url ? "text-white" : "text-gray-900"
              }`}
            >
              {category.name}
            </h1>
          </div>

          {/* Description */}
          {category.description && (
            <p
              className={`max-w-2xl text-sm sm:text-base leading-relaxed ${
                category.image_url ? "text-neutral-200" : "text-gray-600"
              }`}
            >
              {category.description}
            </p>
          )}
        </div>
      </div>

      {/* Subcategories */}
      {category.children && category.children.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="flex flex-wrap gap-2 items-center border-b border-gray-100 pb-4">
            {category.children.map((child) => (
              <Link
                key={child.id}
                href={`${basePath}/c/${child.permalink}`}
                className="px-1.5 py-1 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors"
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
