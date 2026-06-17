"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgParceiros  = "/figma-assets/icon-parceiros-b.svg";
const imgQrCodes    = "/figma-assets/icon-qr-codes-b.svg";
const imgMediaNet   = "/figma-assets/icon-medianet-c.svg";
const imgVendas     = "/figma-assets/icon-vendas-c.svg";
const imgComissoes  = "/figma-assets/icon-comissoes-c.svg";

const cardIcons = [
  { bgIcon: "bg-[#e9e5fd]", icon: imgParceiros,  iconW: 40, iconH: 36 },
  { bgIcon: "bg-[#dbf4f5]", icon: imgQrCodes,    iconW: 20, iconH: 20 },
  { bgIcon: "bg-[#dae9ff]", icon: imgMediaNet,   iconW: 20, iconH: 17 },
  { bgIcon: "bg-[#fef3e3]", icon: imgVendas,     iconW: 20, iconH: 17 },
  { bgIcon: "bg-[#e1f3e7]", icon: imgComissoes,  iconW: 20, iconH: 20 },
];

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  cards: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Tudo conectado em uma ",
    heading2: "única experiência",
    cards: [
      { title: "Parceiros",         desc: "Gestão completa de parceiros Gold, Silver e Platinum. Rede Silver e regras comerciais estratégicas." },
      { title: "QR Codes & Links",  desc: "Geração, rastreio, origem das vendas, performance e conversão em tempo real." },
      { title: "Media Network",     desc: "Gestão de anunciantes, campanhas, criativos e exibição em Acquafy Media e Neo Premium." },
      { title: "Produtos & Vendas", desc: "Catálogo da linha Neo, preços EUA, pedidos, clientes, faturamento e devoluções." },
      { title: "Comissões",         desc: "Cálculo e pagamento de comissões para Gold e Silver. Regra FOB do Platinum." },
    ],
  },
  en: {
    heading1: "Everything connected in a ",
    heading2: "single experience",
    cards: [
      { title: "Partners",          desc: "Full management of Gold, Silver and Platinum partners. Silver network and strategic commercial rules." },
      { title: "QR Codes & Links",  desc: "Generation, tracking, sales origin, performance and real-time conversion." },
      { title: "Media Network",     desc: "Management of advertisers, campaigns, creatives and display on Acquafy Media and Neo Premium." },
      { title: "Products & Sales",  desc: "Neo line catalog, US prices, orders, customers, billing and returns." },
      { title: "Commissions",       desc: "Commission calculation and payment for Gold and Silver. Platinum FOB rule." },
    ],
  },
  es: {
    heading1: "Todo conectado en una ",
    heading2: "única experiencia",
    cards: [
      { title: "Socios",             desc: "Gestión completa de socios Gold, Silver y Platinum. Red Silver y reglas comerciales estratégicas." },
      { title: "Códigos QR & Links", desc: "Generación, rastreo, origen de ventas, rendimiento y conversión en tiempo real." },
      { title: "Media Network",      desc: "Gestión de anunciantes, campañas, creativos y visualización en Acquafy Media y Neo Premium." },
      { title: "Productos & Ventas", desc: "Catálogo de la línea Neo, precios EUA, pedidos, clientes, facturación y devoluciones." },
      { title: "Comisiones",         desc: "Cálculo y pago de comisiones para Gold y Silver. Regla FOB del Platinum." },
    ],
  },
};

export default function PlatformExperience() {
  const { lang } = useLang();
  const t = T[lang];

  const cards = cardIcons.map((ico, i) => ({ ...ico, ...t.cards[i] }));

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#1f2e91]">{t.heading1}</span>
          <span className="text-[#0569ff]">{t.heading2}</span>
        </h2>

        <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full">
          {cards.map((c) => (
            <div key={c.title} className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[240px] p-[20px] rounded-[16px]">
              <div className={`${c.bgIcon} flex items-center justify-center p-[20px] rounded-full shrink-0 size-[80px]`}>
                <FigmaIcon src={c.icon} size={40} aspectW={c.iconW} aspectH={c.iconH} />
              </div>
              <div className="flex flex-col gap-[10px] items-start text-center w-full">
                <div className="flex items-center min-h-[40px] w-full">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">{c.title}</p>
                </div>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
