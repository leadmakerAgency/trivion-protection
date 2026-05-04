import Link from "next/link";
import type { Metadata } from "next";
import { ArchiveSidebar } from "@/components/ArchiveSidebar";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { buildMetadata } from "@/lib/seo";
import { getBlogIndex } from "@/lib/mdx";

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
      pageTone="archive"
      breadcrumbs={[{ href: "/blog", label: "Blog" }]}
      title="Blog"
      description="Short articles for operators who want better security outcomes in Los Angeles County—without
          the fluff."
      sidebar={
        <ArchiveSidebar
          segment="blog"
          recent={posts.slice(0, 5).map((p) => ({ slug: p.slug, title: p.title }))}
        />
      }
    >
      <ul className="border-t border-surface-light-edge">
        {posts.map((p) => (
          <li key={p.slug} className="border-b border-surface-light-edge last:border-b-0">
            <Link
              href={`/blog/${p.slug}`}
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
    </InteriorPageShell>
  );
}
