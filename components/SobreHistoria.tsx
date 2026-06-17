"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Timeline icon assets ──────────────────────────────────────────────────────
const imgWater     = "/figma-assets/icon-water-fundacao-2020.svg"; // 2020 Fundação
const imgContainer = "/figma-assets/icon-container.svg"; // 2021 Desenvolvimento
const imgBpmPlay   = "/figma-assets/icon-bpm-play.svg"; // 2024 Ecossistema Neo
const imgWifi      = "/figma-assets/icon-wifi-2025.svg"; // 2025 Conectividade
const imgGlobe     = "/figma-assets/icon-globe-nova-fase.svg"; // 2026+ Nova fase
const imgArrow     = "/figma-assets/icon-arrow-connector.svg"; // connector arrow (not last)
const imgArrowEnd  = "/figma-assets/icon-arrow-end.svg"; // last item arrow

type TimelineItem = {
  icon: string; year: string; phase: string; description: string;
  isLast: boolean; aspectW?: number; aspectH?: number;
};

const T: Record<Lang, {
  heading: string;
  items: { phase: string; description: string }[];
}> = {
  pt: {
    heading: "Nossa História",
    items: [
      { phase: "Fundação",        description: "A Acquafy é fundada nos EUA com o propósito de transformar e formar como o mundo cuida da água." },
      { phase: "Desenvolvimento", description: "Desenvolvimento da linha inicial de produtos e da plataforma de gestão inteligente." },
      { phase: "Ecossistema Neo", description: "Lançamento do ecossistema Neo e do Acquafy Media Network para educação, conteúdo e engajamento." },
      { phase: "Conectividade",   description: "Expansão da plataforma com App + IA + IoT conectando dispositivos e pessoas." },
      { phase: "Nova fase global",description: "Nova fase de crescimento com presença global escalável e expansão da rede de parceiros." },
    ],
  },
  en: {
    heading: "Our History",
    items: [
      { phase: "Foundation",      description: "Acquafy is founded in the USA with the purpose of transforming how the world cares for water." },
      { phase: "Development",     description: "Development of the initial product line and the intelligent management platform." },
      { phase: "Neo Ecosystem",   description: "Launch of the Neo ecosystem and Acquafy Media Network for education, content and engagement." },
      { phase: "Connectivity",    description: "Platform expansion with App + AI + IoT connecting devices and people." },
      { phase: "New global phase",description: "New growth phase with scalable global presence and expansion of the partner network." },
    ],
  },
  es: {
    heading: "Nuestra Historia",
    items: [
      { phase: "Fundación",        description: "Acquafy es fundada en EE.UU. con el propósito de transformar la manera en que el mundo cuida el agua." },
      { phase: "Desarrollo",       description: "Desarrollo de la línea inicial de productos y de la plataforma de gestión inteligente." },
      { phase: "Ecosistema Neo",   description: "Lanzamiento del ecosistema Neo y del Acquafy Media Network para educación, contenido y engagement." },
      { phase: "Conectividad",     description: "Expansión de la plataforma con App + IA + IoT conectando dispositivos y personas." },
      { phase: "Nueva fase global",description: "Nueva fase de crecimiento con presencia global escalable y expansión de la red de socios." },
    ],
  },
};

export default function SobreHistoria() {
  const { lang } = useLang();
  const t = T[lang];
  const timeline: TimelineItem[] = [
    { icon: imgWater,     year: "2020",  phase: t.items[0].phase, description: t.items[0].description, isLast: false },
    { icon: imgContainer, year: "2021",  phase: t.items[1].phase, description: t.items[1].description, isLast: false },
    { icon: imgBpmPlay,   year: "2024",  phase: t.items[2].phase, description: t.items[2].description, isLast: false },
    { icon: imgWifi,      year: "2025",  phase: t.items[3].phase, description: t.items[3].description, isLast: false, aspectW: 31.5, aspectH: 21.5 },
    { icon: imgGlobe,     year: "2026+", phase: t.items[4].phase, description: t.items[4].description, isLast: true },
  ];
  return (
    <section className="flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {t.heading}
        </h2>
        <div className="flex flex-wrap gap-[40px] items-start justify-center w-full">
          {timeline.map((item) => (
            <div
              key={item.year}
              className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[160px] rounded-[12px]"
            >
              {/* Icon + connector */}
              <div className="flex gap-[10px] items-center justify-center relative w-full">
                <div className="bg-[#0569ff] flex flex-col items-center justify-center p-[10px] rounded-full shrink-0 size-[50px]">
                  {/* 50px circle – p-10 → 30px content area */}
                  <FigmaIcon src={item.icon} alt={item.phase} size={30} aspectW={item.aspectW} aspectH={item.aspectH} />
                </div>
                {/* Connector arrow line */}
                <div className="flex-[1_0_0] h-[9px] min-w-px relative">
                  <img
                    alt=""
                    className="absolute inset-0 w-full h-full"
                    src={item.isLast ? imgArrowEnd : imgArrow}
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-[20px] items-start w-full">
                <div className="flex flex-col gap-[10px] items-start w-full">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0233c3]">
                    {item.year}
                  </p>
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#0569ff]">
                    {item.phase}
                  </p>
                </div>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
