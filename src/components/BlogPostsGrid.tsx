import Link from "next/link";
import { ArchiveArticleCard } from "@/components/ArchiveArticleCard";
import type { BlogIndexEntry } from "@/lib/mdx";
import { resolveBlogCover } from "@/lib/blog-covers";

type BlogPostsGridProps = {
  posts: BlogIndexEntry[];
  currentPage: number;
  totalPages: number;
};

const pageHref = (page: number): string => (page <= 1 ? "/blog" : `/blog/page/${page}`);

export const BlogPostsGrid = ({ posts, currentPage, totalPages }: BlogPostsGridProps) => (
  <div className="mx-auto max-w-7xl">
    {posts.length === 0 ? (
      <p className="mx-auto max-w-xl text-center text-sm leading-relaxed text-muted-on-light">No posts yet.</p>
    ) : (
      <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug} className="min-w-0">
            <ArchiveArticleCard
              href={`/blog/${post.slug}`}
              title={post.title}
              description={post.description}
              date={post.date}
              imageSrc={resolveBlogCover(post.slug, post.coverImage)}
              imageAlt={`Photography illustrating “${post.title}”`}
              variant="minimal"
              showDescription={false}
              showReadLink={false}
            />
          </li>
        ))}
      </ul>
    )}

    {totalPages > 1 ? (
      <nav aria-label="Blog pagination" className="mt-10 flex items-center justify-between border-t border-surface-light-edge pt-6">
        {currentPage > 1 ? (
          <Link
            href={pageHref(currentPage - 1)}
            className="focus-ring-on-light rounded-md px-3 py-2 text-sm font-semibold text-accent-dark underline-offset-4 hover:underline"
          >
            Previous
          </Link>
        ) : (
          <span className="px-3 py-2 text-sm font-semibold text-muted-on-light">Previous</span>
        )}

        <p className="text-sm text-muted-on-light">
          Page <span aria-current="page" className="font-semibold text-foreground-on-light">{currentPage}</span> of{" "}
          <span className="font-semibold text-foreground-on-light">{totalPages}</span>
        </p>

        {currentPage < totalPages ? (
          <Link
            href={pageHref(currentPage + 1)}
            className="focus-ring-on-light rounded-md px-3 py-2 text-sm font-semibold text-accent-dark underline-offset-4 hover:underline"
          >
            Next
          </Link>
        ) : (
          <span className="px-3 py-2 text-sm font-semibold text-muted-on-light">Next</span>
        )}
      </nav>
    ) : null}
  </div>
);
