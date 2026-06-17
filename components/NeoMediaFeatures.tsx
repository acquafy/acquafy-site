"use client";
// "Uma plataforma física de hidratação, mídia e conversão" (Figma node 3258:4218)
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgMarketing = "/figma-assets/icon-marketing-a.svg";
const imgDashboard = "/figma-assets/icon-dashboard.svg";
const imgBrain     = "/figma-assets/icon-brain-a.svg";
const imgMoney     = "/figma-assets/icon-money-d.svg";
const imgQR        = "/figma-assets/icon-qr-a.svg";
const imgLocal     = "/figma-assets/icon-local-a.svg";

// aspectW/aspectH extraídos do Figma (node 3258:4218):
// marketing → 39.76×28.46 (landscape), dashboard → 642×642 (sq),
// brain → 30×30 (sq), money → 33.33×30 (landscape), qr → 629×629 (sq), local → 24.63×30 (portrait)

const T: Record<Lang, {
  heading1: string;
  headingHighlight: string;
  features: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Uma plataforma física de ",
    headingHighlight: "hidratação, mídia e conversão",
    features: [
      { title: "Receita com anúncios",    desc: "Monetize campanhas publicitárias e aumente a visibilidade de marcas no seu ponto." },
      { title: "Dashboard do operador",   desc: "Gerencie campanhas, usuários, vendas e indicadores em um painel completo e intuitivo." },
      { title: "AI + Dados operacionais", desc: "Insights inteligentes para manutenção, performance, uso e expansão da sua rede." },
      { title: "Receita recorrente",      desc: "Modelo de negócio combinando mídia, água e vendas de produtos com recorrência." },
      { title: "QR Codes e vendas Neo",   desc: "Converta escaneamentos em vendas da linha Neo e ganhe comissões automáticas." },
      { title: "Locais ideais",           desc: "Aeroportos, shoppings, hospitais, empresas, universidades e áreas públicos de alto fluxo." },
    ],
  },
  en: {
    heading1: "A physical platform for ",
    headingHighlight: "hydration, media and conversion",
    features: [
      { title: "Ad revenue",             desc: "Monetize advertising campaigns and increase brand visibility at your location." },
      { title: "Operator dashboard",     desc: "Manage campaigns, users, sales and indicators in a complete and intuitive panel." },
      { title: "AI + Operational data",  desc: "Intelligent insights for maintenance, performance, usage and network expansion." },
      { title: "Recurring revenue",      desc: "Business model combining media, water and recurring product sales." },
      { title: "QR Codes and Neo sales", desc: "Convert scans into Neo line sales and earn automatic commissions." },
      { title: "Ideal locations",        desc: "Airports, malls, hospitals, companies, universities and high-traffic public areas." },
    ],
  },
  es: {
    heading1: "Una plataforma física de ",
    headingHighlight: "hidratación, medios y conversión",
    features: [
      { title: "Ingresos con anuncios",    desc: "Monetiza campañas publicitarias y aumenta la visibilidad de marcas en tu punto." },
      { title: "Dashboard del operador",   desc: "Gestiona campañas, usuarios, ventas e indicadores en un panel completo e intuitivo." },
      { title: "AI + Datos operacionales", desc: "Insights inteligentes para mantenimiento, rendimiento, uso y expansión de tu red." },
      { title: "Ingresos recurrentes",     desc: "Modelo de negocio que combina medios, agua y ventas de productos con recurrencia." },
      { title: "Códigos QR y ventas Neo",  desc: "Convierte escaneos en ventas de la línea Neo y gana comisiones automáticas." },
      { title: "Ubicaciones ideales",      desc: "Aeropuertos, centros comerciales, hospitales, empresas, universidades y áreas públicas de alto tráfico." },
    ],
  },
};

const iconSrcs  = [imgMarketing, imgDashboard, imgBrain, imgMoney, imgQR, imgLocal];
const aspectWs  = [39.76, 32, 30, 33.33, 32, 24.63];
const aspectHs  = [28.46, 32, 30, 30,    32, 30];

export default function NeoMediaFeatures() {
  const { lang } = useLang();
  const t = T[lang];

  const features = t.features.map((f, i) => ({
    icon: iconSrcs[i],
    aspectW: aspectWs[i],
    aspectH: aspectHs[i],
    title: f.title,
    desc: f.desc,
  }));

  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {t.heading1}
          <span className="text-[#0569ff]">{t.headingHighlight}</span>
        </h2>
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[250px] min-w-[180px] overflow-hidden px-[10px] py-[20px] rounded-[16px]"
            >
              <div className="flex flex-col items-center justify-center size-[40px]">
                <FigmaIcon src={f.icon} size={32} aspectW={f.aspectW} aspectH={f.aspectH} />
              </div>
              <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center flex items-center justify-center min-h-[44px] w-full">
                {f.title}
              </h3>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] text-center w-full">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
