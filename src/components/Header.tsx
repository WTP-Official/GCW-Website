"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  ShieldCheck,
  Gauge,
  TrendingUp,
  UserSearch,
  Receipt,
  MessageSquareText,
  type LucideIcon,
} from "lucide-react";
import servicesContent from "@/app/(pages)/services/content.json";
import solutionsContent from "@/app/(pages)/solutions/content.json";
import packagesContent from "@/app/(pages)/packages/content.json";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Gauge,
  TrendingUp,
  UserSearch,
  Receipt,
  MessageSquareText,
};

type NavItem = {
  label: string;
  href: string;
  dropdown?: {
    items: { href: string; label: string; description?: string; icon?: LucideIcon }[];
    viewAll: { href: string; label: string };
  };
};

const NAV_ITEMS: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Về GCW", href: "/about" },
  {
    label: "Dịch vụ",
    href: "/services",
    dropdown: {
      items: servicesContent.services.map((service) => ({
        href: `/services/${service.slug}`,
        label: service.name,
        description: service.tagline,
        icon: SERVICE_ICONS[service.icon],
      })),
      viewAll: { href: "/services", label: "Xem tất cả dịch vụ" },
    },
  },
  {
    label: "Giải pháp",
    href: "/solutions",
    dropdown: {
      items: solutionsContent.items.slice(0, 6).map((item) => ({
        href: item.href,
        label: item.title,
      })),
      viewAll: { href: "/solutions", label: "Xem tất cả giải pháp" },
    },
  },
  {
    label: "Gói dịch vụ",
    href: "/packages",
    dropdown: {
      items: packagesContent.tiers.map((tier) => ({
        href: "/packages",
        label: tier.name,
        description: tier.audience,
      })),
      viewAll: { href: "/packages", label: "Xem tất cả gói dịch vụ" },
    },
  },
  { label: "Tin tức", href: "/news" },
  { label: "Liên hệ", href: "/contact" },
];

function Logomark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        transform="rotate(45 12 12)"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" transform="rotate(45 12 12)" fill="currentColor" />
    </svg>
  );
}

export function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const closeAll = () => {
    setIsMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/news?q=${encodeURIComponent(q)}`);
    setIsSearchOpen(false);
    closeAll();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-medium text-ink"
          onClick={closeAll}
        >
          <Logomark className="h-7 w-7 text-brand-600" />
          <span className="text-brand-600">GCW</span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {NAV_ITEMS.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium tracking-wide text-ink-soft transition-colors hover:text-brand-600"
              >
                {item.label}
                {item.dropdown && (
                  <ChevronDown
                    className="h-3.5 w-3.5 text-muted transition-transform group-hover:rotate-180"
                    aria-hidden="true"
                  />
                )}
              </Link>

              {item.dropdown && (
                <div className="absolute left-1/2 top-full z-40 hidden w-80 -translate-x-1/2 pt-3 group-hover:block">
                  <div className="rounded-md border border-black/5 bg-white p-3 shadow-md">
                    <ul className="space-y-1">
                      {item.dropdown.items.map((sub) => {
                        const Icon = sub.icon;
                        return (
                          <li key={sub.label}>
                            <Link
                              href={sub.href}
                              className="flex items-start gap-3 rounded-md px-3 py-2 transition-colors hover:bg-surface"
                            >
                              {Icon && (
                                <Icon
                                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                                  aria-hidden="true"
                                />
                              )}
                              <span>
                                <span className="block text-sm font-medium text-ink">
                                  {sub.label}
                                </span>
                                {sub.description && (
                                  <span className="mt-0.5 block text-xs text-muted">
                                    {sub.description}
                                  </span>
                                )}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <Link
                      href={item.dropdown.viewAll.href}
                      className="mt-2 block rounded-md border-t border-black/5 px-3 pt-3 text-sm font-medium text-brand-600 hover:text-brand-700"
                    >
                      {item.dropdown.viewAll.label} →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="relative flex items-center">
            {isSearchOpen && (
              <form onSubmit={submitSearch} className="absolute right-full mr-2">
                <input
                  type="search"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => !searchQuery && setIsSearchOpen(false)}
                  placeholder="Tìm kiếm bài viết…"
                  className="w-56 rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-600"
                />
              </form>
            )}
            <button
              type="button"
              onClick={() => setIsSearchOpen((open) => !open)}
              aria-label="Tìm kiếm"
              aria-expanded={isSearchOpen}
              className="inline-flex items-center justify-center rounded-md p-2 text-ink-soft transition-colors hover:text-brand-600"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-brand-600 px-5 py-2.5 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
          >
            Đặt lịch tư vấn
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="inline-flex items-center justify-center rounded-md p-2 text-ink lg:hidden"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-black/5 bg-white lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            <form onSubmit={submitSearch} className="mb-2 flex items-center gap-2">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm bài viết…"
                className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-600"
              />
              <button
                type="submit"
                aria-label="Tìm kiếm"
                className="inline-flex items-center justify-center rounded-md p-2 text-ink-soft"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    className="flex-1 rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-surface hover:text-brand-600"
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <button
                      type="button"
                      aria-label={`Mở rộng ${item.label}`}
                      aria-expanded={openMobileDropdown === item.href}
                      onClick={() =>
                        setOpenMobileDropdown((open) => (open === item.href ? null : item.href))
                      }
                      className="rounded-md p-2 text-ink-soft"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openMobileDropdown === item.href ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>
                {item.dropdown && openMobileDropdown === item.href && (
                  <ul className="ml-3 space-y-1 border-l border-black/5 pl-3">
                    {item.dropdown.items.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={sub.href}
                          onClick={closeAll}
                          className="block rounded-md px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-surface hover:text-brand-600"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={item.dropdown.viewAll.href}
                        onClick={closeAll}
                        className="block rounded-md px-3 py-2 text-sm font-medium text-brand-600"
                      >
                        {item.dropdown.viewAll.label} →
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
