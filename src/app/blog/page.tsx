import type { Metadata } from "next";
import { BlogPostsGrid } from "@/components/BlogPostsGrid";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { getPageSlice } from "@/lib/blog-pagination";
import { buildMetadata } from "@/lib/seo";
import { getBlogIndex } from "@/lib/mdx";

/**
 * Public /blog reads from `content/posts` first (automation + Sveltia), then legacy post locations.
 * See source priority in `src/lib/mdx.ts`.
 */

export const metadata: Metadata = buildMetadata({
  title: "Blog: Los Angeles security insights",
  description:
    "Updates and practical insights on private security in Los Angeles: patrol design, construction theft trends, and hiring guidance from Trivon Protection.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getBlogIndex();
  const { slice, totalPages } = getPageSlice(posts, 1);
  return (
    <InteriorPageShell
      surface="paper"
      breadcrumbs={[{ href: "/blog", label: "Blog" }]}
      breadcrumbMode="seoOnly"
      title="Blog"
      description="Practical notes for Los Angeles County operators."
      headerPadding="compact"
      headerClassName="pb-8"
      contentWidth="wide"
    >
      <BlogPostsGrid posts={slice} currentPage={1} totalPages={totalPages} />
    </InteriorPageShell>
  );
}
