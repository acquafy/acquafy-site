import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
      },
    ],
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
