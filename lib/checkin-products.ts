import { PRODUCT_IMAGES, PRODUCT_PRICES_BRL } from "./products";

/* ── Types ─────────────────────────────────────────────────────────────────── */

/** One scroll-triggered scene: image shown when right panel reaches minScroll */
export type ProductScene = {
  img: string;
  minScroll: number;
};

/** A single purchasable variant inside a product family */
export type CheckinVariant = {
  id: string;
  name: string;       // e.g. "Neo ULTRA SPARK H₂"
  subLabel: string;   // e.g. "8 em 1 + Gás + H₂"
  price: number;      // BRL (integer, e.g. 4990 = R$ 4.990,00)
  img: string;
};

/** A product family = one checkin page with 1–4 variants */
export type CheckinFamily = {
  slug: string;       // URL segment, e.g. "neo-ultra"
  title: string;      // displayed name, e.g. "Neo ULTRA"
  subtitle: string;   // e.g. "Purificador Multifuncional"
  isPremium: boolean;
  variants: CheckinVariant[];
  /** Scroll-linked scenes. Empty = always show active variant image.
   *  Populated per product in a follow-up configuration step. */
  scenes: ProductScene[];
};

/* ── Helper ─────────────────────────────────────────────────────────────────── */
function v(id: string, name: string, subLabel: string): CheckinVariant {
  return { id, name, subLabel, price: PRODUCT_PRICES_BRL[id] ?? 0, img: PRODUCT_IMAGES[id] ?? "" };
}

/* ── Families ───────────────────────────────────────────────────────────────── */
export const CHECKIN_FAMILIES: CheckinFamily[] = [
  /* ── Neo UP ─────────────────────────────────────── */
  {
    slug: "neo-up",
    title: "Neo UP",
    subtitle: "Purificador Natural",
    isPremium: false,
    variants: [
      v("neo-up", "Neo UP", "Apenas Natural"),
    ],
    scenes: [],
  },

  /* ── Neo Essentials (FIT / SMART H2 / TOUCH / PLUS) ─ */
  {
    slug: "neo-essentials",
    title: "Neo Essentials",
    subtitle: "Purificadores Multifuncionais 6 em 1",
    isPremium: false,
    variants: [
      v("neo-fit",      "Neo FIT",      "6 em 1"),
      v("neo-smart-h2", "Neo SMART H₂", "7 em 1 + H₂"),
      v("neo-touch",    "Neo TOUCH",    "6 em 1"),
      v("neo-plus",     "Neo PLUS",     "6 em 1"),
    ],
    scenes: [],
  },

  /* ── Neo ULTRA ───────────────────────────────────── */
  {
    slug: "neo-ultra",
    title: "Neo ULTRA",
    subtitle: "Purificador Multifuncional",
    isPremium: false,
    variants: [
      v("neo-ultra",          "Neo ULTRA",          "6 em 1"),
      v("neo-ultra-spark",    "Neo ULTRA SPARK",    "7 em 1 + Gás"),
      v("neo-ultra-spark-h2", "Neo ULTRA SPARK H₂", "8 em 1 + Gás + H₂"),
    ],
    scenes: [],
  },

  /* ── Neo MAX ─────────────────────────────────────── */
  {
    slug: "neo-max",
    title: "Neo MAX",
    subtitle: "Purificador Coluna",
    isPremium: false,
    variants: [
      v("neo-max",          "Neo MAX",          "6 em 1"),
      v("neo-max-spark",    "Neo MAX SPARK",    "7 em 1 + Gás"),
      v("neo-max-spark-h2", "Neo MAX SPARK H₂", "8 em 1 + Gás + H₂"),
    ],
    scenes: [],
  },

  /* ── Neo PRESTIGE ────────────────────────────────── */
  {
    slug: "neo-prestige",
    title: "Neo PRESTIGE",
    subtitle: "Purificador Premium Embutido",
    isPremium: true,
    variants: [
      v("neo-prestige",          "Neo PRESTIGE",          "6 em 1 · Aço inox"),
      v("neo-prestige-spark",    "Neo PRESTIGE SPARK",    "7 em 1 + Gás"),
      v("neo-prestige-spark-h2", "Neo PRESTIGE SPARK H₂", "8 em 1 + Gás + H₂"),
    ],
    scenes: [],
  },

  /* ── Neo PRIME ───────────────────────────────────── */
  {
    slug: "neo-prime",
    title: "Neo PRIME",
    subtitle: "Purificador Premium",
    isPremium: true,
    variants: [
      v("neo-prime",          "Neo PRIME",          "6 em 1"),
      v("neo-prime-spark",    "Neo PRIME SPARK",    "7 em 1 + Gás"),
      v("neo-prime-spark-h2", "Neo PRIME SPARK H₂", "8 em 1 + Gás + H₂"),
    ],
    scenes: [],
  },

  /* ── Neo INFINITY ────────────────────────────────── */
  {
    slug: "neo-infinity",
    title: "Neo INFINITY",
    subtitle: 'Purificador Premium IPS 15,6"',
    isPremium: true,
    variants: [
      v("neo-infinity",          "Neo INFINITY",          '6 em 1 · IPS 15,6"'),
      v("neo-infinity-spark",    "Neo INFINITY SPARK",    "7 em 1 + Gás"),
      v("neo-infinity-spark-h2", "Neo INFINITY SPARK H₂", "8 em 1 + Gás + H₂"),
    ],
    scenes: [],
  },
];

export function getFamilyBySlug(slug: string): CheckinFamily | undefined {
  return CHECKIN_FAMILIES.find((f) => f.slug === slug);
}
