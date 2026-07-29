import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CONTENT_BRAND_SLUG } from "@/constants/site";

const BLOG_ORIGIN = "https://app.aeo.how";

// The external content app serves under this real base path...
const EXTERNAL_BASE = `/${CONTENT_BRAND_SLUG}/blog`;
// ...while we expose it publicly under this clean path.
const PUBLIC_BASE = "/resources";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /blog was renamed to /resources — redirect old URLs so existing links work.
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    const cleanPath = pathname.replace("/blog", PUBLIC_BASE);
    return NextResponse.redirect(
      new URL(`${cleanPath}${request.nextUrl.search}`, request.url),
    );
  }

  // The external app's own links use its real base path (/wtp-advisory/blog/*).
  // Redirect those back to the clean /resources/* URL so the address bar stays tidy.
  if (pathname === EXTERNAL_BASE || pathname.startsWith(`${EXTERNAL_BASE}/`)) {
    const cleanPath = pathname.replace(EXTERNAL_BASE, PUBLIC_BASE);
    return NextResponse.redirect(
      new URL(`${cleanPath}${request.nextUrl.search}`, request.url),
    );
  }

  // Transparently proxy /resources and /resources/* to the external content app.
  if (pathname === PUBLIC_BASE || pathname.startsWith(`${PUBLIC_BASE}/`)) {
    const targetPath = pathname.replace(PUBLIC_BASE, EXTERNAL_BASE);
    return NextResponse.rewrite(
      new URL(`${BLOG_ORIGIN}${targetPath}${request.nextUrl.search}`),
    );
  }

  // When a /resources page requests its own static assets, serve them from the external app.
  const referer = request.headers.get("referer") || "";
  if (
    (pathname.startsWith("/_next/static/") ||
      pathname.startsWith("/static/")) &&
    (referer.includes(PUBLIC_BASE) || referer.includes(EXTERNAL_BASE))
  ) {
    return NextResponse.rewrite(new URL(`${BLOG_ORIGIN}${pathname}`));
  }
}

export const config = {
  // Next.js requires `matcher` to be a static, statically-analyzable array
  // literal — it can't reference CONTENT_BRAND_SLUG. Keep the
  // '/<brand-slug>/blog' entries below in sync with that constant by hand.
  matcher: [
    "/blog",
    "/blog/:path*",
    "/resources",
    "/resources/:path*",
    "/wtp-advisory/blog",
    "/wtp-advisory/blog/:path*",
    "/_next/static/:path*",
    "/static/:path*",
  ],
};
