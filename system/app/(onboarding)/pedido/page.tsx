import Link from "next/link";
import { serverClient } from "@/lib/live/data";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { Field } from "@/components/live/Fields";
import { orderAction } from "@/lib/orders/actions";
import "../../(portal)/live.css";
export const metadata = { title: "Seu pedido · Acquafy Account" };
export default async function Order({
  searchParams,
}: {
  searchParams: Promise<{
    product?: string;
    mode?: string;
    color?: string;
    items?: string;
  }>;
}) {
  const q = await searchParams;
  const kind = q.mode === "lease" ? "lease" : "purchase";
  const db = await serverClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  const catalog = await db
    .from("order_products")
    .select("*")
    .eq("enabled", true);
  if (catalog.error) throw Error("Catálogo indisponível.");
  let requested: { product: string; quantity: number; color?: string }[];
  try {
    requested = q.items
      ? JSON.parse(q.items)
      : q.product
        ? [{ product: q.product, quantity: 1, color: q.color }]
        : [];
    if (!Array.isArray(requested) || requested.length > 30) requested = [];
  } catch {
    requested = [];
  }
  const valid = requested.filter(
    (i) =>
      catalog.data.some((p) => p.id === i.product) &&
      Number.isInteger(i.quantity) &&
      i.quantity > 0 &&
      i.quantity <= 100,
  );
  const next =
    "/pedido?" +
    new URLSearchParams({
      mode: kind,
      items: JSON.stringify(valid),
    }).toString();
  return (
    <main
      className="live-portal"
      style={{ padding: "40px 20px", maxWidth: 760, margin: "auto" }}
    >
      <h1>
        Acquafy Account ·{" "}
        {kind === "lease" ? "Solicitar locação" : "Encomendar produtos"}
      </h1>
      <p>
        Enviamos uma proposta com disponibilidade, valor final, frete, prazo e
        condições para seu aceite antes de qualquer cobrança. A locação terá um
        acordo e uma mensalidade próprios.
      </p>
      {valid.length === 0 ? (
        <>
          <p>Escolha um produto para continuar.</p>
          {catalog.data.map((p) => (
            <p key={p.id}>
              <Link
                href={
                  "/pedido?" +
                  new URLSearchParams({ product: p.id, mode: kind })
                }
              >
                {p.title}
              </Link>
            </p>
          ))}
        </>
      ) : (
        <>
          {valid.map((i, n) => (
            <p key={n}>
              {catalog.data.find((p) => p.id === i.product)?.title} ·{" "}
              {i.quantity} unidade(s) · {i.color}
            </p>
          ))}
          {!user?.email_confirmed_at ? (
            <>
              <Link
                className="live-button"
                href={"/cadastro?next=" + encodeURIComponent(next)}
              >
                Criar minha conta
              </Link>{" "}
              <Link
                className="live-link"
                href={"/login?next=" + encodeURIComponent(next)}
              >
                Entrar
              </Link>
            </>
          ) : (
            <ActionForm
              action={orderAction}
              title="Dados do pedido"
              submit="Enviar pedido para proposta"
            >
              <input type="hidden" name="action" value="request" />
              <input type="hidden" name="kind" value={kind} />
              <input type="hidden" name="items" value={JSON.stringify(valid)} />
              <Field name="name" label="Nome completo / Razão social" />
              <Field
                name="phone"
                label="Telefone com código do país"
                type="tel"
                maxLength={40}
              />
              <label className="live-field">
                Endereço completo, cidade, código postal e país
                <textarea
                  name="address"
                  required
                  minLength={5}
                  maxLength={500}
                  rows={4}
                />
              </label>
            </ActionForm>
          )}
        </>
      )}
      <p>
        <Link href="/pedidos">Meus pedidos</Link>
      </p>
    </main>
  );
}
