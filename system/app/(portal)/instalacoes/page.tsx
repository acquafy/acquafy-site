import Link from "next/link";
import { notFound } from "next/navigation";
import { context } from "@/lib/live/data";
import { ActionDialog } from "@/components/enrollment/ActionDialog";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { DataTable } from "@/components/live/DataTable";
import { Field, Select } from "@/components/live/Fields";
import { PageHeader } from "@/components/live/PageHeader";
import { installationAction } from "@/lib/orders/followup";
import { windowLabel } from "@/lib/orders/tasks";

export const metadata = { title: "Instalações" };

const STATES = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"];

/** Staff: installation windows per state (customers book them after paying) and the bookings in each. */
export default async function Installations() {
  const ctx = await context();
  if (ctx.staff !== "admin") notFound();
  // eslint-disable-next-line react-hooks/purity -- rendered per request; shows windows from today on
  const since = new Date(Date.now() - 86400000).toISOString();
  const windows = await ctx.db.from("installation_windows").select("*").gte("starts_at", since).order("starts_at").limit(200);
  if (windows.error) throw Error("Agenda indisponível.");
  const bookings = await ctx.db.from("installation_bookings").select("order_id,window_id").in("window_id", windows.data.map((w) => w.id));
  if (bookings.error) throw Error("Agenda indisponível.");

  return (
    <>
      <PageHeader title="Instalações" subtitle="Publique janelas por estado. O cliente escolhe uma depois de pagar, com pelo menos 48 horas de antecedência." />
      <ActionForm action={installationAction} title="Nova janela de instalação" submit="Publicar janela">
        <input type="hidden" name="action" value="publish" />
        <div className="grid gap-3.5 @2xl:grid-cols-4">
          <Select name="region" label="Estado (UF)" defaultValue="SP" options={STATES.map((uf) => ({ value: uf, label: uf }))} />
          <Field name="date" label="Data" type="date" />
          <Select name="period" label="Período" options={[{ value: "manha", label: "Manhã · 08:00–12:00" }, { value: "tarde", label: "Tarde · 13:00–18:00" }]} />
          <Field name="capacity" label="Vagas" type="number" defaultValue="3" />
        </div>
      </ActionForm>
      <DataTable
        caption="Janelas de instalação a partir de hoje"
        title="Agenda"
        empty="Nenhuma janela publicada."
        columns={[{ heading: "Data e horário" }, { heading: "UF" }, { heading: "Agendados" }, { heading: "Pedidos", secondary: true }, { heading: "" }]}
        rows={windows.data.map((w) => {
          const orders = bookings.data.filter((b) => b.window_id === w.id);
          return [
            <span key="d" className={w.active ? "" : "text-ink-mute line-through"}>{windowLabel(w.starts_at, w.ends_at)}</span>,
            w.region,
            `${orders.length} de ${w.capacity}`,
            <span key="o" className="flex flex-wrap gap-2">
              {orders.map((b) => (
                <Link key={b.order_id} href={`/pedidos/${b.order_id}`} className="font-semibold text-brand hover:underline">
                  {b.order_id.slice(0, 8).toUpperCase()}
                </Link>
              ))}
            </span>,
            w.active ? (
              <ActionDialog key="c" action={installationAction} title="Fechar esta janela?" trigger="Fechar" submit="Fechar janela" triggerVariant="ghost" triggerSize="sm" size="sm" description="Ela deixa de aparecer para os clientes. Os agendamentos feitos continuam valendo.">
                <input type="hidden" name="action" value="close" />
                <input type="hidden" name="window_id" value={w.id} />
              </ActionDialog>
            ) : (
              "Fechada"
            ),
          ];
        })}
      />
    </>
  );
}
