// components/sections/RequestWorkspace.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";
import { EMPTY_DRAFT, REQUEST_STEPS, SEED_REQUESTS, type PortalRequest, type RequestDraft, type RequestStepId } from "@/config/request-page";
import type { IsoDate } from "@/lib/format";
import { firstInvalidStep, formatLocation, nextRequestProtocol, projectRequest, validateStep, type DraftErrors, type ProjectionBaseline } from "@/lib/portal/projection";
import { usePersistentState } from "@/lib/usePersistentState";
import { RequestHistory } from "./RequestHistory";
import { RequestStepInstall } from "./RequestStepInstall";
import { RequestStepPayment } from "./RequestStepPayment";
import { RequestStepQuantity } from "./RequestStepQuantity";
import { RequestStepReview } from "./RequestStepReview";
import { RequestSuccess } from "./RequestSuccess";
import { RequestSummary } from "./RequestSummary";

type Props = { baseline: ProjectionBaseline; today: IsoDate };

const STEP_IDS = REQUEST_STEPS.map((s) => s.id);
const STEP_INFO: Record<RequestStepId, { title: string; description: string }> = {
  quantity: { title: "Quantidade e modelo", description: "Escolha quantos purificadores Neo UP você quer adicionar ao seu investimento." },
  install: { title: "Instalação", description: "Defina onde os purificadores ficarão instalados." },
  payment: { title: "Pagamento", description: "Escolha como prefere pagar e aceite os termos para continuar." },
  review: { title: "Revisão e envio", description: "Confira os dados. Você pode editar qualquer bloco antes de enviar." },
};

export function RequestWorkspace({ baseline, today }: Props) {
  const toast = useToast();
  const [requests, setRequests] = usePersistentState<PortalRequest[]>("solicitacoes", SEED_REQUESTS);
  const [draft, setDraft] = useState<RequestDraft>(EMPTY_DRAFT);
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [errors, setErrors] = useState<DraftErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<PortalRequest | null>(null);

  const card = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const projection = useMemo(() => projectRequest(draft.quantity, baseline), [draft.quantity, baseline]);
  const stepId = REQUEST_STEPS[step].id;
  const last = step === REQUEST_STEPS.length - 1;

  const patch = (p: Partial<RequestDraft>) => {
    setDraft((d) => ({ ...d, ...p }));
    setErrors((e) => {
      const next = { ...e };
      for (const key of Object.keys(p)) delete next[key as keyof DraftErrors];
      return next;
    });
  };

  const goTo = (index: number) => {
    setStep(index);
    setReached((r) => Math.max(r, index));
    setErrors({});
    window.setTimeout(() => heading.current?.focus(), 0);
  };

  const showErrors = (found: DraftErrors) => {
    setErrors(found);
    window.setTimeout(() => card.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0);
  };

  const next = () => {
    const found = validateStep(stepId, draft);
    if (Object.keys(found).length) return showErrors(found);
    goTo(step + 1);
  };

  const edit = (target: RequestStepId) => goTo(STEP_IDS.indexOf(target));

  const submit = () => {
    const invalid = firstInvalidStep(draft, STEP_IDS);
    if (invalid) {
      goTo(STEP_IDS.indexOf(invalid));
      showErrors(validateStep(invalid, draft));
      toast({ title: "Revise os dados", description: "Alguma etapa tem campos pendentes.", tone: "error" });
      return;
    }
    const request: PortalRequest = {
      id: nextRequestProtocol(requests, today),
      createdAt: today,
      quantity: draft.quantity,
      unitPrice: baseline.unitPrice,
      install: draft.install,
      location: formatLocation(draft),
      payment: draft.payment,
      status: "review",
    };
    setSubmitting(true);
    timer.current = window.setTimeout(() => {
      setRequests((list) => [request, ...list]);
      setSubmitted(request);
      setSubmitting(false);
      toast({ title: "Solicitação enviada", description: `Protocolo ${request.id}. Acompanhe o andamento em Minhas solicitações.` });
      window.setTimeout(() => document.getElementById("request-success-title")?.focus(), 0);
    }, 1100);
  };

  const reset = () => {
    setDraft(EMPTY_DRAFT);
    setStep(0);
    setReached(0);
    setErrors({});
    setSubmitted(null);
  };

  const seeRequests = () => document.getElementById("minhas-solicitacoes")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const cancelRequest = (id: string) => setRequests((list) => list.map((r) => (r.id === id && r.status === "review" ? { ...r, status: "cancelled" } : r)));

  return (
    // `relative` keeps the sr-only helpers inside the scrolling <main> (they would otherwise stretch the document).
    <div className="relative flex min-w-0 flex-col gap-4">
      {submitted ? (
        <RequestSuccess request={submitted} onNew={reset} onSeeRequests={seeRequests} />
      ) : (
        <>
          <section aria-label="Progresso da solicitação" className="card px-5 py-4">
            <Stepper steps={REQUEST_STEPS} current={step} reached={reached} onSelect={goTo} label="Etapas da solicitação" />
          </section>

          <div className="grid items-start gap-4 @[880px]:grid-cols-[minmax(0,1fr)_340px]">
            <section ref={card} aria-labelledby="request-step-title" className="card @container min-w-0 p-5">
              <h2 id="request-step-title" ref={heading} tabIndex={-1} className="text-[20px] leading-tight font-extrabold tracking-tight text-ink focus:outline-none">
                <span className="tabular text-brand">{step + 1}.</span> {STEP_INFO[stepId].title}
              </h2>
              <p className="mt-1 mb-5 text-[14.5px] text-ink-soft">{STEP_INFO[stepId].description}</p>

              {stepId === "quantity" && <RequestStepQuantity quantity={draft.quantity} unitPrice={baseline.unitPrice} errors={errors} onQuantity={(quantity) => patch({ quantity })} />}
              {stepId === "install" && <RequestStepInstall draft={draft} errors={errors} onChange={patch} />}
              {stepId === "payment" && <RequestStepPayment draft={draft} errors={errors} onChange={patch} />}
              {stepId === "review" && <RequestStepReview draft={draft} projection={projection} unitPrice={baseline.unitPrice} onEdit={edit} />}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                <Button variant="outline" disabled={step === 0 || submitting} onClick={() => goTo(step - 1)}>
                  <ArrowLeft className="size-5" aria-hidden="true" />
                  Voltar
                </Button>
                {last ? (
                  <Button loading={submitting} onClick={submit}>
                    {!submitting && <Send className="size-5" aria-hidden="true" />}
                    {submitting ? "Enviando…" : "Enviar solicitação"}
                  </Button>
                ) : (
                  <Button onClick={next}>
                    Continuar
                    <ArrowRight className="size-5" aria-hidden="true" />
                  </Button>
                )}
              </div>
            </section>

            <RequestSummary projection={projection} />
          </div>
        </>
      )}

      <RequestHistory requests={requests} baseline={baseline} onCancel={cancelRequest} />
    </div>
  );
}
