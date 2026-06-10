import FigmaIcon from "./FigmaIcon";
import { BtnVerdeOutArrow } from "./ui/Buttons";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg          = "/figma-assets/ts-sustent-bg.png";         // section bg
const imgCtaBg       = "/figma-assets/ts-cta-bg.png";             // CTA overlay
const imgCtaIcon     = "/figma-assets/ts-icon-experiencia.svg";   // CTA icon 438×492
const imgPlastico    = "/figma-assets/ts-icon-plastico.svg";       // plastic bottle  405×643
const imgEnergia     = "/figma-assets/ts-icon-energia.svg";        // energia         ~492×492
const imgReciclavel  = "/figma-assets/ts-icon-reciclavel.svg";     // reciclável       30×30
const imgPreservAgua = "/figma-assets/ts-icon-preserv-agua.svg";   // água pura       643×631
const imgPlanet      = "/figma-assets/ts-icon-planet-stats.svg";   // stats icon       30×30

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
  { value: "+50M",        label: "pessoas impactadas positivamente" },
  { value: "+2.000",      label: "toneladas de plástico evitadas por ano" },
  { value: "+15M",        label: "litros de água economizados por ano" },
  { value: "+180 países", label: "impactados e em expansão" },
];

// ── Sub-component ─────────────────────────────────────────────────────────────

function SustCard({ icon, aspectW, aspectH, title, description }: {
  icon: string; aspectW: number; aspectH: number; title: string; description: string;
}) {
  return (
    <div className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center max-w-[200px] min-h-[235px] min-w-[160px] px-[10px] py-[20px] rounded-[16px]">
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
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {/* Info card */}
          <div className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-[235px] min-w-[280px] overflow-hidden p-[20px] rounded-[16px]">
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#0b8650] text-center lg:text-left">
              Sustentabilidade em cada gota
            </h2>
            <div className="bg-[#36ae5c] h-[2px] w-[80px] shrink-0" />
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#333] flex-1">
              Acreditamos que a tecnologia deve caminhar junto com a responsabilidade ambiental. Por isso, nossas soluções são projetadas para reduzir o consumo de recursos, eliminar plásticos descartáveis e gerar impacto positivo real.
            </p>
            <BtnVerdeOutArrow className="max-w-[320px] w-full">
              Conheça nossas iniciativas sustentáveis
            </BtnVerdeOutArrow>
          </div>

          {/* Sustainability cards */}
          {sustCards.map((c) => (
            <SustCard key={c.title} {...c} />
          ))}
        </div>

        {/* Stats bar */}
        <div className="bg-white flex flex-wrap gap-[30px_20px] items-start justify-center max-w-[1400px] w-full overflow-hidden px-[20px] py-[40px] rounded-[16px]">
          {stats.map((s) => (
            <div key={s.value} className="flex flex-[1_0_0] flex-wrap gap-[20px] items-start min-w-[160px]">
              <FigmaIcon src={imgPlanet} size={40} />
              <div className="flex flex-[1_0_0] flex-col gap-[15px] items-start min-w-px">
                <p className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-[#0b8650]">
                  {s.value}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#2a2a2b]">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA Banner — dentro da mesma seção, sobre o fundo nature ── */}
        <div className="content-center flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden p-[40px] relative rounded-[16px] shrink-0 w-full">
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
          <div className="relative flex flex-[1_0_0] flex-col items-center justify-center min-w-[240px]">
            <p className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center lg:text-left">
              Inovação que cuida de pessoas e do planeta ao mesmo tempo.
            </p>
          </div>

          {/* Botão */}
          <div className="relative flex flex-[1_0_0] items-center justify-center max-w-[300px] min-w-[200px]">
            <BtnVerdeOutArrow className="w-full min-h-[56px]">
              Faça parte dessa transformação
            </BtnVerdeOutArrow>
          </div>
        </div>
      </div>
    </section>
  );
}
