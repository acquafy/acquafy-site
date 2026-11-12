"use server";
import { revalidatePath } from "next/cache";
import { context } from "@/lib/live/data";
import type { ActionResult } from "@/lib/enrollment/types";

/** Staff: units on hand and delivery time per model and colour, and the made-to-order estimate. */
export async function stockAction(_state: ActionResult, f: FormData): Promise<ActionResult> {
  const ctx = await context();
  const action = String(f.get("action") ?? "");
  const payload =
    action === "lead_time"
      ? { weeks: Number(f.get("weeks")) }
      : { product_id: String(f.get("product_id") ?? ""), color: String(f.get("color") ?? "").trim(), on_hand: Number(f.get("on_hand")), ship_days: Number(f.get("ship_days")) };
  if (!["set", "lead_time"].includes(action)) return { error: "Ação inválida." };
  const result = await ctx.db.rpc("stock_command", { action, payload });
  if (result.error) return { error: "Não foi possível salvar. Confira os números." };
  revalidatePath("/estoque");
  return { success: action === "set" ? "Estoque atualizado." : "Prazo sob encomenda atualizado." };
}
