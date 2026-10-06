"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBar } from "@/components/search/SearchBar";

interface NavbarProps {
  basePath: string;
}

export function Navbar({ basePath }: NavbarProps) {
  const pathname = usePathname();

  const isOriginsActive = pathname.startsWith(`${basePath}/c/single-origin`);
  const isRoastsActive = pathname.startsWith(`${basePath}/c/roast-profiles`);
  const isCeremonyActive =
    pathname.startsWith(`${basePath}/c/buna-ceremony`) ||
    pathname.startsWith(`${basePath}/c/green-coffee`);
  const isShopActive =
    pathname === `${basePath}/products` ||
    pathname.startsWith(`${basePath}/products/`);
  const isWholesaleActive = pathname.startsWith(`${basePath}/wholesale`);

  const linkBaseClasses =
    "px-3 py-1.5 rounded-lg text-xs md:text-sm transition-all duration-150 whitespace-nowrap inline-flex items-center cursor-pointer";
  const linkInactiveClasses =
    "text-stone-700 hover:text-stone-950 hover:bg-stone-100/80 font-medium";
  const linkActiveClass =
    "text-amber-900 bg-amber-50/90 font-bold border border-amber-200/80 shadow-2xs";

  return (
    <nav
      aria-label="Store navigation"
      className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation & Search Row — aligned in the exact same line */}
        <div className="hidden md:flex items-center justify-between gap-4 lg:gap-8 py-2">
          {/* Nav Items */}
          <div className="flex items-center gap-1 lg:gap-2 shrink-0">
            <Link
              href={`${basePath}/products`}
              className={`${linkBaseClasses} ${
                isShopActive ? linkActiveClass : linkInactiveClasses
              }`}
            >
              <span>Shop</span>
            </Link>

            <Link
              href={`${basePath}/c/single-origin`}
              className={`${linkBaseClasses} ${
                isOriginsActive ? linkActiveClass : linkInactiveClasses
              }`}
            >
              <span>Origins</span>
            </Link>

            <Link
              href={`${basePath}/c/roast-profiles`}
              className={`${linkBaseClasses} ${
                isRoastsActive ? linkActiveClass : linkInactiveClasses
              }`}
            >
              <span>Roasts</span>
            </Link>

            <Link
              href={`${basePath}/c/buna-ceremony`}
              className={`${linkBaseClasses} ${
                isCeremonyActive ? linkActiveClass : linkInactiveClasses
              }`}
            >
              <span>Ceremony</span>
            </Link>

            <Link
              href={`${basePath}/wholesale`}
              className={`${linkBaseClasses} ${
                isWholesaleActive ? linkActiveClass : linkInactiveClasses
              }`}
            >
              <span>Wholesale</span>
            </Link>
          </div>

          {/* Search Bar aligned on the same line */}
          <div className="flex-1 max-w-xs lg:max-w-sm">
            <SearchBar basePath={basePath} />
          </div>
        </div>

        {/* Mobile Horizontal Quick-Nav Strip */}
        <div className="flex md:hidden items-center justify-start gap-1 py-1.5 overflow-x-auto no-scrollbar -mx-2 px-2">
          <Link
            href={`${basePath}/products`}
            className={`${linkBaseClasses} ${
              isShopActive ? linkActiveClass : linkInactiveClasses
            }`}
          >
            <span>Shop</span>
          </Link>
          <Link
            href={`${basePath}/c/single-origin`}
            className={`${linkBaseClasses} ${
              isOriginsActive ? linkActiveClass : linkInactiveClasses
            }`}
          >
            <span>Origins</span>
          </Link>
          <Link
            href={`${basePath}/c/roast-profiles`}
            className={`${linkBaseClasses} ${
              isRoastsActive ? linkActiveClass : linkInactiveClasses
            }`}
          >
            <span>Roasts</span>
          </Link>
          <Link
            href={`${basePath}/c/buna-ceremony`}
            className={`${linkBaseClasses} ${
              isCeremonyActive ? linkActiveClass : linkInactiveClasses
            }`}
          >
            <span>Ceremony</span>
          </Link>
          <Link
            href={`${basePath}/wholesale`}
            className={`${linkBaseClasses} ${
              isWholesaleActive ? linkActiveClass : linkInactiveClasses
            }`}
          >
            <span>Wholesale</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
