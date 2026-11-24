"use client";
import type { ReactNode } from "react";
import FigmaIcon from "../FigmaIcon";
import { NEO_UP, type S2Text } from "@/lib/waas-copy";

const imgCartWhite = "/figma-assets/icon-vendas-b.svg";
const imgCalendar  = "/figma-assets/icon-calendar-a.svg";
const gdBase = { backgroundImage: "linear-gradient(104deg, #0233c3 6.19%, #9f3df5 93.35%)" };

/** Compra / Lease buttons of the Neo UP WaaS offer (prices come from PRODUCT_PRICING_USD). */
export default function WaasBuyButtons({ s, className, children, compact = false }: { s: S2Text; className: string; children?: ReactNode; compact?: boolean }) {
  const base = compact
    ? "flex flex-[0_0_auto] gap-[8px] items-center justify-center min-h-[56px] overflow-hidden px-[12px] py-[10px] rounded-[8px] cursor-pointer"
    : "flex flex-[1_0_auto] gap-[10px] items-center justify-center min-h-[56px] min-w-max overflow-hidden px-[20px] py-[10px] rounded-[8px] cursor-pointer";
  const txt = compact ? "text-f15 leading-l19" : "text-f18 leading-l22";
  const icon = compact ? 20 : 24;
  return (
    <div className={className}>
      <a href="/buy/checkin-neo-up?modelo=neo-up&pagamento=compra" className={`${base} transition-opacity hover:opacity-90 active:opacity-80`} style={gdBase}>
        <FigmaIcon src={imgCartWhite} size={icon} />
        <span className={`font-avenir-roman ${txt} text-white whitespace-nowrap`}>
          {s.buy} <span className="font-avenir-heavy">US$ {NEO_UP.sales}</span>
        </span>
      </a>
      <a href="/buy/checkin-neo-up?modelo=neo-up&pagamento=locacao" className={`group ${base} bg-white border border-[#0233c3] hover:bg-[#0233c3] active:bg-[#002ba8] transition-colors`}>
        <div className="transition-[filter] group-hover:[filter:brightness(0)_invert(1)]">
          <FigmaIcon src={imgCalendar} size={icon} />
        </div>
        <span className={`font-avenir-roman ${txt} text-[#0233c3] group-hover:text-white transition-colors whitespace-nowrap`}>
          {s.lease} <span className="font-avenir-heavy">US$ {NEO_UP.lease}{s.perMonth}</span>
        </span>
      </a>
      {children}
    </div>
  );
}

