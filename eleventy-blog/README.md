# Eleventy + Sveltia CMS (GitHub)

Static blog under `eleventy-blog/` in this repository.

## Project structure

| Path | Role |
| --- | --- |
| `src/` | Eleventy templates, posts, global data |
| `src/posts/` | Markdown entries (edited via CMS or locally) |
| [`../content/media`](../content/media) | Shared thumbnails / CMS uploads (Eleventy copies to `_site/media`; Next copies to `public/media`) |
| `admin/` | Sveltia `index.html` + `config.yml` (copied verbatim to `_site/admin`; kept outside `src/` so Eleventy does not process `index.html` as a template) |
| `_site/` | Build output (gitignored) |

[Eleventy](https://www.11ty.dev/) builds Markdown in `src/posts/` into `_site/`. [Sveltia CMS](https://sveltiacms.app/) runs in the browser at `/admin/` and commits content to GitHub via the API.

## Quick start (local)

```bash
cd eleventy-blog
npm install
npm run dev
```

Open http://localhost:8080 (or the port Eleventy prints). The admin UI is at http://localhost:8080/admin/.

## Same CMS on the Next.js site (Vercel)

This repo’s production site is **Next.js**, not Eleventy-only hosting. Static files under Next’s [`public/`](https://nextjs.org/docs/app/building-your-application/optimizing/static-assets) are served at the site root.

- **Source of truth:** [`admin/config.yml`](admin/config.yml) (and `index.html`) live under **`eleventy-blog/admin/`** only.
- **Deploy:** Root [`package.json`](../package.json) runs [`scripts/copy-sveltia-admin.cjs`](../scripts/copy-sveltia-admin.cjs) via **`prebuild`** and **`predev`**, copying `eleventy-blog/admin` → **`public/admin/`** before `next build` / `next dev`.
- **URL:** After deploy, open **`https://<your-domain>/admin`** (e.g. `https://trivion-protection.vercel.app/admin`).
- **`public/admin/`** is gitignored; do not edit it by hand—it is regenerated every build/dev.

OAuth **Authorization callback** / GitHub OAuth **Homepage URL** should include this production `/admin` origin if you log in from Vercel.

### `backend.repo` on Vercel (fix “no access to YOUR_GITHUB_REPO”)

The committed [`admin/config.yml`](admin/config.yml) keeps a **placeholder** `repo: YOUR_GITHUB_USER/YOUR_GITHUB_REPO`. During **`prebuild` / `predev`**, [`scripts/copy-sveltia-admin.cjs`](../scripts/copy-sveltia-admin.cjs) rewrites **`public/admin/config.yml`** when it can resolve a real repo:

1. **`SVELTIA_GITHUB_REPO`** (recommended) — In Vercel → Project → **Settings → Environment Variables**, add `SVELTIA_GITHUB_REPO` = **`your-github-username/trivon-protection`** (or whatever your repo is called), for Production (and Preview if you use `/admin` there).

2. **Or** enable **“Automatically expose System Environment Variables”** (Vercel project settings) so **`VERCEL_GIT_REPO_OWNER`** and **`VERCEL_GIT_REPO_SLUG`** are available; the copy script will build `owner/slug` automatically.

3. **Local dev:** create **`.env.local`** in the repo root with `SVELTIA_GITHUB_REPO=owner/repo` (never commit tokens or secrets there).

After redeploy, hard-refresh `/admin` so the browser loads the new `config.yml`.

## Configure Sveltia (`admin/config.yml`)

1. **`backend.repo`** — Either rely on **`SVELTIA_GITHUB_REPO`** at build time (see above) or replace the placeholder in **`eleventy-blog/admin/config.yml`** with your real **`owner/repo`** if you prefer committing it.

2. **Paths** — Defaults assume this monorepo layout:

   - Posts: `/eleventy-blog/src/posts`
   - Media: `/content/media` (same folder as Next.js MDX `coverImage` paths `/media/...`; see root `scripts/copy-content-media.cjs`)

   If you move the blog to its own repository with `src/` at the repo root, change `folder` and `media_folder` in `admin/config.yml` accordingly.

### Blog thumbnails (Next.js + MDX)

Put image files in **[`content/media`](../content/media)** at the repo root. Use **`coverImage: /media/your-file.webp`** in [`content/blog/*.mdx`](../content/blog). The root app’s **`prebuild` / `predev`** copies `content/media` → `public/media` so Vercel serves them. Sveltia **`featured_image`** uploads use the same `content/media` folder (`media_folder` in `admin/config.yml`).

3. **`public_folder` and base path**

   - **Subpath** (site under a prefix, e.g. `/blog/`): set `public_folder` so Markdown images resolve under the same prefix as the build (`ELEVENTY_PATH_PREFIX` should match that prefix).
   - **Site at domain root** (no URL prefix): keep `public_folder: /media` and set `ELEVENTY_PATH_PREFIX` empty when building (see below).

## Post fields (`admin/config.yml`)

Each post uses YAML front matter shaped by the **Posts** collection. Current fields:

| Field | Role |
| --- | --- |
| `title` | Display title (required). |
| `slug` | URL-safe segment used in the **filename** (required). Lowercase letters, digits, hyphens only (`pattern` in config). Not automatically used as the Eleventy URL path; URLs still come from the file stem (see [`src/posts/posts.11tydata.js`](src/posts/posts.11tydata.js)). |
| `date` | Publish instant for scheduling (required). Stored with **`picker_utc: true`** as ISO strings ending in `Z`. Default in the CMS is `{{now}}`. |
| `excerpt` | Short summary for listings, meta description, RSS (required). Legacy **`description`** is still read by templates if `excerpt` is missing. |
| `featured_image` | Optional image path under `public_folder` / media uploads. |
| `hero_emoji` | Optional short string for a decorative emoji in the post header. |
| `tags` | Optional **simple list** (newline-separated in the CMS UI → array of strings in YAML). |
| `draft` | When `true`, excluded from production builds until cleared. |
| `body` | Main Markdown content. |

**Filename pattern:** Sveltia saves files as `{{year}}-{{month}}-{{day}}-{{fields.slug}}.md` under `src/posts/`.

## Authentication (GitHub backend)

Sveltia does **not** use Netlify Git Gateway. Pick one:

### A. Personal Access Token (small / technical teams)

1. In the CMS login screen, use **Sign in with Token**.
2. Create a fine-grained or classic PAT with repo **Contents** read/write for your repository.
3. Tokens stay in the browser (local storage). Rotate when people leave.

### B. OAuth (recommended for non-developer editors)

1. Create a **GitHub OAuth App** (Settings → Developer settings):

   - **Homepage URL**: your live production site URL (e.g. `https://yourdomain.com`).
   - **Authorization callback URL**: follow the README of your OAuth client (below).

2. Deploy **[Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth)** (Cloudflare Workers) or another [external OAuth client](https://decapcms.org/docs/external-oauth-clients/) compatible with Decap/Sveltia.

3. In `admin/config.yml`, set **`backend.base_url`** to your authenticator’s public URL (uncomment the example line).

## CI / GitHub Pages (removed)

Automated **GitHub Actions** workflows for **GitHub Pages** and **Bluehost SSH** deploy were removed from this repository so pushes to `main` no longer trigger those jobs.

- **Disable Pages in GitHub** (stops the “github-pages” environment from being used by Actions): Repository **Settings → Pages → Build and deployment**, set **Source** to **None** (or disable the site) if you no longer host the Eleventy build on Pages.
- **Bluehost “auto deploy” outside GitHub**: If Bluehost still deploys when you push, that is usually **cPanel → Git Version Control** (or similar) on the host, not this repo. Remove or disable that integration in Bluehost; nothing else in this codebase triggers it.
- **Collaborators**: Editors still need **write** access so the CMS can push commits.
- **CSP**: If you add a Content Security Policy, allow requests required by Sveltia and GitHub per [Sveltia security docs](https://sveltiacms.app/en/docs/security#setting-up-content-security-policy).
- **Build Eleventy locally** (optional): from `eleventy-blog/`, run `npm ci && npm run build`. Set `ELEVENTY_PATH_PREFIX` and `ELEVENTY_SITE_URL` in the shell to match wherever you publish `_site` (RSS and absolute links use `ELEVENTY_SITE_URL`).

## Drafts and scheduling

Sveltia saves to Git **immediately**; there is no built-in “publish later” queue in the CMS. This project handles drafts and scheduling at **build time**:

| Front matter | Behavior in production builds |
| --- | --- |
| **`draft: true`** | No HTML output and not listed in `/`, `/posts/`, or RSS until you set `draft: false`. |
| **`date`** (Publish date) | **ISO datetimes** (e.g. from the CMS with UTC picker) use that instant. Plain **`YYYY-MM-DD`** alone is still treated as **00:00 UTC** that day. Until `now` (build time) is past the resolved instant, the post is scheduled: **no output**, excluded from listings/RSS. |

**Preview locally** (show drafts and/or future-dated posts as normal published posts):

- PowerShell: `$env:SHOW_DRAFTS='1'; $env:SHOW_FUTURE='1'; npm run dev`
- Bash: `SHOW_DRAFTS=1 SHOW_FUTURE=1 npm run dev`

Leave both unset in CI so production matches “live” content only.

**RSS** (`/feed.xml`) lists only `publishedPosts` (same rules). [`src/_data/site.js`](src/_data/site.js) exposes `site.url` from `ELEVENTY_SITE_URL`.

## Limits (from upstream docs)

- Sveltia is **beta**; watch [releases](https://sveltiacms.app/en/docs/releases).
- **Editorial workflow** in the CMS is **not** available yet; avoid `publish_mode: editorial_workflow`.
- **Git LFS** is not supported for the GitHub backend.
- **Multi-user**: no built-in merge/conflict UI—avoid editing the same file simultaneously.

## Scripts

| Command       | Description                |
| ------------- | -------------------------- |
| `npm run dev` | Dev server with live reload |
| `npm run build` | Write `_site/` output   |
