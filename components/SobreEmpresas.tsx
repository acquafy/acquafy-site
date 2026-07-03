"use client";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Brand logo assets ─────────────────────────────────────────────────────────
const imgInterfyLogo     = "/figma-assets/logo-interfy.svg";
const imgEcofy           = "/figma-assets/logo-ecofy.svg";
const imgInterfyShopping = "/figma-assets/logo-interfy-shopping.svg";
const imgInnovecar       = "/figma-assets/logo-innovecar.webp";
const imgNeoai           = "/figma-assets/product-neoai.webp";
const imgProcessdoc      = "/figma-assets/icon-processdoc.svg";
const imgAcquafy         = "/figma-assets/logo-b.svg";
const imgVisionfy        = "/figma-assets/logo-visionfy.svg";
const imgMediafy         = "/figma-assets/logo-mediafy.svg";
const imgDocsystem       = "/figma-assets/icon-docsystem.svg";

// ── Aspect ratios exatos do Figma (content bounds de cada logo) ───────────────
// Padrão: container w-full com aspect-ratio fixo + img absolute inset-0
const brands = [
  { src: imgInterfyLogo,     alt: "Interfy",          aw: 160,      ah: 40.193  },
  { src: imgEcofy,           alt: "Ecofy",             aw: 208.80,   ah: 54.581  },
  { src: imgInterfyShopping, alt: "Interfy Shopping",  aw: 215.542,  ah: 51.362  },
  { src: imgInnovecar,       alt: "Innovecar",         aw: 3040,     ah: 834     },
  { src: imgNeoai,           alt: "NeoAI",             aw: 180,      ah: 62.586  },
  { src: imgProcessdoc,      alt: "Processdoc",        aw: 219.673,  ah: 54.188  },
  { src: imgAcquafy,         alt: "Acquafy",           aw: 200,      ah: 33.0452 },
  { src: imgVisionfy,        alt: "Visionfy",          aw: 219.536,  ah: 50.456  },
  { src: imgMediafy,         alt: "Mediafy",           aw: 206.800,  ah: 54.020  },
  { src: imgDocsystem,       alt: "Docsystem",         aw: 219.423,  ah: 55.768  },
];

const T: Record<Lang, { heading: string }> = {
  pt: { heading: "Nossas Empresas e Marcas" },
  "pt-pt": { heading: "As Nossas Empresas e Marcas" },
  en: { heading: "Our Companies and Brands" },
  "en-gb": { heading: "Our Companies and Brands" },
  es: { heading: "Nuestras Empresas y Marcas" },
  fr: { heading: "Nos Entreprises et Marques" },
  de: { heading: "Unsere Unternehmen und Marken" },
  it: { heading: "Le Nostre Aziende e Marchi" },
  zh: { heading: "我们的企业与品牌" },
  ja: { heading: "私たちの企業とブランド" },
  ko: { heading: "우리의 기업과 브랜드" },
  sv: { heading: "Våra Företag och Varumärken" },
  fi: { heading: "Yrityksemme ja Tuotemerkkimme" },
  ru: { heading: "Наши Компании и Бренды" },
  ro: { heading: "Companiile şi Mărcile Noastre" },
  he: { heading: "החברות והמותגים שלנו" },
};

export default function SobreEmpresas() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center max-w-[1400px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {t.heading}
        </h2>

        <div className="flex flex-wrap gap-[20px] items-center justify-center w-full">
          {brands.map((brand) => (
            <div
              key={brand.alt}
              className="bg-[#f6f9fe] flex flex-[1_0_0] flex-col items-center justify-center min-h-[130px] min-w-[220px] max-w-[340px] p-[40px] rounded-[16px]"
            >
              {/* Container com aspect-ratio fixo do Figma — preenche a largura total do card */}
              <div
                className="relative shrink-0 w-full overflow-hidden"
                style={{ aspectRatio: `${brand.aw} / ${brand.ah}` }}
              >
                <img
                  alt={brand.alt}
                  className="absolute inset-0 w-full h-full"
                  src={brand.src}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
