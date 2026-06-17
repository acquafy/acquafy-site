"use client";
// "Conectado à Plataforma Acquafy" (Figma node 3265:4714)
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgAppHome     = "/figma-assets/app-home-screen.webp";
const imgAppOp       = "/figma-assets/app-operations-screen.webp";
const imgQRLinks     = "/figma-assets/icon-qr-links.svg";
const imgMediaNet    = "/figma-assets/icon-medianet-a.svg";
const imgSilver      = "/figma-assets/product-silver-a.webp";
const imgGold        = "/figma-assets/product-gold-a.webp";
const imgPlatinum    = "/figma-assets/product-platinum-a.webp";
const imgVendas      = "/figma-assets/icon-vendas-a.svg";
const imgMapaGlobal  = "/figma-assets/icon-mapa-global.svg";

const T: Record<Lang, {
  heading: string;
  headingHighlight: string;
  cards: { title: string; desc: string; visual: string }[];
}> = {
  pt: {
    heading: "Conectado à",
    headingHighlight: "Plataforma Acquafy",
    cards: [
      { title: "App + AI + IoT",                  desc: "Integração completa com app, sensores e inteligência artificial para operação autônoma e eficiente.",                   visual: "app" },
      { title: "QR Codes e Links Rastreáveis",     desc: "Campanhas com QR Codes e links rastreáveis para medir impacto, origem e conversão em vendas.",                          visual: "qr" },
      { title: "Media Network",                    desc: "Acesso ao Media Network Acquafy com marcas globais e campanhas segmentadas.",                                            visual: "media" },
      { title: "Parceiros Silver, Gold & Platinum",desc: "Ecossistema de parceiros com níveis e benefícios exclusivos para sua operação.",                                        visual: "partners" },
      { title: "Vendas e Comissões",               desc: "Venda a linha Neo e ganhe 20% de comissão por cada conversão via QR Code.",                                            visual: "vendas" },
      { title: "Plataforma Global",                desc: "Pronta para operar em mais de 180 países e 16 idiomas diferentes.",                                                    visual: "mapa" },
    ],
  },
  en: {
    heading: "Connected to the",
    headingHighlight: "Acquafy Platform",
    cards: [
      { title: "App + AI + IoT",                  desc: "Full integration with app, sensors and artificial intelligence for autonomous and efficient operation.",                  visual: "app" },
      { title: "QR Codes & Trackable Links",       desc: "Campaigns with QR Codes and trackable links to measure impact, source and conversion into sales.",                       visual: "qr" },
      { title: "Media Network",                    desc: "Access to the Acquafy Media Network with global brands and segmented campaigns.",                                        visual: "media" },
      { title: "Silver, Gold & Platinum Partners", desc: "Partner ecosystem with exclusive tiers and benefits for your operation.",                                               visual: "partners" },
      { title: "Sales & Commissions",              desc: "Sell the Neo line and earn 20% commission for each conversion via QR Code.",                                           visual: "vendas" },
      { title: "Global Platform",                  desc: "Ready to operate in more than 180 countries and 16 different languages.",                                              visual: "mapa" },
    ],
  },
  es: {
    heading: "Conectado a la",
    headingHighlight: "Plataforma Acquafy",
    cards: [
      { title: "App + AI + IoT",                   desc: "Integración completa con app, sensores e inteligencia artificial para una operación autónoma y eficiente.",             visual: "app" },
      { title: "Códigos QR y Enlaces Rastreables",  desc: "Campañas con códigos QR y enlaces rastreables para medir impacto, origen y conversión en ventas.",                     visual: "qr" },
      { title: "Media Network",                     desc: "Acceso a la Media Network Acquafy con marcas globales y campañas segmentadas.",                                         visual: "media" },
      { title: "Socios Silver, Gold & Platinum",    desc: "Ecosistema de socios con niveles y beneficios exclusivos para su operación.",                                          visual: "partners" },
      { title: "Ventas y Comisiones",               desc: "Vende la línea Neo y gana 20% de comisión por cada conversión vía código QR.",                                        visual: "vendas" },
      { title: "Plataforma Global",                 desc: "Lista para operar en más de 180 países y 16 idiomas diferentes.",                                                     visual: "mapa" },
    ],
  },
};

function CardVisual({ visual }: { visual: string }) {
  if (visual === "app") {
    return (
      <div className="flex items-end justify-center w-full h-[100px] relative">
        <div className="flex items-end justify-center w-full">
          <img
            src={imgAppHome}
            alt="App Home"
            className="flex-1 min-w-0 max-w-[100px] max-h-[100px] object-contain mr-[-18px]"
          />
          <img
            src={imgAppOp}
            alt="App Operador"
            className="flex-1 min-w-0 max-w-[100px] max-h-[100px] object-contain"
          />
        </div>
      </div>
    );
  }
  if (visual === "partners") {
    return (
      <div className="flex items-center justify-center gap-[10px] h-[100px]">
        <img src={imgPlatinum} alt="Platinum" className="flex-[1_0_0] min-w-0 h-full object-contain" />
        <img src={imgGold}     alt="Gold"     className="flex-[1_0_0] min-w-0 h-full object-contain" />
        <img src={imgSilver}   alt="Silver"   className="flex-[1_0_0] min-w-0 h-full object-contain" />
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
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-[#f2f6fd] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {t.heading}{" "}
          <span className="text-[#0569ff]">{t.headingHighlight}</span>
        </h2>
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {t.cards.map((c) => (
            <div
              key={c.title}
              className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[320px] min-w-[180px] win-1024:min-w-[300px] win-1280:min-w-[180px] p-[20px] rounded-[16px] overflow-hidden"
            >
              <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#333] text-center flex items-center justify-center min-h-[44px] w-full">
                {c.title}
              </h3>
              <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
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
