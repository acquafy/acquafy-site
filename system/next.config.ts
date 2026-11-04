// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { serverActions: { bodySizeLimit: "12mb" } },
  basePath: "/app",
  // The round "N" badge of the dev server would show up inside every phone of the mobile preview.
  devIndicators: false,
};

export default nextConfig;
