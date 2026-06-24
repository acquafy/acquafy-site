"use client";
import FigmaIcon from "./FigmaIcon";
import { BtnVerdeOutArrow } from "./ui/Buttons";
import { useLang, type Lang } from "@/context/LanguageContext";

// ── Assets ───────────────────────────────────────────────────────────────────
const imgBg   = "/figma-assets/ts-cta-bg.webp";
const imgIcon = "/figma-assets/ts-icon-experiencia.svg";  // experiência água  438×492

const T: Record<Lang, {
  heading: string;
  cta: string;
}> = {
  pt: {
    heading: "Inovação que cuida de pessoas e do planeta ao mesmo tempo.",
    cta: "Faça parte dessa transformação",
  },
  en: {
    heading: "Innovation that cares for people and the planet at the same time.",
    cta: "Be part of this transformation",
  },
  "en-gb": {
    heading: "Innovation that cares for people and the planet at the same time.",
    cta: "Be part of this transformation",
  },
  es: {
    heading: "Innovación que cuida a las personas y al planeta al mismo tiempo.",
    cta: "Sé parte de esta transformación",
  },
  fr: {
    heading: "Innovation qui prend soin des personnes et de la planète en même temps.",
    cta: "Faites partie de cette transformation",
  },
  de: {
    heading: "Innovation, die gleichzeitig für Menschen und den Planeten sorgt.",
    cta: "Werden Sie Teil dieser Transformation",
  },
  it: {
    heading: "Innovazione che si prende cura delle persone e del pianeta allo stesso tempo.",
    cta: "Fai parte di questa trasformazione",
  },
  zh: {
    heading: "同时关爱人类与地球的创新。",
    cta: "成为这场变革的一部分",
  },
  ja: {
    heading: "人と地球を同時に大切にするイノベーション。",
    cta: "この変革の一員になりましょう",
  },
  ko: {
    heading: "사람과 지구를 동시에 돌보는 혁신.",
    cta: "이 변화의 일원이 되세요",
  },
  sv: {
    heading: "Innovation som tar hand om människor och planeten samtidigt.",
    cta: "Bli en del av denna transformation",
  },
  fi: {
    heading: "Innovaatio, joka huolehtii ihmisistä ja planeetasta samaan aikaan.",
    cta: "Ole osa tätä muutosta",
  },
  ru: {
    heading: "Innovatsii, kotorye zabotjatsja o ljudjakh i planete odnovremenno.",
    cta: "Staните chast'ju etoj transformatsii",
  },
  ro: {
    heading: "Inovatie care are grija de oameni si de planeta in acelasi timp.",
    cta: "Fii parte din aceasta transformare",
  },
  he: {
    heading: "חדשנות שדואגת לאנשים ולכדור הארץ בו-זמנית.",
    cta: "היה חלק מהשינוי הזה",
  },
  "pt-pt": {
    heading: "Inovação que cuida das pessoas e do planeta ao mesmo tempo.",
    cta: "Faça parte desta transformação",
  },
};

// ── Main ─────────────────────────────────────────────────────────────────────

export default function TecnologiaCtaBanner() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="relative flex flex-wrap gap-[20px] items-center justify-center max-w-[1400px] overflow-hidden p-[40px] rounded-[16px] w-full">
        {/* Background */}
        <div className="absolute inset-0 rounded-[16px] pointer-events-none" aria-hidden>
          <div className="absolute bg-[#0b8650] inset-0 rounded-[16px]" />
          <img
            alt=""
            className="absolute max-w-none object-cover opacity-40 rounded-[16px] size-full"
            src={imgBg}
          />
        </div>

        {/* Icon */}
        <div className="relative shrink-0">
          <FigmaIcon src={imgIcon} size={60} aspectW={438} aspectH={492} />
        </div>

        {/* Title */}
        <div className="relative flex flex-[1_0_0] flex-col items-center justify-center min-w-[240px]">
          <h2 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[39px] text-white w-full text-center lg:text-left">
            {t.heading}
          </h2>
        </div>

        {/* CTA button */}
        <div className="relative flex flex-[1_0_0] items-center justify-center max-w-[300px] min-w-[200px]">
          <BtnVerdeOutArrow className="w-full min-h-[56px]">
            {t.cta}
          </BtnVerdeOutArrow>
        </div>
      </div>
    </section>
  );
}
