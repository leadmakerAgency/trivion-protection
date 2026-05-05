# Eleventy + Sveltia CMS (GitHub)

Static blog under `eleventy-blog/` in this repository.

## Project structure

| Path | Role |
| --- | --- |
| `src/` | Eleventy templates, posts, global data |
| `src/posts/` | Markdown entries (edited via CMS or locally) |
| `src/media/` | Uploaded media (copied to `_site/media`) |
| `admin/` | Sveltia `index.html` + `config.yml` (copied verbatim to `_site/admin`; kept outside `src/` so Eleventy does not process `index.html` as a template) |
| `_site/` | Build output (gitignored) | [Eleventy](https://www.11ty.dev/) builds Markdown in `src/posts/` into `_site/`. [Sveltia CMS](https://sveltiacms.app/) runs in the browser at `/admin/` and commits content to GitHub via the API.

## Quick start (local)

```bash
cd eleventy-blog
npm install
npm run dev
```

Open http://localhost:8080 (or the port Eleventy prints). The admin UI is at http://localhost:8080/admin/.

## Configure Sveltia (`admin/config.yml`)

1. **`backend.repo`** — Set to `YOUR_GITHUB_USER/YOUR_GITHUB_REPO` (the repo that contains `eleventy-blog/`).

2. **Paths** — Defaults assume this monorepo layout:

   - Posts: `/eleventy-blog/src/posts`
   - Media: `/eleventy-blog/src/media`

   If you move the blog to its own repository with `src/` at the repo root, change `folder`, `media_folder`, and comments in `admin/config.yml` to `/src/posts` and `/src/media`.

3. **`public_folder` and GitHub Pages**

   - **Project site** (`https://<user>.github.io/<repo>/`): set `public_folder` to `/<repo>/media` so Markdown images resolve under the same prefix as the build (`ELEVENTY_PATH_PREFIX` in CI should match the repo name).
   - **Site at domain root** (custom domain or `username.github.io` with no subpath): keep `public_folder: /media` and set `ELEVENTY_PATH_PREFIX` empty when building (see below).

## Authentication (GitHub backend)

Sveltia does **not** use Netlify Git Gateway. Pick one:

### A. Personal Access Token (small / technical teams)

1. In the CMS login screen, use **Sign in with Token**.
2. Create a fine-grained or classic PAT with repo **Contents** read/write for your repository.
3. Tokens stay in the browser (local storage). Rotate when people leave.

### B. OAuth (recommended for non-developer editors)

1. Create a **GitHub OAuth App** (Settings → Developer settings):

   - **Homepage URL**: your live site URL (e.g. `https://<user>.github.io/<repo>/`).
   - **Authorization callback URL**: follow the README of your OAuth client (below).

2. Deploy **[Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth)** (Cloudflare Workers) or another [external OAuth client](https://decapcms.org/docs/external-oauth-clients/) compatible with Decap/Sveltia.

3. In `admin/config.yml`, set **`backend.base_url`** to your authenticator’s public URL (uncomment the example line).

## GitHub Pages and Actions

1. **Pages**: Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.

2. **Workflow**: [.github/workflows/deploy-eleventy-blog.yml](../.github/workflows/deploy-eleventy-blog.yml) runs on pushes to `main` or `master` that touch `eleventy-blog/` or the workflow file.

3. **`ELEVENTY_PATH_PREFIX`**: The workflow sets it to **`github.event.repository.name`** so links and assets work for a **project** Pages URL. For a **root** site build, remove or empty that env in the workflow and align `public_folder` as described above.

4. **Collaborators**: Editors need **write** access to the repository so the CMS can push commits.

5. **CSP**: If you add a Content Security Policy to the site, allow requests required by Sveltia and GitHub per [Sveltia security docs](https://sveltiacms.app/en/docs/security#setting-up-content-security-policy).

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
