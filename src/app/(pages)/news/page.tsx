import type { Metadata } from "next";
import Link from "next/link";
import content from "./content.json";
import { CONTENT_BRAND_SLUG } from "@/constants/site";
import { NewsTopicFilter } from "./_components/NewsTopicFilter";

// Articles come from the external public API (same content source as
// /resources — see src/app/api/resources/topics/route.ts), so the page
// doesn't need its own content.json list.
const API_ORIGIN = "https://api.aeo.how";
const PAGE_SIZE = 9;

// Refresh hourly — matches the topics endpoint's cadence, content changes rarely.
export const revalidate = 3600;

type ApiArticle = {
  title: string;
  excerpt: string;
  publishedAt: string;
  topicName: string;
  slug: string;
};

type ApiArticleList = {
  data: ApiArticle[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type ApiTopic = { topicName: string };

async function getArticles(
  page: number,
  topic?: string,
): Promise<ApiArticleList | null> {
  try {
    const topicParam = topic ? `&topic=${encodeURIComponent(topic)}` : "";
    const res = await fetch(
      `${API_ORIGIN}/api/public/${CONTENT_BRAND_SLUG}/articles?page=${page}&limit=${PAGE_SIZE}${topicParam}`,
      { next: { revalidate } },
    );
    if (!res.ok) return null;
    return (await res.json()) as ApiArticleList;
  } catch {
    return null;
  }
}

async function getTopics(): Promise<string[]> {
  try {
    const res = await fetch(
      `${API_ORIGIN}/api/public/${CONTENT_BRAND_SLUG}/topics/latest-articles?perTopic=1`,
      { next: { revalidate } },
    );
    if (!res.ok) return [];
    const topics = (await res.json()) as ApiTopic[];
    return (Array.isArray(topics) ? topics : [])
      .map((t) => t?.topicName)
      .filter((name): name is string => Boolean(name));
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; topic?: string }>;
}) {
  const { page: pageParam, topic } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const [list, topics] = await Promise.all([
    getArticles(page, topic),
    getTopics(),
  ]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">{content.heading}</h1>
      <p className="mt-4 text-ink-soft">{content.intro}</p>

      {topics.length > 0 && (
        <NewsTopicFilter topics={topics} selectedTopic={topic} />
      )}

      {!list || list.data.length === 0 ? (
        <p className="mt-12 text-ink-soft">
          Chưa có bài viết nào, vui lòng quay lại sau.
        </p>
      ) : (
        <>
          <div className="mt-12 flex flex-col gap-10">
            {list.data.map((post) => (
              <article
                key={post.slug}
                className="border-b border-surface-3 pb-10 last:border-b-0"
              >
                <div className="flex items-center gap-3 text-sm text-muted">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  {post.topicName && (
                    <>
                      <span aria-hidden>·</span>
                      <span>{post.topicName}</span>
                    </>
                  )}
                </div>
                <h2 className="mt-2 text-xl font-semibold">
                  <Link href={`/news/${post.slug}`} className="hover:text-brand-600">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-ink-soft">{post.excerpt}</p>
                <Link
                  href={`/news/${post.slug}`}
                  className="mt-3 inline-block text-sm font-medium text-brand-600 hover:text-brand-700"
                >
                  Đọc tiếp →
                </Link>
              </article>
            ))}
          </div>

          {list.totalPages > 1 && (
            <nav
              aria-label="News pagination"
              className="mt-4 flex items-center justify-between text-sm font-medium"
            >
              {page > 1 ? (
                <Link
                  href={`/news?page=${page - 1}${topic ? `&topic=${encodeURIComponent(topic)}` : ""}`}
                  className="text-brand-600 hover:text-brand-700"
                >
                  ← Mới hơn
                </Link>
              ) : (
                <span />
              )}
              <span className="text-muted">
                Trang {list.page} / {list.totalPages}
              </span>
              {page < list.totalPages ? (
                <Link
                  href={`/news?page=${page + 1}${topic ? `&topic=${encodeURIComponent(topic)}` : ""}`}
                  className="text-brand-600 hover:text-brand-700"
                >
                  Cũ hơn →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </>
      )}
    </main>
  );
}
