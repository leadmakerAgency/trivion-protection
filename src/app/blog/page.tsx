import type { Metadata } from "next";
import { ArchiveArticleCard } from "@/components/ArchiveArticleCard";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { buildMetadata } from "@/lib/seo";
import { getBlogIndex } from "@/lib/mdx";
import { resolveBlogCover } from "@/lib/blog-covers";

/**
 * Public /blog lists MDX files under content/blog (see getBlogIndex).
 * Sveltia + Eleventy use eleventy-blog/src/posts — a separate pipeline unless you mirror or sync content.
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
    </InteriorPageShell>
  );
}
