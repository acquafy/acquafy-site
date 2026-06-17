"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgBg          = "/figma-assets/bg-card.webp";
const imgProduct     = "/figma-assets/product-water-image.webp";
const imgShieldLabel = "/figma-assets/icon-shield-label.svg";
const imgGift        = "/figma-assets/icon-gift-a.svg";
const imgShield      = "/figma-assets/icon-shield-24px.svg";
const imgCert        = "/figma-assets/icon-cert.svg";
const imgFone        = "/figma-assets/icon-fone-30px.svg";
const imgLock        = "/figma-assets/icon-lock-a.svg";
const imgLogoWhite   = "/figma-assets/logo-white.svg";

const TRUST_ICONS = [
  { icon: imgShield, aspectW: 24, aspectH: 30 },
  { icon: imgCert,   aspectW: 19, aspectH: 30 },
  { icon: imgFone,   aspectW: 30, aspectH: 30 },
];

const T: Record<Lang, {
  badge: string;
  h2a: string; h2b: string;
  bonus1: string; bonus2: string;
  trust: { title: string; sub: string }[];
  bannerTitle: string;
  bannerSub1: string; bannerSub2: string;
}> = {
  pt: {
    badge: "CHECKOUT SEGURO",
    h2a: "Seu purificador antigo vale", h2b: "um UP!",
    bonus1: "Ganhe ", bonus2: " de bônus na compra do Acquafy Neo UP Essentials.",
    trust: [
      { title: "Compra 100% segura",    sub: "Seus dados protegidos" },
      { title: "Produto com garantia",  sub: "Qualidade Acquafy" },
      { title: "Suporte especializado", sub: "Antes e após a sua compra" },
    ],
    bannerTitle: "Água de qualidade não deve ser privilégio.",
    bannerSub1: "Faça um ", bannerSub2: " e leve mais saúde para você e sua família.",
  },
  en: {
    badge: "SECURE CHECKOUT",
    h2a: "Your old purifier is worth", h2b: "an UP!",
    bonus1: "Earn ", bonus2: " in bonus on the purchase of the Acquafy Neo UP Essentials.",
    trust: [
      { title: "100% secure purchase",  sub: "Your data is protected" },
      { title: "Product with warranty", sub: "Acquafy Quality" },
      { title: "Specialized support",   sub: "Before and after your purchase" },
    ],
    bannerTitle: "Quality water shouldn't be a privilege.",
    bannerSub1: "Do an ", bannerSub2: " and bring more health to you and your family.",
  },
  es: {
    badge: "PAGO SEGURO",
    h2a: "Tu purificador antiguo vale", h2b: "¡un UP!",
    bonus1: "Gana ", bonus2: " de bono en la compra del Acquafy Neo UP Essentials.",
    trust: [
      { title: "Compra 100% segura",    sub: "Tus datos protegidos" },
      { title: "Producto con garantía", sub: "Calidad Acquafy" },
      { title: "Soporte especializado", sub: "Antes y después de tu compra" },
    ],
    bannerTitle: "El agua de calidad no debe ser un privilegio.",
    bannerSub1: "Haz un ", bannerSub2: " y lleva más salud a ti y a tu familia.",
  },
};

export default function CheckoutUp() {
  const { lang } = useLang();
  const t = T[lang];
  const trustItems = TRUST_ICONS.map((ic, i) => ({ ...ic, ...t.trust[i] }));

  return (
    <section className="flex flex-col items-center justify-center p-[20px] w-full lg:bg-transparent bg-gradient-to-b from-[#fafbff] to-[#e8f1f8]">
      <div className="relative flex flex-col lg:items-start items-center lg:max-w-[1400px] lg:p-[20px] lg:rounded-[16px] w-full lg:overflow-hidden gap-[20px]">

        <img
          alt=""
          className="hidden lg:block absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
          src={imgBg}
        />

        <div className="relative flex flex-col gap-[20px] lg:items-start items-center lg:max-w-[710px] w-full">

          <div className="bg-white border border-[#0233c3] flex flex-wrap gap-[10px] items-center justify-center max-w-[280px] px-[12px] py-[8px] rounded-full shrink-0">
            <FigmaIcon src={imgShieldLabel} size={16} aspectW={26.14} aspectH={30} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] whitespace-nowrap">
              {t.badge}
            </span>
          </div>

          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-[#2a2a2b] w-full lg:text-left text-center">
            {t.h2a}{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to bottom, #0233c3, #9f3df5)" }}>
              {t.h2b}
            </span>
          </h2>

          <div className="bg-white flex flex-col items-center justify-center p-[20px] rounded-[16px] w-full shrink-0">
            <div className="flex gap-[10px] items-center justify-center w-full">
              <div
                className="flex flex-col items-center justify-center p-[12px] rounded-full shrink-0 size-[50px]"
                style={{ background: "linear-gradient(to bottom, #0233c3, #9f3df5)" }}
              >
                <FigmaIcon src={imgGift} size={26} />
              </div>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-[#333] flex-1 min-w-0">
                {t.bonus1}
                <span
                  className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(to bottom, #0233c3, #9f3df5)" }}
                >
                  R$100,00
                </span>
                {t.bonus2}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-[15px] items-center lg:justify-start justify-center w-full">
            {trustItems.map((item) => (
              <div key={item.title} className="flex flex-[1_0_0] gap-[10px] items-center min-w-[180px]">
                <FigmaIcon src={item.icon} size={20} aspectW={item.aspectW} aspectH={item.aspectH} />
                <div className="flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-0">
                  <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#1f2e91] w-full">
                    {item.title}
                  </p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] leading-[14px] text-[#2a2a2b] w-full">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex flex-wrap gap-[20px] items-center justify-center p-[20px] rounded-[16px] w-full shrink-0 drop-shadow-[0px_0px_2px_rgba(0,0,0,0.1)]"
            style={{ background: "linear-gradient(to bottom, #0233c3, #9f3df5)" }}
          >
            <FigmaIcon src={imgLock} size={30} aspectW={27} aspectH={30} />
            <div className="flex flex-[1_0_0] flex-col gap-[5px] items-start justify-center min-w-[240px]">
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white w-full">
                {t.bannerTitle}
              </p>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] leading-[16px] text-white w-full">
                {t.bannerSub1}
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[#73d0ff]">UP</span>
                {t.bannerSub2}
              </p>
            </div>
            <div className="flex flex-[1_0_0] flex-col items-start max-h-[33.57px] max-w-[160px] min-w-[160px]">
              <div className="relative w-full" style={{ aspectRatio: "1133.86 / 237.88" }}>
                <img
                  alt="Acquafy"
                  className="absolute inset-0 w-full h-full object-contain"
                  src={imgLogoWhite}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden flex flex-col h-[380px] items-center justify-center overflow-clip rounded-[16px] shrink-0 w-full">
          <img
            alt="Acquafy Neo UP"
            className="w-full h-full object-cover"
            src={imgProduct}
          />
        </div>
      </div>
    </section>
  );
}
