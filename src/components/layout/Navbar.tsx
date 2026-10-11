"use client";

import type { Category } from "@spree/sdk";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { KABUNA_CATEGORIES } from "@/lib/data/kabuna-coffee-data";

interface NavbarProps {
  basePath: string;
}

export function HeaderNavLinks({
  basePath,
  categories = KABUNA_CATEGORIES,
}: {
  basePath: string;
  categories?: Category[];
}) {
  const pathname = usePathname();

  const linkBase =
    "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 whitespace-nowrap inline-flex items-center cursor-pointer";
  const activeClass = "text-stone-900 bg-stone-100 font-semibold";
  const inactiveClass =
    "text-stone-700 hover:text-stone-950 hover:bg-stone-100/70";

  const getCleanLabel = (name: string) => {
    if (name.toLowerCase().includes("coffee")) return "Coffee";
    if (name.toLowerCase().includes("snack")) return "Snacks";
    if (name.toLowerCase().includes("hair")) return "Hair";
    return name.replace(/^Organic\s+/i, "");
  };

  const isCategoryActive = (c: Category) => {
    const permalink = c.permalink || "";
    if (permalink === "coffee") {
      return (
        pathname === `${basePath}/c/coffee` ||
        pathname.startsWith(`${basePath}/c/coffee/`) ||
        pathname === `${basePath}/c/single-origin` ||
        pathname.startsWith(`${basePath}/c/single-origin/`) ||
        pathname === `${basePath}/c/washed` ||
        pathname === `${basePath}/c/natural` ||
        pathname === `${basePath}/c/roast-profiles` ||
        pathname === `${basePath}/c/green-coffee` ||
        pathname === `${basePath}/c/buna-ceremony` ||
        pathname.startsWith(`${basePath}/c/buna-ceremony/`)
      );
    }
    return (
      pathname === `${basePath}/c/${permalink}` ||
      pathname.startsWith(`${basePath}/c/${permalink}/`)
    );
  };

  return (
    <nav aria-label="Store navigation" className="flex items-center gap-1">
      {categories.map((cat) => {
        const isActive = isCategoryActive(cat);
        const label = getCleanLabel(cat.name);
        return (
          <Link
            key={cat.id || cat.permalink}
            href={`${basePath}/c/${cat.permalink}`}
            className={`${linkBase} ${isActive ? activeClass : inactiveClass}`}
          >
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function Navbar(_props: NavbarProps) {
  // Navigation links are rendered inline in Header next to the logo, search, currency, account and cart.
  return null;
}
