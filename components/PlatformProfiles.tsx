"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgAdmin    = "/figma-assets/icon-admin.svg";
const imgSilver   = "/figma-assets/product-silver-c.webp";
const imgGold     = "/figma-assets/product-gold-d.webp";
const imgPlatinum = "/figma-assets/product-platinum-c.webp";
const imgMegaphone= "/figma-assets/icon-megaphone.svg";

const T: Record<Lang, {
  heading: string;
  profiles: { title: string; desc: string }[];
}> = {
  pt: {
    heading: "Perfis de acesso",
    profiles: [
      { title: "Admin Acquafy",    desc: "Acesso total à plataforma e gestão global." },
      { title: "Parceiro Silver",  desc: "Vendas, comissões e acompanhamento." },
      { title: "Parceiro Gold",    desc: "Gestão de equipe, vendas, comissões e relatórios." },
      { title: "Parceiro Platinum", desc: "Gestão avançada, regras FOB e performance." },
      { title: "Anunciante",       desc: "Criação e gestão de campanhas e mídia." },
    ],
  },
  en: {
    heading: "Access profiles",
    profiles: [
      { title: "Admin Acquafy",    desc: "Full platform access and global management." },
      { title: "Silver Partner",   desc: "Sales, commissions and tracking." },
      { title: "Gold Partner",     desc: "Team management, sales, commissions and reports." },
      { title: "Platinum Partner", desc: "Advanced management, FOB rules and performance." },
      { title: "Advertiser",       desc: "Campaign and media creation and management." },
    ],
  },
  es: {
    heading: "Perfiles de acceso",
    profiles: [
      { title: "Admin Acquafy",    desc: "Acceso total a la plataforma y gestión global." },
      { title: "Socio Silver",     desc: "Ventas, comisiones y seguimiento." },
      { title: "Socio Gold",       desc: "Gestión de equipo, ventas, comisiones e informes." },
      { title: "Socio Platinum",   desc: "Gestión avanzada, reglas FOB y rendimiento." },
      { title: "Anunciante",       desc: "Creación y gestión de campañas y medios." },
    ],
  },
};

const iconSrcs  = [imgAdmin, imgSilver, imgGold, imgPlatinum, imgMegaphone];
const iconTypes = ["svg", "png", "png", "png", "svg"] as const;
const iconWs    = [440, 40, 40, 40, 185];
const iconHs    = [512, 40, 40, 40, 185];

export default function PlatformProfiles() {
  const { lang } = useLang();
  const t = T[lang];

  const profiles = t.profiles.map((p, i) => ({
    iconType: iconTypes[i],
    icon: iconSrcs[i],
    iconW: iconWs[i],
    iconH: iconHs[i],
    title: p.title,
    desc: p.desc,
  }));

  return (
    <section className="bg-white flex flex-col items-center justify-center overflow-hidden px-[20px] py-[40px] w-full">
      <div className="flex flex-col gap-[40px] items-center justify-center max-w-[1400px] w-full">

        <h2 className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-[#1f2e91] text-center w-full">
          {t.heading}
        </h2>

        <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full">
          {profiles.map((p) => (
            <div key={p.title} className="bg-[#f6f9fe] flex flex-[1_0_0] gap-[20px] items-center justify-center min-w-[240px] p-[20px] rounded-[16px]">
              <div className="flex items-center justify-center shrink-0 size-[40px]">
                {p.iconType === "png" ? (
                  <img alt={p.title} className="size-full object-contain" src={p.icon} />
                ) : (
                  <FigmaIcon src={p.icon} size={40} aspectW={p.iconW} aspectH={p.iconH} />
                )}
              </div>
              <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px">
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[16px] leading-[20px] text-[#1f2e91] w-full">{p.title}</p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-[#333] w-full">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
