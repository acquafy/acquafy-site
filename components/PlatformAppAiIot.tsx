import FigmaIcon from "./FigmaIcon";

const imgMonitor   = "/figma-assets/db4bca54-a2c0-4ca3-89d5-b431285d293a.svg";
const imgFiltros   = "/figma-assets/b48bb694-178a-4fcd-a1ca-c94ecb1a497e.svg";
const img365       = "/figma-assets/7e5dd72f-f79b-4da7-9844-536e9720f726.svg";
const imgWater     = "/figma-assets/c16ce133-c8af-4d84-b509-bf0ed3828923.svg";
const imgNotif     = "/figma-assets/46840551-035d-459c-b88f-beba2e4e0e72.svg";
const imgGear      = "/figma-assets/407aa9bf-8e66-4864-beb2-fc6fd783edc8.svg";
const imgBrain     = "/figma-assets/2758fd1b-afa5-4c4b-a058-50717e069442.svg";
const imgMobile    = "/figma-assets/b6e829b1-ae64-4d1e-a7b9-3943adc6bc21.svg";

const items = [
  { icon: imgMonitor, iconW: 30, iconH: 30, label: "Monitoramento em tempo real" },
  { icon: imgFiltros, iconW: 40, iconH: 40, label: "Status dos filtros" },
  { icon: img365,     iconW: 30, iconH: 30, label: "Contagem regressiva 365 dias" },
  { icon: imgWater,   iconW: 40, iconH: 40, label: "Qualidade da água" },
  { icon: imgNotif,   iconW: 23, iconH: 30, label: "Alertas automáticos" },
  { icon: imgGear,    iconW: 30, iconH: 30, label: "Manutenção preventiva" },
  { icon: imgBrain,   iconW: 30, iconH: 30, label: "Acquafy AI Insights" },
  { icon: imgMobile,  iconW: 21, iconH: 30, label: "App para dispositivos Neo e Acquafy Media" },
];

export default function PlatformAppAiIot() {
  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="bg-[#f6f9fe] flex flex-col gap-[40px] items-center justify-center max-w-[1400px] p-[20px] rounded-[16px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-center w-full">
          <span className="text-[#2a2a2b]">App + </span>
          <span className="text-[#6e54ef]">AI</span>
          <span className="text-[#2a2a2b]"> + </span>
          <span className="text-[#0569ff]">IoT</span>
        </h2>

        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {items.map((item) => (
            <div key={item.label} className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[135px] min-w-[140px] p-[20px] rounded-[12px]">
              <div className="flex items-center justify-center shrink-0 size-[30px]">
                <FigmaIcon src={item.icon} size={30} aspectW={item.iconW} aspectH={item.iconH} />
              </div>
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91] text-center min-h-[45px] w-full flex items-center justify-center">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
