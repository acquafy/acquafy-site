import Link from "next/link";
import { Minus, Package, Plus, Truck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatMinor, type OrderCurrency, type OrderKind } from "@/lib/orders/pricing";

type Line = { product: string; title: string; quantity: number; color?: string; unit: number; subtotal: number };

/**
 * Order page: what is being ordered, at the catalog price, with the order fee due now and what is paid later.
 * `quantityHref` is set for a single product, so the customer can change the quantity (links, no script needed).
 */
export function OrderSummary({
  kind,
  currency,
  lines,
  total,
  fee,
  balance,
  withdrawalDays,
  quantityHref,
  availability,
}: {
  kind: OrderKind;
  currency: OrderCurrency;
  lines: Line[];
  total: number;
  fee: number;
  balance: number;
  withdrawalDays: number;
  quantityHref?: (quantity: number) => string;
  /** "Disponível agora · entrega em até 3 dias" or the made-to-order estimate (purchases). */
  availability?: string;
}) {
  const money = (minor: number) => formatMinor(minor, currency);
  const lease = kind === "lease";
  return (
    <Card title="Resumo do pedido" action={<Badge tone={lease ? "violet" : "brand"}>{lease ? "Locação" : "Compra"}</Badge>}>
      <ul className="grid gap-2">
        {lines.map((line) => (
          <li key={line.product + (line.color ?? "")} className="flex flex-wrap items-center gap-3 rounded-xl bg-canvas/60 p-3">
            <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
              <Package className="size-5" strokeWidth={1.75} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-bold text-ink">{line.title}</span>
              <span className="block text-[13.5px] text-ink-soft">
                {[line.color, `${money(line.unit)}${lease ? "/mês" : ""} cada`].filter(Boolean).join(" · ")}
              </span>
            </span>
            {quantityHref ? (
              <span className="flex items-center gap-1" aria-label="Quantidade">
                <QuantityLink href={quantityHref(line.quantity - 1)} disabled={line.quantity <= 1} label="Diminuir quantidade">
                  <Minus className="size-4" aria-hidden="true" />
                </QuantityLink>
                <span className="tabular w-8 text-center text-[15px] font-bold text-ink" aria-live="polite">
                  {line.quantity}
                </span>
                <QuantityLink href={quantityHref(line.quantity + 1)} disabled={line.quantity >= 20} label="Aumentar quantidade">
                  <Plus className="size-4" aria-hidden="true" />
                </QuantityLink>
              </span>
            ) : (
              <Badge>× {line.quantity}</Badge>
            )}
          </li>
        ))}
      </ul>

      <dl className="mt-4 grid gap-2 text-[14.5px]">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-ink-soft">{lease ? "Mensalidade (36 meses)" : "Total"}</dt>
          <dd className="tabular text-[22px] font-extrabold tracking-tight whitespace-nowrap text-ink">
            {money(total)}
            {lease && <span className="text-[14px] font-semibold text-ink-soft">/mês</span>}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 rounded-xl bg-brand-soft px-3 py-2.5">
          <dt className="font-semibold text-ink">Taxa do pedido · paga agora</dt>
          <dd className="tabular font-extrabold whitespace-nowrap text-brand">{money(fee)}</dd>
        </div>
        {!lease && (
          <div className="flex items-baseline justify-between gap-4 px-3">
            <dt className="text-ink-soft">Saldo · pago antes da entrega</dt>
            <dd className="tabular font-semibold whitespace-nowrap text-ink">{money(balance)}</dd>
          </div>
        )}
      </dl>

      <ul className="mt-4 grid gap-1.5 text-[13.5px] text-ink-soft">
        <li className="flex items-center gap-2">
          <Truck className="size-4 shrink-0 text-ok" aria-hidden="true" />
          {availability ? `${availability}. Frete grátis.` : "Frete grátis. A Acquafy confirma a data de entrega depois do pedido."}
        </li>
        <li>
          {lease
            ? `A taxa reserva sua locação. A mensalidade começa com o acordo de locação, depois da confirmação.`
            : `A taxa é abatida do total. Cancele em até ${withdrawalDays} dias, antes do envio, e recebe tudo de volta.`}
        </li>
      </ul>
    </Card>
  );
}

function QuantityLink({ href, disabled, label, children }: { href: string; disabled: boolean; label: string; children: React.ReactNode }) {
  const cls = "grid size-9 place-items-center rounded-full border border-line text-ink";
  if (disabled)
    return (
      <span aria-hidden="true" className={cls + " opacity-40"}>
        {children}
      </span>
    );
  return (
    <Link href={href} replace scroll={false} aria-label={label} className={cls + " hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"}>
      {children}
    </Link>
  );
}
