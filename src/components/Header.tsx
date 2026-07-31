"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  Building2,
  Network,
  Award,
  Layers,
  Package,
  Newspaper,
  Rocket,
  Radio,
  Presentation,
  Mic,
  Users2,
  BookOpen,
  ClipboardList,
  Mic2,
  Video,
  CalendarCheck,
  PlayCircle,
  type LucideIcon,
} from "lucide-react";
import servicesContent from "@/app/(pages)/services/content.json";
import solutionsContent from "@/app/(pages)/solutions/content.json";
import packagesContent from "@/app/(pages)/packages/content.json";
import aboutContent from "@/app/(pages)/about/content.json";
import contactContent from "@/app/(pages)/contact/content.json";
import homeContent from "@/app/content.json";
import eventsContent from "@/app/(pages)/su-kien/content.json";
import resourcesContent from "@/app/(pages)/tai-nguyen/content.json";

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Gauge,
  TrendingUp,
  UserSearch,
  Receipt,
  MessageSquareText,
  Building2,
  Network,
  Award,
  Layers,
  Package,
  Newspaper,
  Radio,
  Presentation,
  Mic,
  Users2,
  BookOpen,
  ClipboardList,
  Mic2,
  Video,
  CalendarCheck,
  PlayCircle,
};

type DropdownLink = {
  href: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
};

type DropdownColumn = {
  heading?: string;
  items: DropdownLink[];
};

type DropdownFeatured = {
  icon: LucideIcon;
  heading: string;
  body: string;
  cta: { href: string; label: string };
};

type NavItem = {
  label: string;
  href: string;
  dropdown?: {
    columns: DropdownColumn[];
    viewAll?: { href: string; label: string };
    featured?: DropdownFeatured;
  };
};

const NAV_ITEMS: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Về GCW",
    href: "/about",
    dropdown: {
      columns: [
        {
          heading: "Vì sao chọn GCW",
          items: [
            {
              href: "/about",
              label: "Giới thiệu GCW",
              description: "Strategic HR Operator — đồng hành thực thi cùng doanh nghiệp SME.",
              icon: Building2,
            },
            {
              href: "/about#ecosystem",
              label: "Hệ sinh thái WTP Group",
              description: "Mạng lưới các công ty thành viên đồng hành cùng doanh nghiệp SME.",
              icon: Network,
            },
            {
              href: "/about#differentiators",
              label: "Điểm khác biệt của GCW",
              description: "Vì sao doanh nghiệp lựa chọn GCW làm đối tác vận hành nhân sự.",
              icon: Award,
            },
            {
              href: "/#case-studies",
              label: "Câu chuyện khách hàng",
              description: homeContent.caseStudies.intro,
              icon: Rocket,
            },
          ],
        },
      ],
      featured: {
        icon: Building2,
        heading: aboutContent.cta.heading,
        body: aboutContent.cta.body,
        cta: { href: aboutContent.cta.href, label: aboutContent.cta.label },
      },
    },
  },
  {
    label: "Dịch vụ",
    href: "/services",
    dropdown: {
      columns: [
        {
          heading: "Gói dịch vụ cốt lõi",
          items: servicesContent.services.map((service) => ({
            href: `/services/${service.slug}`,
            label: service.name,
            description: service.tagline,
            icon: ICONS[service.icon],
          })),
        },
        {
          heading: "Giải pháp theo nhu cầu",
          items: solutionsContent.items.map((item) => ({
            href: item.href,
            label: item.title,
            description: item.description,
          })),
        },
        {
          heading: "Gói theo quy mô",
          items: packagesContent.tiers.map((tier) => ({
            href: "/packages",
            label: tier.name,
            description: tier.audience,
          })),
        },
      ],
      viewAll: { href: "/services", label: "Xem tất cả dịch vụ" },
      featured: {
        icon: MessageSquareText,
        heading: contactContent.heading,
        body: contactContent.quote,
        cta: { href: "/contact", label: "Đặt lịch tư vấn" },
      },
    },
  },
  {
    label: "Sự kiện",
    href: "/su-kien",
    dropdown: {
      columns: [
        {
          items: eventsContent.categories.map((category) => ({
            href: category.href,
            label: category.title,
            description: category.description,
            icon: ICONS[category.icon],
          })),
        },
      ],
      viewAll: { href: "/su-kien", label: "Xem tất cả sự kiện" },
      featured: {
        icon: Presentation,
        heading: eventsContent.cta.heading,
        body: eventsContent.cta.body,
        cta: { href: eventsContent.cta.href, label: eventsContent.cta.label },
      },
    },
  },
  { label: "Tài nguyên", href: "/news" },
  {
    label: "Đào tạo",
    href: "/about#ecosystem",
  },
  { label: "Liên hệ", href: "/contact" },
];

// The external content app groups articles by topic — reuse that grouping for
// the "Tin tức" mega-menu, but point at the site's own /news pages (which
// render the same articles with GCW's own layout) instead of the raw
// /resources proxy.
type ResourceTopicGroup = {
  title: string;
  href: string;
  items: { title: string; desc?: string; href: string }[];
};

function toNewsHref(href: string): string {
  if (href.startsWith("/resources/articles?topic=")) {
    return href.replace("/resources/articles", "/news");
  }
  if (href.startsWith("/resources/")) {
    return href.replace("/resources/", "/news/");
  }
  return href;
}

const MAX_NEWS_TOPICS = 3;
const MAX_ARTICLES_PER_TOPIC = 3;

// Companion column mirroring franklincovey.com's Resources breadth (Books,
// Guides, Podcasts, Videos...) — each links to its own /tai-nguyen/* page.
const RESOURCES_COLUMN: DropdownColumn = {
  heading: "Định dạng khác",
  items: resourcesContent.upcoming.map((item) => ({
    href: item.href,
    label: item.title,
    description: item.description,
    icon: ICONS[item.icon],
  })),
};

const DROPDOWN_GRID_BY_COLUMNS: Record<1 | 2 | 3 | 4, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsColumns, setNewsColumns] = useState<DropdownColumn[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/resources/topics")
      .then((res) => (res.ok ? (res.json() as Promise<ResourceTopicGroup[]>) : []))
      .then((groups) => {
        if (cancelled || !Array.isArray(groups)) return;
        const columns: DropdownColumn[] = groups
          .filter((group) => group.items.length > 0)
          .slice(0, MAX_NEWS_TOPICS)
          .map((group) => ({
            heading: group.title,
            items: group.items.slice(0, MAX_ARTICLES_PER_TOPIC).map((article) => ({
              href: toNewsHref(article.href),
              label: article.title,
              description: article.desc,
            })),
          }));
        if (columns.length > 0) setNewsColumns(columns);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const navItems: NavItem[] = NAV_ITEMS.map((item) =>
    item.href === "/news"
      ? {
          ...item,
          dropdown: {
            columns: [...(newsColumns ?? []), RESOURCES_COLUMN],
            viewAll: { href: "/news", label: "Xem tất cả tin tức" },
            featured: {
              icon: Newspaper,
              heading: resourcesContent.live.title,
              body: resourcesContent.live.description,
              cta: { href: resourcesContent.live.href, label: resourcesContent.live.label },
            },
          },
        }
      : item,
  );

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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex shrink-0 items-center" onClick={closeAll}>
          <Image
            src="/logo.avif"
            alt="GCW"
            width={375}
            height={116}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav className="hidden h-full items-stretch xl:flex">
          {navItems.map((item) => (
            <div key={item.href} className="group relative flex h-full items-stretch">
              <Link
                href={item.href}
                className="flex items-center gap-1 whitespace-nowrap border-b-2 border-transparent px-3 text-sm font-medium tracking-wide text-ink-soft transition-colors group-hover:border-brand-600 group-hover:text-brand-600"
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
                <div className="fixed inset-x-0 top-20 z-40 hidden max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-black/5 bg-white shadow-xl group-hover:block">
                  <div className="mx-auto flex max-w-7xl gap-12 px-4 py-10">
                    <div
                      className={`grid flex-1 gap-x-10 gap-y-8 ${
                        DROPDOWN_GRID_BY_COLUMNS[
                          Math.min(item.dropdown.columns.length, 4) as 1 | 2 | 3 | 4
                        ]
                      }`}
                    >
                      {item.dropdown.columns.map((column, columnIndex) => (
                        <div key={column.heading ?? columnIndex}>
                          {column.heading && (
                            <p className="mb-3 border-b border-black/5 pb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                              {column.heading}
                            </p>
                          )}
                          <ul className="space-y-1">
                            {column.items.map((sub) => {
                              const Icon = sub.icon;
                              return (
                                <li key={sub.label}>
                                  <Link
                                    href={sub.href}
                                    className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-surface"
                                  >
                                    {Icon && (
                                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                        <Icon className="h-4 w-4" aria-hidden="true" />
                                      </span>
                                    )}
                                    <span>
                                      <span className="block text-sm font-medium text-ink">
                                        {sub.label}
                                      </span>
                                      {sub.description && (
                                        <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                                          {sub.description}
                                        </span>
                                      )}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}

                      {item.dropdown.viewAll && (
                        <div
                          className={
                            DROPDOWN_GRID_BY_COLUMNS[
                              Math.min(item.dropdown.columns.length, 4) as 1 | 2 | 3 | 4
                            ] === "grid-cols-1"
                              ? ""
                              : "col-span-full"
                          }
                        >
                          <Link
                            href={item.dropdown.viewAll.href}
                            className="inline-flex items-center gap-1 border-t border-black/5 pt-4 text-sm font-medium text-brand-600 hover:text-brand-700"
                          >
                            {item.dropdown.viewAll.label}
                            <span aria-hidden="true">→</span>
                          </Link>
                        </div>
                      )}
                    </div>

                    {item.dropdown.featured && (
                      <div className="hidden w-72 shrink-0 border-l border-black/5 pl-10 xl:block">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-bg-dark text-white">
                          <item.dropdown.featured.icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h3 className="mt-4 text-base leading-snug text-ink">
                          {item.dropdown.featured.heading}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                          {item.dropdown.featured.body}
                        </p>
                        <Link
                          href={item.dropdown.featured.cta.href}
                          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
                        >
                          {item.dropdown.featured.cta.label}
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
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
            className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-brand-600 px-5 py-2.5 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
          >
            Đặt lịch tư vấn
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="inline-flex items-center justify-center rounded-md p-2 text-ink xl:hidden"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-black/5 bg-white xl:hidden">
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
            {navItems.map((item) => (
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
                  <div className="ml-3 space-y-3 border-l border-black/5 pl-3">
                    {item.dropdown.columns.map((column, columnIndex) => (
                      <div key={column.heading ?? columnIndex}>
                        {column.heading && (
                          <p className="px-3 pb-1 text-xs font-medium uppercase tracking-wide text-muted">
                            {column.heading}
                          </p>
                        )}
                        <ul className="space-y-1">
                          {column.items.map((sub) => (
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
                        </ul>
                      </div>
                    ))}
                    {item.dropdown.viewAll && (
                      <Link
                        href={item.dropdown.viewAll.href}
                        onClick={closeAll}
                        className="block rounded-md px-3 py-2 text-sm font-medium text-brand-600"
                      >
                        {item.dropdown.viewAll.label} →
                      </Link>
                    )}
                    {item.dropdown.featured && (
                      <Link
                        href={item.dropdown.featured.cta.href}
                        onClick={closeAll}
                        className="block rounded-md bg-bg-muted px-3 py-3 text-sm font-medium text-ink"
                      >
                        {item.dropdown.featured.heading}
                        <span className="mt-0.5 block text-xs font-normal text-brand-600">
                          {item.dropdown.featured.cta.label} →
                        </span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
