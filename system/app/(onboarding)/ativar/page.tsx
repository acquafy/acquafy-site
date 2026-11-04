import { ActionForm } from "@/components/enrollment/ActionForm";
import { AuthSplit } from "@/components/live/AuthSplit";
import { Field } from "@/components/live/Fields";
import { activateInvestor } from "@/lib/enrollment/actions";

export const metadata = { title: "Ativar acesso" };

export default async function Activate({
  searchParams,
}: {
  searchParams: Promise<{ token_hash?: string; type?: string; enrollment?: string }>;
}) {
  const p = await searchParams;
  return (
    <AuthSplit title="Ative seu acesso Acquafy" subtitle="Confirme seu convite e defina uma senha para acompanhar sua adesão.">
      <ActionForm plain action={activateInvestor} title="Criar senha" submit="Ativar acesso">
        <input type="hidden" name="token_hash" value={p.token_hash ?? ""} />
        <input type="hidden" name="type" value={p.type ?? ""} />
        <input type="hidden" name="enrollment" value={p.enrollment ?? ""} />
        <Field name="password" label="Senha" type="password" minLength={12} maxLength={128} autoComplete="new-password" hint="De 12 a 128 caracteres." />
        <Field name="confirmation" label="Confirme a senha" type="password" minLength={12} maxLength={128} autoComplete="new-password" />
      </ActionForm>
    </AuthSplit>
  );
}
