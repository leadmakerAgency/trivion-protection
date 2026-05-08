import { ImageResponse } from "next/og";
import { getMdxSlugs, getMdxSource } from "@/lib/mdx";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";

export const alt = "";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const generateStaticParams = () => getMdxSlugs("knowledge").map((slug) => ({ slug }));

type Props = {
  params: Promise<{ slug: string }>;
};

const truncate = (text: string, max: number) =>
  text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;

export default async function OgImage(props: Props) {
  const { slug } = await props.params;
  const post = getMdxSource("knowledge", slug);
  const headline = post ? post.meta.title : "Knowledge";
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
          background: "#0f172a",
          color: "#f8fafc",
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.18,
            maxHeight: 300,
          }}
        >
          {truncate(headline, 118)}
        </div>
        {dek ? (
          <div
            style={{
              fontSize: 24,
              color: "#cbd5e1",
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
            color: "#94a3b8",
            marginTop: "auto",
            paddingTop: 32,
            borderTop: "2px solid rgba(248,250,252,0.14)",
          }}
        >
          <span style={{ fontWeight: 600, color: "#f8fafc" }}>{SITE_NAME}</span>
          <span>Knowledge base</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
