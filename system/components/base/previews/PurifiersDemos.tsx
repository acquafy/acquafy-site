// components/base/previews/PurifiersDemos.tsx
"use client";

import { useMemo, useState } from "react";
import { MobilePurifierDetailSheet } from "@/components/mobile/sections/MobilePurifierDetailSheet";
import { MobilePurifierMaintenanceSheet } from "@/components/mobile/sections/MobilePurifierMaintenanceSheet";
import { MobilePurifierRow } from "@/components/mobile/sections/MobilePurifierRow";
import { PurifierDetail } from "@/components/sections/PurifierDetail";
import { PurifierMaintenanceModal, type MaintenanceRequest } from "@/components/sections/PurifierMaintenanceModal";
import { PurifiersFilters, type PurifierFilters, type PurifierView } from "@/components/sections/PurifiersFilters";
import { PurifiersKpis, type StatusFilter } from "@/components/sections/PurifiersKpis";
import { PurifiersMap } from "@/components/sections/PurifiersMap";
import { PurifiersTable } from "@/components/sections/PurifiersTable";
import type { Purifier } from "@/config/investor";
import { locationLabel } from "@/lib/portal/purifiers";
import { OpenDemo } from "./OpenDemo";

/** Detail card of one unit; "Solicitar manutenção" opens the real modal and the request shows up in the card. */
export function PurifierDetailDemo({ purifier, today }: { purifier: Purifier; today: string }) {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [maintenanceFor, setMaintenanceFor] = useState<Purifier | null>(null);
  return (
    <div className="max-w-sm">
      <PurifierDetail purifier={purifier} requests={requests} onMaintenance={setMaintenanceFor} />
      <PurifierMaintenanceModal purifier={maintenanceFor} today={today} onClose={() => setMaintenanceFor(null)} onCreate={(r) => setRequests((list) => [r, ...list])} />
    </div>
  );
}

export function PurifierMaintenanceModalDemo({ purifier, today }: { purifier: Purifier; today: string }) {
  return <OpenDemo>{(open, setOpen) => <PurifierMaintenanceModal purifier={open ? purifier : null} today={today} onClose={() => setOpen(false)} onCreate={() => {}} />}</OpenDemo>;
}

export function PurifiersFiltersDemo({ purifiers }: { purifiers: Purifier[] }) {
  const [filters, setFilters] = useState<PurifierFilters>({ model: "all", status: "all", place: "all", query: "" });
  const [view, setView] = useState<PurifierView>("list");
  const models = useMemo(() => [...new Set(purifiers.map((p) => p.model))].map((m) => ({ value: m, label: m })), [purifiers]);
  const places = useMemo(() => [...new Set(purifiers.map(locationLabel))].map((l) => ({ value: l, label: l })), [purifiers]);
  return <PurifiersFilters value={filters} onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))} models={models} places={places} view={view} onView={setView} />;
}

export function PurifiersKpisDemo({ purifiers }: { purifiers: Purifier[] }) {
  const [active, setActive] = useState<StatusFilter>("all");
  return <PurifiersKpis purifiers={purifiers} active={active} onSelect={setActive} />;
}

export function PurifiersMapDemo({ purifiers }: { purifiers: Purifier[] }) {
  const [city, setCity] = useState<string | undefined>();
  return <PurifiersMap purifiers={purifiers} onPickCity={setCity} activeCity={city} />;
}

export function PurifiersTableDemo({ rows, today }: { rows: Purifier[]; today: string }) {
  const [selectedId, setSelectedId] = useState<number | null>(rows[0]?.id ?? null);
  const [maintenanceFor, setMaintenanceFor] = useState<Purifier | null>(null);
  return (
    <>
      <PurifiersTable rows={rows} selectedId={selectedId} onSelect={setSelectedId} onMaintenance={setMaintenanceFor} />
      <PurifierMaintenanceModal purifier={maintenanceFor} today={today} onClose={() => setMaintenanceFor(null)} onCreate={() => {}} />
    </>
  );
}

export function MobilePurifierDetailDemo({ purifier, today }: { purifier: Purifier; today: string }) {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [maintenanceFor, setMaintenanceFor] = useState<Purifier | null>(null);
  return (
    <OpenDemo app>
      {(open, setOpen) => (
        <>
          <MobilePurifierDetailSheet
            purifier={open ? purifier : null}
            requests={requests}
            onClose={() => setOpen(false)}
            onMaintenance={(p) => {
              setOpen(false);
              setMaintenanceFor(p);
            }}
          />
          <MobilePurifierMaintenanceSheet purifier={maintenanceFor} today={today} onClose={() => setMaintenanceFor(null)} onCreate={(r) => setRequests((list) => [r, ...list])} />
        </>
      )}
    </OpenDemo>
  );
}

export function MobilePurifierMaintenanceDemo({ purifier, today }: { purifier: Purifier; today: string }) {
  return <OpenDemo app>{(open, setOpen) => <MobilePurifierMaintenanceSheet purifier={open ? purifier : null} today={today} onClose={() => setOpen(false)} onCreate={() => {}} />}</OpenDemo>;
}

/** The row on its own; tapping it opens the detail sheet, as in the list. */
export function MobilePurifierRowDemo({ purifier, today }: { purifier: Purifier; today: string }) {
  const [selected, setSelected] = useState<Purifier | null>(null);
  const [maintenanceFor, setMaintenanceFor] = useState<Purifier | null>(null);
  return (
    <>
      <ul className="grid gap-2.5">
        <MobilePurifierRow purifier={purifier} onOpen={setSelected} />
      </ul>
      <MobilePurifierDetailSheet
        purifier={selected}
        requests={[]}
        onClose={() => setSelected(null)}
        onMaintenance={(p) => {
          setSelected(null);
          setMaintenanceFor(p);
        }}
      />
      <MobilePurifierMaintenanceSheet purifier={maintenanceFor} today={today} onClose={() => setMaintenanceFor(null)} onCreate={() => {}} />
    </>
  );
}
