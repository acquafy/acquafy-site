import FigmaIcon from "./FigmaIcon";

const imgHouse       = "/figma-assets/icon-house.svg";
const imgParceiros   = "/figma-assets/icon-parceiros-a.svg";
const imgQrCodes     = "/figma-assets/icon-qr-codes-a.svg";
const imgMediaNet    = "/figma-assets/icon-medianet-b.svg";
const imgProdNeo     = "/figma-assets/icon-prod-neo-a.svg";
const imgVendas      = "/figma-assets/icon-vendas-b.svg";
const imgComissoes   = "/figma-assets/icon-comissoes-a.svg";
const imgAppIotAi    = "/figma-assets/icon-app-iot-ai.svg";
const imgMapa        = "/figma-assets/icon-mapa.svg";
const imgConfig      = "/figma-assets/icon-config.svg";

const features = [
  { bg: "#0569ff", icon: imgHouse,     iconW: 22, iconH: 22, title: "Dashboard Global",  desc: "Visão completa do negócio em tempo real." },
  { bg: "#6e54ef", icon: imgParceiros, iconW: 20, iconH: 18, title: "Parceiros",          desc: "Gestão de parceiros e níveis." },
  { bg: "#0fb3eb", icon: imgQrCodes,   iconW: 20, iconH: 20, title: "QR Codes",           desc: "Criação e gestão de QR Codes." },
  { bg: "#004afb", icon: imgMediaNet,  iconW: 20, iconH: 17, title: "Media Network",      desc: "Gestão de mídia e campanhas." },
  { bg: "#06ae4c", icon: imgProdNeo,   iconW: 18, iconH: 20, title: "Produtos Neo",       desc: "Catálogo da linha Neo e acessórios." },
  { bg: "#faad46", icon: imgVendas,    iconW: 20, iconH: 17, title: "Vendas",             desc: "Pedidos, clientes e faturamento." },
  { bg: "#0569ff", icon: imgComissoes, iconW: 20, iconH: 20, title: "Comissões",          desc: "Cálculo e pagamento de comissões." },
  { bg: "#6e54ef", icon: imgAppIotAi,  iconW: 20, iconH: 20, title: "App + IoT + AI",     desc: "Dispositivos, IoT e inteligência." },
  { bg: "#0fb3eb", icon: imgMapa,      iconW: 20, iconH: 20, title: "Mapa Global",        desc: "Operação global e multi-região." },
  { bg: "#8a8f97", icon: imgConfig,    iconW: 20, iconH: 20, title: "Configurações",      desc: "Ajustes, usuários e permissões." },
];

export default function PlatformFeatures() {
  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#1f2e91]">Tudo em uma </span>
          <span className="text-[#0569ff]">única plataforma</span>
        </h2>

        <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full">
          {features.map((f) => (
            <div key={f.title} className="bg-[#f6f9fe] flex flex-[1_0_0] gap-[20px] items-center justify-center min-w-[240px] p-[20px] rounded-[16px]">
              <div className="flex items-center justify-center p-[15px] rounded-[12px] shrink-0 size-[60px]" style={{ backgroundColor: f.bg }}>
                <FigmaIcon src={f.icon} size={30} aspectW={f.iconW} aspectH={f.iconH} />
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">{f.title}</p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
