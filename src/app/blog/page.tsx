import type { Metadata } from "next";
import { ArchiveSidebar } from "@/components/ArchiveSidebar";
import { ArchiveArticleCard } from "@/components/ArchiveArticleCard";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { buildMetadata } from "@/lib/seo";
import { getBlogIndex } from "@/lib/mdx";
import { resolveBlogCover } from "@/lib/blog-covers";

export const metadata: Metadata = buildMetadata({
  title: "Blog — Los Angeles security insights",
  description:
    "Updates and practical insights on private security in Los Angeles: patrol design, construction theft trends, and hiring guidance from Trivon Protection.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getBlogIndex();
  return (
    <InteriorPageShell
      surface="paper"
      pageTone="archive"
      breadcrumbs={[{ href: "/blog", label: "Blog" }]}
      title="Blog"
      description="Short articles for operators who want better security outcomes in Los Angeles County—policy, field practice, and hiring—without filler."
      headerClassName="pb-10"
      sidebar={
        <ArchiveSidebar
          segment="blog"
          surface="light"
          recent={posts.slice(0, 5).map((p) => ({ slug: p.slug, title: p.title }))}
        />
      }
    >
      <div>
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
          {posts.map((p) => (
            <ArchiveArticleCard
              key={p.slug}
              href={`/blog/${p.slug}`}
              title={p.title}
              description={p.description}
              date={p.date}
              imageSrc={resolveBlogCover(p.slug, p.coverImage)}
              imageAlt={`Photography illustrating “${p.title}”`}
            />
          ))}
        </div>
      </div>
    </InteriorPageShell>
  );
}
