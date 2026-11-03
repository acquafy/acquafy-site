// components/sections/StatementReceiptModal.tsx
"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Modal } from "@/components/ui/Modal";
import { Money } from "@/components/ui/Money";
import { contract } from "@/config/investor";
import { formatCompetence, formatDate, formatDayMonth } from "@/lib/format";
import type { Installment } from "@/lib/portal/schedule";

/** Payment details; for received payments it doubles as a printable receipt ("Imprimir / salvar PDF"). */
export function StatementReceiptModal({ payment, onClose }: { payment: Installment | null; onClose: () => void }) {
  const received = payment?.status === "received";

  return (
    <Modal
      open={!!payment}
      onClose={onClose}
      printable
      title={received ? "Comprovante de repasse" : "Detalhes do pagamento"}
      description={payment ? `Parcela ${payment.number} de ${contract.installments} · ${formatCompetence(payment.year, payment.month)}` : undefined}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          {received && (
            <Button onClick={() => window.print()}>
              <Printer className="size-4" aria-hidden="true" />
              Imprimir / salvar PDF
            </Button>
          )}
        </>
      }
    >
      {payment && (
        <div className="space-y-4">
          <p className="flex items-center justify-between gap-3">
            <span className="tabular text-[30px] font-extrabold text-ink">
              <Money value={payment.amount} />
            </span>
            <Badge tone={received ? "ok" : "warn"} dot>
              {received ? "Recebido" : "Pendente"}
            </Badge>
          </p>
          <DefinitionList
            rows={[
              { label: "Competência", value: formatCompetence(payment.year, payment.month) },
              { label: "Período", value: `${formatDayMonth(payment.periodStart)} a ${formatDayMonth(payment.periodEnd)} (${payment.days} dias)` },
              { label: "Data do pagamento", value: formatDate(payment.paymentDate) },
              { label: "Forma de pagamento", value: contract.paymentMethod },
              { label: "Contrato", value: contract.title },
            ]}
          />
          {!received && <p className="rounded-lg bg-canvas p-3 text-[13.5px] text-ink-soft">O comprovante fica disponível assim que o repasse for efetuado.</p>}
        </div>
      )}
    </Modal>
  );
}
