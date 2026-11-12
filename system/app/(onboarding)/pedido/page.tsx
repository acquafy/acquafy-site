import { ChevronRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { serverClient } from "@/lib/live/data";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { Consent, Field } from "@/components/live/Fields";
import { Notice } from "@/components/live/Notice";
import { PageHeader } from "@/components/live/PageHeader";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/KpiCard";
import { PurifierIcon } from "@/components/ui/PurifierIcon";
import { FlowShell, FlowStage } from "@/components/flow/FlowShell";
import { OrderAccount } from "@/components/sections/OrderAccount";
import { orderImage } from "@/config/order-images";
import { OrderAddress } from "@/components/sections/OrderAddress";
import { OrderSummary } from "@/components/sections/OrderSummary";
import { buyNow, requireFeature } from "@/lib/flags";
import { orderAction } from "@/lib/orders/actions";
import { availabilityFor, availabilityLabel, type StockRow } from "@/lib/orders/stock";
import { formatMinor, linesFromQuery, orderCurrency, previewOrder, type CatalogProduct, type OrderSettings } from "@/lib/orders/pricing";

export const metadata = { title: "Seu pedido" };

type Query = { product?: string; mode?: string; color?: string; items?: string; quantity?: string; currency?: string; image?: string };

/** The order page (Tesla-style): summary at the catalog price, account by e-mail code, delivery address, order fee. */
export default async function Order({ searchParams }: { searchParams: Promise<Query> }) {
  await requireFeature(buyNow);
  const q = await searchParams;
  const kind = q.mode === "lease" ? "lease" : "purchase";
  const currency = orderCurrency(q.currency);
  const db = await serverClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  const [catalog, settings, stock] = await Promise.all([
    db.from("order_products").select("id,title,unit_minor,lease_minor").eq("enabled", true).order("unit_minor"),
    db.from("order_settings").select("*").single(),
    db.rpc("stock_availability"),
  ]);
  if (catalog.error || settings.error || stock.error) throw Error("Catálogo indisponível.");
  const products = catalog.data as CatalogProduct[];
  const order = previewOrder(linesFromQuery(q), products, kind, currency, settings.data as OrderSettings);
  // The picture the customer configured on the product page (colour and angle); the catalog image otherwise.
  const first = order.lines[0];
  const image = orderImage(first?.product, q.image);
  const items = order.lines.map(({ product, quantity, color }) => ({ product, quantity, ...(color ? { color } : {}) }));
  const href = (extra: Record<string, string>) =>
    "/pedido?" + new URLSearchParams({ mode: kind, currency, items: JSON.stringify(items), ...(image ? { image } : {}), ...extra }).toString();
  const single = items.length === 1;
  const quantityHref = single
    ? (n: number) => href({ items: JSON.stringify([{ ...items[0], quantity: Math.min(Math.max(n, 1), 20) }]) })
    : undefined;
  const verified = !!user?.email_confirmed_at;
  // Purchases of one product show whether it ships from stock; leases use investor units, confirmed by staff.
  const availability =
    kind === "purchase" && single
      ? availabilityLabel(availabilityFor(stock.data as StockRow[], items[0].product, items[0].color, settings.data.made_to_order_weeks))
      : undefined;

  return (
    <FlowShell
      step={2}
      account={user?.email ? { email: user.email } : null}
      stage={
        first ? (
          <FlowStage
            image={image}
            title={order.lines.length === 1 ? first.title : `${order.lines.length} produtos`}
            detail={[first.color, kind === "lease" ? "Locação" : "Compra"].filter(Boolean).join(" · ")}
          />
        ) : undefined
      }
    >
      <PageHeader
        title={kind === "lease" ? "Sua locação" : "Seu pedido"}
        subtitle="Preço fixo de catálogo. Você paga a taxa do pedido agora e acompanha entrega e instalação na sua Acquafy Account."
      />

      {order.lines.length === 0 ? (
        <Card title="Escolha um produto para continuar">
          <ul className="grid gap-2">
            {products.map((p) => (
              <li key={p.id}>
                <Link
                  href={"/pedido?" + new URLSearchParams({ product: p.id, mode: kind, currency })}
                  className="flex items-center gap-3 rounded-xl bg-canvas/60 p-3 transition hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand"
                >
                  <IconTile icon={PurifierIcon} tone="blue" className="size-12" />
                  <span className="min-w-0 flex-1 text-[15.5px] font-bold text-ink">{p.title}</span>
                  <ChevronRight className="size-5 shrink-0 text-brand" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      ) : (
        <>
          <OrderSummary
            kind={kind}
            currency={currency}
            lines={order.lines}
            total={order.total}
            fee={order.fee}
            balance={order.balance}
            withdrawalDays={settings.data.withdrawal_days}
            quantityHref={quantityHref}
            availability={availability}
          />

          {!verified ? (
            <OrderAccount next={href({})} />
          ) : (
            <ActionForm action={orderAction} title="2 · Entrega e pagamento" submit={`Pagar taxa de ${formatMinor(order.fee, currency)} e fazer pedido`}>
              <input type="hidden" name="action" value="place" />
              <input type="hidden" name="kind" value={kind} />
              <input type="hidden" name="currency" value={currency} />
              <input type="hidden" name="items" value={JSON.stringify(items)} />
              <p className="text-[14px] text-ink-soft">
                Conectado como <strong className="text-ink [overflow-wrap:anywhere]">{user.email}</strong>.
              </p>
              <div className="grid gap-3.5 @sm:grid-cols-2">
                <Field name="name" label="Nome completo / Razão social" autoComplete="name" />
                <Field name="phone" label="Telefone com DDD" type="tel" maxLength={40} autoComplete="tel" />
              </div>
              <OrderAddress brazil={currency === "brl"} />
              <Consent name="terms">
                Li e aceito os termos do pedido: preço de {formatMinor(order.total, currency)}
                {kind === "lease" ? "/mês" : ""}, taxa do pedido de {formatMinor(order.fee, currency)} cobrada agora
                {kind === "purchase" ? " e abatida do total" : ""}, cancelamento com reembolso integral em até {settings.data.withdrawal_days} dias após o pedido, antes do envio.
              </Consent>
            </ActionForm>
          )}
          <Notice>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-violet" aria-hidden="true" />
              Pagamento seguro pelo Stripe. {kind === "purchase" ? "O saldo só é cobrado quando a Acquafy confirmar a data de entrega." : "A mensalidade só começa depois do acordo de locação."}
            </span>
          </Notice>
        </>
      )}
    </FlowShell>
  );
}
