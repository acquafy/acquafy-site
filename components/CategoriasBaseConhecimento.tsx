"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgArrowBlue = "/figma-assets/icon-arrow-blue-b.svg";

const imgAguaPura   = "/figma-assets/icon-agua-pura.svg";
const imgMobile     = "/figma-assets/icon-mobile-b.svg";
const imgMedia      = "/figma-assets/icon-media.svg";
const imgParceria   = "/figma-assets/icon-parceria-a.svg";
const imgMoney      = "/figma-assets/icon-money-b.svg";
const imgManutencao = "/figma-assets/icon-manutencao.svg";

// Icon metadata (static, not translated)
const iconMeta = [
  { icon: imgAguaPura,   aspectW: 642.7, aspectH: 630.7, href: "/artigos#produtos" },
  { icon: imgMobile,     aspectW: 21,    aspectH: 30,    href: "/artigos#app-ai-iot" },
  { icon: imgMedia,      aspectW: 30,    aspectH: 30,    href: "/artigos#media-network" },
  { icon: imgParceria,   aspectW: 1125,  aspectH: 1078,  href: "/artigos#parceiros" },
  { icon: imgMoney,      aspectW: 33.3,  aspectH: 30,    href: "/artigos#faturamento" },
  { icon: imgManutencao, aspectW: 30,    aspectH: 30,    href: "/artigos#instalacao-e-manutencao" },
];

const T: Record<Lang, {
  heading: string;
  headingHighlight: string;
  subheading: string;
  viewTopics: string;
  categorias: { title: string; desc: string }[];
}> = {
  pt: {
    heading: "Como",
    headingHighlight: "podemos ajudar?",
    subheading: "Escolha o assunto para encontrar as melhores soluções.",
    viewTopics: "Ver tópicos",
    categorias: [
      { title: "Produtos",                desc: "Informações sobre Linha Neo, Acquafy Media, filtros, acessórios e especificações." },
      { title: "App + AI + IoT",          desc: "Suporte ao aplicativo, conectividade, sensores, IA e integração IoT." },
      { title: "Media Network",           desc: "Dúvidas sobre anúncios, QR Codes, campanhas e receita recorrente." },
      { title: "Parceiros",               desc: "Informações para parceiros, Gold Partner, contratos e materiais de apoio." },
      { title: "Faturamento",             desc: "Dúvidas sobre pedidos, faturas, pagamentos e comissões." },
      { title: "Instalação e Manutenção", desc: "Instalação, manutenção preventiva, limpeza e suporte técnico." },
    ],
  },
  en: {
    heading: "How can",
    headingHighlight: "we help you?",
    subheading: "Choose a topic to find the best solutions.",
    viewTopics: "View topics",
    categorias: [
      { title: "Products",                  desc: "Information about the Neo Line, Acquafy Media, filters, accessories and specifications." },
      { title: "App + AI + IoT",            desc: "App support, connectivity, sensors, AI and IoT integration." },
      { title: "Media Network",             desc: "Questions about ads, QR Codes, campaigns and recurring revenue." },
      { title: "Partners",                  desc: "Information for partners, Gold Partner, contracts and support materials." },
      { title: "Billing",                   desc: "Questions about orders, invoices, payments and commissions." },
      { title: "Installation & Maintenance",desc: "Installation, preventive maintenance, cleaning and technical support." },
    ],
  },
  es: {
    heading: "¿Cómo",
    headingHighlight: "podemos ayudarte?",
    subheading: "Elige el tema para encontrar las mejores soluciones.",
    viewTopics: "Ver temas",
    categorias: [
      { title: "Productos",                    desc: "Información sobre la Línea Neo, Acquafy Media, filtros, accesorios y especificaciones." },
      { title: "App + AI + IoT",               desc: "Soporte a la aplicación, conectividad, sensores, IA e integración IoT." },
      { title: "Media Network",                desc: "Dudas sobre anuncios, códigos QR, campañas e ingresos recurrentes." },
      { title: "Socios",                       desc: "Información para socios, Gold Partner, contratos y materiales de apoyo." },
      { title: "Facturación",                  desc: "Dudas sobre pedidos, facturas, pagos y comisiones." },
      { title: "Instalación y Mantenimiento",  desc: "Instalación, mantenimiento preventivo, limpieza y soporte técnico." },
    ],
  },
};

export default function CategoriasBaseConhecimento() {
  const { lang } = useLang();
  const t = T[lang];

  const categorias = t.categorias.map((cat, i) => ({
    ...cat,
    icon: iconMeta[i].icon,
    aspectW: iconMeta[i].aspectW,
    aspectH: iconMeta[i].aspectH,
    href: iconMeta[i].href,
  }));

  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            {t.heading}{" "}
            <span className="text-[#0569ff]">{t.headingHighlight}</span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] w-full">
            {t.subheading}
          </p>
        </div>

        {/* Category cards */}
        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {categorias.map((cat) => (
            <a
              key={cat.title}
              href={cat.href}
              className="bg-[#f6f9fe] hover:bg-[#eaf0fd] hover:shadow-[0_4px_16px_0_rgba(2,51,195,0.10)]
                transition-all duration-200
                flex flex-[1_0_0] flex-col gap-[20px] items-center justify-between
                min-w-[200px] p-[20px] rounded-[16px] cursor-pointer group no-underline"
            >
              {/* Icon circle */}
              <div className="bg-[#f6f9fe] flex flex-col items-center justify-center p-[20px] rounded-full shrink-0 size-[80px] group-hover:bg-[#e0e9fc] transition-colors">
                <FigmaIcon src={cat.icon} size={40} aspectW={cat.aspectW} aspectH={cat.aspectH} />
              </div>

              {/* Title */}
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] text-center min-h-[32px] w-full">
                {cat.title}
              </p>

              {/* Description */}
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center min-h-[50px] w-full flex-1">
                {cat.desc}
              </p>

              {/* Link */}
              <div className="flex gap-[5px] items-center justify-center shrink-0">
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] text-center whitespace-nowrap">
                  {t.viewTopics}
                </span>
                <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
