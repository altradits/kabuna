"use client";

import {
  Compass,
  Grid,
  Home,
  Package,
  Search,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SearchBar } from "@/components/search/SearchBar";
import { useCart } from "@/contexts/CartContext";

interface MobileBottomNavProps {
  basePath: string;
}

export function MobileBottomNav({ basePath }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === basePath) {
      return pathname === basePath || pathname === `${basePath}/`;
    }
    return pathname.startsWith(path);
  };

  const navItems = [
    {
      label: "Home",
      href: basePath,
      icon: Home,
      active: isActive(basePath),
    },
    {
      label: "Shop",
      href: `${basePath}/products`,
      icon: Grid,
      active: isActive(`${basePath}/products`),
    },
    {
      label: "Origins",
      href: `${basePath}/c/single-origin`,
      icon: Compass,
      active: isActive(`${basePath}/c/single-origin`),
    },
    {
      label: "Ceremony",
      href: `${basePath}/c/buna-ceremony`,
      icon: Package,
      active: isActive(`${basePath}/c/buna-ceremony`),
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
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors min-w-[54px] ${
                  item.active
                    ? "text-amber-900 font-bold"
                    : "text-stone-500 hover:text-stone-900 font-medium"
                }`}
              >
                <Icon
                  className={`w-5 h-5 mb-0.5 ${item.active ? "text-amber-800 scale-110" : ""}`}
                />
                <span className="text-[10px] tracking-tight">{item.label}</span>
              </Link>
            );
          })}

          {/* Quick Search Tab */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="flex flex-col items-center justify-center py-1 px-2 rounded-lg text-stone-500 hover:text-stone-900 font-medium transition-colors min-w-[54px]"
          >
            <Search className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Search</span>
          </button>

          {/* Cart Tab with Live Counter */}
          <button
            type="button"
            onClick={openCart}
            aria-label="Cart"
            className="relative flex flex-col items-center justify-center py-1 px-2 rounded-lg text-stone-600 hover:text-stone-900 font-medium transition-colors min-w-[54px]"
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

      {/* Mobile Search Modal Drawer */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col md:hidden animate-in fade-in duration-200">
          <div className="bg-white p-4 pt-6 shadow-xl border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <SearchBar
                  basePath={basePath}
                  autoFocus
                  onNavigate={() => setSearchOpen(false)}
                />
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-sm font-semibold text-stone-600 hover:text-stone-900 px-2 py-1.5 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setSearchOpen(false)}
            role="presentation"
          />
        </div>
      )}
    </>
  );
}
