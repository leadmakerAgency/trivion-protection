import { siteImages } from "@/lib/site-images";

/** Optional default cover per slug when frontmatter `coverImage` is omitted — extend when you add MDX posts. */
export const blogCoverBySlug: Record<string, string> = {};

export const resolveBlogCover = (slug: string, coverImage?: string): string =>
  coverImage ?? blogCoverBySlug[slug] ?? siteImages.heroPrimary;
