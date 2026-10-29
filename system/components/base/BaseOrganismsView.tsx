// components/base/BaseOrganismsView.tsx
import { BaseIndexNav } from "@/components/base/BaseIndexNav";
import { BaseOrganismBlock } from "@/components/base/BaseOrganismBlock";
import { BaseSection } from "@/components/base/BaseSection";
import { ORGANISM_PREVIEWS } from "@/components/base/previews";
import { organismGroups } from "@/lib/base/organism-groups";

const COPY = {
  desktop: {
    title: "Organismos Desktop",
    lead: "Os blocos de tela do portal (components/sections), um depois do outro e renderizados",
    layout: "flex flex-col",
  },
  mobile: {
    title: "Organismos Mobile",
    lead: "Os blocos de tela do app (components/mobile/sections), um depois do outro e renderizados",
    layout: "grid grid-cols-[repeat(auto-fill,minmax(640px,1fr))] items-start gap-x-6 gap-y-2",
  },
} as const;

/**
 * All the organisms of one kind on one long page, rendered live, one section per screen (as the Interfy components
 * library): a sticky index on the left, the sections one after the other on the right. Desktop and mobile are separate
 * pages: web organisms at the width of the content column, app organisms in phone-wide panels side by side.
 */
export function BaseOrganismsView({ kind }: { kind: "desktop" | "mobile" }) {
  const copy = COPY[kind];
  const groups = organismGroups(kind);
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
      <BaseIndexNav title={copy.title} items={groups.map((g) => ({ id: g.slug, name: g.title }))} />

      <div className="min-w-0">
        <header className="mb-7">
          <h1 className="text-[clamp(26px,3vw,34px)] leading-[1.15] font-bold text-ink">{copy.title}</h1>
          <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-soft">
            {copy.lead} <b>ao vivo</b>, na ordem de produção das telas ({total} organismos). Em cada um: o nome e o arquivo em cima e, logo abaixo, o organismo para passar o mouse e clicar. Modais e
            sheets abrem pelo botão &ldquo;Abrir&rdquo;.
          </p>
        </header>

        {groups.map((g) => (
          <BaseSection key={g.slug} id={g.slug} name={g.title} origin={`${g.items.length} ${g.items.length === 1 ? "organismo" : "organismos"}`}>
            <div className={copy.layout}>
              {g.items.map((o) => (
                <BaseOrganismBlock key={o.file} organism={o} preview={ORGANISM_PREVIEWS[o.name]?.()} />
              ))}
            </div>
          </BaseSection>
        ))}
      </div>
    </div>
  );
}
