"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// Aspect ratios from Figma design
const imgParceria  = "/figma-assets/icon-parceria-large.svg";  // 1125×1078 ≈ sq
const imgEscala    = "/figma-assets/icon-escala.svg";  // 30×30 sq
const imgAdaptacao = "/figma-assets/icon-adaptacao.svg";  // 38×40 portrait
const imgEducacao  = "/figma-assets/icon-educacao.svg";  // 30×22 landscape
const imgSustent   = "/figma-assets/icon-sustent-large.svg";  // 492×475 ≈ sq

const T: Record<Lang, {
  heading: string;
  pillars: { title: string; desc: string }[];
}> = {
  pt: {
    heading: "Nossos pilares para expansão",
    pillars: [
      { title: "Parcerias estratégicas", desc: "Trabalhamos com distribuidores, integradores e investidores que compartilham nossa visão de impacto e crescimento." },
      { title: "Modelo escalável",       desc: "Tecnologia própria, operação padronizada e suporte completo para garantir crescimento consistente e rentável." },
      { title: "Adaptação local",        desc: "Soluções flexíveis que se adaptam à cultura, necessidades e regulamentações de cada mercado." },
      { title: "Capacitação contínua",   desc: "Treinamentos, marketing e suporte técnico para impulsionar nossos parceiros e garantir o sucesso da operação." },
      { title: "Impacto sustentável",    desc: "Promovemos saúde, inclusão, renda e preservação ambiental por meio do acesso a água pura e consciente." },
    ],
  },
  en: {
    heading: "Our pillars for expansion",
    pillars: [
      { title: "Strategic partnerships", desc: "We work with distributors, integrators and investors who share our vision of impact and growth." },
      { title: "Scalable model",         desc: "Proprietary technology, standardized operations and full support to ensure consistent and profitable growth." },
      { title: "Local adaptation",       desc: "Flexible solutions that adapt to the culture, needs and regulations of each market." },
      { title: "Continuous training",    desc: "Training, marketing and technical support to empower our partners and ensure operational success." },
      { title: "Sustainable impact",     desc: "We promote health, inclusion, income and environmental preservation through access to clean and conscious water." },
    ],
  },
  es: {
    heading: "Nuestros pilares para la expansión",
    pillars: [
      { title: "Alianzas estratégicas",  desc: "Trabajamos con distribuidores, integradores e inversores que comparten nuestra visión de impacto y crecimiento." },
      { title: "Modelo escalable",       desc: "Tecnología propia, operación estandarizada y soporte completo para garantizar un crecimiento consistente y rentable." },
      { title: "Adaptación local",       desc: "Soluciones flexibles que se adaptan a la cultura, necesidades y regulaciones de cada mercado." },
      { title: "Capacitación continua",  desc: "Capacitaciones, marketing y soporte técnico para impulsar a nuestros socios y garantizar el éxito de la operación." },
      { title: "Impacto sostenible",     desc: "Promovemos salud, inclusión, ingresos y preservación ambiental a través del acceso al agua pura y consciente." },
    ],
  },
};

const iconSrcs = [imgParceria, imgEscala, imgAdaptacao, imgEducacao, imgSustent];
const iconWs   = [1125, 30, 38, 30, 492];
const iconHs   = [1078, 30, 40, 22, 475];

export default function ExpansaoGlobalPilares() {
  const { lang } = useLang();
  const t = T[lang];

  const pillars = t.pillars.map((p, i) => ({
    icon: iconSrcs[i],
    iconW: iconWs[i],
    iconH: iconHs[i],
    title: p.title,
    desc: p.desc,
  }));

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {t.heading}
        </h2>

        <div className="flex flex-wrap gap-[20px] items-stretch justify-center w-full">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[250px] min-w-[180px] overflow-hidden px-[10px] py-[20px] rounded-[16px]"
            >
              <FigmaIcon src={p.icon} size={40} aspectW={p.iconW} aspectH={p.iconH} />
              <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center flex items-center justify-center min-h-[50px]">
                {p.title}
              </h3>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] text-center">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
