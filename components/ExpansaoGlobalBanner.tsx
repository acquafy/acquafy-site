import Link from "next/link";
import FigmaIcon from "./FigmaIcon";
import { BtnAzulBaseArrow, BtnAzulOutArrow } from "./ui/Buttons";

const imgBg          = "/figma-assets/bg-b.webp";
const imgSuporte     = "/figma-assets/image-suporte.webp";
// Badge icon
const imgPlanetWeb   = "/figma-assets/icon-planetweb-30px-a.svg";  // 30×30 sq
// Stats bar icons
const imgPlanetGlobe = "/figma-assets/icon-planet-globe-30px.svg";  // 30×30 sq
const imgPessoas     = "/figma-assets/icon-pessoas-a.svg";  // 43.86×40.50
const imgLocal       = "/figma-assets/icon-local-24px.svg";  // 24.63×30 portrait
const imgScale       = "/figma-assets/icon-scale-30px.svg";  // 30×30 sq

const stats = [
  { icon: imgPlanetGlobe, iconW: 30,    iconH: 30,    number: "16",        label: "idiomas",          sub: "com presença ativa" },
  { icon: imgPessoas,     iconW: 43.86, iconH: 40.5,  number: "+150",      label: "parceiros",        sub: "distribuidores e integradores" },
  { icon: imgLocal,       iconW: 24.63, iconH: 30,    number: "+2.000",    label: "pontos instalados",sub: "em operação" },
  { icon: imgScale,       iconW: 30,    iconH: 30,    number: "Expansão",  label: "contínua",         sub: "novos mercados toda semana" },
];

export default function ExpansaoGlobalBanner() {
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
              NOVA FASE GLOBAL
            </span>
          </div>

          {/* Title */}
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-hero-xl text-[#2a2a2b] text-center lg:text-left">
            Expansão{" "}
            <span className="text-[#0569ff]">Global</span>
          </h1>

          {/* Subtitle */}
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#0569ff] text-center lg:text-left">
            Levando gestão de água inteligente e oportunidades para todos os continentes.
          </p>

          {/* Description */}
          <div className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[26px] text-[#333] text-center lg:text-left">
            <p className="leading-[26px] mb-[4px]">
              A Acquafy está construindo a maior rede global de hidratação inteligente, mídia digital e soluções sustentáveis.
            </p>
            <p className="leading-[26px]">
              Com tecnologia escalável e parceiros estratégicos, estamos transformando a forma como o mundo acessa água pura, informação e bem-estar.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-[20px] items-center w-full">
            <Link href="/parceria" className="flex-[1_0_0] min-w-[190px]">
              <BtnAzulBaseArrow className="w-full min-h-[50px]">
                Seja um parceiro
              </BtnAzulBaseArrow>
            </Link>
            <Link href="/contato" className="flex-[1_0_0] min-w-[190px]">
              <BtnAzulOutArrow className="w-full min-h-[50px]">
                Falar com especialista
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
