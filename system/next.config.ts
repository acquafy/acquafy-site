// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // These small WebP assets are already optimized. Serve them directly: the
  // multi-service deployment does not expose the portal image optimizer route.
  images: { unoptimized: true },
  experimental: { serverActions: { bodySizeLimit: "12mb" } },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/ativar",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",
          },
        ],
      },
    ];
  },
  basePath: "/app",
  // The round "N" badge of the dev server would show up inside every phone of the mobile preview.
  devIndicators: false,
};

export default nextConfig;
