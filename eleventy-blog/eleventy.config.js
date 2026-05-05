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
  eleventyConfig.addPassthroughCopy("src/media");
  eleventyConfig.addPassthroughCopy("src/css");

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
