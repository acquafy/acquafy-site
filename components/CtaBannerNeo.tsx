"use client";

import { BtnFalaAcquafy, BtnDistribuidor } from "./ui/Buttons";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgBg = "/figma-assets/bg-m.webp";

const T: Record<Lang, { heading: string; sub: string }> = {
  pt: {
    heading: "Escolha a Neo ideal para sua rotina",
    sub: "Conheça toda a linha e encontre o purificador perfeito para você.",
  },
  en: {
    heading: "Choose the ideal Neo for your routine",
    sub: "Explore the full line and find the perfect purifier for you.",
  },
  es: {
    heading: "Elige el Neo ideal para tu rutina",
    sub: "Conoce toda la línea y encuentra el purificador perfecto para ti.",
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
