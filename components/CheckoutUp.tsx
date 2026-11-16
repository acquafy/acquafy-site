"use client";
import Img from "@/components/ui/Img";
import FigmaIcon from "./FigmaIcon";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { S2, WAAS_BANNER } from "@/lib/waas-copy";
import WaasBuyButtons from "./ui/WaasButtons";

const imgWoman      = "/figma-assets/woman-bottles.webp";
const imgBgLeft     = "/figma-assets/waas-bg-left.webp";
const imgBgRight    = "/figma-assets/waas-bg-right.webp";
const imgFridge     = "/figma-assets/waas-fridge.webp";
const imgWater      = "/figma-assets/waas-water.webp";
const imgPurifier   = "/images/checkin/neo-up/neo-up/cz/02.webp";
const imgSnow       = "/figma-assets/icon-hero-snow.svg";
const imgLogo       = "/figma-assets/logo-b.svg";
const imgDrop       = "/figma-assets/icon-hero-drop.svg";
const imgArrowWhite = "/figma-assets/icon-arrow-white-hover.svg";

const CARD_ICONS = [
  "/figma-assets/icon-hero-bottle.svg",
  "/figma-assets/icon-hero-fridge.svg",
  "/figma-assets/icon-hero-snow.svg",
  "/figma-assets/icon-hero-calendar-check.svg",
];

export default function CheckoutUp() {
  const { lang } = useLang();
  const t = WAAS_BANNER[lang];
  const s2 = S2[lang];

  return (
    <section className="flex flex-col items-center justify-center p-[20px] w-full">
      <div className="relative w-full max-w-[1400px] rounded-[16px] overflow-hidden bg-[#f3f8ff] lg:min-h-[500px]">

        {/* ── Artwork (lg+) — positions follow the 1600×533 reference ── */}
        <div aria-hidden="true" className="hidden lg:block absolute inset-0 pointer-events-none">
          <Img alt="" src={imgBgLeft} className="absolute left-0 top-0 h-full w-[52%] object-cover object-left" />
          <Img
            alt=""
            src={imgBgRight}
            className="absolute right-0 top-0 h-full w-[68%] object-cover object-right"
            style={{ WebkitMaskImage: "linear-gradient(to right, transparent, #000 30%)", maskImage: "linear-gradient(to right, transparent, #000 30%)" }}
          />
          <Img alt="" src={imgWoman} className="absolute left-0 bottom-0 h-full w-auto max-w-[26%] object-contain object-left-bottom" />
          <Img alt="" src={imgPurifier} className="absolute z-[2] left-[65%] top-[24%] w-[14.5%] h-auto" />
          <Img alt="" src={imgFridge} className="absolute z-[2] right-[-1%] top-[2%] h-[97%] w-auto" />
          <Img alt="" src={imgWater} className="absolute z-[3] right-0 bottom-0 w-[35%] h-auto" />

          {/* connector purifier → refrigerator dispenser */}
          <svg className="absolute z-[4] inset-0 w-full h-full" viewBox="0 0 1600 533" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waas-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#6e0cc3" stopOpacity="0" />
                <stop offset="0.35" stopColor="#9f3df5" />
                <stop offset="1" stopColor="#c9a2ff" />
              </linearGradient>
            </defs>
            <path
              d="M1262 326 H1296 Q1318 326 1318 304 V252 Q1318 232 1338 232 H1366"
              fill="none"
              stroke="url(#waas-line)"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ filter: "drop-shadow(0 0 4px rgba(159,61,245,0.8))" }}
            />
          </svg>
          <div
            className="absolute z-[4] flex items-center justify-center rounded-full bg-white shadow-[0_0_10px_rgba(159,61,245,0.55)] size-[44px] -translate-x-1/2 -translate-y-1/2"
            style={{ left: "85.6%", top: "43.5%" }}
          >
            <FigmaIcon src={imgSnow} size={28} />
          </div>
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col gap-[20px] items-center lg:items-start w-full p-[20px] lg:pl-[27%] lg:pr-[10px] lg:py-[30px] lg:w-[64%]">
          <div className="flex flex-wrap gap-[15px] items-center justify-center lg:justify-start">
            <div className="bg-white border border-[#0233c3] flex gap-[10px] items-center justify-center px-[12px] py-[8px] rounded-full shrink-0 max-w-full">
              <FigmaIcon src={imgDrop} size={16} />
              <span className="font-avenir-heavy text-[14px] leading-[17px] bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(126deg, #0233c3 6.19%, #9f3df5 93.35%)" }}>
                {s2.label}
              </span>
            </div>
          </div>

          <h2 className="font-avenir-black text-[36px] leading-[1.15] text-[#2a2a2b] w-full text-center lg:text-left lg:text-[42px] lg:w-full">
            {t.h1a}<br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to bottom, #0233c3, #9f3df5)" }}>{t.h1b}</span>
          </h2>

          <p className="font-avenir-roman text-[18px] leading-[26px] text-[#333] w-full text-center lg:text-left lg:text-[16px] lg:leading-[22px]">{t.sub}</p>

          <div className="flex flex-wrap gap-[10px] items-stretch justify-center w-full">
            {CARD_ICONS.map((icon, i) => (
              <div key={i} className="bg-[rgba(255,255,255,0.7)] border border-white flex flex-[1_0_0] flex-col gap-[10px] items-center justify-center min-w-[130px] lg:min-w-[100px] px-[10px] py-[16px] rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
                <FigmaIcon src={icon} size={36} />
                <p className="font-avenir-heavy text-[14px] leading-[17px] text-[#333] text-center w-full min-h-[34px] flex items-center justify-center">{t.cards[i]}</p>
              </div>
            ))}
          </div>

          <WaasBuyButtons s={s2} compact className="flex flex-wrap lg:flex-nowrap gap-[8px] items-stretch justify-center lg:justify-start w-full">
            <Link
              href="/neo-line"
              className="flex flex-[1_1_0] gap-[8px] items-center justify-center min-h-[56px] min-w-[130px] lg:min-w-0 overflow-hidden px-[12px] py-[10px] rounded-[8px] cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
              style={{ backgroundImage: "linear-gradient(104deg, #7a16d2 6.19%, #9f3df5 93.35%)" }}
            >
              <span className="font-avenir-roman text-[15px] leading-[19px] text-white text-center lg:min-w-0">
                {t.moreA}<span className="font-avenir-heavy">{t.moreB}</span>{t.moreC}
              </span>
              <FigmaIcon src={imgArrowWhite} size={16} />
            </Link>
          </WaasBuyButtons>
        </div>

        {/* Mobile: woman below the content (responsive pass comes later) */}
        <div className="lg:hidden w-full max-w-[260px] mx-auto">
          <Img alt="" className="w-full h-auto block pointer-events-none" src={imgWoman} />
        </div>
      </div>
    </section>
  );
}
