"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  basePath: string;
}

export function HeaderNavLinks({ basePath }: { basePath: string }) {
  const pathname = usePathname();

  const isOriginsActive = pathname.startsWith(`${basePath}/c/single-origin`);
  const isRoastsActive = pathname.startsWith(`${basePath}/c/roast-profiles`);
  const isCeremonyActive =
    pathname.startsWith(`${basePath}/c/buna-ceremony`) ||
    pathname.startsWith(`${basePath}/c/green-coffee`);
  const isShopActive =
    pathname === `${basePath}/products` ||
    pathname.startsWith(`${basePath}/products/`);

  const linkBaseClasses =
    "px-2.5 lg:px-3 py-1.5 rounded-lg text-xs lg:text-sm transition-all duration-150 whitespace-nowrap inline-flex items-center cursor-pointer";
  const linkInactiveClasses =
    "text-stone-700 hover:text-stone-950 hover:bg-stone-100/80 font-medium";
  const linkActiveClass =
    "text-amber-900 bg-amber-50/90 font-bold border border-amber-200/80 shadow-2xs";

  return (
    <nav
      aria-label="Store navigation"
      className="flex items-center gap-0.5 lg:gap-1"
    >
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
    </nav>
  );
}

export function Navbar(_props: NavbarProps) {
  // Navigation links are rendered inline in Header next to the logo, search, currency, account and cart.
  return null;
}
