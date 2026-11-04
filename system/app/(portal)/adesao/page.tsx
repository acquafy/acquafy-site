import Link from "next/link";
import { FileX2 } from "lucide-react";
import { context, date, money } from "@/lib/live/data";
import { memberEnrollment, beginCheckout, refreshPayment } from "@/lib/enrollment/actions";
import { checkoutConfigured } from "@/lib/enrollment/server";
import type { Enrollment, Offer, Acceptance } from "@/lib/enrollment/types";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { Consent, Field, Select } from "@/components/live/Fields";
import { DataTable } from "@/components/live/DataTable";
import { EnrollmentStatus } from "@/components/live/EnrollmentStatus";
import { Notice } from "@/components/live/Notice";
import { PageHeader } from "@/components/live/PageHeader";
import { buttonClass, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = { title: "Minha adesão" };

export default async function EnrollmentPage({ searchParams }: { searchParams: Promise<{ enrollment?: string; checkout?: string }> }) {
  const ctx = await context(),
    query = await searchParams;
  const result = await ctx.db.from("investor_enrollments").select("*").eq("user_id", ctx.user.id).order("created_at", { ascending: false }).limit(100);
  if (result.error) throw new Error("Não foi possível carregar suas adesões.");
  const rows = result.data as Enrollment[],
    selected = rows.find((r) => r.id === query.enrollment) ?? rows[0];
  if (!selected)
    return (
      <>
        <PageHeader title="Minha adesão" subtitle="Acompanhe sua parceria de investidor." />
        <Card>
          <EmptyState icon={FileX2} title="Nenhuma adesão vinculada" description="Nenhuma adesão foi vinculada ao seu usuário. Solicite um convite à equipe." />
        </Card>
      </>
    );
  const [offerResult, acceptanceResult] = await Promise.all([
    ctx.db.from("investor_offers").select("*").eq("id", selected.offer_id).single(),
    ctx.db.from("agreement_acceptances").select("*").eq("enrollment_id", selected.id).maybeSingle(),
  ]);
  if (offerResult.error || acceptanceResult.error) throw new Error("Acordo indisponível.");
  const offer = offerResult.data as Offer,
    acceptance = acceptanceResult.data as Acceptance | null;
  return (
    <>
      <PageHeader title="Adesão à parceria investidor" subtitle={`Identidade: ${ctx.user.email}`} />
      <DataTable
        title="Suas adesões"
        caption="Adesões à parceria investidor"
        columns={[{ heading: "Data" }, { heading: "Situação" }, { heading: "Valor", align: "right" }, { heading: "Detalhes" }]}
        rows={rows.map((r) => [
          date(r.created_at),
          <EnrollmentStatus key={r.id} status={r.status} />,
          money(r.amount_minor / 100),
          r.id === selected.id ? (
            <span key={r.id} className="text-ink-soft">
              Em exibição
            </span>
          ) : (
            <Link key={r.id} className="font-semibold text-brand hover:underline" href={"/adesao?enrollment=" + r.id}>
              Abrir
            </Link>
          ),
        ])}
      />
      <Card title={`${offer.title} · ${offer.version}`} action={<EnrollmentStatus status={selected.status} />}>
        <DefinitionList
          rows={[
            { label: "Equipamentos", value: `${selected.quantity} × ${offer.unit_model}` },
            { label: "Valor unitário", value: money(offer.unit_amount_minor / 100) },
            { label: "Valor total", value: money(selected.amount_minor / 100) },
            { label: "Vigência", value: `${offer.term_months} meses a partir do pagamento confirmado` },
          ]}
        />
        <Notice className="mt-4">Fluxo: dados → análise da equipe → aceite do acordo → pagamento → ativação. O pagamento não confirma a instalação física dos equipamentos.</Notice>
      </Card>
      {query.checkout === "returned" && <Notice>Retorno do pagamento recebido. A ativação depende da confirmação verificada do Stripe; esta página não confirma uma cobrança.</Notice>}
      {query.checkout === "cancelled" && <Notice>Você saiu do Checkout. Seu acordo permanece registrado e a sessão pode ser retomada.</Notice>}
      {Object.keys(selected.details).length > 0 && (
        <Card title="Participante">
          <DefinitionList
            rows={[
              { label: "Nome", value: selected.details.legal_name },
              {
                label: "Endereço",
                value: [selected.details.address, selected.details.city, selected.details.region, selected.details.postal_code, selected.details.country].filter(Boolean).join(", "),
              },
            ]}
          />
        </Card>
      )}
      {selected.review_note && <Notice tone="warn" title="Mensagem da equipe">{selected.review_note}</Notice>}
      {["invited", "changes_requested"].includes(selected.status) && (
        <ActionForm action={memberEnrollment} title="Dados do participante" submit="Enviar para análise">
          <input type="hidden" name="action" value="details" />
          <input type="hidden" name="enrollment_id" value={selected.id} />
          <Field defaultValue={selected.details.legal_name} name="legal_name" label="Nome completo ou razão social" />
          <Select
            name="entity_type"
            label="Tipo de participante"
            options={[
              { value: "individual", label: "Pessoa física" },
              { value: "company", label: "Pessoa jurídica" },
            ]}
          />
          <Field defaultValue={selected.details.phone} name="phone" label="Telefone com código do país" maxLength={40} />
          <Field defaultValue={selected.details.country} name="country" label="País (código de 2 letras, como US ou BR)" maxLength={2} />
          <Field defaultValue={selected.details.address} name="address" label="Endereço completo" maxLength={200} />
          <Field defaultValue={selected.details.city} name="city" label="Cidade" maxLength={100} />
          <Field defaultValue={selected.details.region} name="region" label="Estado ou região" maxLength={100} required={false} />
          <Field defaultValue={selected.details.postal_code} name="postal_code" label="Código postal" maxLength={30} />
          <Notice tone="warn">Não informe senhas, números de cartão, SSN ou dados bancários neste formulário.</Notice>
        </ActionForm>
      )}
      {selected.status === "details_submitted" && <Notice>Seus dados estão com a equipe para análise. O acordo será liberado após aprovação.</Notice>}
      <Card title="Acordo de parceria" action={<span className="text-[14px] text-ink-soft">Versão {offer.version}</span>}>
        <div
          tabIndex={0}
          role="region"
          aria-label="Texto integral do acordo"
          className="max-h-[35rem] overflow-y-auto rounded-lg bg-canvas/60 p-4 text-[14.5px] leading-relaxed whitespace-pre-wrap text-ink [overflow-wrap:anywhere] focus-visible:outline-2 focus-visible:outline-brand"
        >
          {acceptance?.agreement_text ?? offer.agreement_text}
        </div>
        {acceptance ? (
          <div className="mt-4 grid gap-3">
            <Notice tone="success">
              Aceite registrado por {acceptance.signer_name} em {date(acceptance.accepted_at)}.
            </Notice>
            <div>
              <a className={buttonClass({ variant: "outline", size: "sm" })} href={"/app/api/agreements/" + selected.id}>
                Baixar acordo e evidência do aceite
              </a>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-[14px] text-ink-soft">Leia o texto integral e confira o quadro comercial antes de aceitar.</p>
        )}
      </Card>
      {selected.status === "approved" && (
        <ActionForm action={memberEnrollment} title="Aceite do acordo" submit="Registrar aceite">
          <input type="hidden" name="action" value="accept" />
          <input type="hidden" name="enrollment_id" value={selected.id} />
          <input type="hidden" name="agreement_hash" value={offer.agreement_hash} />
          <Field name="signer_name" label="Seu nome completo, como representante autorizado" />
          <Consent name="consent">Li integralmente o acordo e o quadro comercial. Tenho poderes para representar o participante e concordo com os termos desta versão.</Consent>
        </ActionForm>
      )}
      {["accepted", "payment_pending"].includes(selected.status) && (
        <>
          <ActionForm action={beginCheckout} title="Pagamento da adesão" submit="Abrir pagamento seguro no Stripe">
            <input type="hidden" name="enrollment_id" value={selected.id} />
            <p className="text-[15px] text-ink">
              Total: <strong>{money(selected.amount_minor / 100)}</strong>. Pagamento único.
            </p>
            {(process.env.STRIPE_ENVIRONMENT ?? "test") === "test" && <Notice>Ambiente de teste. Use os dados de teste do Stripe; nenhuma cobrança real será efetuada.</Notice>}
            {!checkoutConfigured() && <Notice tone="warn">O pagamento ficará disponível quando a equipe concluir a configuração.</Notice>}
          </ActionForm>
          <ActionForm action={refreshPayment} title="Consultar confirmação" submit="Atualizar situação do pagamento">
            <input type="hidden" name="enrollment_id" value={selected.id} />
            <p className="text-[14.5px] text-ink-soft">Métodos com compensação posterior permanecem em processamento até a confirmação.</p>
          </ActionForm>
        </>
      )}
      {selected.status === "active" && (
        <Card title="Parceria ativa">
          <p className="mb-4 text-[15px] text-ink-soft">O pagamento foi verificado e seu contrato está disponível no portal. A equipe dará sequência à alocação e instalação dos equipamentos.</p>
          <ButtonLink href="/contrato">Consultar contratos</ButtonLink>
        </Card>
      )}
      {selected.status === "payment_review" && (
        <Notice tone="danger" title="Pagamento em análise">
          A confirmação financeira exige análise da equipe. Não faça um novo pagamento.
          <div className="mt-3">
            <ButtonLink href="/suporte" variant="outline" size="sm">
              Abrir chamado
            </ButtonLink>
          </div>
        </Notice>
      )}
    </>
  );
}
