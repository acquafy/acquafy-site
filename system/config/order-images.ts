// Product images of the purchase flow. They are website assets (same origin, outside the portal basePath):
// the catalog image per product, mirrored from lib/products.ts (PRODUCT_CATALOG) at the repository root.

export const ORDER_PRODUCT_IMAGES: Record<string, string> = {
  "neo-up": "/figma-assets/neo-up-catalog.webp",
  "neo-fit": "/figma-assets/neo-fit.webp",
  "neo-touch": "/figma-assets/neo-touch.webp",
  "neo-plus": "/figma-assets/neo-plus.webp",
  "neo-smart-h2": "/figma-assets/neo-smart-h2.webp",
  "neo-ultra": "/figma-assets/neo-ultra.webp",
  "neo-ultra-spark": "/figma-assets/neo-ultra-spark.webp",
  "neo-ultra-spark-h2": "/figma-assets/neo-ultra-spark-h2.webp",
  "neo-max": "/figma-assets/neo-max.webp",
  "neo-max-spark": "/figma-assets/neo-max-spark.webp",
  "neo-max-spark-h2": "/figma-assets/neo-max-spark-h2.webp",
  "neo-infinity": "/figma-assets/premium-infinity-catalog.webp",
  "neo-infinity-spark": "/figma-assets/premium-infinity-spark-catalog.webp",
  "neo-infinity-spark-h2": "/figma-assets/premium-infinity-spark-h2-catalog.webp",
  "neo-prestige": "/figma-assets/premium-prestige-catalog.webp",
  "neo-prestige-spark": "/figma-assets/premium-prestige-spark-catalog.webp",
  "neo-prestige-spark-h2": "/figma-assets/premium-prestige-spark-h2-catalog.webp",
  "neo-prime": "/figma-assets/premium-prime-catalog.webp",
  "neo-prime-spark": "/figma-assets/premium-prime-spark-catalog.webp",
  "neo-prime-spark-h2": "/figma-assets/premium-prime-spark-h2-catalog.webp",
  "acquafy-media": "/figma-assets/acquafy-media-totem.webp",
};

/** The image the customer was looking at on the product page (colour and angle), when it is a website product image. */
const PRODUCT_IMAGE = /^\/(images\/checkin|figma-assets)\/[a-z0-9\-/]+\.webp$/;

export function orderImage(product: string | undefined, fromLink: string | undefined) {
  if (fromLink && PRODUCT_IMAGE.test(fromLink) && !fromLink.includes("..")) return fromLink;
  return (product && ORDER_PRODUCT_IMAGES[product]) || "/figma-assets/product-purifier.webp";
}
