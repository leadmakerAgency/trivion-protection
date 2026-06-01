import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { isPublishedForSite } from "@/lib/post-visibility";

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

type ParsedPost = { meta: MdxFrontmatter; content: string };
type SourceDefinition = {
  dir: string;
  allowedExtensions: string[];
  ignoredFiles?: string[];
};

/**
 * Source priority matters:
 * 1) `content/posts` (n8n automation + future Sveltia target)
 * 2) `content/blog` (legacy MDX posts)
 * 3) `eleventy-blog/src/posts` (legacy Sveltia/Eleventy posts)
 */
const postSources: SourceDefinition[] = [
  {
    dir: path.join(process.cwd(), "content", "posts"),
    allowedExtensions: [".md", ".mdx"],
  },
  {
    dir: path.join(process.cwd(), "content", "blog"),
    allowedExtensions: [".mdx", ".md"],
  },
  {
    dir: path.join(process.cwd(), "eleventy-blog", "src", "posts"),
    allowedExtensions: [".md"],
    ignoredFiles: ["posts.11tydata.js"],
  },
];

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
  return {
    title,
    description,
    date,
    ...(typeof data.updated === "string" ? { updated: data.updated } : {}),
    ...(typeof data.author === "string" ? { author: data.author } : {}),
    ...(coverImage ? { coverImage } : {}),
  };
};

const stripBodyFromData = (data: Record<string, unknown>): Record<string, unknown> => {
  const { body: _body, ...rest } = data;
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
  for (const source of postSources) {
    for (const ext of source.allowedExtensions) {
      const candidate = path.join(source.dir, `${slug}${ext}`);
      if (fs.existsSync(candidate)) return candidate;
    }
  }
  return null;
};

const isEligibleSourceFile = (file: string, source: SourceDefinition): boolean => {
  if (source.ignoredFiles?.includes(file)) return false;
  return source.allowedExtensions.some((ext) => file.endsWith(ext));
};

const toSlug = (fileName: string): string => fileName.replace(/\.[^.]+$/, "");

export type BlogIndexEntry = { slug: string; segment: "blog" } & MdxFrontmatter;

const readBlogCollection = (): BlogIndexEntry[] => {
  const bySlug = new Map<string, BlogIndexEntry>();

  for (const source of postSources) {
    if (!fs.existsSync(source.dir)) continue;
    for (const file of fs.readdirSync(source.dir)) {
      if (!isEligibleSourceFile(file, source)) continue;
      const slug = toSlug(file);
      if (bySlug.has(slug)) continue;
      const parsed = parsePostFile(path.join(source.dir, file));
      if (!parsed) continue;
      bySlug.set(slug, { slug, segment: "blog", ...parsed.meta });
    }
  }

  return [...bySlug.values()].sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getBlogIndex = () => readBlogCollection();

export const getMdxSource = (slug: string): ParsedPost | null => {
  const filePath = findExistingPostFile(slug);
  if (!filePath) return null;
  return parsePostFile(filePath);
};

export const getMdxSlugs = (): string[] => {
  const slugs = new Set<string>();
  for (const source of postSources) {
    if (!fs.existsSync(source.dir)) continue;
    for (const file of fs.readdirSync(source.dir)) {
      if (!isEligibleSourceFile(file, source)) continue;
      const slug = toSlug(file);
      if (slugs.has(slug)) continue;
      const parsed = parsePostFile(path.join(source.dir, file));
      if (parsed) slugs.add(slug);
    }
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
