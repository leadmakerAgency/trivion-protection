/** Canonical origin for RSS absolute links (no trailing slash), e.g. https://owner.github.io */
const raw = process.env.ELEVENTY_SITE_URL?.trim() ?? "";

export default {
  title: "Blog",
  description: "Static site powered by Eleventy and Sveltia CMS.",
  url: raw.replace(/\/+$/, ""),
};
