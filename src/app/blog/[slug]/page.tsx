import Image from "next/image";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { JsonLd } from "@/components/JsonLd";
import { MdxArticle } from "@/components/MdxArticle";
import { buildMetadata } from "@/lib/seo";
import { buildMdxArticleStructuredData } from "@/lib/jsonld/article-page";
import { resolveBlogCover } from "@/lib/blog-covers";
import { BLOG_STATIC_EXPORT_STUB_SLUG } from "@/lib/blog-static-export";
import { getMdxSource } from "@/lib/mdx";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  if (slug === BLOG_STATIC_EXPORT_STUB_SLUG) {
    return { title: "Blog", robots: { index: false, follow: true } };
  }
  const post = getMdxSource(slug);
  if (!post) return {};
  const path = `/blog/${slug}`;
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

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === BLOG_STATIC_EXPORT_STUB_SLUG) {
    permanentRedirect("/blog");
  }

  const post = getMdxSource(slug);
  if (!post) notFound();

  const cover = resolveBlogCover(slug, post.meta.coverImage);
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
        breadcrumbMode="seoOnly"
        breadcrumbs={[
          { href: "/blog", label: "Blog" },
          { href: `/blog/${slug}`, label: post.meta.title },
        ]}
        meta={
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-dark">{dateLabel}</p>
        }
        title={post.meta.title}
        description={post.meta.description}
        contentWidth="narrow"
        contentClassName="pt-2"
      >
        <div className="space-y-10">
          <div className="relative aspect-[21/9] min-h-[12rem] w-full overflow-hidden rounded-2xl border border-surface-light-edge bg-surface-light shadow-sm sm:aspect-[2.4/1] sm:min-h-[14rem]">
            <Image
              src={cover}
              alt={`Cover image for article: ${post.meta.title}`}
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
