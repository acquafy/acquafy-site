import Link from "next/link";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { Field } from "@/components/live/Fields";
import { registerInvestor } from "@/lib/enrollment/registration";
import "../../(portal)/live.css";
export const metadata = { title: "Cadastro de investidor" };
export default function InvestorRegistration() {
  return (
    <main className="live-portal" style={{ padding: "40px 20px" }}>
      <div style={{ maxWidth: 640, margin: "auto" }}>
        {/* Cross-application link: Next Link would add the portal basePath. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="live-link" href="/">
          ← Voltar ao site Acquafy
        </a>
        <h1>Parceria investidor · Media Network</h1>
        <p>
          Cadastre seu interesse. Após a análise da equipe, você receberá um
          convite privado para completar seus dados, conhecer as condições
          aprovadas, aceitar o acordo e efetuar o pagamento no portal.
        </p>
        <ActionForm
          action={registerInvestor}
          title="Cadastro de interesse"
          submit="Enviar cadastro"
        >
          <Field name="full_name" label="Nome completo" />
          <Field name="email" label="E-mail" type="email" maxLength={254} />
          <Field
            name="phone"
            label="Telefone com código do país"
            type="tel"
            maxLength={40}
          />
          <Field name="country" label="País / Região" maxLength={100} />
          <Field name="company" label="Empresa (opcional)" required={false} />
          <label className="live-field">
            Mensagem (opcional)
            <textarea name="message" maxLength={2000} rows={4} />
          </label>
          <div hidden aria-hidden="true">
            <label>
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <label>
            <input type="checkbox" name="consent" value="yes" required />{" "}
            Autorizo a Acquafy a usar estes dados para analisar meu interesse e
            entrar em contato sobre esta parceria, conforme a{" "}
            <a
              className="live-link"
              href="/privacy-policy"
              target="_blank"
              rel="noreferrer"
            >
              Política de Privacidade
            </a>
            .
          </label>
          <p className="live-note">
            Este cadastro não cria um contrato nem realiza uma cobrança. As
            condições comerciais serão apresentadas no convite da equipe.
          </p>
        </ActionForm>
        <p>
          Já possui acesso?{" "}
          <Link className="live-link" href="/login?next=adesao">
            Entrar e continuar minha adesão
          </Link>
          . Se recebeu um convite, use o link privado enviado pela equipe para
          ativar seu acesso.
        </p>
      </div>
    </main>
  );
}
