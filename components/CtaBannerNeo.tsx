"use client";

import { BtnFalaAcquafy, BtnDistribuidor } from "./ui/Buttons";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgBg = "/figma-assets/bg-m.webp";

const T: Record<Lang, { heading: string; sub: string }> = {
  pt: {
    heading: "Escolha a Neo ideal para sua rotina",
    sub: "Conheça toda a linha e encontre o purificador perfeito para você.",
  },
  "pt-pt": {
    heading: "Escolha a Neo ideal para a sua rotina",
    sub: "Conheça toda a linha e encontre o purificador perfeito para si.",
  },
  en: {
    heading: "Choose the ideal Neo for your routine",
    sub: "Explore the full line and find the perfect purifier for you.",
  },
  "en-gb": {
    heading: "Choose the ideal Neo for your routine",
    sub: "Explore the full line and find the perfect purifier for you.",
  },
  es: {
    heading: "Elige el Neo ideal para tu rutina",
    sub: "Conoce toda la línea y encuentra el purificador perfecto para ti.",
  },
  fr: {
    heading: "Choisissez le Neo idéal pour votre quotidien",
    sub: "Découvrez toute la gamme et trouvez le purificateur parfait pour vous.",
  },
  de: {
    heading: "Wählen Sie den idealen Neo für Ihren Alltag",
    sub: "Entdecken Sie die gesamte Reihe und finden Sie den perfekten Purifier für sich.",
  },
  it: {
    heading: "Scegli il Neo ideale per la tua routine",
    sub: "Scopri tutta la linea e trova il purificatore perfetto per te.",
  },
  zh: {
    heading: "为您的日常选择理想的 Neo",
    sub: "探索完整系列，找到最适合您的净水器。",
  },
  ja: {
    heading: "あなたの日常に最適な Neo を選んでください",
    sub: "全ラインナップをご覧になり、あなたにぴったりのピュリファイアーを見つけてください。",
  },
  ko: {
    heading: "당신의 일상에 맞는 이상적인 Neo를 선택하세요",
    sub: "전체 라인업을 살펴보고 당신에게 완벽한 정수기를 찾아보세요.",
  },
  sv: {
    heading: "Välj den ideala Neo för din vardag",
    sub: "Utforska hela sortimentet och hitta den perfekta reningaren för dig.",
  },
  fi: {
    heading: "Valitse ideaalinen Neo arkeesi",
    sub: "Tutustu koko valikoimaan ja löydä sinulle täydellinen puhdistin.",
  },
  ru: {
    heading: "Выберите идеальный Neo для вашей повседневной жизни",
    sub: "Ознакомьтесь со всей линейкой и найдите идеальный очиститель для вас.",
  },
  ro: {
    heading: "Alege Neo-ul ideal pentru rutina ta",
    sub: "Explorează întreaga gamă și găsește purificatorul perfect pentru tine.",
  },
  he: {
    heading: "בחר את ה-Neo האידיאלי לשגרת יומך",
    sub: "גלה את הקו המלא ומצא את המטהר המושלם עבורך.",
  },
};

export default function CtaBannerNeo() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="border border-[#cbd0d4] flex flex-col lg:flex-row gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] lg:px-[80px] py-[40px] relative rounded-[16px] w-full">
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
          src={imgBg}
        />

        <div className="relative flex flex-1 flex-col items-center justify-center min-w-[240px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center lg:text-left">
            {t.heading}
          </h2>
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white w-full text-center lg:text-left">
            {t.sub}
          </p>
        </div>

        <div className="relative flex flex-1 flex-wrap gap-[10px] items-center justify-center xl:justify-end max-w-[500px] min-w-[240px]">
          <BtnFalaAcquafy className="flex-1 min-w-[200px]" />
          <BtnDistribuidor className="flex-1 min-w-[200px]" />
        </div>
      </div>
    </section>
  );
}
