import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { MdxArticle } from "@/components/MdxArticle";
import { buildMetadata } from "@/lib/seo";
import { resolveBlogCover } from "@/lib/blog-covers";
import { getMdxSlugs, getMdxSource } from "@/lib/mdx";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () => getMdxSlugs("blog").map((slug) => ({ slug }));

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getMdxSource("blog", slug);
  if (!post) return {};
  return buildMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${slug}`,
  });
};

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getMdxSource("blog", slug);
  if (!post) notFound();

  const cover = resolveBlogCover(slug, post.meta.coverImage);
  const dateLabel = new Date(post.meta.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <InteriorPageShell
      surface="paper"
      as="article"
      headerPadding="compact"
      breadcrumbs={[
        { href: "/blog", label: "Blog" },
        { href: `/blog/${slug}`, label: post.meta.title },
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
  );
}
