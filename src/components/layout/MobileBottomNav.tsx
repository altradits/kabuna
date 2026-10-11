"use client";

import type { Category } from "@spree/sdk";
import {
  Coffee,
  Flower2,
  Home,
  Package,
  ShoppingBag,
  Sparkles,
  Wheat,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { KABUNA_CATEGORIES } from "@/lib/data/kabuna-coffee-data";

interface MobileBottomNavProps {
  basePath: string;
  categories?: Category[];
}

export function MobileBottomNav({
  basePath,
  categories = KABUNA_CATEGORIES,
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  const isHomeActive = pathname === basePath || pathname === `${basePath}/`;

  const getCategoryIcon = (permalink: string) => {
    const p = permalink.toLowerCase();
    if (p.includes("coffee")) return Coffee;
    if (p.includes("snack")) return Wheat;
    if (p.includes("hair")) return Sparkles;
    if (p.includes("body") || p.includes("scent")) return Flower2;
    return Package;
  };

  const getCleanLabel = (name: string) => {
    if (name.toLowerCase().includes("coffee")) return "Coffee";
    if (name.toLowerCase().includes("snack")) return "Snacks";
    if (name.toLowerCase().includes("hair")) return "Hair";
    if (
      name.toLowerCase().includes("body") ||
      name.toLowerCase().includes("scent")
    )
      return "Body & Scents";
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

  const navItems = [
    {
      label: "Home",
      href: basePath,
      icon: Home,
      active: isHomeActive,
    },
    ...categories.map((cat) => ({
      label: getCleanLabel(cat.name),
      href: `${basePath}/c/${cat.permalink}`,
      icon: getCategoryIcon(cat.permalink || ""),
      active: isCategoryActive(cat),
    })),
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
