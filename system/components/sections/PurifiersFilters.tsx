// components/sections/PurifiersFilters.tsx
"use client";

import { List, Map as MapIcon, Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { SearchInput, Select, type SelectOption } from "@/components/ui/Field";
import { Tabs } from "@/components/ui/Tabs";
import { statusFilterOptions } from "@/config/purifiers-page";

export type PurifierView = "list" | "map";

export type PurifierFilters = { model: string; status: string; place: string; query: string };

type Props = {
  value: PurifierFilters;
  onChange: (patch: Partial<PurifierFilters>) => void;
  models: SelectOption[];
  places: SelectOption[];
  view: PurifierView;
  onView: (view: PurifierView) => void;
};

/** Wrapping flex row: controls keep a readable minimum width and drop to the next line instead of squeezing. */
export function PurifiersFilters({ value, onChange, models, places, view, onView }: Props) {
  return (
    <section aria-label="Filtros" className="card flex flex-wrap items-end gap-3 p-4">
      <Select label="Modelo" value={value.model} onChange={(e) => onChange({ model: e.target.value })} options={[{ value: "all", label: "Todos" }, ...models]} wrapperClassName="min-w-36 flex-1" />
      <Select label="Situação" value={value.status} onChange={(e) => onChange({ status: e.target.value })} options={statusFilterOptions} wrapperClassName="min-w-36 flex-1" />
      <Select
        label="Localização"
        value={value.place}
        onChange={(e) => onChange({ place: e.target.value })}
        options={[{ value: "all", label: "Todas" }, ...places]}
        wrapperClassName="min-w-36 flex-1"
      />

      <SearchInput
        label="Buscar por número de série ou localização"
        placeholder="Buscar por número de série ou localização…"
        value={value.query}
        onChange={(e) => onChange({ query: e.target.value })}
        wrapperClassName="min-w-56 flex-[2_1_16rem]"
      />

      <div className="flex shrink-0 flex-wrap items-end gap-3">
        <Tabs
          variant="segment"
          idPrefix="purifier-view"
          label="Modo de visualização"
          value={view}
          onChange={onView}
          items={[
            { id: "list", label: "Lista", icon: List },
            { id: "map", label: "Mapa", icon: MapIcon },
          ]}
        />
        <ButtonLink href="/solicitar">
          <Plus className="size-5" aria-hidden="true" />
          Solicitar mais
        </ButtonLink>
      </div>
    </section>
  );
}
