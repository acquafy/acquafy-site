"use server";
import { redirect } from "next/navigation";
import { serverClient } from "@/lib/live/data";
import { buyNow } from "@/lib/flags";
import { publicOrigin } from "@/lib/enrollment/server";
import { customerDestination } from "./destination";

export type OrderCodeState = { error?: string; email?: string; sent?: boolean };

const validEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;

/**
 * Order page, step 1: e-mails a 6-digit code. A new address becomes a customer account (signup_kind "customer");
 * an existing one signs in. The code is typed on the same page, so the customer never leaves the order.
 */
export async function sendOrderCode(_state: OrderCodeState, f: FormData): Promise<OrderCodeState> {
  if (!(await buyNow())) return { error: "Novos pedidos não estão disponíveis no momento." };
  const email = String(f.get("email") ?? "").trim().toLowerCase();
  if (!validEmail(email) || f.get("consent") !== "yes")
    return { error: "Informe um e-mail válido e aceite a Política de Privacidade." };
  const { error } = await (await serverClient()).auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      data: { signup_kind: "customer" },
      // The e-mail carries the code and, with Supabase's default template, a link: both bring the customer back to this order.
      emailRedirectTo: publicOrigin() + "/app/auth/confirm?next=" + encodeURIComponent(customerDestination(String(f.get("next") ?? ""))),
    },
  });
  if (error) return { error: "Não foi possível enviar o código agora. Aguarde um minuto e tente novamente." };
  return { email, sent: true };
}

/** Order page, step 2: checks the code; the session cookie is set and the order page reloads with the customer signed in. */
export async function verifyOrderCode(_state: OrderCodeState, f: FormData): Promise<OrderCodeState> {
  const email = String(f.get("email") ?? "").trim().toLowerCase();
  const token = String(f.get("code") ?? "").replace(/\D/g, "");
  if (!validEmail(email) || token.length !== 6) return { email, sent: true, error: "Digite os 6 números do código." };
  const { error } = await (await serverClient()).auth.verifyOtp({ email, token, type: "email" });
  if (error) return { email, sent: true, error: "Código inválido ou expirado. Confira o e-mail ou peça um novo código." };
  redirect(customerDestination(String(f.get("next") ?? "")));
}

export type CepResult = { street: string; district: string; city: string; state: string } | null;

/** Brazilian postcode lookup (ViaCEP), on the server because the portal's CSP only allows its own origin. */
export async function lookupCep(cep: string): Promise<CepResult> {
  const digits = cep.replace(/\D/g, "");
  if (digits.length !== 8) return null;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`, { signal: AbortSignal.timeout(4000), cache: "force-cache" });
    if (!res.ok) return null;
    const data = (await res.json()) as Record<string, string | boolean>;
    if (data.erro) return null;
    return { street: String(data.logradouro ?? ""), district: String(data.bairro ?? ""), city: String(data.localidade ?? ""), state: String(data.uf ?? "") };
  } catch {
    return null;
  }
}
