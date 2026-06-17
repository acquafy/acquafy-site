"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgBg          = "/figma-assets/bg-c.webp";
const imgProduct     = "/figma-assets/acquafy-media-totem.webp";
const imgArrowBlue   = "/figma-assets/icon-arrow-blue-outline-b.svg";
const imgArrowWhite  = "/figma-assets/icon-arrow-white-hover.svg";

const imgMarketing  = "/figma-assets/icon-marketing-landscape.svg";
const imgDivLine1   = "/figma-assets/divider-line-1.svg";
const imgDashboard  = "/figma-assets/icon-dashboard-large.svg";
const imgDivLine2   = "/figma-assets/divider-line-2.svg";
const imgAI         = "/figma-assets/icon-ai-30px-a.svg";
const imgMoney      = "/figma-assets/icon-money-large-a.svg";
const imgLocations  = "/figma-assets/icon-locations.svg";

const imgWifi       = "/figma-assets/icon-wifi-30px-a.svg";
const imgTime       = "/figma-assets/icon-time-30px.svg";
const imgBatimentos = "/figma-assets/icon-batimentos.svg";
const imgLock       = "/figma-assets/icon-lock-b.svg";

const BENEFIT_ICONS = [
  { icon: imgMarketing,  aspectW: 39.76, aspectH: 28.46 },
  { icon: imgDashboard,  aspectW: 0,     aspectH: 0 },
  { icon: imgAI,         aspectW: 0,     aspectH: 0 },
  { icon: imgMoney,      aspectW: 472,   aspectH: 440 },
  { icon: imgLocations,  aspectW: 0,     aspectH: 0 },
];

const BOTTOM_ICONS = [
  { icon: imgWifi,       aspectW: 30, aspectH: 20 },
  { icon: imgTime,       aspectW: 0,  aspectH: 0 },
  { icon: imgBatimentos, aspectW: 30, aspectH: 29 },
  { icon: imgLock,       aspectW: 27, aspectH: 30 },
];

const T: Record<Lang, {
  descLine1: string; descLine2: string;
  btnInvest: string;
  benefits: { title: string; desc: string }[];
  bottomFeatures: { title: string; desc: string }[];
}> = {
  pt: {
    descLine1: "Plataforma Inteligente de Água + Media Digital + Receita Recorrente.",
    descLine2: "Transforme locais públicos em pontos de hidratação, mídia e negócios. Ganhe com anúncios e venda dos produtos Acquafy Neo.",
    btnInvest: "Quero investir no Media Network",
    benefits: [
      { title: "Receita com Anúncios",    desc: "Monetize com companhias de alta viabilidade e marcas relevantes." },
      { title: "Dashboard do Operador",   desc: "Gestão completa de campanhas, usuários, vendas e indicadores." },
      { title: "IA + Dados Operacionais", desc: "Insights inteligentes para manutenção performance e expansão." },
      { title: "Receita Recorrente",      desc: "Modelo de receita contínua com mídia e venda de água." },
      { title: "Locais Ideais",           desc: "Aeroportos, shoppings, hospitais, empresas, universidades e muito mais." },
    ],
    bottomFeatures: [
      { title: "Conectividade Avançada",    desc: "4G/5G + Wi-Fi" },
      { title: "Suporte 24h",              desc: "Atendimento dedicado" },
      { title: "Monitoramento Inteligente", desc: "Uso, filtros e consumo" },
      { title: "Segurança de Dados",       desc: "Conformidade e LGPD" },
    ],
  },
  en: {
    descLine1: "Smart Water + Digital Media + Recurring Revenue Platform.",
    descLine2: "Transform public spaces into hydration, media and business hubs. Earn with ads and sales of Acquafy Neo products.",
    btnInvest: "I want to invest in Media Network",
    benefits: [
      { title: "Ad Revenue",            desc: "Monetize with high-viability companies and relevant brands." },
      { title: "Operator Dashboard",    desc: "Full management of campaigns, users, sales and indicators." },
      { title: "AI + Operational Data", desc: "Smart insights for maintenance, performance and expansion." },
      { title: "Recurring Revenue",     desc: "Continuous revenue model with media and water sales." },
      { title: "Ideal Locations",       desc: "Airports, malls, hospitals, businesses, universities and much more." },
    ],
    bottomFeatures: [
      { title: "Advanced Connectivity", desc: "4G/5G + Wi-Fi" },
      { title: "24h Support",           desc: "Dedicated service" },
      { title: "Smart Monitoring",      desc: "Usage, filters and consumption" },
      { title: "Data Security",         desc: "Compliance and GDPR" },
    ],
  },
  es: {
    descLine1: "Plataforma Inteligente de Agua + Media Digital + Ingresos Recurrentes.",
    descLine2: "Transforma espacios públicos en puntos de hidratación, medios y negocios. Gana con anuncios y venta de productos Acquafy Neo.",
    btnInvest: "Quiero invertir en Media Network",
    benefits: [
      { title: "Ingresos por Anuncios",  desc: "Monetiza con empresas de alta viabilidad y marcas relevantes." },
      { title: "Panel del Operador",     desc: "Gestión completa de campañas, usuarios, ventas e indicadores." },
      { title: "IA + Datos Operativos",  desc: "Insights inteligentes para mantenimiento, rendimiento y expansión." },
      { title: "Ingresos Recurrentes",   desc: "Modelo de ingresos continuos con medios y venta de agua." },
      { title: "Ubicaciones Ideales",    desc: "Aeropuertos, centros comerciales, hospitales, empresas, universidades y más." },
    ],
    bottomFeatures: [
      { title: "Conectividad Avanzada",   desc: "4G/5G + Wi-Fi" },
      { title: "Soporte 24h",             desc: "Atención dedicada" },
      { title: "Monitoreo Inteligente",   desc: "Uso, filtros y consumo" },
      { title: "Seguridad de Datos",      desc: "Conformidad y RGPD" },
    ],
  },
};

function BenefitIcon({ icon, aspectW, aspectH }: { icon: string; aspectW: number; aspectH: number }) {
  if (aspectW && aspectH) {
    return <FigmaIcon src={icon} size={20} aspectW={aspectW} aspectH={aspectH} />;
  }
  return <FigmaIcon src={icon} size={20} />;
}

export default function NeoMedia() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white relative flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="
        border border-[#cbd0d4] flex max-w-[1400px] p-[20px] relative rounded-[16px] w-full overflow-hidden
        flex-col gap-[20px] items-center justify-center
        lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-[20px]
      ">
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px] z-0"
          src={imgBg}
        />

        <div className="relative z-10 flex flex-col gap-[20px] items-start min-w-[240px] w-full lg:flex-[1_0_0]">

          <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start justify-center min-w-[240px] pt-[20px]">
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-white w-full text-center lg:text-left">
              Neo Media
            </h2>
            <div className="flex flex-wrap gap-y-[20px] items-center w-full">
              <div className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[210px] lg:items-start">
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-white w-full text-center lg:text-left">
                  {t.descLine1}
                  <br />
                  {t.descLine2}
                </p>

                <a href="/contato" className="
                  group bg-white border border-[#0233c3]
                  hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors
                  flex gap-[10px] items-center justify-center
                  min-h-[30px] px-[20px] py-[10px] rounded-[8px] shrink-0
                  w-full lg:w-fit cursor-pointer
                ">
                  <span className="
                    font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px]
                    text-[#0233c3] group-hover:text-white group-active:text-white
                    transition-colors text-center
                  ">
                    {t.btnInvest}
                  </span>
                  <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
                    <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0">
                      <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
                    </div>
                    <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100">
                      <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[20px] items-start min-w-[240px] shrink-0 w-full">

            <div className="bg-white border border-[#cbd0d4] flex flex-wrap gap-[20px_10px] items-start justify-center overflow-hidden p-[20px] rounded-[16px] shrink-0 w-full">
              {BENEFIT_ICONS.map((b, i) => (
                <div key={i} className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[150px]">
                  <div className="flex flex-col gap-[20px] h-[65px] items-start justify-center w-full shrink-0">
                    <BenefitIcon icon={b.icon} aspectW={b.aspectW} aspectH={b.aspectH} />
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] min-h-[25px] w-full">
                      {t.benefits[i].title}
                    </p>
                  </div>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b] min-h-[75px] w-full">
                    {t.benefits[i].desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-[#cbd0d4] flex flex-wrap gap-[10px] items-center justify-center overflow-hidden p-[20px] rounded-[16px] shrink-0 w-full">
              {BOTTOM_ICONS.map((f, i) => (
                <div key={i} className="flex flex-[1_0_0] gap-[10px] items-center min-w-[120px]">
                  <BenefitIcon icon={f.icon} aspectW={f.aspectW} aspectH={f.aspectH} />
                  <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-0">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[15px] text-[#1f2e91] w-full">
                      {t.bottomFeatures[i].title}
                    </p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[16px] text-[#2a2a2b] w-full">
                      {t.bottomFeatures[i].desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        <div className="
          relative flex flex-wrap gap-y-[40px] items-center justify-center
          min-w-[240px] max-w-[350px] max-h-[430px]
          w-full lg:flex-[1_0_0] lg:aspect-[350/430] relative z-10
        ">
          <div className="flex flex-col items-center justify-center h-[430px] w-[151px] shrink-0">
            <div className="flex-[1_0_0] min-h-px relative" style={{ aspectRatio: "1441 / 4096" }}>
              <img
                alt="Acquafy Neo Media"
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={imgProduct}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
