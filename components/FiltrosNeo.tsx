import FigmaIcon from "./FigmaIcon";

// ── Assets (node 3685:13401) ──────────────────────────────────────────────────
const imgCheckin      = "/figma-assets/8a45d314-4f2b-46a1-a048-15ce133391f9.svg"; // 30×30 sq
const imgCheckinStroke = "/figma-assets/c27617dd-67dc-4e70-96b7-b004d35403c5.svg"; // 50×34 landscape
const imgFilterPP     = "/figma-assets/d31fe2a1-d90e-4d2c-9e55-f9906b146e50.svg"; // 603.5×662.7 portrait
const imgFilterH      = "/figma-assets/7e463a70-d7a6-41e3-8e88-90bd52ddae03.svg"; // 30×30 sq
const imgFilterAnti   = "/figma-assets/75c90c1b-6284-4554-87d0-ad273730475d.svg"; // 490.75×492 sq
const imgFilterUltra  = "/figma-assets/5c732454-6eaa-4861-b7b6-1406ade1799d.svg"; // 426.42×491.96 portrait

// ── CheckinStroke helper (50×34 landscape, slot 15×15) ────────────────────────
function CheckinStroke() {
  return (
    <div className="flex flex-col items-center justify-center relative shrink-0" style={{ width: 15, height: 15 }}>
      <div className="relative shrink-0 w-full" style={{ aspectRatio: "50 / 34" }}>
        <div className="absolute" style={{ inset: "-7.35% -5%" }}>
          <img alt="" className="block max-w-none size-full" src={imgCheckinStroke} />
        </div>
      </div>
    </div>
  );
}

// ── Filter card data ───────────────────────────────────────────────────────────
const filters = [
  {
    icon: imgFilterPP,
    aspectW: 603.5, aspectH: 662.7,
    title: "Filtro PP / Polipropileno",
    bullets: [
      "Retém sedimentos, areia, ferrugem e partículas maiores;",
      "Protege os filtros seguintes.",
    ],
  },
  {
    icon: imgFilterH,
    aspectW: 30, aspectH: 30,
    title: "Rico em Hidrogênio + Composto Alcalino",
    bullets: [
      "Enriquece a água com hidrogênio molecular;",
      "Aumenta o pH e o poder antioxidante.",
    ],
  },
  {
    icon: imgFilterAnti,
    aspectW: 490.75, aspectH: 492,
    title: "Anti-Escala",
    bullets: [
      "Reduz a formação de incrustações;",
      "Protege o sistema e aumenta a vida útil do equipamento.",
    ],
  },
  {
    icon: imgFilterUltra,
    aspectW: 426.42, aspectH: 491.96,
    title: "Ultrafiltração",
    bullets: [
      "Remove bactérias, coloides e impurezas microscópicas;",
      "Água mais pura e segura.",
    ],
  },
];

export default function FiltrosNeo() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="bg-[#f6f9fe] flex flex-col gap-[20px] items-center justify-center max-w-[1400px] p-[20px] rounded-[16px] w-full">

        {/* ── Header: título + descrição + 3 checklist items em row ── */}
        <div className="flex flex-col gap-[20px] items-start min-w-[240px] w-full">

          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] w-full">
            4 Filtros Neo de Alta Performance
          </h2>

          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
            Tecnologia avançada com 20 componentes e 20 estágios de purificação para entregar água pura, segura e saudável todos o dias.
          </p>

          {/* 3 checklist items: flex-wrap gap-40px (horizontal no desktop) */}
          <div className="flex flex-wrap gap-[40px] items-center w-full">
            {[
              "20 componentes",
              "20 estágio de purificação",
              "Vida útil de até 1 ano de 20.000 litros",
            ].map((item) => (
              <div key={item} className="flex gap-[10px] items-center">
                <FigmaIcon src={imgCheckin} size={20} />
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[21px] text-[#1f2e91]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4 filter cards em row ── */}
        <div className="flex flex-wrap gap-[10px] items-stretch w-full">
          {filters.map((f) => (
            <div
              key={f.title}
              className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[285px] min-w-[280px] overflow-hidden p-[20px] rounded-[16px]"
            >
              {/* Blue circle icon */}
              <div className="bg-[#0569ff] flex flex-col items-center justify-center p-[15px] rounded-full shrink-0 size-[60px]">
                <FigmaIcon src={f.icon} size={30} aspectW={f.aspectW} aspectH={f.aspectH} />
              </div>

              {/* Title (min-h-50px for alignment) */}
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-[#1f2e91] text-center w-full min-h-[50px] flex items-center justify-center">
                {f.title}
              </p>

              {/* Bullet points */}
              <div className="flex flex-col gap-[20px] items-start w-full">
                {f.bullets.map((bullet) => (
                  <div key={bullet} className="flex gap-[10px] items-center w-full">
                    <CheckinStroke />
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[21px] text-[#333] flex-1 min-w-0">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
