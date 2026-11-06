import Link from "next/link";
import { date, money } from "@/lib/live/data";
import { staffEnrollment, renewInvitation, refreshPayment } from "@/lib/enrollment/actions";
import type { Enrollment } from "@/lib/enrollment/types";
import { ActionDialog } from "@/components/enrollment/ActionDialog";
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
          <Link className={buttonClass({ variant: "outline", size: "sm" })} href={"/parcerias?application=" + a.id}>
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
      {e.status === "payment_review" && (
        <Notice tone="danger" className="mt-3">
          Confira o pagamento no Stripe e trate a pendência pelo suporte. Não solicite nova cobrança enquanto a situação estiver em análise.
        </Notice>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {e.status === "details_submitted" && (
          <>
            <ActionDialog action={staffEnrollment} title="Aprovar dados" trigger="Aprovar dados" submit="Liberar acordo para aceite" triggerVariant="primary" size="sm" description="Confira os dados e a legitimidade do representante antes de liberar o aceite.">
              <input type="hidden" name="action" value="approve" />
              <input type="hidden" name="enrollment_id" value={e.id} />
            </ActionDialog>
            <ActionDialog action={staffEnrollment} title="Solicitar ajustes" trigger="Solicitar ajustes" submit="Enviar ajustes" size="sm" description="O investidor verá a mensagem e poderá corrigir os dados.">
              <input type="hidden" name="action" value="request_changes" />
              <input type="hidden" name="enrollment_id" value={e.id} />
              <Field name="note" label="Mensagem ao investidor" maxLength={1000} />
            </ActionDialog>
          </>
        )}
        {["payment_pending", "accepted", "payment_review"].includes(e.status) && (
          <ActionDialog action={refreshPayment} title="Consultar pagamento no Stripe" trigger="Reconciliar pagamento" size="sm" description="Consulta a situação da cobrança no Stripe e atualiza a adesão.">
            <input type="hidden" name="enrollment_id" value={e.id} />
          </ActionDialog>
        )}
        {e.status === "payment_review" && (
          <ActionDialog action={staffEnrollment} title="Autorizar nova verificação" trigger="Autorizar nova verificação" size="sm" description="Disponível somente para pagamento confirmado, sem reembolso ou disputa, com conta e acesso regularizados. A confirmação será consultada novamente no Stripe.">
            <input type="hidden" name="action" value="review_payment" />
            <input type="hidden" name="enrollment_id" value={e.id} />
          </ActionDialog>
        )}
        {e.status !== "cancelled" && (
          <ActionDialog action={renewInvitation} title="Link de acesso" trigger="Link de acesso" submit="Preparar link de acesso" size="sm" description="Gera um link privado para o investidor acessar a adesão. Nenhum e-mail é enviado.">
            <input type="hidden" name="enrollment_id" value={e.id} />
          </ActionDialog>
        )}
        {e.status === "active" && <OpenAccountButtons accountId={e.account_id} name={accountName} />}
        {["invited", "details_submitted", "changes_requested", "approved", "accepted"].includes(e.status) && (
          <ActionDialog action={staffEnrollment} title="Cancelar adesão antes do pagamento?" trigger="Cancelar adesão" submit="Cancelar adesão" danger size="sm" description="A adesão será encerrada e o investidor perde o acesso a ela.">
            <input type="hidden" name="action" value="cancel" />
            <input type="hidden" name="enrollment_id" value={e.id} />
          </ActionDialog>
        )}
      </div>
    </article>
  );
}
