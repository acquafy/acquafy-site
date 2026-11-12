import { notFound } from "next/navigation";
import { context } from "@/lib/live/data";
import { ActionDialog } from "@/components/enrollment/ActionDialog";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { DataTable } from "@/components/live/DataTable";
import { Field, Select } from "@/components/live/Fields";
import { PageHeader } from "@/components/live/PageHeader";
import { stockAction } from "@/lib/orders/stock-actions";

export const metadata = { title: "Estoque" };

// Colour names exactly as the website sends them with an order (Portuguese).
const COLORS = ["Azul Petróleo", "Cinza Metrópole", "Cinza", "Branco Glacial", "Branco", "Branco Pérola", "Cinza Prata", "Inox"];

/** Staff: units available now per model and colour (Tesla's inventory). Orders reserve units when the fee is paid. */
export default async function Stock() {
  const ctx = await context();
  if (ctx.staff !== "admin") notFound();
  const [products, stock, settings] = await Promise.all([
    ctx.db.from("order_products").select("id,title").eq("enabled", true).order("unit_minor"),
    ctx.db.from("product_stock").select("*").order("product_id").order("color"),
    ctx.db.from("order_settings").select("made_to_order_weeks").single(),
  ]);
  if (products.error || stock.error || settings.error) throw Error("Estoque indisponível.");
  const title = (id: string) => products.data.find((p) => p.id === id)?.title ?? id;

  return (
    <>
      <PageHeader
        title="Estoque"
        subtitle="Unidades disponíveis agora por modelo e cor. O site mostra “Disponível agora” enquanto houver unidade; quando a taxa do pedido é paga, a unidade fica reservada, e volta ao estoque se o pedido for cancelado."
      />
      <ActionForm action={stockAction} title="Atualizar estoque" submit="Salvar">
        <input type="hidden" name="action" value="set" />
        <div className="grid gap-3.5 @2xl:grid-cols-4">
          <Select name="product_id" label="Modelo" options={products.data.map((p) => ({ value: p.id, label: p.title }))} />
          <Field name="color" label="Cor (vazio = qualquer cor)" required={false} maxLength={80} placeholder={COLORS.join(", ")} />
          <Field name="on_hand" label="Unidades disponíveis" type="number" defaultValue="0" />
          <Field name="ship_days" label="Entrega em até (dias)" type="number" defaultValue="5" />
        </div>
        <p className="text-[13px] text-ink-soft">Cores aceitas: {COLORS.join(" · ")}.</p>
      </ActionForm>
      <DataTable
        caption="Estoque por modelo e cor"
        title="Disponível agora"
        empty="Nenhum modelo em estoque. Todos aparecem como sob encomenda."
        action={
          <ActionDialog action={stockAction} title="Prazo sob encomenda" trigger={`Sob encomenda: ${settings.data.made_to_order_weeks} semanas`} submit="Salvar" triggerVariant="outline" triggerSize="sm" size="sm" description="Prazo mostrado quando o modelo não está em estoque.">
            <input type="hidden" name="action" value="lead_time" />
            <Field name="weeks" label="Semanas" type="number" defaultValue={String(settings.data.made_to_order_weeks)} />
          </ActionDialog>
        }
        columns={[{ heading: "Modelo" }, { heading: "Cor" }, { heading: "Unidades" }, { heading: "Entrega", secondary: true }]}
        rows={stock.data.map((s) => [title(s.product_id), s.color || "Qualquer cor", String(s.on_hand), `até ${s.ship_days} dias`])}
      />
    </>
  );
}
