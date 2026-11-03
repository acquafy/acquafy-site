// components/mobile/sections/MobileRequestHistory.tsx
"use client";

import { useState } from "react";
import { ClipboardList, Copy, XCircle } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileConfirmSheet } from "@/components/mobile/ui/MobileConfirmSheet";
import { MobileEmptyState } from "@/components/mobile/ui/MobileEmptyState";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";
import { useToast } from "@/components/providers/ToastProvider";
import { Badge } from "@/components/ui/Badge";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Money } from "@/components/ui/Money";
import { PAYMENT_OPTIONS, PRODUCT, REQUEST_STATUS, REQUEST_TEXT, type PortalRequest } from "@/config/request-page";
import { copyText } from "@/lib/fileActions";
import { formatDate } from "@/lib/format";
import { useHeld } from "@/lib/mobile/useHeld";
import { projectRequest, type ProjectionBaseline } from "@/lib/portal/projection";

function StatusBadge({ status }: { status: PortalRequest["status"] }) {
  const s = REQUEST_STATUS[status];
  return (
    <Badge tone={s.tone} icon={s.icon}>
      {s.label}
    </Badge>
  );
}

type Props = { requests: PortalRequest[]; baseline: ProjectionBaseline; onCancel: (id: string) => void };

/** "Minhas solicitações": one row per request; tap for details, copy the protocol or cancel while it is under review. */
export function MobileRequestHistory({ requests, baseline, onCancel }: Props) {
  const toast = useToast();
  const [detailId, setDetailId] = useState<string | null>(null);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const detail = useHeld(requests.find((r) => r.id === detailId) ?? null);
  const toCancel = useHeld(requests.find((r) => r.id === cancelId) ?? null);
  const projection = detail ? projectRequest(detail.quantity, { ...baseline, unitPrice: detail.unitPrice }) : null;

  const copy = async (id: string) => {
    const ok = await copyText(id);
    toast(ok ? { title: "Protocolo copiado", description: id } : { title: "Não foi possível copiar", description: `Anote o protocolo ${id}.`, tone: "error" });
  };

  const confirmCancel = () => {
    if (!toCancel) return;
    onCancel(toCancel.id);
    toast({ title: "Solicitação cancelada", description: `${toCancel.id} foi cancelada.` });
    setCancelId(null);
    setDetailId(null);
  };

  return (
    <section id="minhas-solicitacoes" aria-label="Minhas solicitações" className="grid grid-cols-[minmax(0,1fr)] gap-2.5">
      <div className="flex items-baseline justify-between px-1">
        <h2 className="text-[18px] font-bold tracking-tight text-ink">Minhas solicitações</h2>
        <p className="tabular text-[13.5px] text-ink-soft">{requests.length} no total</p>
      </div>
      {requests.length === 0 ? (
        <MobileEmptyState icon={ClipboardList} title={REQUEST_TEXT.historyEmpty} description="Quando você enviar uma solicitação, ela aparece aqui com o andamento." />
      ) : (
        <ul className="grid gap-2.5">
          {requests.map((r) => (
            <li key={r.id} className="min-w-0">
              <button
                type="button"
                onClick={() => setDetailId(r.id)}
                aria-label={`Solicitação ${r.id}, ${REQUEST_STATUS[r.status].label}. Abrir detalhes`}
                className="flex min-h-[72px] w-full items-center gap-3 rounded-[14px] bg-card p-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:bg-brand-soft/60"
              >
                <span className="min-w-0 flex-1">
                  <span className="tabular block text-[15px] font-bold text-ink">{r.id}</span>
                  <span className="tabular block text-[13px] text-ink-soft">
                    {formatDate(r.createdAt)} · {r.quantity} {r.quantity === 1 ? "unidade" : "unidades"}
                  </span>
                  <span className="block truncate text-[13px] text-ink-soft">{r.location}</span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="tabular text-[15px] font-bold text-ink">
                    <Money value={r.quantity * r.unitPrice} whole />
                  </span>
                  <StatusBadge status={r.status} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <MobileSheet
        open={!!detailId}
        onClose={() => setDetailId(null)}
        size="full"
        title={detail?.id ?? "Solicitação"}
        description={detail ? `Enviada em ${formatDate(detail.createdAt)}` : undefined}
        footer={
          detail && (
            <div className="grid grid-cols-2 gap-2.5">
              <MobileButton variant="secondary" onClick={() => void copy(detail.id)}>
                <Copy className="size-[18px]" aria-hidden="true" />
                Copiar protocolo
              </MobileButton>
              <MobileButton variant="danger" disabled={detail.status !== "review"} onClick={() => setCancelId(detail.id)}>
                <XCircle className="size-[18px]" aria-hidden="true" />
                Cancelar
              </MobileButton>
            </div>
          )
        }
      >
        {detail && projection && (
          <div className="grid gap-3">
            <p className="flex items-center justify-between gap-3">
              <span className="tabular text-[28px] font-extrabold text-ink">
                <Money value={detail.quantity * detail.unitPrice} />
              </span>
              <StatusBadge status={detail.status} />
            </p>
            <DefinitionList
              rows={[
                { label: "Modelo", value: PRODUCT.name },
                { label: "Quantidade", value: `${detail.quantity} ${detail.quantity === 1 ? "unidade" : "unidades"}` },
                { label: "Destino", value: <span className="block text-right whitespace-normal">{detail.location}</span> },
                { label: "Pagamento", value: <span className="block text-right whitespace-normal">{PAYMENT_OPTIONS.find((o) => o.value === detail.payment)?.label}</span> },
                { label: "Repasse adicional", value: <Money value={projection.monthlyPayout} /> },
              ]}
            />
            {detail.status !== "review" && <p className="rounded-[12px] bg-canvas/70 p-3 text-[13.5px] text-ink-soft">Só é possível cancelar solicitações que ainda estão em análise.</p>}
          </div>
        )}
      </MobileSheet>
      <MobileConfirmSheet
        open={!!cancelId}
        title="Cancelar solicitação?"
        description={toCancel ? `${toCancel.id} será cancelada e não poderá ser reativada.` : undefined}
        confirmLabel="Cancelar solicitação"
        danger
        onConfirm={confirmCancel}
        onCancel={() => setCancelId(null)}
      />
    </section>
  );
}
