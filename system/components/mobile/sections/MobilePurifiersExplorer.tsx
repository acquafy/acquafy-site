// components/mobile/sections/MobilePurifiersExplorer.tsx
"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileChip, MobileChipRow } from "@/components/mobile/ui/MobileChip";
import { MobileEmptyState } from "@/components/mobile/ui/MobileEmptyState";
import { MobileSearchField } from "@/components/mobile/ui/MobileFields";
import type { Purifier } from "@/config/investor";
import { MAINTENANCE_STORAGE_KEY, type MaintenanceRequest } from "@/config/mobile-purifiers";
import { statusFilterOptions } from "@/config/purifiers-page";
import { countByStatus, filterPurifiers, type PurifierStatusFilter } from "@/lib/portal/purifier-filters";
import { usePersistentState } from "@/lib/usePersistentState";
import { MobilePurifierDetailSheet } from "./MobilePurifierDetailSheet";
import { MobilePurifierMaintenanceSheet } from "./MobilePurifierMaintenanceSheet";
import { MobilePurifierRow } from "./MobilePurifierRow";

/** State owner of Purificadores: search, status chips, the list, the detail sheet and the maintenance sheet. */
export function MobilePurifiersExplorer({ purifiers, today }: { purifiers: Purifier[]; today: string }) {
  const [status, setStatus] = useState<PurifierStatusFilter>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Purifier | null>(null);
  const [maintenanceFor, setMaintenanceFor] = useState<Purifier | null>(null);
  const [requests, setRequests] = usePersistentState<MaintenanceRequest[]>(MAINTENANCE_STORAGE_KEY, []);

  const counts = useMemo(() => countByStatus(purifiers), [purifiers]);
  const rows = useMemo(() => filterPurifiers(purifiers, status, query), [purifiers, status, query]);
  const filtered = status !== "all" || query.trim() !== "";

  const clear = () => {
    setStatus("all");
    setQuery("");
  };

  return (
    <>
      <MobileSearchField label="Buscar purificadores" placeholder="Buscar por S/N ou cidade" value={query} onValueChange={setQuery} />
      <MobileChipRow label="Filtrar por situação">
        {statusFilterOptions.map((o) => (
          <MobileChip key={o.value} selected={status === o.value} count={counts[o.value]} onClick={() => setStatus(o.value)}>
            {o.label}
          </MobileChip>
        ))}
      </MobileChipRow>

      <p className="-mb-2 px-1 text-[13.5px] text-ink-soft" aria-live="polite">
        Exibindo {rows.length} de {purifiers.length} purificadores
      </p>

      {rows.length === 0 ? (
        <MobileEmptyState
          icon={SearchX}
          title="Nenhum purificador encontrado"
          description="Tente outro número de série ou limpe os filtros."
          action={
            filtered && (
              <MobileButton variant="secondary" onClick={clear}>
                Limpar busca e filtros
              </MobileButton>
            )
          }
        />
      ) : (
        <ul aria-label="Lista de purificadores" className="grid gap-2.5">
          {rows.map((p) => (
            <MobilePurifierRow key={p.id} purifier={p} onOpen={setSelected} />
          ))}
        </ul>
      )}

      <MobilePurifierDetailSheet
        purifier={selected}
        requests={selected ? requests.filter((r) => r.serial === selected.serial) : []}
        onClose={() => setSelected(null)}
        onMaintenance={(p) => {
          setSelected(null);
          setMaintenanceFor(p);
        }}
      />
      <MobilePurifierMaintenanceSheet purifier={maintenanceFor} today={today} onClose={() => setMaintenanceFor(null)} onCreate={(r) => setRequests((list) => [r, ...list])} />
    </>
  );
}
