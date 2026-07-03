import { PRODUCT_IMAGES, PRODUCT_PRICES_BRL } from "./products";

export type ProductScene = {
  img: string;
  minScroll: number;
};

export type CheckinVariant = {
  id: string;
  name: string;
  subLabel: string;
  desc: string;
  formato: string;
  price: number;
  img: string;
  // slides[colorIdx][slideIdx]: 5 colors × 10 positions (0–6 rotation, 7–9 detail)
  // File convention: /images/checkin/[family-slug]/[variant-id]/[color-slug]/01.jpg … 10.jpg
  slides?: string[][];
};

export type CheckinColor = {
  gradient: string;
  name: string;
  slug: string;
};

export type CheckinFamily = {
  slug: string;
  title: string;
  subtitle: string;
  isPremium: boolean;
  variants: CheckinVariant[];
  scenes: ProductScene[];
  colors?: CheckinColor[];
};

function v(id: string, name: string, subLabel: string, desc: string, formato: string): CheckinVariant {
  return { id, name, subLabel, desc, formato, price: PRODUCT_PRICES_BRL[id] ?? 0, img: PRODUCT_IMAGES[id] ?? "" };
}

/* ── Ultra slides helper ─────────────────────────────────────────────────── */
const _U  = "/images/checkin/neo-ultra";
const _US = `${_U}/_shared`;

function ultraSlides(variantId: string): string[][] {
  const V = `${_U}/${variantId}`;
  return ["ap", "cm", "cz", "bg", "wt"].map(c => {
    const shared = c === "cm"
      ? [`${_US}/cm/03.png`, `${_US}/cm/04.png`, `${_US}/cm/05.png`]
      : [`${_US}/${c}/02.png`, `${_US}/${c}/03.png`, `${_US}/${c}/04.png`, `${_US}/${c}/05.png`];
    return [`${V}/${c}/01.png`, ...shared, `${V}/${c}/06.png`, `${V}/${c}/00.png`];
  });
}

export const ULTRA_COLORS: CheckinColor[] = [
  { gradient: "linear-gradient(133deg, #1a3d4d 8%, #0d2530 89%)", name: "Azul Petróleo",   slug: "ap" },
  { gradient: "linear-gradient(133deg, #8a96a0 8%, #4e5a63 89%)", name: "Cinza Metrópole", slug: "cm" },
  { gradient: "linear-gradient(133deg, #c8c8c8 8%, #888888 89%)", name: "Cinza",           slug: "cz" },
  { gradient: "linear-gradient(133deg, #e8f2f6 8%, #c0d4dc 89%)", name: "Branco Glacial",  slug: "bg" },
  { gradient: "linear-gradient(133deg, #ffffff 8%, #e0e0e0 89%)", name: "Branco",          slug: "wt" },
];

export const CHECKIN_FAMILIES: CheckinFamily[] = [
  {
    slug: "neo-up",
    title: "Neo UP",
    subtitle: "Natural · Filtro UF",
    isPremium: false,
    variants: [v("neo-up", "Neo UP", "Apenas Natural", "Natural", "Bancada ou Parede")],
    scenes: [],
  },
  {
    slug: "neo-essentials",
    title: "Neo Compact",
    subtitle: "Multifuncional · até 7 em 1",
    isPremium: false,
    variants: [
      v("neo-fit",      "Neo FIT",      "6 em 1", "6 em 1",        "Bancada ou Parede"),
      v("neo-touch",    "Neo TOUCH",    "6 em 1", "6 em 1",        "Bancada"),
      v("neo-plus",     "Neo PLUS",     "6 em 1", "6 em 1",        "Bancada"),
      v("neo-smart-h2", "Neo SMART H₂", "7 em 1", "7 em 1 · H₂",  "Bancada"),
    ],
    scenes: [],
  },
  {
    slug: "neo-ultra",
    title: "Neo ULTRA",
    subtitle: "Alto Volume · até 8 em 1",
    isPremium: false,
    colors: ULTRA_COLORS,
    variants: [
      { ...v("neo-ultra",          "Neo ULTRA",          "6 em 1", "6 em 1",             "Bancada"), slides: ultraSlides("neo-ultra")          },
      { ...v("neo-ultra-spark",    "Neo ULTRA SPARK",    "7 em 1", "7 em 1 · Gás",       "Bancada"), slides: ultraSlides("neo-ultra-spark")    },
      { ...v("neo-ultra-spark-h2", "Neo ULTRA SPARK H₂", "8 em 1", "8 em 1 · Gás + H₂", "Bancada"), slides: ultraSlides("neo-ultra-spark-h2") },
    ],
    scenes: [],
  },
  {
    slug: "neo-max",
    title: "Neo MAX",
    subtitle: "Coluna · até 8 em 1",
    isPremium: false,
    variants: [
      v("neo-max",          "Neo MAX",          "6 em 1", "6 em 1",             "Coluna"),
      v("neo-max-spark",    "Neo MAX SPARK",    "7 em 1", "7 em 1 · Gás",       "Coluna"),
      v("neo-max-spark-h2", "Neo MAX SPARK H₂", "8 em 1", "8 em 1 · Gás + H₂", "Coluna"),
    ],
    scenes: [],
  },
  {
    slug: "neo-prestige",
    title: "Neo PRESTIGE",
    subtitle: "Embutido · Osmose Reversa",
    isPremium: true,
    variants: [
      v("neo-prestige",          "Neo PRESTIGE",          "6 em 1", "6 em 1",             "Embutido"),
      v("neo-prestige-spark",    "Neo PRESTIGE SPARK",    "7 em 1", "7 em 1 · Gás",       "Embutido"),
      v("neo-prestige-spark-h2", "Neo PRESTIGE SPARK H₂", "8 em 1", "8 em 1 · Gás + H₂", "Embutido"),
    ],
    scenes: [],
  },
  {
    slug: "neo-prime",
    title: "Neo PRIME",
    subtitle: "Semi-Industrial · Osmose Reversa",
    isPremium: true,
    variants: [
      v("neo-prime",          "Neo PRIME",          "6 em 1", "6 em 1",             "Bancada"),
      v("neo-prime-spark",    "Neo PRIME SPARK",    "7 em 1", "7 em 1 · Gás",       "Bancada"),
      v("neo-prime-spark-h2", "Neo PRIME SPARK H₂", "8 em 1", "8 em 1 · Gás + H₂", "Bancada"),
    ],
    scenes: [],
  },
  {
    slug: "neo-infinity",
    title: "Neo INFINITY",
    subtitle: "IPS 15,6\" · Osmose Reversa",
    isPremium: true,
    variants: [
      v("neo-infinity",          "Neo INFINITY",          "6 em 1", "6 em 1",             "Bancada"),
      v("neo-infinity-spark",    "Neo INFINITY SPARK",    "7 em 1", "7 em 1 · Gás",       "Bancada"),
      v("neo-infinity-spark-h2", "Neo INFINITY SPARK H₂", "8 em 1", "8 em 1 · Gás + H₂", "Bancada"),
    ],
    scenes: [],
  },
  {
    slug: "acquafy-media",
    title: "Acquafy Media",
    subtitle: "Totem Digital · Media Network",
    isPremium: true,
    variants: [v("acquafy-media", "Acquafy Media", "Totem Digital", "Totem Digital", "Totem")],
    scenes: [],
  },
];

export function getFamilyBySlug(slug: string): CheckinFamily | undefined {
  return CHECKIN_FAMILIES.find((f) => f.slug === slug);
}
