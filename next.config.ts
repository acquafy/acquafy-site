import type { NextConfig } from "next";

// /public assets are not content-hashed, so they get a day of browser cache plus a week of stale-while-revalidate
// (an asset replaced under the same name is picked up within a day). Fonts are versioned by hand: rename on change.
const ASSET_CACHE = "public, max-age=86400, stale-while-revalidate=604800";
const FONT_CACHE = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  images: {
    // Vercel's multi-service deployment serves /_next/image as a 404. Use the
    // existing public assets directly, as the portal does, until that route is supported.
    unoptimized: true,
    // components/ui/Img.tsx routes every raster in /public through the optimizer: AVIF first, WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Optimized variants of the static /public sources can be cached for a month.
    minimumCacheTTL: 60 * 60 * 24 * 31,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
      },
    ],
  },
  async headers() {
    return [
      { source: "/fonts/:path*", headers: [{ key: "Cache-Control", value: FONT_CACHE }] },
      { source: "/figma-assets/:path*", headers: [{ key: "Cache-Control", value: ASSET_CACHE }] },
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: ASSET_CACHE }] },
    ];
  },
  async redirects() {
    return [
      { source: "/contato",        destination: "/contact",        permanent: true },
      { source: "/contato/:path*", destination: "/contact/:path*", permanent: true },
    ];
  },
  async rewrites() {
    // On Vercel the `portal` service (vercel.json) owns /app. Locally (`npm run dev`, `npm start`) the two apps run as
    // separate processes, and scripts/run-apps.mjs sets PORTAL_ORIGIN so this app proxies /app to the portal.
    const portalOrigin = process.env.PORTAL_ORIGIN?.replace(/\/$/, "");
    return [
      ...(portalOrigin
        ? [
            { source: "/app", destination: `${portalOrigin}/app` },
            { source: "/app/:path*", destination: `${portalOrigin}/app/:path*` },
          ]
        : []),
      { source: "/platform",        destination: "/plataforma"           },
      { source: "/support-center",   destination: "/central-de-suporte"   },
      { source: "/technology",       destination: "/tecnologia"           },
      { source: "/neo-line",         destination: "/linha-neo"            },
      { source: "/filters",          destination: "/filtros"              },
      { source: "/accessories",      destination: "/acessorios"          },
      { source: "/about",            destination: "/sobre"                },
      { source: "/global-expansion", destination: "/expansao-global"      },
      { source: "/partnership",      destination: "/parceria"             },
      { source: "/privacy-policy",   destination: "/politicas-privacidade"},
      { source: "/terms-of-use",     destination: "/termos-de-uso"        },
      { source: "/articles",         destination: "/artigos"              },
      { source: "/articles/:path*",  destination: "/artigos/:path*"       },
    ];
  },
};

export default nextConfig;
