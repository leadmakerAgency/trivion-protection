import fs from "fs";
import path from "path";

/**
 * Filename list written by `scripts/copy-content-media.cjs` during prebuild.
 * Keep this to JSON only so Next.js file tracing never packs `content/media`
 * binaries into serverless functions (Vercel 250mb uncompressed limit).
 */
const manifestPath = path.join(process.cwd(), "content", "media-manifest.json");

let mediaFilenames: string[] | null = null;

const readMediaFilenames = (): string[] => {
  if (mediaFilenames) return mediaFilenames;
  if (!fs.existsSync(manifestPath)) {
    mediaFilenames = [];
    return mediaFilenames;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    mediaFilenames = Array.isArray(parsed)
      ? parsed.filter((name): name is string => typeof name === "string" && !name.startsWith("."))
      : [];
  } catch {
    mediaFilenames = [];
  }

  return mediaFilenames;
};

/**
 * n8n uploads images as `image-{slug}-{executionId}.png` while frontmatter
 * references `/media/image-{slug}.png`. Resolve the actual committed file when present.
 */
export const resolveMediaPublicPath = (
  publicPath: string | undefined,
  slug: string,
): string | undefined => {
  if (!publicPath?.trim()) return undefined;

  const normalized = publicPath.startsWith("/") ? publicPath : `/${publicPath}`;
  const basename = path.basename(normalized);
  const files = readMediaFilenames();

  if (files.includes(basename)) return `/media/${basename}`;

  const stem = basename.replace(/\.[^.]+$/, "");
  const prefixMatch = files.find((name) => name.startsWith(stem));
  if (prefixMatch) return `/media/${prefixMatch}`;

  const slugMatch = files.find((name) => name.startsWith(`image-${slug}`));
  if (slugMatch) return `/media/${slugMatch}`;

  return normalized;
};
