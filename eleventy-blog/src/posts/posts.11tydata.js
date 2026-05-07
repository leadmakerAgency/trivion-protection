import { isPublishedForSite } from "../../lib/publish-utils.js";

export default {
  layout: "layouts/post.njk",
  tags: "posts",
  eleventyComputed: {
    // Derive slug from the actual filename so YYYY-MM-DD-title.md keeps the full stem (Eleventy date parsing mutates fileSlug/filePathStem).
    permalink: (data) => {
      const normalized = data.page.inputPath.replace(/\\/g, "/");
      const match = normalized.match(/\/posts\/([^/]+)\.md$/);
      const slug = match ? match[1] : data.page.fileSlug;
      const path = `/posts/${slug}/index.html`;
      if (!isPublishedForSite(data)) return false;
      return path;
    },
  },
};
