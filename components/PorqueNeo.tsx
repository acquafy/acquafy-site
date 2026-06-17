"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgMobile  = "/figma-assets/icon-mobile-21px-c.svg"; // 21×30
const imgBrain   = "/figma-assets/icon-brain-30px-b.svg"; // 30×30
const imgWifi    = "/figma-assets/icon-wifi-30px-c.svg"; // 30×20
const imgWater   = "/figma-assets/icon-water-large-b.svg"; // 576×662
const imgShield  = "/figma-assets/icon-shield-26px-c.svg"; // 26×30
const imgPlanet  = "/figma-assets/icon-planet-30px-b.svg"; // 30×30

const itemIcons = [
  { icon: imgMobile, aW: 21,  aH: 30  },
  { icon: imgBrain,  aW: 30,  aH: 30  },
  { icon: imgWifi,   aW: 30,  aH: 20  },
  { icon: imgWater,  aW: 576, aH: 662 },
  { icon: imgShield, aW: 26,  aH: 30  },
  { icon: imgPlanet, aW: 30,  aH: 30  },
];

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  items: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Porque escolher a ",
    heading2: "Linha Neo",
    items: [
      { title: "App Acquafy",         desc: "Controle total pelo app de onde quiser." },
      { title: "Acquafy AI",          desc: "Inteligência que aprende seus hábitos." },
      { title: "IoT Inteligente",     desc: "Conectividade e dados em tempo real." },
      { title: "Água Personalizada",  desc: "Temperaturas e funções para cada momento." },
      { title: "Alta Performance",    desc: "Tecnologia global e filtros de última geração." },
      { title: "Design Global",       desc: "Acabamento sofisticado e premiado." },
    ],
  },
  en: {
    heading1: "Why choose the ",
    heading2: "Neo Line",
    items: [
      { title: "App Acquafy",         desc: "Full control via the app from anywhere." },
      { title: "Acquafy AI",          desc: "Intelligence that learns your habits." },
      { title: "Smart IoT",           desc: "Connectivity and real-time data." },
      { title: "Personalized Water",  desc: "Temperatures and functions for every moment." },
      { title: "High Performance",    desc: "Global technology and next-generation filters." },
      { title: "Global Design",       desc: "Sophisticated and award-winning finish." },
    ],
  },
  es: {
    heading1: "Por qué elegir la ",
    heading2: "Línea Neo",
    items: [
      { title: "App Acquafy",         desc: "Control total desde la app donde quieras." },
      { title: "Acquafy AI",          desc: "Inteligencia que aprende tus hábitos." },
      { title: "IoT Inteligente",     desc: "Conectividad y datos en tiempo real." },
      { title: "Agua Personalizada",  desc: "Temperaturas y funciones para cada momento." },
      { title: "Alto Rendimiento",    desc: "Tecnología global y filtros de última generación." },
      { title: "Diseño Global",       desc: "Acabado sofisticado y premiado." },
    ],
  },
};

export default function PorqueNeo() {
  const { lang } = useLang();
  const t = T[lang];

  const items = itemIcons.map((ico, i) => ({ ...ico, ...t.items[i] }));

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="bg-[#f6f9fe] flex flex-col items-center justify-center max-w-[1400px] px-[20px] py-[40px] rounded-[16px] w-full">
        <div className="flex flex-col gap-[40px] items-start w-full">

          {/* Title */}
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
            <span className="text-[#1f2e91]">{t.heading1}</span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(170deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
            >
              {t.heading2}
            </span>
          </h2>

          {/* Cards grid */}
          <div className="bg-white flex flex-wrap gap-[20px] items-start justify-center overflow-hidden p-[20px] rounded-[12px] w-full">
            {items.map((item) => (
              <div
                key={item.title}
                className="flex flex-[1_0_0] flex-col gap-[20px] items-center justify-center min-w-[180px] rounded-[14px]"
              >
                {/* Circle icon */}
                <div className="border border-[#cbd0d4] flex flex-col items-center justify-center p-[14px] rounded-full shrink-0 size-[60px]">
                  <FigmaIcon src={item.icon} size={30} aspectW={item.aW} aspectH={item.aH} />
                </div>

                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] text-center w-full min-h-[35px] flex items-center justify-center">
                  {item.title}
                </p>

                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#333] text-center w-full">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
