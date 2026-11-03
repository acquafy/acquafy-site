// components/sections/RequestHistory.tsx
"use client";

import { useState } from "react";
import { ClipboardList, Copy, Eye, XCircle } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { EmptyState } from "@/components/ui/EmptyState";
import { Menu, type MenuItem } from "@/components/ui/Menu";
import { Modal } from "@/components/ui/Modal";
import { Money } from "@/components/ui/Money";
import { Pagination } from "@/components/ui/Pagination";
import { PAYMENT_OPTIONS, PRODUCT, REQUEST_STATUS, REQUEST_TEXT, type PortalRequest } from "@/config/request-page";
import { formatDate } from "@/lib/format";
import { projectRequest, type ProjectionBaseline } from "@/lib/portal/projection";

const PAGE_SIZE = 6;

type Props = { requests: PortalRequest[]; baseline: ProjectionBaseline; onCancel: (id: string) => void };

export function RequestStatusBadge({ status }: { status: PortalRequest["status"] }) {
  const s = REQUEST_STATUS[status];
  return (
    <Badge tone={s.tone} icon={s.icon}>
      {s.label}
    </Badge>
  );
}

export function RequestHistory({ requests, baseline, onCancel }: Props) {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [cancelId, setCancelId] = useState<string | null>(null);

  const pages = Math.max(1, Math.ceil(requests.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = requests.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const detail = requests.find((r) => r.id === detailId) ?? null;
  const toCancel = requests.find((r) => r.id === cancelId) ?? null;

  const copy = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      toast({ title: "Protocolo copiado", description: id });
    } catch {
      toast({ title: "Não foi possível copiar", description: `Anote o protocolo ${id}.`, tone: "error" });
    }
  };

  const menuItems = (r: PortalRequest): MenuItem[] => [
    { label: "Ver detalhes", icon: Eye, onSelect: () => setDetailId(r.id) },
    { label: "Copiar protocolo", icon: Copy, onSelect: () => void copy(r.id) },
    { label: "Cancelar solicitação", icon: XCircle, tone: "danger", separatorBefore: true, disabled: r.status !== "review", onSelect: r.status === "review" ? () => setCancelId(r.id) : undefined },
  ];

  const confirmCancel = () => {
    if (!toCancel) return;
    onCancel(toCancel.id);
    toast({ title: "Solicitação cancelada", description: `${toCancel.id} foi cancelada.` });
    setCancelId(null);
    setDetailId(null);
  };

  const detailProjection = detail ? projectRequest(detail.quantity, { ...baseline, unitPrice: detail.unitPrice }) : null;

  return (
    <Card id="minhas-solicitacoes" container title="Minhas solicitações" action={<p className="tabular text-[14px] text-ink-soft">{requests.length} no total</p>}>
      {requests.length === 0 ? (
        <EmptyState icon={ClipboardList} title={REQUEST_TEXT.historyEmpty} description="Quando você enviar uma solicitação, ela aparece aqui com o andamento." />
      ) : (
        <>
          <div className="rounded-lg border border-line">
            <table className="w-full text-left text-[14px]">
              <caption className="sr-only">Solicitações de purificadores</caption>
              <thead>
                <tr className="bg-canvas/70 text-[12.5px] font-bold text-ink">
                  <th scope="col" className="rounded-tl-xl px-3 py-2.5">
                    Protocolo
                  </th>
                  <th scope="col" className="hidden px-3 py-2.5 @[560px]:table-cell">
                    Data
                  </th>
                  <th scope="col" className="hidden px-3 py-2.5 @[460px]:table-cell">
                    Qtd.
                  </th>
                  <th scope="col" className="px-3 py-2.5">
                    Valor
                  </th>
                  <th scope="col" className="hidden px-3 py-2.5 @[900px]:table-cell">
                    Destino
                  </th>
                  <th scope="col" className="px-3 py-2.5">
                    Status
                  </th>
                  <th scope="col" className="rounded-tr-xl px-3 py-2.5 text-right">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => (
                  <tr key={r.id} className="border-t border-line/70">
                    <th scope="row" className="tabular px-3 py-2.5 font-bold whitespace-nowrap text-ink">
                      {r.id}
                    </th>
                    <td className="tabular hidden px-3 py-2.5 whitespace-nowrap @[560px]:table-cell">{formatDate(r.createdAt)}</td>
                    <td className="tabular hidden px-3 py-2.5 @[460px]:table-cell">{r.quantity}</td>
                    <td className="tabular px-3 py-2.5 font-medium whitespace-nowrap">
                      <Money value={r.quantity * r.unitPrice} />
                    </td>
                    <td className="hidden max-w-[16rem] px-3 py-2.5 @[900px]:table-cell">
                      <span className="block truncate" title={r.location}>
                        {r.location}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <RequestStatusBadge status={r.status} />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex justify-end">
                        <Menu label={`Ações da solicitação ${r.id}`} items={menuItems(r)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {pages > 1 && (
            <Pagination
              className="mt-3"
              page={current}
              pages={pages}
              onChange={setPage}
              summary={`Exibindo ${(current - 1) * PAGE_SIZE + 1}–${Math.min(current * PAGE_SIZE, requests.length)} de ${requests.length} solicitações`}
            />
          )}
        </>
      )}

      <Modal
        open={!!detail}
        onClose={() => setDetailId(null)}
        title={detail ? `Solicitação ${detail.id}` : "Solicitação"}
        description="Detalhes e andamento do pedido de purificadores."
        footer={
          <>
            {detail?.status === "review" && (
              <Button variant="danger" onClick={() => setCancelId(detail.id)}>
                Cancelar solicitação
              </Button>
            )}
            <Button variant="primary" onClick={() => setDetailId(null)}>
              Fechar
            </Button>
          </>
        }
      >
        {detail && detailProjection && (
          <DefinitionList
            rows={[
              { label: "Status", value: <RequestStatusBadge status={detail.status} /> },
              { label: "Data da solicitação", value: formatDate(detail.createdAt) },
              { label: "Modelo", value: PRODUCT.name },
              { label: "Quantidade", value: `${detail.quantity} ${detail.quantity === 1 ? "unidade" : "unidades"}` },
              { label: "Preço por unidade", value: <Money value={detail.unitPrice} /> },
              { label: "Valor total", value: <Money value={detail.quantity * detail.unitPrice} /> },
              { label: "Instalação", value: <span className="block font-semibold break-words whitespace-normal">{detail.location}</span> },
              { label: "Pagamento", value: PAYMENT_OPTIONS.find((o) => o.value === detail.payment)?.label ?? "" },
              { label: "Repasse mensal projetado", value: <Money value={detailProjection.monthlyPayout} /> },
            ]}
          />
        )}
      </Modal>

      <Modal
        open={!!toCancel}
        onClose={() => setCancelId(null)}
        size="sm"
        title="Cancelar solicitação?"
        description={toCancel ? `A solicitação ${toCancel.id} será cancelada. Essa ação não pode ser desfeita.` : undefined}
        footer={
          <>
            <Button variant="outline" onClick={() => setCancelId(null)}>
              Manter solicitação
            </Button>
            <Button variant="danger" onClick={confirmCancel}>
              Cancelar solicitação
            </Button>
          </>
        }
      >
        {toCancel && (
          <p className="text-[14.5px] text-ink-soft">
            Pedido de {toCancel.quantity} {toCancel.quantity === 1 ? "purificador" : "purificadores"} no valor de{" "}
            <strong className="text-ink">
              <Money value={toCancel.quantity * toCancel.unitPrice} />
            </strong>
            . Como ainda está em análise, nenhum pagamento é devido.
          </p>
        )}
      </Modal>
    </Card>
  );
}
