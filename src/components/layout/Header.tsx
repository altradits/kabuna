import type { Category } from "@spree/sdk";
import { User } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { CartButton } from "@/components/layout/CartButton";
import { HeaderNavLinks } from "@/components/layout/Navbar";
import { SearchToggle } from "@/components/layout/SearchToggle";
import { Button } from "@/components/ui/button";
import { isWholesaleEnabled } from "@/lib/spree";
import { getStoreName } from "@/lib/store";

const LazyMobileMenu = dynamic(
  () =>
    import("@/components/layout/MobileMenu").then((mod) => ({
      default: mod.MobileMenu,
    })),
  {
    loading: () => (
      <div className="inline-flex items-center justify-center h-10 w-10" />
    ),
  },
);

const storeName = getStoreName();

interface HeaderProps {
  basePath: string;
  locale: Locale;
  mobileNavigation: ReactNode;
}

interface HeaderMobileMenuProps {
  rootCategories: Category[];
  basePath: string;
}

export function HeaderMobileMenu({
  rootCategories,
  basePath,
}: HeaderMobileMenuProps) {
  return (
    <LazyMobileMenu
      rootCategories={rootCategories}
      basePath={basePath}
      wholesaleEnabled={isWholesaleEnabled()}
    />
  );
}

export async function Header({
  basePath,
  locale,
  mobileNavigation,
}: HeaderProps) {
  const t = await getTranslations({ locale, namespace: "header" });

  return (
    <SearchToggle
      basePath={basePath}
      left={mobileNavigation}
      center={
        <Link href={basePath || "/"} className="flex items-center min-w-0">
          <Image
            src="/kabuna-logo.svg"
            alt={storeName}
            width={140}
            height={32}
            className="h-8 w-auto object-contain"
            fetchPriority="high"
            loading="eager"
          />
        </Link>
      }
      navLinks={<HeaderNavLinks basePath={basePath} />}
      rightEnd={
        <>
          {/* Account - desktop only */}
          <div className="hidden md:block">
            <Button variant="ghost" size="icon-lg" asChild>
              <Link href={`${basePath}/account`} aria-label={t("account")}>
                <User className="size-5" />
              </Link>
            </Button>
          </div>

          {/* Cart */}
          <CartButton />

          {/* Clear Primary CTA Button */}
          <div className="hidden sm:flex items-center ml-1 sm:ml-2">
            <Button
              asChild
              className="rounded-full bg-[#a37947] hover:bg-[#8e6534] text-white text-sm font-medium px-5 h-9 shadow-xs hover:shadow transition-all duration-200 cursor-pointer"
            >
              <Link href={`${basePath}/products`}>Order Now</Link>
            </Button>
          </div>
        </>
      }
    />
  );
}
