/**
 * Mirrors eleventy-blog/admin -> public/admin so Next.js/Vercel serves /admin (Sveltia CMS).
 * Single source of truth: edit files under eleventy-blog/admin only.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const srcDir = path.join(root, "eleventy-blog", "admin");
const destDir = path.join(root, "public", "admin");

if (!fs.existsSync(srcDir)) {
  console.warn(
    `[copy-sveltia-admin] Skip: missing ${path.relative(root, srcDir)}`,
  );
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });
fs.cpSync(srcDir, destDir, { recursive: true });
console.log(
  `[copy-sveltia-admin] Copied ${path.relative(root, srcDir)} -> ${path.relative(root, destDir)}`,
);
