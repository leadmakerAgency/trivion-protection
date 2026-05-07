import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { JsonLd } from "@/components/JsonLd";
import { MdxArticle } from "@/components/MdxArticle";
import { buildMetadata } from "@/lib/seo";
import { buildMdxArticleStructuredData } from "@/lib/jsonld/article-page";
import { resolveKnowledgeCover } from "@/lib/knowledge-covers";
import { getMdxSlugs, getMdxSource } from "@/lib/mdx";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () => getMdxSlugs("knowledge").map((slug) => ({ slug }));

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getMdxSource("knowledge", slug);
  if (!post) return {};
  const path = `/knowledge/${slug}`;
  const publishedTime = new Date(post.meta.date).toISOString();
  const modifiedTime = post.meta.updated
    ? new Date(post.meta.updated).toISOString()
    : publishedTime;
  return buildMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path,
    ogImage: `${path}/opengraph-image`,
    ogImageAlt: post.meta.title,
    openGraphType: "article",
    article: { publishedTime, modifiedTime },
  });
};

export default async function KnowledgeArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getMdxSource("knowledge", slug);
  if (!post) notFound();

  const cover = resolveKnowledgeCover(slug, post.meta.coverImage);
  const publishedTime = new Date(post.meta.date).toISOString();
  const modifiedTime = post.meta.updated
    ? new Date(post.meta.updated).toISOString()
    : publishedTime;
  const dateLabel = new Date(post.meta.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <JsonLd
        data={buildMdxArticleStructuredData(
          "knowledge",
          slug,
          post.meta.title,
          post.meta.description,
          publishedTime,
          modifiedTime,
          cover,
        )}
      />
      <InteriorPageShell
        surface="paper"
        as="article"
        headerPadding="compact"
        breadcrumbs={[
          { href: "/knowledge", label: "Knowledge" },
          { href: `/knowledge/${slug}`, label: post.meta.title },
        ]}
        meta={
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-dark">{dateLabel}</p>
        }
        title={post.meta.title}
        description={post.meta.description}
        contentClassName="pt-2"
      >
        <div className="space-y-10">
          <div className="relative aspect-[21/9] min-h-[12rem] w-full overflow-hidden rounded-2xl border border-surface-light-edge bg-surface-light shadow-sm sm:aspect-[2.4/1] sm:min-h-[14rem]">
            <Image
              src={cover}
              alt={`Illustration for guide: ${post.meta.title}`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
          <MdxArticle source={post.content} tone="light" />
        </div>
      </InteriorPageShell>
    </>
  );
}
