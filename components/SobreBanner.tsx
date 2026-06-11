"use client";
import FigmaIcon from "./FigmaIcon";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg         = "/figma-assets/04c20ac4-caf6-45c0-b736-2593118239e7.png"; // lg+ bg fullscreen (≥1024px)
const imgBannerCard = "/figma-assets/da7a9ffd-04f1-4cf0-bda1-a75e292de90e.png"; // mobile card (<1024px)
const imgGlobe      = "/figma-assets/e01680b5-6540-430f-b706-5f234b9fb2c4.svg"; // badge globe  sq
const imgUsa        = "/figma-assets/aa062646-c2ec-4ba7-8c0b-2a9f95c173a2.svg"; // USA flag     sq
const imgInterfyIcon= "/figma-assets/6f9b651a-dc3f-4563-89b9-0153ba7eb26f.svg"; // Interfy icon sq
const imgMobile     = "/figma-assets/8f0523f2-e43d-40d3-8c65-144aa8a9eca2.svg"; // Mobile icon  21×30 portrait
const imgArrowWhite = "/figma-assets/201ff0b4-75aa-471b-9b9e-a5f4bb928ae1.svg"; // white arrow  (solid btn)
const imgArrowBlue  = "/figma-assets/3f65252b-7a31-4697-87df-162dc740ef03.svg"; // blue arrow   (outline btn)
const imgAI         = "/figma-assets/0b38c63f-f4ef-48ed-8fc2-3b7d2f1f0075.svg"; // AI IA        40×40 sq
const imgWater      = "/figma-assets/14eb6e5a-67c1-4ab7-aea9-7efda79cf374.svg"; // water bubble 40×40 sq
const imgGlobe2     = "/figma-assets/6aa12ed6-c1cb-4216-87a9-a0ca3b8b206d.svg"; // connectivity 40×40 sq
const imgSustent    = "/figma-assets/7ee71bdc-5362-4a54-93af-88ae79a69469.svg"; // sustainability sq

// ── Pill & bottom data ────────────────────────────────────────────────────────
type PillItem = {
  icon: string; iconAlt: string; sub: string; title: string;
  aspectW?: number; aspectH?: number;
};

const pillItems: PillItem[] = [
  { icon: imgUsa,          iconAlt: "EUA",           sub: "100% americana",     title: "Fundada nos EUA em 2020" },
  { icon: imgInterfyIcon,  iconAlt: "Interfy Group",  sub: "Parte do",           title: "Interfy Group" },
  { icon: imgMobile,       iconAlt: "App + IoT",      sub: "Presença global com", title: "App + IoT + Acquafy AI",
    aspectW: 21, aspectH: 30 },
];

const bottomFeatures = [
  { icon: imgAI,      iconAlt: "Tecnologia + IA",     title: "Tecnologia + IA",     description: "Inteligência artificial aplicada à experiência da água" },
  { icon: imgWater,   iconAlt: "Purificação premium",  title: "Purificação premium",  description: "Água pura, segura e de qualidade superior" },
  { icon: imgGlobe2,  iconAlt: "Conectividade global", title: "Conectividade global", description: "Soluções inteligentes com IoT e gestão em tempo real" },
  { icon: imgSustent, iconAlt: "Sustentabilidade",     title: "Sustentabilidade",     description: "Impacto positivo para pessoas, comunidades e o planeta" },
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
function BottomFeature({ icon, iconAlt, title, description }: {
  icon: string; iconAlt: string; title: string; description: string;
}) {
  return (
    <div className="flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center min-w-[160px] px-[20px]">
      <FigmaIcon src={icon} alt={iconAlt} size={40} />
      <div className="flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-[200px] max-[1340px]:items-center">
        <p className="flex items-center font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] min-h-[44px] max-[1340px]:text-center max-[1340px]:justify-center">{title}</p>
        <p className="flex items-center font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#2a2a2b] min-h-[42px] max-[1340px]:text-center max-[1340px]:justify-center">{description}</p>
      </div>
    </div>
  );
}

// ── CTA buttons ───────────────────────────────────────────────────────────────
function CTAButtons({ stretch = false }: { stretch?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-[20px] items-center ${stretch ? "justify-center max-w-[800px] w-full" : "w-full"}`}>
      <button className={`flex gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors cursor-pointer ${stretch ? "flex-[1_0_0]" : "shrink-0"}`}>
        <span className="font-['Articulat_CF:Bold'] text-[16px] leading-normal text-white flex-1 text-center">
          Conheça nossa história
        </span>
        <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
      </button>
      <button className={`group flex gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors cursor-pointer ${stretch ? "flex-[1_0_0]" : "shrink-0"}`}>
        <span className="font-['Articulat_CF:Bold'] text-[16px] leading-normal text-[#0233c3] group-hover:text-white group-active:text-white transition-colors flex-1 text-center">
          Fale com nossa equipe
        </span>
        <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
          <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0">
            <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
          </div>
          <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100">
            <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
          </div>
        </div>
      </button>
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
          Sobre a <span className="text-[#0569ff]">Acquafy</span>
        </h1>

        <div className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] text-[#333] text-center">
          <p className="leading-[26px] mb-[4px]">
            Nossa missão é transformar o acesso à água de qualidade e melhorar vidas.
          </p>
          <p className="leading-[26px]">
            A Acquafy une tecnologia, inteligência artificial, conectividade e design premium
            para oferecer soluções modernas de purificação, gestão e experiência da água para
            casas, empresas e operações globais.
          </p>
        </div>

        {/* Pills horizontais */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {pillItems.map((p) => <FeaturePill key={p.title} {...p} />)}
        </div>

        <CTAButtons stretch />

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
              Sobre a <span className="text-[#0569ff]">Acquafy</span>
            </h1>

            <div className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] text-[#333]">
              <p className="leading-[26px] mb-[4px]">
                Nossa missão é transformar o acesso à água de qualidade e melhorar vidas.
              </p>
              <p className="leading-[26px]">
                A Acquafy une tecnologia, inteligência artificial, conectividade e design premium
                para oferecer soluções modernas de purificação, gestão e experiência da água para
                casas, empresas e operações globais.
              </p>
            </div>

            {/* Pills verticais */}
            <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
              {pillItems.map((p) => <FeaturePillDesktop key={p.title} {...p} />)}
            </div>

            <CTAButtons />
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
