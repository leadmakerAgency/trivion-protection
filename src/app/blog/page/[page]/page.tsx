import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogPostsGrid } from "@/components/BlogPostsGrid";
import { InteriorPageShell } from "@/components/InteriorPageShell";
import { getPageSlice, getTotalPages } from "@/lib/blog-pagination";
import { getBlogIndex } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

type PageProps = {
  params: Promise<{ page: string }>;
};

const parsePageParam = (raw: string): number | null => {
  const page = Number.parseInt(raw, 10);
  if (!Number.isFinite(page) || page < 2) return null;
  return page;
};

export const generateStaticParams = () => {
  const posts = getBlogIndex();
  const totalPages = getTotalPages(posts.length);
  if (totalPages <= 1) return [{ page: "2" }];
  return Array.from({ length: totalPages - 1 }, (_, idx) => ({ page: String(idx + 2) }));
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { page: rawPage } = await params;
  const page = parsePageParam(rawPage);
  const totalPages = getTotalPages(getBlogIndex().length);
  if (totalPages <= 1 && page === 2) {
    return {
      title: "Blog: Page 2",
      robots: { index: false, follow: true },
    };
  }
  if (page == null || page > totalPages) return {};
  return buildMetadata({
    title: `Blog: Page ${page}`,
    description: `Page ${page} of ${totalPages} blog posts from ${SITE_NAME}.`,
    path: `/blog/page/${page}`,
  });
};

export default async function BlogPaginationPage({ params }: PageProps) {
  const { page: rawPage } = await params;
  const page = parsePageParam(rawPage);
  if (page == null) notFound();

  const posts = getBlogIndex();
  if (posts.length <= 15 && page === 2) {
    permanentRedirect("/blog");
  }
  const { totalPages, slice } = getPageSlice(posts, page);
  if (page > totalPages || totalPages <= 1) notFound();

  return (
    <InteriorPageShell
      surface="paper"
      breadcrumbs={[{ href: "/blog", label: "Blog" }]}
      breadcrumbMode="seoOnly"
      title="Blog"
      description="Practical notes for Los Angeles County operators."
      headerPadding="compact"
      headerClassName="pb-8"
      contentWidth="wide"
    >
      <BlogPostsGrid posts={slice} currentPage={page} totalPages={totalPages} />
    </InteriorPageShell>
  );
}
