import type { NextConfig } from "next";

/**
 * `pnpm export` builds a fully static site into ./out — that is the free tier:
 * drop the folder on any static host. The paid tier is this same app deployed with
 * integrations (booking engine, payments, CMS) and hosting handled by LakshyaAI Studio.
 */
const isExport = process.env.EXPORT === "1";

const config: NextConfig = {
  transpilePackages: ["@lakshya/tokens", "@lakshya/motion", "@lakshya/three", "@lakshya/ui"],
  ...(isExport ? { output: "export", images: { unoptimized: true }, trailingSlash: true } : {}),
};

export default config;
