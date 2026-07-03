/** Preços BRL — fonte única para CompareProductos e CheckinMain */
export const PRODUCT_PRICES_BRL: Record<string, number> = {
  "neo-up":                   1289.85,
  "neo-fit":                  1989.85,
  "neo-smart-h2":             3489.85,
  "neo-touch":                2239.85,
  "neo-plus":                 3489.85,
  "neo-ultra":                4989.85,
  "neo-ultra-spark":          5989.85,
  "neo-ultra-spark-h2":       6989.85,
  "neo-max":                  5989.85,
  "neo-max-spark":            6989.85,
  "neo-max-spark-h2":         7989.85,
  "neo-infinity":             8489.85,
  "neo-infinity-spark":       8989.85,
  "neo-infinity-spark-h2":    9489.85,
  "neo-prestige":             8639.85,
  "neo-prestige-spark":       9139.85,
  "neo-prestige-spark-h2":    9639.85,
  "neo-prime":                8489.85,
  "neo-prime-spark":          8989.85,
  "neo-prime-spark-h2":       9489.85,
  "acquafy-media":            10000.00,
};

/** Preços USD — exibidos quando lang !== "pt" */
export const PRODUCT_PRICES_USD: Record<string, string> = {
  "neo-up":                   "US$ 257.97",
  "neo-fit":                  "US$ 397.97",
  "neo-smart-h2":             "US$ 697.97",
  "neo-touch":                "US$ 447.97",
  "neo-plus":                 "US$ 697.97",
  "neo-ultra":                "US$ 997.97",
  "neo-ultra-spark":          "US$ 1,197.97",
  "neo-ultra-spark-h2":       "US$ 1,397.97",
  "neo-max":                  "US$ 1,197.97",
  "neo-max-spark":            "US$ 1,397.97",
  "neo-max-spark-h2":         "US$ 1,597.97",
  "neo-infinity":             "US$ 1,697.97",
  "neo-infinity-spark":       "US$ 1,797.97",
  "neo-infinity-spark-h2":    "US$ 1,897.97",
  "neo-prestige":             "US$ 1,727.97",
  "neo-prestige-spark":       "US$ 1,827.97",
  "neo-prestige-spark-h2":    "US$ 1,927.97",
  "neo-prime":                "US$ 1,697.97",
  "neo-prime-spark":          "US$ 1,797.97",
  "neo-prime-spark-h2":       "US$ 1,897.97",
  "acquafy-media":            "US$ 2,000.00",
};

export function formatBRL(value: number) {
  return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
}

export function formatPrice(brl: number, lang: string): string {
  if (lang === "pt" || lang === "pt-pt") return formatBRL(brl);
  const usd = brl / 5;
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
