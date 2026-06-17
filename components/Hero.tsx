"use client";
import { useState } from "react";
import FigmaIcon from "./FigmaIcon";
import { DotAtivo, DotInativo } from "./ui/SlideDot";
import { useLang, type Lang } from "@/context/LanguageContext";

// Backgrounds
const imgBg1    = "/figma-assets/bg-slide-1.webp";
const imgBg2    = "/figma-assets/bg-slide-2-xl.webp";
// Images
const imgMockup  = "/figma-assets/mockup-tablet-phone.webp";
const imgFrame36 = "/figma-assets/frame-36-mobile-product.webp";
// Slide 1 feature icons
const imgPlanetWeb = "/figma-assets/icon-planetweb-30px-b.svg";
const imgCloud     = "/figma-assets/icon-cloud-30px.svg";
const imgAI        = "/figma-assets/icon-ai-30px-b.svg";
const imgGlobe     = "/figma-assets/icon-globe-30px-a.svg";
// Slide 2 icons
const imgGiftLabel = "/figma-assets/icon-gift-label.svg";
const imgFiltros   = "/figma-assets/icon-filtros-40px.svg";
const imgWater20   = "/figma-assets/icon-water-20.svg";
const imgPlugPlay  = "/figma-assets/icon-plug-play.svg";
const imgGiftCTA   = "/figma-assets/icon-gift-cta.svg";
// Arrows
const imgArrowWhite = "/figma-assets/icon-arrow-white-a.svg";
const imgArrowBlue  = "/figma-assets/icon-arrow-blue-outline-a.svg";
// Stats bar 1 icons
const imgGlobeStats   = "/figma-assets/icon-globe-stats-30px.svg";
const imgChatStats    = "/figma-assets/icon-chat-stats.svg";
const imgMobileStats  = "/figma-assets/icon-mobile-stats.svg";
const imgWifiStats    = "/figma-assets/icon-wifi-stats.svg";
const imgPessoasStats = "/figma-assets/icon-pessoas-stats.svg";
const imgMediaStats   = "/figma-assets/icon-media-stats.svg";
// Stats bar 2 icons
const imgAguaPura = "/figma-assets/icon-agua-pura-30px.svg";
const imgShield   = "/figma-assets/icon-shield-26px-b.svg";

// ─── Gradient constants ──────────────────────────────────────────────────────
const gdBase    = { backgroundImage: "linear-gradient(104deg, #0233c3 6.19%, #9f3df5 93.35%)" };
const gdHover   = { backgroundImage: "linear-gradient(104deg, #002ba8 6.19%, #6e0cc3 93.35%)" };
const gdPressed = { backgroundImage: "linear-gradient(104deg, #0569ff 6.19%, #b25efb 93.35%)" };

// ─── Static icon arrays ──────────────────────────────────────────────────────
const S1_FEAT_ICONS = [
  { bg: "#0233c3", icon: imgCloud,  aspectW: 30, aspectH: 22 },
  { bg: "#7a16d2", icon: imgAI,     aspectW: 30, aspectH: 30 },
  { bg: "#36ae5c", icon: imgGlobe,  aspectW: 30, aspectH: 30 },
];
const S2_CARD_ICONS = [
  { icon: imgFiltros,  aspectW: 40,  aspectH: 40  },
  { icon: imgWater20,  aspectW: 35,  aspectH: 42  },
  { icon: imgPlugPlay, aspectW: 485, aspectH: 629 },
];
const STATS1_ICONS = [
  { icon: imgGlobeStats,   aspectW: 30,    aspectH: 30    },
  { icon: imgChatStats,    aspectW: 30,    aspectH: 30    },
  { icon: imgMobileStats,  aspectW: 21,    aspectH: 30    },
  { icon: imgWifiStats,    aspectW: 30,    aspectH: 20    },
  { icon: imgPessoasStats, aspectW: 43.86, aspectH: 40.5  },
  { icon: imgMediaStats,   aspectW: 26.67, aspectH: 26.67 },
];

// ─── Translations ────────────────────────────────────────────────────────────
type Stats1Item = { top: string; bottom: string } | { lines: string[] };

const T: Record<Lang, {
  s1Label: string;
  s1H1a: string; s1H1b: string;
  s1Sub: string;
  s1Features: { title: string; desc: string }[];
  s1Cta1: string; s1Cta2mob: string; s1Cta2desk: string;
  s2Label: string;
  s2H1a: string; s2H1b: string;
  s2SubMobP1: string; s2SubMobP2: string;
  s2SubDeskP1: string; s2SubDeskP2: string;
  s2Cards: { label: string }[];
  giftEarn: string; giftIn: string;
  stats1: Stats1Item[];
  stats2tag: [string, string];
  stats2rules: string[];
}> = {
  pt: {
    s1Label: "NOVA FASE GLOBAL",
    s1H1a: "Plataforma Inteligente para ",
    s1H1b: "Água de Qualidade",
    s1Sub: "A Acquafy conecta produtos inteligentes, filtros de alta performance, App + AI, parceiros globais e recorrência para transformar a forma como o mundo consome água.",
    s1Features: [
      { title: "Acquafy Platform", desc: "Infraestrutura segura e escalável na nuvem para máxima performance" },
      { title: "App + AI",          desc: "Inteligência artificial integrada para decisões mais rápidas e eficientes." },
      { title: "Gestão Global",    desc: "Visão completa do negócio com dados em tempo real em qualquer lugar." },
    ],
    s1Cta1: "Conheça a Linha Neo", s1Cta2mob: "Compare os produtos", s1Cta2desk: "Conheça nossa Plataforma",
    s2Label: "CAMPANHA ACQUAFY",
    s2H1a: "Água de qualidade",
    s2H1b: "não deve ser privilégio.",
    s2SubMobP1: "A Acquafy combina tecnologia, inteligência artificial, conectividade e sustentabilidade para transformar a forma como pessoas, empresas e comunidades acessam água pura e de qualidade em todo o mundo.",
    s2SubMobP2: "Faça um upgrade do seu purificador antigo para o novo ",
    s2SubDeskP1: "A Acquafy torna a água pura mais acessível, com tecnologia global, design premium e benefícios reais para o seu dia a dia.",
    s2SubDeskP2: "Faça um upgrade do seu purificador antigo para o novo ",
    s2Cards: [
      { label: "4 filtros de alta performance" },
      { label: "20 estágios de tratamento" },
      { label: "Plug & Play" },
    ],
    giftEarn: "Ganhe", giftIn: "no Brasil",
    stats1: [
      { top: "Até",  bottom: "180 países" },
      { top: "16",   bottom: "idiomas" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Parceiros Silver,", "Gold e Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Tecnologia que transforma.", " Água que muda vidas."],
    stats2rules: [
      "Entregue seu purificador antigo no momento da compra.",
      "Bônus não convertido em dinheiro.",
      "Válido na compra de um novo Acquafy Neo UP.",
    ],
  },
  en: {
    s1Label: "NEW GLOBAL PHASE",
    s1H1a: "Smart Platform for ",
    s1H1b: "Quality Water",
    s1Sub: "Acquafy connects smart products, high-performance filters, App + AI, global partners and recurring revenue to transform how the world consumes water.",
    s1Features: [
      { title: "Acquafy Platform", desc: "Secure and scalable cloud infrastructure for maximum performance" },
      { title: "App + AI",          desc: "Integrated artificial intelligence for faster and more efficient decisions." },
      { title: "Global Management", desc: "Complete business overview with real-time data from anywhere." },
    ],
    s1Cta1: "Explore the Neo Line", s1Cta2mob: "Compare products", s1Cta2desk: "Explore our Platform",
    s2Label: "ACQUAFY CAMPAIGN",
    s2H1a: "Quality water",
    s2H1b: "should not be a privilege.",
    s2SubMobP1: "Acquafy combines technology, artificial intelligence, connectivity and sustainability to transform how people, businesses and communities access pure, quality water around the world.",
    s2SubMobP2: "Upgrade your old purifier to the new ",
    s2SubDeskP1: "Acquafy makes pure water more accessible, with global technology, premium design and real benefits for your daily life.",
    s2SubDeskP2: "Upgrade your old purifier to the new ",
    s2Cards: [
      { label: "4 high-performance filters" },
      { label: "20 treatment stages" },
      { label: "Plug & Play" },
    ],
    giftEarn: "Earn", giftIn: "in Brazil",
    stats1: [
      { top: "Up to", bottom: "180 countries" },
      { top: "16",    bottom: "languages" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Silver Partners,", "Gold and Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Technology that transforms.", " Water that changes lives."],
    stats2rules: [
      "Return your old purifier at the time of purchase.",
      "Bonus not convertible to cash.",
      "Valid on the purchase of a new Acquafy Neo UP.",
    ],
  },
  es: {
    s1Label: "NUEVA FASE GLOBAL",
    s1H1a: "Plataforma Inteligente para ",
    s1H1b: "Agua de Calidad",
    s1Sub: "Acquafy conecta productos inteligentes, filtros de alto rendimiento, App + AI, socios globales y recurrencia para transformar la forma en que el mundo consume agua.",
    s1Features: [
      { title: "Acquafy Platform", desc: "Infraestructura segura y escalable en la nube para máximo rendimiento" },
      { title: "App + AI",          desc: "Inteligencia artificial integrada para decisiones más rápidas y eficientes." },
      { title: "Gestión Global",   desc: "Visión completa del negocio con datos en tiempo real desde cualquier lugar." },
    ],
    s1Cta1: "Conoce la Línea Neo", s1Cta2mob: "Compara los productos", s1Cta2desk: "Conoce nuestra Plataforma",
    s2Label: "CAMPAÑA ACQUAFY",
    s2H1a: "El agua de calidad",
    s2H1b: "no debe ser un privilegio.",
    s2SubMobP1: "Acquafy combina tecnología, inteligencia artificial, conectividad y sostenibilidad para transformar cómo personas, empresas y comunidades acceden al agua pura y de calidad en todo el mundo.",
    s2SubMobP2: "Actualiza tu purificador antiguo al nuevo ",
    s2SubDeskP1: "Acquafy hace el agua pura más accesible, con tecnología global, diseño premium y beneficios reales para tu día a día.",
    s2SubDeskP2: "Actualiza tu purificador antiguo al nuevo ",
    s2Cards: [
      { label: "4 filtros de alto rendimiento" },
      { label: "20 etapas de tratamiento" },
      { label: "Plug & Play" },
    ],
    giftEarn: "Gana", giftIn: "en Brasil",
    stats1: [
      { top: "Hasta", bottom: "180 países" },
      { top: "16",    bottom: "idiomas" },
      { lines: ["App +", "Acquafy Ai"] },
      { lines: ["WiFi 5 +", "Bluetooth 5.3"] },
      { lines: ["Socios Silver,", "Gold y Platinum"] },
      { lines: ["Acquafy", "Media Network"] },
    ],
    stats2tag: ["Tecnología que transforma.", " Agua que cambia vidas."],
    stats2rules: [
      "Entrega tu purificador antiguo al momento de la compra.",
      "Bono no convertible en dinero.",
      "Válido en la compra de un nuevo Acquafy Neo UP.",
    ],
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function GiftCard({ earn, inText }: { earn: string; inText: string }) {
  return (
    <div className="bg-[rgba(255,255,255,0.4)] border border-white flex flex-[1_0_0] flex-wrap gap-[10px] items-center justify-center min-h-[60px] min-w-[190px] px-[20px] py-[5px] rounded-[16px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
      <div className="bg-[rgba(255,255,255,0.4)] border border-white flex flex-col items-center justify-center p-[10px] rounded-full size-[41px] shrink-0 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
        <FigmaIcon src={imgGiftCTA} size={20} />
      </div>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] flex-1 min-w-[100px]">
        {earn}{" "}
        <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] bg-clip-text text-transparent bg-gradient-to-b from-[#0233c3] to-[#9f3df5]">R$100,00</span>
        {" "}{inText}
      </p>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className={`relative flex flex-col gap-[20px] items-center px-[20px] py-[40px] w-full overflow-hidden xl:h-[calc(100vh-80px)] ${slide === 1 ? "xl:bg-transparent bg-gradient-to-b from-[#fafbff] to-[#e8f1f8]" : ""}`}>

      {/* Backgrounds */}
      {slide === 0 && <img src={imgBg1} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />}
      {slide === 1 && <img src={imgBg2} alt="" className="hidden xl:block absolute inset-0 w-full h-full object-cover pointer-events-none" />}

      {/* ══ MOBILE LAYOUT (<xl) ══ */}
      <div className="xl:hidden relative flex-1 flex flex-col gap-[20px] items-center w-full">

        {/* === SLIDE 1 - mobile === */}
        {slide === 0 && (
          <>
            <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
              <FigmaIcon src={imgPlanetWeb} size={16} />
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3]">{t.s1Label}</span>
            </div>

            <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#333] w-full text-center">
              {t.s1H1a}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
                {t.s1H1b}
              </span>
            </h1>

            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] text-center w-full">
              {t.s1Sub}
            </p>

            <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
              {S1_FEAT_ICONS.map((f, i) => (
                <div key={i} className="flex flex-[1_0_0] flex-col gap-[10px] items-center min-w-[180px]">
                  <div className="flex items-center justify-center size-[40px] rounded-[12px] p-[10px]" style={{ backgroundColor: f.bg }}>
                    <FigmaIcon src={f.icon} size={20} aspectW={f.aspectW} aspectH={f.aspectH} />
                  </div>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#07235c] text-center w-full">{t.s1Features[i].title}</p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center w-full">{t.s1Features[i].desc}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-[10px] items-center justify-center">
              <DotAtivo />
              <DotInativo onClick={() => setSlide(1)} aria-label="ir para slide 2" />
            </div>

            <div
              className="flex items-end justify-end w-full max-w-[800px] cursor-pointer"
              style={{ minHeight: "254px" }}
              onClick={() => setSlide(1)}
              aria-label="Próximo slide"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSlide(1)}
            >
              <div className="relative w-full" style={{ aspectRatio: "3160/2300" }}>
                <img src={imgMockup} alt="Acquafy Platform Mockup" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex flex-wrap gap-[20px] items-center justify-center max-w-[720px] w-full">
              <a href="/linha-neo" className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                <span className="font-['Articulat_CF:Bold'] text-[16px] text-white flex-1 text-center">{t.s1Cta1}</span>
                <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
              </a>
              <a href="/compare" className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors flex-1 text-center">{t.s1Cta2mob}</span>
                <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                  <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0"><FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} /></div>
                  <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100"><FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} /></div>
                </div>
              </a>
            </div>
          </>
        )}

        {/* === SLIDE 2 - mobile === */}
        {slide === 1 && (
          <>
            <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
              <FigmaIcon src={imgGiftLabel} size={16} />
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(126deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
                {t.s2Label}
              </span>
            </div>

            <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#333] w-full text-center">
              {t.s2H1a}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0233c3] to-[#9f3df5]">
                {t.s2H1b}
              </span>
            </h1>

            <div className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] text-center w-full flex flex-col gap-[26px]">
              <p>{t.s2SubMobP1}</p>
              <p>{t.s2SubMobP2}
                <span className="font-['Avenir_LT_Pro:85_Heavy'] bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(116.55deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
                  Acquafy Neo UP.
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full">
              {S2_CARD_ICONS.map((f, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.4)] border border-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-h-[60px] min-w-[180px] p-[20px] rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
                  <FigmaIcon src={f.icon} size={40} aspectW={f.aspectW} aspectH={f.aspectH} />
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#333] text-center w-full min-h-[44px]">{t.s2Cards[i].label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-[10px] items-center justify-center">
              <DotInativo onClick={() => setSlide(0)} aria-label="ir para slide 1" />
              <DotAtivo />
            </div>

            <div
              className="relative w-full overflow-hidden rounded-[16px] cursor-pointer"
              style={{ height: 508 }}
              onClick={() => setSlide(0)}
              aria-label="Slide anterior"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSlide(0)}
            >
              <img src={imgFrame36} alt="Acquafy Neo UP" className="absolute inset-0 w-full h-full object-cover" />
            </div>

            <div className="flex flex-wrap gap-[20px] items-center justify-center max-w-[720px] w-full">
              <GiftCard earn={t.giftEarn} inText={t.giftIn} />
            </div>
          </>
        )}
      </div>

      {/* ══ DESKTOP LAYOUT (xl+) ══ */}
      <div
        className="hidden xl:flex relative flex-1 flex-col gap-[20px] items-center justify-center w-full"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (!target.closest("button, a")) setSlide((s) => (s + 1) % 2);
        }}
      >
        <div className={`relative flex xl:flex-row xl:items-center xl:flex-1 gap-[40px] items-center max-w-[1400px] w-full ${slide === 0 ? "justify-center" : "justify-start"}`}>

          {/* LEFT COLUMN */}
          <div className={`flex flex-col gap-[20px] items-start justify-center flex-1 min-w-[280px] ${slide === 0 ? "max-w-[580px]" : "max-w-[680px]"}`}>

            {/* Label */}
            {slide === 0 ? (
              <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
                <FigmaIcon src={imgPlanetWeb} size={16} />
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3]">{t.s1Label}</span>
              </div>
            ) : (
              <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
                <FigmaIcon src={imgGiftLabel} size={16} />
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(126deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>{t.s2Label}</span>
              </div>
            )}

            {/* H1 */}
            {slide === 0 ? (
              <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#333] w-full">
                {t.s1H1a}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>{t.s1H1b}</span>
              </h1>
            ) : (
              <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#333] w-full">
                {t.s2H1a}<br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to bottom, #0233c3, #9f3df5)" }}>{t.s2H1b}</span>
              </h1>
            )}

            {/* Subtitle */}
            {slide === 0 ? (
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] w-full">
                {t.s1Sub}
              </p>
            ) : (
              <div className="flex flex-col gap-[12px] w-full">
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333]">{t.s2SubDeskP1}</p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333]">
                  {t.s2SubDeskP2}
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(116.55deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>Acquafy Neo UP.</span>
                </p>
              </div>
            )}

            {/* Feature items */}
            {slide === 0 ? (
              <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
                {S1_FEAT_ICONS.map((f, i) => (
                  <div key={i} className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-[180px]">
                    <div className="flex items-center justify-center size-[40px] rounded-[12px] p-[10px]" style={{ backgroundColor: f.bg }}>
                      <FigmaIcon src={f.icon} size={20} aspectW={f.aspectW} aspectH={f.aspectH} />
                    </div>
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#07235c] w-full">{t.s1Features[i].title}</p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">{t.s1Features[i].desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full">
                {S2_CARD_ICONS.map((f, i) => (
                  <div key={i} className="bg-[rgba(255,255,255,0.4)] border border-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-h-[60px] min-w-[180px] p-[20px] rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
                    <FigmaIcon src={f.icon} size={40} aspectW={f.aspectW} aspectH={f.aspectH} />
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#333] text-center w-full min-h-[44px]">{t.s2Cards[i].label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            {slide === 0 ? (
              <div className="flex flex-wrap gap-[20px] items-center justify-start w-full">
                <a href="/linha-neo" className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                  <span className="font-['Articulat_CF:Bold'] text-[16px] text-white flex-1 text-center">{t.s1Cta1}</span>
                  <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
                </a>
                <a href="/plataforma" className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                  <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors flex-1 text-center">{t.s1Cta2desk}</span>
                  <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                    <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0"><FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} /></div>
                    <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100"><FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} /></div>
                  </div>
                </a>
              </div>
            ) : (
              <div className="flex flex-wrap gap-[20px] items-center justify-center w-full">
                <GiftCard earn={t.giftEarn} inText={t.giftIn} />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN — slide 0 only */}
          {slide === 0 && (
            <div className="flex flex-1 items-end justify-end min-w-px">
              <div className="relative w-full" style={{ aspectRatio: "3160/2300" }}>
                <img src={imgMockup} alt="Acquafy Platform Mockup" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>

        {/* Desktop dots */}
        <div className="flex gap-[10px] items-center justify-center">
          {slide === 0 ? (
            <>
              <DotAtivo />
              <DotInativo onClick={() => setSlide(1)} aria-label="ir para slide 2" />
            </>
          ) : (
            <>
              <DotInativo onClick={() => setSlide(0)} aria-label="ir para slide 1" />
              <DotAtivo />
            </>
          )}
        </div>
      </div>

      {/* ══ STATS BAR ══ */}
      {slide === 0 ? (
        <div className="relative bg-[#0233c3] flex flex-wrap gap-y-[30px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] py-[25px] rounded-[16px] w-full">
          {STATS1_ICONS.map((stat, i) => {
            const text = t.stats1[i];
            return (
              <div key={i} className="flex flex-[1_0_0] gap-[10px] items-center justify-center min-w-[160px] px-[10px]">
                <FigmaIcon src={stat.icon} size={30} aspectW={stat.aspectW} aspectH={stat.aspectH} />
                <div className="flex flex-col gap-[2px]">
                  {"lines" in text ? text.lines.map((l, li) => (
                    <span key={li} className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white">{l}</span>
                  )) : (
                    <>
                      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white">{text.top}</span>
                      <span className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-white">{text.bottom}</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="relative bg-white flex flex-col xl:flex-row gap-[30px] xl:gap-x-[20px] items-center justify-center max-w-[1400px] min-h-[85px] overflow-hidden px-[20px] py-[25px] rounded-[16px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)] w-full">
          <div className="flex flex-[1_0_0] gap-[10px] items-center min-w-[240px] max-w-[480px]">
            <FigmaIcon src={imgAguaPura} size={30} />
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] flex-1 min-w-px">
              {t.stats2tag[0]}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(164.34deg, #0233c3 5.42%, #9f3df5 28.68%)" }}>{t.stats2tag[1]}</span>
            </p>
          </div>
          <div className="flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-between min-w-px">
            {t.stats2rules.map((text) => (
              <div key={text} className="drop-shadow-[0px_0px_2px_rgba(0,0,0,0.1)] flex flex-[1_0_0] gap-[10px] items-center min-w-[180px] rounded-[12px]">
                <FigmaIcon src={imgShield} size={24} aspectW={26.14} aspectH={30} />
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#333] flex-1 min-w-px">{text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
