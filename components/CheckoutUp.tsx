"use client";
import Img from "@/components/ui/Img";
import FigmaIcon from "./FigmaIcon";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { S2, WAAS_BANNER, NEO_UP } from "@/lib/waas-copy";

const imgWoman      = "/figma-assets/woman-bottles.webp";
const imgBgLeft     = "/figma-assets/waas-bg-left.webp";
const imgGroupRight = "/figma-assets/waas-group-right.webp";
const imgDrop       = "/figma-assets/icon-hero-drop.svg";
const imgArrow      = "/figma-assets/icon-arrow-white-hover.svg";
const imgCart       = "/figma-assets/icon-vendas-b.svg";
const imgCalendar   = "/figma-assets/icon-calendar-a.svg";

const CARD_ICONS = [
  "/figma-assets/icon-hero-bottle.svg",
  "/figma-assets/icon-hero-fridge.svg",
  "/figma-assets/icon-hero-snow.svg",
  "/figma-assets/icon-hero-calendar-check.svg",
];

const gdBlue   = { backgroundImage: "linear-gradient(104deg, #0233c3 6.19%, #9f3df5 93.35%)" };
const gdPurple = { backgroundImage: "linear-gradient(104deg, #7a16d2 6.19%, #9f3df5 93.35%)" };
const gdLabel  = { backgroundImage: "linear-gradient(126deg, #0233c3 6.19%, #9f3df5 93.35%)" };

export default function CheckoutUp() {
  const { lang } = useLang();
  const t  = WAAS_BANNER[lang];
  const s2 = S2[lang];

  /* ─── shared fragments ─────────────────────────────────────── */

  const Badge = () => (
    <div className="bg-white border border-[#0233c3] flex gap-[10px] items-center px-[12px] py-[8px] rounded-full self-start shrink-0">
      <FigmaIcon src={imgDrop} size={16} />
      <span className="font-avenir-heavy text-[14px] leading-[17px] bg-clip-text text-transparent whitespace-nowrap"
            style={gdLabel}>
        {s2.label}
      </span>
    </div>
  );

  /* ─── SECTION ──────────────────────────────────────────────── */
  return (
    <section className="flex flex-col items-center justify-center p-[20px] w-full">

      {/* ══════════════════════════════════════════════════════════
          MOBILE  (<1024px) — flex-col stack
      ══════════════════════════════════════════════════════════ */}
      <div className="lg:hidden relative w-full max-w-[1400px] rounded-[16px] overflow-hidden bg-[#f3f8ff] flex flex-col">

        {/* text */}
        <div className="relative z-10 flex flex-col gap-[20px] items-center w-full p-[20px] pb-[10px]">
          <Badge />
          <h2 className="font-avenir-black text-[36px] leading-[1.15] text-[#2a2a2b] w-full text-center">
            {t.h1a}<br />{t.h1b}
          </h2>
          <p className="font-avenir-roman text-[18px] leading-[26px] text-[#333] w-full text-center">{t.sub}</p>
        </div>

        {/* cards (2-col grid) */}
        <div className="relative z-10 flex flex-col gap-[15px] items-center w-full px-[20px] pb-[20px]">
          <div className="grid grid-cols-2 gap-[10px] w-full">
            {CARD_ICONS.map((icon, i) => (
              <div key={i} className="bg-[rgba(255,255,255,0.7)] border border-white flex flex-col gap-[10px] items-center justify-center px-[10px] py-[16px] rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
                <FigmaIcon src={icon} size={36} />
                <p className="font-avenir-heavy text-[14px] leading-[17px] text-[#333] text-center w-full">{t.cards[i]}</p>
              </div>
            ))}
          </div>

          {/* buy + lease on same row, Conheça below */}
          <div className="flex flex-col gap-[20px] w-full">
            <div className="flex flex-wrap gap-[20px] items-stretch">
              <a href="/buy/checkin-neo-up?modelo=neo-up&pagamento=compra"
                 className="flex flex-[1_0_0] gap-[8px] items-center justify-center min-h-[42px] min-w-[160px] overflow-hidden px-[12px] py-[10px] rounded-[8px] transition-opacity hover:opacity-90 active:opacity-80"
                 style={gdBlue}>
                <FigmaIcon src={imgCart} size={20} />
                <span className="font-avenir-roman text-[15px] leading-[19px] text-white whitespace-nowrap">
                  {s2.buy} <span className="font-avenir-heavy">US$ {NEO_UP.sales}</span>
                </span>
              </a>
              <a href="/buy/checkin-neo-up?modelo=neo-up&pagamento=locacao"
                 className="group flex flex-[1_0_0] gap-[8px] items-center justify-center min-h-[42px] min-w-[160px] overflow-hidden px-[12px] py-[10px] rounded-[8px] border border-[#0233c3] bg-white transition-colors hover:bg-[#0233c3] active:bg-[#002ba8]">
                <div className="transition-[filter] group-hover:[filter:brightness(0)_invert(1)]">
                  <FigmaIcon src={imgCalendar} size={20} />
                </div>
                <span className="font-avenir-roman text-[15px] leading-[19px] text-[#0233c3] group-hover:text-white transition-colors whitespace-nowrap">
                  {s2.lease} <span className="font-avenir-heavy">US$ {NEO_UP.lease}{s2.perMonth}</span>
                </span>
              </a>
            </div>
            <Link href="/neo-line"
                  className="flex gap-[8px] items-center justify-center min-h-[56px] overflow-hidden px-[12px] py-[10px] rounded-[8px] w-full transition-opacity hover:opacity-90 active:opacity-80"
                  style={gdPurple}>
              <span className="font-avenir-roman text-[15px] leading-[19px] text-white flex-1 text-center">
                {t.moreA}<span className="font-avenir-heavy">{t.moreB}</span>{t.moreC}
              </span>
              <FigmaIcon src={imgArrow} size={16} />
            </Link>
          </div>
        </div>

        {/* woman */}
        <div aria-hidden="true" className="w-full max-w-[260px] mx-auto pointer-events-none">
          <Img alt="" src={imgWoman} className="block w-full h-auto" />
        </div>
      </div>


      {/* ══════════════════════════════════════════════════════════
          LG  (1024–1189px) — two stacked boxes
      ══════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex win-1190:hidden w-full max-w-[1400px] flex-col gap-[20px]">

        {/* Box 1 — woman + text */}
        <div className="relative bg-[#edf5fa] rounded-[16px] overflow-hidden flex items-end gap-[40px] pr-[20px]">
          <div aria-hidden="true" className="absolute inset-0 z-[1] pointer-events-none">
            <Img alt="" src={imgBgLeft} className="absolute left-0 bottom-0 w-[728px] h-[544px] object-cover object-left" />
          </div>
          <div aria-hidden="true" className="relative z-[2] shrink-0 w-[364px] h-[459px] pointer-events-none">
            <Img alt="" src={imgWoman} className="absolute inset-0 w-full h-full object-cover object-left-bottom" />
          </div>
          <div className="relative z-[2] flex-[1_0_0] min-w-0 flex flex-col gap-[30px] pb-[30px] pt-[20px]">
            <Badge />
            <h2 className="font-avenir-black text-[42px] leading-[48px] text-[#2a2a2b] w-full">{t.h1a}<br />{t.h1b}</h2>
            <p className="font-avenir-roman text-[16px] leading-[22px] text-[#333] w-full">{t.sub}</p>
          </div>
        </div>

        {/* Box 2 — cards + buttons + composite */}
        <div className="relative bg-[#edf5fa] rounded-[16px] overflow-hidden flex items-center min-h-[471px] isolate px-[20px]">
          {/* composite behind */}
          <div aria-hidden="true" className="absolute pointer-events-none z-[1] overflow-hidden rounded-[16px]"
               style={{ top: "calc(50% + 42.5px)", right: "-171px", transform: "translateY(-50%)", width: "981px", height: "560px" }}>
            <Img alt="" src={imgGroupRight} className="absolute inset-0 w-full h-full object-cover" />
          </div>
          {/* left content */}
          <div className="relative z-[3] flex-[1_0_0] min-w-0 flex flex-col gap-[20px] py-[30px]">
            <div className="grid grid-cols-2 gap-[10px]">
              {CARD_ICONS.map((icon, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.7)] border border-white flex flex-col gap-[10px] items-center justify-center px-[10px] py-[16px] rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
                  <FigmaIcon src={icon} size={36} />
                  <p className="font-avenir-heavy text-[14px] leading-[17px] text-[#333] text-center w-full">{t.cards[i]}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-[20px] w-full">
              <div className="flex flex-wrap gap-[20px] items-stretch">
                <a href="/buy/checkin-neo-up?modelo=neo-up&pagamento=compra"
                   className="flex flex-[1_0_0] gap-[8px] items-center justify-center min-h-[42px] min-w-[175px] overflow-hidden px-[12px] py-[10px] rounded-[8px] transition-opacity hover:opacity-90 active:opacity-80"
                   style={gdBlue}>
                  <FigmaIcon src={imgCart} size={20} />
                  <span className="font-avenir-roman text-[15px] leading-[19px] text-white whitespace-nowrap">
                    {s2.buy} <span className="font-avenir-heavy">US$ {NEO_UP.sales}</span>
                  </span>
                </a>
                <a href="/buy/checkin-neo-up?modelo=neo-up&pagamento=locacao"
                   className="group flex flex-[1_0_0] gap-[8px] items-center justify-center min-h-[42px] min-w-[175px] overflow-hidden px-[12px] py-[10px] rounded-[8px] border border-[#0233c3] bg-white transition-colors hover:bg-[#0233c3] active:bg-[#002ba8]">
                  <div className="transition-[filter] group-hover:[filter:brightness(0)_invert(1)]">
                    <FigmaIcon src={imgCalendar} size={20} />
                  </div>
                  <span className="font-avenir-roman text-[15px] leading-[19px] text-[#0233c3] group-hover:text-white transition-colors whitespace-nowrap">
                    {s2.lease} <span className="font-avenir-heavy">US$ {NEO_UP.lease}{s2.perMonth}</span>
                  </span>
                </a>
              </div>
              <Link href="/neo-line"
                    className="flex gap-[8px] items-center justify-center min-h-[56px] overflow-hidden px-[12px] py-[10px] rounded-[8px] w-full transition-opacity hover:opacity-90 active:opacity-80"
                    style={gdPurple}>
                <span className="font-avenir-roman text-[15px] leading-[19px] text-white flex-1 text-center">
                  {t.moreA}<span className="font-avenir-heavy">{t.moreB}</span>{t.moreC}
                </span>
                <FigmaIcon src={imgArrow} size={16} />
              </Link>
            </div>
          </div>
          {/* spacer reserves space for composite */}
          <div aria-hidden="true" className="relative z-[2] h-[325px] w-[630px] shrink-0" />
        </div>
      </div>


      {/* ══════════════════════════════════════════════════════════
          WIN-1190+  (≥1190px) — single container, 2-col grid
          Cards: flex-row (1190–1279) → flex-col (1280+)
      ══════════════════════════════════════════════════════════ */}
      <div className="hidden win-1190:grid grid-cols-[364px_minmax(0,1fr)] relative w-full max-w-[1400px] rounded-[16px] overflow-hidden bg-[#f3f8ff] min-h-[500px]">

        {/* absolute backgrounds */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <Img alt="" src={imgBgLeft}
               className="absolute left-0 bottom-0 w-[728px] h-[544px] object-cover object-left" />
          <Img alt="" src={imgGroupRight}
               className="absolute top-1/2 -translate-y-1/2 object-cover
                          right-[-272px] w-[981px] h-[560px]
                          win-1280:right-[-228px] win-1280:w-[893px] win-1280:h-[510px]"
               style={{ WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 25%)", maskImage: "linear-gradient(to right, transparent 0%, black 25%)" }} />
        </div>

        {/* woman — left col, rows 1–2, anchored to bottom */}
        <div aria-hidden="true"
             className="col-start-1 row-start-1 row-span-2 self-end relative z-10 h-[459px] pointer-events-none">
          <Img alt="" src={imgWoman}
               className="absolute inset-0 w-full h-full object-cover object-left-bottom" />
        </div>

        {/* text — right col row 1 */}
        <div className="col-start-2 row-start-1 relative z-10 flex flex-col gap-[15px]
                        pt-[30px] pb-[15px] win-1280:pr-[500px]">
          <Badge />
          <h2 className="font-avenir-black text-[42px] leading-[48px] text-[#2a2a2b] w-full">
            {t.h1a}<br />{t.h1b}
          </h2>
          <p className="font-avenir-roman text-[16px] leading-[22px] text-[#333] w-full">{t.sub}</p>
        </div>

        {/* cards + buttons — right col row 2 */}
        <div className="col-start-2 row-start-2 relative z-10 flex flex-col gap-[15px]
                        pb-[30px] win-1280:pr-[500px]">

          {/* cards: flex-row at win-1190, flex-col at win-1280 */}
          <div className="flex gap-[10px] items-stretch w-full">
            {CARD_ICONS.map((icon, i) => (
              <div key={i} className="bg-[rgba(255,255,255,0.7)] border border-white flex flex-[1_0_0] gap-[10px] items-center justify-start
                                      flex-row win-1280:flex-col win-1280:justify-center
                                      min-w-0 px-[10px] py-[16px] rounded-[12px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
                <FigmaIcon src={icon} size={36} />
                <p className="font-avenir-heavy text-[14px] leading-[1.2] text-[#333]
                              win-1280:leading-[17px] win-1280:text-center win-1280:w-full win-1280:min-h-[34px] win-1280:flex win-1280:items-center win-1280:justify-center">
                  {t.cards[i]}
                </p>
              </div>
            ))}
          </div>

          {/* buttons */}
          <div className="flex gap-[8px] items-stretch w-full">
            <a href="/buy/checkin-neo-up?modelo=neo-up&pagamento=compra"
               className="flex shrink-0 gap-[8px] items-center justify-center min-h-[56px] overflow-hidden px-[12px] py-[10px] rounded-[8px] transition-opacity hover:opacity-90 active:opacity-80"
               style={gdBlue}>
              <FigmaIcon src={imgCart} size={20} />
              <span className="font-avenir-roman text-[15px] leading-[19px] text-white whitespace-nowrap">
                {s2.buy} <span className="font-avenir-heavy">US$ {NEO_UP.sales}</span>
              </span>
            </a>
            <a href="/buy/checkin-neo-up?modelo=neo-up&pagamento=locacao"
               className="group flex shrink-0 gap-[8px] items-center justify-center min-h-[56px] overflow-hidden px-[12px] py-[10px] rounded-[8px] border border-[#0233c3] bg-white transition-colors hover:bg-[#0233c3] active:bg-[#002ba8]">
              <div className="transition-[filter] group-hover:[filter:brightness(0)_invert(1)]">
                <FigmaIcon src={imgCalendar} size={20} />
              </div>
              <span className="font-avenir-roman text-[15px] leading-[19px] text-[#0233c3] group-hover:text-white transition-colors whitespace-nowrap">
                {s2.lease} <span className="font-avenir-heavy">US$ {NEO_UP.lease}{s2.perMonth}</span>
              </span>
            </a>
            {/* Conheça: flex-1 at win-1190, shrink-0 at win-1280 */}
            <Link href="/neo-line"
                  className="flex flex-[1_0_0] win-1280:flex-none win-1280:shrink-0 gap-[8px] items-center justify-center min-h-[56px] min-w-0 overflow-hidden px-[12px] py-[10px] rounded-[8px] transition-opacity hover:opacity-90 active:opacity-80"
                  style={gdPurple}>
              <span className="font-avenir-roman text-[15px] leading-[19px] text-white text-center whitespace-nowrap">
                {t.moreA}<span className="font-avenir-heavy">{t.moreB}</span>{t.moreC}
              </span>
              <FigmaIcon src={imgArrow} size={16} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
