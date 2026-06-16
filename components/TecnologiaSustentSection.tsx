import Link from "next/link";
import FigmaIcon from "./FigmaIcon";
import { BtnVerdeOutArrow } from "./ui/Buttons";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg          = "/figma-assets/ts-sustent-bg.webp";         // section bg
const imgCtaBg       = "/figma-assets/ts-cta-bg.webp";             // CTA overlay
const imgCtaIcon     = "/figma-assets/ts-icon-experiencia.svg";   // CTA icon 438×492
const imgPlastico    = "/figma-assets/ts-icon-plastico.svg";       // plastic bottle  405×643
const imgEnergia     = "/figma-assets/ts-icon-energia.svg";        // energia         ~492×492
const imgReciclavel  = "/figma-assets/ts-icon-reciclavel.svg";     // reciclável       30×30
const imgPreservAgua = "/figma-assets/ts-icon-preserv-agua.svg";   // água pura       643×631
const imgStatsPessoas   = "/figma-assets/ts-icon-stats-pessoas.svg";    // 43.86×40.50
const imgStatsAgua      = "/figma-assets/ts-icon-stats-agua.svg";       // 40×40
const imgStatsPlanta    = "/figma-assets/ts-icon-stats-planta.svg";     // 335.36×361.50
const imgStatsPlanetWeb = "/figma-assets/ts-icon-stats-planet-web.svg"; // 30×30

const sustCards = [
  {
    icon: imgPlastico,    aspectW: 405, aspectH: 643,
    title: "Menos plástico descartável",
    description: "Reduzimos milhões de garrafas plásticas ao oferecer água pura acessível em locais estratégicos.",
  },
  {
    icon: imgEnergia,     aspectW: 492, aspectH: 492,
    title: "Consumo consciente de energia",
    description: "Equipamentos eficientes e inteligentes que otimizam o consumo de energia.",
  },
  {
    icon: imgReciclavel,  aspectW: 30,  aspectH: 30,
    title: "Materiais recicláveis e duráveis",
    description: "Componentes de alta qualidade recicláveis e projetados para longa vida útil.",
  },
  {
    icon: imgPreservAgua, aspectW: 643, aspectH: 631,
    title: "Preservação da água",
    description: "Tecnologias que economizam água em cada etapa do processo de purificação.",
  },
];

const stats = [
  { value: "+50M",        label: "pessoas impactadas positivamente",      icon: imgStatsPessoas,   aspectW: 43.86,  aspectH: 40.50  },
  { value: "+2.000",      label: "toneladas de plástico evitadas por ano", icon: imgStatsAgua,      aspectW: 40,     aspectH: 40     },
  { value: "+15M",        label: "litros de água economizados por ano",   icon: imgStatsPlanta,    aspectW: 335.36, aspectH: 361.50 },
  { value: "+180 países", label: "impactados e em expansão",              icon: imgStatsPlanetWeb, aspectW: 30,     aspectH: 30     },
];

// ── Sub-component ─────────────────────────────────────────────────────────────

function SustCard({ icon, aspectW, aspectH, title, description }: {
  icon: string; aspectW: number; aspectH: number; title: string; description: string;
}) {
  return (
    <div className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[235px] min-w-[160px] px-[10px] py-[20px] rounded-[16px]">
      <FigmaIcon src={icon} size={40} aspectW={aspectW} aspectH={aspectH} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-[#0b8650] text-center w-full">
        {title}
      </p>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center w-full">
        {description}
      </p>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function TecnologiaSustentSection() {
  return (
    <section className="relative flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      {/* Background */}
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={imgBg}
      />

      <div className="relative flex flex-col gap-[20px] items-center max-w-[1400px] w-full">
        {/* Top row: info card + sust cards */}
        <div className="flex flex-col gap-[20px] items-start w-full">
          {/* Info card */}
          <div className="bg-white flex flex-col gap-[20px] items-start min-h-[235px] min-w-[280px] overflow-hidden p-[20px] rounded-[16px] w-full">
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#0b8650] text-center lg:text-left">
              Sustentabilidade em cada gota
            </h2>
            <div className="bg-[#36ae5c] h-[2px] w-[80px] shrink-0" />
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#333] flex-1">
              Acreditamos que a tecnologia deve caminhar junto com a responsabilidade ambiental. Por isso, nossas soluções são projetadas para reduzir o consumo de recursos, eliminar plásticos descartáveis e gerar impacto positivo real.
            </p>
            <Link href="/tecnologia" className="max-w-[320px] w-full">
              <BtnVerdeOutArrow className="w-full">
                Conheça nossas iniciativas sustentáveis
              </BtnVerdeOutArrow>
            </Link>
          </div>

          {/* Sustainability cards */}
          <div className="flex flex-[1_0_0] flex-wrap gap-[20px] justify-center min-w-[280px]">
            {sustCards.map((c) => (
              <SustCard key={c.title} {...c} />
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-white content-start flex flex-wrap gap-[30px_20px] items-start justify-center max-w-[1400px] w-full overflow-hidden px-[20px] py-[40px] relative rounded-[16px]">
          {stats.map((s) => (
            <div key={s.value} className="content-start flex flex-[1_0_0] flex-wrap gap-[20px] items-start min-w-[160px] relative">
              <FigmaIcon src={s.icon} size={40} aspectW={s.aspectW} aspectH={s.aspectH} />
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[15px] items-start leading-[0] min-w-px not-italic relative">
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] flex flex-col font-['Avenir_LT_Pro:95_Black'] justify-center relative shrink-0 text-[32px] text-[#0b8650] w-full">
                  <p className="leading-[39px]">{s.value}</p>
                </div>
                <div className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] flex flex-col font-['Avenir_LT_Pro:55_Roman'] justify-center relative shrink-0 text-[16px] text-[#2a2a2b] w-full">
                  <p className="leading-[20px]">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA Banner — dentro da mesma seção, sobre o fundo nature ── */}
        <div className="content-center flex flex-col gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden p-[40px] relative rounded-[16px] shrink-0 w-full lg:flex-row lg:flex-wrap">
          {/* Fundo: verde-escuro + foto com opacidade */}
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[16px]">
            <div className="absolute bg-[#0b8650] inset-0 rounded-[16px]" />
            <img
              alt=""
              className="absolute max-w-none object-cover opacity-40 rounded-[16px] size-full"
              src={imgCtaBg}
            />
          </div>

          {/* Ícone */}
          <FigmaIcon src={imgCtaIcon} size={60} aspectW={438} aspectH={492} />

          {/* Título */}
          <div className="relative flex flex-col items-center justify-center w-full lg:flex-[1_0_0] lg:min-w-[240px]">
            <p className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center lg:text-left">
              Inovação que cuida de pessoas e do planeta ao mesmo tempo.
            </p>
          </div>

          {/* Botão */}
          <div className="relative flex items-center justify-center w-full lg:flex-[1_0_0] lg:max-w-[300px] lg:min-w-[200px]">
            <BtnVerdeOutArrow className="w-full min-h-[56px]">
              Faça parte dessa transformação
            </BtnVerdeOutArrow>
          </div>
        </div>
      </div>
    </section>
  );
}
