"use client";

import { Coffee, Flame, Grid, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryQuickPillsProps {
  basePath: string;
}

export function CategoryQuickPills({ basePath }: CategoryQuickPillsProps) {
  const pathname = usePathname();

  const isCoffee =
    pathname === `${basePath}/c/coffee` ||
    pathname.startsWith(`${basePath}/c/coffee/`) ||
    pathname === `${basePath}/c/single-origin` ||
    pathname.startsWith(`${basePath}/c/single-origin/`) ||
    pathname === `${basePath}/c/washed` ||
    pathname === `${basePath}/c/natural` ||
    pathname === `${basePath}/c/roast-profiles` ||
    pathname === `${basePath}/c/green-coffee`;

  const isHair =
    pathname === `${basePath}/c/hair` ||
    pathname.startsWith(`${basePath}/c/hair/`);

  const isCeremony =
    pathname === `${basePath}/c/buna-ceremony` ||
    pathname.startsWith(`${basePath}/c/buna-ceremony/`);

  const isAll =
    (pathname === `${basePath}/products` ||
      pathname.startsWith(`${basePath}/products/`)) &&
    !isCoffee &&
    !isHair &&
    !isCeremony;

  const categories = [
    {
      id: "all",
      label: "All Products",
      count: "22",
      icon: Grid,
      href: `${basePath}/products`,
      active: isAll,
    },
    {
      id: "coffee",
      label: "Coffee",
      count: "10",
      icon: Coffee,
      href: `${basePath}/c/coffee`,
      active: isCoffee,
    },
    {
      id: "hair",
      label: "Organic Hair Care",
      count: "5",
      icon: Sparkles,
      href: `${basePath}/c/hair`,
      active: isHair,
    },
    {
      id: "ceremony",
      label: "Buna Ceremony",
      count: "7",
      icon: Flame,
      href: `${basePath}/c/buna-ceremony`,
      active: isCeremony,
    },
  ];

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-2 md:hidden">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Filter by Category
        </span>
        <span className="text-xs text-stone-400 font-medium">
          22 Products Total
        </span>
      </div>
      <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-2 min-w-max pb-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const activeClass =
              "bg-[#a37947] text-white shadow-xs font-semibold border-[#8e6534]";
            const inactiveClass =
              "bg-stone-100/90 hover:bg-stone-200/90 text-stone-700 hover:text-stone-900 border-stone-200/60 font-medium";

            return (
              <Link
                key={cat.id}
                href={cat.href}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs transition-all duration-150 border cursor-pointer ${
                  cat.active ? activeClass : inactiveClass
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    cat.active ? "text-amber-100" : "text-stone-500"
                  }`}
                />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    cat.active
                      ? "bg-white/20 text-white"
                      : "bg-stone-200/90 text-stone-600"
                  }`}
                >
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
