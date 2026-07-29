import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CONTENT_BRAND_SLUG } from "@/constants/site";

const API_ORIGIN = "https://api.aeo.how";

// Refresh hourly — matches the news list's cadence.
export const revalidate = 3600;

type ArticleLink = { title: string; slug: string };

type ApiArticleDetail = {
  title: string;
  content: string;
  publishedAt: string;
  topicName: string;
  slug: string;
  relatedArticles: (ArticleLink & { topicName: string })[];
  prevArticle: ArticleLink | null;
  nextArticle: ArticleLink | null;
};

type Params = { slug: string };

async function getArticle(slug: string): Promise<ApiArticleDetail | null> {
  try {
    const res = await fetch(
      `${API_ORIGIN}/api/public/${CONTENT_BRAND_SLUG}/articles/${slug}`,
      { next: { revalidate } },
    );
    if (!res.ok) return null;
    return (await res.json()) as ApiArticleDetail;
  } catch {
    return null;
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticle(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.title,
  };
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getArticle(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/news" className="text-sm font-medium text-brand-600 hover:text-brand-700">
        ← Về trang Tin tức
      </Link>

      <div className="mt-6 flex items-center gap-3 text-sm text-muted">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        {post.topicName && (
          <>
            <span aria-hidden>·</span>
            <span>{post.topicName}</span>
          </>
        )}
      </div>
      <h1 className="mt-2 text-3xl font-bold">{post.title}</h1>

      <div
        className="mt-8 text-ink-soft [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-1 [&_a]:text-brand-600 [&_a]:underline [&_table]:mt-6 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-surface-3 [&_th]:bg-surface [&_th]:p-2 [&_th]:text-left [&_td]:border [&_td]:border-surface-3 [&_td]:p-2 [&_strong]:font-semibold [&_strong]:text-ink"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {(post.prevArticle || post.nextArticle) && (
        <nav
          aria-label="Article navigation"
          className="mt-12 flex items-center justify-between border-t border-surface-3 pt-6 text-sm font-medium"
        >
          {post.prevArticle ? (
            <Link
              href={`/news/${post.prevArticle.slug}`}
              className="text-brand-600 hover:text-brand-700"
            >
              ← {post.prevArticle.title}
            </Link>
          ) : (
            <span />
          )}
          {post.nextArticle ? (
            <Link
              href={`/news/${post.nextArticle.slug}`}
              className="text-right text-brand-600 hover:text-brand-700"
            >
              {post.nextArticle.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}

      {post.relatedArticles?.length > 0 && (
        <div className="mt-12 border-t border-surface-3 pt-8">
          <h2 className="text-lg font-semibold text-ink">Bài viết liên quan</h2>
          <div className="mt-4 flex flex-col gap-3">
            {post.relatedArticles.map((related) => (
              <Link
                key={related.slug}
                href={`/news/${related.slug}`}
                className="text-brand-600 hover:text-brand-700"
              >
                {related.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
