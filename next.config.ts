import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  reactCompiler: true,
  // Blog cover PNGs are static assets under /media. File tracing must not pack
  // them into serverless functions (Vercel uncompressed limit is 250mb).
  outputFileTracingExcludes: {
    "*": ["./content/media/**", "./public/media/**"],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
