// components/mobile/sections/MobileContractDetails.tsx
"use client";

import { useState } from "react";
import { BadgeCheck, Building2, CircleCheck, Copy, Download, FilePenLine, FileText, FileX2, Fingerprint, History, ListChecks, PenLine, RefreshCw, UserRound, type LucideIcon } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileCard } from "@/components/mobile/ui/MobileCard";
import { MobileChip, MobileChipRow } from "@/components/mobile/ui/MobileChip";
import { MobileDisclosureGroup } from "@/components/mobile/ui/MobileDisclosure";
import { MobileEmptyState } from "@/components/mobile/ui/MobileEmptyState";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Badge } from "@/components/ui/Badge";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { IconTile, type Tone } from "@/components/ui/KpiCard";
import { Money } from "@/components/ui/Money";
import { clauses, CONTRACT_NUMBER, COUNTERPARTY, DOCUMENT_HASH, EVENT_FILTERS, SIGNATURE_PDF, signatures, type ContractEvent, type ContractEventKind } from "@/config/contract-page";
import { contract } from "@/config/investor";
import { copyText, downloadFromUrl } from "@/lib/fileActions";
import { formatDate } from "@/lib/format";

type TabId = "resumo" | "clausulas" | "historico" | "assinatura";

const TABS: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "resumo", label: "Resumo", icon: FileText },
  { id: "clausulas", label: "Cláusulas", icon: ListChecks },
  { id: "historico", label: "Histórico", icon: History },
  { id: "assinatura", label: "Assinatura", icon: PenLine },
];

const KIND: Record<ContractEventKind, { icon: LucideIcon; tone: Tone }> = {
  marco: { icon: CircleCheck, tone: "green" },
  aditivo: { icon: FilePenLine, tone: "violet" },
  recompra: { icon: RefreshCw, tone: "blue" },
};

type Props = { units: number; invested: number; installments: number; firstPayout: string; receivedCount: number; events: ContractEvent[]; onAmendment: () => void };

/** Resumo / Cláusulas / Histórico / Assinatura of the contract, switched by chips. */
export function MobileContractDetails({ units, invested, installments, firstPayout, receivedCount, events, onAmendment }: Props) {
  const toast = useToast();
  const { profile } = useProfile();
  const [tab, setTab] = useState<TabId>("resumo");
  const [filter, setFilter] = useState<(typeof EVENT_FILTERS)[number]["id"]>("todos");
  const shown = events.filter((e) => filter === "todos" || e.kind === filter);

  const copyHash = async () => {
    const ok = await copyText(DOCUMENT_HASH);
    toast(
      ok
        ? { title: "Hash copiado", description: "O hash do documento está na área de transferência." }
        : { tone: "error", title: "Não foi possível copiar", description: "O navegador bloqueou a área de transferência." },
    );
  };

  return (
    <section aria-label="Detalhes do contrato" className="grid grid-cols-[minmax(0,1fr)] gap-3">
      <MobileChipRow label="Seções do contrato">
        {TABS.map((t) => (
          <MobileChip key={t.id} icon={t.icon} selected={tab === t.id} onClick={() => setTab(t.id)}>
            {t.label}
          </MobileChip>
        ))}
      </MobileChipRow>

      {tab === "resumo" && (
        <MobileCard padding="none" className="px-4 py-1">
          <DefinitionList
            rows={[
              { label: "Número do contrato", value: CONTRACT_NUMBER },
              {
                label: "Situação",
                value: (
                  <Badge tone="ok" dot>
                    Ativo
                  </Badge>
                ),
              },
              { label: "Contratada", value: COUNTERPARTY },
              { label: "Data de início", value: formatDate(contract.startDate) },
              { label: "Término", value: formatDate(contract.endDate) },
              { label: "Prazo", value: `${contract.termMonths} meses` },
              { label: "Próxima revisão", value: formatDate(contract.nextReview) },
              { label: "Unidades", value: `${units} Neo UP` },
              { label: "Investimento total", value: <Money value={invested} /> },
              { label: "Valor de cada parcela", value: <Money value={contract.installmentValue} /> },
              { label: "Parcelas (recebidas/total)", value: `${receivedCount}/${installments}` },
              { label: "Primeiro repasse", value: formatDate(firstPayout) },
              { label: "Participação no Lease", value: `${Math.round(contract.leaseShare * 100)}%` },
              { label: "Recompra opcional", value: `${Math.round(contract.buybackShare * 100)}% do investido` },
              { label: "Forma de pagamento", value: contract.paymentMethod },
            ]}
          />
        </MobileCard>
      )}

      {tab === "clausulas" && <MobileDisclosureGroup label="Cláusulas do contrato" items={clauses.map((c) => ({ id: c.id, title: c.title, content: c.body }))} />}

      {tab === "historico" && (
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <MobileChipRow label="Filtrar histórico" className="flex-1">
              {EVENT_FILTERS.map((f) => (
                <MobileChip key={f.id} selected={filter === f.id} count={f.id === "todos" ? events.length : events.filter((e) => e.kind === f.id).length} onClick={() => setFilter(f.id)}>
                  {f.label}
                </MobileChip>
              ))}
            </MobileChipRow>
          </div>
          <MobileButton variant="soft" onClick={onAmendment}>
            <FilePenLine className="size-[18px]" aria-hidden="true" />
            Solicitar aditivo
          </MobileButton>
          {shown.length === 0 ? (
            <MobileEmptyState icon={FileX2} title="Nada registrado nesse filtro" description="Quando você solicitar um aditivo ou uma recompra, ele aparece aqui com o protocolo." />
          ) : (
            <ol aria-label="Eventos do contrato" className="grid gap-2.5">
              {shown.map((e) => {
                const k = KIND[e.kind];
                const done = e.status === "Concluído";
                return (
                  <li key={e.id} className="flex items-start gap-3 rounded-[14px] bg-card p-3.5">
                    <IconTile icon={k.icon} tone={k.tone} className="size-10" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] leading-snug font-bold text-ink">{e.title}</p>
                      <p className="text-[13.5px] leading-snug text-ink-soft">{e.description}</p>
                      {e.protocol && <p className="tabular mt-1 text-[12.5px] text-ink-mute">Protocolo {e.protocol}</p>}
                      <p className="mt-1.5 flex flex-wrap items-center gap-2">
                        <span className="tabular text-[13px] text-ink-soft">{formatDate(e.date)}</span>
                        <Badge tone={done ? "ok" : "warn"} dot={!done} icon={done ? CircleCheck : undefined}>
                          {e.status}
                        </Badge>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      )}

      {tab === "assinatura" && (
        <div className="grid gap-3">
          {signatures.map((sig) => {
            const mine = sig.signer === null;
            return (
              <article key={sig.party} className="flex items-start gap-3 rounded-[14px] bg-card p-3.5">
                <IconTile icon={mine ? UserRound : Building2} tone={mine ? "blue" : "violet"} className="size-11" />
                <div className="min-w-0 flex-1 leading-snug">
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <h3 className="text-[15.5px] font-bold text-ink">{sig.party}</h3>
                    <Badge tone="ok" icon={BadgeCheck}>
                      Assinado
                    </Badge>
                  </div>
                  <p className="text-[14.5px] text-ink">{mine ? profile.name : sig.signer}</p>
                  <p className="text-[13.5px] text-ink-soft">{sig.role}</p>
                  <p className="tabular text-[12.5px] text-ink-mute">
                    {formatDate(sig.date)} às {sig.time} · IP {sig.ip}
                  </p>
                </div>
              </article>
            );
          })}
          <div className="rounded-[14px] bg-canvas/70 p-3.5">
            <p className="flex items-center gap-2 text-[13.5px] font-semibold text-ink">
              <Fingerprint className="size-5 text-brand" aria-hidden="true" />
              Hash do documento (SHA-256)
            </p>
            <code className="mt-2 block rounded-[10px] bg-card px-3 py-2 font-mono text-[12px] leading-relaxed break-all text-ink">{DOCUMENT_HASH}</code>
            <div className="mt-2 flex flex-wrap gap-2">
              <MobileButton variant="soft" size="sm" onClick={copyHash}>
                <Copy className="size-4" aria-hidden="true" />
                Copiar hash
              </MobileButton>
            </div>
            <p className="mt-2 text-[12.5px] text-ink-soft">Qualquer alteração no contrato muda este código, o que invalida a assinatura.</p>
          </div>
          <MobileButton
            variant="secondary"
            size="lg"
            full
            onClick={() => {
              downloadFromUrl(SIGNATURE_PDF.href, SIGNATURE_PDF.filename);
              toast({ title: "Download iniciado", description: SIGNATURE_PDF.filename });
            }}
          >
            <Download className="size-5" aria-hidden="true" />
            Baixar comprovante de assinatura
          </MobileButton>
        </div>
      )}
    </section>
  );
}
