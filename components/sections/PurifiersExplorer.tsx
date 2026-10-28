// components/sections/PurifiersExplorer.tsx
"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { PURIFIERS_PAGE_SIZE } from "@/config/purifiers-page";
import { usePersistentState } from "@/lib/usePersistentState";
import { locationLabel } from "@/lib/portal/purifiers";
import type { Purifier } from "@/config/investor";
import { PurifierDetail } from "./PurifierDetail";
import { PurifierMaintenanceModal, type MaintenanceRequest } from "./PurifierMaintenanceModal";
import { PurifiersFilters, type PurifierFilters, type PurifierView } from "./PurifiersFilters";
import { PurifiersKpis, type StatusFilter } from "./PurifiersKpis";
import { PurifiersMap } from "./PurifiersMap";
import { PurifiersTable } from "./PurifiersTable";

const NO_FILTERS: PurifierFilters = { model: "all", status: "all", place: "all", query: "" };

/** State owner of the "Meus Purificadores" screen: filters, view, selection, pagination, maintenance requests. */
export function PurifiersExplorer({ purifiers, today, initialQuery = "" }: { purifiers: Purifier[]; today: string; initialQuery?: string }) {
  const [filters, setFilters] = useState<PurifierFilters>({ ...NO_FILTERS, query: initialQuery });
  const [view, setView] = useState<PurifierView>("list");
  const [page, setPage] = useState(1);
  // Arriving from the top-bar search (`?q=serial`): open the matching unit's details right away.
  const [selectedId, setSelectedId] = useState<number | null>(() => {
    const q = initialQuery.trim().toLowerCase();
    return (q && purifiers.find((p) => p.serial.toLowerCase().includes(q))?.id) || (purifiers[0]?.id ?? null);
  });
  const [maintenanceFor, setMaintenanceFor] = useState<Purifier | null>(null);
  const [requests, setRequests] = usePersistentState<MaintenanceRequest[]>("purifier-maintenance", []);

  const models = useMemo(() => [...new Set(purifiers.map((p) => p.model))].map((m) => ({ value: m, label: m })), [purifiers]);
  const places = useMemo(() => [...new Set(purifiers.map(locationLabel))].map((l) => ({ value: l, label: l })), [purifiers]);

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return purifiers.filter(
      (p) =>
        (filters.model === "all" || p.model === filters.model) &&
        (filters.status === "all" || p.status === filters.status) &&
        (filters.place === "all" || locationLabel(p) === filters.place) &&
        (!q || p.serial.toLowerCase().includes(q) || locationLabel(p).toLowerCase().includes(q)),
    );
  }, [purifiers, filters]);

  const pages = Math.max(1, Math.ceil(filtered.length / PURIFIERS_PAGE_SIZE));
  const current = Math.min(page, pages);
  const rows = filtered.slice((current - 1) * PURIFIERS_PAGE_SIZE, current * PURIFIERS_PAGE_SIZE);
  const selected = purifiers.find((p) => p.id === selectedId) ?? null;

  const change = (patch: Partial<PurifierFilters>) => {
    setFilters((f) => ({ ...f, ...patch }));
    setPage(1);
  };

  const pickCity = (city: string) => {
    const match = purifiers.find((p) => p.city === city && p.status !== "available");
    change({ place: match ? locationLabel(match) : "all" });
    setView("list");
  };

  const summary =
    filtered.length === 0
      ? "Nenhum purificador"
      : `Exibindo ${(current - 1) * PURIFIERS_PAGE_SIZE + 1}–${Math.min(current * PURIFIERS_PAGE_SIZE, filtered.length)} de ${filtered.length} purificadores`;

  // A counter card filters by its status, then brings the list into view.
  const filterByStatus = (status: StatusFilter) => {
    change({ status });
    setView("list");
    requestAnimationFrame(() => document.getElementById("lista-purificadores")?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  };

  return (
    <>
      <PurifiersKpis purifiers={purifiers} active={filters.status as StatusFilter} onSelect={filterByStatus} />
      <PurifiersFilters value={filters} onChange={change} models={models} places={places} view={view} onView={setView} />

      <div id="lista-purificadores" className="grid scroll-mt-4 items-start gap-4 @5xl:grid-cols-[minmax(0,1fr)_23.5rem]">
        <Card className="!p-4" container>
          {view === "list" ? (
            <>
              <PurifiersTable rows={rows} selectedId={selectedId} onSelect={setSelectedId} onMaintenance={setMaintenanceFor} />
              <Pagination page={current} pages={pages} onChange={setPage} summary={summary} className="mt-3" />
            </>
          ) : (
            <PurifiersMap purifiers={filtered} onPickCity={pickCity} activeCity={filters.place !== "all" ? filters.place.split(",")[0] : undefined} />
          )}
        </Card>

        {selected && <PurifierDetail key={selected.id} purifier={selected} requests={requests.filter((r) => r.serial === selected.serial)} onMaintenance={setMaintenanceFor} />}
      </div>

      <PurifierMaintenanceModal purifier={maintenanceFor} today={today} onClose={() => setMaintenanceFor(null)} onCreate={(request) => setRequests((list) => [request, ...list])} />
    </>
  );
}
