// components/sections/DashboardContract.tsx
import { CalendarCheck, CalendarDays, FileText, RefreshCw } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { contract } from "@/config/investor";
import { formatDate } from "@/lib/format";
import { getPortalSummary } from "@/lib/portal/schedule";

const ICON = "size-5 shrink-0 text-brand";

export function DashboardContract() {
  const s = getPortalSummary();
  return (
    <Card title="Resumo do contrato" container className="h-full">
      <div className="grid items-start gap-4 @lg:grid-cols-[minmax(0,1fr)_11.5rem]">
        <DefinitionList
          rows={[
            { icon: <CalendarCheck className={ICON} aria-hidden="true" />, label: "Data de início", value: formatDate(contract.startDate) },
            { icon: <FileText className={ICON} aria-hidden="true" />, label: "Contrato padrão", value: `${contract.termMonths} meses` },
            { icon: <CalendarDays className={ICON} aria-hidden="true" />, label: "Próximo repasse", value: s.next ? formatDate(s.next.paymentDate) : "—" },
            { icon: <RefreshCw className={ICON} aria-hidden="true" />, label: "Recompra opcional", value: `${Math.round(contract.buybackShare * 100)}% do valor investido` },
          ]}
        />
        <div className="flex flex-col items-center gap-3 rounded-xl border border-line p-3 text-center @lg:order-last">
          <div aria-hidden="true" className="w-full rounded-md border border-line bg-card p-2.5">
            <p className="mb-2 text-left text-[8px] font-bold tracking-widest text-brand">ACQUAFY</p>
            {[88, 72, 80, 64, 76, 58].map((w, i) => (
              <span key={i} className="mb-1.5 block h-[3px] rounded-full bg-line" style={{ width: `${w}%` }} />
            ))}
          </div>
          <p className="text-[13px] leading-tight text-ink">{contract.title}</p>
          <ButtonLink href="/contrato" size="sm" className="w-full">
            Ver contrato
          </ButtonLink>
        </div>
      </div>
    </Card>
  );
}
