/**
 * Copies content/media -> public/media so Next.js serves /media/* (blog coverImage, etc.).
 * Source of truth: commit files under content/media only.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const srcDir = path.join(root, "content", "media");
const destDir = path.join(root, "public", "media");
const manifestPath = path.join(root, "content", "media-manifest.json");

const writeMediaManifest = (fileNames) => {
  const names = [...fileNames].filter((name) => name && name !== ".gitkeep").sort();
  fs.writeFileSync(manifestPath, `${JSON.stringify(names, null, 2)}\n`);
  console.log(`[copy-content-media] Wrote ${names.length} filenames to ${path.relative(root, manifestPath)}`);
};

if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}

fs.mkdirSync(path.dirname(destDir), { recursive: true });
fs.rmSync(destDir, { recursive: true, force: true });
fs.mkdirSync(destDir, { recursive: true });

const entries = fs.readdirSync(srcDir, { withFileTypes: true });
const mediaFiles = entries.filter((e) => e.isFile() && e.name !== ".gitkeep").map((e) => e.name);
if (mediaFiles.length === 0) {
  writeMediaManifest([]);
  fs.writeFileSync(path.join(destDir, ".gitkeep"), "");
  console.log(
    `[copy-content-media] ${path.relative(root, srcDir)} is empty; created ${path.relative(root, destDir)}/.gitkeep`,
  );
  process.exit(0);
}

writeMediaManifest(mediaFiles);
fs.cpSync(srcDir, destDir, { recursive: true });
// Remove stray .gitkeep-only dir noise if cp copied .gitkeep
console.log(
  `[copy-content-media] Copied ${path.relative(root, srcDir)} -> ${path.relative(root, destDir)}`,
);
