import type { Category } from "@spree/sdk";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { isWholesaleEnabled } from "@/lib/spree";
import { getStoreDescription, getStoreName } from "@/lib/store";
import { CurrentYear } from "./CurrentYear";

const storeName = getStoreName();
const storeDescription = getStoreDescription();

const EXCLUDED_FOOTER_PERMALINKS = new Set([
  "coffee",
  "single-origin",
  "washed",
  "natural",
  "buna-ceremony",
]);

const EXCLUDED_FOOTER_NAMES = new Set([
  "coffee",
  "single origin varieties",
  "single origin",
  "washed process",
  "natural process",
  "ceremony & accessories",
  "buna ceremony & accessories",
  "buna ceremony",
]);

function InstagramIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function XIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.057-2.797 2.72v1.251h4.156l-.547 3.667h-3.609v7.98c5.49-.915 9.689-5.673 9.689-11.411 0-6.425-5.205-11.63-11.63-11.63C5.205.65 0 5.855 0 12.28c0 5.738 4.199 10.496 9.101 11.411z" />
    </svg>
  );
}

function YouTubeIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: InstagramIcon,
  },
  {
    name: "X (Twitter)",
    href: "https://x.com",
    icon: XIcon,
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FacebookIcon,
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: YouTubeIcon,
  },
];

interface FooterProps {
  basePath: string;
  locale: Locale;
  categoryLinks: ReactNode;
}

interface FooterCategoryLinksProps {
  rootCategories: Category[];
  basePath: string;
}

export function FooterCategoryLinks({
  rootCategories,
  basePath,
}: FooterCategoryLinksProps) {
  const filtered = rootCategories.filter((category) => {
    const permalink = (category.permalink || "").toLowerCase();
    const name = (category.name || "").toLowerCase().trim();
    if (EXCLUDED_FOOTER_PERMALINKS.has(permalink)) return false;
    if (EXCLUDED_FOOTER_NAMES.has(name)) return false;
    return true;
  });

  return filtered.map((category) => (
    <li key={category.id}>
      <Link
        href={`${basePath}/c/${category.permalink}`}
        className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
      >
        {category.name}
      </Link>
    </li>
  ));
}

export async function Footer({ basePath, locale, categoryLinks }: FooterProps) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const wholesaleEnabled = isWholesaleEnabled();

  return (
    <footer className="bg-primary text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 items-start">
          {/* Brand & Socials */}
          <div className="sm:col-span-2">
            <span className="text-lg font-bold text-white tracking-wide">
              {storeName}
            </span>
            <p className="mt-2 text-xs text-neutral-400 max-w-sm line-clamp-2">
              {t("description") || storeDescription}
            </p>
            {/* Social Media Links */}
            <div className="mt-3 flex items-center gap-2">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="p-1.5 rounded-full text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <item.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              {t("shop")}
            </h3>
            <ul className="mt-2.5 space-y-2">
              <li>
                <Link
                  href={`${basePath}/products`}
                  className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  {t("allProducts")}
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/c/coffee`}
                  className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  Coffee
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/c/buna-ceremony`}
                  className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  Buna Ceremony
                </Link>
              </li>
              {categoryLinks}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              {t("account")}
            </h3>
            <ul className="mt-2.5 space-y-2">
              <li>
                <Link
                  href={`${basePath}/account`}
                  className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  {t("myAccount")}
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/account/orders`}
                  className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  {t("orderHistory")}
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/cart`}
                  className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  {t("cart")}
                </Link>
              </li>
              {wholesaleEnabled && (
                <li>
                  <Link
                    href={`${basePath}/wholesale`}
                    className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
                  >
                    {t("wholesale")}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Compact bottom bar */}
        <div className="mt-6 pt-4 border-t border-neutral-800/80 text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>
            &copy; <CurrentYear /> {storeName}. {t("poweredBy")}{" "}
            <Link
              href="https://www.altradits.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-white underline transition-colors"
            >
              altradits
            </Link>
          </p>
          <span className="text-[11px] text-neutral-500">
            Authentic Ethiopian Buna Ritual &amp; Specialty Origins
          </span>
        </div>
      </div>
    </footer>
  );
}
