"use client";

import { useLang } from "@/context/LanguageContext";
import type { ReactNode } from "react";

const imgFlagBR = "/figma-assets/flag-br.svg";

const NOTICE = {
  en: {
    title: "Content available in Portuguese only",
    sub: "This section contains content written exclusively for Brazilian users.",
    btn: "Switch to Português",
  },
  es: {
    title: "Contenido disponible solo en Portugués",
    sub: "Esta sección contiene contenido escrito exclusivamente para usuarios brasileños.",
    btn: "Cambiar a Portugués",
  },
};

export function PtOnlyGuard({ children, subtitle }: { children: ReactNode; subtitle?: { en: string; es: string } }) {
  const { lang, setLang } = useLang();

  if (lang === "pt") return <>{children}</>;

  const n = NOTICE[lang];
  const sub = subtitle ? subtitle[lang] : n.sub;

  return (
    <section className="flex flex-col items-center justify-center px-[20px] py-[60px] w-full bg-[#f6f9fe]">
      <div className="flex flex-col gap-[16px] items-center text-center max-w-[480px] p-[40px] bg-white rounded-[20px] border border-[#e0e8ff] shadow-sm">
        <div className="flex items-center justify-center size-[56px] rounded-full bg-[#f0f4ff] shrink-0">
          <div className="overflow-clip rounded-full size-[32px]">
            <img alt="BR" src={imgFlagBR} className="w-full h-full object-cover" />
          </div>
        </div>
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91]">
          {n.title}
        </h2>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] leading-[22px] text-[#666]">
          {sub}
        </p>
        <button
          onClick={() => setLang("pt")}
          className="mt-[8px] bg-[#0233c3] hover:bg-[#002ba8] transition-colors font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-white px-[28px] py-[12px] rounded-[8px] cursor-pointer"
        >
          {n.btn}
        </button>
      </div>
    </section>
  );
}
