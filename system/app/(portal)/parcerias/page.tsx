import Link from "next/link";
import { notFound } from "next/navigation";
import { context, date, money } from "@/lib/live/data";
import {
  staffEnrollment,
  inviteInvestor,
  renewInvitation,
  refreshPayment,
} from "@/lib/enrollment/actions";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { Field, Select } from "@/components/live/Fields";
import type { Offer, Enrollment } from "@/lib/enrollment/types";
import { enrollmentLabels } from "@/lib/enrollment/types";
export const metadata = { title: "Ofertas e adesões" };
export default async function Partnerships({
  searchParams,
}: {
  searchParams: Promise<{ application?: string }>;
}) {
  const ctx = await context();
  const query = await searchParams;
  if (ctx.staff !== "admin") notFound();
  const [offersResult, enrollmentsResult] = await Promise.all([
    ctx.db
      .from("investor_offers")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(100),
    ctx.db
      .from("investor_enrollments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100),
  ]);
  if (offersResult.error || enrollmentsResult.error)
    throw new Error("Não foi possível carregar as parcerias.");
  const applicationsResult = await ctx.db
    .from("investor_applications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  if (applicationsResult.error)
    throw new Error("Não foi possível carregar os cadastros.");
  const applications = applicationsResult.data;
  const selectedApplication = applications.find(
    (a) => a.id === (query.application ?? "") && !a.enrollment_id,
  );
  const offers = offersResult.data as Offer[],
    enrollments = enrollmentsResult.data as Enrollment[];
  const unmatched = await ctx.db
    .from("stripe_events")
    .select("event_id,event_type,object_id,processed_at")
    .like("event_type", "unmatched.%")
    .order("processed_at", { ascending: false })
    .limit(20);
  if (unmatched.error)
    throw new Error("Não foi possível carregar os eventos de pagamento.");
  return (
    <>
      <h1>Ofertas e adesões</h1>
      <section className="live-card">
        <h2>Cadastros do site</h2>
        <p>
          Analise o interesse e confirme o contato antes de preparar o convite.
          O cadastro público não libera acesso nem aceita condições comerciais.
        </p>
        {applications.length === 0 && <p>Nenhum cadastro recebido.</p>}
        {applications.map((a) => (
          <article className="live-card" key={a.id}>
            <h3>{a.full_name}</h3>
            <p>
              {a.email} · {a.phone} · {a.country} · {date(a.created_at)}
            </p>
            {a.company && <p>Empresa: {a.company}</p>}
            {a.message && <p style={{ whiteSpace: "pre-wrap" }}>{a.message}</p>}
            {a.enrollment_id ? (
              <p>
                Convite preparado · adesão {a.enrollment_id}. Localize-a abaixo
                para acompanhar ou renovar o link privado.
              </p>
            ) : (
              <Link
                className="live-link"
                href={"/parcerias?application=" + a.id + "#convite"}
              >
                Preparar convite para este cadastro
              </Link>
            )}
          </article>
        ))}
      </section>
      {unmatched.data.length > 0 && (
        <section className="live-card live-error">
          <h2>Pagamentos sem vínculo para análise</h2>
          <p>
            Eventos verificados do Stripe não encontraram uma adesão. Confira os
            identificadores no Stripe antes de qualquer ativação.
          </p>
          <ul>
            {unmatched.data.map((event) => (
              <li key={event.event_id}>
                {event.object_id} · {event.event_type} ·{" "}
                {date(event.processed_at)}
              </li>
            ))}
          </ul>
        </section>
      )}
      <p>
        Publique somente termos e preços aprovados. Cada versão é imutável; para
        alterar condições, publique uma nova versão.
      </p>
      <div className="live-grid">
        <ActionForm
          action={staffEnrollment}
          title="Publicar oferta aprovada"
          submit="Publicar versão"
        >
          <input type="hidden" name="action" value="publish" />
          <Field name="title" label="Título da parceria" />
          <Field name="version" label="Versão do acordo" maxLength={60} />
          <Field
            name="unit_model"
            label="Modelo do equipamento"
            maxLength={100}
          />
          <Field
            name="unit_price"
            label="Preço final por unidade (USD)"
            type="number"
          />
          <Field
            name="term_months"
            label="Vigência em meses após confirmação do pagamento"
            type="number"
          />
          <Field name="min_quantity" label="Quantidade mínima" type="number" />
          <Field name="max_quantity" label="Quantidade máxima" type="number" />
          <p className="live-note">
            O Checkout cobra o valor final publicado. Tributos e frete não são
            calculados separadamente nesta configuração.
          </p>
          <label className="live-field">
            Texto integral do acordo aprovado
            <textarea
              name="agreement_text"
              required
              minLength={100}
              maxLength={100000}
              rows={12}
            />
          </label>
          <label>
            <input type="checkbox" name="approved" value="yes" required />{" "}
            Confirmo que o texto, o preço e a vigência foram aprovados para esta
            parceria.
          </label>
        </ActionForm>
        {offers.some((o) => o.enabled) && (
          <ActionForm
            action={inviteInvestor}
            title="Convidar investidor"
            submit="Preparar convite privado"
          >
            <span id="convite" />
            {selectedApplication && (
              <>
                <input
                  type="hidden"
                  name="application_id"
                  value={selectedApplication.id}
                />
                <p>
                  Cadastro selecionado: {selectedApplication.full_name} ·{" "}
                  {selectedApplication.email}. O convite será vinculado a este
                  cadastro.
                </p>
                <Link className="live-link" href="/parcerias">
                  Limpar seleção
                </Link>
              </>
            )}
            <Field
              key={selectedApplication?.id ?? "email"}
              name="email"
              label="E-mail do investidor"
              type="email"
              defaultValue={selectedApplication?.email}
            />
            <Field
              required={false}
              name="account_name"
              key={selectedApplication?.id ?? "account"}
              defaultValue={
                selectedApplication?.company || selectedApplication?.full_name
              }
              label="Nome da nova conta (obrigatório para criar conta)"
            />
            <Select
              required={false}
              name="account_id"
              label="Ou vincular a uma conta existente"
              options={[
                { value: "", label: "Criar nova conta" },
                ...ctx.accounts
                  .filter((a) => a.status === "active")
                  .map((a) => ({ value: a.id, label: a.name })),
              ]}
            />
            <Select
              name="offer_id"
              label="Oferta aprovada"
              options={offers
                .filter((o) => o.enabled)
                .map((o) => ({
                  value: o.id,
                  label:
                    o.title +
                    " · " +
                    o.version +
                    " · " +
                    money(o.unit_amount_minor / 100) +
                    "/un.",
                }))}
            />
            <Field
              name="quantity"
              label="Quantidade de equipamentos"
              type="number"
            />
            <p>
              O convite cria ou reutiliza a identidade do destinatário, vincula
              a conta e gera um link privado. Nenhum e-mail é enviado
              automaticamente.
            </p>
          </ActionForm>
        )}
      </div>
      <section className="live-card">
        <h2>Versões publicadas</h2>
        {offers.length === 0 && (
          <p>
            Nenhuma oferta publicada. O pagamento permanece indisponível até
            existir uma oferta aprovada.
          </p>
        )}
        {offers.map((o) => (
          <div className="live-ticket" key={o.id}>
            <h3>
              {o.title} · {o.version}
            </h3>
            <p>
              {money(o.unit_amount_minor / 100)} por {o.unit_model} ·{" "}
              {o.term_months} meses ·{" "}
              {o.enabled
                ? "Disponível para convites"
                : "Retirada de novos convites"}
            </p>
            {o.enabled && (
              <ActionForm
                action={staffEnrollment}
                title="Retirar de novos convites"
                submit="Retirar oferta"
              >
                <input type="hidden" name="action" value="withdraw" />
                <input type="hidden" name="offer_id" value={o.id} />
              </ActionForm>
            )}
          </div>
        ))}
      </section>
      <section className="live-card">
        <h2>Adesões recentes</h2>
        {enrollments.length === 0 && <p>Nenhuma adesão.</p>}
        {enrollments.map((e) => (
          <article className="live-ticket" key={e.id}>
            <h3>
              {ctx.accounts.find((a) => a.id === e.account_id)?.name ??
                e.account_id}
            </h3>
            <p>
              {date(e.created_at)} · {enrollmentLabels[e.status]} · {e.quantity}{" "}
              unidades · {money(e.amount_minor / 100)}
            </p>
            {e.status !== "cancelled" && (
              <ActionForm
                action={renewInvitation}
                title="Link de acesso"
                submit="Preparar link de acesso"
              >
                <input type="hidden" name="enrollment_id" value={e.id} />
              </ActionForm>
            )}
            {[
              "accepted",
              "payment_pending",
              "active",
              "payment_review",
            ].includes(e.status) && (
              <a className="live-link" href={"/app/api/agreements/" + e.id}>
                Baixar acordo aceito
              </a>
            )}
            {Object.keys(e.details).length > 0 && (
              <dl>
                {Object.entries(e.details).map(([key, value]) => (
                  <div key={key}>
                    <dt>
                      {(
                        {
                          legal_name: "Nome legal",
                          entity_type: "Tipo",
                          phone: "Telefone",
                          country: "País",
                          address: "Endereço",
                          city: "Cidade",
                          region: "Região",
                          postal_code: "Código postal",
                        } as Record<string, string>
                      )[key] ?? key}
                    </dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {e.status === "details_submitted" && (
              <div className="live-grid">
                <ActionForm
                  action={staffEnrollment}
                  title="Aprovar dados"
                  submit="Liberar acordo para aceite"
                >
                  <input type="hidden" name="action" value="approve" />
                  <input type="hidden" name="enrollment_id" value={e.id} />
                  <p>
                    Confira os dados e a legitimidade do representante antes de
                    liberar o aceite.
                  </p>
                </ActionForm>
                <ActionForm action={staffEnrollment} title="Solicitar ajustes">
                  <input type="hidden" name="action" value="request_changes" />
                  <input type="hidden" name="enrollment_id" value={e.id} />
                  <Field
                    name="note"
                    label="Mensagem ao investidor"
                    maxLength={1000}
                  />
                </ActionForm>
              </div>
            )}
            {[
              "invited",
              "details_submitted",
              "changes_requested",
              "approved",
              "accepted",
            ].includes(e.status) && (
              <ActionForm
                action={staffEnrollment}
                title="Cancelar adesão antes do pagamento"
                submit="Cancelar adesão"
              >
                <input type="hidden" name="action" value="cancel" />
                <input type="hidden" name="enrollment_id" value={e.id} />
              </ActionForm>
            )}
            {["payment_pending", "accepted", "payment_review"].includes(
              e.status,
            ) && (
              <ActionForm
                action={refreshPayment}
                title="Consultar pagamento no Stripe"
                submit="Reconciliar pagamento"
              >
                <input type="hidden" name="enrollment_id" value={e.id} />
              </ActionForm>
            )}
            {e.status === "payment_review" && (
              <ActionForm
                action={staffEnrollment}
                title="Reavaliar ativação após desbloqueio"
                submit="Autorizar nova verificação"
              >
                <input type="hidden" name="action" value="review_payment" />
                <input type="hidden" name="enrollment_id" value={e.id} />
                <p>
                  Disponível somente para pagamento confirmado, sem reembolso ou
                  disputa, com conta e acesso regularizados. A confirmação será
                  consultada novamente no Stripe.
                </p>
              </ActionForm>
            )}
            {e.status === "payment_review" && (
              <p role="alert">
                Confira o pagamento no Stripe e trate a pendência pelo suporte.
                Não solicite nova cobrança enquanto a situação estiver em
                análise.
              </p>
            )}
          </article>
        ))}
      </section>
      <p className="live-muted">
        Listas exibem os 100 registros mais recentes. Convites e adesões não
        atribuem equipamentos físicos automaticamente.
      </p>
    </>
  );
}
