"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  basePath: string;
}

export function HeaderNavLinks({ basePath }: { basePath: string }) {
  const pathname = usePathname();

  const isShopActive =
    pathname === `${basePath}/products` ||
    pathname.startsWith(`${basePath}/products/`);

  return (
    <nav aria-label="Store navigation" className="flex items-center">
      <Link
        href={`${basePath}/products`}
        className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 whitespace-nowrap inline-flex items-center cursor-pointer ${
          isShopActive
            ? "text-stone-900 bg-stone-100 font-semibold"
            : "text-stone-700 hover:text-stone-950 hover:bg-stone-100/70"
        }`}
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
