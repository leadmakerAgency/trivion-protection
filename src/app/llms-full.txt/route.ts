import { buildLlmsFullTxt } from "@/lib/llm-text";

export const revalidate = 3600;

export const GET = () =>
  new Response(buildLlmsFullTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
