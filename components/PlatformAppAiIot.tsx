import FigmaIcon from "./FigmaIcon";

const imgMonitor   = "/figma-assets/icon-monitor.svg";
const imgFiltros   = "/figma-assets/icon-filtros-b.svg";
const img365       = "/figma-assets/icon-365.svg";
const imgWater     = "/figma-assets/icon-water-b.svg";
const imgNotif     = "/figma-assets/icon-notif.svg";
const imgGear      = "/figma-assets/icon-gear.svg";
const imgBrain     = "/figma-assets/icon-brain-b.svg";
const imgMobile    = "/figma-assets/icon-mobile-c.svg";

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

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
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
