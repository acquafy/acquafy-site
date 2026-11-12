import Link from "next/link";
import { Building2, CalendarClock, ChevronRight, CircleDollarSign, UsersRound } from "lucide-react";
import { adminOverview } from "@/lib/live/admin";
import { money } from "@/lib/live/data";
import { PageHeader } from "@/components/live/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { KpiCard } from "@/components/ui/KpiCard";

export const metadata = { title: "Painel global" };

export default async function GlobalPanel() {
  const o = await adminOverview();
  const pending = o.queues.reduce((sum, q) => sum + q.count, 0);
  return (
    <>
      <PageHeader title="Painel global" subtitle="Todas as contas, investidores e pedidos da Acquafy." />
      <div className="grid gap-4 @2xl:grid-cols-2 @5xl:grid-cols-4">
        <KpiCard icon={Building2} tone="blue" label="Contas" value={o.accounts} caption={o.suspended ? `${o.suspended} suspensas` : "Ver todas"} captionHref="/contas" />
        <KpiCard icon={UsersRound} tone="violet" label="Investidores ativos" value={o.investors} caption="Ver investidores" captionHref="/investidores?etapa=ativos" />
        <KpiCard icon={CircleDollarSign} tone="green" label="Investimento registrado" value={money(o.invested)} />
        <KpiCard icon={CalendarClock} tone={o.overdue ? "pink" : "orange"} label="Repasses programados" value={money(o.scheduled)} caption={o.overdue ? `${o.overdue} com vencimento passado` : "Nenhum com vencimento passado"} />
      </div>
      <Card title="O que precisa de ação" action={<Badge tone={pending ? "warn" : "ok"} dot>{pending ? `${pending} pendências` : "Tudo em dia"}</Badge>}>
        <ul className="divide-y divide-line">
          {o.queues.map((q) => (
            <li key={q.key}>
              <Link href={q.href} className="flex items-center gap-3 rounded-lg px-2 py-3 hover:bg-brand-soft/50 focus-visible:outline-2 focus-visible:outline-brand">
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-bold text-ink">{q.label}</span>
                  <span className="block text-[13.5px] text-ink-soft">{q.description}</span>
                </span>
                <Badge tone={q.count ? "warn" : "neutral"}>{q.count}</Badge>
                <ChevronRight className="size-4 shrink-0 text-ink-mute" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Card>
      <p className="text-[13.5px] text-ink-soft">Valores em USD, conforme os registros publicados pela equipe. Um vencimento passado não confirma nem nega pagamento: a liquidação é registrada na conta.</p>
    </>
  );
}
