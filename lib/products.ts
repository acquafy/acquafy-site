/** Preços BRL (centavos) — fonte única para CompareProductos e CheckinMain */
export const PRODUCT_PRICES_BRL: Record<string, number> = {
  "neo-up":                   1490,
  "neo-fit":                  1990,
  "neo-smart-h2":             2490,
  "neo-touch":                2990,
  "neo-plus":                 3490,
  "neo-ultra":                3990,
  "neo-ultra-spark":          4490,
  "neo-ultra-spark-h2":       4990,
  "neo-max":                  4990,
  "neo-max-spark":            5490,
  "neo-max-spark-h2":         5990,
  "neo-infinity":             6990,
  "neo-infinity-spark":       7490,
  "neo-infinity-spark-h2":    7990,
  "neo-prestige":             7490,
  "neo-prestige-spark":       7990,
  "neo-prestige-spark-h2":    8490,
  "neo-prime":                7990,
  "neo-prime-spark":          8490,
  "neo-prime-spark-h2":       8990,
};

export function formatBRL(cents: number) {
  return `R$ ${cents.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
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
  { id: "neo-smart-h2",            label: "Neo SMART H₂",             img: "/figma-assets/neo-smart-h2.webp",            linha: "Essentials" },
  { id: "neo-touch",               label: "Neo TOUCH",                img: "/figma-assets/neo-touch.webp",            linha: "Essentials" },
  { id: "neo-plus",                label: "Neo PLUS",                 img: "/figma-assets/neo-plus.webp",             linha: "Essentials" },
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
];

/** Lookup rápido: id do produto → caminho da imagem (fonte única) */
export const PRODUCT_IMAGES: Record<string, string> = Object.fromEntries(
  PRODUCT_CATALOG.map(p => [p.id, p.img])
);
