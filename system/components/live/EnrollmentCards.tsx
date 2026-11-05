import Link from "next/link";
import { date, money } from "@/lib/live/data";
import { staffEnrollment, renewInvitation, refreshPayment } from "@/lib/enrollment/actions";
import type { Enrollment } from "@/lib/enrollment/types";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { OpenAccountButtons } from "./OpenAccountButtons";
import { Field } from "./Fields";
import { EnrollmentStatus } from "./EnrollmentStatus";
import { Notice } from "./Notice";
import { buttonClass } from "@/components/ui/Button";
import { DefinitionList } from "@/components/ui/DefinitionList";

const detailLabels: Record<string, string> = {
  legal_name: "Nome legal",
  entity_type: "Tipo",
  phone: "Telefone",
  country: "País",
  address: "Endereço",
  city: "Cidade",
  region: "Região",
  postal_code: "Código postal",
};

/** A record inside a card: tinted block (no border), as in the portal's lists. */
export const ITEM = "rounded-xl bg-canvas/60 p-4";

export type Application = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  company: string;
  message: string;
  created_at: string;
  enrollment_id: string | null;
};

/** A website registration, with the link that starts its invitation. */
export function ApplicationCard({ application: a }: { application: Application }) {
  return (
    <article className={ITEM}>
      <h3 className="mb-2 text-[16px] font-extrabold tracking-tight text-ink">{a.full_name}</h3>
      <DefinitionList
        rows={[
          { label: "E-mail", value: a.email },
          { label: "Telefone", value: a.phone },
          { label: "País", value: a.country },
          { label: "Recebido em", value: date(a.created_at) },
          ...(a.company ? [{ label: "Empresa", value: a.company }] : []),
        ]}
      />
      {a.message && <p className="mt-3 text-[14.5px] whitespace-pre-wrap text-ink [overflow-wrap:anywhere]">{a.message}</p>}
      <div className="mt-3">
        {a.enrollment_id ? (
          <Notice>Convite preparado · adesão {a.enrollment_id}. Localize-a abaixo para acompanhar ou renovar o link privado.</Notice>
        ) : (
          <Link className={buttonClass({ variant: "outline", size: "sm" })} href={"/parcerias?application=" + a.id + "#convite"}>
            Preparar convite para este cadastro
          </Link>
        )}
      </div>
    </article>
  );
}

/** An enrollment with every staff action its status allows: approve, request changes, cancel, reconcile payment. */
export function EnrollmentCard({ enrollment: e, accountName, email }: { enrollment: Enrollment; accountName?: string; email?: string }) {
  return (
    <article className={ITEM}>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-[16px] font-extrabold tracking-tight text-ink">{accountName ?? e.account_id}</h3>
        <EnrollmentStatus status={e.status} />
      </div>
      <p className="text-[14.5px] text-ink-soft">
        {email && <>{email} · </>}
        {date(e.created_at)} · {e.quantity} unidades · {money(e.amount_minor / 100)}
      </p>
      {["accepted", "payment_pending", "active", "payment_review"].includes(e.status) && (
        <div className="mt-3">
          <a className={buttonClass({ variant: "outline", size: "sm" })} href={"/app/api/agreements/" + e.id}>
            Baixar acordo aceito
          </a>
        </div>
      )}
      {Object.keys(e.details).length > 0 && (
        <div className="mt-3">
          <DefinitionList rows={Object.entries(e.details).map(([key, value]) => ({ label: detailLabels[key] ?? key, value: String(value) }))} />
        </div>
      )}
      <div className="mt-3 grid items-start gap-3">
        {e.status !== "cancelled" && (
          <ActionForm bare action={renewInvitation} title="Link de acesso" submit="Preparar link de acesso">
            <input type="hidden" name="enrollment_id" value={e.id} />
          </ActionForm>
        )}
        {e.status === "details_submitted" && (
          <div className="grid items-start gap-3 @4xl:grid-cols-2">
            <ActionForm bare action={staffEnrollment} title="Aprovar dados" submit="Liberar acordo para aceite">
              <input type="hidden" name="action" value="approve" />
              <input type="hidden" name="enrollment_id" value={e.id} />
              <p className="text-[14.5px] text-ink-soft">Confira os dados e a legitimidade do representante antes de liberar o aceite.</p>
            </ActionForm>
            <ActionForm bare action={staffEnrollment} title="Solicitar ajustes">
              <input type="hidden" name="action" value="request_changes" />
              <input type="hidden" name="enrollment_id" value={e.id} />
              <Field name="note" label="Mensagem ao investidor" maxLength={1000} />
            </ActionForm>
          </div>
        )}
        {["invited", "details_submitted", "changes_requested", "approved", "accepted"].includes(e.status) && (
          <ActionForm bare action={staffEnrollment} title="Cancelar adesão antes do pagamento" submit="Cancelar adesão">
            <input type="hidden" name="action" value="cancel" />
            <input type="hidden" name="enrollment_id" value={e.id} />
          </ActionForm>
        )}
        {["payment_pending", "accepted", "payment_review"].includes(e.status) && (
          <ActionForm bare action={refreshPayment} title="Consultar pagamento no Stripe" submit="Reconciliar pagamento">
            <input type="hidden" name="enrollment_id" value={e.id} />
          </ActionForm>
        )}
        {e.status === "payment_review" && (
          <ActionForm bare action={staffEnrollment} title="Reavaliar ativação após desbloqueio" submit="Autorizar nova verificação">
            <input type="hidden" name="action" value="review_payment" />
            <input type="hidden" name="enrollment_id" value={e.id} />
            <p className="text-[14.5px] text-ink-soft">Disponível somente para pagamento confirmado, sem reembolso ou disputa, com conta e acesso regularizados. A confirmação será consultada novamente no Stripe.</p>
          </ActionForm>
        )}
        {e.status === "payment_review" && <Notice tone="danger">Confira o pagamento no Stripe e trate a pendência pelo suporte. Não solicite nova cobrança enquanto a situação estiver em análise.</Notice>}
        {e.status === "active" && <OpenAccountButtons accountId={e.account_id} />}
      </div>
    </article>
  );
}
