"use client";

import { useRef, useState, useCallback } from "react";
import type { CheckinFamily } from "@/lib/checkin-products";
import { formatBRL } from "@/lib/products";
import FigmaIcon from "@/components/FigmaIcon";

type Props = { family: CheckinFamily };

/* ── Spec data per variant ─────────────────────────────────────────────────── */
type VSpec = {
  formato: string; funcoes: string; temperaturas: string;
  gas: boolean; h2: boolean;
  painel: string; app: boolean; iot: boolean; wifi: boolean; uv: boolean;
  filtragem: string; tanque: string; material: string;
};

const SPECS: Record<string, VSpec> = {
  "neo-up":                { formato: "Bancada ou Parede", funcoes: "—",      temperaturas: "Natural",                  gas: false, h2: false, painel: "—",                  app: false, iot: false, wifi: false, uv: false, filtragem: "4 Filtros UF de Alta Performance", tanque: "—",      material: "Acabamento premium" },
  "neo-fit":               { formato: "Bancada ou Parede", funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "400ml",  material: "Acabamento premium" },
  "neo-smart-h2":          { formato: "Bancada",           funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: true,  painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "800ml",  material: "Acabamento premium" },
  "neo-touch":             { formato: "Bancada",           funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "800ml",  material: "Acabamento premium" },
  "neo-plus":              { formato: "Bancada",           funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "1500ml", material: "Acabamento premium" },
  "neo-ultra":             { formato: "Bancada",           funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "3000ml", material: "Acabamento premium" },
  "neo-ultra-spark":       { formato: "Bancada",           funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: false, painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "3000ml", material: "Aço inox" },
  "neo-ultra-spark-h2":    { formato: "Bancada",           funcoes: "8 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: true,  painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "3000ml", material: "Aço inox" },
  "neo-max":               { formato: "Coluna",            funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "3000ml", material: "Aço inox" },
  "neo-max-spark":         { formato: "Coluna",            funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: false, painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "3000ml", material: "Aço inox" },
  "neo-max-spark-h2":      { formato: "Coluna",            funcoes: "8 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: true,  painel: "LED Touch 10.1\"",    app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros UF de Alta Performance", tanque: "3000ml", material: "Aço inox" },
  "neo-infinity":          { formato: "Bancada",           funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "neo-infinity-spark":    { formato: "Bancada",           funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: false, painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "neo-infinity-spark-h2": { formato: "Bancada",           funcoes: "8 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: true,  painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "neo-prestige":          { formato: "Embutido",          funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "neo-prestige-spark":    { formato: "Embutido",          funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: false, painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "neo-prestige-spark-h2": { formato: "Embutido",          funcoes: "8 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: true,  painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "neo-prime":             { formato: "Bancada",           funcoes: "6 em 1", temperaturas: "Natural, Gelada e Quente", gas: false, h2: false, painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "neo-prime-spark":       { formato: "Bancada",           funcoes: "7 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: false, painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
  "neo-prime-spark-h2":    { formato: "Bancada",           funcoes: "8 em 1", temperaturas: "Natural, Gelada e Quente", gas: true,  h2: true,  painel: "LCD IPS Touch 15.6\"", app: true,  iot: true,  wifi: true,  uv: true,  filtragem: "4 Filtros RO / Osmose Reversa",   tanque: "3000ml", material: "Aço inox" },
};

const imgCheck    = "/figma-assets/icon-check-a.svg";
const imgNegative = "/figma-assets/icon-negative.svg";

/* ── Essentials color options (5 colors, same for all Essentials families) ── */
const ESSENTIALS_COLORS = [
  { gradient: "linear-gradient(133deg, #fcfcfb 8%, #dfe0db 89%)", name: "Pearl White"  },
  { gradient: "linear-gradient(180deg, #626970, #2a3035)",         name: "Dark Gray"    },
  { gradient: "linear-gradient(133deg, #cddedf 8%, #969ea3 89%)", name: "Silver Gray"  },
  { gradient: "linear-gradient(133deg, #e7eff5 8%, #aec0cd 89%)", name: "Slate Blue"   },
  { gradient: "linear-gradient(133deg, #ffffff 8%, #bac1c8 89%)", name: "Silver"       },
];

/* ── Filter data ───────────────────────────────────────────────────────────── */
type FilterInfo = { title: string; desc: string };
type FilterSet  = {
  label: string;
  description: string;
  bullets: { bold: string; text: string }[];
  filters: FilterInfo[];
  props: { prop: string; result: string }[];
};

const FILTER_BULLETS = [
  { bold: "Segurança Total:",       text: " Remoção de patógenos, metais e excesso de minerais inorgânicos (calcário)." },
  { bold: "Equilíbrio Metabólico:", text: " pH alcalino adaptado à fonte de entrada." },
  { bold: "Poder Antioxidante:",    text: " Água ionizada que auxilia na regeneração celular." },
];

const FILTER_PROPS = [
  { prop: "Purificação",     result: "20 Estágios: Retenção de vírus, bactérias e toxinas." },
  { prop: "Alcalinidade",    result: "pH > 9: Auxilia no equilíbrio ácido-base do corpo." },
  { prop: "Mineralização",   result: "Ca, Mg e K: Reposição de eletrólitos essenciais." },
  { prop: "Potencial Redox", result: "-100 a -200 mV: Ação antioxidante direta." },
];

const FILTER_SET_ESSENTIALS: FilterSet = {
  label: "4 Filtros UF de Alta Performance",
  description: "Com 4 elementos filtrantes e 20 estágios de purificação, este sistema elimina contaminantes críticos como bactérias, vírus, cloro, metais pesados e calcário.",
  bullets: FILTER_BULLETS,
  filters: [
    { title: "PPF — Polipropileno", desc: "Remove iodo, sujeira, ferrugem, filtra impurezas, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água de torneira." },
    { title: "ACF — Carvão Ativado Anti-Escala", desc: "Remove o cloro, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água de torneira." },
    { title: "UFF — Ultrafiltração", desc: "Com microporos de ultraprecisão, remove organismos, substâncias macromoleculares, verme vermelho, vírus e bactérias." },
    { title: "AAF — Alcalino Antioxidante", desc: "Ajusta a faixa de pH da água, torna a água filtrada alcalina com pH acima de 9, antioxidante e rica em hidrogênio." },
  ],
  props: FILTER_PROPS,
};

const FILTER_SET_PREMIUM: FilterSet = {
  label: "4 Filtros RO / Osmose Reversa",
  description: "Com Osmose Reversa de precisão e 4 elementos filtrantes, este sistema produz água com 99% de pureza, eliminando vírus, bactérias, cloro, metais pesados e compostos residuais.",
  bullets: FILTER_BULLETS,
  filters: [
    { title: "PPF — Polipropileno", desc: "Remove iodo, sujeira, ferrugem, filtra impurezas, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água de torneira." },
    { title: "ACF — Carvão Ativado Anti-Escala", desc: "Remove o cloro, compostos químicos, partículas suspensas, odores e sabores normalmente presentes na água de torneira." },
    { title: "ROF — Osmose Reversa", desc: "Sistema que produz água com 99% de pureza (livre de vírus e bactérias com até 0,5 microns), desenvolvido para atender pessoas que queiram ou necessitem do consumo de uma água extremamente pura." },
    { title: "AAF — Alcalino Antioxidante", desc: "Ajusta a faixa de pH da água, torna a água filtrada alcalina com pH acima de 9, antioxidante e rica em hidrogênio." },
  ],
  props: FILTER_PROPS,
};

/* ── Bool cell ─────────────────────────────────────────────────────────────── */
function BoolCell({ value }: { value: boolean }) {
  if (value) return <FigmaIcon src={imgCheck} size={24} />;
  return <FigmaIcon src={imgNegative} size={24} />;
}

/* ── Table row ─────────────────────────────────────────────────────────────── */
function SpecRow({ label, value, isBool, isPremium }: { label: string; value: string | boolean; isBool?: boolean; isPremium: boolean }) {
  return (
    <div className="flex items-stretch border-b border-[#e8ecf4] last:border-b-0">
      <div className="w-[180px] xl:w-[200px] shrink-0 border-r border-[#e8ecf4] px-[14px] py-[12px] flex items-center">
        <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91]">{label}</span>
      </div>
      <div className="flex-1 px-[14px] py-[12px] flex items-center">
        {isBool ? (
          <BoolCell value={value as boolean} />
        ) : (
          <span className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#374151]">{value as string}</span>
        )}
      </div>
    </div>
  );
}

/* ── Separator ─────────────────────────────────────────────────────────────── */
function Sep() {
  return <div className="w-full h-px bg-[#e8ecf4] shrink-0" />;
}

/* ── Section title ─────────────────────────────────────────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] text-[#1f2e91] text-center w-full">
      {children}
    </p>
  );
}

export default function CheckinProduct({ family }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [payTab, setPayTab] = useState<"dinheiro" | "financiar">("dinheiro");
  const [fichaTecnicaOpen, setFichaTecnicaOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const activeVariant = family.variants[activeVariantIdx];
  const specs = SPECS[activeVariant.id] ?? SPECS["neo-fit"]!;
  const accent = family.isPremium ? "#9f3df5" : "#0233c3";
  const accentGrad = family.isPremium
    ? "linear-gradient(135deg, #0233c3, #9f3df5)"
    : "linear-gradient(135deg, #0233c3, #0569ff)";

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || family.scenes.length === 0) return;
    const { scrollTop } = scrollRef.current;
    let idx = 0;
    for (let i = 0; i < family.scenes.length; i++) {
      if (scrollTop >= family.scenes[i].minScroll) idx = i;
    }
    setActiveSceneIdx(idx);
  }, [family.scenes]);

  const leftImg =
    family.scenes.length > 0
      ? family.scenes[activeSceneIdx].img
      : activeVariant.img;

  const monthlyPrice = (price: number) => Math.ceil(price / 12);

  return (
    <div className="flex w-full h-[calc(100vh-80px)] overflow-hidden">

      {/* ── LEFT: Sticky image + color selector ──────────────────────────── */}
      <div className="flex-1 bg-[#f6f9fe] flex flex-col overflow-hidden">

        {/* Image area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
          <a href="/checkin"
            className="absolute top-[20px] left-[20px] z-10 size-[40px] rounded-full bg-white border border-[#e8ecf4] flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
            aria-label="Voltar"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="#1f2e91" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          {family.scenes.length > 0 ? (
            family.scenes.map((scene, i) => (
              <img key={i} src={scene.img} alt=""
                className={`absolute inset-0 w-full h-full object-contain p-[60px] transition-opacity duration-500 ${i === activeSceneIdx ? "opacity-100" : "opacity-0"}`}
              />
            ))
          ) : (
            <img key={activeVariant.id} src={leftImg} alt={activeVariant.name}
              className="w-full h-full object-contain p-[60px]"
            />
          )}
          {/* Color indicator dot */}
          {!family.isPremium && (
            <div
              className="absolute bottom-[20px] right-[20px] size-[28px] rounded-full border-[2.5px] border-white shadow-md transition-all duration-300"
              style={{ background: ESSENTIALS_COLORS[activeColorIdx].gradient }}
            />
          )}
        </div>

        {/* Color selector — Essentials only */}
        {!family.isPremium && (
          <div className="flex-shrink-0 border-t border-[#e8ecf4] bg-white py-[14px] px-[24px] flex flex-col items-center gap-[8px]">
            <div className="flex items-center gap-[6px]">
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#9ca3af]">Cor</p>
              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#1f2e91]">
                {ESSENTIALS_COLORS[activeColorIdx].name}
              </p>
            </div>
            <div className="flex gap-[6px] items-center justify-center">
              {ESSENTIALS_COLORS.map((color, i) => {
                const isActive = i === activeColorIdx;
                return (
                  <button key={i} onClick={() => setActiveColorIdx(i)}
                    title={color.name}
                    className="size-[40px] rounded-full flex items-center justify-center transition-all shrink-0"
                    style={{
                      border: isActive ? `2px solid ${accent}` : "2px solid transparent",
                      padding: "3px",
                    }}>
                    <div className="size-full rounded-full" style={{ background: color.gradient }} />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT: Scrollable panel ──────────────────────────────────────── */}
      <div className="w-[480px] xl:w-[520px] flex flex-col border-l border-[#e8ecf4] bg-white">

        <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto">
          <div className="px-[32px] pt-[36px] pb-[8px] flex flex-col gap-[28px]">

            {/* ── Header ──────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-[4px]">
              <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[1.1]"
                style={{ background: accentGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {family.title}
              </h1>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[15px] text-[#6b7280]">
                {family.subtitle}
              </p>
            </div>

            {/* ── Payment tabs ────────────────────────────────────────────── */}
            <div className="border-b border-[#e8ecf4] flex">
              {(["dinheiro", "financiar"] as const).map((tab) => {
                const isActive = payTab === tab;
                return (
                  <button key={tab} onClick={() => setPayTab(tab)}
                    className="flex-1 pb-[12px] pt-[4px] font-['Avenir_LT_Pro:85_Heavy'] text-[13px] transition-colors relative"
                    style={{ color: isActive ? accent : "#aab2bc" }}
                  >
                    {tab === "dinheiro" ? "Dinheiro" : "Financiar"}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                        style={{ background: accentGrad }} />
                    )}
                  </button>
                );
              })}
              {/* ALUGAR — standby */}
              <div className="flex-1 pb-[12px] pt-[4px] flex items-center justify-center">
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#d1d5db]">
                  Alugar
                </span>
              </div>
            </div>

            {/* ── Variant selector ────────────────────────────────────────── */}
            <div className="flex flex-col gap-[8px]">
              {family.variants.map((variant, i) => {
                const isActive = i === activeVariantIdx;
                const displayPrice = payTab === "financiar"
                  ? `${formatBRL(monthlyPrice(variant.price))}/mês`
                  : formatBRL(variant.price);
                return (
                  <button key={variant.id} onClick={() => setActiveVariantIdx(i)}
                    className="flex items-center justify-between gap-[10px] px-[14px] py-[12px] rounded-[12px] text-left transition-all"
                    style={{
                      background: isActive ? (family.isPremium ? "#f5eeff" : "#eef2ff") : "#f6f9fe",
                      border: `1.5px solid ${isActive ? accent : "transparent"}`,
                    }}
                  >
                    <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
                      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px]"
                        style={{ color: isActive ? accent : "#1f2e91" }}>
                        {variant.name}
                      </span>
                      <span className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#9ca3af]">
                        {variant.subLabel}
                      </span>
                    </div>
                    <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] shrink-0 text-right"
                      style={{ color: isActive ? accent : "#9ca3af" }}>
                      {displayPrice}
                    </span>
                  </button>
                );
              })}
              {/* Financing note */}
              {payTab === "financiar" && (
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#9ca3af] px-[2px]">
                  12× sem juros. Consulte condições no momento da compra.
                </p>
              )}
            </div>

            {/* ── Ficha Técnica ────────────────────────────────────────────── */}
            <div className="border border-[#e8ecf4] rounded-[16px] overflow-hidden">
              {/* Header */}
              <div className="px-[14px] py-[12px] border-b border-[#e8ecf4]"
                style={{ background: "linear-gradient(135deg, #f6f9fe, #eef2ff)" }}>
                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-[#1f2e91] text-center uppercase tracking-[0.06em]">
                  Ficha Técnica
                </p>
              </div>
              {/* Always visible — 5 rows */}
              <SpecRow label="Formato"          value={specs.formato}      isPremium={family.isPremium} />
              <SpecRow label="Funções"           value={specs.funcoes}      isPremium={family.isPremium} />
              <SpecRow label="Temperaturas"      value={specs.temperaturas} isPremium={family.isPremium} />
              <SpecRow label="Água com Gás"      value={specs.gas}   isBool isPremium={family.isPremium} />
              <SpecRow label="Água Hidrogenada"  value={specs.h2}    isBool isPremium={family.isPremium} />
              {/* Collapsible rows */}
              {fichaTecnicaOpen && (
                <>
                  <SpecRow label="Painel"                  value={specs.painel}    isPremium={family.isPremium} />
                  <SpecRow label="App"                     value={specs.app}  isBool isPremium={family.isPremium} />
                  <SpecRow label="AI + IoT"                value={specs.iot}  isBool isPremium={family.isPremium} />
                  <SpecRow label="Wi-Fi + Bluetooth 5.3"   value={specs.wifi} isBool isPremium={family.isPremium} />
                  <SpecRow label="UV LED"                  value={specs.uv}   isBool isPremium={family.isPremium} />
                  <SpecRow label="Sistema de Filtragem"    value={specs.filtragem} isPremium={family.isPremium} />
                  <SpecRow label="Tanque"                  value={specs.tanque}    isPremium={family.isPremium} />
                  <SpecRow label="Material"                value={specs.material}  isPremium={family.isPremium} />
                </>
              )}
              {/* Toggle */}
              <button onClick={() => setFichaTecnicaOpen((v) => !v)}
                className="w-full flex items-center justify-between px-[14px] py-[14px] border-t border-[#e8ecf4] bg-[#f6f9fe] hover:bg-[#eef2ff] transition-colors">
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px]" style={{ color: accent }}>
                  {fichaTecnicaOpen ? "Ocultar funcionalidades" : "Demais funcionalidades"}
                </span>
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none"
                  className={`transition-transform duration-200 ${fichaTecnicaOpen ? "rotate-180" : ""}`}>
                  <path d="M1 1L7 7L13 1" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <Sep />

            {/* ── Filtros de Alta Performance ──────────────────────────────── */}
            {(() => {
              const fs = family.isPremium ? FILTER_SET_PREMIUM : FILTER_SET_ESSENTIALS;
              return (
                <div className="flex flex-col gap-[14px]">
                  <SectionTitle>Filtros de Alta Performance</SectionTitle>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#374151] leading-[20px] text-center">
                    {fs.description}
                  </p>
                  <ul className="flex flex-col gap-[6px] pl-[4px]">
                    {fs.bullets.map((b, i) => (
                      <li key={i} className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#6b7280] leading-[18px] flex gap-[6px]">
                        <span className="shrink-0 mt-[3px] size-[5px] rounded-full bg-[#9ca3af] inline-block" />
                        <span>
                          <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[#1f2e91]">{b.bold}</span>
                          {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {/* Tabela de Benefícios toggle */}
                  <div className="border border-[#e8ecf4] rounded-[16px] overflow-hidden">
                    <button onClick={() => setFilterOpen((v) => !v)}
                      className="w-full flex items-center justify-between px-[14px] py-[14px] bg-[#f6f9fe] hover:bg-[#eef2ff] transition-colors">
                      <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91]">
                        Tabela de Benefícios
                      </span>
                      <svg width="14" height="8" viewBox="0 0 14 8" fill="none"
                        className={`transition-transform duration-200 shrink-0 ${filterOpen ? "rotate-180" : ""}`}>
                        <path d="M1 1L7 7L13 1" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {filterOpen && (
                      <>
                        {fs.filters.map((f, i) => (
                          <div key={i} className="flex flex-col gap-[6px] px-[14px] py-[14px] border-t border-[#e8ecf4] bg-white">
                            <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91]">{f.title}</p>
                            <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#6b7280] leading-[18px]">{f.desc}</p>
                          </div>
                        ))}
                        <div className="border-t border-[#e8ecf4]">
                          <div className="flex border-b border-[#e8ecf4]"
                            style={{ background: "linear-gradient(135deg, #f6f9fe, #eef2ff)" }}>
                            <div className="w-[140px] shrink-0 px-[14px] py-[10px] border-r border-[#e8ecf4]">
                              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#1f2e91]">Propriedade</p>
                            </div>
                            <div className="flex-1 px-[14px] py-[10px]">
                              <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#1f2e91]">Resultado</p>
                            </div>
                          </div>
                          {fs.props.map((row, i) => (
                            <div key={i} className="flex border-b border-[#e8ecf4] last:border-b-0">
                              <div className="w-[140px] shrink-0 px-[14px] py-[10px] border-r border-[#e8ecf4] flex items-center">
                                <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#374151]">{row.prop}</p>
                              </div>
                              <div className="flex-1 px-[14px] py-[10px] flex items-center">
                                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#6b7280] leading-[18px]">{row.result}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })()}

            <Sep />

            {/* ── Garantias ───────────────────────────────────────────────── */}
            <div className="flex flex-col gap-[16px]">
              <SectionTitle>Garantias</SectionTitle>
              <div className="border border-[#e8ecf4] rounded-[16px] overflow-hidden">
                <div className="flex gap-[12px] items-start p-[16px] border-b border-[#e8ecf4]">
                  <div className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center shrink-0"
                    style={{ background: accentGrad }}>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                      <path d="M9 1L1 4.5V9.5C1 14.1 4.5 18.3 9 19.5C13.5 18.3 17 14.1 17 9.5V4.5L9 1Z"
                        stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91]">
                      Garantia do Purificador
                    </p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#6b7280] leading-[18px]">
                      1 ano de garantia de fábrica contra defeitos de fabricação. Suporte técnico especializado incluso.
                    </p>
                  </div>
                </div>
                <div className="flex gap-[12px] items-start p-[16px]">
                  <div className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center shrink-0"
                    style={{ background: accentGrad }}>
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                      <path d="M10 1C10 1 3 5 3 10.5C3 14 6.1 17 10 17C13.9 17 17 14 17 10.5C17 5 10 1 10 1Z"
                        stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M7 10.5L9 12.5L13 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91]">
                      Vida útil dos Filtros
                    </p>
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#6b7280] leading-[18px]">
                      Filtros com duração de 12 meses ou conforme indicação do sistema de monitoramento do APP.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Sep />

            {/* ── CEP ─────────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-[16px]">
              <SectionTitle>Adicione seu CEP</SectionTitle>
              <div className="flex gap-[8px]">
                <input type="text" placeholder="00000-000" maxLength={9}
                  className="flex-1 h-[44px] px-[14px] rounded-[10px] bg-[#f6f9fe] font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#1f2e91] placeholder:text-[#aab2bc] outline-none border border-[#e8ecf4] focus:border-[#0233c3] transition-colors"
                />
                <button className="h-[44px] px-[20px] rounded-[10px] font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-white shrink-0 transition-opacity hover:opacity-90"
                  style={{ background: accentGrad }}>
                  Calcular
                </button>
              </div>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#6b7280] text-center">
                Frete grátis para compras acima de R$ 500,00. Entrega em todo o Brasil.
              </p>
            </div>

            <Sep />

            {/* ── Form ────────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-[16px]">
              <SectionTitle>Detalhes de sua conta</SectionTitle>
              <div className="flex flex-col gap-[10px]">
                {[
                  { id: "nome",   label: "Nome Completo",              type: "text",  placeholder: "" },
                  { id: "email",  label: "Endereço de Email",          type: "email", placeholder: "" },
                  { id: "email2", label: "Confirme Endereço de Email", type: "email", placeholder: "" },
                  { id: "tel",    label: "Número de Telefone",         type: "tel",   placeholder: "(99) 99999-9999" },
                ].map((f) => (
                  <div key={f.id} className="flex flex-col gap-[6px]">
                    <label htmlFor={`checkin-${f.id}`}
                      className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#6b7280] uppercase tracking-[0.05em]">
                      {f.label}
                    </label>
                    <input id={`checkin-${f.id}`} type={f.type} placeholder={f.placeholder}
                      className="h-[44px] px-[14px] rounded-[10px] bg-[#f6f9fe] font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#1f2e91] placeholder:text-[#aab2bc] outline-none border border-[#e8ecf4] focus:border-[#0233c3] transition-colors"
                    />
                  </div>
                ))}
              </div>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#9ca3af] leading-[18px]">
                Ao prosseguir, autorizo a Acquafy a entrar em contato comigo sobre esta solicitação e a me enviar informações sobre produtos e serviços. Posso cancelar a qualquer momento.
              </p>
            </div>

            <div className="h-[12px]" />
          </div>
        </div>

        {/* ── Sticky bottom bar ──────────────────────────────────────────── */}
        <div className="flex-shrink-0 border-t border-[#e8ecf4] bg-white px-[24px] py-[16px] flex items-center gap-[12px]">
          <div className="flex-1 flex flex-col gap-[2px] min-w-0">
            <span
              className="font-['Avenir_LT_Pro:95_Black'] text-[26px] leading-none"
              style={{ background: accentGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              {payTab === "financiar"
                ? `${formatBRL(monthlyPrice(activeVariant.price))}/mês`
                : formatBRL(activeVariant.price)}
            </span>
            <span className="font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#9ca3af] truncate">
              {payTab === "financiar" ? "12× sem juros · " : ""}{activeVariant.name}
            </span>
          </div>
          <button
            className="h-[48px] px-[28px] rounded-[14px] font-['Avenir_LT_Pro:85_Heavy'] text-[14px] text-white shrink-0 transition-opacity hover:opacity-90"
            style={{ background: accentGrad }}
          >
            Encomendar
          </button>
        </div>
      </div>
    </div>
  );
}
