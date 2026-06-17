"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgSilver = "/figma-assets/product-silver-e.webp";
const imgGold = "/figma-assets/product-gold-e.webp";
const imgPlatinum = "/figma-assets/product-platinum-e.webp";
const imgCheckin = "/figma-assets/icon-check-d.svg";

const imgPartner      = "/figma-assets/icon-partner-a.svg";
const imgCertificado  = "/figma-assets/icon-certificado-b.svg";
const imgMarketing    = "/figma-assets/icon-marketing-b.svg";
const imgFone         = "/figma-assets/icon-fone-b.svg";

const TIER_ICONS = [
  { icon: imgSilver,   name: "Silver",   nameColor: "#3e4650" },
  { icon: imgGold,     name: "Gold",     nameColor: "#dfa727" },
  { icon: imgPlatinum, name: "Platinum", nameColor: "#0569ff" },
];

const BENEFIT_ICONS = [
  { icon: imgPartner,     aspectW: 43,    aspectH: 42 },
  { icon: imgCertificado, aspectW: 14.17, aspectH: 21.5 },
  { icon: imgMarketing,   aspectW: 21.5,  aspectH: 15.82 },
  { icon: imgFone,        aspectW: 21.5,  aspectH: 21.5 },
];

const T: Record<Lang, {
  h2a: string; h2b: string;
  sub: string;
  tiers: { checks: string[] }[];
  cta: string;
  benefits: string[];
}> = {
  pt: {
    h2a: "Programa de",
    h2b: " Parceria Global Acquafy",
    sub: "Cresça conosco e conquiste o mundo com a Acquafy.",
    tiers: [
      { checks: ["Suporte dedicado", "Treinamento e materiais", "Condições exclusivas", "Acesso ao App + IA"] },
      { checks: ["Operação com Media Network", "Suporte avançado", "Material de marketing", "Receita recorrente"] },
      { checks: ["Distribuição em larga escala", "Suporte premium 24h", "Soluções personalizadas", "Projetos estratégicos"] },
    ],
    cta: "Ver mais!",
    benefits: [
      "Rede global de parceiros",
      "Treinamento e certificações",
      "Marketing e campanhas exclusivas",
      "Suporte e acompanhamento contínuo",
    ],
  },
  en: {
    h2a: "Global",
    h2b: " Acquafy Partnership Program",
    sub: "Grow with us and conquer the world with Acquafy.",
    tiers: [
      { checks: ["Dedicated support", "Training and materials", "Exclusive conditions", "App + AI access"] },
      { checks: ["Media Network operation", "Advanced support", "Marketing materials", "Recurring revenue"] },
      { checks: ["Large-scale distribution", "24h premium support", "Customized solutions", "Strategic projects"] },
    ],
    cta: "Learn more!",
    benefits: [
      "Global partner network",
      "Training and certifications",
      "Marketing and exclusive campaigns",
      "Ongoing support and follow-up",
    ],
  },
  es: {
    h2a: "Programa de",
    h2b: " Alianza Global Acquafy",
    sub: "Crece con nosotros y conquista el mundo con Acquafy.",
    tiers: [
      { checks: ["Soporte dedicado", "Formación y materiales", "Condiciones exclusivas", "Acceso a App + IA"] },
      { checks: ["Operación con Media Network", "Soporte avanzado", "Material de marketing", "Ingresos recurrentes"] },
      { checks: ["Distribución a gran escala", "Soporte premium 24h", "Soluciones personalizadas", "Proyectos estratégicos"] },
    ],
    cta: "¡Ver más!",
    benefits: [
      "Red global de socios",
      "Formación y certificaciones",
      "Marketing y campañas exclusivas",
      "Soporte y seguimiento continuo",
    ],
  },
};

export default function Parceria() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white flex flex-col gap-[20px] items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[5px] items-center max-w-[1400px] overflow-hidden w-full">
        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] min-w-[240px] w-full text-center lg:text-left">
          <span className="text-[#2a2a2b]">{t.h2a}</span>
          <span className="text-[#0233c3]">{t.h2b}</span>
        </h2>
        <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full text-center lg:text-left">
          {t.sub}
        </p>
      </div>

      <div className="flex flex-wrap gap-[10px] items-stretch justify-center max-w-[1400px] overflow-hidden w-full">
        {TIER_ICONS.map((tier, ti) => (
          <div
            key={tier.name}
            className="bg-[#f6f9fe] flex flex-1 flex-wrap gap-y-[20px] items-start min-w-[280px] p-[20px] rounded-[16px]"
          >
            <div className="flex flex-1 flex-col gap-[20px] items-start min-w-[280px]">
              <div className="flex flex-col gap-[20px] items-start w-full">
                <div className="flex gap-[10px] items-center w-full">
                  <div className="flex flex-col items-center justify-center size-[46px] shrink-0">
                    <img alt={tier.name} className="w-full h-full object-contain" src={tier.icon} />
                  </div>
                  <p
                    className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[24px] flex-1 min-w-0"
                    style={{ color: tier.nameColor }}
                  >
                    {tier.name}
                  </p>
                </div>
                <div className="flex flex-col gap-[10px] items-start w-full">
                  {t.tiers[ti].checks.map((check) => (
                    <div key={check} className="flex gap-[8px] items-center w-full">
                      <FigmaIcon src={imgCheckin} size={8} aspectW={9} aspectH={6.44} />
                      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[15px] text-[#2a2a2b] flex-1 min-w-0">
                        {check}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <a href="/parceria" className="bg-[#0233c3] hover:bg-[#002ba8] active:bg-[#005ae0] transition-colors flex items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] w-full cursor-pointer">
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-white text-center flex-1 min-w-0">
                  {t.cta}
                </span>
              </a>
            </div>
          </div>
        ))}

        <div className="bg-[#f6f9fe] flex flex-1 flex-col gap-[20px] items-center justify-between min-h-[206px] min-w-[280px] p-[20px] rounded-[16px]">
          {BENEFIT_ICONS.map((item, bi) => (
            <div key={bi} className="flex gap-[10px] items-center w-full">
              <FigmaIcon src={item.icon} size={20} aspectW={item.aspectW} aspectH={item.aspectH} />
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#2a2a2b] flex-1 min-w-0">
                {t.benefits[bi]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
