import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { MdxArticle } from "@/components/MdxArticle";
import { buildMetadata } from "@/lib/seo";
import { getMdxSlugs, getMdxSource } from "@/lib/mdx";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () => getMdxSlugs("knowledge").map((slug) => ({ slug }));

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getMdxSource("knowledge", slug);
  if (!post) return {};
  return buildMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/knowledge/${slug}`,
  });
};

export default async function KnowledgeArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getMdxSource("knowledge", slug);
  if (!post) notFound();

  return (
    <InteriorPageShell
      as="article"
      headerPadding="compact"
      breadcrumbs={[
        { href: "/knowledge", label: "Knowledge" },
        { href: `/knowledge/${slug}`, label: post.meta.title },
      ]}
      meta={
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          {new Date(post.meta.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      }
      title={post.meta.title}
      description={post.meta.description}
      contentClassName="pt-2"
    >
      <MdxArticle source={post.content} />
    </InteriorPageShell>
  );
}
