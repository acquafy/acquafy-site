// ── Imagens nos círculos ─────────────────────────────────────────────────────
const imgPurifier  = "/figma-assets/d608836d-29ed-48bc-8846-7e02159f476b.png";  // purificador
const imgAppPhone  = "/figma-assets/ecde7ec5-bd29-4248-8b73-e42628eccabf.png";  // app screen

// ── Ícones SVG nos círculos ──────────────────────────────────────────────────
const imgWifi      = "/figma-assets/56009d87-86ec-4d47-9ca9-ce23c76e736f.svg";
const imgCloud     = "/figma-assets/c82b67f7-912d-4654-830f-371bb0df9a3e.svg";
const imgBrain     = "/figma-assets/ba8bc26e-15f0-4fe2-a19c-2e0f594c4839.svg";
const imgBell      = "/figma-assets/069a4c28-f5f9-4a14-9e05-cf62eac10eab.svg";

// ── Seta tracejada ───────────────────────────────────────────────────────────
const imgArrow     = "/figma-assets/762e5436-d563-479f-b45c-ee20691bccc9.png";

type StepItem = {
  label: string;
  type: "photo" | "icon";
  src: string;
  padding?: string;
};

const steps: StepItem[] = [
  { label: "Purificador Neo /\nAcquafy Media", type: "photo", src: imgPurifier, padding: "p-[24px]" },
  { label: "App Acquafy",      type: "photo", src: imgAppPhone, padding: "p-[24px]" },
  { label: "IoT & Sensores",   type: "icon",  src: imgWifi,     padding: "p-[30px]" },
  { label: "Plataforma Cloud", type: "icon",  src: imgCloud,    padding: "p-[30px]" },
  { label: "Acquafy AI",       type: "icon",  src: imgBrain,    padding: "p-[30px]" },
  { label: "Alertas & Ações",  type: "icon",  src: imgBell,     padding: "p-[30px]" },
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

        {/* Steps em linha */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="flex flex-wrap items-start gap-[20px]"
            >
              {/* Item */}
              <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[150px]">

                {/* Círculo */}
                <div className="relative flex gap-[20px] items-center justify-center w-full">
                  <div
                    className={`border border-[#cbd0d4] flex items-center justify-center size-[120px] rounded-full shrink-0 ${step.padding}`}
                  >
                    {step.type === "photo" ? (
                      <img
                        src={step.src}
                        alt={step.label}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <img
                        src={step.src}
                        alt={step.label}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  {/* Seta — visível só em lg+ e não após o último */}
                  {i < steps.length - 1 && (
                    <div
                      className="hidden lg:block absolute shrink-0"
                      style={{ right: "-30px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
                    >
                      <img src={imgArrow} alt="" width={41} height={15} />
                    </div>
                  )}
                </div>

                {/* Label */}
                <p
                  className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#1f2e91] text-center w-full min-h-[44px]"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {step.label}
                </p>
              </div>
            </div>
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
