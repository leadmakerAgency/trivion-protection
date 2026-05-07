import type { Metadata } from "next";
import { ArchiveSidebar } from "@/components/ArchiveSidebar";
import { ArchiveArticleCard } from "@/components/ArchiveArticleCard";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { buildMetadata } from "@/lib/seo";
import { getKnowledgeIndex } from "@/lib/mdx";
import { resolveKnowledgeCover } from "@/lib/knowledge-covers";

export const metadata: Metadata = buildMetadata({
  title: "Knowledge base: Los Angeles security guides",
  description:
    "Evergreen guides on Los Angeles security guard costs, armed vs unarmed coverage, fire watch basics, and construction site loss prevention from Trivon Protection.",
  path: "/knowledge",
});

export default function KnowledgeIndexPage() {
  const posts = getKnowledgeIndex();
  return (
    <InteriorPageShell
      surface="paper"
      pageTone="archive"
      breadcrumbs={[{ href: "/knowledge", label: "Knowledge" }]}
      title="Knowledge base"
      description="Evergreen guides for hiring managers comparing Los Angeles security vendors and scoped to help you
          procure the right coverage, not to replace a licensed consultation at your location."
      headerClassName="pb-10"
      sidebar={
        <ArchiveSidebar
          segment="knowledge"
          surface="light"
          recent={posts.slice(0, 5).map((p) => ({ slug: p.slug, title: p.title }))}
        />
      }
    >
      <div>
        {posts.length === 0 ? (
          <p className="text-sm text-muted-on-light">Articles are loading soon.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
            {posts.map((p) => (
              <ArchiveArticleCard
                key={p.slug}
                href={`/knowledge/${p.slug}`}
                title={p.title}
                description={p.description}
                date={p.date}
                imageSrc={resolveKnowledgeCover(p.slug, p.coverImage)}
                imageAlt={`Context for guide: ${p.title}`}
                readLabel="Read guide"
              />
            ))}
          </div>
        )}
      </div>
    </InteriorPageShell>
  );
}
