"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgScale  = "/figma-assets/icon-scale-b.svg";  // 30×30
const imgMoney  = "/figma-assets/icon-money-33px.svg";  // 33×30
const imgGlobe  = "/figma-assets/icon-globe-30px-b.svg";  // 30×30
const imgBrain  = "/figma-assets/icon-brain-30px-c.svg";  // 30×30
const imgCrown  = "/figma-assets/icon-crown-30px.svg";  // 30×30
const imgPhone  = "/figma-assets/icon-phone-30px.svg";  // 30×30

const T: Record<Lang, {
  heading1: string;
  headingHighlight: string;
  cards: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Porque se tornar um ",
    headingHighlight: "parceiro Acquafy?",
    cards: [
      { title: "Modelo escalável",      desc: "Atue localmente com estrutura global e grande potencial de crescimento." },
      { title: "Receita recorrente",    desc: "Ganhos contínuos com vendas, mídia ou distribuição do ecossistema Neo." },
      { title: "Expansão global",       desc: "Presença em até 180 países e 6 regiões comerciais." },
      { title: "Tecnologia inteligente", desc: "Plataforma com App, IA e IoT para mais eficiência e controle total." },
      { title: "Produtos Premium",      desc: "Purificadores Neo de alta performance para todos os perfis de mercado." },
      { title: "Suporte comercial",     desc: "Acompanhamento global com materiais, treinamentos e suporte multilíngue." },
    ],
  },
  en: {
    heading1: "Why become an ",
    headingHighlight: "Acquafy partner?",
    cards: [
      { title: "Scalable model",        desc: "Act locally with a global structure and great growth potential." },
      { title: "Recurring revenue",     desc: "Continuous earnings from sales, media or distribution of the Neo ecosystem." },
      { title: "Global expansion",      desc: "Presence in up to 180 countries and 6 commercial regions." },
      { title: "Smart technology",      desc: "Platform with App, AI and IoT for more efficiency and total control." },
      { title: "Premium products",      desc: "High-performance Neo purifiers for all market profiles." },
      { title: "Commercial support",    desc: "Global support with materials, training and multilingual assistance." },
    ],
  },
  es: {
    heading1: "¿Por qué convertirse en ",
    headingHighlight: "socio de Acquafy?",
    cards: [
      { title: "Modelo escalable",       desc: "Actúa localmente con estructura global y gran potencial de crecimiento." },
      { title: "Ingresos recurrentes",   desc: "Ganancias continuas con ventas, medios o distribución del ecosistema Neo." },
      { title: "Expansión global",       desc: "Presencia en hasta 180 países y 6 regiones comerciales." },
      { title: "Tecnología inteligente", desc: "Plataforma con App, IA e IoT para más eficiencia y control total." },
      { title: "Productos Premium",      desc: "Purificadores Neo de alto rendimiento para todos los perfiles de mercado." },
      { title: "Soporte comercial",      desc: "Acompañamiento global con materiales, capacitaciones y soporte multilingüe." },
    ],
  },
};

const iconSrcs = [imgScale, imgMoney, imgGlobe, imgBrain, imgCrown, imgPhone];
const iWs      = [30, 33.33, 30, 30, 30, 30];
const iHs      = [30, 30,    30, 30, 30, 30];

export default function PorqueParceiro() {
  const { lang } = useLang();
  const t = T[lang];

  const cards = t.cards.map((c, i) => ({
    icon: iconSrcs[i],
    iW: iWs[i],
    iH: iHs[i],
    title: c.title,
    desc: c.desc,
  }));

  return (
    <section className="bg-white flex flex-col gap-[40px] items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">
        {/* Header */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center min-w-[240px] w-full">
          {t.heading1}
          <span className="text-[#0569ff]">{t.headingHighlight}</span>
        </h2>

        {/* Cards */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-h-[250px] min-w-[180px] overflow-hidden px-[10px] py-[20px] rounded-[16px]"
            >
              <div className="flex flex-col items-center justify-center size-[40px] shrink-0">
                <FigmaIcon src={c.icon} size={30} aspectW={c.iW} aspectH={c.iH} />
              </div>
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center min-h-[50px] w-full">
                {c.title}
              </p>
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
