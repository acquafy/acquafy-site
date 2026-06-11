import React from "react";
import FigmaIcon from "./FigmaIcon";

// ── Fotos nos círculos ───────────────────────────────────────────────────────
const imgPurifier  = "/figma-assets/d608836d-29ed-48bc-8846-7e02159f476b.png";
const imgAppPhone  = "/figma-assets/ecde7ec5-bd29-4248-8b73-e42628eccabf.png";

// ── Ícones SVG nos círculos ──────────────────────────────────────────────────
const imgWifi      = "/figma-assets/56009d87-86ec-4d47-9ca9-ce23c76e736f.svg";  // 63×43
const imgCloud     = "/figma-assets/c82b67f7-912d-4654-830f-371bb0df9a3e.svg";  // 63×63
const imgBrain     = "/figma-assets/ba8bc26e-15f0-4fe2-a19c-2e0f594c4839.svg";  // 63×63
const imgBell      = "/figma-assets/069a4c28-f5f9-4a14-9e05-cf62eac10eab.svg";  // 49×63

// ── Seta tracejada ───────────────────────────────────────────────────────────
const imgArrow     = "/figma-assets/762e5436-d563-479f-b45c-ee20691bccc9.png";

type StepItem =
  | { label: string; type: "photo"; src: string; padding: string }
  | { label: string; type: "icon";  src: string; padding: string; aspectW: number; aspectH: number };

const steps: StepItem[] = [
  { label: "Purificador Neo /\nAcquafy Media", type: "photo", src: imgPurifier, padding: "p-[24px]" },
  { label: "App Acquafy",      type: "photo", src: imgAppPhone,   padding: "p-[24px]" },
  { label: "IoT & Sensores",   type: "icon",  src: imgWifi,       padding: "p-[30px]", aspectW: 63, aspectH: 43 },
  { label: "Plataforma Cloud", type: "icon",  src: imgCloud,      padding: "p-[30px]", aspectW: 63, aspectH: 63 },
  { label: "Acquafy AI",       type: "icon",  src: imgBrain,      padding: "p-[30px]", aspectW: 63, aspectH: 63 },
  { label: "Alertas & Ações",  type: "icon",  src: imgBell,       padding: "p-[30px]", aspectW: 49, aspectH: 63 },
];

export default function FluxoInteligenteAppAiIot() {
  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] rounded-[16px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-center w-full">
          <span className="text-[#0569ff]">Fluxo inteligente</span>
          <span className="text-[#1f2e91]"> da operação</span>
        </h2>

        {/* Steps — cada item tem largura fixa; setas são irmãs inline */}
        <div className="flex flex-wrap gap-y-[30px] items-start justify-center w-full">
          {steps.map((step, i) => (
            <React.Fragment key={step.label}>
              {/* Item */}
              <div className="flex flex-col gap-[12px] items-center" style={{ width: 150 }}>

                {/* Círculo */}
                <div
                  className={`border border-[#cbd0d4] flex items-center justify-center size-[120px] rounded-full shrink-0 ${step.padding}`}
                >
                  {step.type === "icon" ? (
                    <FigmaIcon src={step.src} size={40} aspectW={step.aspectW} aspectH={step.aspectH} />
                  ) : (
                    <img
                      src={step.src}
                      alt={step.label}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                {/* Label */}
                <p
                  className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[18px] text-[#1f2e91] text-center w-full"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {step.label}
                </p>
              </div>

              {/* Seta tracejada — visível só em lg+ e não após o último item */}
              {i < steps.length - 1 && (
                <img
                  className="hidden lg:block shrink-0 self-start"
                  src={imgArrow}
                  alt=""
                  width={41}
                  height={15}
                  style={{ marginTop: 52 }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Subtítulo */}
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[20px] leading-[26px] text-[#2a2a2b] text-center w-full min-w-[240px]">
          Dados dos produtos e dispositivos coletados, analisados e transformados em insights e ações em tempo real.
        </p>
      </div>
    </section>
  );
}
