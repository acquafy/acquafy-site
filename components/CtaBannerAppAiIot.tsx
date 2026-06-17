"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgBg       = "/figma-assets/bg-banner.webp"; // banner bg
const imgArrow    = "/figma-assets/icon-arrow-blue-solid.svg"; // seta azul
const imgChat     = "/figma-assets/icon-chat-a.svg"; // chat icon

const T: Record<Lang, {
  heading: string;
  btn1: string;
  btn2: string;
}> = {
  pt: {
    heading: "Leve o poder do App + AI Acquafy para sua vida ou seu negócio.",
    btn1: "Solicitar demonstração",
    btn2: "Falar com especialista",
  },
  en: {
    heading: "Bring the power of the Acquafy App + AI to your life or your business.",
    btn1: "Request a Demo",
    btn2: "Talk to a Specialist",
  },
  es: {
    heading: "Lleva el poder del App + AI Acquafy a tu vida o tu negocio.",
    btn1: "Solicitar una Demo",
    btn2: "Hablar con un Especialista",
  },
};

export default function CtaBannerAppAiIot() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div
        className="border border-[#cbd0d4] flex flex-col lg:flex-row gap-[20px] items-center justify-center max-w-[1400px] overflow-clip px-[20px] lg:px-[80px] py-[40px] relative rounded-[16px] w-full"
      >
        {/* Background image */}
        <img
          src={imgBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
        />

        {/* Esquerda — título */}
        <div className="relative flex flex-[1_0_0] flex-col items-center justify-center min-w-[240px] pb-[40px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center lg:text-left">
            {t.heading}
          </h2>
        </div>

        {/* Direita — botões */}
        <div className="relative flex flex-[1_0_0] flex-wrap gap-[10px] items-center justify-center xl:justify-end min-w-[240px] pb-[20px]">

          {/* Outline — Solicitar demonstração */}
          <a href="/contato" className="group bg-white border border-[#0233c3] flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[56px] min-w-[200px] overflow-clip px-[20px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors">
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors text-center whitespace-nowrap shrink-0">
              {t.btn1}
            </span>
            <div className="relative h-0 shrink-0 w-[9px]">
              <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0">
                <FigmaIcon src={imgArrow} size={9} aspectW={11.2} aspectH={8.84} />
              </div>
              <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100">
                <FigmaIcon
                  src={imgArrow}
                  size={9}
                  aspectW={11.2}
                  aspectH={8.84}
                  className="[filter:brightness(0)_invert(1)]"
                />
              </div>
            </div>
          </a>

          {/* Gradiente — Falar com especialista */}
          <a
            href="/contato"
            className="border border-white flex flex-[1_0_0] gap-[10px] items-center justify-center min-h-[56px] min-w-[200px] overflow-clip p-[20px] rounded-[8px] cursor-pointer hover:opacity-90 active:opacity-80 transition-opacity"
            style={{ backgroundImage: "linear-gradient(112.26deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
          >
            <FigmaIcon src={imgChat} size={16} aspectW={30} aspectH={30} className="[filter:brightness(0)_invert(1)] shrink-0" />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white text-center whitespace-nowrap shrink-0">
              {t.btn2}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
