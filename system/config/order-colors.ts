// Colour names exactly as the website sends them with an order (Portuguese, components/CheckinProduct.tsx:
// getColorName(..., "pt", ...)), per product. Stock rows must use one of these, or "" for any colour. Products not
// listed send no colour (PRESTIGE, PRIME, Acquafy Media): their stock is always "any colour".

const NEO = ["Azul Petróleo", "Cinza Metrópole", "Cinza", "Branco Glacial", "Branco"]; // Neo UP, Compact, ULTRA
const MAX = ["Branco Pérola", "Cinza Escuro", "Cinza Prata", "Azul Ardósia", "Prata"]; // Neo MAX (default colours)
const INFINITY = ["Inox"];

export const ORDER_COLORS: Record<string, string[]> = {
  "neo-up": NEO,
  "neo-fit": NEO,
  "neo-touch": NEO,
  "neo-plus": NEO,
  "neo-smart-h2": NEO,
  "neo-ultra": NEO,
  "neo-ultra-spark": NEO,
  "neo-ultra-spark-h2": NEO,
  "neo-max": MAX,
  "neo-max-spark": MAX,
  "neo-max-spark-h2": MAX,
  "neo-infinity": INFINITY,
  "neo-infinity-spark": INFINITY,
  "neo-infinity-spark-h2": INFINITY,
};

/** "" (any colour) is always valid; otherwise the colour must be one the website sends for that product. */
export function validStockColor(product: string, color: string) {
  return color === "" || (ORDER_COLORS[product] ?? []).includes(color);
}

export const COLOR_GROUPS = [
  { label: "Neo UP, Compact e ULTRA", colors: NEO },
  { label: "Neo MAX", colors: MAX },
  { label: "Neo INFINITY", colors: INFINITY },
  { label: "PRESTIGE, PRIME e Acquafy Media", colors: [] as string[] },
];
