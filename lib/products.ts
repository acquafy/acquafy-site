/** Cotação fixa usada em todo o site: US$ 1,00 = R$ 5,00 */
export const USD_TO_BRL = 5;

/**
 * Tabela oficial (USD) — fonte única de preços.
 * sales = Encomendar · lease = Financiar (parcela mensal, 36x). Valores de "Custo" (Alugar) ignorados.
 */
export const PRODUCT_PRICING_USD: Record<string, { sales: number; lease: number }> = {
  "neo-up":                { sales: 399.77,  lease: 39.97 },
  "neo-fit":               { sales: 498.77,  lease: 49.97 },
  "neo-touch":             { sales: 599.77,  lease: 59.97 },
  "neo-smart-h2":          { sales: 699.77,  lease: 69.97 },
  "neo-plus":              { sales: 699.77,  lease: 69.97 },
  "neo-ultra":             { sales: 999.77,  lease: 99.97 },
  "neo-ultra-spark":       { sales: 1199.77, lease: 119.97 },
  "neo-ultra-spark-h2":    { sales: 1399.77, lease: 139.97 },
  "neo-max":               { sales: 1199.77, lease: 119.97 },
  "neo-max-spark":         { sales: 1399.77, lease: 139.97 },
  "neo-max-spark-h2":      { sales: 1599.77, lease: 159.97 },
  "neo-infinity":          { sales: 1699.77, lease: 169.97 },
  "neo-infinity-spark":    { sales: 1799.77, lease: 179.97 },
  "neo-infinity-spark-h2": { sales: 1899.77, lease: 189.97 },
  "neo-prime":             { sales: 1699.77, lease: 169.97 },
  "neo-prime-spark":       { sales: 1799.77, lease: 179.97 },
  "neo-prime-spark-h2":    { sales: 1899.77, lease: 189.97 },
  "neo-prestige":          { sales: 1729.77, lease: 172.97 },
  "neo-prestige-spark":    { sales: 1829.77, lease: 182.97 },
  "neo-prestige-spark-h2": { sales: 1929.77, lease: 192.97 },
  "acquafy-media":         { sales: 2599.77, lease: 259.97 },
};

const toBRL = (usd: number) => Math.round(usd * USD_TO_BRL * 100) / 100;
const fromPricing = <T,>(pick: (p: { sales: number; lease: number }) => T) =>
  Object.fromEntries(Object.entries(PRODUCT_PRICING_USD).map(([id, p]) => [id, pick(p)])) as Record<string, T>;

/** Preço de compra (Encomendar) em BRL — fonte única para CompareProductos e CheckinMain */
export const PRODUCT_PRICES_BRL: Record<string, number> = fromPricing((p) => toBRL(p.sales));
/** Parcela mensal do Financiar (36x) em BRL */
export const PRODUCT_LEASE_BRL: Record<string, number> = fromPricing((p) => toBRL(p.lease));

/** Preços USD — exibidos quando lang !== "pt" */
export const PRODUCT_PRICES_USD: Record<string, string> = fromPricing(
  (p) => `US$ ${p.sales.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
);

export function formatBRL(value: number) {
  return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
}

export function formatPrice(brl: number, lang: string): string {
  if (lang === "pt" || lang === "pt-pt") return formatBRL(brl);
  const usd = brl / USD_TO_BRL;
  return `US$ ${usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export type ProductLinha = "Essentials" | "Premium";

export type ProductBasic = {
  id: string;
  label: string;
  img: string;
  linha: ProductLinha;
};

export const PRODUCT_CATALOG: ProductBasic[] = [
  { id: "neo-up",                  label: "Neo UP",                   img: "/figma-assets/neo-up-catalog.webp",              linha: "Essentials" },
  { id: "neo-fit",                 label: "Neo FIT",                  img: "/figma-assets/neo-fit.webp",              linha: "Essentials" },
  { id: "neo-touch",               label: "Neo TOUCH",                img: "/figma-assets/neo-touch.webp",            linha: "Essentials" },
  { id: "neo-plus",                label: "Neo PLUS",                 img: "/figma-assets/neo-plus.webp",             linha: "Essentials" },
  { id: "neo-smart-h2",            label: "Neo SMART H₂",             img: "/figma-assets/neo-smart-h2.webp",            linha: "Essentials" },
  { id: "neo-ultra",               label: "Neo ULTRA",                img: "/figma-assets/neo-ultra.webp",            linha: "Essentials" },
  { id: "neo-ultra-spark",         label: "Neo ULTRA SPARK",          img: "/figma-assets/neo-ultra-spark.webp",      linha: "Essentials" },
  { id: "neo-ultra-spark-h2",      label: "Neo ULTRA SPARK H₂",       img: "/figma-assets/neo-ultra-spark-h2.webp",   linha: "Essentials" },
  { id: "neo-max",                 label: "Neo MAX",                  img: "/figma-assets/neo-max.webp",              linha: "Essentials" },
  { id: "neo-max-spark",           label: "Neo MAX SPARK",            img: "/figma-assets/neo-max-spark.webp",        linha: "Essentials" },
  { id: "neo-max-spark-h2",        label: "Neo MAX SPARK H₂",         img: "/figma-assets/neo-max-spark-h2.webp",     linha: "Essentials" },
  { id: "neo-infinity",            label: "Neo INFINITY",             img: "/figma-assets/premium-infinity-catalog.webp",            linha: "Premium" },
  { id: "neo-infinity-spark",      label: "Neo INFINITY SPARK",       img: "/figma-assets/premium-infinity-spark-catalog.webp",      linha: "Premium" },
  { id: "neo-infinity-spark-h2",   label: "Neo INFINITY SPARK H₂",    img: "/figma-assets/premium-infinity-spark-h2-catalog.webp",   linha: "Premium" },
  { id: "neo-prestige",            label: "Neo PRESTIGE",             img: "/figma-assets/premium-prestige-catalog.webp",            linha: "Premium" },
  { id: "neo-prestige-spark",      label: "Neo PRESTIGE SPARK",       img: "/figma-assets/premium-prestige-spark-catalog.webp",      linha: "Premium" },
  { id: "neo-prestige-spark-h2",   label: "Neo PRESTIGE SPARK H₂",    img: "/figma-assets/premium-prestige-spark-h2-catalog.webp",   linha: "Premium" },
  { id: "neo-prime",               label: "Neo PRIME",                img: "/figma-assets/premium-prime-catalog.webp",               linha: "Premium" },
  { id: "neo-prime-spark",         label: "Neo PRIME SPARK",          img: "/figma-assets/premium-prime-spark-catalog.webp",         linha: "Premium" },
  { id: "neo-prime-spark-h2",      label: "Neo PRIME SPARK H₂",       img: "/figma-assets/premium-prime-spark-h2-catalog.webp",      linha: "Premium" },
  { id: "acquafy-media",           label: "Acquafy Media",            img: "/figma-assets/acquafy-media-totem.webp",                 linha: "Premium" },
];

/** Lookup rápido: id do produto → caminho da imagem (fonte única) */
export const PRODUCT_IMAGES: Record<string, string> = Object.fromEntries(
  PRODUCT_CATALOG.map(p => [p.id, p.img])
);
