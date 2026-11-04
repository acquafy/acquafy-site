import Link from "next/link";
import { context, date, money } from "@/lib/live/data";
import {
  memberEnrollment,
  beginCheckout,
  refreshPayment,
} from "@/lib/enrollment/actions";
import { checkoutConfigured } from "@/lib/enrollment/server";
import type { Enrollment, Offer, Acceptance } from "@/lib/enrollment/types";
import { enrollmentLabels } from "@/lib/enrollment/types";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { Field, Select } from "@/components/live/Fields";
export const metadata = { title: "Minha adesão" };
export default async function EnrollmentPage({
  searchParams,
}: {
  searchParams: Promise<{ enrollment?: string; checkout?: string }>;
}) {
  const ctx = await context(),
    query = await searchParams;
  const result = await ctx.db
    .from("investor_enrollments")
    .select("*")
    .eq("user_id", ctx.user.id)
    .order("created_at", { ascending: false })
    .limit(100);
  if (result.error) throw new Error("Não foi possível carregar suas adesões.");
  const rows = result.data as Enrollment[],
    selected = rows.find((r) => r.id === query.enrollment) ?? rows[0];
  if (!selected)
    return (
      <>
        <h1>Minha adesão</h1>
        <p className="live-card">
          Nenhuma adesão foi vinculada ao seu usuário. Solicite um convite à
          equipe.
        </p>
      </>
    );
  const [offerResult, acceptanceResult] = await Promise.all([
    ctx.db
      .from("investor_offers")
      .select("*")
      .eq("id", selected.offer_id)
      .single(),
    ctx.db
      .from("agreement_acceptances")
      .select("*")
      .eq("enrollment_id", selected.id)
      .maybeSingle(),
  ]);
  if (offerResult.error || acceptanceResult.error)
    throw new Error("Acordo indisponível.");
  const offer = offerResult.data as Offer,
    acceptance = acceptanceResult.data as Acceptance | null;
  return (
    <>
      <h1>Adesão à parceria investidor</h1>
      <p className="live-muted">Identidade: {ctx.user.email}</p>
      <div className="live-card">
        <h2>Suas adesões</h2>
        <ul>
          {rows.map((r) => (
            <li key={r.id}>
              <Link className="live-link" href={"/adesao?enrollment=" + r.id}>
                {date(r.created_at)} · {enrollmentLabels[r.status]} ·{" "}
                {money(r.amount_minor / 100)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="live-card">
        <h2>
          {offer.title} · {offer.version}
        </h2>
        <p>
          <strong>{enrollmentLabels[selected.status]}</strong>
        </p>
        <dl className="live-grid">
          <div>
            <dt>Equipamentos</dt>
            <dd>
              {selected.quantity} × {offer.unit_model}
            </dd>
          </div>
          <div>
            <dt>Valor unitário</dt>
            <dd>{money(offer.unit_amount_minor / 100)}</dd>
          </div>
          <div>
            <dt>Valor total</dt>
            <dd>{money(selected.amount_minor / 100)}</dd>
          </div>
          <div>
            <dt>Vigência</dt>
            <dd>{offer.term_months} meses a partir do pagamento confirmado</dd>
          </div>
        </dl>
        <p className="live-note">
          Fluxo: dados → análise da equipe → aceite do acordo → pagamento →
          ativação. O pagamento não confirma a instalação física dos
          equipamentos.
        </p>
      </div>
      {query.checkout === "returned" && (
        <p className="live-note">
          Retorno do pagamento recebido. A ativação depende da confirmação
          verificada do Stripe; esta página não confirma uma cobrança.
        </p>
      )}
      {query.checkout === "cancelled" && (
        <p className="live-note">
          Você saiu do Checkout. Seu acordo permanece registrado e a sessão pode
          ser retomada.
        </p>
      )}
      {Object.keys(selected.details).length > 0 && (
        <div className="live-card">
          <h2>Participante</h2>
          <p>{selected.details.legal_name}</p>
          <p>
            {[
              selected.details.address,
              selected.details.city,
              selected.details.region,
              selected.details.postal_code,
              selected.details.country,
            ]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>
      )}
      {selected.review_note && (
        <p className="live-note">Mensagem da equipe: {selected.review_note}</p>
      )}
      {["invited", "changes_requested"].includes(selected.status) && (
        <ActionForm
          action={memberEnrollment}
          title="Dados do participante"
          submit="Enviar para análise"
        >
          <input type="hidden" name="action" value="details" />
          <input type="hidden" name="enrollment_id" value={selected.id} />
          <Field
            defaultValue={selected.details.legal_name}
            name="legal_name"
            label="Nome completo ou razão social"
          />
          <Select
            name="entity_type"
            label="Tipo de participante"
            options={[
              { value: "individual", label: "Pessoa física" },
              { value: "company", label: "Pessoa jurídica" },
            ]}
          />
          <Field
            defaultValue={selected.details.phone}
            name="phone"
            label="Telefone com código do país"
            maxLength={40}
          />
          <Field
            defaultValue={selected.details.country}
            name="country"
            label="País (código de 2 letras, como US ou BR)"
            maxLength={2}
          />
          <Field
            defaultValue={selected.details.address}
            name="address"
            label="Endereço completo"
            maxLength={200}
          />
          <Field
            defaultValue={selected.details.city}
            name="city"
            label="Cidade"
            maxLength={100}
          />
          <Field
            defaultValue={selected.details.region}
            name="region"
            label="Estado ou região"
            maxLength={100}
            required={false}
          />
          <Field
            defaultValue={selected.details.postal_code}
            name="postal_code"
            label="Código postal"
            maxLength={30}
          />
          <p>
            Não informe senhas, números de cartão, SSN ou dados bancários neste
            formulário.
          </p>
        </ActionForm>
      )}
      {selected.status === "details_submitted" && (
        <p className="live-card">
          Seus dados estão com a equipe para análise. O acordo será liberado
          após aprovação.
        </p>
      )}
      <section className="live-card">
        <h2>Acordo de parceria</h2>
        <p>Versão {offer.version}</p>
        <div
          style={{
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
            maxHeight: 560,
            overflowY: "auto",
            padding: 16,
            border: "1px solid #dfe5ef",
          }}
        >
          {acceptance?.agreement_text ?? offer.agreement_text}
        </div>
        {acceptance ? (
          <>
            <p className="live-note">
              Aceite registrado por {acceptance.signer_name} em{" "}
              {date(acceptance.accepted_at)}.
            </p>
            <a
              className="live-link"
              href={"/app/api/agreements/" + selected.id}
            >
              Baixar acordo e evidência do aceite
            </a>
          </>
        ) : (
          <p className="live-muted">
            Leia o texto integral e confira o quadro comercial antes de aceitar.
          </p>
        )}
      </section>
      {selected.status === "approved" && (
        <ActionForm
          action={memberEnrollment}
          title="Aceite do acordo"
          submit="Registrar aceite"
        >
          <input type="hidden" name="action" value="accept" />
          <input type="hidden" name="enrollment_id" value={selected.id} />
          <input
            type="hidden"
            name="agreement_hash"
            value={offer.agreement_hash}
          />
          <Field
            name="signer_name"
            label="Seu nome completo, como representante autorizado"
          />
          <label>
            <input type="checkbox" name="consent" value="yes" required /> Li
            integralmente o acordo e o quadro comercial. Tenho poderes para
            representar o participante e concordo com os termos desta versão.
          </label>
        </ActionForm>
      )}
      {["accepted", "payment_pending"].includes(selected.status) && (
        <>
          <ActionForm
            action={beginCheckout}
            title="Pagamento da adesão"
            submit="Abrir pagamento seguro no Stripe"
          >
            <input type="hidden" name="enrollment_id" value={selected.id} />
            <p>
              Total: <strong>{money(selected.amount_minor / 100)}</strong>.
              Pagamento único.
            </p>
            {(process.env.STRIPE_ENVIRONMENT ?? "test") === "test" && (
              <p className="live-note">
                Ambiente de teste. Use os dados de teste do Stripe; nenhuma
                cobrança real será efetuada.
              </p>
            )}
            {!checkoutConfigured() && (
              <p>
                O pagamento ficará disponível quando a equipe concluir a
                configuração.
              </p>
            )}
          </ActionForm>
          <ActionForm
            action={refreshPayment}
            title="Consultar confirmação"
            submit="Atualizar situação do pagamento"
          >
            <input type="hidden" name="enrollment_id" value={selected.id} />
            <p>
              Métodos com compensação posterior permanecem em processamento até
              a confirmação.
            </p>
          </ActionForm>
        </>
      )}
      {selected.status === "active" && (
        <div className="live-card">
          <h2>Parceria ativa</h2>
          <p>
            O pagamento foi verificado e seu contrato está disponível no portal.
            A equipe dará sequência à alocação e instalação dos equipamentos.
          </p>
          <Link className="live-link" href="/contrato">
            Consultar contratos
          </Link>
        </div>
      )}
      {selected.status === "payment_review" && (
        <p className="live-note live-error">
          A confirmação financeira exige análise da equipe. Não faça um novo
          pagamento.{" "}
          <Link className="live-link" href="/suporte">
            Abrir chamado
          </Link>
        </p>
      )}
    </>
  );
}
