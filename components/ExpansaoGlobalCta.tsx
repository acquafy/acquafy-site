"use client";

import Link from "next/link";
import { BtnAzulOutArrow, BtnAzulBaseArrow } from "./ui/Buttons";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgBg = "/figma-assets/bg-n.webp";

const T: Record<Lang, { heading: string; sub: string; btnPartner: string; btnSpecialist: string }> = {
  pt: {
    heading: "Faça parte da rede global Acquafy",
    sub: "Juntos podemos transformar milhões de vidas, gerar oportunidades e construir um futuro mais saudável e sustentável.",
    btnPartner: "Seja um parceiro",
    btnSpecialist: "Fale com um especialista",
  },
  en: {
    heading: "Join the global Acquafy network",
    sub: "Together we can transform millions of lives, create opportunities and build a healthier, more sustainable future.",
    btnPartner: "Become a partner",
    btnSpecialist: "Talk to a specialist",
  },
  es: {
    heading: "Sé parte de la red global Acquafy",
    sub: "Juntos podemos transformar millones de vidas, generar oportunidades y construir un futuro más saludable y sostenible.",
    btnPartner: "Sé un socio",
    btnSpecialist: "Habla con un especialista",
  },
};

export default function ExpansaoGlobalCta() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="border border-[#cbd0d4] flex flex-col gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] py-[40px] relative rounded-[16px] w-full">
        {/* Background */}
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
          src={imgBg}
        />

        {/* Text */}
        <div className="relative flex flex-[1_0_0] flex-col items-center justify-center min-w-[240px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center">
            {t.heading}
          </h2>
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white w-full mt-[4px] text-center">
            {t.sub}
          </p>
        </div>

        {/* Buttons */}
        <div className="relative flex flex-[1_0_0] flex-wrap gap-[10px] items-center justify-center max-w-[500px] min-w-[240px]">
          <Link href="/parceria" className="flex-1 min-w-[200px]">
            <BtnAzulOutArrow className="w-full min-h-[56px]">
              {t.btnPartner}
            </BtnAzulOutArrow>
          </Link>
          <Link href="/contato" className="flex-1 min-w-[200px]">
            <BtnAzulBaseArrow className="w-full min-h-[56px]">
              {t.btnSpecialist}
            </BtnAzulBaseArrow>
          </Link>
        </div>
      </div>
    </section>
  );
}
