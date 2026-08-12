import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { resolveMediaPublicPath } from "@/lib/blog-media";
import { getPublishInstant, isPublishedForSite } from "@/lib/post-visibility";

export type MdxFrontmatter = {
  title: string;
  description: string;
  /** ISO-ish date shown in articles */
  date: string;
  /** Optional update timestamp for freshness (OG `modified_time`, JSON-LD) */
  updated?: string;
  author?: string;
  /** Card / hero image URL path; files live in `content/media` and are copied to `public/media` */
  coverImage?: string;
};

type ParsedPost = { meta: MdxFrontmatter; content: string };

type PostIndexEntry = {
  filePath: string;
  canonicalSlug: string;
  filenameSlug: string;
};

const blogPostsDir = path.join(process.cwd(), "content", "posts");
const blogPostExtensions = [".md", ".mdx"] as const;

const normalizeDateInput = (value: unknown): string | null => {
  const instant = getPublishInstant(value);
  if (instant == null) return null;
  return new Date(instant).toISOString();
};

/** n8n article bodies often use `H2:` / `H3:` labels instead of markdown headings. */
export const normalizeN8nMarkdown = (content: string): string =>
  content
    .replace(/^H2:\s*(.+)$/gm, "## $1")
    .replace(/^H3:\s*(.+)$/gm, "### $1");

const toFilenameSlug = (fileName: string): string => fileName.replace(/\.[^.]+$/, "");

const toCanonicalSlug = (data: Record<string, unknown>, filenameSlug: string): string => {
  if (typeof data.slug === "string" && data.slug.trim()) {
    return data.slug.trim();
  }
  if (typeof data.permalink === "string") {
    const match = data.permalink.match(/\/blog\/([^/]+)\/?$/);
    if (match?.[1]) return match[1];
  }
  return filenameSlug;
};

const normalizeFrontmatter = (
  data: Record<string, unknown>,
  canonicalSlug: string,
): MdxFrontmatter => {
  const title = typeof data.title === "string" ? data.title : "Untitled";
  const description =
    (typeof data.description === "string" && data.description.trim()
      ? data.description
      : typeof data.excerpt === "string"
        ? data.excerpt
        : "") || "";
  const date = normalizeDateInput(data.date) ?? new Date().toISOString();
  const updated = normalizeDateInput(data.updated);
  const rawCoverImage =
    (typeof data.coverImage === "string" && data.coverImage) ||
    (typeof data.featured_image === "string" && data.featured_image) ||
    undefined;
  const coverImage = resolveMediaPublicPath(rawCoverImage, canonicalSlug);
  return {
    title,
    description,
    date,
    ...(updated ? { updated } : {}),
    ...(typeof data.author === "string" ? { author: data.author } : {}),
    ...(coverImage ? { coverImage } : {}),
  };
};

const stripBodyFromData = (data: Record<string, unknown>): Record<string, unknown> => {
  if (!("body" in data)) return data;
  const rest = { ...data };
  delete rest.body;
  return rest;
};

const parsePostFile = (filePath: string, canonicalSlug: string): ParsedPost | null => {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const record = data as Record<string, unknown>;
  if (!isPublishedForSite(record)) return null;
  const meta = normalizeFrontmatter(stripBodyFromData(record), canonicalSlug);
  const bodyFromFrontmatter = record.body;
  const markdownBody =
    typeof bodyFromFrontmatter === "string" && bodyFromFrontmatter.trim().length > 0
      ? bodyFromFrontmatter
      : content;
  return { meta, content: normalizeN8nMarkdown(markdownBody) };
};

const isEligibleBlogPostFile = (file: string): boolean =>
  blogPostExtensions.some((ext) => file.endsWith(ext));

let postIndexCache: {
  bySlug: Map<string, PostIndexEntry>;
  canonicalSlugs: string[];
} | null = null;

const buildPostIndex = () => {
  const bySlug = new Map<string, PostIndexEntry>();
  const canonicalSlugs: string[] = [];

  if (!fs.existsSync(blogPostsDir)) {
    postIndexCache = { bySlug, canonicalSlugs };
    return postIndexCache;
  }

  for (const file of fs.readdirSync(blogPostsDir)) {
    if (!isEligibleBlogPostFile(file)) continue;

    const filePath = path.join(blogPostsDir, file);
    const filenameSlug = toFilenameSlug(file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    const record = data as Record<string, unknown>;
    if (!isPublishedForSite(record)) continue;

    const canonicalSlug = toCanonicalSlug(record, filenameSlug);
    const entry: PostIndexEntry = { filePath, canonicalSlug, filenameSlug };

    bySlug.set(canonicalSlug, entry);
    if (filenameSlug !== canonicalSlug) {
      bySlug.set(filenameSlug, entry);
    }
    canonicalSlugs.push(canonicalSlug);
  }

  postIndexCache = { bySlug, canonicalSlugs };
  return postIndexCache;
};

const getPostIndex = () => postIndexCache ?? buildPostIndex();

const findPostIndexEntry = (slug: string): PostIndexEntry | null =>
  getPostIndex().bySlug.get(slug) ?? null;

export type BlogIndexEntry = { slug: string; segment: "blog" } & MdxFrontmatter;

const readBlogCollection = (): BlogIndexEntry[] => {
  const { canonicalSlugs } = getPostIndex();
  const bySlug = new Map<string, BlogIndexEntry>();

  for (const canonicalSlug of canonicalSlugs) {
    if (bySlug.has(canonicalSlug)) continue;
    const entry = findPostIndexEntry(canonicalSlug);
    if (!entry) continue;
    const parsed = parsePostFile(entry.filePath, entry.canonicalSlug);
    if (!parsed) continue;
    bySlug.set(canonicalSlug, { slug: canonicalSlug, segment: "blog", ...parsed.meta });
  }

  return [...bySlug.values()].sort((a, b) => {
    const aInstant = getPublishInstant(a.date) ?? 0;
    const bInstant = getPublishInstant(b.date) ?? 0;
    return bInstant - aInstant;
  });
};

export const getBlogIndex = () => readBlogCollection();

export const getCanonicalBlogSlug = (slug: string): string | null =>
  findPostIndexEntry(slug)?.canonicalSlug ?? null;

export const getMdxSource = (slug: string): ParsedPost | null => {
  const entry = findPostIndexEntry(slug);
  if (!entry) return null;
  return parsePostFile(entry.filePath, entry.canonicalSlug);
};

export const getMdxSlugs = (): string[] => {
  const seen = new Set<string>();
  const slugs: string[] = [];

  for (const slug of getPostIndex().canonicalSlugs) {
    if (seen.has(slug)) continue;
    seen.add(slug);
    slugs.push(slug);
  }

  return slugs;
};

/** Best-effort last modified: max of file mtime and frontmatter `date` / `updated`. */
export const getMdxLastModified = (slug: string): Date => {
  const entry = findPostIndexEntry(slug);
  let fileMtimeMs = Date.now();
  if (entry && fs.existsSync(entry.filePath)) {
    fileMtimeMs = fs.statSync(entry.filePath).mtime.getTime();
  }
  const post = getMdxSource(slug);
  if (!post) return new Date(fileMtimeMs);
  const publishedMs = new Date(post.meta.date).getTime();
  let latestMs = Math.max(fileMtimeMs, Number.isNaN(publishedMs) ? 0 : publishedMs);
  if (post.meta.updated) {
    const updatedMs = new Date(post.meta.updated).getTime();
    if (!Number.isNaN(updatedMs)) latestMs = Math.max(latestMs, updatedMs);
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
  const canonicalSlug = getCanonicalBlogSlug(slug);
  if (!canonicalSlug) return null;
  const post = getMdxSource(canonicalSlug);
  if (!post) return null;
  return {
    segment: "blog",
    slug: canonicalSlug,
    title: post.meta.title,
    description: post.meta.description,
    href: `/blog/${canonicalSlug}`,
  };
};

export const resolveMdxLinkPreviews = (slugs: string[]): MdxLinkPreview[] =>
  slugs.map((slug) => getMdxLinkPreview(slug)).filter((x): x is MdxLinkPreview => x != null);
