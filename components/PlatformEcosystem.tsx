import FigmaIcon from "./FigmaIcon";

const imgProdNeo    = "/figma-assets/2e9df5b9-59e1-4514-ac60-2b7f9ac33504.svg";
const imgPhone      = "/figma-assets/a483b432-a778-47fa-a461-e82fa78dee3c.svg";
const imgCloud      = "/figma-assets/90af4632-97e8-410c-b711-9a2cdd17793d.svg";
const imgAiInsights = "/figma-assets/f97bd0bd-de99-42e1-8ba2-1282bbf98f44.svg";
const imgQr         = "/figma-assets/b2f80fcd-c63b-4f1f-9852-5bf54f38e343.svg";
const imgComissoes  = "/figma-assets/a7f6e7e6-3b24-4c87-8cc8-d85ec08e9a6e.svg";
const imgArrowLine  = "/figma-assets/4b1b0e25-69d8-4c13-9884-074a33a9a285.svg";
const imgArrowHead  = "/figma-assets/a5c09c5f-c00a-4c02-9ff4-f3a628844aac.svg";

const steps = [
  { icon: imgProdNeo,    iconW: 18, iconH: 20, label: "Produtos Neo / Acquafy Media" },
  { icon: imgPhone,      iconW: 98, iconH: 179, label: "App + IoT" },
  { icon: imgCloud,      iconW: 30, iconH: 22,  label: "Plataforma Cloud" },
  { icon: imgAiInsights, iconW: 20, iconH: 20,  label: "AI Insights" },
  { icon: imgQr,         iconW: 20, iconH: 20,  label: "QR Codes + Vendas" },
  { icon: imgComissoes,  iconW: 20, iconH: 20,  label: "Comissões + Operação Global" },
];

function ArrowConnector() {
  return (
    <div className="flex flex-[1_0_0] items-center max-w-[50px] min-h-[22px] min-w-px">
      <div className="flex-[1_0_0] h-[10px] min-w-px mr-[-8px] relative">
        <img alt="" className="absolute inset-0 max-w-none size-full" src={imgArrowLine} />
      </div>
      <div className="flex items-center self-stretch">
        <div className="relative shrink-0" style={{ aspectRatio: "38.65/73.3", height: "100%" }}>
          <img alt="" className="absolute inset-0 max-w-none size-full" src={imgArrowHead} />
        </div>
      </div>
    </div>
  );
}

export default function PlatformEcosystem() {
  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] text-center w-full">
          Como a plataforma conecta o ecossistema
        </h2>

        <div className="flex flex-wrap gap-[10px] items-center justify-center w-full">
          {steps.map((step, i) => (
            <div key={step.label} className="contents">
              <div className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[135px] min-w-[200px] p-[20px] rounded-[16px]">
                <div className="bg-[#dae9ff] flex items-center justify-center p-[16px] rounded-full shrink-0 size-[64px]">
                  <FigmaIcon src={step.icon} size={32} aspectW={step.iconW} aspectH={step.iconH} />
                </div>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] text-center min-h-[32px] w-full flex items-center justify-center">
                  {step.label}
                </p>
              </div>
              {i < steps.length - 1 && <ArrowConnector />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
