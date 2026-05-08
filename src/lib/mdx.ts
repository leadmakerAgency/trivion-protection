import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type MdxFrontmatter = {
  title: string;
  description: string;
  /** ISO-ish date shown in articles */
  date: string;
  /** Optional update timestamp for freshness (OG `modified_time`, JSON-LD) */
  updated?: string;
  author?: string;
  /** Card / hero image URL path; files live in `content/media` and are copied to `public/media` — use e.g. `/media/construction.webp` */
  coverImage?: string;
};

const blogDir = path.join(process.cwd(), "content", "blog");

const readBlogCollection = () => {
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
      const { data } = matter(raw);
      const meta = data as MdxFrontmatter;
      return { slug, ...meta, segment: "blog" as const };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getBlogIndex = () => readBlogCollection();

export const getMdxSource = (slug: string) => {
  const file = path.join(blogDir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  return { meta: data as MdxFrontmatter, content };
};

export const getMdxSlugs = (): string[] => {
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
};

/** Best-effort last modified: max of file mtime and frontmatter `date` / `updated`. */
export const getMdxLastModified = (slug: string): Date => {
  const filePath = path.join(blogDir, `${slug}.mdx`);
  let fileMtimeMs = Date.now();
  if (fs.existsSync(filePath)) {
    fileMtimeMs = fs.statSync(filePath).mtime.getTime();
  }
  const post = getMdxSource(slug);
  if (!post) return new Date(fileMtimeMs);
  const publishedMs = new Date(post.meta.date).getTime();
  let latestMs = Math.max(fileMtimeMs, Number.isNaN(publishedMs) ? 0 : publishedMs);
  if (post.meta.updated) {
    const u = new Date(post.meta.updated).getTime();
    if (!Number.isNaN(u)) latestMs = Math.max(latestMs, u);
  }
  return new Date(latestMs);
};

export type MdxLinkPreview = {
  segment: "blog";
  slug: string;
  title: string;
  description: string;
  href: string;
};

/** Title + description for deep links from service/area pages (no body). */
export const getMdxLinkPreview = (slug: string): MdxLinkPreview | null => {
  const post = getMdxSource(slug);
  if (!post) return null;
  return {
    segment: "blog",
    slug,
    title: post.meta.title,
    description: post.meta.description,
    href: `/blog/${slug}`,
  };
};

export const resolveMdxLinkPreviews = (slugs: string[]): MdxLinkPreview[] =>
  slugs.map((slug) => getMdxLinkPreview(slug)).filter((x): x is MdxLinkPreview => x != null);
