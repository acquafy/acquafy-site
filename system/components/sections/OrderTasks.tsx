import { Check, Clock, Circle } from "lucide-react";
import { ActionDialog } from "@/components/enrollment/ActionDialog";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { Field } from "@/components/live/Fields";
import { OrderAddress, OrderPhone } from "@/components/sections/OrderAddress";
import { OrderPaymentMethod } from "@/components/sections/OrderPaymentMethod";
import { parceladoAvailable } from "@/lib/orders/checkout";
import { storedCountry } from "@/lib/orders/address-formats";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { orderAction } from "@/lib/orders/actions";
import { installationAction, tradeInAction, updateDelivery } from "@/lib/orders/followup";
import { formatMinor, type OrderCurrency } from "@/lib/orders/pricing";
import { windowLabel, type OrderTask } from "@/lib/orders/tasks";

type Payment = { id: string; kind: "fee" | "balance"; status: string; amount_minor: number };
type Window = { id: string; starts_at: string; ends_at: string; free: number };

const ICON = { done: Check, todo: Circle, waiting: Clock, later: Circle } as const;
const STATE_LABEL = { done: "Feito", todo: "A fazer", waiting: "Com a Acquafy", later: "Depois" } as const;

/**
 * Order page, "Próximos passos": every task of the order with its state, and the action of the task to do now
 * (pay the fee or the balance, correct the address, open the lease, book or move the installation, set up the app).
 */
export function OrderTasks({
  orderId,
  tasks,
  currency,
  payments,
  delivery,
  owner,
  windows,
  canRebook,
  tradeIn,
}: {
  orderId: string;
  tasks: OrderTask[];
  currency: OrderCurrency;
  payments: Payment[];
  delivery: Record<string, string>;
  owner: boolean;
  windows: Window[];
  canRebook: boolean;
  /** The trade-in can be added or removed until Acquafy confirms the order. */
  tradeIn: { editable: boolean; declared: boolean };
}) {
  const fee = payments.find((p) => p.kind === "fee");
  const balance = payments.find((p) => p.kind === "balance");
  const action = (task: OrderTask) => {
    if (!owner) return null;
    switch (task.key) {
      case "fee":
        return task.state === "todo" && fee ? <PayForm paymentId={fee.id} label={`Pagar taxa de ${formatMinor(fee.amount_minor, currency)}`} /> : null;
      case "balance":
        return task.state === "todo" && balance && ["open", "failed"].includes(balance.status) ? (
          <PayForm paymentId={balance.id} label={`Pagar saldo de ${formatMinor(balance.amount_minor, currency)}`} installments={parceladoAvailable({ kind: "balance", currency })} />
        ) : null;
      case "address":
        return task.state === "todo" ? (
          <ActionDialog action={updateDelivery} title="Endereço e contato" trigger="Corrigir endereço" submit="Salvar" triggerVariant="outline" triggerSize="sm" size="lg">
            <input type="hidden" name="order_id" value={orderId} />
            <Field name="name" label="Nome completo / Razão social" autoComplete="name" defaultValue={delivery.name} />
            <OrderPhone defaultCountry={storedCountry(delivery) ?? (currency === "brl" ? "BR" : "US")} initial={delivery.phone} />
            <OrderAddress defaultCountry={currency === "brl" ? "BR" : "US"} initial={delivery} />
          </ActionDialog>
        ) : null;
      case "lease":
        return task.state === "todo" ? (
          <ButtonLink href="/locacoes" size="sm">
            Abrir acordo de locação
          </ButtonLink>
        ) : null;
      case "installation":
        return (task.state === "todo" || canRebook) && windows.length > 0 ? (
          <InstallationPicker orderId={orderId} windows={windows} rebook={task.state === "done"} />
        ) : task.state === "todo" ? (
          <p className="text-[13.5px] text-ink-soft">Ainda não há datas abertas para a sua região. Avisamos por e-mail quando abrirmos.</p>
        ) : null;
      case "trade_in":
        if (!tradeIn.editable) return null;
        return tradeIn.declared ? (
          <ActionDialog action={tradeInAction} title="Remover o purificador antigo?" trigger="Remover" submit="Remover" triggerVariant="ghost" triggerSize="sm" size="sm" description="O desconto sai do pedido.">
            <input type="hidden" name="action" value="remove" />
            <input type="hidden" name="order_id" value={orderId} />
          </ActionDialog>
        ) : (
          <ActionDialog action={tradeInAction} title="Purificador antigo" trigger="Adicionar purificador antigo" submit="Adicionar" triggerVariant="outline" triggerSize="sm" size="md" description="Entregue o purificador antigo ao técnico na instalação. O desconto entra no saldo.">
            <input type="hidden" name="action" value="declare" />
            <input type="hidden" name="order_id" value={orderId} />
            <Field name="brand" label="Marca" maxLength={80} placeholder="Ex.: Electrolux" />
            <Field name="model" label="Modelo (se souber)" required={false} maxLength={80} />
            <Field name="years" label="Anos de uso (aprox.)" type="number" required={false} />
          </ActionDialog>
        );
      case "app":
        return task.state === "todo" ? (
          <a href="/app-ai-iot" className="text-[14px] font-semibold text-brand hover:underline">
            Como configurar o app
          </a>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <Card title="Próximos passos">
      <ol className="grid gap-0">
        {tasks.map((task, n) => {
          const Icon = ICON[task.state];
          const last = n === tasks.length - 1;
          const body = action(task);
          return (
            <li key={task.key} className="relative flex gap-3 pb-4 last:pb-0">
              {!last && <span aria-hidden="true" className="absolute top-7 bottom-0 left-[0.8125rem] w-px bg-line" />}
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full",
                  task.state === "done" ? "bg-ok-soft text-ok" : task.state === "todo" ? "bg-brand-gradient text-white" : task.state === "waiting" ? "bg-warn-soft text-warn" : "bg-canvas text-ink-mute",
                )}
              >
                <Icon className="size-3.5" strokeWidth={2.5} />
              </span>
              <div className="grid min-w-0 flex-1 gap-1.5 pt-0.5">
                <p className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className={cn("text-[15px] font-bold", task.state === "later" ? "text-ink-mute" : "text-ink")}>{task.title}</span>
                  <span className="text-[12.5px] font-semibold text-ink-soft">{STATE_LABEL[task.state]}</span>
                </p>
                {task.detail && <p className="text-[13.5px] text-ink-soft">{task.detail}</p>}
                {body}
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

function PayForm({ paymentId, label, installments = false }: { paymentId: string; label: string; installments?: boolean }) {
  return installments ? (
    <ActionDialog action={orderAction} title="Pagamento seguro" trigger={label} submit="Continuar para o pagamento" triggerVariant="primary" triggerSize="sm" size="sm" description="Escolha como pagar. Você será levado à página segura da forma escolhida.">
      <input type="hidden" name="action" value="pay" />
      <input type="hidden" name="payment_id" value={paymentId} />
      <OrderPaymentMethod />
    </ActionDialog>
  ) : (
    <ActionDialog action={orderAction} title="Pagamento seguro" trigger={label} submit="Abrir pagamento seguro Stripe" triggerVariant="primary" triggerSize="sm" size="sm" description="Você será levado ao Stripe para pagar com cartão. Tem um cupom? Informe o código na página do Stripe.">
      <input type="hidden" name="action" value="pay" />
      <input type="hidden" name="payment_id" value={paymentId} />
    </ActionDialog>
  );
}

function InstallationPicker({ orderId, windows, rebook }: { orderId: string; windows: Window[]; rebook: boolean }) {
  return (
    <ActionForm bare action={installationAction} title={rebook ? "Remarcar a instalação" : "Escolha a data da instalação"} submit={rebook ? "Remarcar" : "Agendar instalação"}>
      <input type="hidden" name="action" value="book" />
      <input type="hidden" name="order_id" value={orderId} />
      <fieldset className="grid gap-2">
        <legend className="sr-only">Janelas de instalação</legend>
        {windows.map((w, i) => (
          <label
            key={w.id}
            className={cn(
              "flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-line bg-white px-3 py-2.5 text-[14px] has-checked:border-brand has-checked:bg-brand-soft",
              w.free <= 0 && "cursor-not-allowed opacity-50",
            )}
          >
            <span className="flex items-center gap-2.5">
              <input type="radio" name="window_id" value={w.id} required defaultChecked={i === 0 && w.free > 0} disabled={w.free <= 0} className="accent-brand" />
              <span className="font-semibold text-ink">{windowLabel(w.starts_at, w.ends_at)}</span>
            </span>
            <span className="text-[12.5px] text-ink-soft">{w.free > 0 ? `${w.free} ${w.free === 1 ? "vaga" : "vagas"}` : "Lotada"}</span>
          </label>
        ))}
      </fieldset>
      <p className="text-[12.5px] text-ink-soft">Horário de Brasília. Você pode remarcar até 48 horas antes.</p>
    </ActionForm>
  );
}
