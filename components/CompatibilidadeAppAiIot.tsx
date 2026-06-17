"use client";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  heading1: string;
  heading2: string;
  products: { name: string; desc: string }[];
}> = {
  pt: {
    heading1: "Compatível com todo o ",
    heading2: "ecossistema Acquafy",
    products: [
      { name: "Neo Essentials", desc: "Compatível com toda linha Neo Essentials para uso diário." },
      { name: "Neo Premium",    desc: "Integração completa com a linha Neo Premium de alto desempenho." },
      { name: "Acquafy Media",  desc: "Conectado à plataforma de mídia para campanhas e comunicações." },
    ],
  },
  en: {
    heading1: "Compatible with the entire ",
    heading2: "Acquafy ecosystem",
    products: [
      { name: "Neo Essentials", desc: "Compatible with the entire Neo Essentials line for everyday use." },
      { name: "Neo Premium",    desc: "Full integration with the high-performance Neo Premium line." },
      { name: "Acquafy Media",  desc: "Connected to the media platform for campaigns and communications." },
    ],
  },
  es: {
    heading1: "Compatible con todo el ",
    heading2: "ecosistema Acquafy",
    products: [
      { name: "Neo Essentials", desc: "Compatible con toda la línea Neo Essentials para uso diario." },
      { name: "Neo Premium",    desc: "Integración completa con la línea Neo Premium de alto rendimiento." },
      { name: "Acquafy Media",  desc: "Conectado a la plataforma de medios para campañas y comunicaciones." },
    ],
  },
};

const productImgs = [
  "/figma-assets/neo-ultra-spark-h2.webp",
  "/figma-assets/compat-neo-premium.webp",
  "/figma-assets/acquafy-media-totem.webp",
];

export default function CompatibilidadeAppAiIot() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-[#f6f9fe] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-start max-w-[1400px] w-full">

        {/* Título */}
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-center w-full">
          <span className="text-[#1f2e91]">{t.heading1}</span>
          <span className="text-[#0569ff]">{t.heading2}</span>
        </h2>

        {/* Cards de produto */}
        <div className="flex flex-wrap gap-[20px] items-start justify-center w-full">
          {t.products.map((p, i) => (
            <div
              key={p.name}
              className="bg-white flex flex-[1_0_0] flex-col gap-[20px] items-center min-w-[240px] overflow-clip px-[20px] py-[40px] rounded-[16px]"
            >
              {/* Nome */}
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#1f2e91] text-center w-full">
                {p.name}
              </p>

              {/* Imagem do produto */}
              <div className="flex items-center justify-center overflow-clip size-[300px] shrink-0">
                <img
                  src={productImgs[i]}
                  alt={p.name}
                  className="max-h-[280px] max-w-[280px] object-contain"
                />
              </div>

              {/* Descrição */}
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[16px] leading-[20px] text-[#2a2a2b] text-center w-full">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
