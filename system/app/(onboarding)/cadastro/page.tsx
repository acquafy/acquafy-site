import Link from "next/link";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { AUTH_LINK, AuthSplit } from "@/components/live/AuthSplit";
import { Consent, Field } from "@/components/live/Fields";
import { customerSignup } from "@/lib/orders/actions";
import { buyNow, requireFeature } from "@/lib/flags";
import { customerDestination } from "@/lib/orders/destination";

export const metadata = { title: "Criar Acquafy Account" };

export default async function Signup({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  await requireFeature(buyNow);
  const next = customerDestination((await searchParams).next);
  return (
    <AuthSplit
      title="Criar Acquafy Account"
      subtitle="Acompanhe pedidos, entrega, instalação e locações com sua própria conta."
      footer={
        <Link className={AUTH_LINK} href={"/login?next=" + encodeURIComponent(next)}>
          Já tenho conta · Entrar
        </Link>
      }
    >
      <ActionForm plain action={customerSignup} title="Seu cadastro" submit="Criar conta">
        <input type="hidden" name="next" value={next} />
        <Field name="email" label="E-mail" type="email" maxLength={254} autoComplete="email" placeholder="seu@email.com" />
        <Field name="password" label="Senha" type="password" minLength={12} maxLength={128} autoComplete="new-password" hint="De 12 a 128 caracteres." />
        <Consent name="consent">
          Li e aceito a{" "}
          <a className="font-semibold text-brand hover:underline" href="/privacy-policy" target="_blank" rel="noreferrer">
            Política de Privacidade
          </a>
          .
        </Consent>
      </ActionForm>
    </AuthSplit>
  );
}
