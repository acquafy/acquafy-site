"use client";
import { useEffect, useId, useRef, useState } from "react";
import { useLang, type Lang } from "@/context/LanguageContext";
import { companyAddress, companyMapsUrl } from "@/lib/company";

// Legal name and address are not translated; only the UI labels are.
const L: Record<Lang, { label: string; copy: string; copied: string; map: string }> = {
  pt: { label: "Sede", copy: "Copiar endereço", copied: "Endereço copiado", map: "Ver no mapa" },
  "pt-pt": { label: "Sede", copy: "Copiar morada", copied: "Morada copiada", map: "Ver no mapa" },
  en: { label: "Headquarters", copy: "Copy address", copied: "Address copied", map: "Find on map" },
  "en-gb": { label: "Headquarters", copy: "Copy address", copied: "Address copied", map: "Find on map" },
  es: { label: "Sede", copy: "Copiar dirección", copied: "Dirección copiada", map: "Ver en el mapa" },
  fr: { label: "Siège social", copy: "Copier l'adresse", copied: "Adresse copiée", map: "Voir sur la carte" },
  de: { label: "Hauptsitz", copy: "Adresse kopieren", copied: "Adresse kopiert", map: "Auf der Karte ansehen" },
  it: { label: "Sede", copy: "Copia indirizzo", copied: "Indirizzo copiato", map: "Vedi sulla mappa" },
  zh: { label: "总部", copy: "复制地址", copied: "地址已复制", map: "在地图上查看" },
  ja: { label: "本社", copy: "住所をコピー", copied: "住所をコピーしました", map: "地図で見る" },
  ko: { label: "본사", copy: "주소 복사", copied: "주소가 복사되었습니다", map: "지도에서 보기" },
  sv: { label: "Huvudkontor", copy: "Kopiera adress", copied: "Adressen kopierad", map: "Visa på kartan" },
  fi: { label: "Pääkonttori", copy: "Kopioi osoite", copied: "Osoite kopioitu", map: "Näytä kartalla" },
  ru: { label: "Головной офис", copy: "Копировать адрес", copied: "Адрес скопирован", map: "Показать на карте" },
  ro: { label: "Sediu central", copy: "Copiază adresa", copied: "Adresa a fost copiată", map: "Vezi pe hartă" },
  he: { label: "מטה החברה", copy: "העתקת כתובת", copied: "הכתובת הועתקה", map: "הצגה במפה" },
};

const ICON = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

// Button in the page banner (it takes the place of the first call to action: same size and color) that opens a small
// popover with the legal name, address, a "copy address" action and a "find on map" link.
export default function AddressPopover({ stretch = false }: { stretch?: boolean }) {
  const { lang } = useLang();
  const t = L[lang];
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const triggerLabel = `${t.label}: Orlando, FL`;

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(`${companyAddress.legalName}, ${companyAddress.line}`);
      setCopied(true);
    } catch {
      /* clipboard unavailable */
    }
  }

  const action =
    "flex items-center gap-[6px] rounded-[8px] bg-[#f6f9fe] px-[12px] py-[8px] font-avenir-heavy text-[14px] leading-[16px] text-[#1f2e91] hover:bg-[#e6eefc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0569ff]";

  return (
    <div ref={rootRef} className={`relative z-20 flex min-h-[50px] min-w-[190px] flex-col ${stretch ? "flex-[1_0_0]" : "shrink-0"}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-[10px] overflow-hidden rounded-[8px] bg-[#0233c3] px-[20px] py-[10px] text-center font-avenir-heavy text-[16px] leading-normal text-white transition-colors hover:bg-[#002ba8] active:bg-[#005ae0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0569ff]">
        <svg {...ICON} width={20} height={20} viewBox="0 0 24 24" className="shrink-0 text-white">
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className="flex-1 text-center">{triggerLabel}</span>
        <svg {...ICON} width={16} height={16} viewBox="0 0 24 24" className={`shrink-0 text-white transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        id={panelId}
        role="group"
        aria-label={t.label}
        hidden={!open}
        className="absolute left-1/2 top-full z-20 mt-[12px] flex w-[min(320px,calc(100vw-40px))] -translate-x-1/2 flex-col gap-[12px] rounded-[16px] border border-solid border-[#cbd0d4] bg-white p-[16px] text-left shadow-lg lg:left-0 lg:translate-x-0"
      >
        <address className="flex flex-col gap-[4px] not-italic">
          <strong className="font-avenir-heavy text-[14px] leading-[18px] text-[#1f2e91]">{companyAddress.legalName}</strong>
          <span className="font-avenir-roman text-[14px] leading-[20px] text-[#333]">{companyAddress.line}</span>
        </address>
        <div className="flex flex-wrap gap-[8px]">
          <button type="button" onClick={copyAddress} className={action}>
            <svg {...ICON} width={16} height={16} viewBox="0 0 24 24">
              {copied ? (
                <path d="M20 6 9 17l-5-5" />
              ) : (
                <>
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </>
              )}
            </svg>
            <span aria-live="polite">{copied ? t.copied : t.copy}</span>
          </button>
          <a href={companyMapsUrl} target="_blank" rel="noopener noreferrer" className={action}>
            <svg {...ICON} width={16} height={16} viewBox="0 0 24 24">
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
            {t.map}
          </a>
        </div>
      </div>
    </div>
  );
}
