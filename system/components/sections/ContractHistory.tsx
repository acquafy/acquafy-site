// components/sections/ContractHistory.tsx
"use client";

import { useState } from "react";
import { CircleCheck, FilePenLine, FileX2, RefreshCw, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { IconTile, type Tone } from "@/components/ui/KpiCard";
import { Tabs, TabPanel } from "@/components/ui/Tabs";
import { EVENT_FILTERS, type ContractEventKind } from "@/config/contract-page";
import { formatDate } from "@/lib/format";
import { useContract } from "./ContractProvider";

type Filter = (typeof EVENT_FILTERS)[number]["id"];

const KIND: Record<ContractEventKind, { icon: LucideIcon; tone: Tone }> = {
  marco: { icon: CircleCheck, tone: "green" },
  aditivo: { icon: FilePenLine, tone: "violet" },
  recompra: { icon: RefreshCw, tone: "blue" },
};

const EMPTY: Record<ContractEventKind, { title: string; description: string }> = {
  aditivo: { title: "Nenhum aditivo registrado", description: "Quando você solicitar uma alteração ao contrato, ela aparece aqui com o protocolo e a situação." },
  recompra: { title: "Nenhuma recompra solicitada", description: "Simule e solicite a recompra de unidades no simulador de recompra." },
  marco: { title: "Nenhum marco registrado", description: "Os marcos do contrato aparecem aqui." },
};

/**"Aditivos e histórico" tab: every event of the contract, filterable by kind. */
export function ContractHistory() {
  const { events, openAmendment } = useContract();
  const [filter, setFilter] = useState<Filter>("todos");
  const shown = events.filter((e) => filter === "todos" || e.kind === filter);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Tabs
          items={EVENT_FILTERS.map((f) => ({ id: f.id, label: f.label, count: f.id === "todos" ? events.length : events.filter((e) => e.kind === f.id).length }))}
          value={filter}
          onChange={setFilter}
          label="Filtrar histórico do contrato"
          idPrefix="contract-history"
          variant="segment"
          className="w-full @[560px]:w-auto"
        />
        <Button variant="soft" size="sm" onClick={openAmendment}>
          <FilePenLine className="size-4" aria-hidden="true" />
          Solicitar aditivo
        </Button>
      </div>

      <TabPanel idPrefix="contract-history" value={filter}>
        {shown.length === 0 && filter !== "todos" ? (
          <EmptyState
            icon={FileX2}
            title={EMPTY[filter].title}
            description={EMPTY[filter].description}
            action={
              filter === "aditivo" ? (
                <Button size="sm" onClick={openAmendment}>
                  <FilePenLine className="size-4" aria-hidden="true" />
                  Solicitar aditivo
                </Button>
              ) : filter === "recompra" ? (
                <ButtonLink href="#recompra" size="sm" variant="outline">
                  Ir ao simulador de recompra
                </ButtonLink>
              ) : undefined
            }
          />
        ) : (
          <ol aria-label="Eventos do contrato" className="flex flex-col gap-2.5">
            {shown.map((e) => {
              const k = KIND[e.kind];
              const done = e.status === "Concluído";
              return (
                <li key={e.id} className="flex items-start gap-3 rounded-xl border border-line/80 p-3.5">
                  <IconTile icon={k.icon} tone={k.tone} className="size-11" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] leading-snug font-bold text-ink">{e.title}</p>
                    <p className="text-[14px] leading-snug text-ink-soft">{e.description}</p>
                    {e.protocol && <p className="tabular mt-1 text-[12.5px] text-ink-mute">Protocolo {e.protocol}</p>}
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className="tabular text-[13.5px] text-ink-soft">{formatDate(e.date)}</span>
                    <Badge tone={done ? "ok" : "warn"} dot={!done} icon={done ? CircleCheck : undefined}>
                      {e.status}
                    </Badge>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </TabPanel>
    </div>
  );
}
