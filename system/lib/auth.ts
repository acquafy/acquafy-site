import { portalPath } from "./paths";

export type SignInResult = { ok: true; internal: boolean; partner: boolean } | { ok: false; error: "invalid" | "unavailable" | "forbidden" };

export async function signIn(input: { email: string; password: string; remember: boolean }): Promise<SignInResult> {
  try {
    const response = await fetch(portalPath("/api/auth/login"), {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input),
    });
    if (response.ok) {
      const body = (await response.json()) as { internal?: boolean; partner?: boolean };
      return { ok: true, internal: body.internal === true, partner: body.partner === true };
    }
    return { ok: false, error: response.status === 403 ? "forbidden" : response.status >= 500 ? "unavailable" : "invalid" };
  } catch {
    return { ok: false, error: "unavailable" };
  }
}

export async function endSession(): Promise<void> {
  const response = await fetch(portalPath("/api/auth/logout"), {
    method: "POST", headers: { "Content-Type": "application/json" }, body: "{}",
  });
  if (!response.ok) throw new Error("Não foi possível encerrar a sessão. Tente novamente.");
}
