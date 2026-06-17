"use client";

import { useState } from "react";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  h2plain: string;
  h2highlight: string;
  subtitle: string;
  faqs: { pergunta: string; resposta: string }[];
}> = {
  pt: {
    h2plain: "Perguntas ",
    h2highlight: "frequentes",
    subtitle: "Respostas rápidas para as dúvidas mais comuns sobre os produtos e serviços Acquafy.",
    faqs: [
      {
        pergunta: "Qual é a diferença entre os modelos Neo Essentials e Neo Premium?",
        resposta: "A linha Neo Essentials (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX e variantes) possui painel LED 10.1\" e é focada em custo-benefício com tecnologia UV LED + UF. A linha Neo Premium (INFINITY, PRESTIGE e PRIME) conta com painel IPS 15.6\", filtração por Osmose Reversa (RO) e acabamento de alto padrão. Todos os modelos possuem conectividade Wi-Fi 5 e Bluetooth 5.3.",
      },
      {
        pergunta: "Como faço para baixar e configurar o aplicativo Acquafy?",
        resposta: "O aplicativo Acquafy está disponível na App Store (iOS) e Google Play (Android). Após instalar, crie sua conta, aproxime o smartphone do purificador via Bluetooth 5.3 para emparelhar e siga o assistente de configuração de Wi-Fi. O processo leva menos de 5 minutos.",
      },
      {
        pergunta: "Com que frequência devo trocar o filtro do purificador?",
        resposta: "Os filtros Neo têm vida útil de 365 dias ou conforme o consumo de água. O aplicativo Acquafy monitora em tempo real o ciclo do filtro e envia alertas quando a troca se aproxima. O sistema de Reposição Inteligente pode fazer o pedido automaticamente pelo app.",
      },
      {
        pergunta: "Como me tornar um parceiro Acquafy?",
        resposta: "Existem três níveis de parceria: Silver (afiliado/indicador, comissão de 20%, sem investimento inicial), Gold (operador Acquafy Media, comissão de 20% em vendas + receita de anúncios, entrada a partir de US$2.000) e Platinum (distribuidor regional, desconto de 70% no preço USA, modelo FOB). Acesse a página de Parceiros no site ou entre em contato com nossa equipe.",
      },
      {
        pergunta: "O que é a Acquafy Media e como gera receita recorrente?",
        resposta: "A Acquafy Media é um sistema de mídia integrado ao painel touchscreen dos purificadores Neo. Negócios locais podem anunciar no display e os parceiros Gold ganham receita mensal por cada anúncio exibido. Os usuários também interagem via QR Code nas campanhas, gerando dados de engajamento.",
      },
      {
        pergunta: "O purificador Neo funciona com água de poço ou apenas água de rede?",
        resposta: "Os modelos da linha Essentials são indicados para água de rede (com pressão de 20 a 80 PSI). A linha Premium com tecnologia RO (Osmose Reversa) pode tratar água com maior variação de qualidade. Para situações específicas como água de poço, recomendamos contato com um especialista técnico para avaliação.",
      },
      {
        pergunta: "Qual o prazo de garantia dos produtos Acquafy?",
        resposta: "Os purificadores Neo possuem garantia de 1 ano contra defeitos de fabricação. O registro de garantia deve ser feito pelo aplicativo Acquafy ou pelo portal de suporte. Defeitos causados por instalação incorreta, uso inadequado ou manutenção negligenciada não são cobertos pela garantia.",
      },
      {
        pergunta: "Em quantos países a Acquafy opera?",
        resposta: "A Acquafy está presente em mais de 180 países, com operação 100% global e suporte disponível em 16 idiomas. O modelo de negócio permite que parceiros distribuidores regionais operem localmente com suporte da plataforma central.",
      },
    ],
  },
  en: {
    h2plain: "Frequently ",
    h2highlight: "Asked Questions",
    subtitle: "Quick answers to the most common questions about Acquafy products and services.",
    faqs: [
      {
        pergunta: "What is the difference between the Neo Essentials and Neo Premium models?",
        resposta: "The Neo Essentials line (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX and variants) features a 10.1\" LED panel and focuses on cost-effectiveness with UV LED + UF technology. The Neo Premium line (INFINITY, PRESTIGE and PRIME) comes with a 15.6\" IPS panel, Reverse Osmosis (RO) filtration and premium finish. All models have Wi-Fi 5 and Bluetooth 5.3 connectivity.",
      },
      {
        pergunta: "How do I download and set up the Acquafy app?",
        resposta: "The Acquafy app is available on the App Store (iOS) and Google Play (Android). After installing, create your account, bring your smartphone close to the purifier via Bluetooth 5.3 to pair, and follow the Wi-Fi setup wizard. The process takes less than 5 minutes.",
      },
      {
        pergunta: "How often should I replace the purifier filter?",
        resposta: "Neo filters have a lifespan of 365 days or according to water consumption. The Acquafy app monitors the filter cycle in real time and sends alerts when replacement is approaching. The Smart Replenishment system can automatically place the order through the app.",
      },
      {
        pergunta: "How do I become an Acquafy partner?",
        resposta: "There are three partnership levels: Silver (affiliate/referral, 20% commission, no initial investment), Gold (Acquafy Media operator, 20% commission on sales + ad revenue, starting from US$2,000) and Platinum (regional distributor, 70% discount on US price, FOB model). Visit the Partners page on the website or contact our team.",
      },
      {
        pergunta: "What is Acquafy Media and how does it generate recurring revenue?",
        resposta: "Acquafy Media is a media system integrated into the touchscreen panel of Neo purifiers. Local businesses can advertise on the display and Gold partners earn monthly revenue for each ad shown. Users also interact via QR Code in campaigns, generating engagement data.",
      },
      {
        pergunta: "Does the Neo purifier work with well water or only tap water?",
        resposta: "Essentials line models are designed for tap water (with pressure from 20 to 80 PSI). The Premium line with RO (Reverse Osmosis) technology can treat water with greater quality variation. For specific situations such as well water, we recommend contacting a technical specialist for evaluation.",
      },
      {
        pergunta: "What is the warranty period for Acquafy products?",
        resposta: "Neo purifiers have a 1-year warranty against manufacturing defects. Warranty registration must be done through the Acquafy app or the support portal. Defects caused by incorrect installation, improper use or neglected maintenance are not covered by the warranty.",
      },
      {
        pergunta: "In how many countries does Acquafy operate?",
        resposta: "Acquafy is present in more than 180 countries, with 100% global operations and support available in 16 languages. The business model allows regional distributor partners to operate locally with support from the central platform.",
      },
    ],
  },
  es: {
    h2plain: "Preguntas ",
    h2highlight: "Frecuentes",
    subtitle: "Respuestas rápidas a las dudas más comunes sobre los productos y servicios Acquafy.",
    faqs: [
      {
        pergunta: "¿Cuál es la diferencia entre los modelos Neo Essentials y Neo Premium?",
        resposta: "La línea Neo Essentials (Neo UP, FIT, SMART H₂, TOUCH, PLUS, ULTRA, MAX y variantes) tiene panel LED 10.1\" y se centra en la relación calidad-precio con tecnología UV LED + UF. La línea Neo Premium (INFINITY, PRESTIGE y PRIME) cuenta con panel IPS 15.6\", filtración por Ósmosis Inversa (RO) y acabado premium. Todos los modelos tienen conectividad Wi-Fi 5 y Bluetooth 5.3.",
      },
      {
        pergunta: "¿Cómo descargo y configuro la aplicación Acquafy?",
        resposta: "La aplicación Acquafy está disponible en la App Store (iOS) y Google Play (Android). Después de instalarla, crea tu cuenta, acerca el smartphone al purificador mediante Bluetooth 5.3 para emparejarlo y sigue el asistente de configuración Wi-Fi. El proceso tarda menos de 5 minutos.",
      },
      {
        pergunta: "¿Con qué frecuencia debo cambiar el filtro del purificador?",
        resposta: "Los filtros Neo tienen una vida útil de 365 días o según el consumo de agua. La aplicación Acquafy monitorea en tiempo real el ciclo del filtro y envía alertas cuando se acerca el cambio. El sistema de Reposición Inteligente puede realizar el pedido automáticamente a través de la app.",
      },
      {
        pergunta: "¿Cómo me convierto en socio de Acquafy?",
        resposta: "Existen tres niveles de asociación: Silver (afiliado/referido, comisión del 20%, sin inversión inicial), Gold (operador de Acquafy Media, comisión del 20% en ventas + ingresos por publicidad, entrada desde US$2,000) y Platinum (distribuidor regional, descuento del 70% en el precio USA, modelo FOB). Accede a la página de Socios en el sitio web o contacta con nuestro equipo.",
      },
      {
        pergunta: "¿Qué es Acquafy Media y cómo genera ingresos recurrentes?",
        resposta: "Acquafy Media es un sistema de medios integrado en el panel táctil de los purificadores Neo. Los negocios locales pueden anunciarse en el display y los socios Gold obtienen ingresos mensuales por cada anuncio mostrado. Los usuarios también interactúan mediante código QR en las campañas, generando datos de participación.",
      },
      {
        pergunta: "¿El purificador Neo funciona con agua de pozo o solo con agua de red?",
        resposta: "Los modelos de la línea Essentials están diseñados para agua de red (con presión de 20 a 80 PSI). La línea Premium con tecnología RO (Ósmosis Inversa) puede tratar agua con mayor variación de calidad. Para situaciones específicas como agua de pozo, recomendamos contactar a un especialista técnico para evaluación.",
      },
      {
        pergunta: "¿Cuál es el período de garantía de los productos Acquafy?",
        resposta: "Los purificadores Neo tienen garantía de 1 año contra defectos de fabricación. El registro de garantía debe realizarse a través de la aplicación Acquafy o el portal de soporte. Los defectos causados por instalación incorrecta, uso inadecuado o mantenimiento negligente no están cubiertos por la garantía.",
      },
      {
        pergunta: "¿En cuántos países opera Acquafy?",
        resposta: "Acquafy está presente en más de 180 países, con operación 100% global y soporte disponible en 16 idiomas. El modelo de negocio permite que los socios distribuidores regionales operen localmente con el soporte de la plataforma central.",
      },
    ],
  },
};

export default function FaqBK() {
  const { lang } = useLang();
  const t = T[lang];
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[60px] w-full scroll-mt-[80px]">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[10px] items-start text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] w-full">
            {t.h2plain}
            <span className="text-[#0569ff]">{t.h2highlight}</span>
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[22px] text-[#333] w-full">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-[12px] w-full">
          {t.faqs.map((faq, i) => {
            const isOpen = aberto === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-[12px] overflow-hidden transition-shadow duration-200
                  ${isOpen ? "shadow-[0_4px_16px_0_rgba(2,51,195,0.10)]" : "shadow-none"}`}
              >
                <button
                  onClick={() => setAberto(isOpen ? null : i)}
                  className="flex gap-[16px] items-center justify-between w-full px-[24px] py-[20px] cursor-pointer text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] flex-1 pr-[8px]">
                    {faq.pergunta}
                  </span>
                  {/* Chevron */}
                  <span
                    className={`shrink-0 flex items-center justify-center size-[28px] rounded-full border-2 transition-all duration-200
                      ${isOpen
                        ? "border-[#0233c3] bg-[#0233c3] text-white rotate-180"
                        : "border-[#cbd0d4] bg-transparent text-[#333] rotate-0"
                      }`}
                  >
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                {/* Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[22px] text-[#333] px-[24px] pb-[20px]">
                    {faq.resposta}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
