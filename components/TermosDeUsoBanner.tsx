"use client";

import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  badge: string;
  headingMain: string;
  headingHighlight: string;
  sub: string;
  lastUpdate: string;
}> = {
  pt: {
    badge: "Informações Legais",
    headingMain: "Termos de",
    headingHighlight: "Uso",
    sub: "Leia com atenção os termos e condições que regem o uso do nosso site e dos nossos produtos e serviços.",
    lastUpdate: "Última atualização: 16 de junho de 2026",
  },
  en: {
    badge: "Legal Information",
    headingMain: "Terms of",
    headingHighlight: "Use",
    sub: "Please read carefully the terms and conditions governing the use of our website and our products and services.",
    lastUpdate: "Last updated: June 16, 2026",
  },
  es: {
    badge: "Información Legal",
    headingMain: "Términos de",
    headingHighlight: "Uso",
    sub: "Lea detenidamente los términos y condiciones que rigen el uso de nuestro sitio web y de nuestros productos y servicios.",
    lastUpdate: "Última actualización: 16 de junio de 2026",
  },
};

export default function TermosDeUsoBanner() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section
      className="flex flex-col items-center justify-center overflow-hidden px-[20px] pt-[80px] pb-[60px] w-full"
      style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #e8f1fb 100%)" }}
    >
      <div className="flex flex-col gap-[20px] items-center max-w-[800px] w-full text-center">
        {/* Badge */}
        <div className="flex items-center justify-center">
          <span
            className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] leading-[16px] text-[#0569ff] px-[16px] py-[8px] rounded-full border border-[#0569ff]/30"
            style={{ background: "rgba(5,105,255,0.08)" }}
          >
            {t.badge}
          </span>
        </div>

        <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[48px] leading-[56px] text-[#2a2a2b] mob:text-[32px] mob:leading-[40px]">
          {t.headingMain}{" "}
          <span className="text-[#0569ff]">{t.headingHighlight}</span>
        </h1>

        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[28px] text-[#555] max-w-[620px]">
          {t.sub}
        </p>

        {/* Última atualização */}
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[18px] text-[#888]">
          {t.lastUpdate}
        </p>
      </div>
    </section>
  );
}
