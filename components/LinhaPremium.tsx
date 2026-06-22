"use client";
import { useState, type ReactNode } from "react";
import FigmaIcon from "./FigmaIcon";
import PremiumSlideshow from "./ui/PremiumSlideshow";
import { PRODUCT_IMAGES } from "@/lib/products";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgDotActive   = "/figma-assets/dot-active-a.svg";
const imgDotInactive = "/figma-assets/dot-inactive-a.svg";

const imgSlide1 = "/figma-assets/premium-slide-1.webp";
const imgSlide2 = "/figma-assets/premium-slide-2.webp";

const imgInfinity        = PRODUCT_IMAGES["neo-infinity"];
const imgInfinitySpark   = PRODUCT_IMAGES["neo-infinity-spark"];
const imgInfinitySparkH2 = PRODUCT_IMAGES["neo-infinity-spark-h2"];
const imgPrestige        = PRODUCT_IMAGES["neo-prestige"];
const imgPrestigeSpark   = PRODUCT_IMAGES["neo-prestige-spark"];
const imgPrestigeSparkH2 = PRODUCT_IMAGES["neo-prestige-spark-h2"];
const imgPrime           = PRODUCT_IMAGES["neo-prime"];
const imgPrimeSpark      = PRODUCT_IMAGES["neo-prime-spark"];
const imgPrimeSparkH2    = PRODUCT_IMAGES["neo-prime-spark-h2"];

const panelSlideSrcs = [
  "/figma-assets/panel-premium-1.webp",
  "/figma-assets/panel-premium-2.webp",
  "/figma-assets/panel-premium-3.webp",
  "/figma-assets/panel-premium-4.webp",
  "/figma-assets/panel-premium-5.webp",
  "/figma-assets/panel-premium-6.webp",
];

const imgCheckin    = "/figma-assets/icon-check-b.svg";
const imgIconLCD    = "/figma-assets/icon-lcd.svg";
const imgIconFilter = "/figma-assets/icon-filter-40px.svg";
const imgIconOsmose = "/figma-assets/icon-osmose-reversa.svg";
const imgIconIoT    = "/figma-assets/icon-iot.svg";

const PANEL_ICONS = [imgIconLCD, imgIconFilter, imgIconOsmose, imgIconIoT];

type Product = { img: string; name: string | ReactNode; sub: string };

const T: Record<Lang, {
  desc: string;
  waterHeader: [string, string, string];
  waterTypes: { label: string; sub: string }[];
  sub6: string; sub7: string; sub8: string;
  tankNote: string;
  panelTitle: [string, string];
  panelSub: string;
  features: { title: string; desc: string }[];
}> = {
  pt: {
    desc: "Modelos sofisticados em aço inox com Painel LCD IPS Touch 15.6, RO/Osmose Reversa, App, UV LED, Wi-Fi 5, Bluetooth 5.3 e experiência premium integrada.",
    waterHeader: ["Tipos de água dos produtos ", "Neo Premium", ", a água perfeita para cada momento"],
    waterTypes: [
      { label: "Água Natural",      sub: "Presente em todos" },
      { label: "Água Gelada",       sub: "Em todos" },
      { label: "45ºC Leite",        sub: "Em todos" },
      { label: "65ºC Chá",          sub: "Em todos" },
      { label: "85ºC Café",         sub: "Em todos" },
      { label: "100ºC Água Quente", sub: "Em todos" },
      { label: "Água com Gás",      sub: "7 e 8 em 1 Apenas" },
      { label: "Água Hidrogenada",  sub: "8 em 1 Apenas" },
    ],
    sub6: "6 em 1", sub7: "7 em 1", sub8: "8 em 1",
    tankNote: "Todos possuem Tanque de Água Gelada com 3000ml.",
    panelTitle: ["Painel Premium ", "com Tecnologia IPS"],
    panelSub: "Tecnologia avançada para ambientes sofisticados e usuários exigentes.",
    features: [
      { title: "LCD IPS / Total Touch", desc: "Navegação como iPhone / iPad" },
      { title: "Tecnologia Premium",    desc: "Filtros de alta performance" },
      { title: "Osmose Reversa(RO)",    desc: "Água alcalina pura" },
      { title: "IoT Avançado",          desc: "Telemetria em tempo real" },
    ],
  },
  en: {
    desc: "Sophisticated stainless steel models with LCD IPS Touch Panel 15.6, RO/Reverse Osmosis, App, UV LED, Wi-Fi 5, Bluetooth 5.3 and integrated premium experience.",
    waterHeader: ["Water types from ", "Neo Premium", " products, the perfect water for every moment"],
    waterTypes: [
      { label: "Natural Water",      sub: "In all models" },
      { label: "Cold Water",         sub: "In all" },
      { label: "45°C Warm Milk",     sub: "In all" },
      { label: "65°C Tea",           sub: "In all" },
      { label: "85°C Coffee",        sub: "In all" },
      { label: "100°C Hot Water",    sub: "In all" },
      { label: "Sparkling Water",    sub: "7 & 8 in 1 Only" },
      { label: "Hydrogen Water",     sub: "8 in 1 Only" },
    ],
    sub6: "6 in 1", sub7: "7 in 1", sub8: "8 in 1",
    tankNote: "All models have a 3000ml Cold Water Tank.",
    panelTitle: ["Premium Panel ", "with IPS Technology"],
    panelSub: "Advanced technology for sophisticated environments and demanding users.",
    features: [
      { title: "LCD IPS / Total Touch", desc: "Navigation like iPhone / iPad" },
      { title: "Premium Technology",    desc: "High-performance filters" },
      { title: "Reverse Osmosis (RO)",  desc: "Pure alkaline water" },
      { title: "Advanced IoT",          desc: "Real-time telemetry" },
    ],
  },
  es: {
    desc: "Modelos sofisticados en acero inoxidable con Panel LCD IPS Touch 15.6, RO/Ósmosis Inversa, App, UV LED, Wi-Fi 5, Bluetooth 5.3 y experiencia premium integrada.",
    waterHeader: ["Tipos de agua de los productos ", "Neo Premium", ", el agua perfecta para cada momento"],
    waterTypes: [
      { label: "Agua Natural",          sub: "En todos los modelos" },
      { label: "Agua Fría",             sub: "En todos" },
      { label: "45°C Leche Caliente",   sub: "En todos" },
      { label: "65°C Té",               sub: "En todos" },
      { label: "85°C Café",             sub: "En todos" },
      { label: "100°C Agua Caliente",   sub: "En todos" },
      { label: "Agua con Gas",          sub: "Solo 7 y 8 en 1" },
      { label: "Agua Hidrogenada",      sub: "Solo 8 en 1" },
    ],
    sub6: "6 en 1", sub7: "7 en 1", sub8: "8 en 1",
    tankNote: "Todos tienen Depósito de Agua Fría de 3000ml.",
    panelTitle: ["Panel Premium ", "con Tecnología IPS"],
    panelSub: "Tecnología avanzada para entornos sofisticados y usuarios exigentes.",
    features: [
      { title: "LCD IPS / Total Touch", desc: "Navegación como iPhone / iPad" },
      { title: "Tecnología Premium",    desc: "Filtros de alto rendimiento" },
      { title: "Ósmosis Inversa (RO)",  desc: "Agua alcalina pura" },
      { title: "IoT Avanzado",          desc: "Telemetría en tiempo real" },
    ],
  },
  fr: {
    desc: "Modèles sophistiqués en acier inoxydable avec panneau LCD IPS Touch 15.6, RO/Osmose Inverse, App, UV LED, Wi-Fi 5, Bluetooth 5.3 et expérience premium intégrée.",
    waterHeader: ["Types d'eau des produits ", "Neo Premium", ", l'eau parfaite pour chaque instant"],
    waterTypes: [
      { label: "Eau Naturelle",          sub: "Dans tous les modèles" },
      { label: "Eau Froide",             sub: "Dans tous" },
      { label: "45°C Lait Chaud",        sub: "Dans tous" },
      { label: "65°C Thé",               sub: "Dans tous" },
      { label: "85°C Café",              sub: "Dans tous" },
      { label: "100°C Eau Chaude",       sub: "Dans tous" },
      { label: "Eau Gazeuse",            sub: "Solo 7 & 8 en 1" },
      { label: "Eau Hydrogénée",         sub: "Seulement 8 en 1" },
    ],
    sub6: "6 en 1", sub7: "7 en 1", sub8: "8 en 1",
    tankNote: "Tous les modèles disposent d'un réservoir d'eau froide de 3000 ml.",
    panelTitle: ["Panneau Premium ", "avec Technologie IPS"],
    panelSub: "Technologie avancée pour des environnements sophistiqués et des utilisateurs exigeants.",
    features: [
      { title: "LCD IPS / Total Touch", desc: "Navigation comme iPhone / iPad" },
      { title: "Technologie Premium",   desc: "Filtres haute performance" },
      { title: "Osmose Inverse (RO)",   desc: "Eau alcaline pure" },
      { title: "IoT Avancé",            desc: "Télémétrie en temps réel" },
    ],
  },
  de: {
    desc: "Hochwertige Edelstahlmodelle mit LCD-IPS-Touchpanel 15.6, RO/Umkehrosmose, App, UV-LED, Wi-Fi 5, Bluetooth 5.3 und integriertem Premium-Erlebnis.",
    waterHeader: ["Wassertypen der Produkte ", "Neo Premium", ", das perfekte Wasser für jeden Moment"],
    waterTypes: [
      { label: "Natürliches Wasser",     sub: "In allen Modellen" },
      { label: "Kaltes Wasser",          sub: "In allen" },
      { label: "45°C Warme Milch",       sub: "In allen" },
      { label: "65°C Tee",               sub: "In allen" },
      { label: "85°C Kaffee",            sub: "In allen" },
      { label: "100°C Heißes Wasser",    sub: "In allen" },
      { label: "Sprudelwasser",          sub: "Nur 7 & 8 in 1" },
      { label: "Wasserstoffwasser",      sub: "Nur 8 in 1" },
    ],
    sub6: "6 in 1", sub7: "7 in 1", sub8: "8 in 1",
    tankNote: "Alle Modelle verfügen über einen 3000 ml Kaltwassertank.",
    panelTitle: ["Premium-Panel ", "mit IPS-Technologie"],
    panelSub: "Fortschrittliche Technologie für anspruchsvolle Umgebungen und anspruchsvolle Nutzer.",
    features: [
      { title: "LCD IPS / Total Touch", desc: "Navigation wie iPhone / iPad" },
      { title: "Premium-Technologie",   desc: "Hochleistungsfilter" },
      { title: "Umkehrosmose (RO)",     desc: "Reines alkalisches Wasser" },
      { title: "Fortschrittliches IoT", desc: "Echtzeit-Telemetrie" },
    ],
  },
  it: {
    desc: "Modelli sofisticati in acciaio inossidabile con pannello LCD IPS Touch 15.6, RO/Osmosi Inversa, App, UV LED, Wi-Fi 5, Bluetooth 5.3 ed esperienza premium integrata.",
    waterHeader: ["Tipi di acqua dei prodotti ", "Neo Premium", ", l'acqua perfetta per ogni momento"],
    waterTypes: [
      { label: "Acqua Naturale",         sub: "In tutti i modelli" },
      { label: "Acqua Fredda",           sub: "In tutti" },
      { label: "45°C Latte Caldo",       sub: "In tutti" },
      { label: "65°C Tè",                sub: "In tutti" },
      { label: "85°C Caffè",             sub: "In tutti" },
      { label: "100°C Acqua Calda",      sub: "In tutti" },
      { label: "Acqua Frizzante",        sub: "Solo 7 & 8 in 1" },
      { label: "Acqua Idrogenata",       sub: "Solo 8 in 1" },
    ],
    sub6: "6 in 1", sub7: "7 in 1", sub8: "8 in 1",
    tankNote: "Tutti i modelli hanno un serbatoio dell'acqua fredda da 3000 ml.",
    panelTitle: ["Pannello Premium ", "con Tecnologia IPS"],
    panelSub: "Tecnologia avanzata per ambienti sofisticati e utenti esigenti.",
    features: [
      { title: "LCD IPS / Total Touch", desc: "Navigazione come iPhone / iPad" },
      { title: "Tecnologia Premium",    desc: "Filtri ad alta prestazione" },
      { title: "Osmosi Inversa (RO)",   desc: "Acqua alcalina pura" },
      { title: "IoT Avanzato",          desc: "Telemetria in tempo reale" },
    ],
  },
  zh: {
    desc: "精致不锈钢机型，配备LCD IPS触控面板15.6、RO/反渗透、App、UV LED、Wi-Fi 5、蓝牙5.3及完整高端体验。",
    waterHeader: ["", "Neo Premium", "系列产品的水型，每个时刻都有完美的水"],
    waterTypes: [
      { label: "天然水",    sub: "所有型号均有" },
      { label: "冷水",      sub: "所有型号均有" },
      { label: "45°C温奶",  sub: "所有型号均有" },
      { label: "65°C茶水",  sub: "所有型号均有" },
      { label: "85°C咖啡",  sub: "所有型号均有" },
      { label: "100°C热水", sub: "所有型号均有" },
      { label: "气泡水",    sub: "仅限7合1和8合1" },
      { label: "富氢水",    sub: "仅限8合1" },
    ],
    sub6: "六合一", sub7: "七合一", sub8: "八合一",
    tankNote: "所有型号均配备3000ml冷水箱。",
    panelTitle: ["高端面板", "IPS技术"],
    panelSub: "先进技术，专为高端环境和精致用户打造。",
    features: [
      { title: "LCD IPS / 全触控", desc: "如iPhone / iPad般的操作体验" },
      { title: "高端技术",         desc: "高性能滤芯" },
      { title: "反渗透 (RO)",      desc: "纯净碱性水" },
      { title: "高级物联网",       desc: "实时遥测" },
    ],
  },
  ja: {
    desc: "LCD IPS タッチパネル15.6、RO/逆浸透、アプリ、UV LED、Wi-Fi 5、Bluetooth 5.3を搭載した洗練されたステンレスモデル。統合されたプレミアム体験。",
    waterHeader: ["", "Neo Premium", "製品のウォータータイプ、あらゆる場面に最適な水を"],
    waterTypes: [
      { label: "ナチュラルウォーター",  sub: "全モデル共通" },
      { label: "冷水",                  sub: "全モデル共通" },
      { label: "45°Cホットミルク",      sub: "全モデル共通" },
      { label: "65°Cお茶",             sub: "全モデル共通" },
      { label: "85°Cコーヒー",          sub: "全モデル共通" },
      { label: "100°Cお湯",            sub: "全モデル共通" },
      { label: "炭酸水",                sub: "7・8in1のみ" },
      { label: "水素水",                sub: "8in1のみ" },
    ],
    sub6: "6 in 1", sub7: "7 in 1", sub8: "8 in 1",
    tankNote: "全モデルに3000ml冷水タンクを搭載。",
    panelTitle: ["プレミアムパネル ", "IPS技術搭載"],
    panelSub: "洗練された環境と要求の高いユーザーのための先進技術。",
    features: [
      { title: "LCD IPS / フルタッチ", desc: "iPhone / iPadのような操作感" },
      { title: "プレミアム技術",        desc: "高性能フィルター" },
      { title: "逆浸透 (RO)",           desc: "純粋なアルカリ水" },
      { title: "アドバンスドIoT",        desc: "リアルタイムテレメトリー" },
    ],
  },
  ko: {
    desc: "LCD IPS 터치 패널 15.6, RO/역삼투, 앱, UV LED, Wi-Fi 5, 블루투스 5.3 및 통합 프리미엄 경험을 갖춘 정교한 스테인리스 스틸 모델.",
    waterHeader: ["", "Neo Premium", " 제품의 물 유형, 모든 순간을 위한 완벽한 물"],
    waterTypes: [
      { label: "천연수",           sub: "모든 모델" },
      { label: "냉수",             sub: "모든 모델" },
      { label: "45°C 따뜻한 우유", sub: "모든 모델" },
      { label: "65°C 차",          sub: "모든 모델" },
      { label: "85°C 커피",        sub: "모든 모델" },
      { label: "100°C 온수",       sub: "모든 모델" },
      { label: "탄산수",           sub: "7 & 8 in 1 전용" },
      { label: "수소수",           sub: "8 in 1 전용" },
    ],
    sub6: "6 in 1", sub7: "7 in 1", sub8: "8 in 1",
    tankNote: "모든 모델에 3000ml 냉수 탱크가 포함됩니다.",
    panelTitle: ["프리미엄 패널 ", "IPS 기술"],
    panelSub: "고급 환경과 까다로운 사용자를 위한 첨단 기술.",
    features: [
      { title: "LCD IPS / 풀 터치", desc: "iPhone / iPad 같은 탐색 경험" },
      { title: "프리미엄 기술",     desc: "고성능 필터" },
      { title: "역삼투 (RO)",       desc: "순수한 알칼리수" },
      { title: "고급 IoT",          desc: "실시간 원격 측정" },
    ],
  },
  "pt-pt": {
    desc: "Modelos sofisticados em aço inox com Painel LCD IPS Touch 15.6, RO/Osmose Inversa, App, UV LED, Wi-Fi 5, Bluetooth 5.3 e experiência premium integrada.",
    waterHeader: ["Tipos de água dos produtos ", "Neo Premium", ", a água perfeita para cada momento"],
    waterTypes: [
      { label: "Água Natural",      sub: "Presente em todos" },
      { label: "Água Gelada",       sub: "Em todos" },
      { label: "45ºC Leite",        sub: "Em todos" },
      { label: "65ºC Chá",          sub: "Em todos" },
      { label: "85ºC Café",         sub: "Em todos" },
      { label: "100ºC Água Quente", sub: "Em todos" },
      { label: "Água com Gás",      sub: "7 e 8 em 1 Apenas" },
      { label: "Água Hidrogenada",  sub: "8 em 1 Apenas" },
    ],
    sub6: "6 em 1", sub7: "7 em 1", sub8: "8 em 1",
    tankNote: "Todos possuem Reservatório de Água Gelada com 3000ml.",
    panelTitle: ["Painel Premium ", "com Tecnologia IPS"],
    panelSub: "Tecnologia avançada para ambientes sofisticados e utilizadores exigentes.",
    features: [
      { title: "LCD IPS / Total Touch", desc: "Navegação como iPhone / iPad" },
      { title: "Tecnologia Premium",    desc: "Filtros de alta performance" },
      { title: "Osmose Inversa (RO)",   desc: "Água alcalina pura" },
      { title: "IoT Avançado",          desc: "Telemetria em tempo real" },
    ],
  },
};

function ProductImage({ src }: { src: string }) {
  return (
    <div className="w-full h-[220px] shrink-0">
      <img alt="" className="w-full h-full object-contain pointer-events-none" src={src} />
    </div>
  );
}

function PremiumCard({ product, color = "#6e0cc3" }: { product: Product; color?: string }) {
  return (
    <div className="bg-white flex flex-[1_0_0] flex-col gap-[10px] items-center min-h-[290px] min-w-[180px] overflow-hidden p-[20px] rounded-[12px]">
      <ProductImage src={product.img} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-center w-full min-h-[55px] flex items-center justify-center" style={{ color }}>
        {product.name}
      </p>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] text-center w-full">
        {product.sub}
      </p>
    </div>
  );
}

function PanelSlideshow() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-[10px] items-center justify-center shrink-0 min-w-[240px] max-w-[249px] w-[240px]">
      <div
        className="relative w-full cursor-pointer"
        style={{ aspectRatio: "2309/3821" }}
        onClick={() => setActive((active + 1) % panelSlideSrcs.length)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setActive((active + 1) % panelSlideSrcs.length)}
        aria-label="Próximo slide"
      >
        <img
          alt="Painel Premium"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={panelSlideSrcs[active]}
        />
      </div>
      <div className="flex gap-[10px] items-center justify-center">
        {panelSlideSrcs.map((_, i) => (
          <div
            key={i}
            className="relative shrink-0 size-[12px] cursor-pointer"
            onClick={() => setActive(i)}
          >
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={active === i ? imgDotActive : imgDotInactive} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LinhaPremium() {
  const { lang } = useLang();
  const t = T[lang];

  const rowInfinity: Product[] = [
    { img: imgInfinity,        name: "Neo INFINITY",                                     sub: t.sub6 },
    { img: imgInfinitySpark,   name: "Neo INFINITY SPARK",                               sub: t.sub7 },
    { img: imgInfinitySparkH2, name: <span>Neo INFINITY SPARK H<sub>2</sub></span>,      sub: t.sub8 },
  ];
  const rowPrestige: Product[] = [
    { img: imgPrestige,        name: "Neo PRESTIGE",                                     sub: t.sub6 },
    { img: imgPrestigeSpark,   name: "Neo PRESTIGE SPARK",                               sub: t.sub7 },
    { img: imgPrestigeSparkH2, name: <span>Neo PRESTIGE SPARK H<sub>2</sub></span>,      sub: t.sub8 },
  ];
  const rowPrime: Product[] = [
    { img: imgPrime,        name: "Neo PRIME",                                           sub: t.sub6 },
    { img: imgPrimeSpark,   name: "Neo PRIME SPARK",                                     sub: t.sub7 },
    { img: imgPrimeSparkH2, name: <span>Neo PRIME SPARK H<sub>2</sub></span>,            sub: t.sub8 },
  ];

  const panelFeatures = PANEL_ICONS.map((icon, i) => ({ icon, ...t.features[i] }));

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="bg-[#f6f9fe] flex flex-col gap-[20px] items-center justify-center max-w-[1400px] p-[20px] rounded-[16px] w-full">

        <div className="flex flex-col gap-[20px] items-start w-full">
          <div className="flex flex-wrap gap-y-[20px] items-center justify-center w-full">
            <h2
              className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] bg-clip-text text-transparent flex-1 min-w-[240px] text-center lg:text-left"
              style={{ backgroundImage: "linear-gradient(170.17deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              Neo Premium
            </h2>
          </div>

          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full text-center lg:text-left">
            {t.desc}
          </p>

          <div className="bg-white flex flex-col gap-[20px] items-center justify-center overflow-hidden p-[20px] rounded-[12px] w-full">
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#1f2e91] w-full">
              {t.waterHeader[0]}
              <span className="font-['Avenir_LT_Pro:85_Heavy']">{t.waterHeader[1]}</span>
              {t.waterHeader[2]}
            </p>
            <div className="flex flex-wrap gap-[20px_10px] items-center w-full">
              {t.waterTypes.map((w) => (
                <div key={w.label} className="flex flex-[0_0_calc(50%-5px)] lg:flex-[0_0_calc(25%-8px)] gap-[10px] items-center">
                  <FigmaIcon src={imgCheckin} size={20} />
                  <div className="flex flex-1 flex-col gap-[5px] items-start min-w-0">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">
                      {w.label}
                    </p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b] w-full">
                      {w.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[20px] items-start justify-center w-full lg:flex-row lg:flex-wrap lg:items-start">

          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[240px] w-full lg:w-auto">
            <div className="flex flex-wrap gap-[15px] items-stretch w-full">
              {rowInfinity.map((p, i) => <PremiumCard key={i} product={p} />)}
            </div>
            <div className="flex flex-wrap gap-[15px] items-stretch w-full">
              {rowPrestige.map((p, i) => <PremiumCard key={i} product={p} />)}
            </div>
            <div className="flex flex-wrap gap-[15px] items-stretch w-full">
              {rowPrime.map((p, i) => <PremiumCard key={i} product={p} />)}
            </div>
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#333] text-center w-full">
              {t.tankNote}
            </p>
          </div>

          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[240px]">

            <div className="bg-[#f6f9fe] flex flex-col gap-[40px] items-center justify-center min-w-[240px] pt-[20px] rounded-[16px] shrink-0 w-full">

              <div className="flex flex-col gap-[10px] items-start w-full">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] w-full">
                  <span className="text-[#1f2e91]">{t.panelTitle[0]}</span>
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(170.17deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
                  >
                    {t.panelTitle[1]}
                  </span>
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b] w-full">
                  {t.panelSub}
                </p>
              </div>

              <div className="flex flex-wrap gap-[20px] items-center justify-center shrink-0 w-full">
                <div className="content-start flex flex-[1_0_0] flex-wrap gap-x-[10px] gap-y-[20px] items-start justify-center min-w-[240px]">
                  {panelFeatures.map((f, i) => (
                    <div key={i} className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[140px]">
                      <FigmaIcon src={f.icon} size={30} />
                      <div className="flex flex-col gap-[10px] items-center shrink-0 text-center w-full">
                        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#6e0cc3] text-center w-full whitespace-pre-line min-h-[34px] flex flex-col justify-center">
                          {f.title}
                        </p>
                        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b] text-center w-full">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <PanelSlideshow />
              </div>
            </div>

            <PremiumSlideshow />

          </div>
        </div>

      </div>
    </section>
  );
}
