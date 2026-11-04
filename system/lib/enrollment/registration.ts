"use server";
import { serviceClient } from "./server";
import type { ActionResult } from "./types";
import { investorRegistration } from "@/lib/flags";
export async function registerInvestor(
  _state: ActionResult,
  form: FormData,
): Promise<ActionResult> {
  if (!(await investorRegistration()))
    return {
      error: "O cadastro de investidores não está disponível no momento.",
    };
  const text = (key: string) => String(form.get(key) ?? "").trim();
  const success = {
    success:
      "Solicitação recebida. A equipe analisará seu cadastro e entrará em contato com os próximos passos. O acesso ao portal será liberado por convite privado após a análise.",
  };
  if (text("website")) return success;
  const payload = {
    full_name: text("full_name"),
    email: text("email").toLowerCase(),
    phone: text("phone"),
    country: text("country"),
    company: text("company"),
    message: text("message"),
  };
  if (
    payload.full_name.length < 2 ||
    payload.full_name.length > 160 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) ||
    payload.email.length > 254 ||
    payload.phone.length < 5 ||
    payload.phone.length > 40 ||
    payload.country.length < 2 ||
    payload.country.length > 100 ||
    payload.company.length > 160 ||
    payload.message.length > 2000 ||
    text("consent") !== "yes"
  )
    return { error: "Confira os dados e autorize o contato da equipe." };
  try {
    const { error } = await serviceClient().rpc("submit_investor_application", {
      payload,
    });
    if (error)
      return {
        error: "Não foi possível enviar agora. Tente novamente mais tarde.",
      };
    return success;
  } catch {
    return {
      error:
        "Cadastro temporariamente indisponível. Tente novamente mais tarde.",
    };
  }
}
