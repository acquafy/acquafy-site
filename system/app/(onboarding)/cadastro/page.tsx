import Link from "next/link";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { Field } from "@/components/live/Fields";
import { customerSignup } from "@/lib/orders/actions";
import { customerDestination } from "@/lib/orders/destination";
import "../../(portal)/live.css";
export const metadata = { title: "Criar Acquafy Account" };
export default async function Signup({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const next = customerDestination((await searchParams).next);
  return (
    <main
      className="live-portal"
      style={{ padding: "40px 20px", maxWidth: 650, margin: "auto" }}
    >
      <h1>Criar Acquafy Account</h1>
      <p>
        Acompanhe pedidos, entrega, instalação e locações com sua própria conta.
      </p>
      <ActionForm
        action={customerSignup}
        title="Seu cadastro"
        submit="Criar conta"
      >
        <input type="hidden" name="next" value={next} />
        <Field name="email" label="E-mail" type="email" maxLength={254} />
        <label className="live-field">
          Senha (12 a 128 caracteres)
          <input
            name="password"
            type="password"
            required
            minLength={12}
            maxLength={128}
            autoComplete="new-password"
          />
        </label>
        <label>
          <input required type="checkbox" name="consent" value="yes" /> Li e
          aceito a{" "}
          <a href="/privacy-policy" target="_blank" rel="noreferrer">
            Política de Privacidade
          </a>
          .
        </label>
      </ActionForm>
      <Link href={"/login?next=" + encodeURIComponent(next)}>
        Já tenho conta · Entrar
      </Link>
    </main>
  );
}
