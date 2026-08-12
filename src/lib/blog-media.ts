import fs from "fs";
import path from "path";

const mediaDir = path.join(process.cwd(), "content", "media");

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

  if (!fs.existsSync(mediaDir)) return normalized;

  const direct = path.join(mediaDir, basename);
  if (fs.existsSync(direct)) return `/media/${basename}`;

  const stem = basename.replace(/\.[^.]+$/, "");
  const files = fs.readdirSync(mediaDir).filter((name) => !name.startsWith("."));

  const prefixMatch = files.find((name) => name.startsWith(stem));
  if (prefixMatch) return `/media/${prefixMatch}`;

  const slugMatch = files.find((name) => name.startsWith(`image-${slug}`));
  if (slugMatch) return `/media/${slugMatch}`;

  return normalized;
};
