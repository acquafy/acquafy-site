"use server";
import { after } from "next/server";
import { revalidatePath } from "next/cache";
import { context } from "@/lib/live/data";
import type { ActionResult } from "@/lib/enrollment/types";
import { deliveryFromForm } from "./delivery";
import { sendPendingNotifications } from "./notifications";

/** Order page: the customer corrects the delivery address and contact until Acquafy confirms the order. */
export async function updateDelivery(_state: ActionResult, f: FormData): Promise<ActionResult> {
  const ctx = await context();
  const delivery = deliveryFromForm(f);
  const orderId = String(f.get("order_id") ?? "");
  if (!delivery) return { error: "Preencha CEP, rua, número e cidade." };
  const result = await ctx.db.rpc("order_delivery_update", { payload: { order_id: orderId, delivery } });
  if (result.error) return { error: "Não foi possível alterar. Depois da confirmação, fale com o suporte." };
  revalidatePath("/pedidos/" + orderId);
  return { success: "Endereço e contato atualizados." };
}

// Installation windows are published in Brasília time (UTC−3, no daylight saving time since 2019).
const PERIODS: Record<string, [string, string]> = { manha: ["08:00", "12:00"], tarde: ["13:00", "18:00"] };

/** Installation: staff publish and close windows per state; the customer books (or moves) one for a paid order. */
export async function installationAction(_state: ActionResult, f: FormData): Promise<ActionResult> {
  const ctx = await context();
  const action = String(f.get("action") ?? "");
  let payload: Record<string, unknown>;
  if (action === "publish") {
    const date = String(f.get("date") ?? "");
    const period = PERIODS[String(f.get("period") ?? "")];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !period) return { error: "Escolha a data e o período." };
    payload = {
      region: String(f.get("region") ?? "").trim().toUpperCase(),
      starts_at: `${date}T${period[0]}:00-03:00`,
      ends_at: `${date}T${period[1]}:00-03:00`,
      capacity: Number(f.get("capacity")),
    };
  } else if (action === "close") payload = { window_id: String(f.get("window_id") ?? "") };
  else if (action === "book") payload = { order_id: String(f.get("order_id") ?? ""), window_id: String(f.get("window_id") ?? "") };
  else return { error: "Ação inválida." };
  const result = await ctx.db.rpc("installation_command", { action, payload });
  if (result.error) {
    const message = result.error.message;
    if (message.includes("Window full")) return { error: "Esta janela acabou de lotar. Escolha outra." };
    if (message.includes("Booking locked")) return { error: "Faltam menos de 48 horas para a instalação. Para remarcar, fale com o suporte." };
    return { error: "Não foi possível concluir. Confira os dados e tente de novo." };
  }
  if (action === "book") after(() => sendPendingNotifications().catch(() => undefined));
  revalidatePath("/instalacoes");
  revalidatePath("/pedidos", "layout");
  return { success: action === "book" ? "Instalação agendada." : action === "publish" ? "Janela publicada." : "Janela fechada." };
}
