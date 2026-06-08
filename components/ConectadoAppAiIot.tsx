import FigmaIcon from "./FigmaIcon";

// ── Ícones dos items (SVGs, um por item) ──────────────────────────────────────
const imgMobile   = "/figma-assets/c949cdb8-5a17-4158-b6b0-8aaef884917e.svg";  // 18×30 phone
const imgBrain1   = "/figma-assets/bddc62fa-abf4-4da1-951e-6be44a675d5e.svg";  // 30×30 brain/AI
const imgIoT      = "/figma-assets/4e54c88a-0878-4a32-b7ee-b9be83ec4c9d.svg";  // 30×30 IoT/Vector
const imgGlobe    = "/figma-assets/ef840927-3754-4969-a8f2-8bb31f294c88.svg";  // 30×30 globe (Operação Global)

// ── Seta entre items ──────────────────────────────────────────────────────────
const imgArrow    = "/figma-assets/dae2ad63-1987-4c1d-aae0-a8e777ead052.svg";  // 20×14 landscape arrow

const items = [
  {
    icon: imgMobile,
    aspectW: 18,
    aspectH: 30,
    bg: "#0233c3",
    title: "App Acquafy",
    desc: "Controle remoto, status do equipamento e suporte na palma da mão.",
  },
  {
    icon: imgBrain1,
    aspectW: 30,
    aspectH: 30,
    bg: "#7a16d2",
    title: "Acquafy AI",
    desc: "Inteligência artificial para insights, automações e decisões mais rápidas.",
  },
  {
    icon: imgIoT,
    aspectW: 30,
    aspectH: 30,
    bg: "#36ae5c",
    title: "IoT & Dispositivos",
    desc: "Sensores, conectividade e monitoramento em tempo real.",
  },
  {
    icon: imgGlobe,
    aspectW: 30,
    aspectH: 30,
    bg: "#0569ff",
    title: "Operação Integrada",
    desc: "Plataforma unificada para gestão global de dispositivos e operações.",
  },
];

export default function ConectadoAppAiIot() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-[#333] text-center w-full">
          Tudo conectado em uma única experiência
        </h2>

        {/* Items com seta entre eles */}
        <div className="flex flex-wrap gap-[10px] items-start justify-center w-full">
          {items.map((item, i) => (
            <div key={item.title} className="flex flex-wrap items-center gap-[10px]">

              {/* Card */}
              <div className="flex flex-[1_0_0] flex-col gap-[16px] items-center min-w-[160px] max-w-[240px]">
                <div
                  className="flex items-center justify-center size-[56px] rounded-[16px] shrink-0"
                  style={{ backgroundColor: item.bg }}
                >
                  <FigmaIcon src={item.icon} size={28} aspectW={item.aspectW} aspectH={item.aspectH} />
                </div>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[19px] text-[#1f2e91] text-center w-full">
                  {item.title}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center w-full">
                  {item.desc}
                </p>
              </div>

              {/* Seta separadora — visível só em md+ e entre items (não após o último) */}
              {i < items.length - 1 && (
                <div className="hidden md:flex shrink-0 items-center pb-[40px]">
                  <FigmaIcon src={imgArrow} size={20} aspectW={20} aspectH={14} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
