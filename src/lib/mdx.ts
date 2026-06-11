import fs from "fs";
import path from "path";
import matter from "gray-matter";
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
const blogPostsDir = path.join(process.cwd(), "content", "posts");
const blogPostExtensions = [".md", ".mdx"] as const;

const normalizeDateInput = (value: unknown): string | null => {
  const instant = getPublishInstant(value);
  if (instant == null) return null;
  return new Date(instant).toISOString();
};

const normalizeFrontmatter = (data: Record<string, unknown>): MdxFrontmatter => {
  const title = typeof data.title === "string" ? data.title : "Untitled";
  const description =
    (typeof data.description === "string" && data.description.trim()
      ? data.description
      : typeof data.excerpt === "string"
        ? data.excerpt
        : "") || "";
  const date = normalizeDateInput(data.date) ?? new Date().toISOString();
  const updated = normalizeDateInput(data.updated);
  const coverImage =
    (typeof data.coverImage === "string" && data.coverImage) ||
    (typeof data.featured_image === "string" && data.featured_image) ||
    undefined;
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

const parsePostFile = (filePath: string): ParsedPost | null => {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const record = data as Record<string, unknown>;
  if (!isPublishedForSite(record)) return null;
  const meta = normalizeFrontmatter(stripBodyFromData(record));
  const bodyFromFrontmatter = record.body;
  const markdownBody =
    typeof bodyFromFrontmatter === "string" && bodyFromFrontmatter.trim().length > 0
      ? bodyFromFrontmatter
      : content;
  return { meta, content: markdownBody };
};

const findExistingPostFile = (slug: string): string | null => {
  for (const ext of blogPostExtensions) {
    const candidate = path.join(blogPostsDir, `${slug}${ext}`);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
};

const isEligibleBlogPostFile = (file: string): boolean =>
  blogPostExtensions.some((ext) => file.endsWith(ext));

const toSlug = (fileName: string): string => fileName.replace(/\.[^.]+$/, "");

export type BlogIndexEntry = { slug: string; segment: "blog" } & MdxFrontmatter;

const readBlogCollection = (): BlogIndexEntry[] => {
  if (!fs.existsSync(blogPostsDir)) return [];
  const bySlug = new Map<string, BlogIndexEntry>();

  for (const file of fs.readdirSync(blogPostsDir)) {
    if (!isEligibleBlogPostFile(file)) continue;
    const slug = toSlug(file);
    if (bySlug.has(slug)) continue;
    const parsed = parsePostFile(path.join(blogPostsDir, file));
    if (!parsed) continue;
    bySlug.set(slug, { slug, segment: "blog", ...parsed.meta });
  }

  return [...bySlug.values()].sort((a, b) => {
    const aInstant = getPublishInstant(a.date) ?? 0;
    const bInstant = getPublishInstant(b.date) ?? 0;
    return bInstant - aInstant;
  });
};

export const getBlogIndex = () => readBlogCollection();

export const getMdxSource = (slug: string): ParsedPost | null => {
  const filePath = findExistingPostFile(slug);
  if (!filePath) return null;
  return parsePostFile(filePath);
};

export const getMdxSlugs = (): string[] => {
  if (!fs.existsSync(blogPostsDir)) return [];
  const slugs = new Set<string>();

  for (const file of fs.readdirSync(blogPostsDir)) {
    if (!isEligibleBlogPostFile(file)) continue;
    const slug = toSlug(file);
    if (slugs.has(slug)) continue;
    const parsed = parsePostFile(path.join(blogPostsDir, file));
    if (parsed) slugs.add(slug);
  }
  return [...slugs];
};

/** Best-effort last modified: max of file mtime and frontmatter `date` / `updated`. */
export const getMdxLastModified = (slug: string): Date => {
  const filePath = findExistingPostFile(slug);
  let fileMtimeMs = Date.now();
  if (filePath && fs.existsSync(filePath)) {
    fileMtimeMs = fs.statSync(filePath).mtime.getTime();
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
