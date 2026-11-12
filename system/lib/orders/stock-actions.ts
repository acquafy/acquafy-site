"use server";
import { revalidatePath } from "next/cache";
import { context } from "@/lib/live/data";
import type { ActionResult } from "@/lib/enrollment/types";
import { validStockColor } from "@/config/order-colors";

/** Staff: units on hand and delivery time per model and colour, and the made-to-order estimate. */
export async function stockAction(_state: ActionResult, f: FormData): Promise<ActionResult> {
  const ctx = await context();
  const action = String(f.get("action") ?? "");
  let payload: Record<string, unknown>;
  if (action === "lead_time") payload = { weeks: Number(f.get("weeks")) };
  else if (action === "set") {
    const product_id = String(f.get("product_id") ?? "");
    const color = String(f.get("color") ?? "").trim();
    // A colour the website never sends would never be reserved: only the product's own colours, or any colour.
    if (!validStockColor(product_id, color))
      return { error: "Esta cor não existe para este modelo no site. Use uma das cores listadas ou deixe vazio (qualquer cor)." };
    payload = { product_id, color, on_hand: Number(f.get("on_hand")), ship_days: Number(f.get("ship_days")) };
  } else return { error: "Ação inválida." };
  const result = await ctx.db.rpc("stock_command", { action, payload });
  if (result.error) return { error: "Não foi possível salvar. Confira os números." };
  revalidatePath("/estoque");
  return { success: action === "set" ? "Estoque atualizado." : "Prazo sob encomenda atualizado." };
}
