import { ImageResponse } from "next/og";
import { getMdxSlugs, getMdxSource } from "@/lib/mdx";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";

export const alt = "";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const generateStaticParams = () => getMdxSlugs().map((slug) => ({ slug }));

type Props = {
  params: Promise<{ slug: string }>;
};

const truncate = (text: string, max: number) =>
  text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;

export default async function OgImage(props: Props) {
  const { slug } = await props.params;
  const post = getMdxSource(slug);
  const headline = post ? post.meta.title : "Blog";
  const dek = post ? truncate(post.meta.description, 220) : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#f8fafc",
          color: "#0f172a",
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            maxHeight: 280,
          }}
        >
          {truncate(headline, 120)}
        </div>
        {dek ? (
          <div
            style={{
              fontSize: 24,
              color: "#475569",
              lineHeight: 1.35,
              maxHeight: 200,
              marginTop: 24,
            }}
          >
            {dek}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#64748b",
            marginTop: "auto",
            paddingTop: 32,
            borderTop: "2px solid #e2e8f0",
          }}
        >
          <span style={{ fontWeight: 600, color: "#0f172a" }}>{SITE_NAME}</span>
          <span>Blog</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
