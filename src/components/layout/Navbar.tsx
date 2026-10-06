import Link from "next/link";

interface NavbarProps {
  basePath: string;
}

export function Navbar({ basePath }: NavbarProps) {
  const mainNavLinks = [
    {
      label: "All Varieties",
      href: `${basePath}/products`,
    },
    {
      label: "Single Origin",
      href: `${basePath}/c/single-origin`,
    },
    {
      label: "Yirgacheffe",
      href: `${basePath}/c/single-origin/yirgacheffe`,
    },
    {
      label: "Guji",
      href: `${basePath}/c/single-origin/guji`,
    },
    {
      label: "Sidama",
      href: `${basePath}/c/single-origin/sidama`,
    },
    {
      label: "Harrar",
      href: `${basePath}/c/single-origin/harrar`,
    },
    {
      label: "Kaffa & Limu",
      href: `${basePath}/c/single-origin/limu-kaffa`,
    },
    {
      label: "Buna Ceremony",
      href: `${basePath}/c/buna-ceremony`,
      highlight: true,
    },
    {
      label: "Roast Profiles",
      href: `${basePath}/c/roast-profiles`,
    },
    {
      label: "Green Coffee",
      href: `${basePath}/c/green-coffee`,
    },
  ];

  return (
    <nav
      aria-label="Store navigation"
      className="hidden md:block bg-stone-900 text-stone-200 border-b border-stone-800 shadow-xs"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 overflow-x-auto py-2 text-xs font-semibold tracking-wide uppercase">
          {mainNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap inline-flex items-center ${
                link.highlight
                  ? "bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 hover:text-amber-200 font-bold border border-amber-500/30"
                  : "hover:bg-stone-800 hover:text-amber-400 text-stone-300"
              }`}
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
