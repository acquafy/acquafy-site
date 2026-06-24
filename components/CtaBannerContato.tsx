"use client";

import Link from "next/link";
import { BtnAzulOutArrow, BtnAzulBaseArrow } from "./ui/Buttons";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg = "/figma-assets/bg-l.webp";

const T: Record<Lang, { heading: string; btnNeo: string; btnMedia: string }> = {
  pt: {
    heading: "Vamos juntos transformar o acesso à água e a vida das pessoas.",
    btnNeo: "Conheça Linha NEO",
    btnMedia: "Conheça o Acquafy Media",
  },
  "pt-pt": {
    heading: "Juntos, vamos transformar o acesso à água e a vida das pessoas.",
    btnNeo: "Conheça a Linha NEO",
    btnMedia: "Conheça o Acquafy Media",
  },
  en: {
    heading: "Let's together transform access to water and people's lives.",
    btnNeo: "Discover the NEO Line",
    btnMedia: "Discover Acquafy Media",
  },
  "en-gb": {
    heading: "Let's together transform access to water and people's lives.",
    btnNeo: "Discover the NEO Line",
    btnMedia: "Discover Acquafy Media",
  },
  es: {
    heading: "Juntos transformemos el acceso al agua y la vida de las personas.",
    btnNeo: "Conoce la Línea NEO",
    btnMedia: "Conoce Acquafy Media",
  },
  fr: {
    heading: "Transformons ensemble l'accès à l'eau et la vie des personnes.",
    btnNeo: "Découvrir la Gamme NEO",
    btnMedia: "Découvrir Acquafy Media",
  },
  de: {
    heading: "Lassen Sie uns gemeinsam den Zugang zu Wasser und das Leben der Menschen verändern.",
    btnNeo: "Neo Linie entdecken",
    btnMedia: "Acquafy Media entdecken",
  },
  it: {
    heading: "Trasformiamo insieme l'accesso all'acqua e la vita delle persone.",
    btnNeo: "Scopri la Linea NEO",
    btnMedia: "Scopri Acquafy Media",
  },
  zh: {
    heading: "让我们共同改变人们获取水资源的方式和生活。",
    btnNeo: "了解 NEO 系列",
    btnMedia: "了解 Acquafy Media",
  },
  ja: {
    heading: "共に、水へのアクセスと人々の生活を変えていきましょう。",
    btnNeo: "Neo ラインを見る",
    btnMedia: "Acquafy Media を見る",
  },
  ko: {
    heading: "함께 물에 대한 접근성과 사람들의 삶을 변화시켜 나갑시다.",
    btnNeo: "NEO 라인 알아보기",
    btnMedia: "Acquafy Media 알아보기",
  },
  sv: {
    heading: "Låt oss tillsammans förändra tillgången till vatten och människors liv.",
    btnNeo: "Utforska NEO-linjen",
    btnMedia: "Utforska Acquafy Media",
  },
  fi: {
    heading: "Muutetaan yhdessä ihmisten vedenjakelu ja elämä paremmaksi.",
    btnNeo: "Tutustu NEO-sarjaan",
    btnMedia: "Tutustu Acquafy Mediaan",
  },
  ru: {
    heading: "Давайте вместе изменим доступ к воде и жизнь людей.",
    btnNeo: "Узнать о линейке NEO",
    btnMedia: "Узнать об Acquafy Media",
  },
  ro: {
    heading: "Sa transformam impreuna accesul la apa si viata oamenilor.",
    btnNeo: "Descopera Linia NEO",
    btnMedia: "Descopera Acquafy Media",
  },
  he: {
    heading: "בואו נשנה יחד את הגישה למים ואת חיי האנשים.",
    btnNeo: "גלה את קו NEO",
    btnMedia: "גלה את Acquafy Media",
  },
};

export default function CtaBannerContato() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="border border-[#cbd0d4] flex flex-col lg:flex-row gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden px-[20px] lg:px-[80px] py-[40px] relative rounded-[16px] w-full">

        {/* Imagem de fundo (gradiente azul/roxo) */}
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[16px]"
          src={imgBg}
        />

        {/* Texto esquerdo */}
        <div className="relative flex flex-[1_0_0] flex-col items-center justify-center min-w-[240px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center lg:text-left">
            {t.heading}
          </h2>
        </div>

        {/* Botões direito */}
        <div className="relative flex flex-[1_0_0] flex-wrap gap-[10px] items-center justify-center xl:justify-end max-w-[500px] min-w-[240px]">
          {/* Botão outline — bg-white, texto azul */}
          <Link href="/linha-neo" className="flex-1 min-w-[200px]">
            <BtnAzulOutArrow className="w-full min-h-[56px]">
              {t.btnNeo}
            </BtnAzulOutArrow>
          </Link>
          {/* Botão sólido — bg azul, texto branco */}
          <Link href="/neo-media" className="flex-1 min-w-[200px]">
            <BtnAzulBaseArrow className="w-full min-h-[56px]">
              {t.btnMedia}
            </BtnAzulBaseArrow>
          </Link>
        </div>

      </div>
    </section>
  );
}
