// components/mobile/sections/MobileRequest.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CircleCheck, Plus, Send } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileCard } from "@/components/mobile/ui/MobileCard";
import { useToast } from "@/components/providers/ToastProvider";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Money } from "@/components/ui/Money";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { EMPTY_DRAFT, NEXT_STEPS, REQUEST_STEPS, REQUEST_TEXT, SEED_REQUESTS, type PortalRequest, type RequestDraft, type RequestStepId } from "@/config/request-page";
import type { IsoDate } from "@/lib/format";
import { firstInvalidStep, formatLocation, nextRequestProtocol, projectRequest, validateStep, type DraftErrors, type ProjectionBaseline } from "@/lib/portal/projection";
import { usePersistentState } from "@/lib/usePersistentState";
import { MobileRequestHistory } from "./MobileRequestHistory";
import { MobileRequestStepInstall, MobileRequestStepPayment, MobileRequestStepQuantity, MobileRequestStepReview } from "./MobileRequestSteps";

const STEP_IDS = REQUEST_STEPS.map((s) => s.id);
const STEP_INFO: Record<RequestStepId, { title: string; description: string }> = {
  quantity: { title: "Quantidade e modelo", description: "Quantos purificadores Neo UP você quer adicionar?" },
  install: { title: "Instalação", description: "Defina onde os purificadores ficarão instalados." },
  payment: { title: "Pagamento", description: "Escolha como prefere pagar e aceite os termos." },
  review: { title: "Revisão e envio", description: "Confira os dados. Você pode editar qualquer bloco antes de enviar." },
};

/** Solicitar Mais Purificadores: four steps with a live simulation, a success state and the list of past requests. */
export function MobileRequest({ baseline, today }: { baseline: ProjectionBaseline; today: IsoDate }) {
  const toast = useToast();
  const [requests, setRequests] = usePersistentState<PortalRequest[]>("solicitacoes", SEED_REQUESTS);
  const [draft, setDraft] = useState<RequestDraft>(EMPTY_DRAFT);
  const [step, setStep] = useState(0);
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
    setErrors({});
    window.setTimeout(() => {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 0);
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
      toast({ title: "Solicitação enviada", description: `Protocolo ${request.id}. Acompanhe em Minhas solicitações.` });
    }, 1100);
  };

  const reset = () => {
    setDraft(EMPTY_DRAFT);
    setStep(0);
    setErrors({});
    setSubmitted(null);
  };

  return (
    <>
      {submitted ? (
        <MobileCard as="section" aria-label="Solicitação enviada" className="grid justify-items-center gap-3 py-6 text-center">
          <span aria-hidden="true" className="grid size-16 place-items-center rounded-full bg-ok-soft text-ok">
            <CircleCheck className="size-9" strokeWidth={1.75} />
          </span>
          <h2 className="text-[20px] font-extrabold text-ink">Solicitação enviada!</h2>
          <p className="tabular text-[14.5px] text-ink-soft">
            Protocolo <strong className="text-ink">{submitted.id}</strong> · {submitted.quantity} {submitted.quantity === 1 ? "unidade" : "unidades"}
          </p>
          <ol className="grid w-full gap-2 text-left">
            {NEXT_STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-3 rounded-[12px] bg-canvas/70 p-3">
                <span aria-hidden="true" className="tabular grid size-6 shrink-0 place-items-center rounded-full bg-brand text-[13px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="min-w-0 text-[13.5px] leading-snug text-ink-soft">
                  <strong className="block text-ink">{s.title}</strong>
                  {s.text}
                </span>
              </li>
            ))}
          </ol>
          <MobileButton variant="secondary" size="lg" full onClick={reset}>
            <Plus className="size-5" aria-hidden="true" />
            Nova solicitação
          </MobileButton>
        </MobileCard>
      ) : (
        <>
          <section aria-label="Progresso da solicitação" className="grid gap-2">
            <div className="flex items-baseline justify-between px-1">
              <p className="text-[13.5px] font-semibold text-ink-soft" aria-live="polite">
                Etapa {step + 1} de {REQUEST_STEPS.length}
              </p>
              <p className="text-[13.5px] text-ink-soft">{REQUEST_STEPS[step].label}</p>
            </div>
            <ProgressBar value={((step + 1) / REQUEST_STEPS.length) * 100} label="Progresso da solicitação" className="h-2" />
          </section>

          <section ref={card} aria-labelledby="m-request-step-title" className="grid gap-4">
            <div>
              <h2 id="m-request-step-title" ref={heading} tabIndex={-1} className="text-[20px] leading-tight font-extrabold tracking-tight text-ink focus:outline-none">
                <span className="tabular text-brand">{step + 1}.</span> {STEP_INFO[stepId].title}
              </h2>
              <p className="mt-1 text-[14.5px] text-ink-soft">{STEP_INFO[stepId].description}</p>
            </div>

            {stepId === "quantity" && <MobileRequestStepQuantity quantity={draft.quantity} unitPrice={baseline.unitPrice} errors={errors} onQuantity={(quantity) => patch({ quantity })} />}
            {stepId === "install" && <MobileRequestStepInstall draft={draft} errors={errors} onChange={patch} />}
            {stepId === "payment" && <MobileRequestStepPayment draft={draft} errors={errors} onChange={patch} />}
            {stepId === "review" && <MobileRequestStepReview draft={draft} projection={projection} unitPrice={baseline.unitPrice} onEdit={(target) => goTo(STEP_IDS.indexOf(target))} />}

            <div className="grid grid-cols-[auto_1fr] gap-2.5">
              <MobileButton variant="secondary" size="lg" disabled={step === 0 || submitting} onClick={() => goTo(step - 1)} aria-label="Voltar para a etapa anterior">
                <ArrowLeft className="size-5" aria-hidden="true" />
              </MobileButton>
              {last ? (
                <MobileButton size="lg" loading={submitting} onClick={submit}>
                  {!submitting && <Send className="size-5" aria-hidden="true" />}
                  {submitting ? "Enviando…" : "Enviar solicitação"}
                </MobileButton>
              ) : (
                <MobileButton size="lg" onClick={next}>
                  Continuar
                  <ArrowRight className="size-5" aria-hidden="true" />
                </MobileButton>
              )}
            </div>
          </section>

          <MobileCard as="aside" aria-label="Resumo da simulação" className="grid gap-2">
            <h2 className="text-[17px] font-extrabold tracking-tight text-ink">Resumo da simulação</h2>
            <p className="tabular text-[28px] leading-tight font-extrabold text-ink" aria-live="polite">
              <Money value={projection.investment} whole />
              <span className="ml-2 text-[14px] font-medium text-ink-soft">
                · {projection.quantity} {projection.quantity === 1 ? "unidade" : "unidades"}
              </span>
            </p>
            <DefinitionList
              rows={[
                { label: "Repasse mensal projetado", value: <Money value={projection.monthlyPayout} /> },
                { label: `Total em ${projection.installments} parcelas`, value: <Money value={projection.totalPayout} whole /> },
                { label: "Retorno do capital em", value: `${projection.paybackMonths} meses` },
              ]}
            />
            <p className="rounded-[12px] bg-canvas px-3.5 py-3 text-[13.5px] leading-snug text-ink-soft">
              Com esta solicitação você terá <strong className="tabular text-ink">{projection.newTotalUnits} purificadores</strong> e repasse mensal de{" "}
              <strong className="text-ink">
                <Money value={projection.newMonthlyPayout} />
              </strong>
              .
            </p>
            <p className="text-[12.5px] leading-snug text-ink-mute">{REQUEST_TEXT.disclaimer}</p>
          </MobileCard>
        </>
      )}

      <MobileRequestHistory requests={requests} baseline={baseline} onCancel={(id) => setRequests((list) => list.map((r) => (r.id === id && r.status === "review" ? { ...r, status: "cancelled" } : r)))} />
    </>
  );
}
