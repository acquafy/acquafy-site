import FigmaIcon from "./FigmaIcon";

// ── Timeline icon assets ──────────────────────────────────────────────────────
const imgWater     = "/figma-assets/7460a337-a4bb-4ffd-b84d-9ae13904163a.svg"; // 2020 Fundação
const imgContainer = "/figma-assets/6a475d85-2d6a-4d5e-a900-8d6db2cb76e1.svg"; // 2021 Desenvolvimento
const imgBpmPlay   = "/figma-assets/d2938bab-73ed-4521-a6f5-666c4fb8fc52.svg"; // 2024 Ecossistema Neo
const imgWifi      = "/figma-assets/e074f426-24d7-4826-8479-933bcbc0314d.svg"; // 2025 Conectividade
const imgGlobe     = "/figma-assets/57457041-3be7-4286-904b-a50ba0c11b60.svg"; // 2026+ Nova fase
const imgArrow     = "/figma-assets/506c5c8d-0262-45a7-b763-b436a0de2a2b.svg"; // connector arrow (not last)
const imgArrowEnd  = "/figma-assets/edb31128-b8d1-4b8b-9128-ac0167bd0bfd.svg"; // last item arrow

type TimelineItem = {
  icon: string; year: string; phase: string; description: string;
  isLast: boolean; aspectW?: number; aspectH?: number;
};

const timeline: TimelineItem[] = [
  {
    icon: imgWater,
    year: "2020",
    phase: "Fundação",
    description:
      "A Acquafy é fundada nos EUA com o propósito de transformar e formar como o mundo cuida da água.",
    isLast: false,
  },
  {
    icon: imgContainer,
    year: "2021",
    phase: "Desenvolvimento",
    description:
      "Desenvolvimento da linha inicial de produtos e da plataforma de gestão inteligente.",
    isLast: false,
  },
  {
    icon: imgBpmPlay,
    year: "2024",
    phase: "Ecossistema Neo",
    description:
      "Lançamento do ecossistema Neo e do Acquafy Media Network para educação, conteúdo e engajamento.",
    isLast: false,
  },
  {
    icon: imgWifi,
    year: "2025",
    phase: "Conectividade",
    description:
      "Expansão da plataforma com App + IA + IoT conectando dispositivos e pessoas.",
    isLast: false,
    aspectW: 31.5, aspectH: 21.5,  // viewBox 31.5×21.5 — landscape
  },
  {
    icon: imgGlobe,
    year: "2026+",
    phase: "Nova fase global",
    description:
      "Nova fase de crescimento com presença global escalável e expansão da rede de parceiros.",
    isLast: true,
  },
];

export default function SobreHistoria() {
  return (
    <section className="flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          Nossa História
        </h2>
        <div className="flex flex-wrap gap-[40px] items-start justify-center w-full">
          {timeline.map((item) => (
            <div
              key={item.year}
              className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[160px] rounded-[12px]"
            >
              {/* Icon + connector */}
              <div className="flex gap-[10px] items-center justify-center relative w-full">
                <div className="bg-[#0569ff] flex flex-col items-center justify-center p-[10px] rounded-full shrink-0 size-[50px]">
                  {/* 50px circle – p-10 → 30px content area */}
                  <FigmaIcon src={item.icon} alt={item.phase} size={30} aspectW={item.aspectW} aspectH={item.aspectH} />
                </div>
                {/* Connector arrow line */}
                <div className="flex-[1_0_0] h-[9px] min-w-px relative">
                  <img
                    alt=""
                    className="absolute inset-0 w-full h-full"
                    src={item.isLast ? imgArrowEnd : imgArrow}
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-[20px] items-start w-full">
                <div className="flex flex-col gap-[10px] items-start w-full">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0233c3]">
                    {item.year}
                  </p>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#0569ff]">
                    {item.phase}
                  </p>
                </div>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
