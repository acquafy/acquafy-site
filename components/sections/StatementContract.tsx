// components/sections/StatementContract.tsx
import { CalendarCheck, ChartNoAxesColumn, Clock3, FileText, RefreshCw, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { contract } from "@/config/investor";
import { formatDate } from "@/lib/format";
import { getPortalSummary } from "@/lib/portal/schedule";

const ICON = "size-5 shrink-0 text-brand";

export function StatementContract() {
  const s = getPortalSummary();
  return (
    <Card title="Resumo do Contrato">
      <DefinitionList
        rows={[
          { icon: <CalendarCheck className={ICON} aria-hidden="true" />, label: "Data de início", value: formatDate(contract.startDate) },
          { icon: <FileText className={ICON} aria-hidden="true" />, label: "Contrato padrão", value: `${contract.termMonths} meses` },
          { icon: <ChartNoAxesColumn className={ICON} aria-hidden="true" />, label: "Total de parcelas", value: s.installments.length },
          { icon: <CalendarCheck className={ICON} aria-hidden="true" />, label: "Parcelas recebidas", value: s.receivedCount },
          { icon: <Clock3 className={ICON} aria-hidden="true" />, label: "Parcelas restantes", value: s.remainingCount },
          { icon: <ShieldCheck className={ICON} aria-hidden="true" />, label: "Próxima revisão", value: formatDate(contract.nextReview) },
          { icon: <RefreshCw className={ICON} aria-hidden="true" />, label: "Recompra opcional", value: `${Math.round(contract.buybackShare * 100)}% do valor investido` },
        ]}
      />
      <ButtonLink href="/contrato" className="mt-4 w-full">
        <FileText className="size-5" aria-hidden="true" />
        Ver contrato completo
      </ButtonLink>
    </Card>
  );
}
