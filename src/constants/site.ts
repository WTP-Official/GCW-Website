export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3005";

// Brand slug for the external content app (blog/resources proxy). Client-specific —
// swap via env when bootstrapping a new project. See middleware.ts and
// src/app/api/resources/topics/route.ts for its usage.
export const CONTENT_BRAND_SLUG = process.env.CONTENT_BRAND_SLUG ?? "";
