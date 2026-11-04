"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { activationProof, validActivationProof } from "./activation";
import { revalidatePath } from "next/cache";
import { context, serverClient } from "@/lib/live/data";
import {
  serviceClient,
  stripeClient,
  publicOrigin,
  checkoutConfigured,
} from "./server";
import type { ActionResult, Offer, Enrollment, Checkout } from "./types";
import { usdToMinor } from "./validation";
const value = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const uuid = (s: string) => /^[a-f0-9-]{36}$/i.test(s);
function failure() {
  return {
    error:
      "Não foi possível concluir. Confira os dados, a situação da adesão e tente novamente.",
  };
}
export async function staffEnrollment(
  _previous: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const ctx = await context();
  if (ctx.staff !== "admin") return { error: "Acesso restrito." };
  const action = value(form, "action");
  const allowed = [
    "publish",
    "withdraw",
    "approve",
    "request_changes",
    "cancel",
    "review_payment",
  ];
  if (!allowed.includes(action)) return failure();
  const payload = Object.fromEntries(
    [...form.entries()].filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
  if (action === "publish") {
    const amount = usdToMinor(value(form, "unit_price"));
    if (amount === null)
      return {
        error: "Informe um preço válido em USD, com até duas casas decimais.",
      };
    payload.unit_amount_minor = String(amount);
  }
  const { error } = await ctx.db.rpc("enrollment_staff", { action, payload });
  if (error) {
    console.error("enrollment staff command rejected", {
      action,
      code: error.code,
    });
    return failure();
  }
  revalidatePath("/app", "layout");
  return { success: "Alteração registrada." };
}
export async function inviteInvestor(
  _previous: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const ctx = await context();
  if (ctx.staff !== "admin") return { error: "Acesso restrito." };
  const email = value(form, "email").toLowerCase(),
    offerId = value(form, "offer_id"),
    quantity = Number(value(form, "quantity"));
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    !uuid(offerId) ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 1000
  )
    return failure();
  const { data: offer, error: offerError } = await ctx.db
    .from("investor_offers")
    .select("id,min_quantity,max_quantity")
    .eq("id", offerId)
    .eq("enabled", true)
    .maybeSingle();
  if (
    offerError ||
    !offer ||
    quantity < offer.min_quantity ||
    quantity > offer.max_quantity
  )
    return failure();
  try {
    const origin = publicOrigin();
    const service = serviceClient();
    const { data: userId, error: lookupError } = await ctx.db.rpc(
      "enrollment_lookup_user",
      { email_address: email },
    );
    if (lookupError) return failure();
    let inviteHash: string | undefined;
    let inviteType: "invite" | "magiclink" = "invite";
    let user;
    if (userId) {
      const r = await service.auth.admin.getUserById(userId);
      if (r.error) return failure();
      user = r.data.user;
    }
    if (!user?.email_confirmed_at) {
      inviteType = user ? "magiclink" : "invite";
      const r = await service.auth.admin.generateLink({
        type: inviteType,
        email,
      });
      if (r.error || !r.data.properties?.hashed_token)
        return {
          error:
            "Não foi possível preparar o convite. Confira o endereço e tente novamente.",
        };
      inviteHash = r.data.properties.hashed_token;
      user = r.data.user;
    }
    if (!user) return failure();
    if (!["internal", "partner"].includes(user.app_metadata?.portal_role)) {
      const r = await service.auth.admin.updateUserById(user.id, {
        app_metadata: { ...user.app_metadata, portal_role: "partner" },
      });
      if (r.error) return failure();
    }
    const { data: id, error } = await ctx.db.rpc("enrollment_staff", {
      action: "invite",
      payload: {
        email,
        offer_id: offerId,
        quantity,
        account_id: value(form, "account_id"),
        account_name: value(form, "account_name"),
      },
    });
    if (error) return failure();
    const link = inviteHash
      ? `${origin}/app/ativar?token_hash=${encodeURIComponent(inviteHash)}&type=${inviteType}&enrollment=${id}`
      : `${origin}/app/adesao?enrollment=${id}`;
    revalidatePath("/app", "layout");
    return {
      success:
        "Convite preparado. Compartilhe o link de forma privada. Nenhum e-mail foi enviado automaticamente.",
      link,
    };
  } catch (error) {
    console.error("Enrollment invitation unavailable", {
      kind: error instanceof Error ? error.name : "error",
    });
    return {
      error:
        "O serviço de convites não está disponível. Peça ao administrador para conferir a configuração.",
    };
  }
}
export async function activateInvestor(
  _previous: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const password = value(form, "password"),
    confirmation = value(form, "confirmation"),
    hash = value(form, "token_hash"),
    kind = value(form, "type");
  if (
    password.length < 12 ||
    password.length > 128 ||
    password !== confirmation
  )
    return {
      error: "Use uma senha de 12 a 128 caracteres e confirme a mesma senha.",
    };
  const db = await serverClient();
  let current = await db.auth.getUser();
  const enrollment = value(form, "enrollment");
  const jar = await cookies();
  if (
    !current.data.user ||
    !validActivationProof(
      jar.get("acq-activation")?.value,
      current.data.user.id,
      enrollment,
    )
  ) {
    if (
      !/^[a-zA-Z0-9_-]{20,200}$/.test(hash) ||
      !["invite", "magiclink"].includes(kind)
    )
      return {
        error: "Convite inválido ou expirado. Solicite um novo link à equipe.",
      };
    const verified = await db.auth.verifyOtp({
      token_hash: hash,
      type: kind as "invite" | "magiclink",
    });
    if (verified.error)
      return {
        error: "Convite inválido ou expirado. Solicite um novo link à equipe.",
      };
    current = await db.auth.getUser();
    if (current.data.user)
      jar.set(
        "acq-activation",
        activationProof(current.data.user.id, enrollment),
        {
          path: "/app/ativar",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 900,
        },
      );
  }
  if (
    !current.data.user?.email_confirmed_at ||
    !["internal", "partner"].includes(
      current.data.user.app_metadata.portal_role,
    )
  )
    return { error: "Acesso ainda não aprovado pela equipe." };
  const owned = await db
    .from("investor_enrollments")
    .select("id,status")
    .eq("id", enrollment)
    .eq("user_id", current.data.user.id)
    .maybeSingle();
  if (owned.error || !owned.data || owned.data.status === "cancelled")
    return {
      error:
        "Esta adesão não está disponível para ativação. Fale com a equipe.",
    };
  const changed = await db.auth.updateUser({ password });
  if (changed.error)
    return {
      error:
        "Não foi possível definir a senha. Use outra senha ou solicite ajuda à equipe.",
    };
  jar.set("acq-activation", "", {
    path: "/app/ativar",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  const id = value(form, "enrollment");
  redirect("/app/adesao" + (uuid(id) ? "?enrollment=" + id : ""));
}
export async function memberEnrollment(
  _previous: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const { db } = await context();
  const action = value(form, "action");
  if (!["details", "accept"].includes(action)) return failure();
  const payload = Object.fromEntries(
    [...form.entries()].filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
  const { error } = await db.rpc("enrollment_member", { action, payload });
  if (error) return failure();
  revalidatePath("/app", "layout");
  return {
    success:
      action === "accept"
        ? "Aceite registrado. Você pode prosseguir para o pagamento."
        : "Dados enviados para análise.",
  };
}
export async function beginCheckout(
  _previous: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const { db } = await context();
  if (!checkoutConfigured())
    return {
      error:
        "Pagamento indisponível no momento. A equipe precisa concluir a configuração.",
    };
  const id = value(form, "enrollment_id");
  if (!uuid(id)) return failure();
  let url: string | undefined;
  try {
    const { data: attemptId, error } = await db.rpc(
      "enrollment_prepare_checkout",
      { target: id },
    );
    if (error || !attemptId) return failure();
    const attemptResult = await db
      .from("enrollment_checkouts")
      .select("*")
      .eq("id", attemptId)
      .single();
    const enrollmentResult = await db
      .from("investor_enrollments")
      .select("*")
      .eq("id", id)
      .single();
    if (attemptResult.error || enrollmentResult.error) return failure();
    const attempt = attemptResult.data as Checkout,
      enrollment = enrollmentResult.data as Enrollment;
    const stripe = stripeClient();
    const service = serviceClient();
    const offerResult = await db
      .from("investor_offers")
      .select("*")
      .eq("id", enrollment.offer_id)
      .single();
    if (offerResult.error) return failure();
    const offer = offerResult.data as Offer;
    if (attempt.stripe_session_id) {
      const existing = await stripe.checkout.sessions.retrieve(
        attempt.stripe_session_id,
      );
      if (existing.status === "open" && existing.url) url = existing.url;
      else if (existing.status === "expired") {
        const { applySession } = await import("./payments");
        await applySession(existing.id, {
          id: "reconcile_expired_" + existing.id,
          type: "server.reconciliation",
          created: Math.floor(Date.now() / 1000),
        });
        return {
          error:
            "Esta sessão expirou. Clique novamente para abrir uma nova sessão de pagamento.",
        };
      } else
        return {
          error:
            "Aguardando confirmação do pagamento. Atualize esta página em instantes.",
        };
    } else {
      const origin = publicOrigin();
      const session = await stripe.checkout.sessions.create(
        {
          mode: "payment",
          client_reference_id: attempt.id,
          integration_identifier: "acquafy_investor_qmvtlxpa",
          line_items: [
            {
              price_data: {
                currency: attempt.currency,
                unit_amount: offer.unit_amount_minor,
                product_data: {
                  name: offer.title,
                  description: `${enrollment.quantity} × ${offer.unit_model} · versão ${offer.version}`,
                },
              },
              quantity: enrollment.quantity,
            },
          ],
          metadata: {
            integration: "acquafy_investor",
            enrollment_id: id,
            attempt_id: attempt.id,
          },
          payment_intent_data: {
            metadata: {
              integration: "acquafy_investor",
              enrollment_id: id,
              attempt_id: attempt.id,
            },
          },
          success_url: `${origin}/app/adesao?enrollment=${id}&checkout=returned`,
          cancel_url: `${origin}/app/adesao?enrollment=${id}&checkout=cancelled`,
          expires_at:
            Math.floor(new Date(attempt.created_at).getTime() / 1000) +
            23 * 3600,
        },
        { idempotencyKey: `investor-checkout-${attempt.id}` },
      );
      const bound = await service.rpc("enrollment_gateway", {
        operation: "bind",
        payload: {
          attempt_id: attempt.id,
          session_id: session.id,
          amount_minor: session.amount_total,
          currency: session.currency,
          livemode: session.livemode,
        },
      });
      if (bound.error) {
        console.error("Stripe binding failed", { code: bound.error.code });
        return {
          error:
            "Não foi possível vincular o pagamento. Tente novamente; uma nova cobrança não será criada.",
        };
      }
      url = session.url ?? undefined;
    }
  } catch (error) {
    console.error("Enrollment checkout unavailable", {
      kind: error instanceof Error ? error.name : "error",
    });
    return {
      error:
        "Não foi possível abrir o pagamento. Tente novamente em instantes.",
    };
  }
  if (!url || new URL(url).hostname !== "checkout.stripe.com") return failure();
  redirect(url);
}

export async function refreshPayment(
  _previous: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const { db } = await context();
  const id = value(form, "enrollment_id");
  if (!uuid(id)) return failure();
  const { data, error } = await db
    .from("enrollment_checkouts")
    .select("stripe_session_id")
    .eq("enrollment_id", id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data?.stripe_session_id) return failure();
  try {
    const { applySession } = await import("./payments");
    await applySession(data.stripe_session_id, {
      id: `reconcile_${data.stripe_session_id}_${Math.floor(Date.now() / 1000)}`,
      type: "server.reconciliation",
      created: Math.floor(Date.now() / 1000),
    });
  } catch {
    return {
      error:
        "Não foi possível consultar o pagamento. Tente novamente em instantes.",
    };
  }
  revalidatePath("/app", "layout");
  return {
    success:
      "Situação consultada no Stripe. Se o método estiver em processamento, aguarde a confirmação.",
  };
}

export async function renewInvitation(
  _previous: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  const ctx = await context();
  if (ctx.staff !== "admin") return failure();
  const id = value(form, "enrollment_id");
  if (!uuid(id)) return failure();
  const result = await ctx.db
    .from("investor_enrollments")
    .select("user_id,status")
    .eq("id", id)
    .single();
  if (result.error || result.data.status === "cancelled") return failure();
  try {
    const origin = publicOrigin(),
      service = serviceClient();
    const user = await service.auth.admin.getUserById(result.data.user_id);
    if (
      user.error ||
      !["internal", "partner"].includes(user.data.user.app_metadata.portal_role)
    )
      return failure();
    if (user.data.user.email_confirmed_at)
      return {
        success: "Compartilhe o link com o participante já cadastrado.",
        link: `${origin}/app/adesao?enrollment=${id}`,
      };
    const generated = await service.auth.admin.generateLink({
      type: "magiclink",
      email: user.data.user.email!,
    });
    if (generated.error) return failure();
    return {
      success:
        "Novo link preparado. Compartilhe de forma privada com o destinatário.",
      link: `${origin}/app/ativar?token_hash=${encodeURIComponent(generated.data.properties.hashed_token)}&type=magiclink&enrollment=${id}`,
    };
  } catch {
    return failure();
  }
}
