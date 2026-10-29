// components/sections/PurifierDetail.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { CalendarDays, FileText, History, Map as MapIcon, MapPin, UserRound, Wrench } from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { EmptyState } from "@/components/ui/EmptyState";
import { TabPanel, Tabs, type TabItem } from "@/components/ui/Tabs";
import { contract, type Purifier } from "@/config/investor";
import { formatDate } from "@/lib/format";
import { mapsUrl, reviewDate } from "@/lib/portal/purifiers";
import { MiniMap } from "./PurifiersMap";
import type { MaintenanceRequest } from "./PurifierMaintenanceModal";

type TabId = "overview" | "location" | "history" | "maintenance";

const TABS: TabItem<TabId>[] = [
  { id: "overview", label: "Visão Geral", icon: FileText },
  { id: "location", label: "Localização", icon: MapPin },
  { id: "history", label: "Histórico", icon: History },
  { id: "maintenance", label: "Manutenção", icon: Wrench },
];

type Props = {
  purifier: Purifier;
  requests: MaintenanceRequest[];
  onMaintenance: (p: Purifier) => void;
};

export function PurifierDetail({ purifier: p, requests, onMaintenance }: Props) {
  const [tab, setTab] = useState<TabId>("overview");
  const activation = p.activationDate;

  return (
    <aside aria-label={`Detalhes do purificador ${p.serial}`} className="card flex min-w-0 flex-col overflow-hidden @container">
      <div className="grid gap-3 p-4 @sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="grid min-h-44 place-items-center overflow-hidden rounded-lg bg-[radial-gradient(ellipse_at_50%_60%,var(--photo-a),var(--photo-b)_70%)] p-2">
          <Image src="/brand/neo-up.webp" alt={`Purificador ${p.model}`} width={420} height={536} sizes="160px" className="h-40 w-auto drop-shadow-lg" />
        </div>
        <div className="flex min-w-0 flex-col items-start gap-2">
          <div>
            <h3 className="text-[20px] leading-tight font-extrabold text-ink">{p.model}</h3>
            <p className="text-[13.5px] text-ink-soft">Purificador de Água</p>
          </div>
          <span className="tabular rounded-lg bg-brand-soft px-2 py-1 text-[12.5px] font-semibold text-brand">S/N: {p.serial}</span>
          <StatusBadge kind={p.status} />
          <ul className="mt-1 space-y-1.5 text-[13.5px] text-ink">
            <li className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-brand" aria-hidden="true" />
              {p.city}, {p.state}
            </li>
            <li className="flex items-center gap-2">
              <CalendarDays className="size-4 shrink-0 text-brand" aria-hidden="true" />
              {activation ? `Ativado em ${formatDate(activation)}` : "Ainda não ativado"}
            </li>
            <li className="flex items-center gap-2">
              <UserRound className="size-4 shrink-0 text-brand" aria-hidden="true" />
              {p.endCustomer ? "Cliente final" : "Sem cliente final"}
            </li>
          </ul>
        </div>
      </div>

      <Tabs variant="stack" idPrefix={`purifier-${p.id}`} label="Seções do purificador" items={TABS} value={tab} onChange={setTab} />

      <TabPanel idPrefix={`purifier-${p.id}`} value={tab} className="flex-1 p-4">
        {tab === "overview" && (
          <div className="grid items-start gap-4 @md:grid-cols-[minmax(0,1fr)_9rem]">
            <DefinitionList
              rows={[
                { label: "Modelo", value: p.model },
                { label: "Número de Série", value: p.serial },
                { label: "Data de Ativação", value: activation ? formatDate(activation) : "—" },
                { label: "Contrato", value: `${contract.termMonths} meses` },
                { label: "Próxima revisão", value: activation ? formatDate(reviewDate(activation)) : "—" },
              ]}
            />
            <MiniMap city={p.city} state={p.state} />
          </div>
        )}
        {tab === "location" && (
          <div className="grid items-start gap-4 @md:grid-cols-[minmax(0,12rem)_1fr]">
            <MiniMap city={p.city} state={p.state} />
            <p className="text-[14px] text-ink-soft">
              {p.status === "available"
                ? "Esta unidade está no estoque da Acquafy, aguardando instalação."
                : `Instalado em ${p.city}, ${p.state}. A localização exata é compartilhada apenas com a equipe técnica.`}
            </p>
          </div>
        )}
        {tab === "history" && (
          <ol className="space-y-3 text-[14px]">
            {activation ? (
              <>
                <li className="flex justify-between gap-3">
                  <span>Purificador ativado</span>
                  <time className="tabular font-semibold">{formatDate(activation)}</time>
                </li>
                <li className="flex justify-between gap-3 text-ink-soft">
                  <span>
                    Instalado em {p.city}, {p.state}
                  </span>
                  <time className="tabular">{formatDate(activation)}</time>
                </li>
              </>
            ) : (
              <li className="text-ink-soft">Disponível em estoque, aguardando instalação.</li>
            )}
          </ol>
        )}
        {tab === "maintenance" &&
          (requests.length === 0 ? (
            <EmptyState
              icon={Wrench}
              title="Nenhuma manutenção registrada"
              description="Se notar qualquer problema, abra uma solicitação."
              action={
                <Button variant="outline" size="sm" onClick={() => onMaintenance(p)} disabled={p.status === "available"}>
                  Solicitar manutenção
                </Button>
              }
            />
          ) : (
            <div className="space-y-3">
              <ul className="divide-y divide-line text-[14px]">
                {requests.map((r) => (
                  <li key={r.id} className="py-2.5">
                    <p className="flex justify-between gap-3 font-semibold text-ink">
                      {r.reason}
                      <time className="tabular text-[13px] font-medium text-ink-soft">{formatDate(r.createdAt)}</time>
                    </p>
                    <p className="text-ink-soft">{r.description}</p>
                  </li>
                ))}
              </ul>
              <Button variant="outline" size="sm" onClick={() => onMaintenance(p)}>
                Nova solicitação
              </Button>
            </div>
          ))}
      </TabPanel>

      <div className="grid gap-3 p-4 pt-0 @sm:grid-cols-2">
        <ButtonLink href="/contrato" variant="outline" size="sm">
          <FileText className="size-4" aria-hidden="true" />
          Ver contrato
        </ButtonLink>
        <ButtonLink href={mapsUrl(p)} external size="sm">
          <MapIcon className="size-4" aria-hidden="true" />
          Abrir no mapa
        </ButtonLink>
      </div>
    </aside>
  );
}
