// components/mobile/sections/MobileFinanceSheet.tsx
"use client";

import { Download, Headset } from "lucide-react";
import { MobileButton, MobileButtonLink } from "@/components/mobile/ui/MobileButton";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";
import { useToast } from "@/components/providers/ToastProvider";
import { Badge } from "@/components/ui/Badge";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Money } from "@/components/ui/Money";
import { contract } from "@/config/investor";
import { downloadFile } from "@/lib/download";
import { formatCompetence, formatDate } from "@/lib/format";
import { formatPeriod } from "@/lib/mobile/format";
import { useHeld } from "@/lib/mobile/useHeld";
import type { Installment } from "@/lib/portal/schedule";
import { receiptText } from "@/lib/portal/statement";

/** Details of one payout; for a received one it also offers the receipt download. */
export function MobileFinanceSheet({ payment: current, onClose }: { payment: Installment | null; onClose: () => void }) {
  const toast = useToast();
  const payment = useHeld(current);
  const received = payment?.status === "received";

  const downloadReceipt = () => {
    if (!payment) return;
    const name = `comprovante-repasse-${String(payment.number).padStart(2, "0")}.txt`;
    downloadFile(name, receiptText(payment), "text/plain;charset=utf-8");
    toast({ title: "Comprovante baixado", description: name });
  };

  return (
    <MobileSheet
      open={!!current}
      onClose={onClose}
      title={received ? "Comprovante de repasse" : "Detalhes do pagamento"}
      description={payment ? `Parcela ${payment.number} de ${contract.installments} · ${formatCompetence(payment.year, payment.month)}` : undefined}
      footer={
        payment && (
          <div className="grid gap-2.5">
            {received ? (
              <MobileButton size="lg" full onClick={downloadReceipt}>
                <Download className="size-5" aria-hidden="true" />
                Baixar comprovante
              </MobileButton>
            ) : (
              <p className="rounded-[12px] bg-canvas/70 p-3 text-center text-[13.5px] text-ink-soft">O comprovante fica disponível assim que o repasse for efetuado.</p>
            )}
            <MobileButtonLink href={{ route: "support" }} variant="ghost" onClick={onClose}>
              <Headset className="size-5" aria-hidden="true" />
              Reportar um problema
            </MobileButtonLink>
          </div>
        )
      }
    >
      {payment && (
        <div className="grid gap-3">
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
              { label: "Período", value: `${formatPeriod(payment.periodStart, payment.periodEnd)} (${payment.days} dias)` },
              { label: "Data do pagamento", value: formatDate(payment.paymentDate) },
              { label: "Forma de pagamento", value: contract.paymentMethod },
              { label: "Contrato", value: contract.title },
            ]}
          />
        </div>
      )}
    </MobileSheet>
  );
}
