"use client";
import { useState } from "react";
import FigmaIcon from "./FigmaIcon";
import { DotAtivo, DotInativo } from "./ui/SlideDot";

// Backgrounds
const imgBg1    = "/figma-assets/36b2eff1-2b33-46c0-8363-af973ac799ec.png";  // slide 1 bg
const imgBg2    = "/figma-assets/5f4ea0b5-ed23-45a8-bee1-2ec2a8de6512.png";  // slide 2 bg (xl only)
// Images
const imgMockup  = "/figma-assets/79b198a1-9b67-4b7a-ab37-b3fc0c922bf7.png"; // tablet+phone mockup
const imgFrame36 = "/figma-assets/4cb6efdd-3d77-46ca-a4b9-148e9c882ed6.png"; // slide 2 mobile product (water+purifier)
// Slide 1 feature icons
const imgPlanetWeb = "/figma-assets/5fb42ebd-d9de-4d78-8bb1-89d82c384f8d.svg";  // 30×30 sq
const imgCloud     = "/figma-assets/d8408d46-680e-4b13-84fc-1c8813e1fcc3.svg";  // 30×22 landscape
const imgAI        = "/figma-assets/8a506687-f9ca-4906-9a82-366de1c115c9.svg";  // 30×30 sq
const imgGlobe     = "/figma-assets/c52ebd87-4575-46c6-a6e1-60989b0ec6ed.svg";  // 30×30 sq
// Slide 2 icons
const imgGiftLabel = "/figma-assets/88ef1f41-2868-4826-ab06-7e03ba2c893a.svg";  // 642×642 sq (label pill)
const imgFiltros   = "/figma-assets/2f3be640-3970-4223-b08a-afd98104f3e4.svg";  // 40×40 sq
const imgWater20   = "/figma-assets/7a8d21cc-5b03-4311-9eed-38704fb8a2e1.svg";  // 35×42 portrait
const imgPlugPlay  = "/figma-assets/414af198-9adf-46f5-8ceb-106d2737b4f2.svg";  // 485×629 portrait
const imgGiftCTA   = "/figma-assets/92c2449f-030e-410b-af27-15e502e12581.svg";  // sq
// Arrows (11.2×8.84 landscape → size={9} aspectW={11.2} aspectH={8.84})
const imgArrowWhite = "/figma-assets/9777bc4a-58de-46e7-8e46-08e99069f337.svg"; // solid buttons
const imgArrowBlue  = "/figma-assets/4e468b96-c90e-4821-837b-9780c1f0b21f.svg"; // outline buttons
// Stats bar icons (slide 1 blue bar)
const imgGlobeStats  = "/figma-assets/420aed90-b633-4721-bc7c-59d9f7afa84c.svg";  // 30×30
const imgChatStats   = "/figma-assets/797bd891-2d3e-47db-9bbd-3b40039f7893.svg";  // 30×30
const imgMobileStats = "/figma-assets/a9cea2bd-8708-4035-8d92-82cbfbe0f611.svg";  // 21×30 portrait
const imgWifiStats   = "/figma-assets/34df8d8b-2f8a-4654-ade0-638212a06bac.svg";  // 30×20 landscape
const imgPessoasStats = "/figma-assets/d3b3f330-1f05-436b-b8a1-eda6f97129c8.svg"; // 43.86×40.50
const imgMediaStats  = "/figma-assets/db87edd0-3921-4643-acea-15ccf6e50e94.svg";  // 26.67×26.67 sq
// Slide 2 stats bar icons
const imgAguaPura = "/figma-assets/a434656b-3ab0-4bd1-a93e-205854e10266.svg";   // 30×30 sq
const imgShield   = "/figma-assets/df899977-c36b-49b5-8a28-64d40fad415e.svg";   // 26.14×30 portrait

// ─── Gradient constants ─────────────────────────────────────────────────────

const gdBase    = { backgroundImage: "linear-gradient(104deg, #0233c3 6.19%, #9f3df5 93.35%)" };
const gdHover   = { backgroundImage: "linear-gradient(104deg, #002ba8 6.19%, #6e0cc3 93.35%)" };
const gdPressed = { backgroundImage: "linear-gradient(104deg, #0569ff 6.19%, #b25efb 93.35%)" };

// ─── Sub-components ─────────────────────────────────────────────────────────

function GradientCTAButton({ className = "" }: { className?: string }) {
  return (
    <button
      className={`flex gap-[10px] items-center justify-center min-h-[60px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer ${className}`}
      style={gdBase}
      onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdHover)}
      onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLButtonElement).style, gdBase)}
      onMouseDown={(e)  => Object.assign((e.currentTarget as HTMLButtonElement).style, gdPressed)}
      onMouseUp={(e)    => Object.assign((e.currentTarget as HTMLButtonElement).style, gdBase)}
    >
      <span className="font-['Articulat_CF:Bold'] text-[16px] text-white">Conheça o Neo UP</span>
      <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
    </button>
  );
}

function GiftCard() {
  return (
    <div className="bg-[rgba(255,255,255,0.4)] border border-white flex flex-[1_0_0] flex-wrap gap-[10px] items-center justify-center min-h-[60px] min-w-[190px] px-[20px] py-[5px] rounded-[16px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
      <div className="bg-[rgba(255,255,255,0.4)] border border-white flex flex-col items-center justify-center p-[10px] rounded-full size-[41px] shrink-0 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
        <FigmaIcon src={imgGiftCTA} size={20} />
      </div>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] flex-1 min-w-[100px]">
        Ganhe{" "}
        <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] bg-clip-text text-transparent bg-gradient-to-b from-[#0233c3] to-[#9f3df5]">R$100,00</span>
        {" "}no Brasil
      </p>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export default function Hero() {
  const [slide, setSlide] = useState(0);
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
            {/* Label pill — centered */}
            <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
              <FigmaIcon src={imgPlanetWeb} size={16} />
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3]">NOVA FASE GLOBAL</span>
            </div>

            {/* H1 — centered */}
            <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] text-[#333] w-full text-center">
              {"Plataforma Inteligente para "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
                Água de Qualidade
              </span>
            </h1>

            {/* Subtitle — centered */}
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333] text-center w-full">
              A Acquafy conecta produtos inteligentes, filtros de alta performance, App + AI, parceiros globais e recorrência para transformar a forma como o mundo consome água.
            </p>

            {/* Feature cards — icon+title centered, desc centered */}
            <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
              {[
                { bg: "#0233c3", icon: imgCloud, aspectW: 30, aspectH: 22, title: "Acquafy Platform", desc: "Infraestrutura segura e escalável na nuvem para máxima performance" },
                { bg: "#7a16d2", icon: imgAI,   aspectW: 30, aspectH: 30, title: "App + AI",          desc: "Inteligência artificial integrada para decisões mais rápidas e eficientes." },
                { bg: "#36ae5c", icon: imgGlobe, aspectW: 30, aspectH: 30, title: "Gestão Global",    desc: "Visão completa do negócio com dados em tempo real em qualquer lugar." },
              ].map((f) => (
                <div key={f.title} className="flex flex-[1_0_0] flex-col gap-[10px] items-center min-w-[180px]">
                  <div className="flex items-center justify-center size-[40px] rounded-[12px] p-[10px]" style={{ backgroundColor: f.bg }}>
                    <FigmaIcon src={f.icon} size={20} aspectW={f.aspectW} aspectH={f.aspectH} />
                  </div>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-[#07235c] text-center w-full">{f.title}</p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center w-full">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* DOTS — between features and mockup (Figma order) */}
            <div className="flex gap-[10px] items-center justify-center">
              <DotAtivo />
              <DotInativo onClick={() => setSlide(1)} aria-label="ir para slide 2" />
            </div>

            {/* Mockup image — max-w-800, aspect 3016/1916, aligned to bottom-right */}
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

            {/* CTA buttons — centered, max-w-720, full-width each */}
            <div className="flex flex-wrap gap-[20px] items-center justify-center max-w-[720px] w-full">
              <button className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                <span className="font-['Articulat_CF:Bold'] text-[16px] text-white flex-1 text-center">Conheça a Linha Neo</span>
                <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
              </button>
              <button className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors flex-1 text-center">Seja Parceiro Global</span>
                <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                  <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0"><FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} /></div>
                  <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100"><FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} /></div>
                </div>
              </button>
            </div>
          </>
        )}

        {/* === SLIDE 2 - mobile === */}
        {slide === 1 && (
          <>
            {/* Label pill — gradient text */}
            <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
              <FigmaIcon src={imgGiftLabel} size={16} />
              <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(126deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
                CAMPANHA ACQUAFY
              </span>
            </div>

            {/* H1 — centered, gradient bottom portion */}
            <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] text-[#333] w-full text-center">
              {"Água de qualidade "}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0233c3] to-[#9f3df5]">
                não deve ser privilégio.
              </span>
            </h1>

            {/* Subtitle — DIFFERENT TEXT for mobile (Figma node 3241:4219): longer paragraph */}
            <div className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333] text-center w-full flex flex-col gap-[26px]">
              <p>A Acquafy combina tecnologia, inteligência artificial, conectividade e sustentabilidade para transformar a forma como pessoas, empresas e comunidades acessam água pura e de qualidade em todo o mundo.</p>
              <p>Faça um upgrade do seu purificador antigo para o novo{" "}
                <span className="font-['Avenir_LT_Pro:85_Heavy'] bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(116.55deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
                  Acquafy Neo UP.
                </span>
              </p>
            </div>

            {/* Glass feature cards — items-stretch */}
            <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full">
              {[
                { icon: imgFiltros,  aspectW: 40,  aspectH: 40,  label: "4 filtros de alta performance" },
                { icon: imgWater20,  aspectW: 35,  aspectH: 42,  label: "20 estágios de tratamento" },
                { icon: imgPlugPlay, aspectW: 485, aspectH: 629, label: "Plug & Play" },
              ].map((f) => (
                <div key={f.label} className="bg-[rgba(255,255,255,0.4)] border border-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-h-[60px] min-w-[180px] p-[20px] rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
                  <FigmaIcon src={f.icon} size={40} aspectW={f.aspectW} aspectH={f.aspectH} />
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-[#333] text-center w-full min-h-[44px]">{f.label}</p>
                </div>
              ))}
            </div>

            {/* DOTS — inactive (left→slide1) + active (right) */}
            <div className="flex gap-[10px] items-center justify-center">
              <DotInativo onClick={() => setSlide(0)} aria-label="ir para slide 1" />
              <DotAtivo />
            </div>

            {/* Product image — full-width, h-508, rounded, imgFrame36 */}
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

            {/* CTA row: gradient button cresce para preencher, gift card ao lado */}
            <div className="flex flex-wrap gap-[20px] items-center justify-center max-w-[720px] w-full">
              <GradientCTAButton className="flex-[1_0_0] min-w-[190px]" />
              <GiftCard />
            </div>
          </>
        )}
      </div>

      {/* ══ DESKTOP LAYOUT (xl+) ══ */}
      <div
        className="hidden xl:flex relative flex-1 flex-col gap-[20px] items-center justify-center w-full"
        onClick={(e) => {
          const t = e.target as HTMLElement;
          if (!t.closest("button, a")) setSlide((s) => (s + 1) % 2);
        }}
      >

        {/* Main content area — slide 1: row (content + mockup), slide 2: just content (left-aligned) */}
        <div className={`relative flex xl:flex-row xl:items-center xl:min-h-[660px] gap-[40px] items-center max-w-[1400px] w-full ${slide === 0 ? "justify-center" : "justify-start"}`}>

          {/* LEFT COLUMN */}
          <div className={`flex flex-col gap-[20px] items-start justify-center flex-1 min-w-[280px] ${slide === 0 ? "max-w-[580px]" : "max-w-[680px]"}`}>

            {/* Label */}
            {slide === 0 ? (
              <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
                <FigmaIcon src={imgPlanetWeb} size={16} />
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3]">NOVA FASE GLOBAL</span>
              </div>
            ) : (
              <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
                <FigmaIcon src={imgGiftLabel} size={16} />
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(126deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>CAMPANHA ACQUAFY</span>
              </div>
            )}

            {/* H1 */}
            {slide === 0 ? (
              <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] text-[#333] w-full">
                {"Plataforma Inteligente para "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>Água de Qualidade</span>
              </h1>
            ) : (
              <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[56px] leading-[60px] text-[#333] w-full">
                Água de qualidade<br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to bottom, #0233c3, #9f3df5)" }}>não deve ser privilégio.</span>
              </h1>
            )}

            {/* Subtitle */}
            {slide === 0 ? (
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333] w-full">
                A Acquafy conecta produtos inteligentes, filtros de alta performance, App + AI, parceiros globais e recorrência para transformar a forma como o mundo consome água.
              </p>
            ) : (
              <div className="flex flex-col gap-[12px] w-full">
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333]">A Acquafy torna a água pura mais acessível, com tecnologia global, design premium e benefícios reais para o seu dia a dia.</p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333]">
                  {"Faça um upgrade do seu purificador antigo para o novo "}
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(116.55deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>Acquafy Neo UP.</span>
                </p>
              </div>
            )}

            {/* Feature items */}
            {slide === 0 ? (
              <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
                {[
                  { bg: "#0233c3", icon: imgCloud,  aspectW: 30, aspectH: 22, title: "Acquafy Platform", desc: "Infraestrutura segura e escalável na nuvem para máxima performance" },
                  { bg: "#7a16d2", icon: imgAI,     aspectW: 30, aspectH: 30, title: "App + AI",          desc: "Inteligência artificial integrada para decisões mais rápidas e eficientes." },
                  { bg: "#36ae5c", icon: imgGlobe,  aspectW: 30, aspectH: 30, title: "Gestão Global",    desc: "Visão completa do negócio com dados em tempo real em qualquer lugar." },
                ].map((f) => (
                  <div key={f.title} className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-[180px]">
                    <div className="flex items-center justify-center size-[40px] rounded-[12px] p-[10px]" style={{ backgroundColor: f.bg }}>
                      <FigmaIcon src={f.icon} size={20} aspectW={f.aspectW} aspectH={f.aspectH} />
                    </div>
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-[#07235c] w-full">{f.title}</p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">{f.desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full">
                {[
                  { icon: imgFiltros,  aspectW: 40,  aspectH: 40,  label: "4 filtros de alta performance" },
                  { icon: imgWater20,  aspectW: 35,  aspectH: 42,  label: "20 estágios de tratamento" },
                  { icon: imgPlugPlay, aspectW: 485, aspectH: 629, label: "Plug & Play" },
                ].map((f) => (
                  <div key={f.label} className="bg-[rgba(255,255,255,0.4)] border border-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-h-[60px] min-w-[180px] p-[20px] rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
                    <FigmaIcon src={f.icon} size={40} aspectW={f.aspectW} aspectH={f.aspectH} />
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-[#333] text-center w-full min-h-[44px]">{f.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            {slide === 0 ? (
              <div className="flex flex-wrap gap-[20px] items-center justify-start w-full">
                <button className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                  <span className="font-['Articulat_CF:Bold'] text-[16px] text-white flex-1 text-center">Conheça a Linha Neo</span>
                  <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
                </button>
                <button className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[50px] min-w-[190px] overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer">
                  <span className="font-['Articulat_CF:Bold'] text-[16px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors flex-1 text-center">Seja Parceiro Global</span>
                  <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                    <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0"><FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} /></div>
                    <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100"><FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} /></div>
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-[20px] items-center justify-center w-full">
                <GradientCTAButton className="shrink-0" />
                <GiftCard />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN — só no slide 0 */}
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

      {/* ══ STATS BAR — pinned to bottom ══ */}
      {slide === 0 ? (
        <div className="relative bg-[#0233c3] flex flex-wrap gap-y-[30px] items-center justify-center max-w-[1400px] min-h-[82px] overflow-hidden px-[20px] py-[25px] rounded-[16px] w-full">
          {[
            { icon: imgGlobeStats,   aspectW: 30,    aspectH: 30,    top: "Até",           bottom: "180 países" },
            { icon: imgChatStats,    aspectW: 30,    aspectH: 30,    top: "16",             bottom: "idiomas" },
            { icon: imgMobileStats,  aspectW: 21,    aspectH: 30,    lines: ["App +", "Acquafy Ai"] },
            { icon: imgWifiStats,    aspectW: 30,    aspectH: 20,    top: "WiFi 5 +",       bottom: "Bluetooth 5.3" },
            { icon: imgPessoasStats, aspectW: 43.86, aspectH: 40.5,  lines: ["Parceiros Silver,", "Gold e Platinum"] },
            { icon: imgMediaStats,   aspectW: 26.67, aspectH: 26.67, lines: ["Acquafy", "Media Network"] },
          ].map((s, i, arr) => (
            <div key={i} className={`flex flex-[1_0_0] flex-wrap gap-[10px] items-center min-w-[160px] px-[20px]${i < arr.length - 1 ? " border-r border-white" : ""}`}>
              <FigmaIcon src={s.icon} size={30} aspectW={s.aspectW} aspectH={s.aspectH} />
              <div className="flex flex-col gap-[2px]">
                {"lines" in s ? s.lines!.map((l, li) => (
                  <span key={li} className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-white">{l}</span>
                )) : (
                  <>
                    <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-white">{s.top}</span>
                    <span className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-white">{s.bottom}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative bg-white flex flex-col xl:flex-row gap-[30px] xl:gap-x-[20px] items-center justify-center max-w-[1400px] min-h-[85px] overflow-hidden px-[20px] py-[25px] rounded-[16px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)] w-full">
          <div className="flex flex-[1_0_0] gap-[10px] items-center min-w-[240px] max-w-[480px]">
            <FigmaIcon src={imgAguaPura} size={30} />
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] flex-1 min-w-px">
              Tecnologia que transforma.{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(164.34deg, #0233c3 5.42%, #9f3df5 28.68%)" }}>Água que muda vidas.</span>
            </p>
          </div>
          <div className="flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-between min-w-px">
            {[
              "Entregue seu purificador antigo no momento da compra.",
              "Bônus não convertido em dinheiro.",
              "Válido na compra de um novo Acquafy Neo UP.",
            ].map((text) => (
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
