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
  "pt-pt": {
    badge: "CHECKOUT SEGURO",
    h2a: "O seu purificador antigo vale", h2b: "um UP!",
    bonus1: "Ganhe ", bonus2: " de bónus na compra do Acquafy Neo UP Essentials.",
    trust: [
      { title: "Compra 100% segura",    sub: "Os seus dados protegidos" },
      { title: "Produto com garantia",  sub: "Qualidade Acquafy" },
      { title: "Suporte especializado", sub: "Antes e após a sua compra" },
    ],
    bannerTitle: "Água de qualidade não deve ser um privilégio.",
    bannerSub1: "Faça um ", bannerSub2: " e leve mais saúde para si e para a sua família.",
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
  fr: {
    badge: "PAIEMENT SÉCURISÉ",
    h2a: "Votre ancien purificateur vaut", h2b: "un UP !",
    bonus1: "Gagnez ", bonus2: " de bonus à l'achat de l'Acquafy Neo UP Essentials.",
    trust: [
      { title: "Achat 100 % sécurisé",  sub: "Vos données sont protégées" },
      { title: "Produit avec garantie", sub: "Qualité Acquafy" },
      { title: "Support spécialisé",    sub: "Avant et après votre achat" },
    ],
    bannerTitle: "L'eau de qualité ne devrait pas être un privilège.",
    bannerSub1: "Faites un ", bannerSub2: " et apportez plus de santé à vous et votre famille.",
  },
  de: {
    badge: "SICHERER KAUF",
    h2a: "Ihr alter Purifier ist", h2b: "ein UP wert!",
    bonus1: "Erhalten Sie ", bonus2: " Bonus beim Kauf des Acquafy Neo UP Essentials.",
    trust: [
      { title: "100 % sicherer Kauf",    sub: "Ihre Daten sind geschützt" },
      { title: "Produkt mit Garantie",   sub: "Acquafy Qualität" },
      { title: "Spezialisierter Support", sub: "Vor und nach Ihrem Kauf" },
    ],
    bannerTitle: "Qualitätswasser sollte kein Privileg sein.",
    bannerSub1: "Machen Sie ein ", bannerSub2: " und bringen Sie mehr Gesundheit für sich und Ihre Familie.",
  },
  it: {
    badge: "ACQUISTO SICURO",
    h2a: "Il tuo vecchio purificatore vale", h2b: "un UP!",
    bonus1: "Guadagna ", bonus2: " di bonus all'acquisto dell'Acquafy Neo UP Essentials.",
    trust: [
      { title: "Acquisto 100% sicuro",   sub: "I tuoi dati sono protetti" },
      { title: "Prodotto con garanzia",  sub: "Qualità Acquafy" },
      { title: "Supporto specializzato", sub: "Prima e dopo il tuo acquisto" },
    ],
    bannerTitle: "L'acqua di qualità non dovrebbe essere un privilegio.",
    bannerSub1: "Fai un ", bannerSub2: " e porta più salute a te e alla tua famiglia.",
  },
  zh: {
    badge: "安全结账",
    h2a: "您的旧净水机值得换一台", h2b: "UP！",
    bonus1: "购买 Acquafy Neo UP Essentials 即可获得 ", bonus2: " 奖励。",
    trust: [
      { title: "100% 安全购物",  sub: "您的数据受到保护" },
      { title: "产品享有保修",   sub: "Acquafy 品质保证" },
      { title: "专业售后支持",   sub: "购买前后全程服务" },
    ],
    bannerTitle: "优质水源不应是少数人的特权。",
    bannerSub1: "体验 ", bannerSub2: "，为您和家人带来更多健康。",
  },
  ja: {
    badge: "安全なチェックアウト",
    h2a: "古い浄水器が", h2b: "UP に生まれ変わる！",
    bonus1: "Acquafy Neo UP Essentials のご購入で ", bonus2: " ボーナスをゲット。",
    trust: [
      { title: "100% 安全なお買い物", sub: "お客様のデータを保護" },
      { title: "保証付き製品",        sub: "Acquafy の品質" },
      { title: "専門サポート",         sub: "ご購入の前後を通じてサポート" },
    ],
    bannerTitle: "質の高い水は特権であってはなりません。",
    bannerSub1: "", bannerSub2: " で、あなたと家族にもっと健康を。",
  },
  ko: {
    badge: "안전한 결제",
    h2a: "기존 정수기를", h2b: "UP으로 업그레이드하세요!",
    bonus1: "Acquafy Neo UP Essentials 구매 시 ", bonus2: " 보너스를 받으세요.",
    trust: [
      { title: "100% 안전한 구매",  sub: "고객님의 데이터가 보호됩니다" },
      { title: "보증이 있는 제품",  sub: "Acquafy 품질" },
      { title: "전문 지원 서비스",  sub: "구매 전후 모두 지원" },
    ],
    bannerTitle: "깨끗한 물은 특권이 되어서는 안 됩니다.",
    bannerSub1: "", bannerSub2: "을 통해 가족 모두에게 더 건강한 삶을 선물하세요.",
  },
  "en-gb": {
    badge: "SECURE CHECKOUT",
    h2a: "Your old purifier is worth", h2b: "an UP!",
    bonus1: "Earn ", bonus2: " in bonus on the purchase of the Acquafy Neo UP Essentials.",
    trust: [
      { title: "100% secure purchase",  sub: "Your data is protected" },
      { title: "Product with warranty", sub: "Acquafy Quality" },
      { title: "Specialised support",   sub: "Before and after your purchase" },
    ],
    bannerTitle: "Quality water shouldn't be a privilege.",
    bannerSub1: "Do an ", bannerSub2: " and bring more health to you and your family.",
  },
  sv: {
    badge: "SÄKER UTCHECKNING",
    h2a: "Din gamla renare är värd", h2b: "ett UP!",
    bonus1: "Tjäna ", bonus2: " i bonus vid köp av Acquafy Neo UP Essentials.",
    trust: [
      { title: "100% säkert köp",       sub: "Dina uppgifter är skyddade" },
      { title: "Produkt med garanti",    sub: "Acquafy-kvalitet" },
      { title: "Specialiserat stöd",     sub: "Före och efter ditt köp" },
    ],
    bannerTitle: "Kvalitetsvatten borde inte vara ett privilegium.",
    bannerSub1: "Gör ett ", bannerSub2: " och ge dig och din familj mer hälsa.",
  },
  fi: {
    badge: "TURVALLINEN KASSA",
    h2a: "Vanha puhdistimesi on", h2b: "UP:n arvoinen!",
    bonus1: "Ansaitse ", bonus2: " bonusta Acquafy Neo UP Essentialsin ostosta.",
    trust: [
      { title: "100% turvallinen osto",  sub: "Tietosi ovat suojattuja" },
      { title: "Takuullinen tuote",       sub: "Acquafy-laatu" },
      { title: "Erikoistunut tuki",       sub: "Ennen ja jälkeen ostoksesi" },
    ],
    bannerTitle: "Laadukas vesi ei saa olla etuoikeus.",
    bannerSub1: "Tee ", bannerSub2: " ja tuo enemmän terveyttä sinulle ja perheellesi.",
  },
  ru: {
    badge: "БЕЗОПАСНАЯ ОПЛАТА",
    h2a: "Ваш старый очиститель стоит", h2b: "апгрейда!",
    bonus1: "Получите ", bonus2: " бонуса при покупке Acquafy Neo UP Essentials.",
    trust: [
      { title: "100% безопасная покупка", sub: "Ваши данные защищены" },
      { title: "Продукт с гарантией",     sub: "Качество Acquafy" },
      { title: "Специализированная поддержка", sub: "До и после покупки" },
    ],
    bannerTitle: "Качественная вода не должна быть привилегией.",
    bannerSub1: "Сделайте ", bannerSub2: " и подарите себе и семье больше здоровья.",
  },
  ro: {
    badge: "PLATA SECURIZATA",
    h2a: "Purificatorul tau vechi valoreaza", h2b: "un UP!",
    bonus1: "Castiga ", bonus2: " bonus la cumpararea Acquafy Neo UP Essentials.",
    trust: [
      { title: "Cumparare 100% sigura",  sub: "Datele tale sunt protejate" },
      { title: "Produs cu garantie",     sub: "Calitate Acquafy" },
      { title: "Suport specializat",     sub: "Inainte si dupa cumparatura" },
    ],
    bannerTitle: "Apa de calitate nu trebuie sa fie un privilegiu.",
    bannerSub1: "Fa un ", bannerSub2: " si aduce mai multa sanatate tie si familiei tale.",
  },
  he: {
    badge: "תשלום מאובטח",
    h2a: "המטהר הישן שלך שווה", h2b: "שדרוג!",
    bonus1: "קבל ", bonus2: " בונוס ברכישת Acquafy Neo UP Essentials.",
    trust: [
      { title: "רכישה 100% מאובטחת",    sub: "הנתונים שלך מוגנים" },
      { title: "מוצר עם אחריות",         sub: "איכות Acquafy" },
      { title: "תמיכה מתמחה",            sub: "לפני ואחרי הרכישה" },
    ],
    bannerTitle: "מים איכותיים לא צריכים להיות זכות יתר.",
    bannerSub1: "עשה ", bannerSub2: " והבא יותר בריאות לך ולמשפחתך.",
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
