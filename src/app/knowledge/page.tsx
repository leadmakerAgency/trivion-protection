import Link from "next/link";
import type { Metadata } from "next";
import { ArchiveSidebar } from "@/components/ArchiveSidebar";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { buildMetadata } from "@/lib/seo";
import { getKnowledgeIndex } from "@/lib/mdx";

export const metadata: Metadata = buildMetadata({
  title: "Knowledge base — Los Angeles security guides",
  description:
    "Evergreen guides on Los Angeles security guard costs, armed vs unarmed coverage, fire watch basics, and construction site loss prevention from Trivon Protection.",
  path: "/knowledge",
});

export default function KnowledgeIndexPage() {
  const posts = getKnowledgeIndex();
  return (
    <InteriorPageShell
      pageTone="archive"
      breadcrumbs={[{ href: "/knowledge", label: "Knowledge" }]}
      title="Knowledge base"
      description="Practical articles for hiring managers comparing Los Angeles security guard companies—written
          to help you scope services correctly, not to substitute for a licensed consultation at your
          specific site."
      sidebar={
        <ArchiveSidebar
          segment="knowledge"
          recent={posts.slice(0, 5).map((p) => ({ slug: p.slug, title: p.title }))}
        />
      }
    >
      {posts.length === 0 ? (
        <p className="text-sm text-muted-on-light">Articles are loading soon.</p>
      ) : (
        <ul className="border-t border-surface-light-edge">
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-surface-light-edge last:border-b-0">
              <Link
                href={`/knowledge/${p.slug}`}
                className="group block py-4 transition-colors hover:bg-white"
              >
                <p className="text-xs text-muted-on-light">
                  {new Date(p.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-foreground-on-light group-hover:underline group-hover:text-accent-dark">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm text-muted-on-light">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </InteriorPageShell>
  );
}
