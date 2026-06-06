"use client";
import { useState, useMemo } from "react";
import FigmaIcon from "./FigmaIcon";

// ─── Assets ───────────────────────────────────────────────────────────────────
const imgBannerBg       = "/figma-assets/5bbdc47a-61d4-4460-ad07-ddc4b9d3fe07.png";
const imgBuyCursor      = "/figma-assets/b764ff7a-f4f3-4eb1-98bb-7839fab99ab1.png";
const imgArrowWhite     = "/figma-assets/35731080-b7d1-499f-b156-d8f75e87501a.svg";
const imgArrowBlue      = "/figma-assets/42472dab-beee-45e5-9a8b-22eca8103268.svg";
const imgMobile         = "/figma-assets/8206c21c-4de2-413e-a5ef-cc8fb20ce878.svg";
const imgLanguage       = "/figma-assets/4ddb6786-e393-4c2a-967b-61f79ba5aa9c.svg";
const imgPlanetWeb      = "/figma-assets/ceff79df-c647-4795-aebd-30d9ad4f281a.svg";
const imgPlanetGlobal   = "/figma-assets/ae2a46ab-cbbf-4f31-a75f-af0ef9e6cfcd.svg";
const imgWaterVector    = "/figma-assets/2741cb06-1fd0-43f7-b99e-528f650f0446.svg";
const imgNegativeX      = "/figma-assets/345408d4-ce63-4c06-8fa0-570f5e20c116.svg";
const imgNegative       = "/figma-assets/0b93c426-791c-435c-9632-a09442eb4aa3.svg";
const imgCheckin        = "/figma-assets/b8cb7b14-abc4-4e14-892b-b8f374be909b.svg";
const imgCheckinBlue    = "/figma-assets/12364ca0-a347-4a2a-bd0a-2748875e9c81.svg";
const imgCheckinPurple  = "/figma-assets/5cafca54-4bd4-4a3a-95a7-f01e897c3f8b.svg";
const imgMoney          = "/figma-assets/417fa02e-d4d2-43f3-9b5d-7d4250220344.svg";
const imgEssentialsBg   = "/figma-assets/3729c390-3009-4ecf-add4-d81e314592da.png";
const imgPremiumBg      = "/figma-assets/36656c11-f5b1-4e8b-825d-ca48f745e1ac.png";
const imgShield         = "/figma-assets/784774df-e19e-4c3c-9587-b0a62131c822.svg";
const imgLogistics      = "/figma-assets/b3650486-b28d-4d10-a4fb-a872d2d9b959.svg";
const imgPhone          = "/figma-assets/72b9b35c-136f-4aab-948e-2a4605603913.svg";
const imgCertificate    = "/figma-assets/1c6b039e-bc1c-4308-b6b0-51551a300887.svg";
const imgSustainability = "/figma-assets/44128385-0fdd-49a4-868a-0f8ab11363cb.svg";

// Product image constants — indexed by product id
const productImages: Record<string, string> = {
  "neo-up":                "/figma-assets/fee70d57-1b06-44cb-aac9-25d397534f44.png",
  "neo-fit":               "/figma-assets/8a6326a4-3fbe-4c47-b081-999c7472e346.png",
  "neo-smart-h2":          "/figma-assets/3f225d27-02bd-4e61-b227-4830c151e9fd.png",
  "neo-touch":             "/figma-assets/8fe6e04c-144e-4195-bcfd-79f29c743631.png",
  "neo-plus":              "/figma-assets/0d82e077-7e58-4d61-8aac-b8b294d35f5f.png",
  "neo-ultra":             "/figma-assets/54cf780f-10e0-412c-965c-45556b7abdc4.png",
  "neo-ultra-spark":       "/figma-assets/53356b70-af1a-4fc3-9210-ca1737e2a88f.png",
  "neo-ultra-spark-h2":    "/figma-assets/3bf2cb07-1bfe-4fba-a450-71247f07fbd8.png",
  "neo-max":               "/figma-assets/2900867f-fe3a-4116-ad34-00aa961aa3cc.png",
  "neo-max-spark":         "/figma-assets/20cd97aa-254e-4d17-96eb-7e17a550b78b.png",
  "neo-max-spark-h2":      "/figma-assets/d21183e6-9cc0-40e5-9a21-6275962d57ce.png",
  "neo-infinity":          "/figma-assets/38e64ef2-ddfe-4578-8f17-c56f622b769b.png",
  "neo-infinity-spark":    "/figma-assets/fce4da17-998c-43a3-a271-8b13e0441f97.png",
  "neo-infinity-spark-h2": "/figma-assets/207a6e4b-0a5f-45fb-8e47-8bc89ea56ff1.png",
  "neo-prestige":          "/figma-assets/d87df890-105d-48c4-b716-8059feed24ef.png",
  "neo-prestige-spark":    "/figma-assets/2a7f2aa5-5228-45d6-8016-c716aa97fc47.png",
  "neo-prestige-spark-h2": "/figma-assets/b856eec1-6487-40f2-90b9-e151ebfadabf.png",
  "neo-prime":             "/figma-assets/25eefd1b-9956-462a-87c6-0b882a53ee50.png",
  "neo-prime-spark":       "/figma-assets/23cf5e9d-1928-4d80-85b6-af909bb2d4a2.png",
  "neo-prime-spark-h2":    "/figma-assets/52c53e36-40fc-4293-a4dd-642df8cb1fc8.png",
};

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
    linha: "Essentials", categories: ["Bancada", "Coluna"],
    specs: { formato: "Bancada ou Coluna", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1", app: true, iot: true, wifi: true, uv: true, filtragem: "4 Filtros UF de alta performance", tanque: "400ml", material: "Acabamento premium", preco: "US$ 267.97" },
  },
  {
    id: "neo-fit", label: "Neo FIT",
    nameParts: [{ text: "Neo " }, { text: "FIT", highlight: true }],
    linha: "Essentials", categories: ["Bancada"],
    specs: { formato: "Bancada ou Parede", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1", app: true, iot: true, wifi: true, uv: true, filtragem: "4 Filtros UF de alta performance", tanque: "400ml", material: "Acabamento premium", preco: "US$ 497.97" },
  },
  {
    id: "neo-smart-h2", label: "Neo SMART H₂",
    nameParts: [{ text: "Neo " }, { text: "SMART H", highlight: true }, { text: "2", highlight: true }],
    linha: "Essentials", categories: ["Bancada", "Água Hidrogenada"],
    specs: { formato: "Bancada", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: true, painel: "LED Touch 10.1", app: true, iot: true, wifi: true, uv: true, filtragem: "4 Filtros UF de alta performance", tanque: "400ml", material: "Acabamento premium", preco: "US$ 597.97" },
  },
  {
    id: "neo-touch", label: "Neo TOUCH",
    nameParts: [{ text: "Neo " }, { text: "TOUCH", highlight: true }],
    linha: "Essentials", categories: ["Bancada"],
    specs: { formato: "Bancada", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1", app: true, iot: true, wifi: true, uv: true, filtragem: "4 Filtros UF de alta performance", tanque: "1500ml", material: "Acabamento premium", preco: "US$ 697.97" },
  },
  {
    id: "neo-plus", label: "Neo PLUS",
    nameParts: [{ text: "Neo " }, { text: "PLUS", highlight: true }],
    linha: "Essentials", categories: ["Bancada"],
    specs: { formato: "Bancada", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1", app: true, iot: true, wifi: true, uv: true, filtragem: "4 Filtros UF de alta performance", tanque: "1500ml", material: "Acabamento premium", preco: "US$ 797.97" },
  },
  {
    id: "neo-ultra", label: "Neo ULTRA",
    nameParts: [{ text: "Neo " }, { text: "ULTRA", highlight: true }],
    linha: "Essentials", categories: ["Bancada", "Água com Gás"],
    specs: { formato: "Bancada", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: false, painel: "LED Touch 10.1", app: true, iot: true, wifi: true, uv: true, filtragem: "4 Filtros UF de alta performance", tanque: "3000ml", material: "Acabamento premium", preco: "US$ 897.97" },
  },
  {
    id: "neo-ultra-spark", label: "Neo ULTRA SPARK",
    nameParts: [{ text: "Neo " }, { text: "ULTRA SPARK", highlight: true }],
    linha: "Essentials", categories: ["Bancada", "Água com Gás"],
    specs: { formato: "Bancada", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: false, painel: "LED Touch 10.1", app: true, iot: true, wifi: true, uv: true, filtragem: "4 Filtros UF de alta performance", tanque: "3000ml", material: "Acabamento premium", preco: "US$ 997.97" },
  },
  {
    id: "neo-ultra-spark-h2", label: "Neo ULTRA SPARK H₂",
    nameParts: [{ text: "Neo " }, { text: "ULTRA SPARK H", highlight: true }, { text: "2", highlight: true }],
    linha: "Essentials", categories: ["Bancada", "Água com Gás", "Água Hidrogenada"],
    specs: { formato: "Bancada", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: true, painel: "LED Touch 10.1", app: true, iot: true, wifi: true, uv: true, filtragem: "4 Filtros UF de alta performance", tanque: "3000ml", material: "Acabamento premium", preco: "US$ 1,197.97" },
  },
  {
    id: "neo-max", label: "Neo MAX",
    nameParts: [{ text: "Neo " }, { text: "MAX", highlight: true }],
    linha: "Essentials", categories: ["Coluna"],
    specs: { formato: "Coluna", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1", app: true, iot: true, wifi: true, uv: true, filtragem: "4 Filtros UF de alta performance", tanque: "3000ml", material: "Acabamento premium", preco: "US$ 1,097.97" },
  },
  {
    id: "neo-max-spark", label: "Neo MAX SPARK",
    nameParts: [{ text: "Neo " }, { text: "MAX SPARK", highlight: true }],
    linha: "Essentials", categories: ["Coluna", "Água com Gás"],
    specs: { formato: "Coluna", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: false, painel: "LED Touch 10.1", app: true, iot: true, wifi: true, uv: true, filtragem: "4 Filtros UF de alta performance", tanque: "3000ml", material: "Acabamento premium", preco: "US$ 1,297.97" },
  },
  {
    id: "neo-max-spark-h2", label: "Neo MAX SPARK H₂",
    nameParts: [{ text: "Neo " }, { text: "MAX SPARK H", highlight: true }, { text: "2", highlight: true }],
    linha: "Essentials", categories: ["Coluna", "Água com Gás", "Água Hidrogenada"],
    specs: { formato: "Coluna", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: true, painel: "LED Touch 10.1", app: true, iot: true, wifi: true, uv: true, filtragem: "4 Filtros UF de alta performance", tanque: "3000ml", material: "Acabamento premium", preco: "US$ 1,397.97" },
  },
  // ── Neo Premium ─────────────────────────────────────────────────
  {
    id: "neo-infinity", label: "Neo INFINITY",
    nameParts: [{ text: "Neo " }, { text: "INFINITY", highlight: true }],
    linha: "Premium", categories: ["Embutido", "Bancada"],
    specs: { formato: "Embutido ou Bancada", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LCD IPS Touch 15.6", app: true, iot: true, wifi: true, uv: true, filtragem: "RO/Osmose Reversa + 3 filtros de alta performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,297.97" },
  },
  {
    id: "neo-infinity-spark", label: "Neo INFINITY SPARK",
    nameParts: [{ text: "Neo " }, { text: "INFINITY SPARK", highlight: true }],
    linha: "Premium", categories: ["Embutido", "Bancada", "Água com Gás"],
    specs: { formato: "Embutido ou Bancada", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: false, painel: "LCD IPS Touch 15.6", app: true, iot: true, wifi: true, uv: true, filtragem: "RO/Osmose Reversa + 3 filtros de alta performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,497.97" },
  },
  {
    id: "neo-infinity-spark-h2", label: "Neo INFINITY SPARK H₂",
    nameParts: [{ text: "Neo " }, { text: "INFINITY SPARK H", highlight: true }, { text: "2", highlight: true }],
    linha: "Premium", categories: ["Embutido", "Bancada", "Água com Gás"],
    specs: { formato: "Embutido ou Bancada", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: false, painel: "LCD IPS Touch 15.6", app: true, iot: true, wifi: true, uv: true, filtragem: "RO/Osmose Reversa + 3 filtros de alta performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,597.97" },
  },
  {
    id: "neo-prestige", label: "Neo PRESTIGE",
    nameParts: [{ text: "Neo " }, { text: "PRESTIGE", highlight: true }],
    linha: "Premium", categories: ["Bancada"],
    specs: { formato: "Bancada", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LCD IPS Touch 15.6", app: true, iot: true, wifi: true, uv: true, filtragem: "RO/Osmose Reversa + 3 filtros de alta performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,397.97" },
  },
  {
    id: "neo-prestige-spark", label: "Neo PRESTIGE SPARK",
    nameParts: [{ text: "Neo " }, { text: "PRESTIGE SPARK", highlight: true }],
    linha: "Premium", categories: ["Bancada", "Água com Gás"],
    specs: { formato: "Bancada", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: false, painel: "LCD IPS Touch 15.6", app: true, iot: true, wifi: true, uv: true, filtragem: "RO/Osmose Reversa + 3 filtros de alta performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,597.97" },
  },
  {
    id: "neo-prestige-spark-h2", label: "Neo PRESTIGE SPARK H₂",
    nameParts: [{ text: "Neo " }, { text: "PRESTIGE SPARK H", highlight: true }, { text: "2", highlight: true }],
    linha: "Premium", categories: ["Bancada", "Água com Gás", "Água Hidrogenada"],
    specs: { formato: "Bancada", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: true, painel: "LCD IPS Touch 15.6", app: true, iot: true, wifi: true, uv: true, filtragem: "RO/Osmose Reversa + 3 filtros de alta performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,697.97" },
  },
  {
    id: "neo-prime", label: "Neo PRIME",
    nameParts: [{ text: "Neo " }, { text: "PRIME", highlight: true }],
    linha: "Premium", categories: ["Bancada"],
    specs: { formato: "Bancada", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LCD IPS Touch 15.6", app: true, iot: true, wifi: true, uv: true, filtragem: "RO/Osmose Reversa + 3 filtros de alta performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,497.97" },
  },
  {
    id: "neo-prime-spark", label: "Neo PRIME SPARK",
    nameParts: [{ text: "Neo " }, { text: "PRIME SPARK", highlight: true }],
    linha: "Premium", categories: ["Bancada", "Água com Gás"],
    specs: { formato: "Bancada", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: false, painel: "LCD IPS Touch 15.6", app: true, iot: true, wifi: true, uv: true, filtragem: "RO/Osmose Reversa + 3 filtros de alta performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,597.97" },
  },
  {
    id: "neo-prime-spark-h2", label: "Neo PRIME SPARK H₂",
    nameParts: [{ text: "Neo " }, { text: "PRIME SPARK H", highlight: true }, { text: "2", highlight: true }],
    linha: "Premium", categories: ["Bancada", "Água com Gás", "Água Hidrogenada"],
    specs: { formato: "Bancada", funcoes: "5 em 1", temperaturas: "Natural, Gelada e Quente", gas: true, h2: true, painel: "LCD IPS Touch 15.6", app: true, iot: true, wifi: true, uv: true, filtragem: "RO/Osmose Reversa + 3 filtros de alta performance", tanque: "3000ml", material: "Aço inox", preco: "US$ 1,697.97" },
  },
];

// ─── Spec Rows ────────────────────────────────────────────────────────────────
const SPEC_ROWS: { key: keyof Specs; label: string; type: "text" | "bool" | "price" }[] = [
  { key: "formato",     label: "Formato",               type: "text"  },
  { key: "funcoes",     label: "Funções",               type: "text"  },
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
  { key: "material",    label: "Material",              type: "text"  },
  { key: "preco",       label: "Preço EUA",             type: "price" },
];

const FILTERS = ["Todos", "Essentials", "Premium", "Bancada", "Coluna", "Embutido", "Água com Gás", "Água Hidrogenada"];

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
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-[#1f2e91] flex-1 min-w-0">
        {label}
      </p>
    </div>
  );
}

function BoolCell({ value }: { value: boolean }) {
  return (
    <FigmaIcon src={value ? imgCheckin : imgNegative} size={24} alt={value ? "Sim" : "Não"} />
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
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "neo-fit", "neo-ultra-spark-h2", "neo-infinity-spark-h2", "neo-prestige-spark-h2",
  ]);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredProducts = useMemo(() => {
    switch (activeFilter) {
      case "Essentials": return PRODUCTS.filter(p => p.linha === "Essentials");
      case "Premium":    return PRODUCTS.filter(p => p.linha === "Premium");
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
    setSelectedIds(prev => prev.filter(s => s !== id));
  }

  return (
    <>
      {/* ── 1. BANNER PRINCIPAL ── */}
      <section className="relative flex flex-col items-center justify-center px-[20px] py-[40px] overflow-hidden min-h-[875px]">
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={imgBannerBg}
        />
        <div className="relative flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">
          {/* Hero content */}
          <div className="flex flex-wrap gap-[10px] items-center w-full">
            <div className="flex flex-col gap-[20px] items-start justify-center flex-1 min-w-[280px] max-w-[600px]">
              {/* Label */}
              <div className="bg-white border border-[#0233c3] flex gap-[10px] items-center px-[12px] py-[8px] rounded-full">
                <FigmaIcon src={imgPlanetWeb} size={16} />
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
                  Compare Produtos
                </span>
              </div>

              {/* Title */}
              <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] text-[#333]">
                Compare os produtos{" "}
                <span
                  className="bg-clip-text"
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundImage: "linear-gradient(to bottom, #0233c3, #9f3df5)",
                  }}
                >
                  Acquafy Neo
                </span>
              </h1>

              {/* Subtitle */}
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333]">
                Compare as linhas Neo Essentials &amp; Neo Premium e encontre o modelo ideal para você.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-[20px] items-center">
                <button className="bg-[#0233c3] flex gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] px-[20px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#002ba8] transition-colors">
                  <span className="font-['Articulat_CF:Bold'] text-[16px] leading-normal text-white flex-1 text-center">
                    Comparar agora
                  </span>
                  <FigmaIcon src={imgArrowWhite} size={10} aspectW={30} aspectH={18} />
                </button>
                <button className="bg-white border border-[#0233c3] flex gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] px-[20px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#f0f4ff] transition-colors">
                  <span className="font-['Articulat_CF:Bold'] text-[16px] leading-normal text-[#0233c3] flex-1 text-center">
                    Falar com um especialista
                  </span>
                  <FigmaIcon src={imgArrowBlue} size={10} aspectW={30} aspectH={18} />
                </button>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-[20px] items-start w-full">
                <FeaturePill icon={imgMobile} label="App + AI + IoT" aspectW={211} aspectH={295} />
                <FeaturePill icon={imgLanguage} label="16 idiomas" />
                <FeaturePill icon={imgPlanetGlobal} label="Operação global" />
                <FeaturePill icon={imgWaterVector} label="Água inteligente" aspectW={307} aspectH={295} />
              </div>
            </div>

            {/* Right spacer (hero image is in BG) */}
            <div className="flex-1 min-w-[280px] h-[40px]" />
          </div>

          {/* Product selector card */}
          <div className="bg-white flex flex-col gap-[20px] items-start max-w-[1400px] p-[20px] rounded-[16px] w-full shadow-sm">
            {/* Selector header */}
            <div className="flex flex-wrap gap-[10px] items-center w-full">
              <div className="flex gap-[10px] items-center flex-1 min-w-[240px]">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#1f2e91]">
                  Selecione os modelos para comparar ({selectedIds.length}/4)
                </p>
                <FigmaIcon src={imgBuyCursor} size={30} />
              </div>
              {/* Filter pills */}
              <div className="flex flex-wrap gap-[10px] items-center justify-end flex-1 min-w-[240px]">
                {FILTERS.filter(f => f !== "Todos").map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(activeFilter === filter ? "Todos" : filter)}
                    className={`border flex items-center justify-center px-[12px] py-[8px] rounded-full transition-colors text-[14px] font-['Avenir_LT_Pro:85_Heavy'] whitespace-nowrap ${
                      activeFilter === filter
                        ? "bg-[#0233c3] border-[#0233c3] text-white"
                        : "bg-white border-[#f6f9fe] text-[#c8cfd8] hover:border-[#cbd0d4] hover:text-[#333]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Product thumbnail grid */}
            <div className="flex gap-[10px] items-center overflow-x-auto w-full pb-[4px]">
              {filteredProducts.map(product => {
                const isSelected = selectedIds.includes(product.id);
                const isFull = selectedIds.length >= 4 && !isSelected;
                return (
                  <button
                    key={product.id}
                    onClick={() => toggleProduct(product.id)}
                    disabled={isFull}
                    className={`flex flex-col gap-[20px] items-center justify-center min-h-[175px] overflow-hidden p-[10px] rounded-[12px] shrink-0 w-[160px] transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#e8f0ff] border-2 border-[#0233c3]"
                        : isFull
                        ? "bg-[#f6f9fe] opacity-50 cursor-not-allowed"
                        : "bg-[#f6f9fe] hover:bg-[#e8f0ff] border-2 border-transparent"
                    }`}
                  >
                    <div className="size-[80px] flex items-center justify-center shrink-0">
                      <img
                        alt={product.label}
                        className="max-w-full max-h-full object-contain"
                        src={productImages[product.id]}
                      />
                    </div>
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91] text-center whitespace-nowrap">
                      <ProductName parts={product.nameParts} />
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SELECTED PRODUCTS BAR ── */}
      <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
        <div className="bg-[#f6f9fe] flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden p-[20px] rounded-[16px] w-full">
          {/* Info */}
          <div className="flex flex-col gap-[10px] items-start flex-1 min-w-[240px] max-w-[340px]">
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#1f2e91]">
              Produtos selecionados ({selectedProducts.length}/4)
            </p>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#333]">
              Adicione ou remova produtos para comparar
            </p>
          </div>

          {/* Selected product chips */}
          <div className="flex flex-wrap gap-[10px] items-start flex-1 min-w-[240px]">
            {selectedProducts.map(product => (
              <div
                key={product.id}
                className="bg-white flex flex-1 gap-[10px] h-[100px] items-center min-w-[200px] max-w-[280px] overflow-hidden p-[10px] relative rounded-[12px]"
              >
                <div className="size-[80px] shrink-0 flex items-center justify-center">
                  <img
                    alt={product.label}
                    className="max-w-full max-h-full object-contain"
                    src={productImages[product.id]}
                  />
                </div>
                <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0 pt-[20px]">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91]">
                    <ProductName parts={product.nameParts} />
                  </p>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] leading-[13px] text-[#8a8f97]">
                    Remover
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
              <div
                key={`empty-${i}`}
                className="flex flex-1 gap-[10px] h-[100px] items-center min-w-[200px] max-w-[280px] overflow-hidden p-[10px] rounded-[12px] border-2 border-dashed border-[#cbd0d4]"
              >
                <div className="size-[80px] shrink-0 flex items-center justify-center">
                  <span className="text-[#cbd0d4] text-[32px] font-light">+</span>
                </div>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] leading-[15px] text-[#c8cfd8]">
                  Selecione um produto
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. COMPARISON TABLE ── */}
      <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
        {selectedProducts.length === 0 ? (
          <div className="max-w-[1400px] w-full text-center py-[60px]">
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] text-[#8a8f97]">
              Selecione ao menos um produto para comparar.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-[#cbd0d4] flex items-start max-w-[1400px] overflow-hidden rounded-[16px] w-full">
            {/* Left: Characteristics column */}
            <div className="flex flex-col items-start w-[240px] shrink-0 border-r border-[#cbd0d4]">
              {/* Header */}
              <div className="bg-white flex flex-col items-start justify-center min-h-[80px] px-[20px] py-[10px] border-b border-[#cbd0d4] w-full">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b]">
                  Características
                </p>
              </div>
              {/* Rows */}
              {SPEC_ROWS.map(row => (
                <div
                  key={row.key}
                  className="bg-white flex flex-col items-start justify-center min-h-[60px] px-[20px] py-[10px] border-b border-[#cbd0d4] w-full"
                >
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b]">
                    {row.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Right: Product columns (scrollable) */}
            <div className="flex overflow-x-auto flex-1 min-w-0">
              {selectedProducts.map(product => (
                <div key={product.id} className="flex flex-col items-start flex-1 min-w-[200px] border-r border-[#cbd0d4] last:border-r-0">
                  {/* Product header */}
                  <div className="bg-white flex gap-[10px] items-center justify-center min-h-[80px] px-[16px] py-[10px] border-b border-[#cbd0d4] w-full">
                    <div className="size-[60px] shrink-0 flex items-center justify-center">
                      <img
                        alt={product.label}
                        className="max-w-full max-h-full object-contain"
                        src={productImages[product.id]}
                      />
                    </div>
                    <div className="flex flex-col gap-[6px] items-start flex-1 min-w-0">
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] leading-[16px] text-[#2a2a2b]">
                        <ProductName parts={product.nameParts} />
                      </p>
                      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[11px] leading-[13px] text-[#8a8f97]">
                        Linha Neo {product.linha}
                      </p>
                    </div>
                  </div>

                  {/* Spec rows */}
                  {SPEC_ROWS.map(row => {
                    const val = product.specs[row.key];
                    return (
                      <div
                        key={row.key}
                        className="bg-white flex flex-col items-center justify-center min-h-[60px] px-[16px] py-[10px] border-b border-[#cbd0d4] w-full"
                      >
                        {row.type === "bool" ? (
                          <BoolCell value={val as boolean} />
                        ) : row.type === "price" ? (
                          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] leading-[17px] text-[#0233c3] text-center">
                            {val as string}
                          </p>
                        ) : (
                          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b] text-center">
                            {val as string}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── 4. LINES OVERVIEW + PRICING ── */}
      <section className="bg-white flex flex-col gap-[40px] items-center justify-center px-[20px] py-[40px] w-full">
        {/* Neo Essentials vs Premium cards */}
        <div className="flex flex-wrap gap-[40px] items-center justify-center max-w-[1400px] w-full">
          {/* Neo Essentials card */}
          <div className="border border-[#cbd0d4] flex flex-wrap gap-[20px] items-center justify-center flex-1 min-w-[280px] p-[40px] relative rounded-[16px] overflow-hidden">
            <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]" src={imgEssentialsBg} />
            <div className="flex flex-col gap-[20px] items-start flex-1 min-w-[280px] relative">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#0569ff]">
                Neo Essentials
              </p>
              <div className="flex flex-col gap-[10px] items-start w-full">
                {[
                  "Painel LED Touch 10,1",
                  "App + AI + IoT",
                  "4 filtros UF",
                  "Modelos Bancada, Parede e Coluna",
                  "Excelente custo-benefício",
                ].map(item => (
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
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#9f3df5]">
                Neo Premium
              </p>
              <div className="flex flex-col gap-[10px] items-start w-full">
                {[
                  "Aço inox",
                  "Painel LCD IPS Touch 15.6",
                  "Mini Media Network",
                  "RO/Osmose Reversa + 3 filtros",
                  "Proposta premium e sofisticada",
                ].map(item => (
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
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] text-center">
            Faixas de preço no mercado americano
          </h2>
          <div className="flex flex-wrap gap-[40px] items-center justify-center w-full">
            {/* Essentials price range */}
            <div className="border border-[#cbd0d4] flex flex-wrap gap-[20px] items-start justify-center flex-1 min-w-[240px] p-[20px] rounded-[16px]">
              <div className="bg-[#0569ff] flex items-center justify-center rounded-full shrink-0 size-[60px]">
                <FigmaIcon src={imgMoney} size={30} />
              </div>
              <div className="flex flex-col gap-[20px] items-center flex-1 min-w-[200px]">
                <div className="bg-[#0569ff] px-[10px] py-[6px] rounded-full">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white text-center">
                    Essentials
                  </p>
                </div>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-center">
                  <span className="text-[#1f2e91]">de </span>
                  <span className="text-[#0569ff]">US$ 267.97 </span>
                  <span className="text-[#1f2e91]">a </span>
                  <span className="text-[#0569ff]">US$ 1,397.97</span>
                </p>
              </div>
            </div>

            {/* Premium price range */}
            <div className="border border-[#cbd0d4] flex flex-wrap gap-[20px] items-start justify-center flex-1 min-w-[240px] p-[20px] rounded-[16px]">
              <div className="bg-[#9f3df5] flex items-center justify-center rounded-full shrink-0 size-[60px]">
                <FigmaIcon src={imgMoney} size={30} />
              </div>
              <div className="flex flex-col gap-[20px] items-center flex-1 min-w-[200px]">
                <div className="bg-[#9f3df5] px-[10px] py-[6px] rounded-full">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white text-center">
                    Premium
                  </p>
                </div>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-center">
                  <span className="text-[#1f2e91]">de </span>
                  <span className="text-[#9f3df5]">US$ 1,297.97 </span>
                  <span className="text-[#1f2e91]">a </span>
                  <span className="text-[#9f3df5]">US$ 1,697.97</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TRUST BAR ── */}
      <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
        <div className="bg-white border border-[#cbd0d4] flex flex-wrap gap-[20px] items-start max-w-[1400px] p-[20px] rounded-[16px] w-full">
          {[
            { icon: imgShield,         aspectW: 189, aspectH: 215, title: "Qualidade Garantida",  desc: "Produtos variados e certificados com os mais altos padrões." },
            { icon: imgLogistics,      aspectW: 215, aspectH: 182, title: "Entrega Segura",       desc: "Entrega rígida e segura para todo o Brasil." },
            { icon: imgPhone,                                       title: "Assistência Técnica",  desc: "Rede autorizada de assistência em todo o país." },
            { icon: imgCertificate,    aspectW: 142, aspectH: 215, title: "Garantia Estendida",   desc: "Mais tranquilidade para você e sua família." },
            { icon: imgSustainability,                              title: "Sustentabilidade",     desc: "Tecnologia que cuida da água e do planeta." },
          ].map(item => (
            <div key={item.title} className="flex gap-[10px] items-start flex-1 min-w-[180px]">
              <div className="bg-[#f1f5fe] flex items-center justify-center p-[10px] rounded-[12px] shrink-0 size-[40px]">
                <FigmaIcon src={item.icon} size={20} aspectW={item.aspectW} aspectH={item.aspectH} />
              </div>
              <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[21px] text-[#1f2e91]">
                  {item.title}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#333]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
