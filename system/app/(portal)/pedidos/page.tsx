import Link from "next/link";
import { context, money, date } from "@/lib/live/data";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { Field, Select } from "@/components/live/Fields";
import { orderAction } from "@/lib/orders/actions";
export const metadata = { title: "Pedidos · Acquafy Account" };
const labels: Record<string, string> = {
  requested: "Pedido recebido · aguardando proposta",
  quoted: "Proposta disponível",
  accepted: "Aceito · aguardando pagamento",
  paid: "Pagamento confirmado",
  processing: "Em preparação",
  shipped: "Enviado",
  installed: "Instalado",
  completed: "Concluído",
  cancelled: "Cancelado",
  review: "Pagamento em análise",
};
export default async function Orders() {
  const ctx = await context();
  const result = await ctx.db
    .from("product_orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  const history = await ctx.db
    .from("order_events")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(2000);
  if (history.error) throw Error("Histórico indisponível.");
  if (result.error) throw Error("Pedidos indisponíveis.");
  return (
    <>
      <h1>{ctx.staff === "admin" ? "Gestão de pedidos" : "Meus pedidos"}</h1>
      <Link className="live-link" href="/pedido">
        Novo pedido
      </Link>
      {!result.data.length && <p>Nenhum pedido recebido.</p>}
      {result.data.map((o) => (
        <section key={o.id} className="live-card">
          <h2>Pedido {o.id.slice(0, 8).toUpperCase()}</h2>
          <p>
            {o.kind === "lease" ? "Locação" : "Compra"} · {labels[o.status]} ·{" "}
            {date(o.created_at)}
          </p>
          {(
            o.items as { title: string; quantity: number; color?: string }[]
          ).map((i, n) => (
            <p key={n}>
              {i.title} × {i.quantity} · {i.color}
            </p>
          ))}
          <p>
            {o.delivery.name} · {o.delivery.address} · {o.delivery.phone}
          </p>
          {o.quote_text && (
            <>
              <h3>
                Proposta final · {money(o.total_minor / 100)}
                {o.kind === "lease" ? "/mês" : ""}
              </h3>
              <p style={{ whiteSpace: "pre-wrap" }}>{o.quote_text}</p>
            </>
          )}
          <ol>
            {history.data
              .filter((e) => e.order_id === o.id)
              .map((e) => (
                <li key={e.id}>
                  {date(e.created_at)} · {labels[e.status] ?? e.status}
                </li>
              ))}
          </ol>
          {o.tracking_reference && (
            <p>Transportadora / rastreamento: {o.tracking_reference}</p>
          )}
          {o.accepted_at && (
            <p>
              Aceito por {o.signer} em {date(o.accepted_at)} · Evidência:{" "}
              {o.evidence_hash}
            </p>
          )}
          {ctx.staff === "admin" && o.status === "requested" && (
            <ActionForm action={orderAction} title="Publicar proposta aprovada">
              <input type="hidden" name="action" value="quote" />
              <input type="hidden" name="order_id" value={o.id} />
              <Field
                name="price"
                label={
                  o.kind === "lease"
                    ? "Mensalidade total final (USD)"
                    : "Total final com frete e tributos (USD)"
                }
                type="number"
              />
              {o.kind === "lease" && (
                <Field
                  name="share_bps"
                  label="Participação dos investidores (5000 = 50%)"
                  type="number"
                />
              )}
              <label className="live-field">
                Condições aprovadas: disponibilidade, frete, tributos, entrega,
                instalação, cancelamento e devolução
                <textarea
                  required
                  minLength={100}
                  maxLength={100000}
                  name="quote_text"
                  rows={8}
                />
              </label>
              <label>
                <input type="checkbox" name="approved" value="yes" required />{" "}
                Confirmo aprovação dos preços e das condições.
              </label>
            </ActionForm>
          )}
          {o.user_id === ctx.user.id &&
            o.kind === "purchase" &&
            o.status === "quoted" && (
              <ActionForm action={orderAction} title="Aceitar proposta">
                <input type="hidden" name="action" value="accept" />
                <input type="hidden" name="order_id" value={o.id} />
                <Field name="signer" label="Nome completo do signatário" />
                <label>
                  <input type="checkbox" name="consent" value="yes" required />{" "}
                  Li e aceito o pedido, o preço final e as condições acima.
                </label>
              </ActionForm>
            )}
          {o.user_id === ctx.user.id &&
            o.kind === "purchase" &&
            o.status === "accepted" && (
              <ActionForm
                action={orderAction}
                title="Pagar pedido"
                submit="Abrir pagamento seguro Stripe"
              >
                <input type="hidden" name="action" value="checkout" />
                <input type="hidden" name="order_id" value={o.id} />
              </ActionForm>
            )}
          {o.lease_id && (
            <p>
              <Link className="live-link" href="/locacoes">
                Ver acordo de locação, pagamento e instalação
              </Link>
            </p>
          )}
          {o.user_id === ctx.user.id &&
            ["requested", "quoted", "accepted"].includes(o.status) &&
            !o.checkout_id &&
            !o.lease_id && (
              <ActionForm action={orderAction} title="Cancelar solicitação">
                <input type="hidden" name="action" value="cancel" />
                <input type="hidden" name="order_id" value={o.id} />
              </ActionForm>
            )}
          {ctx.staff === "admin" &&
            ["paid", "processing", "shipped", "installed"].includes(
              o.status,
            ) && (
              <ActionForm action={orderAction} title="Atualizar entrega">
                <input type="hidden" name="action" value="fulfill" />
                <input type="hidden" name="order_id" value={o.id} />
                <Select
                  name="status"
                  label="Etapa"
                  options={[
                    "processing",
                    "shipped",
                    "installed",
                    "completed",
                  ].map((value) => ({ value, label: labels[value] }))}
                />
                <Field
                  name="tracking_reference"
                  label="Transportadora e referência de rastreamento"
                  required={false}
                  maxLength={300}
                />
              </ActionForm>
            )}
        </section>
      ))}
    </>
  );
}
