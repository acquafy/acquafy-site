"use server";
import { serverClient, context } from "@/lib/live/data";
import {
  publicOrigin,
  serviceClient,
  stripeClient,
} from "@/lib/enrollment/server";
import { usdToMinor } from "@/lib/enrollment/validation";
import { customerDestination } from "./destination";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionResult } from "@/lib/enrollment/types";
import { buyNow } from "@/lib/flags";
export async function customerSignup(
  _state: ActionResult,
  f: FormData,
): Promise<ActionResult> {
  if (!(await buyNow()))
    return { error: "O cadastro de clientes não está disponível no momento." };
  const email = String(f.get("email") ?? "").trim(),
    password = String(f.get("password") ?? "");
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    password.length < 12 ||
    password.length > 128 ||
    f.get("consent") !== "yes"
  )
    return {
      error:
        "Informe um e-mail válido, uma senha de 12 a 128 caracteres e aceite a política de privacidade.",
    };
  const db = await serverClient();
  const { error } = await db.auth.signUp({
    email,
    password,
    options: {
      data: { signup_kind: "customer" },
      emailRedirectTo:
        publicOrigin() +
        "/app/auth/confirm?next=" +
        encodeURIComponent(customerDestination(String(f.get("next") ?? ""))),
    },
  });
  if (error)
    return {
      error:
        "Não foi possível enviar a confirmação agora. Tente novamente mais tarde ou entre com sua conta existente.",
    };
  return {
    success:
      "Confira seu e-mail e confirme o cadastro para acessar sua conta. Se já possui conta, entre com seu e-mail e senha.",
  };
}
export async function orderAction(
  _state: ActionResult,
  f: FormData,
): Promise<ActionResult> {
  const ctx = await context(),
    action = String(f.get("action") ?? "");
  // New orders stop with the flag; quotes, acceptance and payment of orders already placed keep working.
  if (action === "request" && !(await buyNow()))
    return { error: "Novos pedidos não estão disponíveis no momento." };
  const payload = Object.fromEntries(
    [...f.entries()].filter(
      (x): x is [string, string] => typeof x[1] === "string",
    ),
  ) as Record<string, unknown>;
  try {
    if (action === "request") {
      const items = JSON.parse(String(f.get("items") ?? "[]"));
      if (!Array.isArray(items) || items.length > 30) throw Error();
      payload.items = items;
      payload.delivery = {
        name: String(f.get("name") ?? "").trim(),
        address: String(f.get("address") ?? "").trim(),
        phone: String(f.get("phone") ?? "").trim(),
      };
    } else if (action === "quote") {
      const amount = usdToMinor(String(f.get("price") ?? ""));
      if (amount === null) throw Error();
      payload.total_minor = amount;
    }
    if (action === "checkout") {
      const { data: o, error } = await ctx.db
        .from("product_orders")
        .select("*")
        .eq("id", String(f.get("order_id")))
        .single();
      if (
        error ||
        !o ||
        o.user_id !== ctx.user.id ||
        o.kind !== "purchase" ||
        o.status !== "accepted" ||
        !ctx.accounts.some(
          (a) => a.id === o.account_id && a.status === "active",
        )
      )
        throw Error();
      const stripe = stripeClient();
      let session = o.checkout_id
        ? await stripe.checkout.sessions.retrieve(o.checkout_id)
        : null;
      if (session?.status === "expired" || o.checkout_failed) session = null;
      if (!session)
        session = await stripe.checkout.sessions.create(
          {
            mode: "payment",
            integration_identifier: "acquafy_orders_qmvtlxpa",
            client_reference_id: o.id,
            metadata: { integration: "acquafy_order", order_id: o.id },
            payment_intent_data: {
              metadata: { integration: "acquafy_order", order_id: o.id },
            },
            line_items: [
              {
                quantity: 1,
                price_data: {
                  currency: "usd",
                  unit_amount: o.total_minor,
                  product_data: { name: "Acquafy · Pedido " + o.id },
                },
              },
            ],
            success_url: publicOrigin() + "/app/pedidos",
            cancel_url: publicOrigin() + "/app/pedidos",
          },
          {
            idempotencyKey:
              "product-order-" + o.id + "-" + (o.checkout_id ?? "initial"),
          },
        );
      const result = await serviceClient()
        .from("product_orders")
        .update({ checkout_id: session.id, checkout_failed: false })
        .eq("id", o.id)
        .eq("status", "accepted");
      if (result.error) throw Error();
      if (session.url) redirect(session.url);
      return { success: "Aguardando confirmação do pagamento." };
    }
    const result = await ctx.db.rpc("order_command", { action, payload });
    if (result.error) throw Error();
    revalidatePath("/app/pedidos");
    if (action === "request") redirect("/app/pedidos");
    return { success: "Alteração registrada." };
  } catch (e) {
    if (e instanceof Error && e.message === "NEXT_REDIRECT") throw e;
    return {
      error:
        "Não foi possível concluir. Confira os dados, as permissões e o estado do pedido.",
    };
  }
}
