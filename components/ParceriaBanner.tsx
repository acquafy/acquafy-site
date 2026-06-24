"use client";

import FigmaIcon from "./FigmaIcon";
import Link from "next/link";
import { BtnAzulBaseArrow, BtnAzulOutArrow } from "./ui/Buttons";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  pill: string;
  title: string;
  subtitle: string;
  cta: string;
  imgAlt: string;
}> = {
  pt: {
    pill:     "NOVA FASE GLOBAL",
    title:    "Programa de Parceria Global Acquafy",
    subtitle: "Três níveis para crescer com a marca em escala global: indicar, operar ou distribuir.",
    cta:      "Falar com especialista",
    imgAlt:   "Produto Acquafy",
  },
  "pt-pt": {
    pill:     "NOVA FASE GLOBAL",
    title:    "Programa de Parceria Global Acquafy",
    subtitle: "Três níveis para crescer com a marca à escala global: indicar, operar ou distribuir.",
    cta:      "Falar com especialista",
    imgAlt:   "Produto Acquafy",
  },
  en: {
    pill:     "NEW GLOBAL PHASE",
    title:    "Acquafy Global Partnership Program",
    subtitle: "Three levels to grow with the brand on a global scale: refer, operate, or distribute.",
    cta:      "Talk to a specialist",
    imgAlt:   "Acquafy Product",
  },
  "en-gb": {
    pill:     "NEW GLOBAL PHASE",
    title:    "Acquafy Global Partnership Programme",
    subtitle: "Three levels to grow with the brand on a global scale: refer, operate, or distribute.",
    cta:      "Talk to a specialist",
    imgAlt:   "Acquafy Product",
  },
  es: {
    pill:     "NUEVA FASE GLOBAL",
    title:    "Programa de Asociación Global Acquafy",
    subtitle: "Tres niveles para crecer con la marca a escala global: referir, operar o distribuir.",
    cta:      "Hablar con un especialista",
    imgAlt:   "Producto Acquafy",
  },
  fr: {
    pill:     "NOUVELLE PHASE MONDIALE",
    title:    "Programme de Partenariat Mondial Acquafy",
    subtitle: "Trois niveaux pour grandir avec la marque à l'échelle mondiale : recommander, opérer ou distribuer.",
    cta:      "Parler à un spécialiste",
    imgAlt:   "Produit Acquafy",
  },
  de: {
    pill:     "NEUE GLOBALE PHASE",
    title:    "Globales Acquafy Partnerschaftsprogramm",
    subtitle: "Drei Ebenen, um mit der Marke global zu wachsen: empfehlen, betreiben oder vertreiben.",
    cta:      "Mit einem Experten sprechen",
    imgAlt:   "Acquafy Produkt",
  },
  it: {
    pill:     "NUOVA FASE GLOBALE",
    title:    "Programma di Partnership Globale Acquafy",
    subtitle: "Tre livelli per crescere con il brand su scala globale: segnalare, operare o distribuire.",
    cta:      "Parla con uno specialista",
    imgAlt:   "Prodotto Acquafy",
  },
  zh: {
    pill:     "全新全球阶段",
    title:    "Acquafy 全球合作伙伴计划",
    subtitle: "三个层级，实现品牌全球规模增长：推荐、运营或分销。",
    cta:      "联系专家",
    imgAlt:   "Acquafy 产品",
  },
  ja: {
    pill:     "新しいグローバルフェーズ",
    title:    "Acquafy グローバルパートナーシッププログラム",
    subtitle: "グローバル規模でブランドとともに成長する3つのレベル：紹介、運営、または流通。",
    cta:      "専門家に相談する",
    imgAlt:   "Acquafy 製品",
  },
  ko: {
    pill:     "새로운 글로벌 단계",
    title:    "Acquafy 글로벌 파트너십 프로그램",
    subtitle: "글로벌 규모로 브랜드와 함께 성장하는 3가지 레벨: 추천, 운영 또는 유통.",
    cta:      "전문가와 상담하기",
    imgAlt:   "Acquafy 제품",
  },
  sv: {
    pill:     "NY GLOBAL FAS",
    title:    "Acquafy Globalt Partnerschaftsprogram",
    subtitle: "Tre nivåer för att växa med varumärket i global skala: rekommendera, driva eller distribuera.",
    cta:      "Prata med en specialist",
    imgAlt:   "Acquafy Produkt",
  },
  fi: {
    pill:     "UUSI GLOBAALI VAIHE",
    title:    "Acquafy Globaali Kumppanuusohjelma",
    subtitle: "Kolme tasoa kasvaa brändin kanssa globaalissa mittakaavassa: suosittele, operoi tai jaa.",
    cta:      "Puhu asiantuntijan kanssa",
    imgAlt:   "Acquafy Tuote",
  },
  ru: {
    pill:     "NOVYY GLOBALNYY ETAP",
    title:    "Globalnaya programma partnerstva Acquafy",
    subtitle: "Tri urovnya dlya rosta vmeste s brendom v globalnom masshtabe: rekomendovat, upravljat ili raspredelyat.",
    cta:      "Peregovorit so specialistom",
    imgAlt:   "Produkt Acquafy",
  },
  ro: {
    pill:     "NOUA FAZA GLOBALA",
    title:    "Programul Global de Parteneriat Acquafy",
    subtitle: "Trei niveluri pentru a creste impreuna cu brandul la scara globala: recomanda, opereaza sau distribuie.",
    cta:      "Vorbeste cu un specialist",
    imgAlt:   "Produs Acquafy",
  },
  he: {
    pill:     "SHAV GLOBAL HADASH",
    title:    "Tochnit Shutafut Globalit shel Acquafy",
    subtitle: "Shlosha ravakim litzmicha im hamarka biqneh olami: lehamlitz, lehafil o levazek.",
    cta:      "Daber im mutcheh",
    imgAlt:   "Mutzar Acquafy",
  },
};

/* ── Assets ───────────────────────────────────────────────────── */
// Tela total (≥1280px) — BG image fills the whole section
const imgBgPadrao = "/figma-assets/bg-padrao.webp";

// 1024–1279px right column + mobile bottom — product image
const imgFrame1024 = "/figma-assets/frame-1024.webp";

// Badge & tier icons
const imgPlanet   = "/figma-assets/icon-planet-b.svg";
const imgSilver   = "/figma-assets/product-silver-d.webp";
const imgGold     = "/figma-assets/product-gold-c.webp";
const imgPlatinum = "/figma-assets/product-platinum-d.webp";

/* ── Tier badge data ─────────────────────────────────────────── */
const tiers = [
  {
    key:       "silver",
    src:       imgSilver,
    alt:       "Silver",
    label:     "Silver",
    imgCls:    "size-[40px] object-contain shrink-0",
    labelCls:  "font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#3e4650]",
    labelStyle: undefined as React.CSSProperties | undefined,
  },
  {
    key:       "gold",
    src:       imgGold,
    alt:       "Gold",
    label:     "Gold",
    imgCls:    "size-[40px] object-contain shrink-0",
    labelCls:  "font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#dfa727]",
    labelStyle: undefined as React.CSSProperties | undefined,
  },
  {
    key:       "platinum",
    src:       imgPlatinum,
    alt:       "Platinum",
    label:     "Platinum",
    imgCls:    "size-[40px] object-contain shrink-0",
    labelCls:  "font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] bg-clip-text text-transparent",
    labelStyle: { backgroundImage: "linear-gradient(117.65deg, #0233c3 6.19%, #9f3df5 93.35%)" } as React.CSSProperties,
  },
];

export default function ParceriaBanner() {
  const { lang } = useLang();
  const t = T[lang];
  return (
    <section className="relative bg-white w-full px-[20px] py-[40px] flex items-center justify-center overflow-hidden xl:bg-transparent xl:min-h-[875px]">

      {/* ── BG image — tela total (≥1280px) ──────────────────── */}
      <img
        alt=""
        className="hidden xl:block absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBgPadrao}
      />

      {/* ── Content wrapper ────────────────────────────────────── */}
      {/* mobile: flex-col | 1024–1279px: flex-row flex-wrap | ≥1280px: flex-row + BG */}
      <div className="relative flex flex-col lg:flex-row lg:flex-wrap gap-[40px] items-center justify-center max-w-[1400px] w-full xl:min-h-[795px]">

        {/* ══ LEFT COLUMN ══════════════════════════════════════ */}
        <div className="flex flex-col gap-[20px] lg:gap-[40px] items-center w-full lg:items-start lg:flex-[1_0_0] lg:max-w-[450px] lg:min-w-[280px]">

          {/* "Nova fase global" pill */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center px-[12px] py-[8px] rounded-full shrink-0">
            <FigmaIcon src={imgPlanet} size={16} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-[#0233c3]">
              {t.pill}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-['Avenir_LT_Pro:95_Black'] text-hero bg-clip-text text-transparent w-full text-center lg:text-left"
            style={{ backgroundImage: "linear-gradient(110.27deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
          >
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[24px] lg:text-[18px] lg:leading-[26px] text-[#333] text-center lg:text-left">
            {t.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-[20px] items-center justify-center xl:justify-start w-full">
            <Link href="/contact">
              <BtnAzulOutArrow className="min-h-[50px]">
                {t.cta}
              </BtnAzulOutArrow>
            </Link>
          </div>

          {/* Tier badges */}
          <div className="flex flex-row gap-[20px] items-stretch justify-center xl:justify-start w-full">
            {tiers.map((tier) => (
              <div
                key={tier.key}
                className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center p-[10px] rounded-[16px]"
              >
                <img src={tier.src} alt={tier.alt} className={tier.imgCls} />
                <span className={`${tier.labelCls} text-center`} style={tier.labelStyle}>
                  {tier.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ PRODUCT IMAGE ════════════════════════════════════ */}
        {/* mobile: abaixo do conteúdo (flex-col) | 1024–1279px: coluna direita | ≥1280px: oculto */}
        <div className="xl:hidden relative aspect-[750/745] min-h-[278px] min-w-[280px] rounded-[16px] shrink-0 w-full lg:flex-[1_0_0] lg:w-auto overflow-hidden">
          <img
            src={imgFrame1024}
            alt={t.imgAlt}
            className="absolute inset-0 w-full h-full object-cover rounded-[16px]"
          />
        </div>

        {/* ══ RIGHT PLACEHOLDER — tela total (≥1280px) ════════ */}
        {/* BG image provê o visual; este div equilibra o flex row */}
        <div className="hidden xl:flex flex-[1_0_0] min-w-[280px] h-[795px]" />

      </div>
    </section>
  );
}
