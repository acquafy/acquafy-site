"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg         = "/figma-assets/bg-desktop-lg.webp"; // lg+ bg fullscreen (≥1024px)
const imgBannerCard = "/figma-assets/banner-card-mobile.webp"; // mobile card (<1024px)
const imgGlobe      = "/figma-assets/icon-globe-badge.svg"; // badge globe  sq
const imgUsa        = "/figma-assets/flag-usa-sq.svg"; // USA flag     sq
const imgInterfyIcon= "/figma-assets/icon-interfy.svg"; // Interfy icon sq
const imgMobile     = "/figma-assets/icon-mobile-21px.svg"; // Mobile icon  21×30 portrait
const imgArrowWhite = "/figma-assets/icon-arrow-white-solid-btn.svg"; // white arrow  (solid btn)
const imgArrowBlue  = "/figma-assets/icon-arrow-blue-outline-c.svg"; // blue arrow   (outline btn)
const imgAI         = "/figma-assets/icon-ai-40px.svg"; // AI IA        40×40 sq
const imgWater      = "/figma-assets/icon-water-bubble-40px.svg"; // water bubble 40×40 sq
const imgGlobe2     = "/figma-assets/icon-globe-connectivity-40px.svg"; // connectivity 40×40 sq
const imgSustent    = "/figma-assets/icon-sustent-b.svg"; // sustainability sq

// ── Translations ──────────────────────────────────────────────────────────────
type PillItem = {
  icon: string; iconAlt: string; sub: string; title: string;
  aspectW?: number; aspectH?: number;
};

type BottomFeatureItem = {
  icon: string; iconAlt: string; title: string; description: string;
};

const T: Record<Lang, {
  headingPrefix: string;
  para1: string;
  para2: string;
  pillItems: Pick<PillItem, "sub" | "title">[];
  btn1: string;
  btn2: string;
  bottomFeatures: Pick<BottomFeatureItem, "title" | "description">[];
}> = {
  pt: {
    headingPrefix: "Sobre a ",
    para1: "Nossa missão é transformar o acesso à água de qualidade e melhorar vidas.",
    para2: "A Acquafy une tecnologia, inteligência artificial, conectividade e design premium para oferecer soluções modernas de purificação, gestão e experiência da água para casas, empresas e operações globais.",
    pillItems: [
      { sub: "100% americana",     title: "Fundada nos EUA em 2020" },
      { sub: "Parte do",           title: "Interfy Group" },
      { sub: "Presença global com", title: "App + IoT + Acquafy AI" },
    ],
    btn1: "Conheça nossa história",
    btn2: "Fale com nossa equipe",
    bottomFeatures: [
      { title: "Tecnologia + IA",     description: "Inteligência artificial aplicada à experiência da água" },
      { title: "Purificação premium",  description: "Água pura, segura e de qualidade superior" },
      { title: "Conectividade global", description: "Soluções inteligentes com IoT e gestão em tempo real" },
      { title: "Sustentabilidade",     description: "Impacto positivo para pessoas, comunidades e o planeta" },
    ],
  },
  en: {
    headingPrefix: "About ",
    para1: "Our mission is to transform access to quality water and improve lives.",
    para2: "Acquafy combines technology, artificial intelligence, connectivity and premium design to offer modern solutions for water purification, management and experience for homes, businesses and global operations.",
    pillItems: [
      { sub: "100% American",      title: "Founded in the USA in 2020" },
      { sub: "Part of",            title: "Interfy Group" },
      { sub: "Global presence with", title: "App + IoT + Acquafy AI" },
    ],
    btn1: "Our Story",
    btn2: "Talk to Our Team",
    bottomFeatures: [
      { title: "Technology + AI",     description: "Artificial intelligence applied to the water experience" },
      { title: "Premium Purification", description: "Pure, safe water of superior quality" },
      { title: "Global Connectivity",  description: "Smart solutions with IoT and real-time management" },
      { title: "Sustainability",        description: "Positive impact for people, communities and the planet" },
    ],
  },
  es: {
    headingPrefix: "Sobre ",
    para1: "Nuestra misión es transformar el acceso al agua de calidad y mejorar vidas.",
    para2: "Acquafy une tecnología, inteligencia artificial, conectividad y diseño premium para ofrecer soluciones modernas de purificación, gestión y experiencia del agua para hogares, empresas y operaciones globales.",
    pillItems: [
      { sub: "100% americana",     title: "Fundada en EE.UU. en 2020" },
      { sub: "Parte del",          title: "Interfy Group" },
      { sub: "Presencia global con", title: "App + IoT + Acquafy AI" },
    ],
    btn1: "Nuestra Historia",
    btn2: "Habla con Nuestro Equipo",
    bottomFeatures: [
      { title: "Tecnología + IA",     description: "Inteligencia artificial aplicada a la experiencia del agua" },
      { title: "Purificación premium", description: "Agua pura, segura y de calidad superior" },
      { title: "Conectividad global",  description: "Soluciones inteligentes con IoT y gestión en tiempo real" },
      { title: "Sostenibilidad",        description: "Impacto positivo para personas, comunidades y el planeta" },
    ],
  },
};

// ── Static pill icon/alt data (no translation needed) ─────────────────────────
const pillIconData: Pick<PillItem, "icon" | "iconAlt" | "aspectW" | "aspectH">[] = [
  { icon: imgUsa,         iconAlt: "EUA" },
  { icon: imgInterfyIcon, iconAlt: "Interfy Group" },
  { icon: imgMobile,      iconAlt: "App + IoT", aspectW: 21, aspectH: 30 },
];

const bottomIconData: Pick<BottomFeatureItem, "icon" | "iconAlt">[] = [
  { icon: imgAI,      iconAlt: "Tecnologia + IA" },
  { icon: imgWater,   iconAlt: "Purificação premium" },
  { icon: imgGlobe2,  iconAlt: "Conectividade global" },
  { icon: imgSustent, iconAlt: "Sustentabilidade" },
];

// ── Feature pill — mobile (<lg): horizontal (ícone + texto lado a lado) ────────
function FeaturePill({ icon, iconAlt, aspectW, aspectH, sub, title }: PillItem) {
  return (
    <div className="flex flex-[1_0_0] flex-row gap-[10px] items-center min-w-[240px]">
      <div className="bg-white flex flex-col items-center justify-center p-[12px] rounded-full shrink-0 size-[60px]">
        <FigmaIcon src={icon} alt={iconAlt} size={36} aspectW={aspectW} aspectH={aspectH} />
      </div>
      <div className="flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px">
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#2a2a2b] w-full">{sub}</p>
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-[#2a2a2b] w-full">{title}</p>
      </div>
    </div>
  );
}

// ── Feature pill — desktop (lg+): vertical ────────────────────────────────────
function FeaturePillDesktop({ icon, iconAlt, aspectW, aspectH, sub, title }: PillItem) {
  return (
    <div className="flex flex-[1_0_0] flex-col gap-[10px] items-center min-w-px">
      <div className="bg-white flex flex-col items-center justify-center p-[12px] rounded-full shrink-0 size-[60px]">
        <FigmaIcon src={icon} alt={iconAlt} size={36} aspectW={aspectW} aspectH={aspectH} />
      </div>
      <div className="flex flex-col gap-[6px] items-start justify-center text-center w-full">
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#2a2a2b] w-full">{sub}</p>
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-[#2a2a2b] w-full">{title}</p>
      </div>
    </div>
  );
}

// ── Bottom feature card ────────────────────────────────────────────────────────
function BottomFeature({ icon, iconAlt, title, description }: BottomFeatureItem) {
  return (
    <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[160px] win-1280:flex-row win-1280:flex-wrap">
      <FigmaIcon src={icon} alt={iconAlt} size={40} />
      <div className="flex flex-[1_0_0] flex-col gap-[15px] items-start min-w-[200px] text-center win-1280:text-left">
        <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] w-full">{title}</p>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#2a2a2b] w-full">{description}</p>
      </div>
    </div>
  );
}

// ── CTA buttons ───────────────────────────────────────────────────────────────
function CTAButtons({ stretch = false, btn1, btn2 }: { stretch?: boolean; btn1: string; btn2: string }) {
  return (
    <div className={`flex flex-wrap gap-[20px] items-center ${stretch ? "justify-center max-w-[800px] w-full" : "justify-center xl:justify-start w-full"}`}>
      <a href="#quem-somos" className={`flex gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors cursor-pointer no-underline ${stretch ? "flex-[1_0_0]" : "shrink-0"}`}>
        <span className="font-['Articulat_CF:Bold'] text-[16px] leading-normal text-white flex-1 text-center">
          {btn1}
        </span>
        <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
      </a>
      <a href="/contato" className={`group flex gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors cursor-pointer no-underline ${stretch ? "flex-[1_0_0]" : "shrink-0"}`}>
        <span className="font-['Articulat_CF:Bold'] text-[16px] leading-normal text-[#0233c3] group-hover:text-white group-active:text-white transition-colors flex-1 text-center">
          {btn2}
        </span>
        <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
          <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0">
            <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
          </div>
          <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100">
            <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
          </div>
        </div>
      </a>
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
function Badge() {
  return (
    <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center px-[12px] py-[8px] rounded-full shrink-0">
      <FigmaIcon src={imgGlobe} size={16} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
        GLOBAL SMART WATER PLATFORM
      </p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function SobreBanner() {
  const { lang } = useLang();
  const t = T[lang];

  const pillItems: PillItem[] = pillIconData.map((icon, i) => ({
    ...icon,
    ...t.pillItems[i],
  }));

  const bottomFeatures: BottomFeatureItem[] = bottomIconData.map((icon, i) => ({
    ...icon,
    ...t.bottomFeatures[i],
  }));

  return (
    <section className="relative flex flex-col gap-[20px] items-center px-[20px] py-[40px] w-full overflow-hidden xl:h-[calc(100vh-80px)]">

      {/* Background — apenas lg+ (≥1024px); hidden no mobile */}
      <img
        alt=""
        className="hidden lg:block absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      {/* ══ MOBILE (<lg = <1024px) ══════════════════════════════════════════ */}
      <div className="lg:hidden relative flex flex-col gap-[20px] items-center w-full">

        <Badge />

        <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#2a2a2b] text-center w-full">
          {t.headingPrefix}<span className="text-[#0569ff]">Acquafy</span>
        </h1>

        <div className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] text-[#333] text-center">
          <p className="leading-[26px] mb-[4px]">
            {t.para1}
          </p>
          <p className="leading-[26px]">
            {t.para2}
          </p>
        </div>

        {/* Pills horizontais */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {pillItems.map((p) => <FeaturePill key={p.title} {...p} />)}
        </div>

        <CTAButtons stretch btn1={t.btn1} btn2={t.btn2} />

        {/* Card de imagem */}
        <div className="relative h-[380px] min-w-[280px] rounded-[16px] w-full overflow-hidden shrink-0">
          <img
            alt="Acquafy Global Smart Water"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            src={imgBannerCard}
          />
        </div>
      </div>

      {/* ══ DESKTOP (lg+ = ≥1024px) ═════════════════════════════════════════ */}
      <div className="hidden lg:flex flex-1 items-center justify-center max-w-[1400px] w-full relative">
        <div className="flex flex-wrap items-center w-full">

          {/* Coluna esquerda */}
          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start justify-center max-w-[650px] min-w-[280px]">

            <Badge />

            <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero text-[#2a2a2b]">
              {t.headingPrefix}<span className="text-[#0569ff]">Acquafy</span>
            </h1>

            <div className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] text-[#333]">
              <p className="leading-[26px] mb-[4px]">
                {t.para1}
              </p>
              <p className="leading-[26px]">
                {t.para2}
              </p>
            </div>

            {/* Pills verticais */}
            <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
              {pillItems.map((p) => <FeaturePillDesktop key={p.title} {...p} />)}
            </div>

            <CTAButtons btn1={t.btn1} btn2={t.btn2} />
          </div>

          {/* Coluna direita — espaçador (bg image preenche) */}
          <div className="flex-[1_0_0] min-w-[240px]" />
        </div>
      </div>

      {/* ══ BOTTOM INFO BAR — sempre ════════════════════════════════════════ */}
      <div
        className="relative flex flex-wrap gap-[30px_20px] items-start justify-center overflow-hidden px-[20px] py-[40px] rounded-[16px] w-full max-w-[1400px]"
        style={{ backgroundImage: "linear-gradient(92deg, rgb(243, 250, 255) 0%, rgb(206, 239, 255) 100%)" }}
      >
        {bottomFeatures.map((f) => <BottomFeature key={f.title} {...f} />)}
      </div>
    </section>
  );
}
