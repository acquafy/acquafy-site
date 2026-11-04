import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { AUTH_LINK, AuthSplit } from "@/components/live/AuthSplit";
import { Area, Consent, Field } from "@/components/live/Fields";
import { Notice } from "@/components/live/Notice";
import { requireFeature, investorRegistration } from "@/lib/flags";
import { registerInvestor } from "@/lib/enrollment/registration";

export const metadata = { title: "Cadastro de investidor" };

export default async function InvestorRegistration() {
  await requireFeature(investorRegistration);
  return (
    <AuthSplit
      title="Parceria investidor · Media Network"
      subtitle="Cadastre seu interesse. Após a análise da equipe, você receberá um convite privado para completar seus dados, conhecer as condições aprovadas, aceitar o acordo e efetuar o pagamento no portal."
      footer={
        <>
          <p>
            Já possui acesso?{" "}
            <Link className={AUTH_LINK} href="/login?next=adesao">
              Entrar e continuar minha adesão
            </Link>
            . Se recebeu um convite, use o link privado enviado pela equipe para ativar seu acesso.
          </p>
          {/* Cross-application link: Next Link would add the portal basePath. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className={AUTH_LINK + " mt-3 inline-flex items-center gap-1.5"} href="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar ao site Acquafy
          </a>
        </>
      }
    >
      <ActionForm plain action={registerInvestor} title="Cadastro de interesse" submit="Enviar cadastro">
        <Field name="full_name" label="Nome completo" autoComplete="name" />
        <Field name="email" label="E-mail" type="email" maxLength={254} autoComplete="email" />
        <Field name="phone" label="Telefone com código do país" type="tel" maxLength={40} autoComplete="tel" />
        <Field name="country" label="País / Região" maxLength={100} />
        <Field name="company" label="Empresa (opcional)" required={false} />
        <Area name="message" label="Mensagem (opcional)" maxLength={2000} required={false} />
        <div hidden aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <Consent name="consent">
          Autorizo a Acquafy a usar estes dados para analisar meu interesse e entrar em contato sobre esta parceria, conforme a{" "}
          <a className="font-semibold text-brand hover:underline" href="/privacy-policy" target="_blank" rel="noreferrer">
            Política de Privacidade
          </a>
          .
        </Consent>
        <Notice>Este cadastro não cria um contrato nem realiza uma cobrança. As condições comerciais serão apresentadas no convite da equipe.</Notice>
      </ActionForm>
    </AuthSplit>
  );
}
