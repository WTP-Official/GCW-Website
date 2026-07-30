import type { Metadata } from "next";
import Link from "next/link";
import {
  FolderCheck,
  Wallet,
  ClipboardList,
  SearchCheck,
  UserSearch,
  MessageSquareText,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import content from "./content.json";
import { CONTENT_BRAND_SLUG } from "@/constants/site";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

const ICONS: Record<string, LucideIcon> = {
  FolderCheck,
  Wallet,
  ClipboardList,
  SearchCheck,
  UserSearch,
  MessageSquareText,
};

const API_ORIGIN = "https://api.aeo.how";

// Refresh hourly — matches the article endpoints' cadence elsewhere in the app.
export const revalidate = 3600;

type ApiArticle = { title: string; slug: string };

async function getLatestArticles(): Promise<ApiArticle[]> {
  try {
    const res = await fetch(
      `${API_ORIGIN}/api/public/${CONTENT_BRAND_SLUG}/articles?page=1&limit=3`,
      { next: { revalidate } },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { data: ApiArticle[] };
    return data.data ?? [];
  } catch {
    return [];
  }
}

export default async function SolutionsPage() {
  const articles = await getLatestArticles();

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-24">
        <div className="max-w-2xl">
          <h1 className="text-3xl leading-snug text-ink sm:text-4xl">
            {content.heading}
          </h1>
          <p className="mt-4 text-ink-soft">{content.intro}</p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex flex-col overflow-hidden rounded-md border border-black/5 bg-white transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <ImagePlaceholder icon={Icon} className="h-full w-full" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg text-ink group-hover:text-brand-600">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm text-ink-soft">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {articles.length > 0 && (
        <section className="bg-surface-2 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-ink">
                {content.resourceLinks.heading}
              </h2>
              <Link
                href={content.resourceLinks.linkHref}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                {content.resourceLinks.linkLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  className="rounded-md border border-black/5 bg-white p-5 text-sm font-medium text-ink transition-shadow hover:shadow-md hover:text-brand-600"
                >
                  {article.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-bg-muted">
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h2 className="text-2xl leading-snug text-ink sm:text-3xl">
            {content.cta.heading}
          </h2>
          <p className="mt-4 text-ink-soft">{content.cta.body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={content.cta.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              {content.cta.primaryCta.label}
            </Link>
            <Link
              href={content.cta.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-md border border-black/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
            >
              {content.cta.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
