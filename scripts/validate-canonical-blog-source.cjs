/**
 * Prevent split-brain blog content.
 * Canonical blog source is `content/posts` and CMS is configured to this folder.
 * If markdown posts exist in legacy locations, fail early with instructions.
 */
const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");

const legacySources = [
  {
    dir: path.join(rootDir, "content", "blog"),
    label: "content/blog",
    ignore: new Set(),
  },
  {
    dir: path.join(rootDir, "eleventy-blog", "src", "posts"),
    label: "eleventy-blog/src/posts",
    ignore: new Set(["posts.11tydata.js"]),
  },
];

const isMarkdownPost = (fileName) => /\.(md|mdx)$/i.test(fileName);

const findLegacyPosts = () => {
  const matches = [];

  for (const source of legacySources) {
    if (!fs.existsSync(source.dir)) continue;
    const files = fs.readdirSync(source.dir);
    for (const file of files) {
      if (source.ignore.has(file)) continue;
      if (!isMarkdownPost(file)) continue;
      matches.push(`${source.label}/${file}`);
    }
  }

  return matches;
};

const legacyPosts = findLegacyPosts();
if (legacyPosts.length === 0) {
  console.log("[validate-canonical-blog-source] OK: no legacy blog posts found.");
  process.exit(0);
}

console.error(
  "[validate-canonical-blog-source] Found blog posts outside canonical folder `content/posts`.",
);
for (const post of legacyPosts) {
  console.error(` - ${post}`);
}
console.error(
  "Move these files into `content/posts` (or delete them) so `/blog` and `/admin` stay in sync.",
);
process.exit(1);
