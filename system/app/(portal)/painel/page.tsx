import Link from "next/link";
import { Building2, CalendarClock, ChevronRight, CircleCheck, CircleDollarSign, FilePlus2, UserPlus, UsersRound } from "lucide-react";
import { adminOverview } from "@/lib/live/admin";
import { money } from "@/lib/live/data";
import { PageHeader } from "@/components/live/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { KpiCard } from "@/components/ui/KpiCard";

export const metadata = { title: "Painel global" };

export default async function GlobalPanel() {
  const o = await adminOverview();
  const pending = o.queues.reduce((sum, q) => sum + q.count, 0);
  // What needs action comes first (the list is already ordered by urgency); empty queues are listed below, muted.
  const open = o.queues.filter((q) => q.count > 0);
  const clear = o.queues.filter((q) => q.count === 0);
  return (
    <>
      <PageHeader
        title="Painel global"
        subtitle="Todas as contas, investidores e pedidos da Acquafy."
        action={
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/parcerias?convidar=1" variant="outline">
              <UserPlus className="size-5" aria-hidden="true" />
              Convidar investidor
            </ButtonLink>
            <ButtonLink href="/parcerias" variant="outline">
              <FilePlus2 className="size-5" aria-hidden="true" />
              Ofertas
            </ButtonLink>
          </div>
        }
      />
      <div className="grid gap-4 @2xl:grid-cols-2 @5xl:grid-cols-4">
        <KpiCard icon={Building2} tone="blue" label="Contas" value={o.accounts} caption={o.suspended ? `${o.suspended} suspensas` : "Ver todas"} captionHref="/contas" />
        <KpiCard icon={UsersRound} tone="violet" label="Investidores ativos" value={o.investors} caption="Ver investidores" captionHref="/investidores?etapa=ativos" />
        <KpiCard icon={CircleDollarSign} tone="green" label="Investimento registrado" value={money(o.invested)} />
        <KpiCard icon={CalendarClock} tone={o.overdue ? "pink" : "orange"} label="Repasses programados" value={money(o.scheduled)} caption={o.overdue ? `${o.overdue} com vencimento passado` : "Nenhum com vencimento passado"} />
      </div>
      <Card title="O que precisa de ação" action={<Badge tone={pending ? "warn" : "ok"} dot>{pending ? `${pending} ${pending === 1 ? "pendência" : "pendências"}` : "Tudo em dia"}</Badge>}>
        {open.length === 0 ? (
          <p className="flex items-center gap-3 rounded-xl bg-ok-soft p-4 text-[14.5px] text-ink">
            <CircleCheck className="size-5 shrink-0 text-ok" aria-hidden="true" />
            Nenhuma pendência no momento. Tudo o que chega de novo aparece aqui.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {open.map((q) => (
              <li key={q.key}>
                <Link href={q.href} className="flex items-center gap-3 rounded-lg px-2 py-3 hover:bg-brand-soft/50 focus-visible:outline-2 focus-visible:outline-brand">
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold text-ink">{q.label}</span>
                    <span className="block text-[13.5px] text-ink-soft">{q.description}</span>
                  </span>
                  <Badge tone="warn">{q.count}</Badge>
                  <ChevronRight className="size-4 shrink-0 text-ink-mute" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        )}
        {clear.length > 0 && open.length > 0 && (
          <details className="mt-3 rounded-xl bg-canvas/60 px-4 py-3">
            <summary className="cursor-pointer text-[14px] font-semibold text-ink-soft focus-visible:outline-2 focus-visible:outline-brand">Sem pendências ({clear.length})</summary>
            <ul className="mt-2 grid gap-1.5">
              {clear.map((q) => (
                <li key={q.key}>
                  <Link href={q.href} className="text-[14px] text-ink-soft hover:text-brand hover:underline">
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        )}
      </Card>
      <p className="text-[13.5px] text-ink-soft">Valores em USD, conforme os registros publicados pela equipe. Um vencimento passado não confirma nem nega pagamento: a liquidação é registrada na conta.</p>
    </>
  );
}
