/**
 * Mirrors eleventy-blog/admin -> public/admin so Next.js/Vercel serves /admin (Sveltia CMS).
 * Single source of truth: edit files under eleventy-blog/admin only.
 *
 * Injects `backend.repo` for production when env is set (avoids committing your GitHub org/user):
 *   SVELTIA_GITHUB_REPO=owner/repo   (recommended: set in Vercel Project → Environment Variables)
 * Fallbacks: GITHUB_REPOSITORY (GitHub Actions), or VERCEL_GIT_REPO_OWNER + VERCEL_GIT_REPO_SLUG (Vercel).
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

/** Accepts owner/repo, or full https://github.com/owner/repo.git */
function normalizeGithubRepo(raw) {
  if (!raw) return "";
  let s = String(raw).trim().replace(/^\/+|\/+$/g, "");
  const fromUrl = s.match(
    /^(?:https?:)?\/\/github\.com\/([^/]+)\/([^/.]+)(?:\.git)?\/?$/i,
  );
  if (fromUrl) return `${fromUrl[1]}/${fromUrl[2]}`;
  return s;
}

function resolveGithubRepo() {
  const explicit = normalizeGithubRepo(process.env.SVELTIA_GITHUB_REPO);
  if (explicit) return explicit;

  const gha = process.env.GITHUB_REPOSITORY?.trim();
  if (gha) return gha;

  const owner = process.env.VERCEL_GIT_REPO_OWNER?.trim();
  const slug = process.env.VERCEL_GIT_REPO_SLUG?.trim();
  if (owner && slug) return `${owner}/${slug}`;

  return "";
}

fs.mkdirSync(destDir, { recursive: true });
fs.cpSync(srcDir, destDir, { recursive: true });

const configPath = path.join(destDir, "config.yml");
if (fs.existsSync(configPath)) {
  let body = fs.readFileSync(configPath, "utf8");
  const repo = resolveGithubRepo();
  // Optional: override backend.repo when SVELTIA_GITHUB_REPO / CI env is set (forks, mirrors)
  if (repo) {
    body = body.replace(/^(\s*repo:)\s*.*$/m, `$1 ${repo}`);
    fs.writeFileSync(configPath, body, "utf8");
    console.log(
      `[copy-sveltia-admin] Injected backend.repo -> ${repo} (from env)`,
    );
  }
}

console.log(
  `[copy-sveltia-admin] Copied ${path.relative(root, srcDir)} -> ${path.relative(root, destDir)}`,
);
