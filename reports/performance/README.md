# Website performance audit — 2026-11-05

Responsive optimized AVIF/WebP images, lazy loading, hero preload, local WOFF2 fonts with metric-adjusted fallbacks, and asset cache headers are implemented. CSS is served as a separate cacheable file. Auto image sizes are used only with explicit width and height, avoiding size-containment distortion of flow images.

## Verification

Production build: `npx next build --webpack` passed. `npx tsc --noEmit`, focused ESLint on the image helper/config/layout, and `git diff --check` passed. Turbopack could not bind its build port in this environment, including an escalated attempt. Existing build warnings concern optional Vercel flags definitions, Browserslist data, and Tailwind screen variants.

Lighthouse 12.8.2 mobile defaults, simulated throttling, localhost production server, one final run per route with warm image optimizer cache. These are lab results, not deployed field measurements; network latency, cold image conversion, and run variation can change results. Earlier baseline and inline-CSS runs used a different build and are not controlled comparisons.

| Route | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Transfer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| / | 91 | 96 | 100 | 100 | 1.1s | 3.5s | 24ms | 0.000 | 492 KiB |
| /linha-neo | 92 | 100 | 100 | 100 | 1.1s | 3.3s | 39ms | 0.000 | 468 KiB |
| /plataforma | 94 | 96 | 100 | 100 | 1.1s | 3.0s | 30ms | 0.000 | 359 KiB |
| /sobre | 95 | 96 | 100 | 100 | 1.1s | 2.8s | 26ms | 0.000 | 396 KiB |
| /filtros | 90 | 96 | 100 | 100 | 1.1s | 3.6s | 23ms | 0.000 | 361 KiB |
| /artigos | 94 | 96 | 100 | 100 | 1.1s | 3.0s | 29ms | 0.000 | 358 KiB |
| /contact | 94 | 100 | 100 | 100 | 1.1s | 3.0s | 24ms | 0.039 | 364 KiB |
| /neo-media | 94 | 96 | 100 | 100 | 1.1s | 3.1s | 30ms | 0.000 | 399 KiB |

## Repeat

Start the production site, then run `sh scripts/lighthouse.sh audit http://localhost:3000 / /linha-neo /plataforma /sobre /filtros /artigos /contact /neo-media`. Requires Chrome; npx fetches Lighthouse 12. Raw JSON defaults to `/tmp/acquafy-lighthouse/audit`. This run’s raw reports are in `/tmp/lh/verified`.

## Remaining limits

Several mobile routes still exceed the 2.5-second LCP target. Shared React/Next client JavaScript, font loading and per-page image sizing remain opportunities for a larger server/client component refactor. Accessibility scores below 100 need a separate contrast review. Nothing has been deployed by this task.
