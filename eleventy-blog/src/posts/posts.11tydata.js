export default {
  layout: "layouts/post.njk",
  tags: "posts",
  eleventyComputed: {
    // Derive slug from the actual filename so YYYY-MM-DD-title.md keeps the full stem (Eleventy date parsing mutates fileSlug/filePathStem).
    permalink: (data) => {
      const normalized = data.page.inputPath.replace(/\\/g, "/");
      const match = normalized.match(/\/posts\/([^/]+)\.md$/);
      const slug = match ? match[1] : data.page.fileSlug;
      return `/posts/${slug}/index.html`;
    },
  },
};
