"use client";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TextArea } from "@/components/ui/Field";
import { Notice } from "@/components/live/Notice";
import type { ActionResult } from "@/lib/enrollment/types";

/**
 * Titled card around a server-action form: fields, the kit's primary button, and the result as a Notice.
 * `bare` is for a form that already sits inside another card: a tinted panel with a small heading instead of a nested card.
 */
export function ActionForm({
  action,
  title,
  submit = "Salvar",
  children,
  bare = false,
  plain = false,
}: {
  action: (state: ActionResult, form: FormData) => Promise<ActionResult>;
  title: string;
  submit?: string;
  children: React.ReactNode;
  bare?: boolean;
  /** Only the form (fields, result, button): the caller already supplies the heading and the card (sign-up screens). */
  plain?: boolean;
}) {
  const [state, dispatch, pending] = useActionState(action, {});
  const form = (
    <form action={dispatch} aria-label={title} className="grid gap-3.5">
      {children}
      {state.error && <Notice tone="danger">{state.error}</Notice>}
      {state.success && <Notice tone="success">{state.success}</Notice>}
      {state.link && (
        <TextArea
          label="Link privado do convite"
          readOnly
          value={state.link}
          rows={4}
          hint="Este link permite ativar a identidade convidada. Compartilhe apenas com o destinatário."
        />
      )}
      <div>
        <Button type="submit" loading={pending} size={plain ? "lg" : "md"} className={plain ? "w-full" : undefined}>
          {pending ? "Processando…" : submit}
        </Button>
      </div>
    </form>
  );
  if (plain) return form;
  if (bare)
    return (
      <div className="rounded-xl bg-canvas/60 p-4">
        <h3 className="mb-3 text-[15.5px] font-extrabold tracking-tight text-ink">{title}</h3>
        {form}
      </div>
    );
  return <Card title={title}>{form}</Card>;
}
