import type { Metadata } from "next";
import data from "./icon-data.json";
import version from "./icon-version.json";
import IconReview, { type Entry } from "./IconReview";

export const metadata: Metadata = {
  title: "Ícones substituídos — Acquafy",
  robots: { index: false, follow: false },
};

const VERSION = version.v; // written by tools/icons/build2.py on every build, so the browser does not show cached SVGs
const entries = data as Entry[];
const replaced = entries.filter((e) => e.lucide);
const kept = entries.filter((e) => !e.lucide);

const groups = new Map<string, Entry[]>();
for (const e of replaced) {
  const k = e.lucide as string;
  groups.set(k, [...(groups.get(k) ?? []), e]);
}
const sortedGroups = [...groups.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));

function Tile({ e, src, label }: { e: Entry; src: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-[6px]">
      <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[10px] bg-[#6f7d89]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${src}?v=${VERSION}`} alt={`${label} ${e.file}`} className="h-[44px] w-[44px] object-contain" />
      </div>
      <span className="text-[11px] leading-[13px] text-[#6b7280]">{label}</span>
    </div>
  );
}

export default function IconesPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-[16px] py-[40px] font-['Helvetica_Neue',Arial,sans-serif] text-[#2a2a2b]">
      <h1 className="text-[28px] font-bold leading-[34px] text-[#1f2e91]">Ícones substituídos</h1>
      <p className="mt-[8px] max-w-[720px] text-[16px] leading-[22px]">
        {replaced.length} ícones do site foram substituídos por ícones de traço único (Hugeicons, mais três arquivos fornecidos e a estrutura de filtros), mantendo a cor original de cada um. A espessura segue a regra de 1,5px para 30px e 1,2px para 20px. {kept.length} permaneceram como estavam: marcas, conectores, elementos sem equivalente e ícones que já eram de traço e foram mantidos (gráfico de crescimento, nuvem com globo, tela com cifrão, escudo com gota, avaliação com estrelas e átomo). Fundo cinza só para destacar os ícones brancos.
      </p>

      <h2 className="mt-[40px] text-[22px] font-bold leading-[28px]">Substituídos, agrupados pelo ícone novo</h2>
      <IconReview groups={sortedGroups} version={VERSION} />

      <h2 className="mt-[40px] text-[22px] font-bold leading-[28px]">Mantidos (sem equivalente)</h2>
      <div className="mt-[16px] grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-[14px]">
        {kept.map((e) => (
          <div key={e.file} className="flex flex-col items-center gap-[6px]">
            <Tile e={e} src={`/figma-assets/${e.file}`} label="mantido" />
            <span className="break-all text-center text-[11px] leading-[13px]">{e.file}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
