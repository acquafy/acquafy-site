"use client";
// "Como funciona na prática" — 4 numbered steps (Figma node 3258:5253)
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgWater    = "/figma-assets/icon-water-c.svg";
const imgMarketing= "/figma-assets/icon-marketing-d.svg";
const imgBrain    = "/figma-assets/icon-brain-c.svg";
const imgScale    = "/figma-assets/icon-scale-a.svg";
const imgArrow    = "/figma-assets/icon-arrow-a.svg";

// aspectW/aspectH do Figma (node 3258:5253):
// water → 470×450 (landscape), marketing → 39.76×28.46 (landscape),
// brain → 30×30 (sq), scale → 30×30 (sq)
const stepMeta = [
  { num: "01", icon: imgWater,     aspectW: 470,   aspectH: 450  },
  { num: "02", icon: imgMarketing, aspectW: 39.76, aspectH: 28.46 },
  { num: "03", icon: imgBrain,     aspectW: 30,    aspectH: 30   },
  { num: "04", icon: imgScale,     aspectW: 30,    aspectH: 30   },
];

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  steps: { title: string; desc: string }[];
}> = {
  pt: {
    heading1: "Como funciona",
    heading2: " na prática",
    steps: [
      { title: "Instale o Acquafy Media",         desc: "Instalação rápida e integração à Plataforma Acquafy." },
      { title: "Exiba campanhas e QR Codes",       desc: "Mostre anúncios, ofertas e QR Codes para o público de forma inteligente." },
      { title: "Capte dados e monitore com IA",    desc: "Acompanhe uso, engajamento e performance com inteligência artificial." },
      { title: "Gere receita com mídia e vendas",  desc: "Receba por campanhas publicitárias e comissões sobre vendas da linha Neo." },
    ],
  },
  en: {
    heading1: "How it works",
    heading2: " in practice",
    steps: [
      { title: "Install Acquafy Media",               desc: "Quick installation and integration with the Acquafy Platform." },
      { title: "Display campaigns and QR Codes",      desc: "Show ads, offers and QR Codes to the audience intelligently." },
      { title: "Capture data and monitor with AI",    desc: "Track usage, engagement and performance with artificial intelligence." },
      { title: "Generate revenue with media and sales", desc: "Earn from advertising campaigns and commissions on Neo line sales." },
    ],
  },
  es: {
    heading1: "Cómo funciona",
    heading2: " en la práctica",
    steps: [
      { title: "Instala el Acquafy Media",              desc: "Instalación rápida e integración a la Plataforma Acquafy." },
      { title: "Muestra campañas y QR Codes",           desc: "Exhibe anuncios, ofertas y QR Codes al público de forma inteligente." },
      { title: "Captura datos y monitorea con IA",      desc: "Sigue el uso, engagement y rendimiento con inteligencia artificial." },
      { title: "Genera ingresos con medios y ventas",   desc: "Recibe por campañas publicitarias y comisiones sobre ventas de la línea Neo." },
    ],
  },
};

export default function NeoMediaHowItWorks() {
  const { lang } = useLang();
  const t = T[lang];

  const steps = t.steps.map((s, i) => ({ ...stepMeta[i], ...s }));

  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] rounded-[16px] w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          <span className="text-[#0569ff]">{t.heading1}</span>
          {t.heading2}
        </h2>
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {steps.map((s, i) => (
            <div key={s.num} className="relative bg-[#f6f9fe] flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[280px] p-[20px] rounded-[16px]">
              {/* Icon circle + step number */}
              <div className="relative flex gap-[20px] items-center justify-center w-full">
                <div className="border border-[#cbd0d4] flex flex-col items-center justify-center p-[24px] rounded-full size-[100px] shrink-0">
                  <FigmaIcon src={s.icon} size={40} aspectW={s.aspectW} aspectH={s.aspectH} />
                </div>
                <span className="absolute right-0 top-0 font-['Avenir_LT_Pro:85_Heavy'] text-[40px] leading-[50px] text-[#0569ff]">
                  {s.num}
                </span>
              </div>
              {/* Title */}
              <h3 className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center flex items-center justify-center min-h-[44px] w-full">
                {s.title}
              </h3>
              {/* Desc */}
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#333] text-center w-full">
                {s.desc}
              </p>
              {/* Arrow connector (not on last step) */}
              {i < steps.length - 1 && (
                <>
                  <div className="hidden sm:block absolute -right-[12px] top-1/2 -translate-y-1/2 z-10">
                    <FigmaIcon src={imgArrow} size={12} aspectW={12} aspectH={14.7} />
                  </div>
                  <div className="sm:hidden absolute -bottom-[12px] left-1/2 -translate-x-1/2 z-10">
                    <FigmaIcon src={imgArrow} size={12} aspectW={12} aspectH={14.7} className="rotate-90" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
