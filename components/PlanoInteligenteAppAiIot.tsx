import FigmaIcon from "./FigmaIcon";

const imgFrame35 = "/figma-assets/frame-35.webp";
const imgFrame36 = "/figma-assets/frame-36-b.webp";
const imgFrame37 = "/figma-assets/frame-37.webp";
const imgFrame38 = "/figma-assets/frame-38.webp";
const imgFrame39 = "/figma-assets/frame-39.webp";

const steps = [
  { img: imgFrame35, label: "Purificador Neo",      sub: "Adquira seu purificador" },
  { img: imgFrame36, label: "App Acquafy",          sub: "Baixe e conecte" },
  { img: imgFrame37, label: "AI & Recursos",        sub: "Inteligência ativada" },
  { img: imgFrame38, label: "Plataforma Acquafy",   sub: "Gestão integrada" },
  { img: imgFrame39, label: "Acquafy X",            sub: "Experiência completa" },
];

export default function PlanoInteligenteAppAiIot() {
  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Title */}
        <div className="flex flex-col gap-[10px] items-center w-full">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-[#333] text-center w-full">
            Plano Inteligente de{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(103.83deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              assinatura
            </span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] text-center max-w-[660px]">
            Uma jornada completa do equipamento até a experiência digital mais avançada.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-wrap gap-[10px] items-start justify-center w-full">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-wrap items-center gap-[10px]">
              <div className="flex flex-[1_0_0] flex-col gap-[12px] items-center min-w-[120px] max-w-[180px]">
                {/* Step number badge */}
                <div className="relative">
                  <div className="flex items-center justify-center w-full h-[80px]">
                    <img
                      src={step.img}
                      alt={step.label}
                      className="max-h-[80px] max-w-[80px] object-contain"
                    />
                  </div>
                  <div
                    className="absolute -top-[8px] -right-[8px] flex items-center justify-center size-[22px] rounded-full text-white font-['Avenir_LT_Pro:85_Heavy'] text-[11px]"
                    style={{ backgroundColor: "#0233c3" }}
                  >
                    {i + 1}
                  </div>
                </div>

                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91] text-center w-full">
                  {step.label}
                </p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[16px] text-[#333] text-center w-full">
                  {step.sub}
                </p>
              </div>

              {/* Connector dot between steps */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex gap-[4px] items-center shrink-0">
                  {[0, 1, 2].map((d) => (
                    <div
                      key={d}
                      className="size-[4px] rounded-full bg-[#0233c3] opacity-40"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
