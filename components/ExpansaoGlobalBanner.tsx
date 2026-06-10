import FigmaIcon from "./FigmaIcon";
import { BtnAzulBaseArrow, BtnAzulOutArrow } from "./ui/Buttons";

const imgBg          = "/figma-assets/e8f7c96b-1a0d-4c5e-96f9-4b31d4de3a60.png";
const imgSuporte     = "/figma-assets/438796f7-96e0-4e35-ad1a-d3ad2f0457aa.png";
// Badge icon
const imgPlanetWeb   = "/figma-assets/7df83e65-407c-40b6-889f-80fac86e16af.svg";  // 30×30 sq
// Stats bar icons
const imgPlanetGlobe = "/figma-assets/f04a607b-d82e-4b6e-b06f-988ff500cf82.svg";  // 30×30 sq
const imgPessoas     = "/figma-assets/37463702-6601-4d05-ad0c-fcd35effbe7b.svg";  // 43.86×40.50
const imgLocal       = "/figma-assets/58de908c-74c3-43d3-8b16-c6fda0ac305c.svg";  // 24.63×30 portrait
const imgScale       = "/figma-assets/221ab3d5-68cf-4358-8e6e-d173eb8bf1b1.svg";  // 30×30 sq

const stats = [
  { icon: imgPlanetGlobe, iconW: 30,    iconH: 30,    number: "16",        label: "idiomas",          sub: "com presença ativa" },
  { icon: imgPessoas,     iconW: 43.86, iconH: 40.5,  number: "+150",      label: "parceiros",        sub: "distribuidores e integradores" },
  { icon: imgLocal,       iconW: 24.63, iconH: 30,    number: "+2.000",    label: "pontos instalados",sub: "em operação" },
  { icon: imgScale,       iconW: 30,    iconH: 30,    number: "Expansão",  label: "contínua",         sub: "novos mercados toda semana" },
];

export default function ExpansaoGlobalBanner() {
  return (
    <section className="relative flex flex-col gap-[20px] items-center px-[20px] py-[40px] w-full overflow-hidden xl:h-[calc(100vh-80px)]">
      {/* Background */}
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      {/* Main content — flex-[1_0_0] so stats bar stays pinned to the bottom */}
      <div className="relative flex-[1_0_0] min-h-px flex flex-wrap gap-[40px] items-center justify-center max-w-[1400px] w-full">
        {/* Left column */}
        <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start justify-center max-w-[580px] min-w-[280px]">
          {/* Badge */}
          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center px-[12px] py-[8px] rounded-full shrink-0 max-w-[280px]">
            <FigmaIcon src={imgPlanetWeb} size={16} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
              NOVA FASE GLOBAL
            </span>
          </div>

          {/* Title */}
          <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[64px] leading-[68px] text-[#2a2a2b] text-center lg:text-left">
            Expansão{" "}
            <span className="text-[#0569ff]">Global</span>
          </h1>

          {/* Subtitle */}
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#0569ff] text-center lg:text-left">
            Levando gestão de água inteligente e oportunidades para todos os continentes.
          </p>

          {/* Description */}
          <div className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#333] text-center lg:text-left">
            <p className="leading-[26px] mb-[4px]">
              A Acquafy está construindo a maior rede global de hidratação inteligente, mídia digital e soluções sustentáveis.
            </p>
            <p className="leading-[26px]">
              Com tecnologia escalável e parceiros estratégicos, estamos transformando a forma como o mundo acessa água pura, informação e bem-estar.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-[20px] items-center w-full">
            <BtnAzulBaseArrow className="flex-[1_0_0] min-h-[50px] min-w-[190px]">
              Seja um parceiro
            </BtnAzulBaseArrow>
            <BtnAzulOutArrow className="flex-[1_0_0] min-h-[50px] min-w-[190px]">
              Falar com especialista
            </BtnAzulOutArrow>
          </div>
        </div>

        {/* Right column — product image */}
        <div className="flex flex-[1_0_0] flex-col h-[585px] items-end justify-end min-w-[280px]">
          <div className="relative w-full shrink-0" style={{ aspectRatio: "4096/2138" }}>
            <img
              alt="Expansão Global Acquafy"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              src={imgSuporte}
            />
          </div>
        </div>
      </div>

      {/* Stats bar — pinned to bottom of section */}
      <div className="relative bg-[#1f2e91] flex flex-wrap gap-[30px_20px] items-start justify-center max-w-[1400px] overflow-hidden px-[20px] py-[40px] rounded-[16px] w-full">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-[1_0_0] flex-wrap gap-[20px] items-start min-w-[160px]">
            <FigmaIcon src={s.icon} size={60} aspectW={s.iconW} aspectH={s.iconH} />
            <div className="flex flex-[1_0_0] flex-col gap-[15px] items-start min-w-[200px]">
              <p className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white">{s.number}</p>
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-white">{s.label}</p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-white">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
