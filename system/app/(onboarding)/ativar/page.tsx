import { ActionForm } from "@/components/enrollment/ActionForm";
import { activateInvestor } from "@/lib/enrollment/actions";
import "../../(portal)/live.css";
export const metadata = { title: "Ativar acesso" };
export default async function Activate({
  searchParams,
}: {
  searchParams: Promise<{
    token_hash?: string;
    type?: string;
    enrollment?: string;
  }>;
}) {
  const p = await searchParams;
  return (
    <main className="live-portal" style={{ padding: "40px 20px" }}>
      <div style={{ maxWidth: 560, margin: "auto" }}>
        <h1>Ative seu acesso Acquafy</h1>
        <p>
          Confirme seu convite e defina uma senha para acompanhar sua adesão.
        </p>
        <ActionForm
          action={activateInvestor}
          title="Criar senha"
          submit="Ativar acesso"
        >
          <input type="hidden" name="token_hash" value={p.token_hash ?? ""} />
          <input type="hidden" name="type" value={p.type ?? ""} />
          <input type="hidden" name="enrollment" value={p.enrollment ?? ""} />
          <label className="live-field">
            Senha (12 a 128 caracteres)
            <input
              type="password"
              name="password"
              minLength={12}
              maxLength={128}
              autoComplete="new-password"
              required
            />
          </label>
          <label className="live-field">
            Confirme a senha
            <input
              type="password"
              name="confirmation"
              minLength={12}
              maxLength={128}
              autoComplete="new-password"
              required
            />
          </label>
        </ActionForm>
      </div>
    </main>
  );
}
