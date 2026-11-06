// app/(portal)/layout.tsx
import { cookies } from "next/headers";
import { context } from "@/lib/live/data";
import { switchAccount } from "@/lib/live/actions";
import { isSidebarMode, SIDEBAR_COOKIE } from "@/lib/sidebar";
import type { LiveKind } from "@/config/live-navigation";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ClearDemo } from "@/components/live/ClearDemo";
import { LiveShell } from "@/components/live/LiveShell";
import { Notice } from "@/components/live/Notice";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const ctx = await context();
  const review = await ctx.db.from("investor_enrollments").select("id").eq("user_id", ctx.user.id).eq("status", "payment_review").limit(1);
  if (review.error) throw new Error("Não foi possível consultar a situação da parceria.");

  const role = ctx.user.app_metadata.portal_role;
  const kind: LiveKind = role === "customer" ? "customer" : ctx.staff === "admin" ? "admin" : ctx.staff === "support" ? "support" : "partner";
  const roleLabel = { customer: "Cliente", partner: "Parceiro", support: "Equipe · Atendimento", admin: "Equipe · Administração" }[kind];
  const saved = (await cookies()).get(SIDEBAR_COOKIE)?.value;

  return (
    <LiveShell
      kind={kind}
      email={ctx.user.email ?? ""}
      roleLabel={roleLabel}
      accounts={ctx.accounts.map((a) => ({ id: a.id, name: a.name, suspended: a.status === "suspended" }))}
      accountId={ctx.account?.id}
      switchAccount={switchAccount}
      sidebar={isSidebarMode(saved) ? saved : "expanded"}
    >
      <ClearDemo />
      {kind === "admin" && ctx.account && (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl bg-brand-soft px-4 py-2.5 text-[14.5px] text-ink">
          <p className="min-w-0 [overflow-wrap:anywhere]">
            Conta aberta: <strong>{ctx.account.name}</strong>.<span className="hidden sm:inline"> As telas de “Conta aberta” mostram os dados dela.</span>
          </p>
          <form action={switchAccount}>
            <input type="hidden" name="account_id" value="" />
            <Button type="submit" variant="outline" size="sm">
              Voltar à visão global
            </Button>
          </form>
        </div>
      )}
      {review.data.length > 0 && (
        <Notice tone="warn" title="Existe um pagamento da sua parceria em análise.">
          <ButtonLink href={"/adesao?enrollment=" + review.data[0].id} variant="outline" size="sm" className="mt-2">
            Consultar pendência
          </ButtonLink>
        </Notice>
      )}
      {children}
    </LiveShell>
  );
}
