// components/base/previews/RequestDemos.tsx
"use client";

import { useState } from "react";
import { MobileRequestHistory } from "@/components/mobile/sections/MobileRequestHistory";
import { MobileRequestStepInstall, MobileRequestStepPayment, MobileRequestStepQuantity, MobileRequestStepReview } from "@/components/mobile/sections/MobileRequestSteps";
import { RequestHistory } from "@/components/sections/RequestHistory";
import { RequestStepInstall } from "@/components/sections/RequestStepInstall";
import { RequestStepPayment } from "@/components/sections/RequestStepPayment";
import { RequestStepQuantity } from "@/components/sections/RequestStepQuantity";
import { RequestStepReview } from "@/components/sections/RequestStepReview";
import { RequestSuccess } from "@/components/sections/RequestSuccess";
import { useToast } from "@/components/providers/ToastProvider";
import { EMPTY_DRAFT, SEED_REQUESTS, type PortalRequest, type RequestDraft } from "@/config/request-page";
import { projectRequest, type DraftErrors, type ProjectionBaseline } from "@/lib/portal/projection";

/** Draft with every step filled, so the review and the mobile steps show real values. */
const FILLED: RequestDraft = { ...EMPTY_DRAFT, quantity: 10, install: "address", state: "FL", city: "Orlando", address: "1200 International Dr", zip: "32819", payment: "wire", accepted: true };

function useDraft(initial: RequestDraft) {
  const [draft, setDraft] = useState<RequestDraft>(initial);
  return [draft, (patch: Partial<RequestDraft>) => setDraft((d) => ({ ...d, ...patch }))] as const;
}

const NO_ERRORS: DraftErrors = {};

/** Request list; cancelling a request under review marks it as cancelled, as the screen does. */
function useRequests() {
  const [requests, setRequests] = useState<PortalRequest[]>(SEED_REQUESTS);
  const cancel = (id: string) => setRequests((list) => list.map((r) => (r.id === id ? { ...r, status: "cancelled" } : r)));
  return [requests, cancel] as const;
}

export function RequestHistoryDemo({ baseline }: { baseline: ProjectionBaseline }) {
  const [requests, cancel] = useRequests();
  return <RequestHistory requests={requests} baseline={baseline} onCancel={cancel} />;
}

export function RequestStepInstallDemo() {
  const [draft, patch] = useDraft({ ...EMPTY_DRAFT, install: "address" });
  return <RequestStepInstall draft={draft} errors={NO_ERRORS} onChange={patch} />;
}

export function RequestStepPaymentDemo() {
  const [draft, patch] = useDraft(EMPTY_DRAFT);
  return <RequestStepPayment draft={draft} errors={NO_ERRORS} onChange={patch} />;
}

export function RequestStepQuantityDemo({ unitPrice }: { unitPrice: number }) {
  const [draft, patch] = useDraft(EMPTY_DRAFT);
  return <RequestStepQuantity quantity={draft.quantity} unitPrice={unitPrice} errors={NO_ERRORS} onQuantity={(quantity) => patch({ quantity })} />;
}

export function RequestStepReviewDemo({ baseline }: { baseline: ProjectionBaseline }) {
  const toast = useToast();
  return (
    <RequestStepReview
      draft={FILLED}
      projection={projectRequest(FILLED.quantity, baseline)}
      unitPrice={baseline.unitPrice}
      onEdit={(step) => toast({ tone: "info", title: "Editar bloco", description: `Volta para a etapa "${step}".` })}
    />
  );
}

export function RequestSuccessDemo() {
  const toast = useToast();
  return <RequestSuccess request={SEED_REQUESTS[0]} onNew={() => toast({ tone: "info", title: "Nova solicitação" })} onSeeRequests={() => toast({ tone: "info", title: "Ver solicitações" })} />;
}

export function MobileRequestHistoryDemo({ baseline }: { baseline: ProjectionBaseline }) {
  const [requests, cancel] = useRequests();
  return <MobileRequestHistory requests={requests} baseline={baseline} onCancel={cancel} />;
}

/** The four step forms of the app flow, one under the other. */
export function MobileRequestStepsDemo({ baseline }: { baseline: ProjectionBaseline }) {
  const toast = useToast();
  const [draft, patch] = useDraft({ ...FILLED, accepted: false });
  return (
    <div className="grid gap-6">
      <MobileRequestStepQuantity quantity={draft.quantity} unitPrice={baseline.unitPrice} errors={NO_ERRORS} onQuantity={(quantity) => patch({ quantity })} />
      <MobileRequestStepInstall draft={draft} errors={NO_ERRORS} onChange={patch} />
      <MobileRequestStepPayment draft={draft} errors={NO_ERRORS} onChange={patch} />
      <MobileRequestStepReview
        draft={draft}
        projection={projectRequest(draft.quantity, baseline)}
        unitPrice={baseline.unitPrice}
        onEdit={(step) => toast({ tone: "info", title: "Editar bloco", description: `Volta para a etapa "${step}".` })}
      />
    </div>
  );
}
