export const BLOG_PAGE_SIZE = 15;

export const getTotalPages = (postCount: number): number =>
  Math.max(1, Math.ceil(postCount / BLOG_PAGE_SIZE));

export const getPageSlice = <T>(items: T[], page: number) => {
  const totalPages = getTotalPages(items.length);
  const safePage = Number.isFinite(page) ? Math.min(Math.max(1, page), totalPages) : 1;
  const start = (safePage - 1) * BLOG_PAGE_SIZE;
  const end = start + BLOG_PAGE_SIZE;
  return {
    page: safePage,
    totalPages,
    slice: items.slice(start, end),
  };
};
