/**
 * Snipcart integration helpers
 *
 * Usage in a buy button:
 *   <button className="snipcart-add-item" {...buildSnipcartProps("neo-up", lang, siteUrl)}>
 *     Comprar
 *   </button>
 *
 * siteUrl  → process.env.NEXT_PUBLIC_SITE_URL  (e.g. "https://acquafy.com")
 * lang     → from useLang() context
 *
 * Snipcart store currency:
 *   - BRL for pt / pt-pt users
 *   - USD for all other languages
 * Multi-currency must be enabled in the Snipcart dashboard settings.
 */

import type { Lang } from "@/context/LanguageContext";
import { CHECKIN_FAMILIES } from "./checkin-products";
import { PRODUCT_CATALOG, PRODUCT_PRICES_BRL, PRODUCT_PRICES_USD } from "./products";

// ─── Product → family page URL mapping ───────────────────────────────────────

/**
 * Maps each product variant ID to the family slug that hosts its page.
 * Product page URL: /buy/checkin-{familySlug}
 */
export const PRODUCT_FAMILY_SLUG: Record<string, string> = Object.fromEntries(
  CHECKIN_FAMILIES.flatMap((family) =>
    family.variants.map((variant) => [variant.id, family.slug])
  )
);

// ─── Price & currency helpers ─────────────────────────────────────────────────

/** BRL for pt / pt-pt; USD for all other languages. */
export function snipcartCurrency(lang: Lang): "BRL" | "USD" {
  return lang === "pt" || lang === "pt-pt" ? "BRL" : "USD";
}

/** Numeric price in the correct currency for Snipcart data attributes. */
export function snipcartPrice(productId: string, lang: Lang): number {
  if (lang === "pt" || lang === "pt-pt") {
    return PRODUCT_PRICES_BRL[productId] ?? 0;
  }
  const usdStr = PRODUCT_PRICES_USD[productId];
  if (usdStr) return parseFloat(usdStr.replace(/[^0-9.]/g, ""));
  const brl = PRODUCT_PRICES_BRL[productId] ?? 0;
  return parseFloat((brl / 5).toFixed(2));
}

// ─── URL helpers ──────────────────────────────────────────────────────────────

/** Absolute URL of the product's buy page (used by Snipcart's price-verification crawler). */
export function snipcartProductUrl(productId: string, siteUrl: string): string {
  const familySlug = PRODUCT_FAMILY_SLUG[productId] ?? productId;
  return `${siteUrl}/buy/checkin-${familySlug}`;
}

/** Absolute URL of the product image (required by Snipcart cart popup). */
export function snipcartImageUrl(productId: string, siteUrl: string): string {
  const product = PRODUCT_CATALOG.find((p) => p.id === productId);
  return product ? `${siteUrl}${product.img}` : "";
}

// ─── Description helper ───────────────────────────────────────────────────────

/** Generates a product description from CHECKIN_FAMILIES metadata. */
export function snipcartDescription(productId: string): string {
  for (const family of CHECKIN_FAMILIES) {
    const variant = family.variants.find((v) => v.id === productId);
    if (variant) {
      const title = family.title.replace(/^Acquafy\s+/, "");
      return `Acquafy ${title} — ${variant.subLabel}. Formato: ${variant.formato}. ${family.subtitle}.`;
    }
  }
  return "Purificador de água Acquafy";
}

// ─── Main helper ──────────────────────────────────────────────────────────────

export type SnipcartDataProps = {
  "data-item-id": string;
  "data-item-name": string;
  "data-item-price": number;
  "data-item-currency": "BRL" | "USD";
  "data-item-url": string;
  "data-item-image": string;
  "data-item-description": string;
};

/**
 * Returns all data-item-* attributes to spread onto a snipcart-add-item button.
 *
 * @param productId  One of the IDs from PRODUCT_CATALOG (e.g. "neo-up")
 * @param lang       Current user language from useLang()
 * @param siteUrl    process.env.NEXT_PUBLIC_SITE_URL
 */
export function buildSnipcartProps(
  productId: string,
  lang: Lang,
  siteUrl: string
): SnipcartDataProps {
  const product = PRODUCT_CATALOG.find((p) => p.id === productId);
  return {
    "data-item-id":          productId,
    "data-item-name":        product?.label ?? productId,
    "data-item-price":       snipcartPrice(productId, lang),
    "data-item-currency":    snipcartCurrency(lang),
    "data-item-url":         snipcartProductUrl(productId, siteUrl),
    "data-item-image":       snipcartImageUrl(productId, siteUrl),
    "data-item-description": snipcartDescription(productId),
  };
}

// ─── Crawler verification set ────────────────────────────────────────────────

/**
 * Returns one SnipcartDataProps per currency (BRL + USD) for a product.
 * Render these as hidden <button> elements on product pages so Snipcart's
 * price-verification crawler can validate both currencies.
 */
export function snipcartCrawlerProps(
  productId: string,
  siteUrl: string
): [SnipcartDataProps, SnipcartDataProps] {
  const base = (lang: Lang): SnipcartDataProps => buildSnipcartProps(productId, lang, siteUrl);
  return [base("pt"), base("en")];
}

// ─── All products list ────────────────────────────────────────────────────────

/**
 * Full list of product IDs available across /buy and /checkin.
 * Derived from PRODUCT_CATALOG to keep a single source of truth.
 */
export const ALL_SNIPCART_PRODUCT_IDS: string[] = PRODUCT_CATALOG.map((p) => p.id);
