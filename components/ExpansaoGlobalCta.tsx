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
  "pt-pt": {
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
  "en-gb": {
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
  fr: {
    heading: "Rejoignez le réseau mondial Acquafy",
    sub: "Ensemble, nous pouvons transformer des millions de vies, créer des opportunités et bâtir un avenir plus sain et plus durable.",
    btnPartner: "Devenir partenaire",
    btnSpecialist: "Parler à un spécialiste",
  },
  de: {
    heading: "Werden Sie Teil des globalen Acquafy-Netzwerks",
    sub: "Gemeinsam können wir Millionen von Leben verändern, Chancen schaffen und eine gesündere, nachhaltigere Zukunft aufbauen.",
    btnPartner: "Partner werden",
    btnSpecialist: "Mit Experten sprechen",
  },
  it: {
    heading: "Entra a far parte della rete globale Acquafy",
    sub: "Insieme possiamo trasformare milioni di vite, creare opportunità e costruire un futuro più sano e sostenibile.",
    btnPartner: "Diventa partner",
    btnSpecialist: "Parla con uno specialista",
  },
  zh: {
    heading: "加入 Acquafy 全球网络",
    sub: "携手共进，我们可以改变数百万人的生活，创造机遇，共建更健康、更可持续的未来。",
    btnPartner: "成为合作伙伴",
    btnSpecialist: "联系专家",
  },
  ja: {
    heading: "Acquafy グローバルネットワークに参加する",
    sub: "共に、何百万もの人々の生活を変え、チャンスを生み出し、より健康で持続可能な未来を築きましょう。",
    btnPartner: "パートナーになる",
    btnSpecialist: "専門家に相談する",
  },
  ko: {
    heading: "Acquafy 글로벌 네트워크에 참여하세요",
    sub: "함께라면 수백만 명의 삶을 변화시키고, 기회를 창출하며, 더 건강하고 지속 가능한 미래를 만들 수 있습니다.",
    btnPartner: "파트너 되기",
    btnSpecialist: "전문가와 상담",
  },
  sv: {
    heading: "Bli en del av Acquafys globala nätverk",
    sub: "Tillsammans kan vi förändra miljontals liv, skapa möjligheter och bygga en hälsosam och hållbar framtid.",
    btnPartner: "Bli partner",
    btnSpecialist: "Tala med en specialist",
  },
  fi: {
    heading: "Liity Acquafyn globaaliin verkostoon",
    sub: "Yhdessä voimme muuttaa miljoonien ihmisten elämää, luoda mahdollisuuksia ja rakentaa terveempää ja kestävämpää tulevaisuutta.",
    btnPartner: "Tule kumppaniksi",
    btnSpecialist: "Puhu asiantuntijan kanssa",
  },
  ru: {
    heading: "Присоединяйтесь к глобальной сети Acquafy",
    sub: "Вместе мы можем изменить жизнь миллионов людей, создать возможности и построить более здоровое и устойчивое будущее.",
    btnPartner: "Стать партнером",
    btnSpecialist: "Поговорить со специалистом",
  },
  ro: {
    heading: "Fii parte din reteaua globala Acquafy",
    sub: "Impreuna putem transforma milioane de vieti, crea oportunitati si construi un viitor mai sanatos si mai sustenabil.",
    btnPartner: "Devino partener",
    btnSpecialist: "Vorbeste cu un specialist",
  },
  he: {
    heading: "הצטרף לרשת הגלובלית של Acquafy",
    sub: "יחד נוכל לשנות את חייהם של מיליונים, ליצור הזדמנויות ולבנות עתיד בריא וקיים יותר.",
    btnPartner: "הפוך לשותף",
    btnSpecialist: "דבר עם מומחה",
  },
};

export default function ExpansaoGlobalCta() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="border border-[#cbd0d4] flex flex-col lg:flex-row gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] lg:px-[80px] py-[40px] relative rounded-[16px] w-full">
        {/* Background */}
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
          src={imgBg}
        />

        {/* Text */}
        <div className="relative flex flex-1 flex-col items-center justify-center min-w-[240px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center lg:text-left">
            {t.heading}
          </h2>
          <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] leading-[22px] text-white w-full mt-[4px] text-center lg:text-left">
            {t.sub}
          </p>
        </div>

        {/* Buttons */}
        <div className="relative flex flex-1 flex-wrap gap-[10px] items-center justify-center xl:justify-end max-w-[500px] min-w-[240px]">
          <Link href="/parceria" className="flex-1 min-w-[200px]">
            <BtnAzulOutArrow className="w-full min-h-[56px]">
              {t.btnPartner}
            </BtnAzulOutArrow>
          </Link>
          <Link href="/contact" className="flex-1 min-w-[200px]">
            <BtnAzulBaseArrow className="w-full min-h-[56px]">
              {t.btnSpecialist}
            </BtnAzulBaseArrow>
          </Link>
        </div>
      </div>
    </section>
  );
}
