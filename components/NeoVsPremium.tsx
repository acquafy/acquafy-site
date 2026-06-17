"use client";
import FigmaIcon from "./FigmaIcon";
import { PRODUCT_IMAGES } from "@/lib/products";
import { useLang, type Lang } from "@/context/LanguageContext";

// Card background images
const imgBgEssentials = "/figma-assets/bg-essentials.webp";
const imgBgPremium    = "/figma-assets/bg-premium.webp";

// Checkin icons
const imgCheckinBlue   = "/figma-assets/icon-check-blue-essentials.svg"; // blue (essentials)
const imgCheckinPurple = "/figma-assets/icon-check-purple-premium.svg"; // purple (premium)

// Product images — catalog via fonte única (lib/products.ts)
const imgNeoFit          = PRODUCT_IMAGES["neo-fit"];
const imgInfinitySparkH2 = PRODUCT_IMAGES["neo-infinity-spark-h2"];

const T: Record<Lang, {
  essentialsFeatures: string[];
  premiumFeatures: string[];
}> = {
  pt: {
    essentialsFeatures: [
      "Painel LED Touch 10,1",
      "4 filtros de Alta Performance UF",
      "Opções de 1 até 7 funções",
      "Tanques: 400ml, 800ml. 1500ml e 3000ml",
      "Foco em praticidade e variedade para o dia a dia",
    ],
    premiumFeatures: [
      "Painel LCD IPS Touch 15.6",
      "Osmose Reversa (RO)",
      "Aço inox e design sofisticado",
      "Mini Media Network integrado",
      "Experiência premium completa",
    ],
  },
  en: {
    essentialsFeatures: [
      "10.1 LED Touch Panel",
      "4 High-Performance UF Filters",
      "Options from 1 to 7 functions",
      "Tanks: 400ml, 800ml, 1500ml and 3000ml",
      "Focus on practicality and variety for daily use",
    ],
    premiumFeatures: [
      "15.6 IPS LCD Touch Panel",
      "Reverse Osmosis (RO)",
      "Stainless steel and sophisticated design",
      "Integrated Mini Media Network",
      "Complete premium experience",
    ],
  },
  es: {
    essentialsFeatures: [
      "Panel LED Touch 10,1",
      "4 filtros de Alta Performance UF",
      "Opciones de 1 hasta 7 funciones",
      "Tanques: 400ml, 800ml, 1500ml y 3000ml",
      "Enfoque en practicidad y variedad para el día a día",
    ],
    premiumFeatures: [
      "Panel LCD IPS Touch 15.6",
      "Ósmosis Inversa (RO)",
      "Acero inoxidable y diseño sofisticado",
      "Mini Media Network integrado",
      "Experiencia premium completa",
    ],
  },
};

function CheckItem({ label, iconSrc }: { label: string; iconSrc: string }) {
  return (
    <div className="flex gap-[10px] items-center min-w-[170px] w-full">
      <FigmaIcon src={iconSrc} size={16} />
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b] flex-1 min-w-0">
        {label}
      </p>
    </div>
  );
}

export default function NeoVsPremium() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        {/* Title */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#0569ff]">Neo Essentials</span>
          {" vs "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(170deg, #0233c3 6.19%, #9f3df5 93.35%)" }}
          >
            Neo Premium
          </span>
        </h2>

        {/* Cards row */}
        <div className="flex flex-wrap gap-[40px] items-center w-full">

          {/* Essentials card */}
          <div className="border border-[#cbd0d4] flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center min-w-[280px] overflow-hidden p-[40px] relative rounded-[16px]">
            <img
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
              src={imgBgEssentials}
            />
            <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[200px] relative">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0569ff] w-full">
                Neo Essentials
              </p>
              <div className="flex flex-col gap-[10px] items-start w-full">
                {t.essentialsFeatures.map((f) => (
                  <CheckItem key={f} label={f} iconSrc={imgCheckinBlue} />
                ))}
              </div>
            </div>
            <div className="flex flex-[1_0_0] flex-col items-center justify-center h-[260px] max-w-[200px] min-w-[140px] relative">
              <img
                alt="Neo FIT"
                className="w-auto h-full max-h-full object-contain pointer-events-none"
                src={imgNeoFit}
              />
            </div>
          </div>

          {/* Premium card */}
          <div className="border border-[#cbd0d4] flex flex-[1_0_0] flex-wrap gap-[20px] items-center justify-center min-w-[280px] overflow-hidden p-[40px] relative rounded-[16px]">
            <img
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
              src={imgBgPremium}
            />
            <div className="flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-[200px] relative">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#9f3df5] w-full">
                Neo Premium
              </p>
              <div className="flex flex-col gap-[10px] items-start w-full">
                {t.premiumFeatures.map((f) => (
                  <CheckItem key={f} label={f} iconSrc={imgCheckinPurple} />
                ))}
              </div>
            </div>
            <div className="flex flex-[1_0_0] flex-col items-center justify-center h-[260px] max-w-[200px] min-w-[140px] relative">
              <img
                alt="Neo INFINITY SPARK H2"
                className="w-auto h-full max-h-full object-contain pointer-events-none"
                src={imgInfinitySparkH2}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
