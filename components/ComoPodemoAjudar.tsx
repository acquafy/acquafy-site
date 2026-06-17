"use client";

import { useState } from "react";
import { useLang, type Lang } from "@/context/LanguageContext";
import FigmaIcon from "./FigmaIcon";
import TopicPopup from "./TopicPopup";

const imgArrowBlue = "/figma-assets/icon-arrow-blue-b.svg";

const imgAguaPura   = "/figma-assets/icon-agua-pura.svg";
const imgMobile     = "/figma-assets/icon-mobile-b.svg";
const imgMedia      = "/figma-assets/icon-media.svg";
const imgParceria   = "/figma-assets/icon-parceria-a.svg";
const imgMoney      = "/figma-assets/icon-money-b.svg";
const imgManutencao = "/figma-assets/icon-manutencao.svg";

const topicsMeta = [
  { icon: imgAguaPura,   aspectW: 642.7, aspectH: 630.7, categorySlug: "produtos" },
  { icon: imgMobile,     aspectW: 21,    aspectH: 30,    categorySlug: "app-ai-iot" },
  { icon: imgMedia,      aspectW: 30,    aspectH: 30,    categorySlug: "media-network" },
  { icon: imgParceria,   aspectW: 1125,  aspectH: 1078,  categorySlug: "parceiros" },
  { icon: imgMoney,      aspectW: 33.3,  aspectH: 30,    categorySlug: "faturamento" },
  { icon: imgManutencao, aspectW: 30,    aspectH: 30,    categorySlug: "instalacao-e-manutencao" },
];

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  subtitle: string;
  cta: string;
  topics: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Como",
    heading2: "podemos ajudar?",
    subtitle: "Escolha o assunto para encontrar as melhores soluções.",
    cta: "Ver tópicos",
    topics: [
      { title: "Produtos",                desc: "Informações sobre Linha Neo, Acquafy Media, filtros acessórios e especificações." },
      { title: "App + AI + IoT",          desc: "Suporte ao aplicativo, conectividade, sensores, IA e integração IoT." },
      { title: "Media Network",           desc: "Dúvidas sobre anúncios, QR Codes, campanhas e receita recorrente." },
      { title: "Parceiros",               desc: "Informações para parceiros, Gold Partner, contratos e materiais de apoio." },
      { title: "Faturamento",             desc: "Dúvidas sobre pedidos, faturas, pagamentos e comissões." },
      { title: "Instalação e Manutenção", desc: "Instalação, manutenção preventiva, limpeza e suporte técnico." },
    ],
  },
  en: {
    heading1: "How Can",
    heading2: "We Help You?",
    subtitle: "Choose a topic to find the best solutions.",
    cta: "View topics",
    topics: [
      { title: "Products",                 desc: "Information about the Neo Line, Acquafy Media, filter accessories and specifications." },
      { title: "App + AI + IoT",           desc: "App support, connectivity, sensors, AI and IoT integration." },
      { title: "Media Network",            desc: "Questions about ads, QR Codes, campaigns and recurring revenue." },
      { title: "Partners",                 desc: "Information for partners, Gold Partner, contracts and support materials." },
      { title: "Billing",                  desc: "Questions about orders, invoices, payments and commissions." },
      { title: "Installation & Maintenance", desc: "Installation, preventive maintenance, cleaning and technical support." },
    ],
  },
  es: {
    heading1: "¿Cómo Podemos",
    heading2: "Ayudarte?",
    subtitle: "Elige el tema para encontrar las mejores soluciones.",
    cta: "Ver temas",
    topics: [
      { title: "Productos",                   desc: "Información sobre la Línea Neo, Acquafy Media, filtros accesorios y especificaciones." },
      { title: "App + AI + IoT",              desc: "Soporte a la aplicación, conectividad, sensores, IA e integración IoT." },
      { title: "Media Network",               desc: "Dudas sobre anuncios, QR Codes, campañas e ingresos recurrentes." },
      { title: "Socios",                      desc: "Información para socios, Gold Partner, contratos y materiales de apoyo." },
      { title: "Facturación",                 desc: "Dudas sobre pedidos, facturas, pagos y comisiones." },
      { title: "Instalación y Mantenimiento", desc: "Instalación, mantenimiento preventivo, limpieza y soporte técnico." },
    ],
  },
};

export default function ComoPodemoAjudar() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const { lang } = useLang();
  const t = T[lang];

  return (
    <>
      <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
        <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

          {/* Header */}
          <div className="flex flex-col gap-[10px] items-start text-center w-full">
            <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
              {t.heading1}{" "}
              <span className="text-[#0569ff]">{t.heading2}</span>
            </h2>
            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
              {t.subtitle}
            </p>
          </div>

          {/* Topic cards */}
          <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
            {topicsMeta.map((meta, i) => {
              const topic = t.topics[i];
              return (
                <button
                  key={meta.categorySlug}
                  onClick={() => setOpenSlug(meta.categorySlug)}
                  className="bg-[#f6f9fe] hover:bg-[#eaf0fd] transition-colors flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[200px] p-[20px] rounded-[16px] cursor-pointer group"
                >
                  <div className="bg-[#f6f9fe] flex flex-col items-center justify-center p-[20px] rounded-full shrink-0 size-[80px]">
                    <FigmaIcon src={meta.icon} size={40} aspectW={meta.aspectW} aspectH={meta.aspectH} />
                  </div>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] text-center min-h-[32px] w-full">
                    {topic.title}
                  </p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] text-center min-h-[50px] w-full">
                    {topic.desc}
                  </p>
                  <div className="flex gap-[5px] items-center justify-center">
                    <span className="font-['Articulat_CF:Bold'] text-[14px] text-[#0233c3] text-center whitespace-nowrap">
                      {t.cta}
                    </span>
                    <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <TopicPopup slug={openSlug} onClose={() => setOpenSlug(null)} />
    </>
  );
}
