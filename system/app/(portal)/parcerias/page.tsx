import Link from "next/link";
import { notFound } from "next/navigation";
import { Inbox } from "lucide-react";
import { context, date, money } from "@/lib/live/data";
import { userEmails } from "@/lib/live/admin";
import { staffEnrollment, inviteInvestor } from "@/lib/enrollment/actions";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { Area, Consent, Field, Select } from "@/components/live/Fields";
import { ApplicationCard, EnrollmentCard, ITEM, type Application } from "@/components/live/EnrollmentCards";
import { Notice } from "@/components/live/Notice";
import { PageHeader } from "@/components/live/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Offer, Enrollment } from "@/lib/enrollment/types";

export const metadata = { title: "Ofertas e adesões" };

export default async function Partnerships({ searchParams }: { searchParams: Promise<{ application?: string }> }) {
  const ctx = await context();
  const query = await searchParams;
  if (ctx.staff !== "admin") notFound();
  const [offersResult, enrollmentsResult] = await Promise.all([
    ctx.db.from("investor_offers").select("*").order("published_at", { ascending: false }).limit(100),
    ctx.db.from("investor_enrollments").select("*").order("created_at", { ascending: false }).limit(100),
  ]);
  if (offersResult.error || enrollmentsResult.error) throw new Error("Não foi possível carregar as parcerias.");
  const applicationsResult = await ctx.db.from("investor_applications").select("*").order("created_at", { ascending: false }).limit(100);
  if (applicationsResult.error) throw new Error("Não foi possível carregar os cadastros.");
  const applications = applicationsResult.data as Application[];
  const selectedApplication = applications.find((a) => a.id === (query.application ?? "") && !a.enrollment_id);
  const offers = offersResult.data as Offer[],
    enrollments = enrollmentsResult.data as Enrollment[];
  const emails = await userEmails(enrollments.map((e) => e.user_id));
  const unmatched = await ctx.db
    .from("stripe_events")
    .select("event_id,event_type,object_id,processed_at")
    .like("event_type", "unmatched.%")
    .order("processed_at", { ascending: false })
    .limit(20);
  if (unmatched.error) throw new Error("Não foi possível carregar os eventos de pagamento.");
  return (
    <>
      <PageHeader title="Ofertas e adesões" subtitle="Publique somente termos e preços aprovados. Cada versão é imutável; para alterar condições, publique uma nova versão." />
      <Card title="Cadastros do site">
        <p className="mb-4 text-[14.5px] text-ink-soft">Analise o interesse e confirme o contato antes de preparar o convite. O cadastro público não libera acesso nem aceita condições comerciais.</p>
        {applications.length === 0 && <EmptyState icon={Inbox} title="Nenhum cadastro recebido" />}
        <div className="grid gap-3">
          {applications.map((a) => (
            <ApplicationCard key={a.id} application={a} />
          ))}
        </div>
      </Card>
      {unmatched.data.length > 0 && (
        <Notice tone="danger" title="Pagamentos sem vínculo para análise">
          Eventos verificados do Stripe não encontraram uma adesão. Confira os identificadores no Stripe antes de qualquer ativação.
          <ul className="mt-2 grid gap-1">
            {unmatched.data.map((event) => (
              <li key={event.event_id}>
                {event.object_id} · {event.event_type} · {date(event.processed_at)}
              </li>
            ))}
          </ul>
        </Notice>
      )}
      <div className="grid items-start gap-4 @4xl:grid-cols-2">
        <ActionForm action={staffEnrollment} title="Publicar oferta aprovada" submit="Publicar versão">
          <input type="hidden" name="action" value="publish" />
          <Field name="title" label="Título da parceria" />
          <Field name="version" label="Versão do acordo" maxLength={60} />
          <Field name="unit_model" label="Modelo do equipamento" maxLength={100} />
          <Field name="unit_price" label="Preço final por unidade (USD)" type="number" />
          <Field name="term_months" label="Vigência em meses após confirmação do pagamento" type="number" />
          <Field name="min_quantity" label="Quantidade mínima" type="number" />
          <Field name="max_quantity" label="Quantidade máxima" type="number" />
          <Notice>O Checkout cobra o valor final publicado. Tributos e frete não são calculados separadamente nesta configuração.</Notice>
          <Area name="agreement_text" label="Texto integral do acordo aprovado" minLength={100} maxLength={100000} rows={12} />
          <Consent name="approved">Confirmo que o texto, o preço e a vigência foram aprovados para esta parceria.</Consent>
        </ActionForm>
        {offers.some((o) => o.enabled) && (
          <ActionForm action={inviteInvestor} title="Convidar investidor" submit="Preparar convite privado">
            <span id="convite" className="scroll-mt-24" />
            {selectedApplication && (
              <>
                <input type="hidden" name="application_id" value={selectedApplication.id} />
                <Notice>
                  Cadastro selecionado: {selectedApplication.full_name} · {selectedApplication.email}. O convite será vinculado a este cadastro.
                  <Link className="mt-1 block font-semibold text-brand hover:underline" href="/parcerias">
                    Limpar seleção
                  </Link>
                </Notice>
              </>
            )}
            <Field key={selectedApplication?.id ?? "email"} name="email" label="E-mail do investidor" type="email" defaultValue={selectedApplication?.email} />
            <Field
              required={false}
              name="account_name"
              key={selectedApplication?.id ?? "account"}
              defaultValue={selectedApplication?.company || selectedApplication?.full_name}
              label="Nome da nova conta (obrigatório para criar conta)"
            />
            <Select
              required={false}
              name="account_id"
              label="Ou vincular a uma conta existente"
              options={[{ value: "", label: "Criar nova conta" }, ...ctx.accounts.filter((a) => a.status === "active").map((a) => ({ value: a.id, label: a.name }))]}
            />
            <Select
              name="offer_id"
              label="Oferta aprovada"
              options={offers.filter((o) => o.enabled).map((o) => ({ value: o.id, label: o.title + " · " + o.version + " · " + money(o.unit_amount_minor / 100) + "/un." }))}
            />
            <Field name="quantity" label="Quantidade de equipamentos" type="number" />
            <p className="text-[14px] text-ink-soft">O convite cria ou reutiliza a identidade do destinatário, vincula a conta e gera um link privado. Nenhum e-mail é enviado automaticamente.</p>
          </ActionForm>
        )}
      </div>
      <Card title="Versões publicadas">
        {offers.length === 0 && <EmptyState icon={Inbox} title="Nenhuma oferta publicada" description="O pagamento permanece indisponível até existir uma oferta aprovada." />}
        <div className="grid gap-3">
          {offers.map((o) => (
            <article className={ITEM} key={o.id}>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-[16px] font-extrabold tracking-tight text-ink">
                  {o.title} · {o.version}
                </h3>
                <Badge tone={o.enabled ? "ok" : "neutral"} dot>
                  {o.enabled ? "Disponível para convites" : "Retirada de novos convites"}
                </Badge>
              </div>
              <p className="text-[14.5px] text-ink-soft">
                {money(o.unit_amount_minor / 100)} por {o.unit_model} · {o.term_months} meses
              </p>
              {o.enabled && (
                <div className="mt-3">
                  <ActionForm bare action={staffEnrollment} title="Retirar de novos convites" submit="Retirar oferta">
                    <input type="hidden" name="action" value="withdraw" />
                    <input type="hidden" name="offer_id" value={o.id} />
                  </ActionForm>
                </div>
              )}
            </article>
          ))}
        </div>
      </Card>
      <Card title="Adesões recentes">
        {enrollments.length === 0 && <EmptyState icon={Inbox} title="Nenhuma adesão" />}
        <div className="grid gap-3">
          {enrollments.map((e) => (
            <EnrollmentCard key={e.id} enrollment={e} accountName={ctx.accounts.find((a) => a.id === e.account_id)?.name} email={emails.get(e.user_id)} />
          ))}
        </div>
      </Card>
      <p className="text-[13.5px] text-ink-soft">Listas exibem os 100 registros mais recentes. Convites e adesões não atribuem equipamentos físicos automaticamente.</p>
    </>
  );
}
