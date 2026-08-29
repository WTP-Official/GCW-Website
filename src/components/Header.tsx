"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
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
import packagesContent from "@/app/(pages)/packages/content.json";
import aboutContent from "@/app/(pages)/about/content.json";
import contactContent from "@/app/(pages)/contact/content.json";
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
  image?: string;
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
  {
    label: "Vì sao chọn GCW",
    href: "/solutions",
    dropdown: {
      columns: [
        {
          items: [
            {
              href: "/solutions/phat-trien-lanh-dao",
              label: "Phát triển lãnh đạo",
              description:
                "Xây dựng đội ngũ lãnh đạo hiệu quả ở mọi cấp bậc, gắn kết mọi người quanh mục tiêu chung.",
              icon: Award,
              image: "/images/offering-gcw-safe.jpg",
            },
            {
              href: "/solutions/xay-dung-van-hoa",
              label: "Xây dựng văn hoá tin cậy",
              description:
                "Kiến tạo văn hoá tin cậy cao, nơi những ý tưởng tốt nhất được nuôi dưỡng và phát triển.",
              icon: Network,
              image: "/images/offering-gcw-control.jpg",
            },
            {
              href: "/solutions/tao-ket-qua-dot-pha",
              label: "Tạo kết quả đột phá",
              description: "Đồng hành thực thi cùng đội ngũ để đạt được mục tiêu quan trọng nhất.",
              icon: Rocket,
              image: "/images/offering-gcw-scale.jpg",
            },
          ],
        },
      ],
      featured: {
        icon: Building2,
        heading: "Xem toàn bộ lý do vì sao chọn GCW",
        body: "Số liệu, triết lý và 3 trụ cột giúp GCW đồng hành cùng tổ chức của bạn.",
        cta: { href: "/solutions", label: "Vì sao chọn GCW" },
      },
    },
  },
  {
    label: "Chương trình",
    href: "/services",
    dropdown: {
      columns: [
        {
          heading: "Chương trình cốt lõi",
          items: servicesContent.services.map((service) => ({
            href: `/services/${service.slug}`,
            label: service.name,
            description: service.tagline,
            icon: ICONS[service.icon],
            image: service.image,
          })),
        },
        {
          heading: "Gói All Access",
          items: packagesContent.included.categories.map((category) => ({
            href: "/packages",
            label: category.name,
            description: category.description,
            image: category.image,
          })),
        },
      ],
      viewAll: { href: "/services", label: "Xem tất cả chương trình" },
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
  { label: "Tài nguyên", href: "/tai-nguyen" },
  { label: "Giáo dục", href: "/giao-duc" },
  {
    label: "Liên hệ",
    href: "/contact",
    dropdown: {
      columns: [
        {
          items: [
            {
              href: "/about",
              label: "Giới thiệu GCW",
              description: aboutContent.hero.body,
              icon: Building2,
            },
            {
              href: "/contact",
              label: "Liên hệ GCW",
              description: contactContent.quote,
              icon: MessageSquareText,
            },
          ],
        },
      ],
    },
  },
];

// The external content app groups articles by topic — reuse that grouping for
// the "Tài nguyên" mega-menu, but point at the site's own /blog
// pages (which render the same articles with GCW's own layout) instead of
// the raw /blog proxy.
type ResourceTopicGroup = {
  title: string;
  href: string;
  items: { title: string; desc?: string; href: string }[];
};

function toBlogHref(href: string): string {
  if (href.startsWith("/blog/articles?topic=")) {
    return href.replace("/blog/articles", "/blog");
  }
  if (href.startsWith("/blog/")) {
    return href.replace("/blog/", "/blog/");
  }
  return href;
}

const MAX_NEWS_TOPICS = 3;
const MAX_ARTICLES_PER_TOPIC = 3;

// Companion column mirroring franklincovey.com's Resources breadth (Books,
// Guides, Podcasts, Videos...) — each links to its own /tai-nguyen/* page.
const RESOURCES_COLUMN: DropdownColumn = {
  heading: "Định dạng khác",
  items: resourcesContent.items.map((item) => ({
    href: item.href,
    label: item.title,
    description: item.description,
    icon: ICONS[item.icon],
  })),
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null,
  );
  const [newsColumns, setNewsColumns] = useState<DropdownColumn[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/blog/topics")
      .then((res) =>
        res.ok ? (res.json() as Promise<ResourceTopicGroup[]>) : [],
      )
      .then((groups) => {
        if (cancelled || !Array.isArray(groups)) return;
        const columns: DropdownColumn[] = groups
          .filter((group) => group.items.length > 0)
          .slice(0, MAX_NEWS_TOPICS)
          .map((group) => ({
            heading: group.title,
            items: group.items
              .slice(0, MAX_ARTICLES_PER_TOPIC)
              .map((article) => ({
                href: toBlogHref(article.href),
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
    item.href === "/tai-nguyen"
      ? {
          ...item,
          dropdown: {
            columns: [...(newsColumns ?? []), RESOURCES_COLUMN],
            viewAll: { href: "/blog", label: "Xem tất cả tin tức" },
            featured: {
              icon: Newspaper,
              heading: resourcesContent.items[0].title,
              body: resourcesContent.items[0].description,
              cta: {
                href: resourcesContent.items[0].href,
                label: resourcesContent.items[0].label,
              },
            },
          },
        }
      : item,
  );

  const closeAll = () => {
    setIsMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur">
      <div className="mx-auto mt-[10px] flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={closeAll}
        >
          <Image
            src="/GCW_Logo-Horizontal_Slogan_Color_Transparent.png"
            alt="GCW"
            width={1182}
            height={709}
            priority
            className="h-24 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
        <nav className="flex h-full items-stretch">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="group relative flex h-full items-stretch"
            >
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

              {item.dropdown && (() => {
                const flatItems = item.dropdown.columns.flatMap((c) => c.items);
                const twoCol = flatItems.length > 3;
                return (
                  <div
                    className={`invisible absolute left-0 top-full z-40 -translate-y-1 overflow-hidden rounded-md border border-black/10 bg-white opacity-0 shadow-xl transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
                      twoCol ? "w-[42rem]" : "w-[26rem]"
                    }`}
                  >
                    <div className="p-6">
                      <ul
                        className={`gap-x-8 gap-y-6 ${twoCol ? "grid grid-cols-2" : "space-y-6"}`}
                      >
                        {flatItems.map((sub) => {
                          const Icon = sub.icon;
                          return (
                            <li key={sub.label}>
                              <Link href={sub.href} className="group/item flex gap-4">
                                {sub.image ? (
                                  <span className="relative h-20 w-24 shrink-0 overflow-hidden rounded-md">
                                    <Image
                                      src={sub.image}
                                      alt=""
                                      fill
                                      sizes="96px"
                                      className="photo-grade object-cover"
                                    />
                                  </span>
                                ) : (
                                  Icon && (
                                    <span className="flex h-20 w-24 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                      <Icon className="h-6 w-6" aria-hidden="true" />
                                    </span>
                                  )
                                )}
                                <span>
                                  <span className="flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover/item:text-brand-700">
                                    {sub.label}
                                    <ChevronDown
                                      className="h-3.5 w-3.5 -rotate-90"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  {sub.description && (
                                    <span className="mt-1.5 line-clamp-2 block text-xs leading-relaxed text-ink-soft">
                                      {sub.description}
                                    </span>
                                  )}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>

                      {item.dropdown.viewAll && (
                        <Link
                          href={item.dropdown.viewAll.href}
                          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
                        >
                          {item.dropdown.viewAll.label}
                          <span aria-hidden="true">→</span>
                        </Link>
                      )}
                    </div>

                    {item.dropdown.featured && (
                      <Link
                        href={item.dropdown.featured.cta.href}
                        className="flex items-center gap-4 border-t border-black/10 bg-surface-2 p-6 transition-colors hover:bg-surface-3"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-bg-dark text-white">
                          <item.dropdown.featured.icon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-ink">
                            {item.dropdown.featured.heading}
                          </span>
                          <span className="mt-1 line-clamp-1 block text-xs text-ink-soft">
                            {item.dropdown.featured.body}
                          </span>
                        </span>
                      </Link>
                    )}
                  </div>
                );
              })()}
            </div>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-brand-600 px-5 py-2.5 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
          >
            Đặt lịch tư vấn
          </Link>
        </div>
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

      <div className="mx-auto my-[20px] h-px w-full max-w-[1320px] bg-black" aria-hidden="true" />

      <div
        inert={!isMenuOpen}
        className={`grid overflow-hidden border-black/5 bg-white transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          isMenuOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
        }`}
      >
        <nav className="min-h-0">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
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
                        setOpenMobileDropdown((open) =>
                          open === item.href ? null : item.href,
                        )
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
      </div>
    </header>
  );
}
