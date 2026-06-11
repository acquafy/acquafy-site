// "Conectado à Plataforma Acquafy" (Figma node 3265:4714)
import FigmaIcon from "./FigmaIcon";

const imgAppHome     = "/figma-assets/b9b12f04-77fe-4bac-9edc-dac3265689fd.png";
const imgAppOp       = "/figma-assets/511b4a22-c94f-48e8-9948-b73b920bbe7b.png";
const imgQRLinks     = "/figma-assets/f802a7a5-c271-4ee9-b040-3b2d478de229.svg";
const imgMediaNet    = "/figma-assets/a50a8134-2d45-4253-9877-3edcaf4b77d4.svg";
const imgSilver      = "/figma-assets/39731139-a944-4e22-8e59-58e0929a64e9.png";
const imgGold        = "/figma-assets/47e09c17-5072-4c01-832f-1c7df045d4a5.png";
const imgPlatinum    = "/figma-assets/aec1b912-4cbe-45d3-a29f-a99638f5ddcf.png";
const imgVendas      = "/figma-assets/86c9331c-c79e-4077-8e2b-bea2e6972486.svg";
const imgMapaGlobal  = "/figma-assets/b223fb77-3c38-4cfd-a009-91fef475f7df.svg";

const cards = [
  {
    title: "App + AI + IoT",
    desc: "Integração completa com app, sensores e inteligência artificial para operação autônoma e eficiente.",
    visual: "app",
  },
  {
    title: "QR Codes e Links Rastreáveis",
    desc: "Campanhas com QR Codes e links rastreáveis para medir impacto, origem e conversão em vendas.",
    visual: "qr",
  },
  {
    title: "Media Network",
    desc: "Acesso ao Media Network Acquafy com marcas globais e campanhas segmentadas.",
    visual: "media",
  },
  {
    title: "Parceiros Silver, Gold & Platinum",
    desc: "Ecossistema de parceiros com níveis e benefícios exclusivos para sua operação.",
    visual: "partners",
  },
  {
    title: "Vendas e Comissões",
    desc: "Venda a linha Neo e ganhe 20% de comissão por cada conversão via QR Code.",
    visual: "vendas",
  },
  {
    title: "Plataforma Global",
    desc: "Pronta para operar em mais de 180 países e 16 idiomas diferentes.",
    visual: "mapa",
  },
];

function CardVisual({ visual }: { visual: string }) {
  if (visual === "app") {
    return (
      <div className="flex items-end justify-center w-full h-[100px] relative">
        <div className="flex items-end justify-center w-full">
          <img
            src={imgAppHome}
            alt="App Home"
            className="flex-1 min-w-0 max-h-[100px] object-contain mr-[-18px]"
          />
          <img
            src={imgAppOp}
            alt="App Operador"
            className="flex-1 min-w-0 max-h-[100px] object-contain"
          />
        </div>
      </div>
    );
  }
  if (visual === "partners") {
    return (
      <div className="flex items-center justify-center gap-[10px] h-[100px]">
        <img src={imgPlatinum} alt="Platinum" className="size-[56px] object-contain" />
        <img src={imgGold}     alt="Gold"     className="size-[56px] object-contain" />
        <img src={imgSilver}   alt="Silver"   className="size-[46px] object-contain" />
      </div>
    );
  }
  const iconMap: Record<string, string> = {
    qr:    imgQRLinks,
    media: imgMediaNet,
    vendas: imgVendas,
    mapa:  imgMapaGlobal,
  };
  const src = iconMap[visual];
  return (
    <div className="flex items-center justify-center h-[100px]">
      <FigmaIcon src={src} size={80} />
    </div>
  );
}

export default function NeoMediaPlatform() {
  return (
    <section className="bg-[#f2f6fd] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[26px] leading-[28px] text-[#1f2e91] text-center w-full">
          Conectado à{" "}
          <span className="text-[#0569ff]">Plataforma Acquafy</span>
        </h2>
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[320px] min-w-[200px] p-[20px] rounded-[16px]"
            >
              <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[22px] text-[#333] text-center flex items-center justify-center min-h-[44px] w-full">
                {c.title}
              </h3>
              <div className="flex-1 flex items-center justify-center w-full">
                <CardVisual visual={c.visual} />
              </div>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] text-center w-full">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
