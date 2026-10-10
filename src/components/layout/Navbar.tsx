"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  basePath: string;
}

export function HeaderNavLinks({ basePath }: { basePath: string }) {
  const pathname = usePathname();

  const isCoffeeActive =
    pathname === `${basePath}/c/coffee` ||
    pathname.startsWith(`${basePath}/c/coffee/`) ||
    pathname === `${basePath}/c/single-origin` ||
    pathname.startsWith(`${basePath}/c/single-origin/`) ||
    pathname === `${basePath}/c/washed` ||
    pathname === `${basePath}/c/natural` ||
    pathname === `${basePath}/c/roast-profiles` ||
    pathname === `${basePath}/c/green-coffee`;

  const isCeremonyActive =
    pathname === `${basePath}/c/buna-ceremony` ||
    pathname.startsWith(`${basePath}/c/buna-ceremony/`);

  const isShopActive =
    (pathname === `${basePath}/products` ||
      pathname.startsWith(`${basePath}/products/`)) &&
    !isCoffeeActive &&
    !isCeremonyActive;

  const linkBase =
    "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 whitespace-nowrap inline-flex items-center cursor-pointer";
  const activeClass = "text-stone-900 bg-stone-100 font-semibold";
  const inactiveClass =
    "text-stone-700 hover:text-stone-950 hover:bg-stone-100/70";

  return (
    <nav aria-label="Store navigation" className="flex items-center gap-1">
      <Link
        href={`${basePath}/c/coffee`}
        className={`${linkBase} ${isCoffeeActive ? activeClass : inactiveClass}`}
      >
        <span>Coffee</span>
      </Link>
      <Link
        href={`${basePath}/c/buna-ceremony`}
        className={`${linkBase} ${isCeremonyActive ? activeClass : inactiveClass}`}
      >
        <span>Ceremony Wares</span>
      </Link>
      <Link
        href={`${basePath}/products`}
        className={`${linkBase} ${isShopActive ? activeClass : inactiveClass}`}
      >
        <span>Shop</span>
      </Link>
    </nav>
  );
}

export function Navbar(_props: NavbarProps) {
  // Navigation links are rendered inline in Header next to the logo, search, currency, account and cart.
  return null;
}
