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

/** Raw YAML from Sveltia / Eleventy posts (`eleventy-blog/src/posts/*.md`). */
type RawCmsPostFrontmatter = {
  title?: string;
  description?: string;
  excerpt?: string;
  date?: string;
  updated?: string;
  author?: string;
  coverImage?: string;
  featured_image?: string;
  draft?: boolean;
  body?: string;
};

const blogMdxDir = path.join(process.cwd(), "content", "blog");
const sveltiaPostsDir = path.join(process.cwd(), "eleventy-blog", "src", "posts");

const isDraft = (data: Record<string, unknown>): boolean => data.draft === true;

const normalizeFrontmatter = (data: Record<string, unknown>): MdxFrontmatter => {
  const title = typeof data.title === "string" ? data.title : "Untitled";
  const description =
    (typeof data.description === "string" && data.description.trim()
      ? data.description
      : typeof data.excerpt === "string"
        ? data.excerpt
        : "") || "";
  const date = typeof data.date === "string" ? data.date : new Date().toISOString();
  const coverImage =
    (typeof data.coverImage === "string" && data.coverImage) ||
    (typeof data.featured_image === "string" && data.featured_image) ||
    undefined;
  const meta: MdxFrontmatter = {
    title,
    description,
    date,
    ...(typeof data.updated === "string" ? { updated: data.updated } : {}),
    ...(typeof data.author === "string" ? { author: data.author } : {}),
    ...(coverImage ? { coverImage } : {}),
  };
  return meta;
};

const stripBodyFromData = (data: Record<string, unknown>): Record<string, unknown> => {
  const { body: _b, ...rest } = data;
  return rest;
};

const parsePostFile = (
  filePath: string,
): { meta: MdxFrontmatter; content: string } | null => {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const record = data as Record<string, unknown>;
  if (isDraft(record)) return null;
  const meta = normalizeFrontmatter(stripBodyFromData(record));
  const bodyFromFm = record.body;
  const markdownBody =
    typeof bodyFromFm === "string" && bodyFromFm.trim().length > 0 ? bodyFromFm : content;
  return { meta, content: markdownBody };
};

export type BlogIndexEntry = { slug: string; segment: "blog" } & MdxFrontmatter;

const readBlogCollection = (): BlogIndexEntry[] => {
  const bySlug = new Map<string, BlogIndexEntry>();

  if (fs.existsSync(blogMdxDir)) {
    for (const file of fs.readdirSync(blogMdxDir)) {
      if (!file.endsWith(".mdx")) continue;
      const slug = file.replace(/\.mdx$/, "");
      const parsed = parsePostFile(path.join(blogMdxDir, file));
      if (!parsed) continue;
      bySlug.set(slug, { slug, segment: "blog", ...parsed.meta });
    }
  }

  if (fs.existsSync(sveltiaPostsDir)) {
    for (const file of fs.readdirSync(sveltiaPostsDir)) {
      if (!file.endsWith(".md") || file === "posts.11tydata.js") continue;
      const slug = file.replace(/\.md$/, "");
      if (bySlug.has(slug)) continue;
      const parsed = parsePostFile(path.join(sveltiaPostsDir, file));
      if (!parsed) continue;
      bySlug.set(slug, { slug, segment: "blog", ...parsed.meta });
    }
  }

  return [...bySlug.values()].sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getBlogIndex = () => readBlogCollection();

export const getMdxSource = (slug: string) => {
  const mdxPath = path.join(blogMdxDir, `${slug}.mdx`);
  if (fs.existsSync(mdxPath)) {
    return parsePostFile(mdxPath);
  }
  const mdPath = path.join(sveltiaPostsDir, `${slug}.md`);
  if (fs.existsSync(mdPath)) {
    return parsePostFile(mdPath);
  }
  return null;
};

export const getMdxSlugs = (): string[] => {
  const slugs = new Set<string>();
  if (fs.existsSync(blogMdxDir)) {
    for (const f of fs.readdirSync(blogMdxDir)) {
      if (f.endsWith(".mdx")) {
        const slug = f.replace(/\.mdx$/, "");
        const parsed = parsePostFile(path.join(blogMdxDir, f));
        if (parsed) slugs.add(slug);
      }
    }
  }
  if (fs.existsSync(sveltiaPostsDir)) {
    for (const f of fs.readdirSync(sveltiaPostsDir)) {
      if (!f.endsWith(".md") || f === "posts.11tydata.js") continue;
      const slug = f.replace(/\.md$/, "");
      if (slugs.has(slug)) continue;
      const parsed = parsePostFile(path.join(sveltiaPostsDir, f));
      if (parsed) slugs.add(slug);
    }
  }
  return [...slugs];
};

/** Best-effort last modified: max of file mtime and frontmatter `date` / `updated`. */
export const getMdxLastModified = (slug: string): Date => {
  const mdxPath = path.join(blogMdxDir, `${slug}.mdx`);
  const mdPath = path.join(sveltiaPostsDir, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : mdxPath;
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
