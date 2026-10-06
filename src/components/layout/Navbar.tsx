"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

interface NavbarProps {
  basePath: string;
}

interface DropdownItem {
  name: string;
  href: string;
  tagline: string;
  badge?: string;
}

export function Navbar({ basePath }: NavbarProps) {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = (menu: string) => {
    clearTimer();
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    clearTimer();
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const toggleMenu = (menu: string) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  const closeDropdown = () => {
    clearTimer();
    setActiveMenu(null);
  };

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimer();
    };
  }, [clearTimer]);

  const originItems: DropdownItem[] = [
    {
      name: "All Origins",
      href: `${basePath}/c/single-origin`,
      tagline: "Explore all authentic Ethiopian single-origin coffees",
      badge: "Terroirs",
    },
    {
      name: "Yirgacheffe",
      href: `${basePath}/c/single-origin/yirgacheffe`,
      tagline: "Floral jasmine, bergamot tea & Meyer lemon (2,000m)",
      badge: "Floral",
    },
    {
      name: "Guji Zone",
      href: `${basePath}/c/single-origin/guji`,
      tagline: "Volcanic soils, white peach & wild wildflower honey (2,100m)",
      badge: "Fruity",
    },
    {
      name: "Sidama",
      href: `${basePath}/c/single-origin/sidama`,
      tagline: "Sun-dried strawberry compote & rich milk chocolate (2,000m)",
      badge: "Berry",
    },
    {
      name: "Harrar Longberry",
      href: `${basePath}/c/single-origin/harrar`,
      tagline: "Arid highlands, wild winey mocha & heirloom longberry",
      badge: "Wild",
    },
    {
      name: "Limu & Kaffa",
      href: `${basePath}/c/single-origin/limu-kaffa`,
      tagline: "Indigenous ancient forest Arabica & warming spice notes",
      badge: "Forest",
    },
  ];

  const roastItems: DropdownItem[] = [
    {
      name: "All Roasts",
      href: `${basePath}/c/roast-profiles`,
      tagline: "Complete spectrum of specialty Ethiopian roasts",
      badge: "Spectrum",
    },
    {
      name: "Light Roast",
      href: `${basePath}/c/roast-profiles`,
      tagline: "Crisp acidity, delicate aromatics & tea-like finish",
      badge: "Bright",
    },
    {
      name: "Medium Roast",
      href: `${basePath}/c/roast-profiles`,
      tagline: "Caramelized sugars, stone fruit & balanced sweetness",
      badge: "Balanced",
    },
    {
      name: "Dark Roast",
      href: `${basePath}/c/roast-profiles`,
      tagline: "Bold mocha intensity, dark cacao & velvety body",
      badge: "Bold",
    },
  ];

  const ceremonyItems: DropdownItem[] = [
    {
      name: "Buna Ceremony Sets",
      href: `${basePath}/c/buna-ceremony`,
      tagline: "Handcrafted clay Jebena, Cini cups, Rekebot & frankincense",
      badge: "Ritual",
    },
    {
      name: "Green Coffee",
      href: `${basePath}/c/green-coffee`,
      tagline: "Unroasted raw Grade 1 heirloom beans for pan roasting",
      badge: "Raw",
    },
    {
      name: "Brewing Equipment",
      href: `${basePath}/c/buna-ceremony`,
      tagline: "Traditional clay & precision specialty coffee makers",
      badge: "Gear",
    },
  ];

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
    "px-3.5 py-1.5 rounded-lg text-xs md:text-sm transition-all duration-150 whitespace-nowrap inline-flex items-center gap-1 cursor-pointer";
  const linkInactiveClasses =
    "text-stone-700 hover:text-stone-950 hover:bg-stone-100/80 font-medium";
  const linkActiveClass =
    "text-amber-900 bg-amber-50/90 font-bold border border-amber-200/80 shadow-2xs";

  return (
    <nav
      ref={navRef}
      aria-label="Store navigation"
      className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation Row */}
        <div className="hidden md:flex items-center justify-center gap-1 lg:gap-2 py-2">
          {/* Shop */}
          <Link
            href={`${basePath}/products`}
            onClick={closeDropdown}
            className={`${linkBaseClasses} ${
              isShopActive ? linkActiveClass : linkInactiveClasses
            }`}
          >
            <span>Shop</span>
          </Link>

          {/* Origins Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("origins")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => toggleMenu("origins")}
              aria-expanded={activeMenu === "origins"}
              aria-haspopup="true"
              className={`${linkBaseClasses} ${
                isOriginsActive || activeMenu === "origins"
                  ? linkActiveClass
                  : linkInactiveClasses
              }`}
            >
              <span>Origins</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMenu === "origins" ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {activeMenu === "origins" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1.5 w-80 lg:w-96 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-white/98 backdrop-blur-md rounded-xl border border-stone-200/90 shadow-xl p-2.5">
                  <div className="px-3 py-1.5 border-b border-stone-100 mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                      Ethiopian Terroirs
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {originItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeDropdown}
                        className="block px-3 py-2 rounded-lg hover:bg-amber-50/80 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-stone-900 group-hover:text-amber-900">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 group-hover:text-stone-700 mt-0.5 leading-snug">
                          {item.tagline}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Roasts Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("roasts")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => toggleMenu("roasts")}
              aria-expanded={activeMenu === "roasts"}
              aria-haspopup="true"
              className={`${linkBaseClasses} ${
                isRoastsActive || activeMenu === "roasts"
                  ? linkActiveClass
                  : linkInactiveClasses
              }`}
            >
              <span>Roasts</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMenu === "roasts" ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {activeMenu === "roasts" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1.5 w-80 lg:w-96 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-white/98 backdrop-blur-md rounded-xl border border-stone-200/90 shadow-xl p-2.5">
                  <div className="px-3 py-1.5 border-b border-stone-100 mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                      Roast Spectrum
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {roastItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeDropdown}
                        className="block px-3 py-2 rounded-lg hover:bg-amber-50/80 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-stone-900 group-hover:text-amber-900">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 group-hover:text-stone-700 mt-0.5 leading-snug">
                          {item.tagline}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ceremony Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("ceremony")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => toggleMenu("ceremony")}
              aria-expanded={activeMenu === "ceremony"}
              aria-haspopup="true"
              className={`${linkBaseClasses} ${
                isCeremonyActive || activeMenu === "ceremony"
                  ? linkActiveClass
                  : linkInactiveClasses
              }`}
            >
              <span>Ceremony</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeMenu === "ceremony" ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {activeMenu === "ceremony" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1.5 w-80 lg:w-96 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-white/98 backdrop-blur-md rounded-xl border border-stone-200/90 shadow-xl p-2.5">
                  <div className="px-3 py-1.5 border-b border-stone-100 mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                      Buna Ritual & Raw Beans
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {ceremonyItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeDropdown}
                        className="block px-3 py-2 rounded-lg hover:bg-amber-50/80 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-stone-900 group-hover:text-amber-900">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 group-hover:text-stone-700 mt-0.5 leading-snug">
                          {item.tagline}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Wholesale */}
          <Link
            href={`${basePath}/wholesale`}
            onClick={closeDropdown}
            className={`${linkBaseClasses} ${
              isWholesaleActive ? linkActiveClass : linkInactiveClasses
            }`}
          >
            <span>Wholesale</span>
          </Link>
        </div>

        {/* Mobile Horizontal Sticky Quick-Nav Strip */}
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
