"use client";

import { useState } from "react";
import FigmaIcon from "./FigmaIcon";
import { LanguageSelectorFull } from "./ui/LanguageSelector";

// ── Assets (node 3088:5293) ───────────────────────────────────────────────────

// Logo — aspect 1133.84×187.34 (very wide landscape)
const imgLogo = "/figma-assets/6f5bb18f-2c86-41f0-9b59-630343fa83eb.svg";

// Social icons (all rendered as flex-[1_0_0] items inside 50px circles)
const imgInstagram = "/figma-assets/aabc72b3-53b3-48de-9b45-04c0f65387d7.svg";
const imgX         = "/figma-assets/5aa7ad2b-2a12-49eb-8c78-00c0199c4dc8.svg";  // X/Twitter — 1000.78×936.69
const imgLinkedin  = "/figma-assets/f4ea6344-2fc6-47b9-ae21-fce873d23dcc.svg";
const imgYoutube   = "/figma-assets/960cdca8-6974-46c1-a9ac-b31bc41555c2.svg";
const imgFacebook  = "/figma-assets/d5d59b1a-0bc2-4468-9b85-bc06c3d66451.svg";

// Arrow bullet for nav links (226×113 landscape, -rotate-90 in render)
const imgArrowBullet = "/figma-assets/b77b3d0f-48a1-419d-854e-fa054fe44533.svg";

// Stats card icons
const imgGlobe    = "/figma-assets/55efb447-146a-479b-ae89-09abb4a2313a.svg"; // PlanetWeb 30×30
const imgChat     = "/figma-assets/a9a7773a-6c01-4787-b5ee-cdfaa2865d06.svg"; // 501.71×419 landscape
const imgLocation = "/figma-assets/47574887-6271-4e08-8935-ab847007fc98.svg"; // 642×642 square
const imgMoney    = "/figma-assets/3c40590b-5e78-4445-8884-3d262f0c2bf4.svg"; // 472×440

// Bottom bar
const imgFlagUSA   = "/figma-assets/e15ad716-a373-43b3-95a4-73688ae29a6d.svg"; // 30×30
const imgGlobeSust = "/figma-assets/a303f351-9f9e-485f-9a05-f5fb6b27bfdf.svg"; // 492×475
const imgArrowDown = "/figma-assets/a9b486b8-daec-4d34-8a76-959211b81449.svg"; // 30×18 landscape

// Certification badges (5 — rendered 50×50 each)
const certLogos = [
  "/figma-assets/a6eec61f-e8fd-47df-8fcd-d036db0e875e.svg", // Frame37
  "/figma-assets/e9b3ee87-9fe1-42bd-89a4-92b8a2d8e5b2.svg", // Frame39
  "/figma-assets/56754180-c417-47a4-ac25-58bc7727a946.svg", // Frame38
  "/figma-assets/1ceab45b-cde5-42c2-a09f-b577e428f9f5.svg", // Frame35
  "/figma-assets/3602a77d-53da-4fb8-a343-f82e428682ae.svg", // Frame36
];

// ── Data ─────────────────────────────────────────────────────────────────────

const socialIcons = [
  { src: imgInstagram, alt: "Instagram",   aspectW: 30,      aspectH: 30 },
  { src: imgX,         alt: "X (Twitter)", aspectW: 1000.78, aspectH: 936.69 },
  { src: imgLinkedin,  alt: "LinkedIn",    aspectW: 30,      aspectH: 30 },
  { src: imgYoutube,   alt: "YouTube",     aspectW: 22,      aspectH: 15.5 },
  { src: imgFacebook,  alt: "Facebook",    aspectW: 30.16,   aspectH: 30 },
];

const navColumns = [
  {
    title: "Plataforma",
    links: [
      { label: "Plataforma Acquafy",            href: "/plataforma" },
      { label: "App + AI + IoT",                href: "/app-ai-iot" },
      { label: "Central de Suporte",            href: "#"           },
      { label: "Tecnologia & Sustentabilidade", href: "/tecnologia" },
    ],
  },
  {
    title: "Produtos",
    links: [
      { label: "Linha Neo",            href: "/linha-neo" },
      { label: "Acquafy Media",        href: "/neo-media" },
      { label: "Filtros & Acessórios", href: "/filtros"   },
      { label: "Compare Produtos",     href: "/compare"   },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre Nós",                   href: "/sobre"           },
      { label: "Expansão Global",             href: "/expansao-global" },
      { label: "Programa de Parceria Global", href: "#"                },
      { label: "Contatos",                    href: "/contato"         },
    ],
  },
];

const stats = [
  { icon: imgGlobe,    aspectW: 30,    aspectH: 30,    sub: "Presente em",      main: "+ de 180 países"  },
  { icon: imgChat,     aspectW: 501.7, aspectH: 419,   sub: "Disponível em",    main: "16 idiomas"       },
  { icon: imgLocation, aspectW: 642.7, aspectH: 642.7, sub: "Operação",         main: "100% global"      },
  { icon: imgMoney,    aspectW: 472,   aspectH: 440,   sub: "Modelo de receita", main: "100% recorrente" },
];

const gradientLine = { backgroundImage: "linear-gradient(146.8deg, #3447d2 4.03%, #0035c1 124%)" };

// ── Arrow bullet (Figma: -rotate-90, w-[6px] h-[12px] slot) ──────────────────
function ArrowBullet() {
  return (
    <div className="flex h-[12px] items-center justify-center shrink-0 w-[6px]">
      <div className="-rotate-90 flex-none">
        <div className="flex flex-col h-[6px] items-start w-[12px]">
          <div className="relative shrink-0 w-full" style={{ aspectRatio: "226.27/113.14" }}>
            <div className="absolute inset-[-12.5%_-6.25%]">
              <img alt="" className="block max-w-none size-full" src={imgArrowBullet} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Social icon circle — grid grid-cols-5 no container, escala de 40–50px ────
function SocialCircle({ src, alt, aspectW, aspectH }: { src: string; alt: string; aspectW: number; aspectH: number }) {
  const isSquare = Math.abs(aspectW - aspectH) < 1;
  return (
    <div className="aspect-square bg-white border border-[#cbd0d4] flex flex-col items-center justify-center max-w-[50px] w-full mx-auto p-[14px] rounded-full cursor-pointer">
      {isSquare ? (
        <div className="flex-[1_0_0] min-h-px relative w-full" style={{ aspectRatio: "1/1" }}>
          <img alt={alt} className="absolute inset-0 max-w-none size-full" src={src} />
        </div>
      ) : (
        <div className="relative shrink-0 w-full" style={{ aspectRatio: `${aspectW}/${aspectH}` }}>
          <img alt={alt} className="absolute block inset-0 max-w-none size-full" src={src} />
        </div>
      )}
    </div>
  );
}

// ── Mobile accordion: seção de nav com estado aberto/fechado ─────────────────
// Figma nodes 3818:14192 (MOB OPEN) e 3819:14489 (MOB CLOSED)
function MobileNavSection({
  col,
  isOpen,
  onToggle,
}: {
  col: { title: string; links: { label: string; href: string }[] };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col w-full border-t border-[#cbd0d4]">
      {/* Header — clicável */}
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-[16px] cursor-pointer"
      >
        <div className="flex flex-col gap-[10px] items-start">
          <p className="font-['Articulat_CF:Bold'] text-[20px] leading-[22px] text-[#0569ff]">
            {col.title}
          </p>
          <div className="h-[1.5px] rounded-full shrink-0 w-[30px]" style={gradientLine} />
        </div>
        {/* Chevron: fechado = ∨ (rotate-180 no SVG que aponta ^), aberto = ^ (sem rotação) */}
        <div className={`shrink-0 transition-transform duration-200${isOpen ? "" : " rotate-180"}`}>
          <div className="relative h-[5px] w-[10px]">
            <img alt="" className="absolute inset-0 max-w-none size-full" src={imgArrowDown} />
          </div>
        </div>
      </button>
      {/* Links — visíveis somente quando aberto */}
      {isOpen && (
        <div className="flex flex-col gap-[30px] items-start pb-[24px]">
          {col.links.map((link) => (
            <div key={link.label} className="flex gap-[10px] items-center w-full">
              <ArrowBullet />
              <a
                href={link.href}
                className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b] flex-[1_0_0] min-w-px hover:text-[#0233c3] transition-colors"
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Footer() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  return (
    <footer
      className="border-t-[0.5px] border-[#002ba8] flex flex-col gap-[40px] items-center justify-center pt-[50px] w-full"
      style={{ background: "linear-gradient(to bottom, #fafbff, #e8f1f8)" }}
    >
      {/* ── TOP: logo + nav ──────────────────────────────────────────────── */}
      <div className="flex flex-col items-center px-[20px] w-full">
        <div className="content-start flex flex-wrap gap-[40px_20px] items-start justify-center max-w-[1400px] w-full">

          {/* Logo + description + social icons */}
          <div className="flex flex-[1_0_0] flex-col gap-[20px] h-[210px] items-start min-h-[210px] min-w-[240px] mob:h-auto mob:min-h-0 mob:items-center mob:pb-[40px]">
            <a href="/" className="flex flex-col items-center justify-center max-w-[200px] w-full">
              <div className="relative shrink-0 w-full" style={{ aspectRatio: "1133.84/187.34" }}>
                <img alt="Acquafy" className="absolute block inset-0 max-w-none size-full" src={imgLogo} />
              </div>
            </a>
            <p className="font-['Articulat_CF:Regular'] text-[16px] leading-[25px] text-[#333] flex-[1_0_0] min-h-px w-full mob:text-center mob:flex-none mob:min-h-0">
              Acquafy Platform + App + AI + IoT para gestão global da água inteligente.
            </p>
            {/* Social icons — grid 5 colunas fixas */}
            <div className="grid grid-cols-5 gap-[10px] w-full mob:max-w-[260px] mob:mx-auto">
              {socialIcons.map((s) => (
                <SocialCircle key={s.alt} src={s.src} alt={s.alt} aspectW={s.aspectW} aspectH={s.aspectH} />
              ))}
            </div>
          </div>

          {/* Nav columns — desktop: visíveis / mobile: ocultas */}
          {navColumns.map((col) => (
            <div key={col.title} className="flex flex-[1_0_0] flex-col gap-[40px] items-start min-h-[215px] min-w-[200px] pl-[20px] mob:hidden">
              <div className="flex flex-col gap-[10px] items-start min-h-[30px] w-full">
                <p className="font-['Articulat_CF:Bold'] text-[20px] leading-[22px] text-[#0569ff] w-full">
                  {col.title}
                </p>
                <div className="h-[1.5px] rounded-full shrink-0 w-[30px]" style={gradientLine} />
              </div>
              <div className="flex flex-col gap-[30px] items-start w-full">
                {col.links.map((link) => (
                  <div key={link.label} className="flex gap-[10px] items-center w-full">
                    <ArrowBullet />
                    <a
                      href={link.href}
                      className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b] flex-[1_0_0] min-w-px hover:text-[#0233c3] transition-colors"
                    >
                      {link.label}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Accordion mobile — desktop: oculto / mobile: visível */}
          <div className="hidden mob:flex flex-col w-full">
            {navColumns.map((col, i) => (
              <MobileNavSection
                key={col.title}
                col={col}
                isOpen={openSection === i}
                onToggle={() => setOpenSection(openSection === i ? null : i)}
              />
            ))}
            {/* Borda inferior da última seção */}
            <div className="border-t border-[#cbd0d4]" />
          </div>
        </div>
      </div>

      {/* ── STATS CARD ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-center px-[20px] w-full">
        <div className="bg-white flex flex-[1_0_0] flex-wrap gap-[10px] items-center justify-center max-w-[1400px] min-w-px overflow-hidden pl-[10px] py-[10px] rounded-[20px]">
          {stats.map((s) => (
            <div key={s.main} className="flex flex-[1_0_0] gap-[20px] items-center min-w-[240px] overflow-hidden p-[20px]">
              <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
                <FigmaIcon src={s.icon} size={40} aspectW={s.aspectW} aspectH={s.aspectH} />
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#07235c] w-full">
                  {s.sub}
                </p>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#0233c3] w-full">
                  {s.main}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM BAR ──────────────────────────────────────────────────── */}
      <div className="bg-[#f6f9fe] flex flex-col items-center justify-center p-[20px] w-full">
        <div className="flex flex-wrap gap-[14px_20px] items-center justify-center max-w-[1400px] w-full mob:flex-col mob:gap-[20px]">

          {/* Copyright */}
          <div className="flex-[1_0_0] font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#07235c] min-w-[200px] mob:text-center mob:flex-none mob:w-full">
            <p>Acquafy Corporation © 2026.</p>
            <p>Todos os direitos reservados.</p>
          </div>

          {/* Founded in USA */}
          <div className="flex gap-[20px] items-center min-w-[240px] overflow-hidden shrink-0 w-[240px] mob:w-full mob:min-w-0 mob:shrink mob:justify-center">
            <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
              <FigmaIcon src={imgFlagUSA} alt="USA" size={40} />
            </div>
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] flex-[1_0_0] min-w-px mob:flex-none">
              Fundada nos EUA em 2020
            </p>
          </div>

          {/* Global platform */}
          <div className="flex gap-[20px] items-center min-w-[240px] overflow-hidden shrink-0 w-[240px] mob:w-full mob:min-w-0 mob:shrink mob:justify-center">
            <div className="flex flex-col items-center justify-center shrink-0 size-[40px]">
              <FigmaIcon src={imgGlobeSust} size={40} aspectW={492} aspectH={474.82} />
            </div>
            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] flex-[1_0_0] min-w-px mob:flex-none">
              Global Smart Water Platform
            </p>
          </div>

          {/* Certification badges — 5 logos 50×50 each */}
          <div className="flex flex-wrap gap-[18px] items-center justify-center min-w-[320px] shrink-0 mob:min-w-0 mob:w-full">
            {certLogos.map((src, i) => (
              <div key={i} className="relative shrink-0 size-[50px] min-h-[50px] min-w-[50px]">
                <img alt="" className="absolute inset-0 max-w-none size-full" src={src} />
              </div>
            ))}
          </div>

          {/* Language selector */}
          <LanguageSelectorFull />
        </div>
      </div>
    </footer>
  );
}
