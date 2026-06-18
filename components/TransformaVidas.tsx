"use client";
import FigmaIcon from "./FigmaIcon";
import { useLang, type Lang } from "@/context/LanguageContext";

const imgProduct       = "/figma-assets/neo-up-bow.webp";
const imgBgDesktop     = "/figma-assets/bg-desktop-city.webp";
const imgFamilyDesktop = "/figma-assets/photo-family-desktop.webp";
const imgBgMobile      = "/figma-assets/bg-mobile-gradient.webp";
const imgFamilyMobile  = "/figma-assets/photo-family-mobile.webp";
const imgArrowBlue     = "/figma-assets/icon-arrow-blue-outline-btn.svg";
const imgArrowWhite    = "/figma-assets/icon-arrow-white-hover.svg";

const T: Record<Lang, {
  title: string;
  sub1: string; sub2: string; sub3: string;
  btn: string;
}> = {
  pt: {
    title: "CAMPANHA ACQUAFY TRANSFORMA VIDAS",
    sub1: "De julho a dezembro, 1 purificador por mês.",
    sub2: "Participe e concorra a um ",
    sub3: " todo mês!",
    btn: "Quero participar",
  },
  en: {
    title: "ACQUAFY TRANSFORMS LIVES CAMPAIGN",
    sub1: "From July to December, 1 purifier per month.",
    sub2: "Join and compete for an ",
    sub3: " every month!",
    btn: "I want to participate",
  },
  es: {
    title: "CAMPAÑA ACQUAFY TRANSFORMA VIDAS",
    sub1: "De julio a diciembre, 1 purificador por mes.",
    sub2: "Participa y concursa por un ",
    sub3: " ¡cada mes!",
    btn: "Quiero participar",
  },
  fr: {
    title: "CAMPAGNE ACQUAFY TRANSFORME DES VIES",
    sub1: "De juillet à décembre, 1 purificateur par mois.",
    sub2: "Participez et concourez pour un ",
    sub3: " chaque mois !",
    btn: "Je veux participer",
  },
  de: {
    title: "ACQUAFY VERÄNDERT LEBEN KAMPAGNE",
    sub1: "Von Juli bis Dezember, 1 Wasserreiniger pro Monat.",
    sub2: "Mitmachen und gewinnen Sie einen ",
    sub3: " jeden Monat!",
    btn: "Ich möchte mitmachen",
  },
  it: {
    title: "CAMPAGNA ACQUAFY TRASFORMA VITE",
    sub1: "Da luglio a dicembre, 1 purificatore al mese.",
    sub2: "Partecipa e concorri per un ",
    sub3: " ogni mese!",
    btn: "Voglio partecipare",
  },
  zh: {
    title: "ACQUAFY改变生活活动",
    sub1: "从7月到12月，每月一台净水器。",
    sub2: "参与并角逐一台 ",
    sub3: " 每个月！",
    btn: "我想参与",
  },
  ja: {
    title: "ACQUAFY 生活を変えるキャンペーン",
    sub1: "7月から12月まで、毎月1台の浄水器。",
    sub2: "参加して ",
    sub3: " を毎月獲得しよう！",
    btn: "参加したい",
  },
  ko: {
    title: "ACQUAFY 삶을 변화시키는 캠페인",
    sub1: "7월부터 12월까지, 매월 정수기 1대.",
    sub2: "참여하고 ",
    sub3: " 을 매달 받아가세요!",
    btn: "참여하고 싶어요",
  },
  "pt-pt": {
    title: "CAMPANHA ACQUAFY TRANSFORMA VIDAS",
    sub1: "De julho a dezembro, 1 purificador por mês.",
    sub2: "Participe e concorra a um ",
    sub3: " todos os meses!",
    btn: "Quero participar",
  },
};

function NeoUPProduct({ size }: { size: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center relative shrink-0"
      style={{ width: size, height: size }}
    >
      <div
        className="flex-[1_0_0] min-h-px relative"
        style={{ aspectRatio: "1191 / 1456" }}
      >
        <img
          alt="Acquafy Neo UP"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgProduct}
        />
      </div>
    </div>
  );
}

function CampaignText({ centered, t }: { centered?: boolean; t: typeof T["pt"] }) {
  return (
    <div className={`flex flex-col gap-[20px] items-start text-white w-full ${centered ? "items-center text-center" : ""}`}>
      <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[20px] leading-[28px] text-white w-full">
        {t.title}
      </p>
      <p className="font-['Avenir_LT_Pro:55_Roman'] text-[18px] leading-[19px] text-white w-full">
        {t.sub1}
        <br />
        {t.sub2}
        <span className="font-['Avenir_LT_Pro:85_Heavy']">Acquafy Neo UP</span>
        {t.sub3}
      </p>
    </div>
  );
}

function ParticipateButton({ label }: { label: string }) {
  return (
    <a href="/contato" className="group bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors flex gap-[10px] items-center justify-center min-h-[30px] overflow-hidden px-[20px] py-[10px] rounded-[8px] shrink-0 cursor-pointer">
      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] leading-[17px] text-[#0233c3] group-hover:text-white group-active:text-white transition-colors text-center whitespace-nowrap">
        {label}
      </span>
      <div className="relative shrink-0" style={{ width: 9, height: 9 }}>
        <div className="absolute inset-0 transition-opacity duration-150 opacity-100 group-hover:opacity-0 group-active:opacity-0">
          <FigmaIcon src={imgArrowBlue} size={9} aspectW={11.2} aspectH={8.84} />
        </div>
        <div className="absolute inset-0 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-active:opacity-100">
          <FigmaIcon src={imgArrowWhite} size={9} aspectW={11.2} aspectH={8.84} />
        </div>
      </div>
    </a>
  );
}

export default function TransformaVidas() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <section className="bg-white flex flex-col items-center justify-center px-[20px] py-[40px] w-full">
      <div className="
        max-w-[1400px] overflow-hidden relative rounded-[16px] w-full
        flex flex-col items-center justify-center gap-[40px] pt-[40px] px-[20px]
        lg:flex-row lg:flex-wrap lg:gap-[10px] lg:pt-0 lg:px-0 lg:items-center lg:justify-center
      ">

        <img
          alt=""
          className="hidden lg:block absolute inset-0 size-full object-cover pointer-events-none rounded-[16px]"
          src={imgBgDesktop}
        />

        <img
          alt=""
          className="lg:hidden absolute inset-0 size-full object-cover pointer-events-none rounded-[16px]"
          src={imgBgMobile}
        />

        <div className="lg:hidden relative flex flex-col gap-[10px] items-center justify-center min-w-[240px] shrink-0 w-full">
          <CampaignText centered t={t} />
          <ParticipateButton label={t.btn} />
        </div>

        <div className="hidden lg:flex flex-[1_0_0] flex-wrap gap-[10px] min-w-px pl-[20px] py-[20px]">
          <div className="relative flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-[280px] py-[40px]">
            <div className="max-w-[370px] rounded-[16px] w-full">
              <CampaignText t={t} />
            </div>
            <ParticipateButton label={t.btn} />
          </div>
          <div className="flex flex-[1_0_0] items-center justify-center min-w-[240px]" style={{ height: 268 }}>
            <NeoUPProduct size={246} />
          </div>
        </div>

        <div className="lg:hidden flex flex-col items-center justify-center relative shrink-0" style={{ width: 290, height: 290, maxWidth: 292, maxHeight: 292 }}>
          <div className="flex-[1_0_0] min-h-px relative" style={{ aspectRatio: "1191 / 1456" }}>
            <img
              alt="Acquafy Neo UP"
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgProduct}
            />
          </div>
        </div>

        <div
          className="hidden lg:flex flex-col items-center justify-end shrink-0 w-[400px]"
          style={{ height: 390, maxHeight: 390 }}
        >
          <div className="flex-[1_0_0] min-h-px relative w-full">
            <img
              alt="Família Acquafy"
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgFamilyDesktop}
            />
          </div>
        </div>

        <div
          className="lg:hidden flex flex-col items-center justify-end min-w-[240px] shrink-0 w-full relative"
          style={{ maxHeight: 390 }}
        >
          <div className="relative shrink-0" style={{ height: 338.511, maxHeight: 338.511, width: 380, maxWidth: 380 }}>
            <img
              alt="Família Acquafy"
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={imgFamilyMobile}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
