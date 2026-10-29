// components/sections/CalendarContract.tsx
import { CalendarCheck, CalendarDays, CircleCheck, Clock3, FileText, Layers, ReceiptText } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { contract } from "@/config/investor";
import { formatDate } from "@/lib/format";
import { getPortalSummary } from "@/lib/portal/schedule";
import { CalendarExportButton } from "./CalendarExportButton";

const ICON = "size-5 shrink-0 text-brand";

export function CalendarContract() {
  const s = getPortalSummary();
  return (
    <Card title="Visão do Contrato">
      <DefinitionList
        rows={[
          { icon: <CalendarCheck className={ICON} aria-hidden="true" />, label: "Data de início", value: formatDate(contract.startDate) },
          { icon: <FileText className={ICON} aria-hidden="true" />, label: "Prazo total", value: `${contract.termMonths} meses` },
          { icon: <Layers className={ICON} aria-hidden="true" />, label: "Parcelas totais", value: s.installments.length },
          { icon: <CircleCheck className={ICON} aria-hidden="true" />, label: "Parcelas recebidas", value: s.receivedCount },
          { icon: <Clock3 className={ICON} aria-hidden="true" />, label: "Parcelas restantes", value: s.remainingCount },
          { icon: <CalendarDays className={ICON} aria-hidden="true" />, label: "Término do contrato", value: formatDate(contract.endDate) },
        ]}
      />
      <div className="mt-4 grid gap-3 @sm:grid-cols-2">
        <CalendarExportButton installments={s.installments} />
        <ButtonLink href="/extrato" size="sm">
          <ReceiptText className="size-4" aria-hidden="true" />
          Ver Extrato Completo
        </ButtonLink>
      </div>
    </Card>
  );
}
