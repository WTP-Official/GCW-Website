"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  const closeAll = () => {
    setIsMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-ink" onClick={closeAll}>
          <span className="text-brand-600">GCW</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-brand-600"
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
                <div className="invisible absolute left-1/2 top-full z-40 w-80 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-lg border border-black/5 bg-white p-3 shadow-lg">
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
                      className="mt-2 block rounded-md border-t border-black/5 px-3 pt-3 text-sm font-semibold text-brand-600 hover:text-brand-700"
                    >
                      {item.dropdown.viewAll.label} →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-md bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 lg:inline-flex"
        >
          Đặt lịch tư vấn
        </Link>

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
                        className="block rounded-md px-3 py-2 text-sm font-semibold text-brand-600"
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
