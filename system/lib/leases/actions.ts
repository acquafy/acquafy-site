"use server";
import { context } from "@/lib/live/data";
import {
  serviceClient,
  stripeClient,
  publicOrigin,
} from "@/lib/enrollment/server";
import { usdToMinor } from "@/lib/enrollment/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionResult } from "@/lib/enrollment/types";
export async function leaseAction(
  _state: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const ctx = await context();
  const payload = Object.fromEntries(
    [...form.entries()].filter(
      (x): x is [string, string] => typeof x[1] === "string",
    ),
  );
  const action = payload.action;
  if (action === "create") {
    const amount = usdToMinor(payload.monthly_price);
    if (amount === null) return { error: "Preço inválido." };
    payload.monthly_minor = String(amount);
  }
  try {
    if (["create", "assign", "accept", "install"].includes(action)) {
      const { error } = await ctx.db.rpc("lease_command", { action, payload });
      if (error) throw Error("Command rejected");
    } else {
      const { data: l, error } = await ctx.db
        .from("customer_leases")
        .select("*")
        .eq("id", payload.lease_id)
        .single();
      if (
        error ||
        !l ||
        !ctx.accounts.some(
          (a) => a.id === l.account_id && a.status === "active",
        )
      )
        throw Error("Lease unavailable");
      const { data: m } = await ctx.db
        .from("account_memberships")
        .select("role")
        .eq("account_id", l.account_id)
        .eq("user_id", ctx.user.id)
        .eq("active", true)
        .maybeSingle();
      if (m?.role !== "owner" && ctx.staff !== "admin")
        throw Error("Owner required");
      const stripe = stripeClient();
      const service = serviceClient();
      if (action === "checkout") {
        if (l.status !== "accepted") throw Error("Consent required");
        const { data: units } = await ctx.db
          .from("lease_units")
          .select("purifier_id")
          .eq("lease_id", l.id);
        if (!units?.length) throw Error("Units required");
        let session = l.checkout_id
          ? await stripe.checkout.sessions.retrieve(l.checkout_id)
          : null;
        if (session?.status === "expired") session = null;
        if (!session)
          session = await stripe.checkout.sessions.create(
            {
              mode: "subscription",
              integration_identifier: "acquafy_lease_qmvtlxpa",
              allow_promotion_codes: true,
              client_reference_id: l.id,
              metadata: { integration: "acquafy_lease", lease_id: l.id },
              subscription_data: {
                metadata: { integration: "acquafy_lease", lease_id: l.id },
              },
              line_items: [
                {
                  quantity: 1,
                  price_data: {
                    currency: "usd",
                    unit_amount: l.monthly_minor,
                    recurring: { interval: "month" },
                    product_data: { name: l.title },
                  },
                },
              ],
              success_url: publicOrigin() + "/app/locacoes",
              cancel_url: publicOrigin() + "/app/locacoes",
            },
            {
              idempotencyKey:
                "lease-checkout-promo-" +
                l.id +
                "-" +
                (l.checkout_id ?? "initial"),
            },
          );
        const bound = await service
          .from("customer_leases")
          .update({ checkout_id: session.id })
          .eq("id", l.id);
        if (bound.error) throw Error("Binding failed");
        if (session.url) {
          revalidatePath("/locacoes");
          redirect(session.url);
        }
        return { success: "Aguardando confirmação do Stripe." };
      } else if (action === "cancel") {
        if (!l.subscription_id) throw Error("Subscription required");
        await stripe.subscriptions.update(
          l.subscription_id,
          { cancel_at_period_end: true },
          { idempotencyKey: "lease-cancel-" + l.id },
        );
        const r = await service
          .from("customer_leases")
          .update({ cancel_at_period_end: true })
          .eq("id", l.id);
        if (r.error) throw Error("Update failed");
      } else if (action === "billing") {
        if (!l.customer_id) throw Error("Customer unavailable");
        const portal = await stripe.billingPortal.sessions.create({
          customer: l.customer_id,
          return_url: publicOrigin() + "/app/locacoes",
        });
        redirect(portal.url);
      } else throw Error("Invalid action");
    }
    revalidatePath("/locacoes");
    return { success: "Alteração registrada." };
  } catch (e) {
    if (e instanceof Error && e.message === "NEXT_REDIRECT") throw e;
    return {
      error:
        "Não foi possível concluir. Verifique os dados, as permissões e a situação da locação.",
    };
  }
}
