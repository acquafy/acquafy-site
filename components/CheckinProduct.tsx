"use client";

import { useRef, useState, useCallback, useEffect } from "react";
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
  { gradient: "linear-gradient(133deg, #fcfcfb 8%, #dfe0db 89%)", name: "Pearl White", img: "" },
  { gradient: "linear-gradient(180deg, #626970, #2a3035)",         name: "Dark Gray",   img: "" },
  { gradient: "linear-gradient(133deg, #cddedf 8%, #969ea3 89%)", name: "Silver Gray", img: "" },
  { gradient: "linear-gradient(133deg, #e7eff5 8%, #aec0cd 89%)", name: "Slate Blue",  img: "" },
  { gradient: "linear-gradient(133deg, #ffffff 8%, #bac1c8 89%)", name: "Silver",      img: "" },
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
        ) : value === "—" ? (
          <BoolCell value={false} />
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

const SECTION_LABELS: Record<string, string> = {
  produto:   "Produto",
  cores:     "Cores",
  filtros:   "Filtros",
  garantias: "Garantias",
  cep:       "Entrega",
  conta:     "Conta",
};

type PhoneCountry = { code: string; name: string; dial: string; flag: string; maxDigits: number; placeholder: string; fmt: (d: string) => string };

const fmtGen = (d: string): string =>
  d.length <= 3 ? d : d.length <= 7 ? `${d.slice(0,3)} ${d.slice(3)}` :
  d.length <= 10 ? `${d.slice(0,3)} ${d.slice(3,6)} ${d.slice(6)}` : `${d.slice(0,4)} ${d.slice(4,7)} ${d.slice(7)}`;

const PHONE_COUNTRIES: PhoneCountry[] = [
  { code: "BR", name: "Brasil",                    dial: "+55",   flag: "🇧🇷", maxDigits: 11, placeholder: "(99) 99999-9999",
    fmt: (d) => d.length<=2?d:d.length<=7?`(${d.slice(0,2)}) ${d.slice(2)}`:`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}` },
  { code: "AF", name: "Afeganistão",               dial: "+93",   flag: "🇦🇫", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "ZA", name: "África do Sul",             dial: "+27",   flag: "🇿🇦", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "AL", name: "Albânia",                   dial: "+355",  flag: "🇦🇱", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "DE", name: "Alemanha",                  dial: "+49",   flag: "🇩🇪", maxDigits: 11, placeholder: "999 9999 9999",  fmt: fmtGen },
  { code: "AD", name: "Andorra",                   dial: "+376",  flag: "🇦🇩", maxDigits: 6,  placeholder: "999 999",         fmt: fmtGen },
  { code: "AO", name: "Angola",                    dial: "+244",  flag: "🇦🇴", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "AI", name: "Anguila",                   dial: "+1264", flag: "🇦🇮", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "AG", name: "Antígua e Barbuda",         dial: "+1268", flag: "🇦🇬", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "SA", name: "Arábia Saudita",            dial: "+966",  flag: "🇸🇦", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "DZ", name: "Argélia",                   dial: "+213",  flag: "🇩🇿", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "AR", name: "Argentina",                 dial: "+54",   flag: "🇦🇷", maxDigits: 10, placeholder: "(11) 9999-9999",
    fmt: (d) => d.length<=2?d:d.length<=6?`(${d.slice(0,2)}) ${d.slice(2)}`:`(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}` },
  { code: "AM", name: "Armênia",                   dial: "+374",  flag: "🇦🇲", maxDigits: 8,  placeholder: "99 999 999",     fmt: fmtGen },
  { code: "AW", name: "Aruba",                     dial: "+297",  flag: "🇦🇼", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "AU", name: "Austrália",                 dial: "+61",   flag: "🇦🇺", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "AT", name: "Áustria",                   dial: "+43",   flag: "🇦🇹", maxDigits: 11, placeholder: "999 9999 9999",  fmt: fmtGen },
  { code: "AZ", name: "Azerbaijão",                dial: "+994",  flag: "🇦🇿", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "BS", name: "Bahamas",                   dial: "+1242", flag: "🇧🇸", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "BH", name: "Bahrein",                   dial: "+973",  flag: "🇧🇭", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "BD", name: "Bangladesh",                dial: "+880",  flag: "🇧🇩", maxDigits: 10, placeholder: "9999 999 999",   fmt: fmtGen },
  { code: "BB", name: "Barbados",                  dial: "+1246", flag: "🇧🇧", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "BE", name: "Bélgica",                   dial: "+32",   flag: "🇧🇪", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "BZ", name: "Belize",                    dial: "+501",  flag: "🇧🇿", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "BJ", name: "Benin",                     dial: "+229",  flag: "🇧🇯", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "BM", name: "Bermudas",                  dial: "+1441", flag: "🇧🇲", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "BY", name: "Bielorrússia",              dial: "+375",  flag: "🇧🇾", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "BO", name: "Bolívia",                   dial: "+591",  flag: "🇧🇴", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "BA", name: "Bósnia e Herzegovina",      dial: "+387",  flag: "🇧🇦", maxDigits: 8,  placeholder: "99 999 999",     fmt: fmtGen },
  { code: "BW", name: "Botswana",                  dial: "+267",  flag: "🇧🇼", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "BN", name: "Brunei",                    dial: "+673",  flag: "🇧🇳", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "BG", name: "Bulgária",                  dial: "+359",  flag: "🇧🇬", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "BF", name: "Burkina Faso",              dial: "+226",  flag: "🇧🇫", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "BI", name: "Burundi",                   dial: "+257",  flag: "🇧🇮", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "BT", name: "Butão",                     dial: "+975",  flag: "🇧🇹", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "CV", name: "Cabo Verde",                dial: "+238",  flag: "🇨🇻", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "CM", name: "Camarões",                  dial: "+237",  flag: "🇨🇲", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "KH", name: "Camboja",                   dial: "+855",  flag: "🇰🇭", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "CA", name: "Canadá",                    dial: "+1",    flag: "🇨🇦", maxDigits: 10, placeholder: "(999) 999-9999",
    fmt: (d) => d.length<=3?d:d.length<=6?`(${d.slice(0,3)}) ${d.slice(3)}`:`(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}` },
  { code: "QA", name: "Catar",                     dial: "+974",  flag: "🇶🇦", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "KZ", name: "Cazaquistão",               dial: "+7",    flag: "🇰🇿", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "CF", name: "Rep. Centro-Africana",      dial: "+236",  flag: "🇨🇫", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "TD", name: "Chade",                     dial: "+235",  flag: "🇹🇩", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "CL", name: "Chile",                     dial: "+56",   flag: "🇨🇱", maxDigits: 9,  placeholder: "9 9999 9999",    fmt: fmtGen },
  { code: "CN", name: "China",                     dial: "+86",   flag: "🇨🇳", maxDigits: 11, placeholder: "999 9999 9999",  fmt: fmtGen },
  { code: "CY", name: "Chipre",                    dial: "+357",  flag: "🇨🇾", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "CO", name: "Colômbia",                  dial: "+57",   flag: "🇨🇴", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "KM", name: "Comores",                   dial: "+269",  flag: "🇰🇲", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "CG", name: "Congo",                     dial: "+242",  flag: "🇨🇬", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "CD", name: "Congo (RD)",                dial: "+243",  flag: "🇨🇩", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "KP", name: "Coreia do Norte",           dial: "+850",  flag: "🇰🇵", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "KR", name: "Coreia do Sul",             dial: "+82",   flag: "🇰🇷", maxDigits: 10, placeholder: "99 9999 9999",   fmt: fmtGen },
  { code: "CI", name: "Costa do Marfim",           dial: "+225",  flag: "🇨🇮", maxDigits: 10, placeholder: "99 99 999 999",  fmt: fmtGen },
  { code: "CR", name: "Costa Rica",                dial: "+506",  flag: "🇨🇷", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "HR", name: "Croácia",                   dial: "+385",  flag: "🇭🇷", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "CU", name: "Cuba",                      dial: "+53",   flag: "🇨🇺", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "CW", name: "Curaçao",                   dial: "+599",  flag: "🇨🇼", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "DK", name: "Dinamarca",                 dial: "+45",   flag: "🇩🇰", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "DJ", name: "Djibouti",                  dial: "+253",  flag: "🇩🇯", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "DM", name: "Dominica",                  dial: "+1767", flag: "🇩🇲", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "EG", name: "Egito",                     dial: "+20",   flag: "🇪🇬", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "SV", name: "El Salvador",               dial: "+503",  flag: "🇸🇻", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "AE", name: "Emirados Árabes Unidos",    dial: "+971",  flag: "🇦🇪", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "EC", name: "Equador",                   dial: "+593",  flag: "🇪🇨", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "GQ", name: "Guiné Equatorial",          dial: "+240",  flag: "🇬🇶", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "ER", name: "Eritreia",                  dial: "+291",  flag: "🇪🇷", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "SK", name: "Eslováquia",                dial: "+421",  flag: "🇸🇰", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "SI", name: "Eslovênia",                 dial: "+386",  flag: "🇸🇮", maxDigits: 8,  placeholder: "99 999 999",     fmt: fmtGen },
  { code: "ES", name: "Espanha",                   dial: "+34",   flag: "🇪🇸", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "SZ", name: "Essuatíni",                 dial: "+268",  flag: "🇸🇿", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "US", name: "Estados Unidos",            dial: "+1",    flag: "🇺🇸", maxDigits: 10, placeholder: "(999) 999-9999",
    fmt: (d) => d.length<=3?d:d.length<=6?`(${d.slice(0,3)}) ${d.slice(3)}`:`(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}` },
  { code: "EE", name: "Estônia",                   dial: "+372",  flag: "🇪🇪", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "ET", name: "Etiópia",                   dial: "+251",  flag: "🇪🇹", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "FJ", name: "Fiji",                      dial: "+679",  flag: "🇫🇯", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "PH", name: "Filipinas",                 dial: "+63",   flag: "🇵🇭", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "FI", name: "Finlândia",                 dial: "+358",  flag: "🇫🇮", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "FR", name: "França",                    dial: "+33",   flag: "🇫🇷", maxDigits: 9,  placeholder: "99 99 99 99 99", fmt: fmtGen },
  { code: "GA", name: "Gabão",                     dial: "+241",  flag: "🇬🇦", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "GM", name: "Gâmbia",                    dial: "+220",  flag: "🇬🇲", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "GH", name: "Gana",                      dial: "+233",  flag: "🇬🇭", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "GE", name: "Geórgia",                   dial: "+995",  flag: "🇬🇪", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "GI", name: "Gibraltar",                 dial: "+350",  flag: "🇬🇮", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "GD", name: "Granada",                   dial: "+1473", flag: "🇬🇩", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "GR", name: "Grécia",                    dial: "+30",   flag: "🇬🇷", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "GL", name: "Groenlândia",               dial: "+299",  flag: "🇬🇱", maxDigits: 6,  placeholder: "99 99 99",        fmt: fmtGen },
  { code: "GP", name: "Guadalupe",                 dial: "+590",  flag: "🇬🇵", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "GU", name: "Guam",                      dial: "+1671", flag: "🇬🇺", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "GT", name: "Guatemala",                 dial: "+502",  flag: "🇬🇹", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "GN", name: "Guiné",                     dial: "+224",  flag: "🇬🇳", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "GW", name: "Guiné-Bissau",              dial: "+245",  flag: "🇬🇼", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "GY", name: "Guiana",                    dial: "+592",  flag: "🇬🇾", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "GF", name: "Guiana Francesa",           dial: "+594",  flag: "🇬🇫", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "HT", name: "Haiti",                     dial: "+509",  flag: "🇭🇹", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "HN", name: "Honduras",                  dial: "+504",  flag: "🇭🇳", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "HK", name: "Hong Kong",                 dial: "+852",  flag: "🇭🇰", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "HU", name: "Hungria",                   dial: "+36",   flag: "🇭🇺", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "YE", name: "Iêmen",                     dial: "+967",  flag: "🇾🇪", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "MH", name: "Ilhas Marshall",            dial: "+692",  flag: "🇲🇭", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "VI", name: "Ilhas Virgens (EUA)",       dial: "+1340", flag: "🇻🇮", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "VG", name: "Ilhas Virgens (RU)",        dial: "+1284", flag: "🇻🇬", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "IN", name: "Índia",                     dial: "+91",   flag: "🇮🇳", maxDigits: 10, placeholder: "99999 99999",    fmt: fmtGen },
  { code: "ID", name: "Indonésia",                 dial: "+62",   flag: "🇮🇩", maxDigits: 11, placeholder: "999 9999 9999",  fmt: fmtGen },
  { code: "IQ", name: "Iraque",                    dial: "+964",  flag: "🇮🇶", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "IR", name: "Irã",                       dial: "+98",   flag: "🇮🇷", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "IE", name: "Irlanda",                   dial: "+353",  flag: "🇮🇪", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "IS", name: "Islândia",                  dial: "+354",  flag: "🇮🇸", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "IL", name: "Israel",                    dial: "+972",  flag: "🇮🇱", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "IT", name: "Itália",                    dial: "+39",   flag: "🇮🇹", maxDigits: 11, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "JM", name: "Jamaica",                   dial: "+1876", flag: "🇯🇲", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "JP", name: "Japão",                     dial: "+81",   flag: "🇯🇵", maxDigits: 11, placeholder: "99 9999 9999",   fmt: fmtGen },
  { code: "JO", name: "Jordânia",                  dial: "+962",  flag: "🇯🇴", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "KE", name: "Quênia",                    dial: "+254",  flag: "🇰🇪", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "KG", name: "Quirguistão",               dial: "+996",  flag: "🇰🇬", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "KI", name: "Kiribati",                  dial: "+686",  flag: "🇰🇮", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "XK", name: "Kosovo",                    dial: "+383",  flag: "🇽🇰", maxDigits: 8,  placeholder: "99 999 999",     fmt: fmtGen },
  { code: "KW", name: "Kuwait",                    dial: "+965",  flag: "🇰🇼", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "LA", name: "Laos",                      dial: "+856",  flag: "🇱🇦", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "LS", name: "Lesoto",                    dial: "+266",  flag: "🇱🇸", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "LV", name: "Letônia",                   dial: "+371",  flag: "🇱🇻", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "LB", name: "Líbano",                    dial: "+961",  flag: "🇱🇧", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "LR", name: "Libéria",                   dial: "+231",  flag: "🇱🇷", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "LY", name: "Líbia",                     dial: "+218",  flag: "🇱🇾", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "LI", name: "Liechtenstein",             dial: "+423",  flag: "🇱🇮", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "LT", name: "Lituânia",                  dial: "+370",  flag: "🇱🇹", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "LU", name: "Luxemburgo",                dial: "+352",  flag: "🇱🇺", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "MO", name: "Macau",                     dial: "+853",  flag: "🇲🇴", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "MK", name: "Macedônia do Norte",        dial: "+389",  flag: "🇲🇰", maxDigits: 8,  placeholder: "99 999 999",     fmt: fmtGen },
  { code: "MG", name: "Madagascar",                dial: "+261",  flag: "🇲🇬", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "MY", name: "Malásia",                   dial: "+60",   flag: "🇲🇾", maxDigits: 10, placeholder: "99 9999 9999",   fmt: fmtGen },
  { code: "MW", name: "Malawi",                    dial: "+265",  flag: "🇲🇼", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "MV", name: "Maldivas",                  dial: "+960",  flag: "🇲🇻", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "ML", name: "Mali",                      dial: "+223",  flag: "🇲🇱", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "MT", name: "Malta",                     dial: "+356",  flag: "🇲🇹", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "MA", name: "Marrocos",                  dial: "+212",  flag: "🇲🇦", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "MQ", name: "Martinica",                 dial: "+596",  flag: "🇲🇶", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "MR", name: "Mauritânia",                dial: "+222",  flag: "🇲🇷", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "MU", name: "Maurício",                  dial: "+230",  flag: "🇲🇺", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "MX", name: "México",                    dial: "+52",   flag: "🇲🇽", maxDigits: 10, placeholder: "99 9999 9999",
    fmt: (d) => d.length<=2?d:d.length<=6?`${d.slice(0,2)} ${d.slice(2)}`:`${d.slice(0,2)} ${d.slice(2,6)} ${d.slice(6)}` },
  { code: "FM", name: "Micronésia",                dial: "+691",  flag: "🇫🇲", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "MZ", name: "Moçambique",                dial: "+258",  flag: "🇲🇿", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "MD", name: "Moldávia",                  dial: "+373",  flag: "🇲🇩", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "MC", name: "Mônaco",                    dial: "+377",  flag: "🇲🇨", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "MN", name: "Mongólia",                  dial: "+976",  flag: "🇲🇳", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "ME", name: "Montenegro",                dial: "+382",  flag: "🇲🇪", maxDigits: 8,  placeholder: "99 999 999",     fmt: fmtGen },
  { code: "MS", name: "Montserrat",                dial: "+1664", flag: "🇲🇸", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "MM", name: "Myanmar",                   dial: "+95",   flag: "🇲🇲", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "NA", name: "Namíbia",                   dial: "+264",  flag: "🇳🇦", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "NR", name: "Nauru",                     dial: "+674",  flag: "🇳🇷", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "NP", name: "Nepal",                     dial: "+977",  flag: "🇳🇵", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "NI", name: "Nicarágua",                 dial: "+505",  flag: "🇳🇮", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "NE", name: "Níger",                     dial: "+227",  flag: "🇳🇪", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "NG", name: "Nigéria",                   dial: "+234",  flag: "🇳🇬", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "NO", name: "Noruega",                   dial: "+47",   flag: "🇳🇴", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "NC", name: "Nova Caledônia",            dial: "+687",  flag: "🇳🇨", maxDigits: 6,  placeholder: "99 9999",         fmt: fmtGen },
  { code: "NZ", name: "Nova Zelândia",             dial: "+64",   flag: "🇳🇿", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "NL", name: "Países Baixos",             dial: "+31",   flag: "🇳🇱", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "PW", name: "Palau",                     dial: "+680",  flag: "🇵🇼", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "PS", name: "Palestina",                 dial: "+970",  flag: "🇵🇸", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "PA", name: "Panamá",                    dial: "+507",  flag: "🇵🇦", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "PG", name: "Papua Nova Guiné",          dial: "+675",  flag: "🇵🇬", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "PK", name: "Paquistão",                 dial: "+92",   flag: "🇵🇰", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "PY", name: "Paraguai",                  dial: "+595",  flag: "🇵🇾", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "PE", name: "Peru",                      dial: "+51",   flag: "🇵🇪", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "PF", name: "Polinésia Francesa",        dial: "+689",  flag: "🇵🇫", maxDigits: 6,  placeholder: "99 99 99",        fmt: fmtGen },
  { code: "PL", name: "Polônia",                   dial: "+48",   flag: "🇵🇱", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "PT", name: "Portugal",                  dial: "+351",  flag: "🇵🇹", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "PR", name: "Porto Rico",                dial: "+1787", flag: "🇵🇷", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "GB", name: "Reino Unido",               dial: "+44",   flag: "🇬🇧", maxDigits: 10, placeholder: "9999 999999",    fmt: fmtGen },
  { code: "DO", name: "República Dominicana",      dial: "+1809", flag: "🇩🇴", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "CZ", name: "República Tcheca",          dial: "+420",  flag: "🇨🇿", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "RE", name: "Reunião",                   dial: "+262",  flag: "🇷🇪", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "RO", name: "Romênia",                   dial: "+40",   flag: "🇷🇴", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "RW", name: "Ruanda",                    dial: "+250",  flag: "🇷🇼", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "RU", name: "Rússia",                    dial: "+7",    flag: "🇷🇺", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "KN", name: "São Cristóvão e Nevis",     dial: "+1869", flag: "🇰🇳", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "LC", name: "Santa Lúcia",               dial: "+1758", flag: "🇱🇨", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "VC", name: "São Vicente e Granadinas",  dial: "+1784", flag: "🇻🇨", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "WS", name: "Samoa",                     dial: "+685",  flag: "🇼🇸", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "SM", name: "San Marino",                dial: "+378",  flag: "🇸🇲", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "SH", name: "Santa Helena",              dial: "+290",  flag: "🇸🇭", maxDigits: 4,  placeholder: "9999",            fmt: fmtGen },
  { code: "ST", name: "São Tomé e Príncipe",       dial: "+239",  flag: "🇸🇹", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "SN", name: "Senegal",                   dial: "+221",  flag: "🇸🇳", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "SL", name: "Serra Leoa",                dial: "+232",  flag: "🇸🇱", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "RS", name: "Sérvia",                    dial: "+381",  flag: "🇷🇸", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "SC", name: "Seychelles",                dial: "+248",  flag: "🇸🇨", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "SG", name: "Singapura",                 dial: "+65",   flag: "🇸🇬", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "SY", name: "Síria",                     dial: "+963",  flag: "🇸🇾", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "SO", name: "Somália",                   dial: "+252",  flag: "🇸🇴", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "LK", name: "Sri Lanka",                 dial: "+94",   flag: "🇱🇰", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "SD", name: "Sudão",                     dial: "+249",  flag: "🇸🇩", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "SS", name: "Sudão do Sul",              dial: "+211",  flag: "🇸🇸", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "SE", name: "Suécia",                    dial: "+46",   flag: "🇸🇪", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "CH", name: "Suíça",                     dial: "+41",   flag: "🇨🇭", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "SR", name: "Suriname",                  dial: "+597",  flag: "🇸🇷", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "TJ", name: "Tadjiquistão",              dial: "+992",  flag: "🇹🇯", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "TH", name: "Tailândia",                 dial: "+66",   flag: "🇹🇭", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "TW", name: "Taiwan",                    dial: "+886",  flag: "🇹🇼", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "TZ", name: "Tanzânia",                  dial: "+255",  flag: "🇹🇿", maxDigits: 9,  placeholder: "999 999 999",    fmt: fmtGen },
  { code: "TL", name: "Timor-Leste",               dial: "+670",  flag: "🇹🇱", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "TG", name: "Togo",                      dial: "+228",  flag: "🇹🇬", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "TO", name: "Tonga",                     dial: "+676",  flag: "🇹🇴", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "TT", name: "Trinidad e Tobago",         dial: "+1868", flag: "🇹🇹", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "TN", name: "Tunísia",                   dial: "+216",  flag: "🇹🇳", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "TM", name: "Turcomenistão",             dial: "+993",  flag: "🇹🇲", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "TR", name: "Turquia",                   dial: "+90",   flag: "🇹🇷", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "TV", name: "Tuvalu",                    dial: "+688",  flag: "🇹🇻", maxDigits: 6,  placeholder: "999 999",         fmt: fmtGen },
  { code: "UA", name: "Ucrânia",                   dial: "+380",  flag: "🇺🇦", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "UG", name: "Uganda",                    dial: "+256",  flag: "🇺🇬", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "UY", name: "Uruguai",                   dial: "+598",  flag: "🇺🇾", maxDigits: 8,  placeholder: "9999 9999",       fmt: fmtGen },
  { code: "UZ", name: "Uzbequistão",               dial: "+998",  flag: "🇺🇿", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "VU", name: "Vanuatu",                   dial: "+678",  flag: "🇻🇺", maxDigits: 7,  placeholder: "999 9999",        fmt: fmtGen },
  { code: "VE", name: "Venezuela",                 dial: "+58",   flag: "🇻🇪", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "VN", name: "Vietnã",                    dial: "+84",   flag: "🇻🇳", maxDigits: 10, placeholder: "999 999 9999",   fmt: fmtGen },
  { code: "WF", name: "Wallis e Futuna",           dial: "+681",  flag: "🇼🇫", maxDigits: 6,  placeholder: "99 9999",         fmt: fmtGen },
  { code: "ZM", name: "Zâmbia",                    dial: "+260",  flag: "🇿🇲", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
  { code: "ZW", name: "Zimbábue",                  dial: "+263",  flag: "🇿🇼", maxDigits: 9,  placeholder: "99 999 9999",    fmt: fmtGen },
];

export default function CheckinProduct({ family }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [payTab, setPayTab] = useState<"dinheiro" | "financiar">("dinheiro");
  const [fichaTecnicaOpen, setFichaTecnicaOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("produto");
  const [hoverSection, setHoverSection] = useState<string | null>(null);
  const displaySection = hoverSection ?? activeSection;

  // Slide state
  const slideImages = family.variants.map(v => v.img);
  const [slideIdx, setSlideIdx] = useState(0);
  const [imageHovered, setImageHovered] = useState(false);

  useEffect(() => { setSlideIdx(activeVariantIdx); }, [activeVariantIdx]);

  // Form state
  const [fv, setFv] = useState<Record<string, string>>({ cep: "", nome: "", email: "", email2: "", tel: "" });
  const [ft, setFt] = useState<Record<string, boolean>>({});
  const [phoneCountryIdx, setPhoneCountryIdx] = useState(0);
  const [phoneDropOpen, setPhoneDropOpen] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState("");
  const phoneDropRef = useRef<HTMLDivElement>(null);
  const [freteResult, setFreteResult] = useState<
    null | { state: "loading" } | { state: "ok"; city: string; uf: string } | { state: "err"; message: string }
  >(null);
  const [orderConfirmOpen, setOrderConfirmOpen] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  useEffect(() => {
    if (!phoneDropOpen) return;
    const handler = (e: MouseEvent) => {
      if (phoneDropRef.current && !phoneDropRef.current.contains(e.target as Node)) {
        setPhoneDropOpen(false);
        setPhoneSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [phoneDropOpen]);

  const setField = (key: string, value: string) => setFv(v => ({ ...v, [key]: value }));
  const touchField = (key: string) => setFt(t => ({ ...t, [key]: true }));

  const fieldError = (key: string): string => {
    if (!ft[key]) return "";
    const val = fv[key] ?? "";
    switch (key) {
      case "cep":    return /^\d{5}-\d{3}$/.test(val) ? "" : "CEP inválido — formato esperado: 00000-000";
      case "nome":   return val.trim().split(/\s+/).length >= 2 ? "" : "Informe nome e sobrenome";
      case "email":  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? "" : "Email inválido";
      case "email2": return val === fv.email ? "" : "Os emails não coincidem";
      case "tel":    return val.replace(/\D/g, "").length >= 8 ? "" : "Número inválido";
      default: return "";
    }
  };

  const handleCEPChange = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 8);
    setField("cep", d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d);
    setFreteResult(null);
  };

  const handleCalcularFrete = async () => {
    const digits = fv.cep.replace(/\D/g, "");
    if (digits.length !== 8) { touchField("cep"); return; }
    setFreteResult({ state: "loading" });
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (data.erro) {
        setFreteResult({ state: "err", message: "CEP não encontrado." });
      } else {
        setFreteResult({ state: "ok", city: data.localidade ?? "", uf: data.uf ?? "" });
      }
    } catch {
      setFreteResult({ state: "err", message: "Erro ao consultar CEP. Tente novamente." });
    }
  };

  const handleTelChange = (raw: string) => {
    const country = PHONE_COUNTRIES[phoneCountryIdx];
    const d = raw.replace(/\D/g, "").slice(0, country.maxDigits);
    setField("tel", country.fmt(d));
  };

  const activeVariant = family.variants[activeVariantIdx];
  const specs = SPECS[activeVariant.id] ?? SPECS["neo-fit"]!;
  const accent = family.isPremium ? "#9f3df5" : "#0233c3";
  const accentGrad = family.isPremium
    ? "linear-gradient(135deg, #0233c3, #9f3df5)"
    : "linear-gradient(135deg, #0233c3, #0569ff)";

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const { scrollTop, clientHeight } = container;
    const containerTop = container.getBoundingClientRect().top;

    // Scroll-spy: use getBoundingClientRect so the trigger is always relative to the
    // actual visible area of the scroll container, regardless of offsetParent ancestry.
    // A section activates when its top crosses 30% from the container's top edge.
    const triggerLine = clientHeight * 0.3;
    let best = "produto";
    let bestVisualTop = -Infinity;
    Object.entries(sectionRefs.current).forEach(([key, el]) => {
      if (!el) return;
      const visualTop = el.getBoundingClientRect().top - containerTop;
      if (visualTop <= triggerLine && visualTop > bestVisualTop) {
        bestVisualTop = visualTop;
        best = key;
      }
    });
    setActiveSection(best);

    // Scene transitions (when scenes are defined)
    if (family.scenes.length === 0) return;
    let idx = 0;
    for (let i = 0; i < family.scenes.length; i++) {
      if (scrollTop >= family.scenes[i].minScroll) idx = i;
    }
    setActiveSceneIdx(idx);
  }, [family.scenes]);

  const handleLeftWheel = useCallback((e: React.WheelEvent) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop += e.deltaY;
  }, []);

  const leftImg =
    family.scenes.length > 0
      ? family.scenes[activeSceneIdx].img
      : activeVariant.img;

  const monthlyPrice = (price: number) => Math.ceil(price / 12);

  return (
    <div className="flex flex-col md:flex-row w-full h-[calc(100vh-80px)] overflow-hidden">

      {/* ── LEFT: Sticky image ───────────────────────────────────────────── */}
      <div className="shrink-0 h-[260px] md:h-auto md:flex-1 bg-[#f6f9fe] flex flex-col overflow-hidden" onWheel={handleLeftWheel}>

        {/* Image area */}
        <div
          className="flex-1 relative flex items-center justify-center overflow-hidden"
          onMouseEnter={() => setImageHovered(true)}
          onMouseLeave={() => setImageHovered(false)}
        >

          {/* ── PRODUTO: slide between variant images ─────────────────────── */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${displaySection === "produto" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {family.scenes.length > 0 ? (
              family.scenes.map((scene, i) => (
                <img key={i} src={scene.img} alt=""
                  className={`absolute inset-0 w-full h-full object-contain p-[24px] md:p-[60px] transition-opacity duration-500 ${i === activeSceneIdx ? "opacity-100" : "opacity-0"}`}
                />
              ))
            ) : (
              slideImages.map((img, i) => (
                <img key={img + i} src={img} alt={family.variants[i]?.name ?? ""}
                  className={`absolute inset-0 w-full h-full object-contain p-[24px] md:p-[60px] transition-opacity duration-500 ${i === slideIdx ? "opacity-100" : "opacity-0"}`}
                />
              ))
            )}
          </div>

          {/* ── CORES: color-specific product image ───────────────────────── */}
          {!family.isPremium && (
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${displaySection === "cores" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              {ESSENTIALS_COLORS.map((color, i) => (
                <img key={color.name}
                  src={color.img || activeVariant.img}
                  alt={color.name}
                  className={`absolute inset-0 w-full h-full object-contain p-[24px] md:p-[60px] transition-opacity duration-500 ${i === activeColorIdx ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
          )}

          {/* ── FILTROS: filter banner ─────────────────────────────────────── */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${displaySection === "filtros" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div className="w-full h-full flex flex-col items-center justify-center gap-[16px] p-[40px]"
              style={{ background: "linear-gradient(160deg, #eef2ff 0%, #f6f9fe 60%, #f0eeff 100%)" }}>
              <div className="size-[64px] rounded-[20px] flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #0233c3, #0569ff)" }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M6 8h20M10 14h12M14 20h4" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex flex-col items-center gap-[6px]">
                <p className="font-['Avenir_LT_Pro:95_Black'] text-[18px] text-[#1f2e91] text-center">Filtros de Alta Performance</p>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#6b7280] text-center leading-[1.5]">
                  Imagem do banner de filtros
                </p>
              </div>
            </div>
          </div>

          {/* ── CEP: embedded map ─────────────────────────────────────────── */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${displaySection === "cep" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {fv.cep.length === 9 ? (
              <iframe
                key={fv.cep}
                src={`https://www.google.com/maps?q=${encodeURIComponent(fv.cep + ", Brasil")}&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                title="Mapa de entrega"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-[16px] p-[40px]"
                style={{ background: "linear-gradient(160deg, #eef2ff 0%, #f6f9fe 100%)" }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="22" r="10" stroke="#0233c3" strokeWidth="2.5"/>
                  <path d="M24 12v-4M24 32v4M14 22H10M38 22h-4" stroke="#0233c3" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                  <circle cx="24" cy="22" r="3.5" fill="#0233c3"/>
                  <path d="M16 36c0-4 3.6-7 8-7s8 3 8 7" stroke="#0233c3" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
                </svg>
                <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#9ca3af] text-center">
                  Digite seu CEP para ver a localização de entrega
                </p>
              </div>
            )}
          </div>

          {/* ── GARANTIAS / CONTA: product image (no arrows) ──────────────── */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${displaySection === "garantias" || displaySection === "conta" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <img src={activeVariant.img} alt={activeVariant.name}
              className="w-full h-full object-contain p-[24px] md:p-[60px]"
            />
          </div>

          {/* ── Slide arrows (produto only, fade on hover) ─────────────────── */}
          {family.scenes.length === 0 && slideImages.length > 1 && (
            <>
              <button
                aria-label="Imagem anterior"
                className={`absolute left-[12px] top-1/2 -translate-y-1/2 z-10 size-[38px] rounded-full bg-white/90 backdrop-blur-sm border border-[#e8ecf4] flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 ${displaySection === "produto" && imageHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setSlideIdx(n => (n - 1 + slideImages.length) % slideImages.length)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 11L5 7l4-4" stroke="#1f2e91" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                aria-label="Próxima imagem"
                className={`absolute right-[12px] top-1/2 -translate-y-1/2 z-10 size-[38px] rounded-full bg-white/90 backdrop-blur-sm border border-[#e8ecf4] flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 ${displaySection === "produto" && imageHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setSlideIdx(n => (n + 1) % slideImages.length)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="#1f2e91" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}

          {/* Section indicator */}
          <div className="absolute bottom-[16px] left-[16px] z-10 flex items-center gap-[6px] bg-white/90 backdrop-blur-sm rounded-full px-[10px] py-[5px] shadow-sm border border-[#e8ecf4] transition-all duration-300">
            <div className="size-[6px] rounded-full transition-all duration-300" style={{ background: accentGrad }} />
            <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[11px] text-[#1f2e91] transition-all duration-300">
              {SECTION_LABELS[displaySection] ?? displaySection}
            </span>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Scrollable panel ──────────────────────────────────────── */}
      <div className="flex-1 min-h-0 w-full md:flex-none md:w-[400px] xl:w-[440px] flex flex-col border-t md:border-t-0 md:border-l border-[#e8ecf4] bg-white">

        <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto">
          <div className="px-[20px] md:px-[32px] pt-[36px] pb-[8px] flex flex-col gap-[28px]">

            {/* ── Header ──────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-[4px]">
              <h1 className="font-['Avenir_LT_Pro:95_Black'] text-[32px] leading-[1.1]"
                style={{ background: accentGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {activeVariant.name}
              </h1>
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
            <div className="flex flex-col gap-[8px]"
              ref={(el) => { sectionRefs.current["produto"] = el; }}
              onMouseEnter={() => setHoverSection("produto")}
              onMouseLeave={() => setHoverSection(null)}>
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
              <SpecRow label="Formato"           value={specs.formato}      isPremium={family.isPremium} />
              <SpecRow label="Sistema de Filtragem" value={specs.filtragem} isPremium={family.isPremium} />
              <SpecRow label="Temperaturas"      value={specs.temperaturas} isPremium={family.isPremium} />
              <SpecRow label="Água com Gás"      value={specs.gas}   isBool isPremium={family.isPremium} />
              <SpecRow label="Água Hidrogenada"  value={specs.h2}    isBool isPremium={family.isPremium} />
              {/* Collapsible rows */}
              {fichaTecnicaOpen && (
                <>
                  <SpecRow label="Funções"                 value={specs.funcoes}   isPremium={family.isPremium} />
                  <SpecRow label="Painel"                  value={specs.painel}    isPremium={family.isPremium} />
                  <SpecRow label="App"                     value={specs.app}  isBool isPremium={family.isPremium} />
                  <SpecRow label="AI + IoT"                value={specs.iot}  isBool isPremium={family.isPremium} />
                  <SpecRow label="Wi-Fi + Bluetooth 5.3"   value={specs.wifi} isBool isPremium={family.isPremium} />
                  <SpecRow label="UV LED"                  value={specs.uv}   isBool isPremium={family.isPremium} />
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

            {/* ── Cores — Essentials only ─────────────────────────────────── */}
            {!family.isPremium && (
              <>
                <Sep />
                <div className="flex flex-col gap-[16px] items-center"
                  ref={(el) => { sectionRefs.current["cores"] = el; }}
                  onMouseEnter={() => setHoverSection("cores")}
                  onMouseLeave={() => setHoverSection(null)}>
                  <div className="flex flex-col gap-[4px] items-center">
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#9ca3af] uppercase tracking-[0.06em]">Cores</p>
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[18px] text-[#1f2e91] text-center">
                      {ESSENTIALS_COLORS[activeColorIdx].name}
                    </p>
                  </div>
                  <div className="flex gap-[10px] items-center justify-center flex-wrap">
                    {ESSENTIALS_COLORS.map((color, i) => {
                      const isActive = i === activeColorIdx;
                      return (
                        <button key={i} onClick={() => setActiveColorIdx(i)}
                          title={color.name}
                          className="size-[56px] rounded-full flex items-center justify-center transition-all shrink-0"
                          style={{
                            border: isActive ? `2px solid ${accent}` : "2px solid #e8ecf4",
                            padding: "5px",
                          }}>
                          <div className="size-full rounded-full" style={{ background: color.gradient }} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            <Sep />

            {/* ── Filtros de Alta Performance ──────────────────────────────── */}
            {(() => {
              const fs = family.isPremium ? FILTER_SET_PREMIUM : FILTER_SET_ESSENTIALS;
              return (
                <div className="flex flex-col gap-[14px]"
                  ref={(el) => { sectionRefs.current["filtros"] = el; }}
                  onMouseEnter={() => setHoverSection("filtros")}
                  onMouseLeave={() => setHoverSection(null)}>
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
                      </>
                    )}
                  </div>
                </div>
              );
            })()}

            <Sep />

            {/* ── Garantias ───────────────────────────────────────────────── */}
            <div className="flex flex-col gap-[16px]"
              ref={(el) => { sectionRefs.current["garantias"] = el; }}
              onMouseEnter={() => setHoverSection("garantias")}
              onMouseLeave={() => setHoverSection(null)}>
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
            <div className="flex flex-col gap-[16px]"
              ref={(el) => { sectionRefs.current["cep"] = el; }}
              onMouseEnter={() => setHoverSection("cep")}
              onMouseLeave={() => setHoverSection(null)}>
              <SectionTitle>Adicione seu CEP</SectionTitle>
              <div className="flex flex-col gap-[6px]">
                <div className="flex gap-[8px]">
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="00000-000"
                    maxLength={9}
                    value={fv.cep}
                    onChange={(e) => handleCEPChange(e.target.value)}
                    onBlur={() => touchField("cep")}
                    className={`flex-1 h-[44px] px-[14px] rounded-[10px] bg-[#f6f9fe] font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#1f2e91] placeholder:text-[#aab2bc] outline-none border transition-colors ${fieldError("cep") ? "border-[#ef4444]" : "border-[#e8ecf4] focus:border-[#0233c3]"}`}
                  />
                  <button
                    onClick={handleCalcularFrete}
                    disabled={freteResult?.state === "loading"}
                    className="h-[44px] px-[20px] rounded-[10px] font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-white shrink-0 transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center gap-[6px]"
                    style={{ background: accentGrad }}>
                    {freteResult?.state === "loading" && (
                      <span className="size-[13px] border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    Calcular
                  </button>
                </div>
                {fieldError("cep") && (
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#ef4444] flex items-center gap-[4px]">
                    <span>⚠</span> {fieldError("cep")}
                  </p>
                )}
                {freteResult?.state === "ok" && (
                  <div className="flex flex-col gap-[4px] pt-[2px]">
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#6b7280]">
                      {freteResult.city}, {freteResult.uf}
                    </p>
                    <p className="font-['Avenir_LT_Pro:85_Heavy'] text-[13px] flex items-center gap-[5px]" style={{ color: "#16a34a" }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6.5" stroke="#16a34a" strokeWidth="1"/>
                        <path d="M4 7l2.5 2.5L10 4.5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Frete grátis
                    </p>
                  </div>
                )}
                {freteResult?.state === "err" && (
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#ef4444] flex items-center gap-[4px]">
                    <span>⚠</span> {freteResult.message}
                  </p>
                )}
              </div>
              <p className="font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#6b7280] text-center">
                Frete grátis para compras acima de R$ 500,00. Entrega em todo o Brasil.
              </p>
            </div>

            <Sep />

            {/* ── Form ────────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-[16px]"
              ref={(el) => { sectionRefs.current["conta"] = el; }}
              onMouseEnter={() => setHoverSection("conta")}
              onMouseLeave={() => setHoverSection(null)}>
              <SectionTitle>Detalhes de sua conta</SectionTitle>
              <div className="flex flex-col gap-[10px]">

                {/* Nome */}
                <div className="flex flex-col gap-[6px]">
                  <label htmlFor="checkin-nome"
                    className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#6b7280] uppercase tracking-[0.05em]">
                    Nome Completo
                  </label>
                  <input id="checkin-nome" type="text" autoComplete="name"
                    value={fv.nome}
                    onChange={(e) => setField("nome", e.target.value)}
                    onBlur={() => touchField("nome")}
                    className={`h-[44px] px-[14px] rounded-[10px] bg-[#f6f9fe] font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#1f2e91] placeholder:text-[#aab2bc] outline-none border transition-colors ${fieldError("nome") ? "border-[#ef4444]" : "border-[#e8ecf4] focus:border-[#0233c3]"}`}
                  />
                  {fieldError("nome") && (
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#ef4444] flex items-center gap-[4px]">
                      <span>⚠</span> {fieldError("nome")}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-[6px]">
                  <label htmlFor="checkin-email"
                    className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#6b7280] uppercase tracking-[0.05em]">
                    Endereço de Email
                  </label>
                  <input id="checkin-email" type="email" autoComplete="email"
                    value={fv.email}
                    onChange={(e) => setField("email", e.target.value)}
                    onBlur={() => touchField("email")}
                    className={`h-[44px] px-[14px] rounded-[10px] bg-[#f6f9fe] font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#1f2e91] placeholder:text-[#aab2bc] outline-none border transition-colors ${fieldError("email") ? "border-[#ef4444]" : "border-[#e8ecf4] focus:border-[#0233c3]"}`}
                  />
                  {fieldError("email") && (
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#ef4444] flex items-center gap-[4px]">
                      <span>⚠</span> {fieldError("email")}
                    </p>
                  )}
                </div>

                {/* Confirm Email */}
                <div className="flex flex-col gap-[6px]">
                  <label htmlFor="checkin-email2"
                    className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#6b7280] uppercase tracking-[0.05em]">
                    Confirme Endereço de Email
                  </label>
                  <input id="checkin-email2" type="email" autoComplete="off"
                    value={fv.email2}
                    onChange={(e) => setField("email2", e.target.value)}
                    onBlur={() => touchField("email2")}
                    className={`h-[44px] px-[14px] rounded-[10px] bg-[#f6f9fe] font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#1f2e91] placeholder:text-[#aab2bc] outline-none border transition-colors ${fieldError("email2") ? "border-[#ef4444]" : "border-[#e8ecf4] focus:border-[#0233c3]"}`}
                  />
                  {fieldError("email2") && (
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#ef4444] flex items-center gap-[4px]">
                      <span>⚠</span> {fieldError("email2")}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-[6px]">
                  <label htmlFor="checkin-tel"
                    className="font-['Avenir_LT_Pro:85_Heavy'] text-[12px] text-[#6b7280] uppercase tracking-[0.05em]">
                    Número de Telefone
                  </label>
                  <div className={`flex rounded-[10px] bg-[#f6f9fe] border overflow-visible transition-colors ${fieldError("tel") ? "border-[#ef4444]" : "border-[#e8ecf4] focus-within:border-[#0233c3]"}`}>
                    <div className="relative shrink-0">
                      <button type="button"
                        className="h-[44px] px-[10px] flex items-center gap-[5px] font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#1f2e91] border-r border-[#e8ecf4] bg-transparent rounded-l-[10px]"
                        onClick={() => setPhoneDropOpen((d) => !d)}>
                        <span className="text-[15px] leading-none">{PHONE_COUNTRIES[phoneCountryIdx].flag}</span>
                        <span>{PHONE_COUNTRIES[phoneCountryIdx].dial}</span>
                        <svg className="size-[9px] text-[#9ca3af] shrink-0" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      {phoneDropOpen && (
                        <div ref={phoneDropRef} className="absolute top-[calc(100%+4px)] left-0 bg-white rounded-[10px] border border-[#e8ecf4] shadow-lg z-30 w-[260px] flex flex-col overflow-hidden">
                          <div className="p-[8px] border-b border-[#e8ecf4]">
                            <input
                              autoFocus
                              type="text"
                              value={phoneSearch}
                              onChange={(e) => setPhoneSearch(e.target.value)}
                              placeholder="Buscar país..."
                              className="w-full h-[32px] px-[10px] rounded-[6px] bg-[#f6f9fe] border border-[#e8ecf4] font-['Avenir_LT_Pro:55_Roman'] text-[13px] text-[#1f2e91] placeholder:text-[#aab2bc] outline-none"
                            />
                          </div>
                          <div className="max-h-[220px] overflow-y-auto">
                            {PHONE_COUNTRIES
                              .map((c, i) => ({ c, i }))
                              .filter(({ c }) => !phoneSearch ||
                                c.name.toLowerCase().includes(phoneSearch.toLowerCase()) ||
                                c.code.toLowerCase().includes(phoneSearch.toLowerCase()) ||
                                c.dial.includes(phoneSearch))
                              .map(({ c, i }) => (
                                <button key={c.code} type="button"
                                  className={`w-full px-[12px] py-[8px] flex items-center gap-[8px] hover:bg-[#f6f9fe] transition-colors text-left ${i === phoneCountryIdx ? "bg-[#f0f4ff]" : ""}`}
                                  onClick={() => {
                                    setPhoneCountryIdx(i);
                                    setPhoneDropOpen(false);
                                    setPhoneSearch("");
                                    setField("tel", "");
                                    setFt((t) => ({ ...t, tel: false }));
                                  }}>
                                  <span className="text-[16px] leading-none shrink-0">{c.flag}</span>
                                  <span className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#1f2e91] flex-1 truncate text-left">{c.name}</span>
                                  <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[11px] text-[#6b7280] shrink-0">{c.dial}</span>
                                </button>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <input id="checkin-tel" type="tel"
                      placeholder={PHONE_COUNTRIES[phoneCountryIdx].placeholder}
                      value={fv.tel}
                      onChange={(e) => handleTelChange(e.target.value)}
                      onBlur={() => touchField("tel")}
                      className="flex-1 h-[44px] px-[12px] min-w-0 bg-transparent font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#1f2e91] placeholder:text-[#aab2bc] outline-none"
                    />
                  </div>
                  {fieldError("tel") && (
                    <p className="font-['Avenir_LT_Pro:55_Roman'] text-[12px] text-[#ef4444] flex items-center gap-[4px]">
                      <span>⚠</span> {fieldError("tel")}
                    </p>
                  )}
                </div>

              </div>
              <div className="flex flex-col gap-[10px]">
                {/* Consent checkbox */}
                <div className="flex items-start gap-[10px] cursor-pointer select-none" onClick={() => setConsentChecked(v => !v)}>
                  <div className={`shrink-0 size-[18px] mt-[1px] rounded-[5px] border-2 flex items-center justify-center transition-colors ${consentChecked ? "border-[#0233c3] bg-[#0233c3]" : "border-[#d1d5db] bg-white"}`}>
                    {consentChecked && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5L8.5 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#9ca3af] leading-[18px]">
                    Ao prosseguir, autorizo a Acquafy a entrar em contato comigo sobre esta solicitação e a me enviar informações sobre produtos e serviços. Posso cancelar a qualquer momento.
                  </p>
                </div>
                {/* Terms checkbox */}
                <div className="flex items-start gap-[10px] select-none">
                  <div className={`shrink-0 size-[18px] mt-[1px] rounded-[5px] border-2 flex items-center justify-center transition-colors cursor-pointer ${termsChecked ? "border-[#0233c3] bg-[#0233c3]" : "border-[#d1d5db] bg-white"}`} onClick={() => setTermsChecked(v => !v)}>
                    {termsChecked && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5L8.5 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[11px] text-[#9ca3af] leading-[18px]">
                    Li e aceito os{" "}
                    <button
                      type="button"
                      onClick={() => setTermsOpen(true)}
                      className="underline text-[#0233c3] hover:opacity-70 transition-opacity cursor-pointer"
                    >
                      Termos de Uso
                    </button>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[12px]" />
          </div>
        </div>

        {/* ── Terms of use modal ─────────────────────────────────────────── */}
        {termsOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-[20px]"
            style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(6px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setTermsOpen(false); }}
          >
            <div className="bg-white rounded-[24px] w-full max-w-[680px] h-[80vh] flex flex-col overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-[24px] py-[18px] border-b border-[#e8ecf4] shrink-0">
                <span className="font-['Avenir_LT_Pro:85_Heavy'] text-[15px] text-[#1f2e91]">Termos de Uso</span>
                <button
                  onClick={() => setTermsOpen(false)}
                  className="size-[32px] rounded-full flex items-center justify-center hover:bg-[#f6f9fe] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2l10 10M12 2L2 12" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <iframe
                src="/termos-de-uso"
                className="flex-1 border-0 w-full"
                title="Termos de Uso"
              />
            </div>
          </div>
        )}

        {/* ── Order confirmation modal ───────────────────────────────────── */}
        {orderConfirmOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-[20px]"
            style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(6px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setOrderConfirmOpen(false); }}
          >
            <div className="bg-white rounded-[24px] w-full max-w-[420px] overflow-hidden shadow-2xl">
              {/* Header */}
              <div
                className="px-[32px] pt-[32px] pb-[28px] flex flex-col items-center gap-[14px]"
                style={{ background: "linear-gradient(160deg, #eef2ff 0%, #f0eeff 100%)" }}
              >
                <div
                  className="size-[60px] rounded-full flex items-center justify-center"
                  style={{ background: accentGrad }}
                >
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M5 13l6 6L21 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex flex-col items-center gap-[4px]">
                  <p className="font-['Avenir_LT_Pro:95_Black'] text-[20px] text-[#1f2e91] text-center">Pedido confirmado!</p>
                  <p className="font-['Avenir_LT_Pro:55_Roman'] text-[14px] text-[#6b7280] text-center">
                    {activeVariant.name} · {formatBRL(activeVariant.price)}
                  </p>
                </div>
              </div>
              {/* Actions */}
              <div className="px-[24px] py-[24px] flex flex-col gap-[10px]">
                <div className="grid grid-cols-2 gap-[10px]">
                  <a
                    href="/checkin"
                    className="h-[46px] rounded-[12px] border border-[#e8ecf4] flex items-center justify-center font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91] hover:bg-[#f6f9fe] transition-colors text-center px-[8px]"
                  >
                    Compare produtos
                  </a>
                  <a
                    href="/acquafy-media"
                    className="h-[46px] rounded-[12px] border border-[#e8ecf4] flex items-center justify-center font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91] hover:bg-[#f6f9fe] transition-colors text-center px-[8px]"
                  >
                    Acquafy Media
                  </a>
                  <a
                    href="/seja-um-parceiro"
                    className="h-[46px] rounded-[12px] border border-[#e8ecf4] flex items-center justify-center font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-[#1f2e91] hover:bg-[#f6f9fe] transition-colors text-center px-[8px]"
                  >
                    Seja um Parceiro
                  </a>
                  <button
                    onClick={() => setOrderConfirmOpen(false)}
                    className="h-[46px] rounded-[12px] font-['Avenir_LT_Pro:85_Heavy'] text-[13px] text-white transition-opacity hover:opacity-90"
                    style={{ background: accentGrad }}
                  >
                    Comprar outro?
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
            onClick={() => setOrderConfirmOpen(true)}
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
