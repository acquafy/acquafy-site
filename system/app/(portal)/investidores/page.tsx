import { Inbox, UserPlus } from "lucide-react";
import { investorStageCounts, requireAdmin, userEmails } from "@/lib/live/admin";
import { APPLICATIONS_STAGE, enrollmentStages, pageNumber, stageFor } from "@/lib/live/admin-view";
import type { Enrollment } from "@/lib/enrollment/types";
import { ApplicationCard, EnrollmentCard, type Application } from "@/components/live/EnrollmentCards";
import { FilterTabs } from "@/components/live/FilterTabs";
import { PageHeader } from "@/components/live/PageHeader";
import { Pager } from "@/components/live/PortalPage";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = { title: "Investidores" };

export default async function Investors({ searchParams }: { searchParams: Promise<{ etapa?: string; page?: string }> }) {
  const ctx = await requireAdmin();
  const query = await searchParams;
  const page = pageNumber(query.page);
  const counts = await investorStageCounts();
  const applicationsTab = query.etapa === APPLICATIONS_STAGE;
  const stage = applicationsTab ? undefined : (stageFor(enrollmentStages, query.etapa) ?? enrollmentStages[0]);
  const path = "/investidores?etapa=" + (stage?.key ?? APPLICATIONS_STAGE);

  const range = [page * 50, page * 50 + 49] as const;
  const result = stage
    ? await ctx.db.from("investor_enrollments").select("*", { count: "exact" }).in("status", stage.statuses).order("created_at", { ascending: false }).order("id").range(...range)
    : await ctx.db.from("investor_applications").select("*", { count: "exact" }).is("enrollment_id", null).order("created_at", { ascending: false }).order("id").range(...range);
  if (result.error) throw new Error("Não foi possível carregar os investidores.");
  const enrollments = stage ? (result.data as Enrollment[]) : [];
  const applications = stage ? [] : (result.data as Application[]);
  const emails = await userEmails(enrollments.map((e) => e.user_id));

  return (
    <>
      <PageHeader
        title="Investidores"
        subtitle="Do cadastro no site à parceria ativa: analise, aprove e acompanhe cada investidor."
        action={
          <ButtonLink href="/parcerias#convite">
            <UserPlus className="size-5" aria-hidden="true" />
            Convidar investidor
          </ButtonLink>
        }
      />
      <FilterTabs
        label="Filtrar por etapa"
        tabs={[
          { href: `/investidores?etapa=${APPLICATIONS_STAGE}`, label: "Cadastros do site", count: counts[APPLICATIONS_STAGE], active: applicationsTab },
          ...enrollmentStages.map((s) => ({ href: "/investidores?etapa=" + s.key, label: s.label, count: counts[s.key], active: s.key === stage?.key })),
        ]}
      />
      <Card container>
        {result.data.length === 0 && <EmptyState icon={Inbox} title="Nada nesta etapa" description={stage ? "Quando um investidor chegar a esta etapa, ele aparece aqui." : "Cadastros enviados pelo site aparecem aqui até receberem um convite."} />}
        <div className="grid gap-3">
          {applications.map((a) => (
            <ApplicationCard key={a.id} application={a} />
          ))}
          {enrollments.map((e) => (
            <EnrollmentCard key={e.id} enrollment={e} accountName={ctx.accounts.find((a) => a.id === e.account_id)?.name} email={emails.get(e.user_id)} />
          ))}
        </div>
      </Card>
      <Pager page={page} count={result.count ?? 0} path={path} />
      <p className="text-[13.5px] text-ink-soft">O cadastro público não libera acesso nem aceita condições. Convites e adesões não atribuem equipamentos físicos automaticamente.</p>
    </>
  );
}
