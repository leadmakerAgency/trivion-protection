import { getPublishInstant, isPublishedForSite } from "./lib/publish-utils.js";

/**
 * GitHub Pages (project site): set ELEVENTY_PATH_PREFIX, e.g. my-repo or /my-repo/
 * User/org site or custom domain: leave unset (defaults to site root).
 */
function normalizePathPrefix(raw) {
  if (!raw || raw === "/") return "/";
  let p = String(raw).trim();
  if (!p.startsWith("/")) p = `/${p}`;
  if (!p.endsWith("/")) p = `${p}/`;
  return p;
}

const pathPrefix = normalizePathPrefix(process.env.ELEVENTY_PATH_PREFIX);

export default function (eleventyConfig) {
  // Admin lives outside `src` so Eleventy does not treat index.html as a template.
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy({ "../content/media": "media" });
  eleventyConfig.addPassthroughCopy("src/css");

  eleventyConfig.addCollection("publishedPosts", (collectionApi) => {
    return collectionApi.getFilteredByTag("posts").filter((item) => isPublishedForSite(item.data)).sort((a, b) => {
      const ta = getPublishInstant(a.data.date) ?? 0;
      const tb = getPublishInstant(b.data.date) ?? 0;
      return ta - tb;
    });
  });

  return {
    pathPrefix: pathPrefix === "/" ? undefined : pathPrefix,
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
