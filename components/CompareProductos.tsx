"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import FigmaIcon from "./FigmaIcon";
import { PRODUCT_PRICES_BRL, formatPrice, PRODUCT_IMAGES as productImages } from "@/lib/products";
import { CHECKIN_FAMILIES } from "@/lib/checkin-products";

const PRODUCT_TO_FAMILY: Record<string, string> = {};
CHECKIN_FAMILIES.forEach(f => f.variants.forEach(v => { PRODUCT_TO_FAMILY[v.id] = f.slug; }));
import { useCart } from "@/components/CartProvider";
import { useLang, type Lang } from "@/context/LanguageContext";

// ─── Assets ───────────────────────────────────────────────────────────────────
const imgBannerBg       = "/figma-assets/compare-banner-bg.webp";
const imgBannerProducts = "/figma-assets/compare-banner-products.webp";
const imgBuyCursor      = "/figma-assets/cursor-buy.webp";
const imgArrowWhite     = "/figma-assets/icon-arrow-white-b.svg";
const imgArrowBlue      = "/figma-assets/icon-arrow-blue-a.svg";
const imgMobile         = "/figma-assets/icon-mobile-a.svg";
const imgLanguage       = "/figma-assets/icon-language-a.svg";
const imgPlanetWeb      = "/figma-assets/icon-planetweb-a.svg";
const imgPlanetGlobal   = "/figma-assets/icon-planet-global.svg";
const imgWaterVector    = "/figma-assets/icon-water-vector.svg";
const imgNegativeX      = "/figma-assets/icon-negative-x.svg";
const imgNegative       = "/figma-assets/icon-negative.svg";
const imgCheckin        = "/figma-assets/icon-check-a.svg";
const imgCheckinBlue    = "/figma-assets/icon-check-blue-a.svg";
const imgCheckinPurple  = "/figma-assets/icon-check-purple-a.svg";
const imgMoney          = "/figma-assets/icon-money-a.svg";
const imgEssentialsBg   = "/figma-assets/bg-essentials-section.webp";
const imgPremiumBg      = "/figma-assets/bg-premium-section.webp";
const imgShield         = "/figma-assets/icon-shield-a.svg";
const imgLogistics      = "/figma-assets/icon-logistics.svg";
const imgPhone          = "/figma-assets/icon-phone-a.svg";
const imgCertificate    = "/figma-assets/icon-certificate.svg";
const imgSustainability = "/figma-assets/icon-sustainability.svg";


// ─── Types ────────────────────────────────────────────────────────────────────
type Specs = {
  formato: string;
  funcoes: string;
  temperaturas: string;
  gas: boolean;
  h2: boolean;
  painel: string;
  app: boolean;
  iot: boolean;
  wifi: boolean;
  uv: boolean;
  compressor: boolean;
  filtragem: string;
  tanque: string;
  material: string;
  preco: string;
};

type Product = {
  id: string;
  label: string;
  nameParts: { text: string; highlight?: boolean }[];
  linha: "Essentials" | "Premium";
  categories: string[];
  specs: Specs;
};

// ─── Product Catalog ──────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  // ── Neo Essentials ──────────────────────────────────────────────
  {
    id: "neo-up", label: "Neo UP",
    nameParts: [{ text: "Neo " }, { text: "UP", highlight: true }],
    linha: "Essentials", categories: ["Bancada"],
    specs: { formato: "Bancada ou Parede", funcoes: "—", temperaturas: "Natural", gas: false, h2: false, painel: "—", app: false, iot: false, wifi: false, uv: false, compressor: false, filtragem: "4 Filtros UF de Alta Performance", tanque: "—", material: "Acabamento premium", preco: "US$ 257.97" },
  },
  {
    id: "neo-fit", label: "Neo FIT",
    nameParts: [{ text: "Neo " }, { text: "FIT", highlight: true }],
    linha: "Essentials", categories: ["Bancada"],
    specs: { formato: "Bancada ou Parede", funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1\"", app: true, iot: true, wifi: true, uv: true, compressor: false, filtragem: "4 Filtros UF de Alta Performance", tanque: "400ml", material: "Acabamento premium", preco: "US$ 397.97" },
  },
  {
    id: "neo-touch", label: "Neo TOUCH",
    nameParts: [{ text: "Neo " }, { text: "TOUCH", highlight: true }],
    linha: "Essentials", categories: ["Bancada"],
    specs: { formato: "Bancada", funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1\"", app: true, iot: true, wifi: true, uv: true, compressor: false, filtragem: "4 Filtros UF de Alta Performance", tanque: "800ml", material: "Acabamento premium", preco: "US$ 447.97" },
  },
  {
    id: "neo-plus", label: "Neo PLUS",
    nameParts: [{ text: "Neo " }, { text: "PLUS", highlight: true }],
    linha: "Essentials", categories: ["Bancada"],
    specs: { formato: "Bancada", funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1\"", app: true, iot: true, wifi: true, uv: true, compressor: false, filtragem: "4 Filtros UF de Alta Performance", tanque: "1500ml", material: "Acabamento premium", preco: "US$ 697.97" },
  },
  {
    id: "neo-smart-h2", label: "Neo SMART H₂",
    nameParts: [{ text: "Neo " }, { text: "SMART H", highlight: true }, { text: "2", highlight: true }],
    linha: "Essentials", categories: ["Bancada", "Água Hidrogenada"],
    specs: { formato: "Bancada", funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: true, painel: "LED Touch 10.1\"", app: true, iot: true, wifi: true, uv: true, compressor: false, filtragem: "4 Filtros RO / Osmose Reversa de Alta Performance", tanque: "800ml", material: "Acabamento premium", preco: "US$ 697.97" },
  },
  {
    id: "neo-ultra", label: "Neo ULTRA",
    nameParts: [{ text: "Neo " }, { text: "ULTRA", highlight: true }],
    linha: "Essentials", categories: ["Bancada"],
    specs: { formato: "Bancada", funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1\"", app: true, iot: true, wifi: true, uv: true, compressor: true, filtragem: "4 Filtros UF de Alta Performance", tanque: "3000ml", material: "Acabamento premium", preco: "US$ 997.97" },
  },
  {
    id: "neo-ultra-spark", label: "Neo ULTRA SPARK",
    nameParts: [{ text: "Neo " }, { text: "ULTRA SPARK", highlight: true }],
    linha: "Essentials", categories: ["Bancada", "Água com Gás"],
    specs: { formato: "Bancada", funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: false, painel: "LED Touch 10.1\"", app: true, iot: true, wifi: true, uv: true, compressor: true, filtragem: "4 Filtros UF de Alta Performance", tanque: "3000ml", material: "Acabamento premium", preco: "US$ 1,197.97" },
  },
  {
    id: "neo-ultra-spark-h2", label: "Neo ULTRA SPARK H₂",
    nameParts: [{ text: "Neo " }, { text: "ULTRA SPARK H", highlight: true }, { text: "2", highlight: true }],
    linha: "Essentials", categories: ["Bancada", "Água com Gás", "Água Hidrogenada"],
    specs: { formato: "Bancada", funcoes: "8 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: true, painel: "LED Touch 10.1\"", app: true, iot: true, wifi: true, uv: true, compressor: true, filtragem: "4 Filtros RO / Osmose Reversa de Alta Performance", tanque: "3000ml", material: "Acabamento premium", preco: "US$ 1,397.97" },
  },
  {
    id: "neo-max", label: "Neo MAX",
    nameParts: [{ text: "Neo " }, { text: "MAX", highlight: true }],
    linha: "Essentials", categories: ["Coluna"],
    specs: { formato: "Coluna", funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1\"", app: true, iot: true, wifi: true, uv: true, compressor: true, filtragem: "4 Filtros UF de Alta Performance", tanque: "3000ml", material: "Acabamento premium", preco: "US$ 1,197.97" },
  },
  {
    id: "neo-max-spark", label: "Neo MAX SPARK",
    nameParts: [{ text: "Neo " }, { text: "MAX SPARK", highlight: true }],
    linha: "Essentials", categories: ["Coluna", "Água com Gás"],
    specs: { formato: "Coluna", funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: false, painel: "LED Touch 10.1\"", app: true, iot: true, wifi: true, uv: true, compressor: true, filtragem: "4 Filtros UF de Alta Performance", tanque: "3000ml", material: "Acabamento premium", preco: "US$ 1,397.97" },
  },
  {
    id: "neo-max-spark-h2", label: "Neo MAX SPARK H₂",
    nameParts: [{ text: "Neo " }, { text: "MAX SPARK H", highlight: true }, { text: "2", highlight: true }],
    linha: "Essentials", categories: ["Coluna", "Água com Gás", "Água Hidrogenada"],
    specs: { formato: "Coluna", funcoes: "8 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: true, painel: "LED Touch 10.1\"", app: true, iot: true, wifi: true, uv: true, compressor: true, filtragem: "4 Filtros RO / Osmose Reversa de Alta Performance", tanque: "3000ml", material: "Acabamento premium", preco: "US$ 1,597.97" },
  },
  // ── Acquafy Media ───────────────────────────────────────────────
  {
    id: "acquafy-media", label: "Acquafy Media",
    nameParts: [{ text: "Acquafy " }, { text: "Media", highlight: true }],
    linha: "Premium", categories: [],
    specs: { formato: "Totem Digital", funcoes: "—", temperaturas: "Natural e Gelada", gas: false, h2: false, painel: "Samsung Business 43\" 24/7", app: true, iot: true, wifi: true, uv: true, compressor: true, filtragem: "4 Filtros UF de Alta Performance", tanque: "5.000ml", material: "Aço inox", preco: "US$ 2,000.00" },
  },
  // ── Neo Premium ─────────────────────────────────────────────────
  {
    id: "neo-infinity", label: "Neo INFINITY",
    nameParts: [{ text: "Neo " }, { text: "INFINITY", highlight: true }],
    linha: "Premium", categories: ["Bancada"],
    specs: { formato: "Bancada", funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LCD IPS Touch 15.6\"", app: true, iot: true, wifi: true, uv: true, compressor: true, filtragem: "4 Filtros RO / Osmose Reversa de Alta Performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,697.97" },
  },
  {
    id: "neo-infinity-spark", label: "Neo INFINITY SPARK",
    nameParts: [{ text: "Neo " }, { text: "INFINITY SPARK", highlight: true }],
    linha: "Premium", categories: ["Bancada", "Água com Gás"],
    specs: { formato: "Bancada", funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: false, painel: "LCD IPS Touch 15.6\"", app: true, iot: true, wifi: true, uv: true, compressor: true, filtragem: "4 Filtros RO / Osmose Reversa de Alta Performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,797.97" },
  },
  {
    id: "neo-infinity-spark-h2", label: "Neo INFINITY SPARK H₂",
    nameParts: [{ text: "Neo " }, { text: "INFINITY SPARK H", highlight: true }, { text: "2", highlight: true }],
    linha: "Premium", categories: ["Bancada", "Água com Gás", "Água Hidrogenada"],
    specs: { formato: "Bancada", funcoes: "8 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: true, painel: "LCD IPS Touch 15.6\"", app: true, iot: true, wifi: true, uv: true, compressor: true, filtragem: "4 Filtros RO / Osmose Reversa de Alta Performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,897.97" },
  },
  {
    id: "neo-prestige", label: "Neo PRESTIGE",
    nameParts: [{ text: "Neo " }, { text: "PRESTIGE", highlight: true }],
    linha: "Premium", categories: ["Embutido"],
    specs: { formato: "Embutido", funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LCD IPS Touch 15.6\"", app: true, iot: true, wifi: true, uv: true, compressor: true, filtragem: "4 Filtros RO / Osmose Reversa de Alta Performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,727.97" },
  },
  {
    id: "neo-prestige-spark", label: "Neo PRESTIGE SPARK",
    nameParts: [{ text: "Neo " }, { text: "PRESTIGE SPARK", highlight: true }],
    linha: "Premium", categories: ["Embutido", "Água com Gás"],
    specs: { formato: "Embutido", funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: false, painel: "LCD IPS Touch 15.6\"", app: true, iot: true, wifi: true, uv: true, compressor: true, filtragem: "4 Filtros RO / Osmose Reversa de Alta Performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,827.97" },
  },
  {
    id: "neo-prestige-spark-h2", label: "Neo PRESTIGE SPARK H₂",
    nameParts: [{ text: "Neo " }, { text: "PRESTIGE SPARK H", highlight: true }, { text: "2", highlight: true }],
    linha: "Premium", categories: ["Embutido", "Água com Gás", "Água Hidrogenada"],
    specs: { formato: "Embutido", funcoes: "8 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: true, painel: "LCD IPS Touch 15.6\"", app: true, iot: true, wifi: true, uv: true, compressor: true, filtragem: "4 Filtros RO / Osmose Reversa de Alta Performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,927.97" },
  },
  {
    id: "neo-prime", label: "Neo PRIME",
    nameParts: [{ text: "Neo " }, { text: "PRIME", highlight: true }],
    linha: "Premium", categories: ["Bancada"],
    specs: { formato: "Bancada", funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LCD IPS Touch 15.6\"", app: true, iot: true, wifi: true, uv: true, compressor: true, filtragem: "4 Filtros RO / Osmose Reversa de Alta Performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,697.97" },
  },
  {
    id: "neo-prime-spark", label: "Neo PRIME SPARK",
    nameParts: [{ text: "Neo " }, { text: "PRIME SPARK", highlight: true }],
    linha: "Premium", categories: ["Bancada", "Água com Gás"],
    specs: { formato: "Bancada", funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: false, painel: "LCD IPS Touch 15.6\"", app: true, iot: true, wifi: true, uv: true, compressor: true, filtragem: "4 Filtros RO / Osmose Reversa de Alta Performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,797.97" },
  },
  {
    id: "neo-prime-spark-h2", label: "Neo PRIME SPARK H₂",
    nameParts: [{ text: "Neo " }, { text: "PRIME SPARK H", highlight: true }, { text: "2", highlight: true }],
    linha: "Premium", categories: ["Bancada", "Água com Gás", "Água Hidrogenada"],
    specs: { formato: "Bancada", funcoes: "8 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: true, painel: "LCD IPS Touch 15.6\"", app: true, iot: true, wifi: true, uv: true, compressor: true, filtragem: "4 Filtros RO / Osmose Reversa de Alta Performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,897.97" },
  },
];

// ─── Spec Rows ────────────────────────────────────────────────────────────────
const SPEC_ROWS: { key: keyof Specs; label: string; type: "text" | "bool" | "price" }[] = [
  { key: "formato",     label: "Formato",               type: "text"  },
  { key: "temperaturas",label: "Temperaturas",          type: "text"  },
  { key: "gas",         label: "Água com gás",          type: "bool"  },
  { key: "h2",          label: "Água hidrogenada",      type: "bool"  },
  { key: "painel",      label: "Painel",                type: "text"  },
  { key: "app",         label: "App",                   type: "bool"  },
  { key: "iot",         label: "AI + IoT",              type: "bool"  },
  { key: "wifi",        label: "Wi-Fi + Bluetooth 5.3", type: "bool"  },
  { key: "uv",          label: "UV LED",                type: "bool"  },
  { key: "filtragem",   label: "Sistema de Filtragem",  type: "text"  },
  { key: "tanque",      label: "Tanque de água gelada", type: "text"  },
  { key: "compressor",  label: "Compressor Inverter",   type: "bool"  },
  { key: "material",    label: "Material",              type: "text"  },
  { key: "preco",       label: "Preço BR",              type: "price" },
];

// ─── Spec value translator ────────────────────────────────────────────────────
const SPEC_TRANSLATE: Partial<Record<Lang, Record<string, string>>> = {
  en: {
    "Bancada ou Parede": "Countertop or Wall",
    "Bancada": "Countertop",
    "Coluna": "Floor Stand",
    "Embutido": "Built-in",
    "Totem Digital": "Digital Totem",
    "Natural, Gelada e Quente": "Natural, Cold & Hot",
    "Natural e Gelada": "Natural & Cold",
    "Natural": "Natural",
    "Acabamento premium": "Premium Finish",
    "Aço inox": "Stainless Steel",
    "4 Filtros UF de Alta Performance": "4 High-Performance UF Filters",
    "4 Filtros RO / Osmose Reversa de Alta Performance": "4 High-Performance RO / Reverse Osmosis Filters",
    "6 em 1": "6 in 1", "7 em 1": "7 in 1", "8 em 1": "8 in 1",
  },
  "en-gb": {
    "Bancada ou Parede": "Countertop or Wall",
    "Bancada": "Countertop",
    "Coluna": "Floor Stand",
    "Embutido": "Built-in",
    "Totem Digital": "Digital Totem",
    "Natural, Gelada e Quente": "Natural, Cold & Hot",
    "Natural e Gelada": "Natural & Cold",
    "Natural": "Natural",
    "Acabamento premium": "Premium Finish",
    "Aço inox": "Stainless Steel",
    "4 Filtros UF de Alta Performance": "4 High-Performance UF Filters",
    "4 Filtros RO / Osmose Reversa de Alta Performance": "4 High-Performance RO / Reverse Osmosis Filters",
    "6 em 1": "6 in 1", "7 em 1": "7 in 1", "8 em 1": "8 in 1",
  },
  es: {
    "Bancada ou Parede": "Encimera o Pared",
    "Bancada": "Encimera",
    "Coluna": "Columna",
    "Embutido": "Empotrado",
    "Totem Digital": "Tótem Digital",
    "Natural, Gelada e Quente": "Natural, Fría y Caliente",
    "Natural e Gelada": "Natural y Fría",
    "Natural": "Natural",
    "Acabamento premium": "Acabado premium",
    "Aço inox": "Acero inoxidable",
    "4 Filtros UF de Alta Performance": "4 Filtros UF de Alto Rendimiento",
    "4 Filtros RO / Osmose Reversa de Alta Performance": "4 Filtros RO / Ósmosis Inversa de Alto Rendimiento",
    "6 em 1": "6 en 1", "7 em 1": "7 en 1", "8 em 1": "8 en 1",
  },
  fr: {
    "Bancada ou Parede": "Comptoir ou Mur",
    "Bancada": "Comptoir",
    "Coluna": "Sur Pied",
    "Embutido": "Encastré",
    "Totem Digital": "Totem Numérique",
    "Natural, Gelada e Quente": "Naturelle, Froide et Chaude",
    "Natural e Gelada": "Naturelle et Froide",
    "Natural": "Naturelle",
    "Acabamento premium": "Finition Premium",
    "Aço inox": "Acier Inoxydable",
    "4 Filtros UF de Alta Performance": "4 Filtres UF Haute Performance",
    "4 Filtros RO / Osmose Reversa de Alta Performance": "4 Filtres RO / Osmose Inverse Haute Performance",
    "6 em 1": "6 en 1", "7 em 1": "7 en 1", "8 em 1": "8 en 1",
  },
  de: {
    "Bancada ou Parede": "Tisch oder Wand",
    "Bancada": "Tisch",
    "Coluna": "Standfuß",
    "Embutido": "Eingebaut",
    "Totem Digital": "Digitaler Totem",
    "Natural, Gelada e Quente": "Natürlich, Kalt & Heiß",
    "Natural e Gelada": "Natürlich & Kalt",
    "Natural": "Natürlich",
    "Acabamento premium": "Premium-Verarbeitung",
    "Aço inox": "Edelstahl",
    "4 Filtros UF de Alta Performance": "4 UF-Filter Hochleistung",
    "4 Filtros RO / Osmose Reversa de Alta Performance": "4 RO-Filter / Umkehrosmose Hochleistung",
    "6 em 1": "6 in 1", "7 em 1": "7 in 1", "8 em 1": "8 in 1",
  },
  it: {
    "Bancada ou Parede": "Piano o Parete",
    "Bancada": "Piano",
    "Coluna": "A Colonna",
    "Embutido": "Incassato",
    "Totem Digital": "Totem Digitale",
    "Natural, Gelada e Quente": "Naturale, Fredda e Calda",
    "Natural e Gelada": "Naturale e Fredda",
    "Natural": "Naturale",
    "Acabamento premium": "Finitura Premium",
    "Aço inox": "Acciaio Inox",
    "4 Filtros UF de Alta Performance": "4 Filtri UF Alta Performance",
    "4 Filtros RO / Osmose Reversa de Alta Performance": "4 Filtri RO / Osmosi Inversa Alta Performance",
    "6 em 1": "6 in 1", "7 em 1": "7 in 1", "8 em 1": "8 in 1",
  },
  zh: {
    "Bancada ou Parede": "台面或墙壁",
    "Bancada": "台面",
    "Coluna": "立式",
    "Embutido": "嵌入式",
    "Totem Digital": "数字图腾",
    "Natural, Gelada e Quente": "常温、冷水和热水",
    "Natural e Gelada": "常温和冷水",
    "Natural": "常温",
    "Acabamento premium": "高级饰面",
    "Aço inox": "不锈钢",
    "4 Filtros UF de Alta Performance": "4个高性能超滤滤芯",
    "4 Filtros RO / Osmose Reversa de Alta Performance": "4个高性能RO反渗透滤芯",
    "6 em 1": "六合一", "7 em 1": "七合一", "8 em 1": "八合一",
  },
  ja: {
    "Bancada ou Parede": "カウンタートップまたは壁掛け",
    "Bancada": "カウンタートップ",
    "Coluna": "フロアスタンド",
    "Embutido": "ビルトイン",
    "Totem Digital": "デジタルトーテム",
    "Natural, Gelada e Quente": "常温・冷水・温水",
    "Natural e Gelada": "常温・冷水",
    "Natural": "常温",
    "Acabamento premium": "プレミアム仕上げ",
    "Aço inox": "ステンレス",
    "4 Filtros UF de Alta Performance": "高性能UFフィルター×4",
    "4 Filtros RO / Osmose Reversa de Alta Performance": "高性能RO/逆浸透フィルター×4",
    "6 em 1": "6-in-1", "7 em 1": "7-in-1", "8 em 1": "8-in-1",
  },
  ko: {
    "Bancada ou Parede": "카운터탑 또는 벽걸이",
    "Bancada": "카운터탑",
    "Coluna": "스탠드형",
    "Embutido": "빌트인",
    "Totem Digital": "디지털 토템",
    "Natural, Gelada e Quente": "상온, 냉수 및 온수",
    "Natural e Gelada": "상온 및 냉수",
    "Natural": "상온",
    "Acabamento premium": "프리미엄 마감",
    "Aço inox": "스테인리스 스틸",
    "4 Filtros UF de Alta Performance": "고성능 UF 필터 4개",
    "4 Filtros RO / Osmose Reversa de Alta Performance": "고성능 RO/역삼투압 필터 4개",
    "6 em 1": "6 in 1", "7 em 1": "7 in 1", "8 em 1": "8 in 1",
  },
  sv: {
    "Bancada ou Parede": "Bänkskiva eller Vägg",
    "Bancada": "Bänkskiva",
    "Coluna": "Golvstående",
    "Embutido": "Inbyggd",
    "Totem Digital": "Digital Totem",
    "Natural, Gelada e Quente": "Natural, Kall och Varm",
    "Natural e Gelada": "Natural och Kall",
    "Natural": "Natural",
    "Acabamento premium": "Premiumfinish",
    "Aço inox": "Rostfritt Stål",
    "4 Filtros UF de Alta Performance": "4 Högpresterande UF-filter",
    "4 Filtros RO / Osmose Reversa de Alta Performance": "4 Högpresterande RO/Omvänd Osmos-filter",
    "6 em 1": "6 i 1", "7 em 1": "7 i 1", "8 em 1": "8 i 1",
  },
  fi: {
    "Bancada ou Parede": "Työtaso tai Seinä",
    "Bancada": "Työtaso",
    "Coluna": "Lattiamalli",
    "Embutido": "Upotettava",
    "Totem Digital": "Digitaalinen Totem",
    "Natural, Gelada e Quente": "Luonnollinen, Kylmä ja Kuuma",
    "Natural e Gelada": "Luonnollinen ja Kylmä",
    "Natural": "Luonnollinen",
    "Acabamento premium": "Premium-viimeistely",
    "Aço inox": "Ruostumaton Teräs",
    "4 Filtros UF de Alta Performance": "4 Korkean Suorituskyvyn UF-suodatinta",
    "4 Filtros RO / Osmose Reversa de Alta Performance": "4 Korkean Suorituskyvyn RO/Käänteisosmoosisuodatinta",
    "6 em 1": "6-in-1", "7 em 1": "7-in-1", "8 em 1": "8-in-1",
  },
  ru: {
    "Bancada ou Parede": "Столешница или Стена",
    "Bancada": "Столешница",
    "Coluna": "Напольный",
    "Embutido": "Встраиваемый",
    "Totem Digital": "Цифровой Тотем",
    "Natural, Gelada e Quente": "Комн. темп., Холодная и Горячая",
    "Natural e Gelada": "Комн. темп. и Холодная",
    "Natural": "Комн. температура",
    "Acabamento premium": "Премиум-отделка",
    "Aço inox": "Нержавеющая Сталь",
    "4 Filtros UF de Alta Performance": "4 Высокопроизводительных УФ-фильтра",
    "4 Filtros RO / Osmose Reversa de Alta Performance": "4 Высокопроизводительных RO-фильтра / Обратный осмос",
    "6 em 1": "6 в 1", "7 em 1": "7 в 1", "8 em 1": "8 в 1",
  },
  ro: {
    "Bancada ou Parede": "Blat sau Perete",
    "Bancada": "Blat",
    "Coluna": "Coloană",
    "Embutido": "Încastrat",
    "Totem Digital": "Totem Digital",
    "Natural, Gelada e Quente": "Natural, Rece și Cald",
    "Natural e Gelada": "Natural și Rece",
    "Natural": "Natural",
    "Acabamento premium": "Finisaj Premium",
    "Aço inox": "Oțel Inoxidabil",
    "4 Filtros UF de Alta Performance": "4 Filtre UF de Înaltă Performanță",
    "4 Filtros RO / Osmose Reversa de Alta Performance": "4 Filtre RO / Osmoză Inversă de Înaltă Performanță",
    "6 em 1": "6 în 1", "7 em 1": "7 în 1", "8 em 1": "8 în 1",
  },
  he: {
    "Bancada ou Parede": "משטח עבודה או קיר",
    "Bancada": "משטח עבודה",
    "Coluna": "עמוד",
    "Embutido": "בנוי",
    "Totem Digital": "טוטם דיגיטלי",
    "Natural, Gelada e Quente": "רגיל, קר וחם",
    "Natural e Gelada": "רגיל וקר",
    "Natural": "טמפרטורת חדר",
    "Acabamento premium": "גימור פרמיום",
    "Aço inox": "נירוסטה",
    "4 Filtros UF de Alta Performance": "4 מסננים UF בביצועים גבוהים",
    "4 Filtros RO / Osmose Reversa de Alta Performance": "4 מסננים RO / אוסמוזה הפוכה בביצועים גבוהים",
    "6 em 1": "6 ב-1", "7 em 1": "7 ב-1", "8 em 1": "8 ב-1",
  },
};

function translateSpec(val: string, lang: Lang): string {
  if (lang === "pt") return val;
  return SPEC_TRANSLATE[lang]?.[val] ?? val;
}

// ─── Filters (PT keys used for logic) ─────────────────────────────────────────
const FILTERS_PT = ["Todos", "Essentials", "Media", "Premium", "Bancada", "Coluna", "Embutido", "Água com Gás", "Água Hidrogenada"];

// ─── Translations ─────────────────────────────────────────────────────────────
const T: Record<Lang, {
  filters: string[];
  badgeLabel: string;
  h1Pre: string; h1Highlight: string;
  subtitle: string;
  ctaSpecialist: string;
  pills: string[];
  selectorPre: string; selector44: string;
  viewComparison: string;
  selectedBarTitle: string; selectedBarSub: string;
  selectProduct: string; removeLabel: string;
  tableFeatures: string;
  linePrefix: string;
  specRowLabels: string[];
  acquireLabel: string; buyNow: string;
  emptyTable: string;
  essentialsChecklist: string[];
  premiumChecklist: string[];
  priceRangesTitle: string;
  priceFrom: string; priceTo: string;
  trustItems: { title: string; desc: string }[];
  modalNone: string; modalSelected: string; modalCompare: string; modalClose: string;
  altYes: string; altNo: string;
  mediaExtraTitle: string; mediaExtraItems: string[];
}> = {
  pt: {
    filters: ["Todos", "Essentials", "Media", "Premium", "Bancada", "Coluna", "Embutido", "Água com Gás", "Água Hidrogenada"],
    badgeLabel: "Compare Produtos",
    h1Pre: "Compare os produtos ", h1Highlight: "Acquafy Neo",
    subtitle: "Compare as linhas Neo Essentials & Neo Premium e encontre o modelo ideal para você.",
    ctaSpecialist: "Falar com um especialista",
    pills: ["App + AI + IoT", "16 idiomas", "Operação global", "Plataforma Inteligente de Água"],
    selectorPre: "Selecione os modelos para comparar (", selector44: "/4)",
    viewComparison: "Ver comparação",
    selectedBarTitle: "Produtos selecionados", selectedBarSub: "Adicione ou remova produtos para comparar",
    selectProduct: "Selecione um produto", removeLabel: "Remover",
    tableFeatures: "Características",
    linePrefix: "Linha Neo ",
    specRowLabels: ["Formato", "Temperaturas", "Água com gás", "Água hidrogenada", "Painel", "App", "AI + IoT", "Wi-Fi + Bluetooth 5.3", "UV LED", "Sistema de Filtragem", "Tanque de água gelada", "Compressor Inverter", "Material", "Preço BR"],
    acquireLabel: "Adquirir", buyNow: "Comprar Agora →",
    emptyTable: "Selecione ao menos um produto para comparar.",
    essentialsChecklist: ["Painel LED Touch 10,1", "App + AI + IoT", "4 Filtros UF de Alta Performance", "Modelos Bancada, Parede e Coluna", "Excelente custo-benefício"],
    premiumChecklist: ["Aço inox", "Painel LCD IPS Touch 15.6", "Mini Media Network", "4 Filtros RO / Osmose Reversa de Alta Performance", "Proposta premium e sofisticada"],
    priceRangesTitle: "Faixas de preço no mercado americano",
    priceFrom: "de ", priceTo: " a ",
    trustItems: [
      { title: "Qualidade Garantida",  desc: "Produtos variados e certificados com os mais altos padrões." },
      { title: "Entrega Segura",       desc: "Entrega rígida e segura para todo o Brasil." },
      { title: "Assistência Técnica",  desc: "Rede autorizada de assistência em todo o país." },
      { title: "Garantia Estendida",   desc: "Mais tranquilidade para você e sua família." },
      { title: "Sustentabilidade",     desc: "Tecnologia que cuida da água e do planeta." },
    ],
    modalNone: "Nenhum produto selecionado", modalSelected: " de 4 produto", modalCompare: "Comparar", modalClose: "Fechar",
    altYes: "Sim", altNo: "Não",
    mediaExtraTitle: "Recursos exclusivos do Acquafy Media",
    mediaExtraItems: ["Tanque de água natural: 10.000ml", "2 Sensores de aproximação de copos e garrafas", "Computador Ultra Rápido com Sistemas de Gestão de Mídia", "Plataforma de Mídia Digital + Receita Recorrente"],
  },
  "pt-pt": {
    filters: ["Todos", "Essentials", "Media", "Premium", "Bancada", "Coluna", "Embutido", "Água com Gás", "Água Hidrogenada"],
    badgeLabel: "Comparar Produtos",
    h1Pre: "Compare os produtos ", h1Highlight: "Acquafy Neo",
    subtitle: "Compare as linhas Neo Essentials & Neo Premium e encontre o modelo ideal para si.",
    ctaSpecialist: "Falar com um especialista",
    pills: ["App + AI + IoT", "16 idiomas", "Operação global", "Plataforma Inteligente de Água"],
    selectorPre: "Selecione os modelos para comparar (", selector44: "/4)",
    viewComparison: "Ver comparação",
    selectedBarTitle: "Produtos selecionados", selectedBarSub: "Adicione ou remova produtos para comparar",
    selectProduct: "Selecione um produto", removeLabel: "Remover",
    tableFeatures: "Características",
    linePrefix: "Linha Neo ",
    specRowLabels: ["Formato", "Temperaturas", "Água com gás", "Água hidrogenada", "Painel", "App", "AI + IoT", "Wi-Fi + Bluetooth 5.3", "UV LED", "Sistema de Filtragem", "Tanque de água gelada", "Compressor Inverter", "Material", "Preço BR"],
    acquireLabel: "Adquirir", buyNow: "Comprar Agora →",
    emptyTable: "Selecione pelo menos um produto para comparar.",
    essentialsChecklist: ["Painel LED Touch 10,1", "App + AI + IoT", "4 Filtros UF de Alta Performance", "Modelos Bancada, Parede e Coluna", "Excelente relação qualidade-preço"],
    premiumChecklist: ["Aço inox", "Painel LCD IPS Touch 15.6", "Mini Media Network", "4 Filtros RO / Osmose Inversa de Alta Performance", "Proposta premium e sofisticada"],
    priceRangesTitle: "Faixas de preço no mercado americano",
    priceFrom: "de ", priceTo: " a ",
    trustItems: [
      { title: "Qualidade Garantida",  desc: "Produtos certificados com os mais altos padrões." },
      { title: "Entrega Segura",       desc: "Entrega rigorosa e segura para todo o Brasil." },
      { title: "Assistência Técnica",  desc: "Rede autorizada de assistência em todo o país." },
      { title: "Garantia Alargada",    desc: "Mais tranquilidade para si e para a sua família." },
      { title: "Sustentabilidade",     desc: "Tecnologia que cuida da água e do planeta." },
    ],
    modalNone: "Nenhum produto selecionado", modalSelected: " de 4 produto", modalCompare: "Comparar", modalClose: "Fechar",
    altYes: "Sim", altNo: "Não",
    mediaExtraTitle: "Recursos exclusivos do Acquafy Media",
    mediaExtraItems: ["Tanque de água natural: 10.000ml", "2 Sensores de aproximação de copos e garrafas", "Computador Ultra Rápido com Sistemas de Gestão de Mídia", "Plataforma de Mídia Digital + Receita Recorrente"],
  },
  en: {
    filters: ["All", "Essentials", "Media", "Premium", "Countertop", "Floor Stand", "Built-in", "Sparkling Water", "Hydrogen Water"],
    badgeLabel: "Compare Products",
    h1Pre: "Compare ", h1Highlight: "Acquafy Neo",
    subtitle: "Compare the Neo Essentials & Neo Premium lines and find the ideal model for you.",
    ctaSpecialist: "Talk to a Specialist",
    pills: ["App + AI + IoT", "16 Languages", "Global Operation", "Smart Water Platform"],
    selectorPre: "Select models to compare (", selector44: "/4)",
    viewComparison: "View Comparison",
    selectedBarTitle: "Selected Products", selectedBarSub: "Add or remove products to compare",
    selectProduct: "Select a product", removeLabel: "Remove",
    tableFeatures: "Features",
    linePrefix: "Neo Line ",
    specRowLabels: ["Format", "Temperatures", "Sparkling Water", "Hydrogen Water", "Panel", "App", "AI + IoT", "Wi-Fi + Bluetooth 5.3", "UV LED", "Filtration System", "Cold Water Tank", "Inverter Compressor", "Material", "BR Price"],
    acquireLabel: "Buy", buyNow: "Buy Now →",
    emptyTable: "Select at least one product to compare.",
    essentialsChecklist: ["LED Touch Panel 10.1", "App + AI + IoT", "4 High-Performance UF Filters", "Countertop, Wall and Floor Stand Models", "Excellent value for money"],
    premiumChecklist: ["Stainless Steel", "LCD IPS Touch Panel 15.6", "Mini Media Network", "4 High-Performance RO / Reverse Osmosis Filters", "Premium and sophisticated proposition"],
    priceRangesTitle: "Price Ranges in the US Market",
    priceFrom: "from ", priceTo: " to ",
    trustItems: [
      { title: "Guaranteed Quality",  desc: "Certified products with the highest standards." },
      { title: "Secure Delivery",     desc: "Reliable and secure delivery throughout Brazil." },
      { title: "Technical Support",   desc: "Authorized service network throughout the country." },
      { title: "Extended Warranty",   desc: "More peace of mind for you and your family." },
      { title: "Sustainability",      desc: "Technology that cares for water and the planet." },
    ],
    modalNone: "No product selected", modalSelected: " of 4 product", modalCompare: "Compare", modalClose: "Close",
    altYes: "Yes", altNo: "No",
    mediaExtraTitle: "Acquafy Media Exclusive Features",
    mediaExtraItems: ["Natural water tank: 10,000ml", "2 Cup and bottle proximity sensors", "Ultra-Fast Computer with Media Management Systems", "Digital Media Platform + Recurring Revenue"],
  },
  "en-gb": {
    filters: ["All", "Essentials", "Media", "Premium", "Countertop", "Floor Stand", "Built-in", "Sparkling Water", "Hydrogen Water"],
    badgeLabel: "Compare Products",
    h1Pre: "Compare ", h1Highlight: "Acquafy Neo",
    subtitle: "Compare the Neo Essentials & Neo Premium lines and find the ideal model for you.",
    ctaSpecialist: "Talk to a Specialist",
    pills: ["App + AI + IoT", "16 Languages", "Global Operation", "Smart Water Platform"],
    selectorPre: "Select models to compare (", selector44: "/4)",
    viewComparison: "View Comparison",
    selectedBarTitle: "Selected Products", selectedBarSub: "Add or remove products to compare",
    selectProduct: "Select a product", removeLabel: "Remove",
    tableFeatures: "Features",
    linePrefix: "Neo Line ",
    specRowLabels: ["Format", "Temperatures", "Sparkling Water", "Hydrogen Water", "Panel", "App", "AI + IoT", "Wi-Fi + Bluetooth 5.3", "UV LED", "Filtration System", "Cold Water Tank", "Inverter Compressor", "Material", "BR Price"],
    acquireLabel: "Buy", buyNow: "Buy Now →",
    emptyTable: "Select at least one product to compare.",
    essentialsChecklist: ["LED Touch Panel 10.1", "App + AI + IoT", "4 High-Performance UF Filters", "Countertop, Wall and Floor Stand Models", "Excellent value for money"],
    premiumChecklist: ["Stainless Steel", "LCD IPS Touch Panel 15.6", "Mini Media Network", "4 High-Performance RO / Reverse Osmosis Filters", "Premium and sophisticated proposition"],
    priceRangesTitle: "Price Ranges in the US Market",
    priceFrom: "from ", priceTo: " to ",
    trustItems: [
      { title: "Guaranteed Quality",  desc: "Certified products with the highest standards." },
      { title: "Secure Delivery",     desc: "Reliable and secure delivery throughout Brazil." },
      { title: "Technical Support",   desc: "Authorised service network throughout the country." },
      { title: "Extended Warranty",   desc: "More peace of mind for you and your family." },
      { title: "Sustainability",      desc: "Technology that cares for water and the planet." },
    ],
    modalNone: "No product selected", modalSelected: " of 4 product", modalCompare: "Compare", modalClose: "Close",
    altYes: "Yes", altNo: "No",
    mediaExtraTitle: "Acquafy Media Exclusive Features",
    mediaExtraItems: ["Natural water tank: 10,000ml", "2 Cup and bottle proximity sensors", "Ultra-Fast Computer with Media Management Systems", "Digital Media Platform + Recurring Revenue"],
  },
  es: {
    filters: ["Todos", "Essentials", "Media", "Premium", "Encimera", "Columna", "Empotrado", "Agua con Gas", "Agua Hidrogenada"],
    badgeLabel: "Comparar Productos",
    h1Pre: "Compara los ", h1Highlight: "Acquafy Neo",
    subtitle: "Compara las líneas Neo Essentials & Neo Premium y encuentra el modelo ideal para ti.",
    ctaSpecialist: "Hablar con un Especialista",
    pills: ["App + AI + IoT", "16 Idiomas", "Operación Global", "Plataforma Inteligente de Agua"],
    selectorPre: "Selecciona modelos para comparar (", selector44: "/4)",
    viewComparison: "Ver Comparación",
    selectedBarTitle: "Productos Seleccionados", selectedBarSub: "Agrega o elimina productos para comparar",
    selectProduct: "Selecciona un producto", removeLabel: "Eliminar",
    tableFeatures: "Características",
    linePrefix: "Línea Neo ",
    specRowLabels: ["Formato", "Temperaturas", "Agua con Gas", "Agua Hidrogenada", "Panel", "App", "AI + IoT", "Wi-Fi + Bluetooth 5.3", "UV LED", "Sistema de Filtración", "Depósito de Agua Fría", "Compresor Inverter", "Material", "Precio BR"],
    acquireLabel: "Adquirir", buyNow: "Comprar Ahora →",
    emptyTable: "Selecciona al menos un producto para comparar.",
    essentialsChecklist: ["Panel LED Touch 10.1", "App + AI + IoT", "4 Filtros UF de Alto Rendimiento", "Modelos Encimera, Pared y Columna", "Excelente relación calidad-precio"],
    premiumChecklist: ["Acero inoxidable", "Panel LCD IPS Touch 15.6", "Mini Media Network", "4 Filtros RO / Ósmosis Inversa de Alto Rendimiento", "Propuesta premium y sofisticada"],
    priceRangesTitle: "Rangos de Precio en el Mercado Estadounidense",
    priceFrom: "de ", priceTo: " a ",
    trustItems: [
      { title: "Calidad Garantizada",  desc: "Productos certificados con los más altos estándares." },
      { title: "Entrega Segura",       desc: "Entrega confiable y segura a todo Brasil." },
      { title: "Asistencia Técnica",   desc: "Red autorizada de asistencia en todo el país." },
      { title: "Garantía Extendida",   desc: "Mayor tranquilidad para ti y tu familia." },
      { title: "Sostenibilidad",       desc: "Tecnología que cuida el agua y el planeta." },
    ],
    modalNone: "Ningún producto seleccionado", modalSelected: " de 4 producto", modalCompare: "Comparar", modalClose: "Cerrar",
    altYes: "Sí", altNo: "No",
    mediaExtraTitle: "Características exclusivas del Acquafy Media",
    mediaExtraItems: ["Depósito de agua natural: 10.000ml", "2 Sensores de proximidad de vasos y botellas", "Ordenador ultrarrápido con sistemas de gestión de medios", "Plataforma de medios digitales + Ingresos recurrentes"],
  },
  fr: {
    filters: ["Tous", "Essentials", "Media", "Premium", "Plan de travail", "Colonne", "Encastré", "Eau pétillante", "Eau hydrogénée"],
    badgeLabel: "Comparer les produits",
    h1Pre: "Comparez les ", h1Highlight: "Acquafy Neo",
    subtitle: "Comparez les gammes Neo Essentials & Neo Premium et trouvez le modèle idéal pour vous.",
    ctaSpecialist: "Parler à un spécialiste",
    pills: ["App + AI + IoT", "16 langues", "Opération mondiale", "Plateforme intelligente de l'eau"],
    selectorPre: "Sélectionnez les modèles à comparer (", selector44: "/4)",
    viewComparison: "Voir la comparaison",
    selectedBarTitle: "Produits sélectionnés", selectedBarSub: "Ajoutez ou supprimez des produits pour comparer",
    selectProduct: "Sélectionner un produit", removeLabel: "Supprimer",
    tableFeatures: "Caractéristiques",
    linePrefix: "Gamme Neo ",
    specRowLabels: ["Format", "Températures", "Eau pétillante", "Eau hydrogénée", "Panneau", "App", "AI + IoT", "Wi-Fi + Bluetooth 5.3", "UV LED", "Système de filtration", "Réservoir d'eau froide", "Compresseur Inverter", "Matériau", "Prix BR"],
    acquireLabel: "Acquérir", buyNow: "Acheter maintenant →",
    emptyTable: "Sélectionnez au moins un produit pour comparer.",
    essentialsChecklist: ["Panneau LED Touch 10,1", "App + AI + IoT", "4 filtres UF haute performance", "Modèles plan de travail, mural et colonne", "Excellent rapport qualité-prix"],
    premiumChecklist: ["Acier inoxydable", "Panneau LCD IPS Touch 15,6", "Mini Media Network", "4 filtres RO / Osmose inverse haute performance", "Proposition premium et sophistiquée"],
    priceRangesTitle: "Gammes de prix sur le marché américain",
    priceFrom: "de ", priceTo: " à ",
    trustItems: [
      { title: "Qualité garantie",      desc: "Produits certifiés selon les plus hauts standards." },
      { title: "Livraison sécurisée",   desc: "Livraison fiable et sécurisée dans tout le Brésil." },
      { title: "Assistance technique",  desc: "Réseau de service agréé dans tout le pays." },
      { title: "Garantie étendue",      desc: "Plus de tranquillité d'esprit pour vous et votre famille." },
      { title: "Durabilité",            desc: "Technologie qui prend soin de l'eau et de la planète." },
    ],
    modalNone: "Aucun produit sélectionné", modalSelected: " sur 4 produit", modalCompare: "Comparer", modalClose: "Fermer",
    altYes: "Oui", altNo: "Non",
    mediaExtraTitle: "Fonctionnalités exclusives de l'Acquafy Media",
    mediaExtraItems: ["Réservoir d'eau naturelle : 10 000 ml", "2 capteurs de proximité pour verres et bouteilles", "Ordinateur ultra-rapide avec systèmes de gestion des médias", "Plateforme de médias numériques + Revenus récurrents"],
  },
  de: {
    filters: ["Alle", "Essentials", "Media", "Premium", "Tischgerät", "Standgerät", "Einbaugerät", "Sprudelwasser", "Wasserstoffwasser"],
    badgeLabel: "Produkte vergleichen",
    h1Pre: "Vergleichen Sie ", h1Highlight: "Acquafy Neo",
    subtitle: "Vergleichen Sie die Neo Essentials & Neo Premium Linien und finden Sie das ideale Modell für Sie.",
    ctaSpecialist: "Mit einem Spezialisten sprechen",
    pills: ["App + AI + IoT", "16 Sprachen", "Globaler Betrieb", "Intelligente Wasserplattform"],
    selectorPre: "Modelle zum Vergleichen auswählen (", selector44: "/4)",
    viewComparison: "Vergleich anzeigen",
    selectedBarTitle: "Ausgewählte Produkte", selectedBarSub: "Produkte hinzufügen oder entfernen zum Vergleichen",
    selectProduct: "Produkt auswählen", removeLabel: "Entfernen",
    tableFeatures: "Eigenschaften",
    linePrefix: "Neo Linie ",
    specRowLabels: ["Format", "Temperaturen", "Sprudelwasser", "Wasserstoffwasser", "Bedienfeld", "App", "AI + IoT", "Wi-Fi + Bluetooth 5.3", "UV LED", "Filtersystem", "Kaltwassertank", "Inverter-Kompressor", "Material", "BR Preis"],
    acquireLabel: "Kaufen", buyNow: "Jetzt kaufen →",
    emptyTable: "Wählen Sie mindestens ein Produkt zum Vergleichen aus.",
    essentialsChecklist: ["LED Touch Panel 10,1", "App + AI + IoT", "4 Hochleistungs-UF-Filter", "Tisch-, Wand- und Standmodelle", "Ausgezeichnetes Preis-Leistungs-Verhältnis"],
    premiumChecklist: ["Edelstahl", "LCD IPS Touch Panel 15,6", "Mini Media Network", "4 Hochleistungs-RO-/Umkehrosmosefilter", "Premium und anspruchsvolle Ausstattung"],
    priceRangesTitle: "Preisspannen auf dem US-Markt",
    priceFrom: "von ", priceTo: " bis ",
    trustItems: [
      { title: "Garantierte Qualität",    desc: "Zertifizierte Produkte nach höchsten Standards." },
      { title: "Sichere Lieferung",       desc: "Zuverlässige und sichere Lieferung in ganz Brasilien." },
      { title: "Technischer Support",     desc: "Autorisiertes Servicenetz im ganzen Land." },
      { title: "Erweiterte Garantie",     desc: "Mehr Sicherheit für Sie und Ihre Familie." },
      { title: "Nachhaltigkeit",          desc: "Technologie, die Wasser und Umwelt schützt." },
    ],
    modalNone: "Kein Produkt ausgewählt", modalSelected: " von 4 Produkt", modalCompare: "Vergleichen", modalClose: "Schließen",
    altYes: "Ja", altNo: "Nein",
    mediaExtraTitle: "Exklusive Funktionen des Acquafy Media",
    mediaExtraItems: ["Natürlicher Wassertank: 10.000 ml", "2 Näherungssensoren für Tassen und Flaschen", "Ultraschneller Computer mit Medienverwaltungssystemen", "Digitale Medienplattform + Wiederkehrende Einnahmen"],
  },
  it: {
    filters: ["Tutti", "Essentials", "Media", "Premium", "Da banco", "A colonna", "Da incasso", "Acqua frizzante", "Acqua idrogenata"],
    badgeLabel: "Confronta prodotti",
    h1Pre: "Confronta i ", h1Highlight: "Acquafy Neo",
    subtitle: "Confronta le linee Neo Essentials & Neo Premium e trova il modello ideale per te.",
    ctaSpecialist: "Parla con uno specialista",
    pills: ["App + AI + IoT", "16 lingue", "Operazione globale", "Piattaforma intelligente dell'acqua"],
    selectorPre: "Seleziona i modelli da confrontare (", selector44: "/4)",
    viewComparison: "Vedi il confronto",
    selectedBarTitle: "Prodotti selezionati", selectedBarSub: "Aggiungi o rimuovi prodotti per confrontare",
    selectProduct: "Seleziona un prodotto", removeLabel: "Rimuovi",
    tableFeatures: "Caratteristiche",
    linePrefix: "Linea Neo ",
    specRowLabels: ["Formato", "Temperature", "Acqua frizzante", "Acqua idrogenata", "Pannello", "App", "AI + IoT", "Wi-Fi + Bluetooth 5.3", "UV LED", "Sistema di filtrazione", "Serbatoio acqua fredda", "Compressore Inverter", "Materiale", "Prezzo BR"],
    acquireLabel: "Acquista", buyNow: "Compra ora →",
    emptyTable: "Seleziona almeno un prodotto per confrontare.",
    essentialsChecklist: ["Pannello LED Touch 10,1", "App + AI + IoT", "4 filtri UF ad alte prestazioni", "Modelli da banco, parete e colonna", "Ottimo rapporto qualità-prezzo"],
    premiumChecklist: ["Acciaio inossidabile", "Pannello LCD IPS Touch 15,6", "Mini Media Network", "4 filtri RO / Osmosi inversa ad alte prestazioni", "Proposta premium e sofisticata"],
    priceRangesTitle: "Fasce di prezzo nel mercato americano",
    priceFrom: "da ", priceTo: " a ",
    trustItems: [
      { title: "Qualità garantita",      desc: "Prodotti certificati con i più alti standard." },
      { title: "Consegna sicura",        desc: "Consegna affidabile e sicura in tutto il Brasile." },
      { title: "Assistenza tecnica",     desc: "Rete di assistenza autorizzata in tutto il paese." },
      { title: "Garanzia estesa",        desc: "Maggiore tranquillità per te e la tua famiglia." },
      { title: "Sostenibilità",          desc: "Tecnologia che si prende cura dell'acqua e del pianeta." },
    ],
    modalNone: "Nessun prodotto selezionato", modalSelected: " di 4 prodotto", modalCompare: "Confronta", modalClose: "Chiudi",
    altYes: "Sì", altNo: "No",
    mediaExtraTitle: "Funzionalità esclusive di Acquafy Media",
    mediaExtraItems: ["Serbatoio d'acqua naturale: 10.000 ml", "2 sensori di prossimità per tazze e bottiglie", "Computer ultra-veloce con sistemi di gestione dei media", "Piattaforma media digitale + Entrate ricorrenti"],
  },
  zh: {
    filters: ["全部", "Essentials", "Media", "Premium", "台式", "立式", "嵌入式", "气泡水", "富氢水"],
    badgeLabel: "比较产品",
    h1Pre: "比较 ", h1Highlight: "Acquafy Neo",
    subtitle: "比较 Neo Essentials 和 Neo Premium 系列，找到最适合您的型号。",
    ctaSpecialist: "咨询专家",
    pills: ["App + AI + IoT", "16 种语言", "全球运营", "智能水平台"],
    selectorPre: "选择要比较的型号（", selector44: "/4）",
    viewComparison: "查看比较",
    selectedBarTitle: "已选产品", selectedBarSub: "添加或删除产品进行比较",
    selectProduct: "选择产品", removeLabel: "移除",
    tableFeatures: "特性",
    linePrefix: "Neo 系列 ",
    specRowLabels: ["外形", "温度", "气泡水", "富氢水", "面板", "App", "AI + IoT", "Wi-Fi + 蓝牙 5.3", "UV LED", "过滤系统", "冷水箱", "变频压缩机", "材质", "巴西价格"],
    acquireLabel: "购买", buyNow: "立即购买 →",
    emptyTable: "请至少选择一个产品进行比较。",
    essentialsChecklist: ["LED 触控面板 10.1", "App + AI + IoT", "4 个高性能 UF 滤芯", "台式、壁挂式和立式型号", "出色的性价比"],
    premiumChecklist: ["不锈钢", "LCD IPS 触控面板 15.6", "迷你媒体网络", "4 个高性能 RO / 反渗透滤芯", "高端精致定位"],
    priceRangesTitle: "美国市场价格区间",
    priceFrom: "从 ", priceTo: " 到 ",
    trustItems: [
      { title: "品质保证",  desc: "经认证的产品，符合最高标准。" },
      { title: "安全配送",  desc: "覆盖巴西全境的可靠安全配送。" },
      { title: "技术支持",  desc: "遍布全国的授权服务网络。" },
      { title: "延长保修",  desc: "为您和您的家人提供更多安心保障。" },
      { title: "可持续性",  desc: "关爱水资源与地球的科技。" },
    ],
    modalNone: "未选择任何产品", modalSelected: "（共4个产品，已选", modalCompare: "比较", modalClose: "关闭",
    altYes: "是", altNo: "否",
    mediaExtraTitle: "Acquafy Media 专属功能",
    mediaExtraItems: ["天然水箱：10,000ml", "2个杯瓶近感传感器", "超快计算机与媒体管理系统", "数字媒体平台 + 周期性收益"],
  },
  ja: {
    filters: ["すべて", "Essentials", "Media", "Premium", "卓上型", "スタンド型", "ビルトイン", "スパークリング", "水素水"],
    badgeLabel: "製品を比較",
    h1Pre: "比較する ", h1Highlight: "Acquafy Neo",
    subtitle: "Neo Essentials と Neo Premium ラインを比較して、あなたに最適なモデルを見つけましょう。",
    ctaSpecialist: "専門家に相談",
    pills: ["App + AI + IoT", "16 言語", "グローバル展開", "スマートウォータープラットフォーム"],
    selectorPre: "比較するモデルを選択（", selector44: "/4）",
    viewComparison: "比較を見る",
    selectedBarTitle: "選択済み製品", selectedBarSub: "製品を追加または削除して比較",
    selectProduct: "製品を選択", removeLabel: "削除",
    tableFeatures: "特徴",
    linePrefix: "Neo ライン ",
    specRowLabels: ["フォーム", "温度", "スパークリング", "水素水", "パネル", "App", "AI + IoT", "Wi-Fi + Bluetooth 5.3", "UV LED", "ろ過システム", "冷水タンク", "インバーターコンプレッサー", "素材", "BRプライス"],
    acquireLabel: "購入", buyNow: "今すぐ購入 →",
    emptyTable: "比較するには少なくとも1つの製品を選択してください。",
    essentialsChecklist: ["LED タッチパネル 10.1", "App + AI + IoT", "4基の高性能UFフィルター", "卓上・壁掛け・スタンドモデル", "優れたコストパフォーマンス"],
    premiumChecklist: ["ステンレス鋼", "LCD IPS タッチパネル 15.6", "ミニメディアネットワーク", "4基の高性能RO / 逆浸透フィルター", "プレミアムで洗練されたデザイン"],
    priceRangesTitle: "米国市場の価格帯",
    priceFrom: "から ", priceTo: " まで ",
    trustItems: [
      { title: "品質保証",      desc: "最高水準の認証済み製品。" },
      { title: "安全な配送",    desc: "ブラジル全土への信頼できる安全な配送。" },
      { title: "技術サポート",  desc: "全国の認定サービスネットワーク。" },
      { title: "延長保証",      desc: "あなたとご家族のためのさらなる安心。" },
      { title: "サステナビリティ", desc: "水と地球を大切にするテクノロジー。" },
    ],
    modalNone: "製品が選択されていません", modalSelected: "（4製品中 ", modalCompare: "比較", modalClose: "閉じる",
    altYes: "はい", altNo: "いいえ",
    mediaExtraTitle: "Acquafy Media 専用機能",
    mediaExtraItems: ["天然水タンク：10,000ml", "コップ・ボトル近接センサー×2", "メディア管理システム搭載の超高速コンピューター", "デジタルメディアプラットフォーム＋継続的収益"],
  },
  ko: {
    filters: ["전체", "Essentials", "Media", "Premium", "카운터탑", "스탠드형", "빌트인", "탄산수", "수소수"],
    badgeLabel: "제품 비교",
    h1Pre: "비교하기 ", h1Highlight: "Acquafy Neo",
    subtitle: "Neo Essentials & Neo Premium 라인을 비교하고 나에게 맞는 이상적인 모델을 찾아보세요.",
    ctaSpecialist: "전문가와 상담",
    pills: ["App + AI + IoT", "16개 언어", "글로벌 운영", "스마트 워터 플랫폼"],
    selectorPre: "비교할 모델 선택 (", selector44: "/4)",
    viewComparison: "비교 보기",
    selectedBarTitle: "선택한 제품", selectedBarSub: "비교할 제품을 추가하거나 제거하세요",
    selectProduct: "제품 선택", removeLabel: "제거",
    tableFeatures: "특성",
    linePrefix: "Neo 라인 ",
    specRowLabels: ["형태", "온도", "탄산수", "수소수", "패널", "앱", "AI + IoT", "Wi-Fi + 블루투스 5.3", "UV LED", "여과 시스템", "냉수 탱크", "인버터 컴프레서", "소재", "브라질 가격"],
    acquireLabel: "구매", buyNow: "지금 구매 →",
    emptyTable: "비교하려면 최소 하나의 제품을 선택하세요.",
    essentialsChecklist: ["LED 터치 패널 10.1", "App + AI + IoT", "4개 고성능 UF 필터", "카운터탑, 벽걸이, 스탠드형 모델", "뛰어난 가성비"],
    premiumChecklist: ["스테인리스 스틸", "LCD IPS 터치 패널 15.6", "미니 미디어 네트워크", "4개 고성능 RO / 역삼투 필터", "프리미엄하고 세련된 제안"],
    priceRangesTitle: "미국 시장 가격대",
    priceFrom: "부터 ", priceTo: " 까지 ",
    trustItems: [
      { title: "품질 보증",  desc: "최고 기준으로 인증된 제품." },
      { title: "안전한 배송", desc: "브라질 전역에 신뢰할 수 있는 안전한 배송." },
      { title: "기술 지원",  desc: "전국 공인 서비스 네트워크." },
      { title: "연장 보증",  desc: "고객님과 가족을 위한 더 큰 안심." },
      { title: "지속가능성", desc: "물과 지구를 소중히 여기는 기술." },
    ],
    modalNone: "선택된 제품 없음", modalSelected: "（4개 중 ", modalCompare: "비교", modalClose: "닫기",
    altYes: "예", altNo: "아니오",
    mediaExtraTitle: "Acquafy Media 전용 기능",
    mediaExtraItems: ["천연 물 탱크: 10,000ml", "컵 및 병 근접 센서 2개", "미디어 관리 시스템을 갖춘 초고속 컴퓨터", "디지털 미디어 플랫폼 + 반복 수익"],
  },
  sv: {
    filters: ["Alla", "Essentials", "Media", "Premium", "Bänkskiva", "Golvmodell", "Inbyggd", "Kolsyrat vatten", "Vätgasvatten"],
    badgeLabel: "Jämför produkter",
    h1Pre: "Jämför ", h1Highlight: "Acquafy Neo",
    subtitle: "Jämför Neo Essentials och Neo Premium och hitta den ideala modellen för dig.",
    ctaSpecialist: "Prata med en specialist",
    pills: ["App + AI + IoT", "16 språk", "Global drift", "Smart vattenplattform"],
    selectorPre: "Välj modeller att jämföra (", selector44: "/4)",
    viewComparison: "Se jämförelse",
    selectedBarTitle: "Valda produkter", selectedBarSub: "Lägg till eller ta bort produkter för att jämföra",
    selectProduct: "Välj en produkt", removeLabel: "Ta bort",
    tableFeatures: "Egenskaper",
    linePrefix: "Neo-linjen ",
    specRowLabels: ["Format", "Temperaturer", "Kolsyrat vatten", "Vätgasvatten", "Panel", "App", "AI + IoT", "Wi-Fi + Bluetooth 5.3", "UV LED", "Filtreringssystem", "Källvattentank", "Inverterkompressor", "Material", "BR-pris"],
    acquireLabel: "Köp", buyNow: "Köp nu →",
    emptyTable: "Välj minst en produkt för att jämföra.",
    essentialsChecklist: ["LED Touch-panel 10.1", "App + AI + IoT", "4 högpresterande UF-filter", "Bänkskiva-, vägg- och golvmodeller", "Utmärkt prisprestandaförhållande"],
    premiumChecklist: ["Rostfritt stål", "LCD IPS Touch-panel 15.6", "Mini Media Network", "4 högpresterande RO / omvänd osmosfilter", "Premium och sofistikerat erbjudande"],
    priceRangesTitle: "Prissortiment på den amerikanska marknaden",
    priceFrom: "från ", priceTo: " till ",
    trustItems: [
      { title: "Garanterad kvalitet",  desc: "Certifierade produkter med högsta standarder." },
      { title: "Säker leverans",       desc: "Pålitlig och säker leverans över hela Brasilien." },
      { title: "Teknisk support",      desc: "Auktoriserat servicenätverk över hela landet." },
      { title: "Förlängd garanti",     desc: "Mer trygghet för dig och din familj." },
      { title: "Hållbarhet",           desc: "Teknik som tar hand om vatten och planeten." },
    ],
    modalNone: "Ingen produkt vald", modalSelected: " av 4 produkt", modalCompare: "Jämför", modalClose: "Stäng",
    altYes: "Ja", altNo: "Nej",
    mediaExtraTitle: "Exklusiva funktioner i Acquafy Media",
    mediaExtraItems: ["Naturlig vattentank: 10 000 ml", "2 närsensorer för muggar och flaskor", "Ultrasnabb dator med mediehanteringssystem", "Digital medieplattform + Återkommande intäkter"],
  },
  fi: {
    filters: ["Kaikki", "Essentials", "Media", "Premium", "Työtaso", "Lattiamallit", "Upotettu", "Hiilihapotettu vesi", "Vetypitoinen vesi"],
    badgeLabel: "Vertaile tuotteita",
    h1Pre: "Vertaile ", h1Highlight: "Acquafy Neo",
    subtitle: "Vertaile Neo Essentials- ja Neo Premium -sarjoja ja löydä sinulle sopiva malli.",
    ctaSpecialist: "Puhu asiantuntijan kanssa",
    pills: ["App + AI + IoT", "16 kieltä", "Globaali toiminta", "Äly vesialusta"],
    selectorPre: "Valitse vertailtavat mallit (", selector44: "/4)",
    viewComparison: "Näytä vertailu",
    selectedBarTitle: "Valitut tuotteet", selectedBarSub: "Lisää tai poista tuotteita vertailua varten",
    selectProduct: "Valitse tuote", removeLabel: "Poista",
    tableFeatures: "Ominaisuudet",
    linePrefix: "Neo-sarja ",
    specRowLabels: ["Muoto", "Lämpötilat", "Hiilihapotettu vesi", "Vetypitoinen vesi", "Paneeli", "App", "AI + IoT", "Wi-Fi + Bluetooth 5.3", "UV LED", "Suodatusjärjestelmä", "Kylmävesisäiliö", "Invertteri-kompressori", "Materiaali", "BR-hinta"],
    acquireLabel: "Osta", buyNow: "Osta nyt →",
    emptyTable: "Valitse vähintään yksi tuote vertailua varten.",
    essentialsChecklist: ["LED Touch -paneeli 10.1", "App + AI + IoT", "4 suorituskykyistä UF-suodatinta", "Tasomalli-, seinä- ja lattiamallit", "Erinomainen hinta-laatu-suhde"],
    premiumChecklist: ["Ruostumaton teräs", "LCD IPS Touch -paneeli 15.6", "Mini Media Network", "4 suorituskykyistä RO / käänteisosmoossisuodatinta", "Premium ja hienostunut ehdotus"],
    priceRangesTitle: "Hintahaarukat Yhdysvaltain markkinoilla",
    priceFrom: "alkaen ", priceTo: " asti ",
    trustItems: [
      { title: "Taattu laatu",         desc: "Sertifioidut tuotteet korkeimpien standardien mukaisesti." },
      { title: "Turvallinen toimitus", desc: "Luotettava ja turvallinen toimitus koko Brasiliaan." },
      { title: "Tekninen tuki",        desc: "Valtuutettu huoltoverkosto kautta maan." },
      { title: "Laajennettu takuu",    desc: "Enemmän mielenrauhaa sinulle ja perheellesi." },
      { title: "Kestävyys",            desc: "Teknologia, joka huolehtii vedestä ja planeetasta." },
    ],
    modalNone: "Ei valittua tuotetta", modalSelected: " / 4 tuote", modalCompare: "Vertaile", modalClose: "Sulje",
    altYes: "Kyllä", altNo: "Ei",
    mediaExtraTitle: "Acquafy Median eksklusiiviset ominaisuudet",
    mediaExtraItems: ["Luonnonvesisäiliö: 10 000 ml", "2 lähestymisanturia kuppeille ja pulloille", "Ultranopea tietokone medianhallintajärjestelmillä", "Digitaalinen mediaalusta + Toistuva tulo"],
  },
  ru: {
    filters: ["Все", "Essentials", "Media", "Premium", "Настольный", "Напольный", "Встраиваемый", "Газированная вода", "Водородная вода"],
    badgeLabel: "Сравнить продукты",
    h1Pre: "Сравните ", h1Highlight: "Acquafy Neo",
    subtitle: "Сравните линейки Neo Essentials и Neo Premium и найдите идеальную модель для вас.",
    ctaSpecialist: "Поговорить со специалистом",
    pills: ["App + AI + IoT", "16 языков", "Глобальная работа", "Умная водная платформа"],
    selectorPre: "Выберите модели для сравнения (", selector44: "/4)",
    viewComparison: "Посмотреть сравнение",
    selectedBarTitle: "Выбранные продукты", selectedBarSub: "Добавьте или удалите продукты для сравнения",
    selectProduct: "Выберите продукт", removeLabel: "Удалить",
    tableFeatures: "Характеристики",
    linePrefix: "Линейка Neo ",
    specRowLabels: ["Формат", "Температуры", "Газированная вода", "Водородная вода", "Панель", "App", "AI + IoT", "Wi-Fi + Bluetooth 5.3", "UV LED", "Система фильтрации", "Бак холодной воды", "Инверторный компрессор", "Материал", "Цена BR"],
    acquireLabel: "Купить", buyNow: "Купить сейчас →",
    emptyTable: "Выберите хотя бы один продукт для сравнения.",
    essentialsChecklist: ["Сенсорная панель LED Touch 10.1", "App + AI + IoT", "4 высокопроизводительных UF-фильтра", "Настольные, настенные и напольные модели", "Отличное соотношение цены и качества"],
    premiumChecklist: ["Нержавеющая сталь", "Сенсорная панель LCD IPS Touch 15.6", "Mini Media Network", "4 высокопроизводительных RO / фильтра обратного осмоса", "Премиальное и изысканное предложение"],
    priceRangesTitle: "Диапазоны цен на американском рынке",
    priceFrom: "от ", priceTo: " до ",
    trustItems: [
      { title: "Гарантированное качество",  desc: "Сертифицированная продукция по высшим стандартам." },
      { title: "Безопасная доставка",       desc: "Надёжная и безопасная доставка по всей Бразилии." },
      { title: "Техническая поддержка",   desc: "Авторизованная сервисная сеть по всей стране." },
      { title: "Расширенная гарантия",   desc: "Больше спокойствия для вас и вашей семьи." },
      { title: "Устойчивое развитие",          desc: "Технологии, которые заботятся о воде и планете." },
    ],
    modalNone: "Нет выбранных продуктов", modalSelected: " из 4 продукт", modalCompare: "Сравнить", modalClose: "Закрыть",
    altYes: "Да", altNo: "Нет",
    mediaExtraTitle: "Эксклюзивные возможности Acquafy Media",
    mediaExtraItems: ["Бак природной воды: 10 000 мл", "2 датчика приближения стаканов и бутылок", "Сверхбыстрый компьютер с системами управления медиа", "Платформа цифровых медиа + Регулярный доход"],
  },
  ro: {
    filters: ["Toate", "Essentials", "Media", "Premium", "Blat", "Coloana", "Incorporat", "Apa carbogazoasa", "Apa cu hidrogen"],
    badgeLabel: "Compara produse",
    h1Pre: "Compara ", h1Highlight: "Acquafy Neo",
    subtitle: "Compara liniile Neo Essentials si Neo Premium si gaseste modelul ideal pentru tine.",
    ctaSpecialist: "Vorbeste cu un specialist",
    pills: ["App + AI + IoT", "16 limbi", "Operare globala", "Platforma inteligenta de apa"],
    selectorPre: "Selecteaza modelele de comparat (", selector44: "/4)",
    viewComparison: "Vezi comparatia",
    selectedBarTitle: "Produse selectate", selectedBarSub: "Adauga sau elimina produse pentru a compara",
    selectProduct: "Selecteaza un produs", removeLabel: "Elimina",
    tableFeatures: "Caracteristici",
    linePrefix: "Linia Neo ",
    specRowLabels: ["Format", "Temperaturi", "Apa carbogazoasa", "Apa cu hidrogen", "Panou", "App", "AI + IoT", "Wi-Fi + Bluetooth 5.3", "UV LED", "Sistem de filtrare", "Rezervor de apa rece", "Compresor Inverter", "Material", "Pret BR"],
    acquireLabel: "Cumpara", buyNow: "Cumpara acum →",
    emptyTable: "Selecteaza cel putin un produs pentru a compara.",
    essentialsChecklist: ["Panou LED Touch 10.1", "App + AI + IoT", "4 filtre UF de inalta performanta", "Modele de blat, perete si coloana", "Excelent raport calitate-pret"],
    premiumChecklist: ["Otel inoxidabil", "Panou LCD IPS Touch 15.6", "Mini Media Network", "4 filtre RO / Osmoza inversa de inalta performanta", "Propunere premium si sofisticata"],
    priceRangesTitle: "Intervale de pret pe piata americana",
    priceFrom: "de la ", priceTo: " pana la ",
    trustItems: [
      { title: "Calitate garantata",    desc: "Produse certificate cu cele mai inalte standarde." },
      { title: "Livrare sigura",        desc: "Livrare fiabila si sigura in toata Brazilia." },
      { title: "Asistenta tehnica",     desc: "Retea de service autorizata in toata tara." },
      { title: "Garantie extinsa",      desc: "Mai multa liniste pentru tine si familia ta." },
      { title: "Durabilitate",          desc: "Tehnologie care are grija de apa si planeta." },
    ],
    modalNone: "Niciun produs selectat", modalSelected: " din 4 produs", modalCompare: "Compara", modalClose: "Inchide",
    altYes: "Da", altNo: "Nu",
    mediaExtraTitle: "Funcționalități exclusive ale Acquafy Media",
    mediaExtraItems: ["Rezervor de apă naturală: 10.000 ml", "2 senzori de proximitate pentru cești și sticle", "Calculator ultra-rapid cu sisteme de management media", "Platformă media digitală + Venit recurent"],
  },
  he: {
    filters: ["הכל", "Essentials", "Media", "Premium", "שיפועי", "עמדתי", "מובנה", "מים מוגזים", "מים מועשרי במימן"],
    badgeLabel: "השוואת מוצרים",
    h1Pre: "השוואת ", h1Highlight: "Acquafy Neo",
    subtitle: "השווו את סדרות Neo Essentials ו-Neo Premium ומצא את הדגם האידיאלי עבורך.",
    ctaSpecialist: "דבר עם מומחה",
    pills: ["App + AI + IoT", "16 שפות", "פעילות גלובלית", "פלטפורמת מים חכמה"],
    selectorPre: "בחר דגמים להשוואה (", selector44: "/4)",
    viewComparison: "צפה בהשוואה",
    selectedBarTitle: "מוצרים שנבחרו", selectedBarSub: "הוסף או הסר מוצרים להשוואה",
    selectProduct: "בחר מוצר", removeLabel: "הסר",
    tableFeatures: "תכונות",
    linePrefix: "סדרת Neo ",
    specRowLabels: ["פורמט", "טמפרטורות", "מים מוגזים", "מים מועשרי במימן", "לוח", "App", "AI + IoT", "Wi-Fi + Bluetooth 5.3", "UV LED", "מערכת סננון", "מיכל מים קרים", "קומפרסור אינוורטר", "חומר", "מחיר BR"],
    acquireLabel: "קנה", buyNow: "קנה עכשיו →",
    emptyTable: "בחר לפחות מוצר אחד להשוואה.",
    essentialsChecklist: ["לוח LED Touch 10.1", "App + AI + IoT", "4 מסנני UF בעלי ביצועים גבוהים", "דגמי שיפועי, קיר ועמדתי", "יחס מחיר-איכותממוצלן מצוין"],
    premiumChecklist: ["פלדה אלחלדית", "לוח LCD IPS Touch 15.6", "Mini Media Network", "4 מסנני RO / אוסמוזה הפוכה בעלי ביצועים גבוהים", "הצעה פרמיום ומשוכללת"],
    priceRangesTitle: "טווחי מחירים בשוק האמריקאי",
    priceFrom: "מי ", priceTo: " עד ",
    trustItems: [
      { title: "איכותמובטחת",  desc: "מוצרים מוסמכים עם התקנים הגבוהים ביותר." },
      { title: "משלוח בטוח",       desc: "משלוח אמין ובטוח לכל אזורי ברזיל." },
      { title: "תמיכה טכנית",   desc: "רשת שירות מורשית בכל המדינה." },
      { title: "אחריות מורחבת",   desc: "שקט נפשי רב יותר עבורך ולמשפחתך." },
      { title: "קיימות",          desc: "טכנולוגיה שדואגת למים ולכדור הארץ." },
    ],
    modalNone: "אין מוצר שנבחר", modalSelected: " מתוך 4 מוצרים", modalCompare: "השווה", modalClose: "סגור",
    altYes: "כן", altNo: "לא",
    mediaExtraTitle: "תכונות בלעדיות של Acquafy Media",
    mediaExtraItems: ["מיכל מים טבעי: 10,000 מ\"ל", "2 חיישני קרבה לכוסות ובקבוקים", "מחשב מהיר במיוחד עם מערכות ניהול מדיה", "פלטפורמת מדיה דיגיטלית + הכנסה חוזרת"],
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProductName({ parts }: { parts: Product["nameParts"] }) {
  return (
    <>
      {parts.map((p, i) =>
        p.text === "2" && i > 0 ? (
          <span key={i} className="text-[0.65em] align-sub">{p.text}</span>
        ) : p.highlight ? (
          <span key={i} className="text-[#0569ff]">{p.text}</span>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </>
  );
}

function FeaturePill({ icon, label, aspectW, aspectH }: { icon: string; label: string; aspectW?: number; aspectH?: number }) {
  return (
    <div className="flex flex-1 gap-[20px] items-center min-w-[220px]">
      <div className="bg-white border-[0.5px] border-[#cbd0d4] flex items-center justify-center p-[16px] rounded-full shrink-0 size-[60px]">
        <FigmaIcon src={icon} size={28} aspectW={aspectW} aspectH={aspectH} />
      </div>
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] flex-1 min-w-0">
        {label}
      </p>
    </div>
  );
}

function BoolCell({ value, altYes = "Sim", altNo = "Não" }: { value: boolean; altYes?: string; altNo?: string }) {
  return (
    <FigmaIcon src={value ? imgCheckin : imgNegative} size={24} alt={value ? altYes : altNo} />
  );
}

function CheckListItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex gap-[10px] items-center w-full">
      <FigmaIcon src={icon} size={16} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b] flex-1 min-w-0">
        {text}
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CompareProductos() {
  const { lang } = useLang();
  const t = T[lang];
  const specRows = t.specRowLabels.map((label, i) => ({ ...SPEC_ROWS[i], label }));

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [showSelectorModal, setShowSelectorModal] = useState(false);

  const { addToCart: addToCartCtx } = useCart();
  function addToCart(product: Product) {
    addToCartCtx(product.id, product.label);
  }

  const selectedBarRef = useRef<HTMLElement>(null);

  function scrollTo(ref: React.RefObject<HTMLElement | null>) {
    if (!ref.current) return;
    const top = ref.current.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }

  // Drag-to-scroll refs for product grid (banner)
  const productScrollRef = useRef<HTMLDivElement>(null);
  const dragActive = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const dragMoved = useRef(false);

  // Drag-to-scroll refs for product grid (modal)
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const modalDragActive = useRef(false);
  const modalDragStartX = useRef(0);
  const modalDragScrollLeft = useRef(0);
  const modalDragMoved = useRef(false);

  // Drag-to-scroll refs for comparison table
  const tableScrollRef = useRef<HTMLDivElement>(null);
  const tableDragActive = useRef(false);
  const tableDragStartX = useRef(0);
  const tableDragScrollLeft = useRef(0);
  const tableDragMoved = useRef(false);

  function onScrollMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    dragActive.current = true;
    dragMoved.current = false;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = productScrollRef.current?.scrollLeft ?? 0;
  }
  function onModalScrollMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    modalDragActive.current = true;
    modalDragMoved.current = false;
    modalDragStartX.current = e.clientX;
    modalDragScrollLeft.current = modalScrollRef.current?.scrollLeft ?? 0;
  }
  function onTableMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    tableDragActive.current = true;
    tableDragMoved.current = false;
    tableDragStartX.current = e.clientX;
    tableDragScrollLeft.current = tableScrollRef.current?.scrollLeft ?? 0;
  }

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (dragActive.current) {
        const dx = e.clientX - dragStartX.current;
        if (Math.abs(dx) > 4) dragMoved.current = true;
        if (dragMoved.current && productScrollRef.current)
          productScrollRef.current.scrollLeft = dragScrollLeft.current - dx;
      }
      if (modalDragActive.current) {
        const dx = e.clientX - modalDragStartX.current;
        if (Math.abs(dx) > 4) modalDragMoved.current = true;
        if (modalDragMoved.current && modalScrollRef.current)
          modalScrollRef.current.scrollLeft = modalDragScrollLeft.current - dx;
      }
      if (tableDragActive.current) {
        const dx = e.clientX - tableDragStartX.current;
        if (Math.abs(dx) > 4) tableDragMoved.current = true;
        if (tableDragMoved.current && tableScrollRef.current)
          tableScrollRef.current.scrollLeft = tableDragScrollLeft.current - dx;
      }
    }
    function onMouseUp() {
      dragActive.current = false;
      modalDragActive.current = false;
      tableDragActive.current = false;
      tableDragMoved.current = false;
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  function toggleProductInModal(id: string) {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(s => s !== id));
    } else if (selectedIds.length < 4) {
      setSelectedIds(prev => [...prev, id]);
    }
  }

  const filteredProducts = useMemo(() => {
    switch (activeFilter) {
      case "Media":      return PRODUCTS.filter(p => p.id === "acquafy-media");
      case "Essentials": return PRODUCTS.filter(p => p.linha === "Essentials");
      case "Premium":    return PRODUCTS.filter(p => p.linha === "Premium" && p.id !== "acquafy-media");
      case "Água com Gás":       return PRODUCTS.filter(p => p.specs.gas);
      case "Água Hidrogenada":   return PRODUCTS.filter(p => p.specs.h2);
      case "Todos": return PRODUCTS;
      default: return PRODUCTS.filter(p => p.categories.includes(activeFilter));
    }
  }, [activeFilter]);

  const selectedProducts = useMemo(
    () => PRODUCTS.filter(p => selectedIds.includes(p.id)),
    [selectedIds]
  );

  function toggleProduct(id: string) {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(s => s !== id));
    } else if (selectedIds.length < 4) {
      setSelectedIds(prev => [...prev, id]);
    }
  }

  function removeProduct(id: string) {
    const barTop = selectedBarRef.current?.getBoundingClientRect().top ?? 0;
    setSelectedIds(prev => prev.filter(s => s !== id));
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const newBarTop = selectedBarRef.current?.getBoundingClientRect().top ?? 0;
      window.scrollBy(0, newBarTop - barTop);
    }));
  }

  return (
    <>
      {/* ── 1. BANNER PRINCIPAL ── */}
      <section className="relative flex flex-col items-center justify-center px-[20px] py-[40px] overflow-hidden bg-[#f1f5fe] 1300:bg-transparent 1300:h-[calc(100vh-80px)]">
        <img
          alt=""
          className="hidden 1300:block absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={imgBannerBg}
        />
        <div className="relative flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">
          {/* Hero content */}
          <div className="flex flex-col 1024:flex-row gap-[40px] items-center w-full">
            <div className="flex flex-col gap-[20px] items-center 1024:items-start justify-center flex-1 min-w-[280px] 1024:max-w-[470px] 1300:max-w-[600px]">
              {/* Label */}
              <div className="bg-white border border-[#0233c3] flex gap-[10px] items-center px-[12px] py-[8px] rounded-full">
                <FigmaIcon src={imgPlanetWeb} size={16} />
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
                  {t.badgeLabel}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#333] text-center 1024:text-left">
                {t.h1Pre}
                <span
                  className="bg-clip-text"
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundImage: "linear-gradient(to bottom, #0233c3, #9f3df5)",
                  }}
                >
                  {t.h1Highlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] text-center 1024:text-left">
                {t.subtitle}
              </p>

              {/* CTA buttons */}
              <div className="flex gap-[20px] items-center justify-center 1024:justify-start w-full">
                <a href="/contact" className="bg-white border border-[#0233c3] flex gap-[10px] items-center justify-center min-h-[50px] px-[20px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#f0f4ff] transition-colors no-underline">
                  <span className="font-['Articulat_CF:Bold'] text-[16px] leading-normal text-[#0233c3]">
                    {t.ctaSpecialist}
                  </span>
                  <FigmaIcon src={imgArrowBlue} size={10} aspectW={30} aspectH={18} />
                </a>
              </div>

            </div>

            {/* Imagem de produto — 1024px até 1299px */}
            <div className="hidden 1024:block 1300:hidden flex-[1_0_0] min-w-[280px] relative rounded-[16px] overflow-hidden shrink-0 aspect-[780/520]">
              <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgBannerProducts} />
            </div>
            {/* Spacer vazio — TELA TOTAL (≥1300px) */}
            <div className="hidden 1300:block flex-1 min-w-[280px]" />
          </div>

          {/* Feature pills — fora do hero row, todos os breakpoints ≥1024px */}
          <div className="flex flex-wrap gap-[20px] items-center justify-between w-full">
            <FeaturePill icon={imgMobile} label={t.pills[0]} aspectW={211} aspectH={295} />
            <FeaturePill icon={imgLanguage} label={t.pills[1]} />
            <FeaturePill icon={imgPlanetGlobal} label={t.pills[2]} />
            <FeaturePill icon={imgWaterVector} label={t.pills[3]} aspectW={307} aspectH={295} />
          </div>

          {/* Product selector card */}
          <div className="bg-white flex flex-col gap-[20px] items-start max-w-[1400px] p-[20px] rounded-[16px] w-full shadow-sm">
            {/* Selector header */}
            <div className="flex flex-col 1024:flex-row gap-[10px] items-center w-full">
              <div className="flex gap-[10px] items-center shrink-0 w-full justify-center 1024:w-auto 1024:justify-start">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] whitespace-nowrap">
                  {t.selectorPre}{selectedIds.length}{t.selector44}
                </p>
                <FigmaIcon src={imgBuyCursor} size={30} />
              </div>
              {/* Filter pills */}
              <div className="flex flex-wrap gap-[10px] items-center justify-center 1024:justify-end flex-1 min-w-0">
                {FILTERS_PT.filter(f => f !== "Todos").map((filter, fi) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(activeFilter === filter ? "Todos" : filter)}
                    className={`border flex items-center justify-center px-[10px] py-[8px] rounded-full transition-colors text-[14px] font-['Avenir_LT_Pro:85_Heavy'] whitespace-nowrap shrink-0 ${
                      activeFilter === filter
                        ? "bg-[#0233c3] border-[#0233c3] text-white"
                        : "bg-white border-[#f6f9fe] text-[#c8cfd8] hover:border-[#cbd0d4] hover:text-[#333]"
                    }`}
                  >
                    {t.filters[fi + 1]}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Mobile (<1300px): flex-wrap grid ── */}
            <div className="flex flex-wrap gap-[10px] w-full 1024:hidden">
              {filteredProducts.filter(p => selectedIds.length < 4 || selectedIds.includes(p.id)).map(product => {
                const isSelected = selectedIds.includes(product.id);
                const isFull = selectedIds.length >= 4 && !isSelected;
                return (
                  <button
                    key={product.id}
                    onClick={() => { if (!isFull) toggleProduct(product.id); }}
                    className={`flex-[1_0_0] flex flex-col gap-[20px] items-center justify-center min-h-[175px] min-w-[120px] overflow-hidden p-[10px] rounded-[12px] transition-all border-2 ${
                      isSelected
                        ? "bg-[#e8f0ff] border-[#0233c3] cursor-pointer hover:bg-[#dce8ff]"
                        : isFull
                        ? "bg-[#f6f9fe] border-transparent opacity-40 cursor-not-allowed"
                        : "bg-[#f6f9fe] border-transparent cursor-pointer hover:bg-[#e8f0ff]"
                    }`}
                  >
                    <div className="size-[80px] flex items-center justify-center shrink-0">
                      <img alt={product.label} className="max-w-full max-h-full object-contain pointer-events-none" src={productImages[product.id]} />
                    </div>
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91] text-center break-words w-full min-h-[34px]">
                      <ProductName parts={product.nameParts} />
                    </p>
                  </button>
                );
              })}
              {selectedIds.length >= 4 && (
                <div className="w-full flex items-center justify-center pt-[10px]">
                  <button
                    onClick={() => scrollTo(selectedBarRef)}
                    className="bg-[#0233c3] flex gap-[10px] items-center justify-center px-[20px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#002ba8] transition-colors"
                  >
                    <span className="font-['Articulat_CF:Bold'] text-[15px] leading-normal text-white whitespace-nowrap">{t.viewComparison}</span>
                    <FigmaIcon src={imgArrowWhite} size={10} aspectW={30} aspectH={18} />
                  </button>
                </div>
              )}
            </div>

            {/* ── Desktop (≥1300px): pinned selected + scrollable unselected ── */}
            <div className="hidden 1024:flex items-center w-full overflow-hidden">

              {/* Selected products: pinned left */}
              {selectedIds.length > 0 && (
                <div className="flex gap-[10px] items-center shrink-0">
                  {selectedIds.map(id => {
                    const product = PRODUCTS.find(p => p.id === id);
                    if (!product) return null;
                    return (
                      <button
                        key={product.id}
                        onClick={() => toggleProduct(product.id)}
                        title="Clique para remover"
                        className="flex flex-col gap-[20px] items-center justify-center h-[175px] overflow-hidden p-[10px] rounded-[12px] shrink-0 w-[160px] transition-all cursor-pointer bg-[#e8f0ff] border-2 border-[#0233c3] hover:bg-[#dce8ff]"
                      >
                        <div className="size-[80px] flex items-center justify-center shrink-0">
                          <img alt={product.label} className="max-w-full max-h-full object-contain pointer-events-none" src={productImages[product.id]} />
                        </div>
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91] text-center break-words w-full min-h-[34px]">
                          <ProductName parts={product.nameParts} />
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Divider */}
              {selectedIds.length > 0 && selectedIds.length < 4 && (
                <div className="h-[140px] w-px bg-[#cbd0d4] shrink-0 mx-[14px]" />
              )}

              {/* Unselected products: scrollable */}
              <div
                ref={productScrollRef}
                onMouseDown={onScrollMouseDown}
                className="flex gap-[10px] items-center overflow-x-auto flex-1 min-w-0 select-none cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [&_img]:pointer-events-none"
                style={{ scrollbarWidth: "none" }}
              >
                {selectedIds.length >= 4 ? (
                  <div className="flex-1 flex items-center justify-center px-[20px]">
                    <button
                      onClick={() => scrollTo(selectedBarRef)}
                      className="bg-[#0233c3] flex gap-[10px] items-center justify-center px-[20px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#002ba8] transition-colors shrink-0"
                    >
                      <span className="font-['Articulat_CF:Bold'] text-[15px] leading-normal text-white whitespace-nowrap">
                        Ver comparação
                      </span>
                      <FigmaIcon src={imgArrowWhite} size={10} aspectW={30} aspectH={18} />
                    </button>
                  </div>
                ) : (
                  filteredProducts
                    .filter(p => !selectedIds.includes(p.id))
                    .map(product => (
                      <button
                        key={product.id}
                        onClick={() => { if (!dragMoved.current) toggleProduct(product.id); }}
                        className="flex flex-col gap-[20px] items-center justify-center h-[175px] overflow-hidden p-[10px] rounded-[12px] shrink-0 w-[160px] transition-all cursor-pointer bg-[#f6f9fe] hover:bg-[#e8f0ff] border-2 border-transparent"
                      >
                        <div className="size-[80px] flex items-center justify-center shrink-0">
                          <img alt={product.label} className="max-w-full max-h-full object-contain" src={productImages[product.id]} />
                        </div>
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91] text-center break-words w-full min-h-[34px]">
                          <ProductName parts={product.nameParts} />
                        </p>
                      </button>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SELECTED PRODUCTS BAR ── */}
      <section ref={selectedBarRef} className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
        <div className="bg-[#f6f9fe] flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden p-[20px] rounded-[16px] w-full">
          {/* Info */}
          <div className="flex flex-col gap-[10px] items-center min-[1024px]:items-start flex-1 min-w-[240px] max-w-[340px]">
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center min-[1024px]:text-left">
              {t.selectedBarTitle} ({selectedProducts.length}/4)
            </p>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] text-center min-[1024px]:text-left">
              {t.selectedBarSub}
            </p>
          </div>

          {/* Selected product chips */}
          <div className="flex flex-wrap gap-[10px] items-stretch flex-1 min-w-[240px]">
            {selectedProducts.map(product => (
              <div
                key={product.id}
                className="bg-white flex flex-col min-[1024px]:flex-row flex-1 gap-[10px] min-[1024px]:h-[100px] items-center min-w-[140px] min-[1024px]:min-w-[200px] max-w-[280px] overflow-hidden p-[10px] pt-[30px] min-[1024px]:pt-[10px] relative rounded-[12px]"
              >
                <div className="size-[80px] shrink-0 flex items-center justify-center">
                  <img
                    alt={product.label}
                    className="max-w-full max-h-full object-contain"
                    src={productImages[product.id]}
                  />
                </div>
                <div className="flex flex-col gap-[10px] items-center min-[1024px]:items-start flex-1 min-w-0 pb-[10px] min-[1024px]:pb-0 min-[1024px]:pt-[20px]">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91] text-center min-[1024px]:text-left min-h-[34px]">
                    <ProductName parts={product.nameParts} />
                  </p>
                </div>
                {/* Remove button */}
                <button
                  onClick={() => removeProduct(product.id)}
                  className="absolute top-[10px] right-[10px] bg-[#f2f6fd] flex items-center justify-center p-[5px] rounded-full size-[26px] cursor-pointer hover:bg-[#e8f0ff] transition-colors"
                >
                  <FigmaIcon src={imgNegativeX} size={16} alt="Remover" />
                </button>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: Math.max(0, 4 - selectedProducts.length) }).map((_, i) => (
              <button
                key={`empty-${i}`}
                onClick={() => setShowSelectorModal(true)}
                className="flex flex-col min-[1024px]:flex-row flex-1 gap-[10px] min-[1024px]:h-[100px] items-center min-w-[140px] min-[1024px]:min-w-[200px] max-w-[280px] overflow-hidden p-[10px] py-[20px] min-[1024px]:py-[10px] rounded-[12px] border-2 border-dashed border-[#cbd0d4] cursor-pointer hover:border-[#0233c3] hover:bg-[#f0f5ff] transition-all group"
              >
                <div className="size-[80px] shrink-0 flex items-center justify-center">
                  <span className="text-[#cbd0d4] text-[32px] font-light group-hover:text-[#0233c3] transition-colors">+</span>
                </div>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[15px] text-[#c8cfd8] group-hover:text-[#0233c3] transition-colors">
                  {t.selectProduct}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. COMPARISON TABLE ── */}
      <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
        {selectedProducts.length === 0 ? (
          <div className="max-w-[1400px] w-full text-center py-[60px]">
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#8a8f97]">
              {t.emptyTable}
            </p>
          </div>
        ) : (
          <div
            ref={tableScrollRef}
            onMouseDown={onTableMouseDown}
            className="bg-white border border-[#cbd0d4] max-w-[1400px] overflow-x-auto rounded-[16px] w-full [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none [&_img]:pointer-events-none"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Inner wrapper ensures all rows have identical total width */}
            <div style={{ minWidth: `${200 + selectedProducts.length * 260}px` }}>

              {/* ── Header row ── */}
              <div className="flex border-b border-[#cbd0d4]">
                <div className="sticky left-0 z-10 bg-white flex items-center w-[200px] shrink-0 px-[20px] py-[12px] border-r border-[#cbd0d4]">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b]">
                    {t.tableFeatures}
                  </p>
                </div>
                {selectedProducts.map(product => (
                  <div key={product.id} className="flex flex-row gap-[10px] items-center flex-1 min-w-[260px] px-[16px] py-[12px] border-r border-[#cbd0d4] last:border-r-0">
                    <div className="size-[60px] shrink-0 flex items-center justify-center">
                      <img alt={product.label} className="max-w-full max-h-full object-contain" src={productImages[product.id]} />
                    </div>
                    <div className="flex flex-col gap-[6px] items-start flex-1 min-w-0">
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] leading-[16px] text-[#2a2a2b]">
                        <ProductName parts={product.nameParts} />
                      </p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[11px] leading-[13px] text-[#8a8f97]">
                        {t.linePrefix}{product.linha}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Spec rows ── */}
              {specRows.map(row => (
                <div key={row.key} className="flex border-b border-[#cbd0d4] last:border-b-0">
                  <div className="sticky left-0 z-10 bg-white flex items-center w-[200px] shrink-0 px-[20px] py-[12px] border-r border-[#cbd0d4]">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] leading-[16px] text-[#2a2a2b]">
                      {row.label}
                    </p>
                  </div>
                  {selectedProducts.map(product => {
                    const val = product.specs[row.key];
                    return (
                      <div key={product.id} className="flex items-center justify-center flex-1 min-w-[260px] px-[16px] py-[12px] border-r border-[#cbd0d4] last:border-r-0">
                        {row.type === "bool" ? (
                          <BoolCell value={val as boolean} altYes={t.altYes} altNo={t.altNo} />
                        ) : row.type === "price" ? (
                          <p className="font-['Avenir_LT_Pro:95_Black'] text-[16px] leading-[20px] text-[#0233c3] text-center">
                            {PRODUCT_PRICES_BRL[product.id] > 0
                            ? formatPrice(PRODUCT_PRICES_BRL[product.id], lang)
                            : "—"}
                          </p>
                        ) : val === "—" ? (
                          <BoolCell value={false} altYes={t.altYes} altNo={t.altNo} />
                        ) : (
                          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[15px] text-[#2a2a2b] text-center">
                            {translateSpec(val as string, lang)}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* ── Buy row ── */}
              <div className="flex" style={{ background: "linear-gradient(90deg, #f0f4ff 0%, #f8f4ff 100%)" }}>
                <div className="sticky left-0 z-10 flex items-center w-[200px] shrink-0 px-[20px] py-[16px] border-r border-[#cbd0d4]" style={{ background: "linear-gradient(90deg, #f0f4ff, #f0f4ff)" }}>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#555]">{t.acquireLabel}</p>
                </div>
                {selectedProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-center flex-1 min-w-[260px] px-[16px] py-[16px] border-r border-[#cbd0d4] last:border-r-0">
                    <a
                      href={`/buy/checkin-${PRODUCT_TO_FAMILY[product.id] ?? product.id}`}
                      className="flex items-center gap-[8px] px-[22px] py-[10px] rounded-full font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-white transition-opacity hover:opacity-85 whitespace-nowrap cursor-pointer"
                      style={{ background: product.linha === "Premium" ? "linear-gradient(135deg, #9f3df5, #0233c3)" : "linear-gradient(135deg, #0233c3, #0569ff)" }}>
                      {t.buyNow}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── Acquafy Media: extra features ── */}
      {selectedIds.includes("acquafy-media") && (
        <section className="bg-[#f8f4ff] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
          <div className="flex flex-col gap-[24px] items-center max-w-[1400px] w-full">
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center">
              {t.mediaExtraTitle}
            </p>
            <div className="flex flex-wrap gap-[20px] items-stretch w-full">
              {t.mediaExtraItems.map((item, i) => (
                <div key={i} className="flex gap-[20px] items-center h-[80px] p-[20px] rounded-[16px] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] flex-1 min-w-[240px]" style={{ background: "linear-gradient(to right, white, rgba(255,255,255,0.8))" }}>
                  <div className="flex items-center justify-center size-[40px] shrink-0">
                    <FigmaIcon src={imgCheckinPurple} size={30} />
                  </div>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[20px] text-[#1f2e91] flex-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. LINES OVERVIEW + PRICING ── */}
      <section className="bg-white flex flex-col gap-[40px] items-center justify-center px-[20px] py-[40px] w-full">
        {/* Neo Essentials vs Premium cards */}
        <div className="flex flex-wrap gap-[40px] items-center justify-center max-w-[1400px] w-full">
          {/* Neo Essentials card */}
          <div className="border border-[#cbd0d4] flex flex-wrap gap-[20px] items-center justify-center flex-1 min-w-[280px] p-[40px] relative rounded-[16px] overflow-hidden">
            <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]" src={imgEssentialsBg} />
            <div className="flex flex-col gap-[20px] items-start flex-1 min-w-[280px] relative">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0569ff]">
                Neo Essentials
              </p>
              <div className="flex flex-col gap-[10px] items-start w-full">
                {t.essentialsChecklist.map(item => (
                  <CheckListItem key={item} icon={imgCheckinBlue} text={item} />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center flex-1 max-w-[200px] min-w-[180px] relative">
              <img
                alt="Neo FIT"
                className="w-full object-contain max-h-[200px]"
                src={productImages["neo-fit"]}
              />
            </div>
          </div>

          {/* Neo Premium card */}
          <div className="border border-[#cbd0d4] flex flex-wrap gap-[20px] items-center justify-center flex-1 min-w-[280px] p-[40px] relative rounded-[16px] overflow-hidden">
            <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]" src={imgPremiumBg} />
            <div className="flex flex-col gap-[20px] items-start flex-1 min-w-[280px] relative">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#9f3df5]">
                Neo Premium
              </p>
              <div className="flex flex-col gap-[10px] items-start w-full">
                {t.premiumChecklist.map(item => (
                  <CheckListItem key={item} icon={imgCheckinPurple} text={item} />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center flex-1 max-w-[200px] min-w-[180px] relative">
              <img
                alt="Neo Infinity Spark H2"
                className="w-full object-contain max-h-[200px]"
                src={productImages["neo-infinity-spark-h2"]}
              />
            </div>
          </div>
        </div>

        {/* Pricing ranges */}
        <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center">
            {t.priceRangesTitle}
          </h2>
          <div className="flex flex-col gap-[40px] items-stretch justify-center w-full win-1024:flex-row win-1024:flex-wrap win-1024:items-start">
            {/* Essentials price range */}
            <div className="border border-[#cbd0d4] flex flex-col gap-[20px] items-center flex-1 min-w-[240px] p-[20px] rounded-[16px]">
              <div className="bg-[#0569ff] flex items-center justify-center rounded-full shrink-0 size-[60px]">
                <FigmaIcon src={imgMoney} size={30} />
              </div>
              <div className="flex flex-col gap-[20px] items-center flex-1 min-w-[200px]">
                <div className="bg-[#0569ff] px-[10px] py-[6px] rounded-full">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white text-center">
                    Essentials
                  </p>
                </div>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-center">
                  <span className="text-[#1f2e91]">{t.priceFrom}</span>
                  {lang === "pt" || lang === "pt-pt" ? (
                    <>
                      <span className="text-[#0569ff]">{formatPrice(1289.85, lang)} </span>
                      <span className="text-[#1f2e91]">{t.priceTo}</span>
                      <span className="text-[#0569ff]">{formatPrice(7989.85, lang)}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[#0569ff]">US$ 257.97 </span>
                      <span className="text-[#1f2e91]">{t.priceTo}</span>
                      <span className="text-[#0569ff]">US$ 1,597.97</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Premium price range */}
            <div className="border border-[#cbd0d4] flex flex-col gap-[20px] items-center flex-1 min-w-[240px] p-[20px] rounded-[16px]">
              <div className="bg-[#9f3df5] flex items-center justify-center rounded-full shrink-0 size-[60px]">
                <FigmaIcon src={imgMoney} size={30} />
              </div>
              <div className="flex flex-col gap-[20px] items-center flex-1 min-w-[200px]">
                <div className="bg-[#9f3df5] px-[10px] py-[6px] rounded-full">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white text-center">
                    Premium
                  </p>
                </div>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-center">
                  <span className="text-[#1f2e91]">{t.priceFrom}</span>
                  {lang === "pt" || lang === "pt-pt" ? (
                    <>
                      <span className="text-[#9f3df5]">{formatPrice(8489.85, lang)} </span>
                      <span className="text-[#1f2e91]">{t.priceTo}</span>
                      <span className="text-[#9f3df5]">{formatPrice(9639.85, lang)}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[#9f3df5]">US$ 1,697.97 </span>
                      <span className="text-[#1f2e91]">{t.priceTo}</span>
                      <span className="text-[#9f3df5]">US$ 1,927.97</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TRUST BAR ── */}
      <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
        <div className="bg-white border border-[#cbd0d4] flex flex-wrap gap-[20px] items-start max-w-[1400px] p-[20px] rounded-[16px] w-full">
          {(() => {
            const TRUST_ICONS = [
              { icon: imgShield,         aspectW: 189 as number | undefined, aspectH: 215 as number | undefined },
              { icon: imgLogistics,      aspectW: 215 as number | undefined, aspectH: 182 as number | undefined },
              { icon: imgPhone,          aspectW: undefined,                 aspectH: undefined                 },
              { icon: imgCertificate,    aspectW: 142 as number | undefined, aspectH: 215 as number | undefined },
              { icon: imgSustainability, aspectW: undefined,                 aspectH: undefined                 },
            ];
            return t.trustItems.map((item, i) => (
              <div key={item.title} className="flex gap-[10px] items-start flex-1 min-w-[180px]">
                <div className="bg-[#f1f5fe] flex items-center justify-center p-[10px] rounded-[12px] shrink-0 size-[40px]">
                  <FigmaIcon src={TRUST_ICONS[i].icon} size={20} aspectW={TRUST_ICONS[i].aspectW} aspectH={TRUST_ICONS[i].aspectH} />
                </div>
                <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91]">
                    {item.title}
                  </p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#333]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ));
          })()}
        </div>
      </section>

      {/* ── MODAL SELETOR ── */}
      {showSelectorModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-[20px]"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onMouseDown={() => setShowSelectorModal(false)}
        >
          <div
            className="bg-white flex flex-col gap-[20px] max-w-[1200px] p-[24px] rounded-[20px] shadow-2xl w-full max-h-[90vh] overflow-y-auto"
            onMouseDown={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-[10px]">
              <div className="flex gap-[10px] items-center">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] whitespace-nowrap">
                  {t.selectorPre}{selectedIds.length}{t.selector44}
                </p>
                <FigmaIcon src={imgBuyCursor} size={28} />
              </div>
              <button
                onClick={() => setShowSelectorModal(false)}
                className="bg-[#f2f6fd] flex items-center justify-center rounded-full shrink-0 size-[36px] cursor-pointer hover:bg-[#e8f0ff] transition-colors"
              >
                <FigmaIcon src={imgNegativeX} size={16} alt="Fechar" />
              </button>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-[10px] items-center">
              {FILTERS_PT.filter(f => f !== "Todos").map((filter, fi) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(activeFilter === filter ? "Todos" : filter)}
                  className={`border flex items-center justify-center px-[12px] py-[8px] rounded-full transition-colors text-[14px] font-['Avenir_LT_Pro:85_Heavy'] whitespace-nowrap ${
                    activeFilter === filter
                      ? "bg-[#0233c3] border-[#0233c3] text-white"
                      : "bg-white border-[#cbd0d4] text-[#333] hover:border-[#0233c3] hover:text-[#0233c3]"
                  }`}
                >
                  {t.filters[fi + 1]}
                </button>
              ))}
            </div>

            {/* ── Mobile (<1300px): flex-wrap grid ── */}
            <div className="flex flex-wrap gap-[10px] 1024:hidden">
              {filteredProducts.filter(p => selectedIds.length < 4 || selectedIds.includes(p.id)).map(product => {
                const isSelected = selectedIds.includes(product.id);
                const isFull = selectedIds.length >= 4 && !isSelected;
                return (
                  <button
                    key={product.id}
                    onClick={() => { if (isSelected || !isFull) toggleProductInModal(product.id); }}
                    className={`flex-[1_0_0] flex flex-col gap-[16px] items-center justify-center min-h-[160px] min-w-[100px] overflow-hidden p-[10px] rounded-[12px] transition-all border-2 ${
                      isSelected
                        ? "bg-[#e8f0ff] border-[#0233c3] cursor-pointer hover:bg-[#dce8ff]"
                        : isFull
                        ? "bg-[#f6f9fe] opacity-40 cursor-not-allowed border-transparent"
                        : "bg-[#f6f9fe] hover:bg-[#e8f0ff] border-transparent cursor-pointer"
                    }`}
                  >
                    <div className="size-[70px] flex items-center justify-center shrink-0">
                      <img
                        alt={product.label}
                        className="max-w-full max-h-full object-contain pointer-events-none"
                        src={productImages[product.id]}
                      />
                    </div>
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] leading-[16px] text-[#1f2e91] text-center break-words w-full min-h-[32px]">
                      <ProductName parts={product.nameParts} />
                    </p>
                  </button>
                );
              })}
            </div>

            {/* ── Desktop (≥1300px): flex-wrap grid (igual mobile) ── */}
            <div className="hidden 1024:flex flex-wrap gap-[10px] w-full">
              {filteredProducts.filter(p => selectedIds.length < 4 || selectedIds.includes(p.id)).map(product => {
                const isSelected = selectedIds.includes(product.id);
                const isFull = selectedIds.length >= 4 && !isSelected;
                return (
                  <button
                    key={product.id}
                    onClick={() => { if (isSelected || !isFull) toggleProductInModal(product.id); }}
                    className={`flex flex-col gap-[16px] items-center justify-center h-[160px] overflow-hidden p-[10px] rounded-[12px] shrink-0 w-[140px] transition-all border-2 ${
                      isSelected
                        ? "bg-[#e8f0ff] border-[#0233c3] cursor-pointer hover:bg-[#dce8ff]"
                        : isFull
                        ? "bg-[#f6f9fe] opacity-40 cursor-not-allowed border-transparent"
                        : "bg-[#f6f9fe] hover:bg-[#e8f0ff] border-transparent cursor-pointer"
                    }`}
                  >
                    <div className="size-[70px] flex items-center justify-center shrink-0">
                      <img
                        alt={product.label}
                        className="max-w-full max-h-full object-contain"
                        src={productImages[product.id]}
                      />
                    </div>
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] leading-[16px] text-[#1f2e91] text-center break-words w-full min-h-[32px]">
                      <ProductName parts={product.nameParts} />
                    </p>
                  </button>
                );
              })}
            </div>

            {/* ── Rodapé: contagem + botão confirmar ── */}
            <div className="flex items-center justify-between gap-[16px] pt-[4px] border-t border-[#cbd0d4]">
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[17px] text-[#8a8f97]">
                {selectedIds.length === 0
                  ? t.modalNone
                  : `${selectedIds.length}${t.modalSelected}${selectedIds.length > 1 ? "s" : ""} selecionado${selectedIds.length > 1 ? "s" : ""}`}
              </p>
              <button
                onClick={() => setShowSelectorModal(false)}
                className="bg-[#0233c3] flex gap-[10px] items-center justify-center px-[24px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#002ba8] transition-colors shrink-0"
              >
                <span className="font-['Articulat_CF:Bold'] text-[15px] leading-normal text-white">
                  {selectedIds.length > 0 ? t.modalCompare : t.modalClose}
                </span>
                {selectedIds.length > 0 && (
                  <FigmaIcon src={imgArrowWhite} size={10} aspectW={30} aspectH={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
