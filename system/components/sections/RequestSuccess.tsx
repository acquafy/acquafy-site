// components/sections/RequestSuccess.tsx
"use client";

import { ArrowRight, CircleCheck, Copy, ListChecks, Plus } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Money } from "@/components/ui/Money";
import { useToast } from "@/components/providers/ToastProvider";
import { NEXT_STEPS, PAYMENT_OPTIONS, type PortalRequest } from "@/config/request-page";
import { formatDate } from "@/lib/format";

type Props = { request: PortalRequest; onNew: () => void; onSeeRequests: () => void };

export function RequestSuccess({ request, onNew, onSeeRequests }: Props) {
  const toast = useToast();
  const payment = PAYMENT_OPTIONS.find((o) => o.value === request.payment);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(request.id);
      toast({ title: "Protocolo copiado", description: request.id });
    } catch {
      toast({ title: "Não foi possível copiar", description: `Anote o protocolo ${request.id}.`, tone: "error" });
    }
  };

  return (
    <section aria-labelledby="request-success-title" className="card @container p-6 @2xl:p-8">
      <div className="flex flex-col items-center text-center">
        <span aria-hidden="true" className="grid size-16 place-items-center rounded-full bg-ok-soft text-ok">
          <CircleCheck className="size-9" strokeWidth={1.75} />
        </span>
        <h2 id="request-success-title" tabIndex={-1} className="mt-4 text-[24px] leading-tight font-extrabold tracking-tight text-ink">
          Solicitação enviada com sucesso!
        </h2>
        <p className="mt-1 max-w-xl text-[15px] text-ink-soft">
          Recebemos o seu pedido de {request.quantity} {request.quantity === 1 ? "purificador" : "purificadores"} em {formatDate(request.createdAt)}. Enviamos a confirmação para o seu e-mail.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-xl bg-brand-soft px-5 py-3">
          <div className="text-left">
            <p className="text-[12.5px] font-semibold tracking-wide text-ink-soft uppercase">Protocolo</p>
            <p className="tabular text-[22px] leading-tight font-extrabold text-ink">{request.id}</p>
          </div>
          <Button variant="outline" size="sm" onClick={copy}>
            <Copy className="size-4" aria-hidden="true" />
            Copiar
          </Button>
        </div>
        <p className="mt-3 text-[14px] text-ink-soft">
          Total:{" "}
          <strong className="text-ink">
            <Money value={request.quantity * request.unitPrice} />
          </strong>{" "}
          · {payment?.label}
        </p>
      </div>

      <div className="mx-auto mt-7 max-w-3xl">
        <h3 className="mb-3 text-[16px] font-extrabold text-ink">Próximos passos</h3>
        <ol className="grid gap-3 @2xl:grid-cols-3">
          {NEXT_STEPS.map((s, i) => (
            <li key={s.title} className="rounded-xl border border-line p-4">
              <span aria-hidden="true" className="tabular mb-2 grid size-8 place-items-center rounded-full bg-brand-soft text-[14px] font-bold text-brand">
                {i + 1}
              </span>
              <p className="text-[14.5px] font-bold text-ink">{s.title}</p>
              <p className="mt-1 text-[13.5px] leading-snug text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button variant="soft" onClick={onSeeRequests}>
          <ListChecks className="size-5" aria-hidden="true" />
          Ver minhas solicitações
        </Button>
        <Button variant="outline" onClick={onNew}>
          <Plus className="size-5" aria-hidden="true" />
          Nova solicitação
        </Button>
        <ButtonLink href="/dashboard">
          Ir ao dashboard
          <ArrowRight className="size-5" aria-hidden="true" />
        </ButtonLink>
      </div>
    </section>
  );
}
