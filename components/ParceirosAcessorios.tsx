"use client";

import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const T: Record<Lang, {
  heading: string;
  subtitle: string;
  tiers: { desc: string }[];
  benefits: { title: string; desc: string }[];
}> = {
  pt: {
    heading:  "Para parceiros, eventos e ações promocionais",
    subtitle: "Os acessórios Acquafy podem ser utilizados por parceiros Silver, Gold e Platinum em feiras, ativações de showroom, lançamentos de produtos, campanhas de aquisições e operações da Media Network.",
    tiers: [
      { desc: "Acessórios essenciais para apresentar sua marca com qualidade Acquafy." },
      { desc: "Materiais premium para experiências com diferenciação e sofisticação." },
      { desc: "Soluções exclusivas e personalizações para destacar sua liderança de mercado." },
    ],
    benefits: [
      { title: "Identidade Consistente",    desc: "Padronização global com a identidade visual Acquafy." },
      { title: "Qualidade Premium",          desc: "Materiais selecionados e acabamento de excelência." },
      { title: "Merchandising Estratégico", desc: "Fortalece sua marca em todos os pontos de contato." },
      { title: "Ideal para Showrooms",       desc: "Acessórios que valorizam o ambiente e a experiência." },
      { title: "Ativação de Eventos",        desc: "Perfeito para feiras, ações promocionais e ativações." },
    ],
  },
  en: {
    heading:  "For partners, events and promotional actions",
    subtitle: "Acquafy accessories can be used by Silver, Gold and Platinum partners at trade shows, showroom activations, product launches, acquisition campaigns and Media Network operations.",
    tiers: [
      { desc: "Essential accessories to present your brand with Acquafy quality." },
      { desc: "Premium materials for experiences with differentiation and sophistication." },
      { desc: "Exclusive solutions and customizations to highlight your market leadership." },
    ],
    benefits: [
      { title: "Consistent Identity",       desc: "Global standardization with the Acquafy visual identity." },
      { title: "Premium Quality",            desc: "Selected materials and excellent finishing." },
      { title: "Strategic Merchandising",   desc: "Strengthens your brand at every touchpoint." },
      { title: "Ideal for Showrooms",        desc: "Accessories that enhance the environment and experience." },
      { title: "Event Activation",           desc: "Perfect for trade shows, promotional actions and activations." },
    ],
  },
  es: {
    heading:  "Para socios, eventos y acciones promocionales",
    subtitle: "Los accesorios Acquafy pueden ser utilizados por socios Silver, Gold y Platinum en ferias, activaciones de showroom, lanzamientos de productos, campañas de adquisición y operaciones de la Media Network.",
    tiers: [
      { desc: "Accesorios esenciales para presentar tu marca con la calidad Acquafy." },
      { desc: "Materiales premium para experiencias con diferenciación y sofisticación." },
      { desc: "Soluciones exclusivas y personalizaciones para destacar tu liderazgo de mercado." },
    ],
    benefits: [
      { title: "Identidad Consistente",     desc: "Estandarización global con la identidad visual Acquafy." },
      { title: "Calidad Premium",            desc: "Materiales seleccionados y acabado de excelencia." },
      { title: "Merchandising Estratégico", desc: "Fortalece tu marca en todos los puntos de contacto." },
      { title: "Ideal para Showrooms",       desc: "Accesorios que valorizan el ambiente y la experiencia." },
      { title: "Activación de Eventos",      desc: "Perfecto para ferias, acciones promocionales y activaciones." },
    ],
  },
};

const imgSilver    = "/figma-assets/product-silver-b.webp";
const imgGold      = "/figma-assets/product-gold-b.webp";
const imgPlatinum  = "/figma-assets/product-platinum-b.webp";
const imgLayout    = "/figma-assets/icon-layout.svg";
const imgCrown     = "/figma-assets/icon-crown-a.svg";
const imgMarketing = "/figma-assets/icon-marketing-c.svg";
const imgPlay      = "/figma-assets/icon-play-a.svg";
const imgCheckin   = "/figma-assets/icon-check-c.svg";

const tiersBase = [
  { img: imgSilver,   imgAspect: 1, name: "Silver"   },
  { img: imgGold,     imgAspect: 1, name: "Gold"     },
  { img: imgPlatinum, imgAspect: 1, name: "Platinum" },
];

const benefitsBase = [
  { icon: imgLayout,    iconW: 629, iconH: 629 },
  { icon: imgCrown,     iconW: 353, iconH: 353 },
  { icon: imgMarketing, iconW: 40,  iconH: 28  },
  { icon: imgPlay,      iconW: 27,  iconH: 27  },
  { icon: imgCheckin,   iconW: 30,  iconH: 30  },
];

export default function ParceirosAcessorios() {
  const { lang } = useLang();
  const t = T[lang];

  const tiers = tiersBase.map((base, i) => ({
    ...base,
    desc: t.tiers[i].desc,
  }));

  const benefits = benefitsBase.map((base, i) => ({
    ...base,
    title: t.benefits[i].title,
    desc:  t.benefits[i].desc,
  }));

  return (
    <section className="bg-[#f2f6fd] flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-start max-w-[1400px] w-full">

        {/* Header */}
        <div className="flex flex-col gap-[20px] items-center text-center w-full">
          <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] min-w-[240px] w-full">
            {t.heading}
          </h2>
          <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] w-full">
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-[20px] items-start w-full">
          {/* Tier cards */}
          <div className="flex flex-wrap gap-[20px] items-center justify-center overflow-hidden w-full">
            {tiers.map((tier) => (
              <div key={tier.name} className="bg-white flex flex-1 flex-col items-start min-w-[280px] p-[20px] rounded-[16px]">
                <div className="flex gap-[20px] items-center justify-center w-full">
                  <div className="flex flex-col items-center justify-center shrink-0" style={{ width: 46, height: 50 }}>
                    <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
                      <img alt={tier.name} className="absolute inset-0 w-full h-full object-cover" src={tier.img} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-[#0569ff]">{tier.name}</p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#2a2a2b]">{tier.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits row */}
          <div className="bg-white flex flex-wrap gap-[20px_10px] items-center justify-center p-[20px] rounded-[16px] w-full">
            {benefits.map((b) => (
              <div key={b.title} className="flex flex-1 gap-[20px] items-center justify-center min-w-[200px]">
                <div className="flex items-center justify-center shrink-0 size-[30px]">
                  <FigmaIcon src={b.icon} size={30} aspectW={b.iconW} aspectH={b.iconH} />
                </div>
                <div className="flex flex-col gap-[10px] items-start flex-1 min-w-0">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">{b.title}</p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
