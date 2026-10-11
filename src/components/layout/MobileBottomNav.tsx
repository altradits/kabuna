"use client";

import { Coffee, Grid, Home, ShoppingBag, Sparkles, Wheat } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

interface MobileBottomNavProps {
  basePath: string;
}

export function MobileBottomNav({ basePath }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  const isCoffeeActive =
    pathname === `${basePath}/c/coffee` ||
    pathname.startsWith(`${basePath}/c/coffee/`) ||
    pathname === `${basePath}/c/single-origin` ||
    pathname.startsWith(`${basePath}/c/single-origin/`) ||
    pathname === `${basePath}/c/washed` ||
    pathname === `${basePath}/c/natural` ||
    pathname === `${basePath}/c/roast-profiles` ||
    pathname === `${basePath}/c/green-coffee` ||
    pathname === `${basePath}/c/buna-ceremony` ||
    pathname.startsWith(`${basePath}/c/buna-ceremony/`);

  const isHairActive =
    pathname === `${basePath}/c/hair` ||
    pathname.startsWith(`${basePath}/c/hair/`);

  const isSnacksActive =
    pathname === `${basePath}/c/snacks` ||
    pathname.startsWith(`${basePath}/c/snacks/`);

  const isShopActive =
    (pathname === `${basePath}/products` ||
      pathname.startsWith(`${basePath}/products/`)) &&
    !isCoffeeActive &&
    !isHairActive &&
    !isSnacksActive;

  const isHomeActive = pathname === basePath || pathname === `${basePath}/`;

  const navItems = [
    {
      label: "Home",
      href: basePath,
      icon: Home,
      active: isHomeActive,
    },
    {
      label: "Coffee",
      href: `${basePath}/c/coffee`,
      icon: Coffee,
      active: isCoffeeActive,
    },
    {
      label: "Snacks",
      href: `${basePath}/c/snacks`,
      icon: Wheat,
      active: isSnacksActive,
    },
    {
      label: "Hair",
      href: `${basePath}/c/hair`,
      icon: Sparkles,
      active: isHairActive,
    },
    {
      label: "Shop",
      href: `${basePath}/products`,
      icon: Grid,
      active: isShopActive,
    },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 py-1.5 px-2 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-lg transition-colors flex-1 min-w-0 ${
                  item.active
                    ? "text-amber-900 font-bold"
                    : "text-stone-500 hover:text-stone-900 font-medium"
                }`}
              >
                <Icon
                  className={`w-5 h-5 mb-0.5 shrink-0 ${item.active ? "text-amber-800 scale-110" : ""}`}
                />
                <span className="text-[10px] tracking-tight truncate max-w-[54px]">
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Cart Tab with Live Counter */}
          <button
            type="button"
            onClick={openCart}
            aria-label="Cart"
            className="relative flex flex-col items-center justify-center py-1 px-0.5 rounded-lg text-stone-600 hover:text-stone-900 font-medium transition-colors flex-1 min-w-0 cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 mb-0.5 text-stone-700" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-amber-800 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center shadow-xs">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight">Cart</span>
          </button>
        </div>
      </nav>
    </>
  );
}
