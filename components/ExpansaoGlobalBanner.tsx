"use client";
import Link from "next/link";
import FigmaIcon from "./FigmaIcon";
import { BtnAzulBaseArrow, BtnAzulOutArrow } from "./ui/Buttons";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgBg          = "/figma-assets/bg-b.webp";
const imgSuporte     = "/figma-assets/image-suporte.webp";
// Badge icon
const imgPlanetWeb   = "/figma-assets/icon-planetweb-30px-a.svg";  // 30×30 sq
// Stats bar icons
const imgPlanetGlobe = "/figma-assets/icon-planet-globe-30px.svg";  // 30×30 sq
const imgPessoas     = "/figma-assets/icon-pessoas-a.svg";  // 43.86×40.50
const imgLocal       = "/figma-assets/icon-local-24px.svg";  // 24.63×30 portrait
const imgScale       = "/figma-assets/icon-scale-30px.svg";  // 30×30 sq

const T: Record<Lang, {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  desc1: string;
  desc2: string;
  btn1: string;
  btn2: string;
  stats: { number: string; label: string; sub: string }[];
}> = {
  pt: {
    badge: "NOVA FASE GLOBAL",
    title: "Expansão",
    titleHighlight: "Global",
    subtitle: "Levando gestão de água inteligente e oportunidades para todos os continentes.",
    desc1: "A Acquafy está construindo a maior rede global de hidratação inteligente, mídia digital e soluções sustentáveis.",
    desc2: "Com tecnologia escalável e parceiros estratégicos, estamos transformando a forma como o mundo acessa água pura, informação e bem-estar.",
    btn1: "Seja um parceiro",
    btn2: "Falar com especialista",
    stats: [
      { number: "16",       label: "idiomas",           sub: "com presença ativa" },
      { number: "+150",     label: "parceiros",          sub: "distribuidores e integradores" },
      { number: "+2.000",   label: "pontos instalados",  sub: "em operação" },
      { number: "Expansão", label: "contínua",           sub: "novos mercados toda semana" },
    ],
  },
  en: {
    badge: "NEW GLOBAL PHASE",
    title: "Global",
    titleHighlight: "Expansion",
    subtitle: "Bringing smart water management and opportunities to every continent.",
    desc1: "Acquafy is building the world's largest network of smart hydration, digital media and sustainable solutions.",
    desc2: "With scalable technology and strategic partners, we are transforming how the world accesses pure water, information and well-being.",
    btn1: "Become a partner",
    btn2: "Talk to a specialist",
    stats: [
      { number: "16",        label: "languages",          sub: "with active presence" },
      { number: "+150",      label: "partners",           sub: "distributors and integrators" },
      { number: "+2,000",    label: "installed points",   sub: "in operation" },
      { number: "Expansion", label: "continuous",         sub: "new markets every week" },
    ],
  },
  es: {
    badge: "NUEVA FASE GLOBAL",
    title: "Expansión",
    titleHighlight: "Global",
    subtitle: "Llevando la gestión inteligente del agua y oportunidades a todos los continentes.",
    desc1: "Acquafy está construyendo la mayor red global de hidratación inteligente, medios digitales y soluciones sostenibles.",
    desc2: "Con tecnología escalable y socios estratégicos, estamos transformando la manera en que el mundo accede al agua pura, la información y el bienestar.",
    btn1: "Ser socio",
    btn2: "Hablar con especialista",
    stats: [
      { number: "16",       label: "idiomas",            sub: "con presencia activa" },
      { number: "+150",     label: "socios",             sub: "distribuidores e integradores" },
      { number: "+2.000",   label: "puntos instalados",  sub: "en operación" },
      { number: "Expansión",label: "continua",           sub: "nuevos mercados cada semana" },
    ],
  },
};

export default function ExpansaoGlobalBanner() {
  const { lang } = useLang();
  const t = T[lang];
  const stats = [
    { icon: imgPlanetGlobe, iconW: 30,    iconH: 30,    number: t.stats[0].number, label: t.stats[0].label, sub: t.stats[0].sub },
    { icon: imgPessoas,     iconW: 43.86, iconH: 40.5,  number: t.stats[1].number, label: t.stats[1].label, sub: t.stats[1].sub },
    { icon: imgLocal,       iconW: 24.63, iconH: 30,    number: t.stats[2].number, label: t.stats[2].label, sub: t.stats[2].sub },
    { icon: imgScale,       iconW: 30,    iconH: 30,    number: t.stats[3].number, label: t.stats[3].label, sub: t.stats[3].sub },
  ];
  return (
    <section className="bg-[#f6f9fe] lg:bg-transparent relative flex flex-col justify-between gap-[20px] items-center px-[20px] py-[40px] w-full overflow-hidden min-h-[calc(100vh-80px)]">
      {/* Background — only on lg+ */}
      <img
        alt=""
        className="hidden lg:block absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      {/* Main content */}
      <div className="relative flex flex-col lg:flex-row lg:flex-wrap gap-[40px] items-center justify-center max-w-[1400px] w-full">
        {/* Left column */}
        <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center lg:items-start justify-center min-w-[280px]">
          {/* Badge */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center px-[12px] py-[8px] rounded-full shrink-0 max-w-[280px]">
            <FigmaIcon src={imgPlanetWeb} size={16} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
              {t.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero-xl text-[#2a2a2b] text-center lg:text-left">
            {t.title}{" "}
            <span className="text-[#0569ff]">{t.titleHighlight}</span>
          </h1>

          {/* Subtitle */}
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#0569ff] text-center lg:text-left">
            {t.subtitle}
          </p>

          {/* Description */}
          <div className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] text-center lg:text-left">
            <p className="leading-[26px] mb-[4px]">
              {t.desc1}
            </p>
            <p className="leading-[26px]">
              {t.desc2}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-[20px] items-center w-full">
            <Link href="/parceria" className="flex-[1_0_0] min-w-[190px]">
              <BtnAzulBaseArrow className="w-full min-h-[50px]">
                {t.btn1}
              </BtnAzulBaseArrow>
            </Link>
            <Link href="/contato" className="flex-[1_0_0] min-w-[190px]">
              <BtnAzulOutArrow className="w-full min-h-[50px]">
                {t.btn2}
              </BtnAzulOutArrow>
            </Link>
          </div>
        </div>

        {/* Right column — product image */}
        <div className="flex w-full lg:flex-[1_0_0] flex-col lg:h-[585px] items-center lg:items-end justify-center">
          <div className="relative w-full shrink-0" style={{ aspectRatio: "2164/1093" }}>
            <img
              alt="Expansão Global Acquafy"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              src={imgSuporte}
            />
          </div>
        </div>
      </div>

      {/* Stats bar — pinned to bottom of section */}
      <div className="relative bg-[#1f2e91] flex flex-wrap gap-[30px_20px] items-start justify-center max-w-[1400px] overflow-clip px-[20px] py-[40px] rounded-[16px] shrink-0 w-full">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-[1_0_0] flex-wrap gap-[20px] items-start min-w-[160px]">
            <FigmaIcon src={s.icon} size={32} aspectW={s.iconW} aspectH={s.iconH} />
            <div className="flex flex-[1_0_0] flex-col gap-[15px] items-start leading-[0] min-w-[200px]">
              <p className="[text-box-trim:trim-both] [text-box-edge:cap_alphabetic] font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full">{s.number}</p>
              <p className="[text-box-trim:trim-both] [text-box-edge:cap_alphabetic] font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-white w-full">{s.label}</p>
              <p className="[text-box-trim:trim-both] [text-box-edge:cap_alphabetic] font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-white w-full">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
