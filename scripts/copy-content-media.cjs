/**
 * Copies content/media -> public/media so Next.js serves /media/* (blog coverImage, etc.).
 * Source of truth: commit files under content/media only.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const srcDir = path.join(root, "content", "media");
const destDir = path.join(root, "public", "media");

if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}

fs.mkdirSync(path.dirname(destDir), { recursive: true });
fs.rmSync(destDir, { recursive: true, force: true });
fs.mkdirSync(destDir, { recursive: true });

const entries = fs.readdirSync(srcDir, { withFileTypes: true });
const hasFiles = entries.some((e) => e.isFile() && e.name !== ".gitkeep");
if (!hasFiles) {
  fs.writeFileSync(path.join(destDir, ".gitkeep"), "");
  console.log(
    `[copy-content-media] ${path.relative(root, srcDir)} is empty; created ${path.relative(root, destDir)}/.gitkeep`,
  );
  process.exit(0);
}

fs.cpSync(srcDir, destDir, { recursive: true });
// Remove stray .gitkeep-only dir noise if cp copied .gitkeep
console.log(
  `[copy-content-media] Copied ${path.relative(root, srcDir)} -> ${path.relative(root, destDir)}`,
);
