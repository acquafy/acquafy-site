import FigmaIcon from "./FigmaIcon";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg        = "/figma-assets/876d7726-5006-4cc7-97bc-45a60e67a3b6.png"; // section bg
const imgGlobe     = "/figma-assets/57457041-3be7-4286-904b-a50ba0c11b60.svg"; // presença global
const imgPartner   = "/figma-assets/fe318b6f-e30c-4367-a956-05afe3f35eba.svg"; // rede parceiros
const imgWater     = "/figma-assets/34b7a71d-fe69-43da-913b-8629ac9c05fe.svg"; // pessoas impactadas
const imgGloboSust = "/figma-assets/1eda187e-f6c0-4747-8ab5-3ef5f36b6f68.svg"; // sustentabilidade
const imgChat      = "/figma-assets/f1204284-0630-498a-ba45-04ff40580c7e.svg"; // mídia inteligente

const stats = [
  {
    icon: imgGlobe,
    label: "Presença global",
    count: "180+",
    description: "países com visão e expansão",
  },
  {
    icon: imgPartner,
    label: "Rede de parceiros",
    count: "150+",
    description: "parceiros distribuidores e integrados",
  },
  {
    icon: imgWater,
    label: "Pessoas impactadas",
    count: "+50M",
    description: "soluções que melhoram vidas",
  },
  {
    icon: imgGloboSust,
    label: "Sustentabilidade",
    count: "Milhões",
    description: "de litros de água preservados",
  },
  {
    icon: imgChat,
    label: "Mídia inteligente",
    count: "+1Bi",
    description: "de interações de mídia geradas",
  },
];

export default function SobreImpacto() {
  return (
    <section className="flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-[30px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] py-[25px] relative rounded-[16px] w-full">
        {/* Dark background */}
        <div className="absolute inset-0 rounded-[16px] pointer-events-none" aria-hidden>
          <div className="absolute bg-[#1f2e91] inset-0 rounded-[16px]" />
          <img
            alt=""
            className="absolute max-w-none object-cover opacity-40 rounded-[16px] size-full"
            src={imgBg}
          />
        </div>

        {/* Title column */}
        <div className="flex flex-col gap-[20px] items-center w-full relative lg:flex-[1_0_0] lg:items-start lg:max-w-[340px] lg:min-w-[280px]">
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-white text-center lg:text-left">
            Nosso impacto
          </p>
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-white text-center lg:text-left">
            Transformamos tecnologia em{" "}
            <span className="text-[#0569ff]">impacto positivo</span>{" "}
            para pessoas e para o planeta.
          </p>
        </div>

        {/* Stats grid */}
        <div className="flex flex-[1_0_0] flex-wrap gap-[20px] items-start justify-center min-w-[280px] relative">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-[1_0_0] flex-col gap-[25px] items-center justify-center min-w-[100px]"
            >
              {/* Icon + label */}
              <div className="flex flex-wrap gap-[10px] items-center justify-center w-full">
                <FigmaIcon src={s.icon} alt={s.label} size={30} />
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white whitespace-nowrap">
                  {s.label}
                </p>
              </div>
              {/* Count */}
              <p className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white text-center w-full">
                {s.count}
              </p>
              {/* Description */}
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-white text-center w-full">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
