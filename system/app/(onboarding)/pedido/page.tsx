import { ChevronRight, ShieldCheck, UserPlus } from "lucide-react";
import Link from "next/link";
import { serverClient } from "@/lib/live/data";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { Area, Field } from "@/components/live/Fields";
import { Notice } from "@/components/live/Notice";
import { PageHeader } from "@/components/live/PageHeader";
import { PublicShell } from "@/components/live/PublicShell";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { IconTile } from "@/components/ui/KpiCard";
import { PurifierIcon } from "@/components/ui/PurifierIcon";
import { buyNow, requireFeature } from "@/lib/flags";
import { orderAction } from "@/lib/orders/actions";

export const metadata = { title: "Seu pedido" };

export default async function Order({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; mode?: string; color?: string; items?: string }>;
}) {
  await requireFeature(buyNow);
  const q = await searchParams;
  const kind = q.mode === "lease" ? "lease" : "purchase";
  const db = await serverClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  const catalog = await db.from("order_products").select("*").eq("enabled", true);
  if (catalog.error) throw Error("Catálogo indisponível.");
  let requested: { product: string; quantity: number; color?: string }[];
  try {
    requested = q.items ? JSON.parse(q.items) : q.product ? [{ product: q.product, quantity: 1, color: q.color }] : [];
    if (!Array.isArray(requested) || requested.length > 30) requested = [];
  } catch {
    requested = [];
  }
  const valid = requested.filter(
    (i) => catalog.data.some((p) => p.id === i.product) && Number.isInteger(i.quantity) && i.quantity > 0 && i.quantity <= 100,
  );
  const next = "/pedido?" + new URLSearchParams({ mode: kind, items: JSON.stringify(valid) }).toString();
  const verified = !!user?.email_confirmed_at;

  return (
    <PublicShell signedIn={!!user}>
      <PageHeader
        title={kind === "lease" ? "Solicitar locação" : "Encomendar produtos"}
        subtitle="Enviamos uma proposta com disponibilidade, valor final, frete, prazo e condições para seu aceite antes de qualquer cobrança. A locação terá um acordo e uma mensalidade próprios."
      />

      {valid.length === 0 ? (
        <Card title="Escolha um produto para continuar">
          <ul className="grid gap-2">
            {catalog.data.map((p) => (
              <li key={p.id}>
                <Link
                  href={"/pedido?" + new URLSearchParams({ product: p.id, mode: kind })}
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
          <Card title="Resumo do pedido" action={<Badge tone={kind === "lease" ? "violet" : "brand"}>{kind === "lease" ? "Locação" : "Compra"}</Badge>}>
            <DefinitionList
              rows={valid.map((i) => ({
                label: `${catalog.data.find((p) => p.id === i.product)?.title ?? i.product}${i.color ? ` · ${i.color}` : ""}`,
                value: `${i.quantity} ${i.quantity === 1 ? "unidade" : "unidades"}`,
              }))}
            />
          </Card>

          {!verified ? (
            <Card title="Para continuar, entre na sua Acquafy Account">
              <p className="mb-4 text-[14.5px] text-ink-soft">Seu pedido fica salvo. Crie sua conta ou entre para enviá-lo à nossa equipe e acompanhar cada etapa.</p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={"/cadastro?next=" + encodeURIComponent(next)}>
                  <UserPlus className="size-5" aria-hidden="true" />
                  Criar minha conta
                </ButtonLink>
                <ButtonLink variant="outline" href={"/login?next=" + encodeURIComponent(next)}>
                  Entrar
                </ButtonLink>
              </div>
            </Card>
          ) : (
            <ActionForm action={orderAction} title="Dados do pedido" submit="Enviar pedido para proposta">
              <input type="hidden" name="action" value="request" />
              <input type="hidden" name="kind" value={kind} />
              <input type="hidden" name="items" value={JSON.stringify(valid)} />
              <Field name="name" label="Nome completo / Razão social" autoComplete="name" />
              <Field name="phone" label="Telefone com código do país" type="tel" maxLength={40} autoComplete="tel" />
              <Area name="address" label="Endereço completo, cidade, código postal e país" rows={4} />
            </ActionForm>
          )}
          <Notice>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-violet" aria-hidden="true" />
              Nenhuma cobrança é feita até você aceitar a proposta final.
            </span>
          </Notice>
        </>
      )}
    </PublicShell>
  );
}
