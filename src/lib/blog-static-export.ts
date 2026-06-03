import { getMdxSlugs } from "@/lib/mdx";

/**
 * Next.js `output: "export"` requires at least one entry in `generateStaticParams` for each dynamic segment.
 * When there are no published posts in `content/posts`, we still emit this slug
 * so the build succeeds; the page redirects to `/blog`.
 */
export const BLOG_STATIC_EXPORT_STUB_SLUG = "__blog_build_stub";

/** Shared by `blog/[slug]/layout.tsx` and `blog/[slug]/opengraph-image.tsx` (metadata routes do not inherit layout `generateStaticParams`). */
export function getBlogSlugStaticParams(): { slug: string }[] {
  const slugs = getMdxSlugs();
  if (slugs.length > 0) {
    return slugs.map((slug) => ({ slug }));
  }
  return [{ slug: BLOG_STATIC_EXPORT_STUB_SLUG }];
}
