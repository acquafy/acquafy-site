"use server";
import { serverClient, context } from "@/lib/live/data";
import {
  publicOrigin,
  serviceClient,
  stripeClient,
} from "@/lib/enrollment/server";
import { usdToMinor } from "@/lib/enrollment/validation";
import { customerDestination } from "./destination";
import { expireCheckout, paymentCheckoutUrl, refundPayment } from "./checkout";
import { deliveryFromForm } from "./delivery";
import { sendPendingNotifications } from "./notifications";
import { after } from "next/server";
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
    if (action === "place") {
      // Fixed price: the order is created at the catalog price and the customer goes straight to the order fee.
      const items = JSON.parse(String(f.get("items") ?? "[]"));
      if (!Array.isArray(items) || items.length < 1 || items.length > 30) throw Error();
      const quantity = Number(f.get("quantity"));
      if (items.length === 1 && Number.isInteger(quantity)) items[0].quantity = quantity;
      const delivery = deliveryFromForm(f);
      if (!delivery) throw Error();
      const placed = await ctx.db.rpc("order_command", {
        action: "place",
        payload: { kind: payload.kind, currency: payload.currency, terms: payload.terms, items, delivery },
      });
      if (placed.error || !placed.data) throw Error();
      // Trade-in declared on the order form. It never blocks the order: if it is incomplete, the customer can add it
      // on the order page until Acquafy confirms.
      if (f.get("trade_in") === "yes" && String(f.get("trade_in_brand") ?? "").trim())
        await ctx.db.rpc("order_trade_in", {
          action: "declare",
          payload: {
            order_id: placed.data,
            brand: String(f.get("trade_in_brand")).trim(),
            model: String(f.get("trade_in_model") ?? "").trim(),
            years: Number(f.get("trade_in_years") || 0),
          },
        });
      const fee = await ctx.db.from("order_payments").select("*").eq("order_id", placed.data).eq("kind", "fee").single();
      if (fee.error || !fee.data) throw Error();
      const url = await paymentCheckoutUrl(fee.data);
      if (!url) throw Error();
      redirect(url);
    }
    if (action === "pay") {
      // Order fee (retry) or balance of a fixed-price order, paid by its owner.
      const pay = await ctx.db.from("order_payments").select("*").eq("id", String(f.get("payment_id"))).single();
      if (pay.error || !pay.data) throw Error();
      const { data: o, error } = await ctx.db.from("product_orders").select("*").eq("id", pay.data.order_id).single();
      if (
        error ||
        !o ||
        o.user_id !== ctx.user.id ||
        o.status !== (pay.data.kind === "fee" ? "awaiting_fee" : "confirmed") ||
        !ctx.accounts.some((a) => a.id === o.account_id && a.status === "active")
      )
        throw Error();
      const url = await paymentCheckoutUrl(pay.data);
      if (url) redirect(url);
      // The previous Checkout was already completed: it was recorded now instead of charging again.
      revalidatePath("/pedidos");
      return { success: "Este pagamento já foi feito e está sendo confirmado. Atualize a página em instantes." };
    }
    if (action === "cancel") {
      const { data: o } = await ctx.db.from("product_orders").select("id,flow,lease_id").eq("id", String(f.get("order_id"))).single();
      if (o?.flow === "fixed") {
        // Close unpaid sessions first (order fee, balance, or the lease's first month) so they cannot be paid after the cancellation.
        const open = await ctx.db.from("order_payments").select("checkout_id").eq("order_id", o.id).eq("status", "open");
        for (const p of open.data ?? []) await expireCheckout(p.checkout_id);
        if (o.lease_id) {
          const lease = await ctx.db.from("customer_leases").select("checkout_id").eq("id", o.lease_id).single();
          await expireCheckout(lease.data?.checkout_id ?? null);
        }
        const cancelled = await ctx.db.rpc("order_command", { action: "cancel", payload: { order_id: o.id } });
        if (cancelled.error) throw Error();
        after(() => sendPendingNotifications().catch(() => undefined));
        revalidatePath("/pedidos");
        const refunds = await serviceClient().from("order_payments").select("id,payment_intent_id").eq("order_id", o.id).eq("status", "refunding");
        try {
          for (const p of refunds.data ?? []) await refundPayment(p);
        } catch {
          return { success: "Pedido cancelado. O reembolso será concluído pela nossa equipe." };
        }
        return { success: refunds.data?.length ? "Pedido cancelado. O reembolso foi solicitado ao cartão usado." : "Pedido cancelado." };
      }
    }
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
            allow_promotion_codes: true,
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
              "product-order-promo-" +
              o.id +
              "-" +
              (o.checkout_id ?? "initial"),
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
    after(() => sendPendingNotifications().catch(() => undefined));
    revalidatePath("/pedidos");
    if (action === "request") redirect("/pedidos");
    return { success: "Alteração registrada." };
  } catch (e) {
    if (e instanceof Error && e.message === "NEXT_REDIRECT") throw e;
    return {
      error:
        "Não foi possível concluir. Confira os dados, as permissões e o estado do pedido.",
    };
  }
}
