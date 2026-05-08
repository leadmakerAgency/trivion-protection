import type { Metadata } from "next";
import { ArchiveArticleCard } from "@/components/ArchiveArticleCard";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { buildMetadata } from "@/lib/seo";
import { getBlogIndex } from "@/lib/mdx";
import { resolveBlogCover } from "@/lib/blog-covers";

/**
 * Public /blog lists MDX files under content/blog (see getBlogIndex).
 * Sveltia’s Eleventy posts live under eleventy-blog/src/posts; they do not appear here until you add matching
 * MDX under content/blog (or build a sync/export step).
 */

export const metadata: Metadata = buildMetadata({
  title: "Blog: Los Angeles security insights",
  description:
    "Updates and practical insights on private security in Los Angeles: patrol design, construction theft trends, and hiring guidance from Trivon Protection.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getBlogIndex();
  return (
    <InteriorPageShell
      surface="paper"
      breadcrumbs={[{ href: "/blog", label: "Blog" }]}
      breadcrumbMode="seoOnly"
      title="Blog"
      description="Practical notes for Los Angeles County operators."
      headerPadding="compact"
      headerClassName="pb-8"
      contentWidth="narrow"
    >
      {posts.length === 0 ? (
        <p className="mx-auto max-w-xl text-center text-sm leading-relaxed text-muted-on-light">No posts yet.</p>
      ) : (
        <ul className="mx-auto grid max-w-3xl list-none gap-8 p-0 sm:gap-10">
          {posts.map((p) => (
            <li key={p.slug} className="min-w-0">
              <ArchiveArticleCard
                href={`/blog/${p.slug}`}
                title={p.title}
                description={p.description}
                date={p.date}
                imageSrc={resolveBlogCover(p.slug, p.coverImage)}
                imageAlt={`Photography illustrating “${p.title}”`}
                variant="minimal"
              />
            </li>
          ))}
        </ul>
      )}
    </InteriorPageShell>
  );
}
