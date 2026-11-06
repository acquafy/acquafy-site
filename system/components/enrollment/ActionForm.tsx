"use client";
import { useActionState, useEffect } from "react";
import { Button, type ButtonVariant } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TextArea } from "@/components/ui/Field";
import { useFormDialog } from "@/components/ui/FormDialog";
import { Notice } from "@/components/live/Notice";
import { useToast } from "@/components/providers/ToastProvider";
import type { ActionResult } from "@/lib/enrollment/types";

/**
 * Titled card around a server-action form: fields, the kit's primary button, and the result as a Notice.
 * `bare` is for a form that already sits inside another card: a tinted panel with a small heading instead of a nested card.
 * Inside a `FormDialog` the form drops its frame, gets a Cancel button, and closes the dialog (with a toast) on success;
 * a result that carries a private link keeps the dialog open so the link can be copied.
 */
export function ActionForm({
  action,
  title,
  submit = "Salvar",
  children,
  bare = false,
  plain = false,
  variant = "primary",
}: {
  action: (state: ActionResult, form: FormData) => Promise<ActionResult>;
  title: string;
  submit?: string;
  children: React.ReactNode;
  bare?: boolean;
  /** Only the form (fields, result, button): the caller already supplies the heading and the card (sign-up screens). */
  plain?: boolean;
  variant?: ButtonVariant;
}) {
  const [state, dispatch, pending] = useActionState(action, {});
  const dialog = useFormDialog();
  const toast = useToast();
  const finished = Boolean(dialog && state.success && !state.link);
  useEffect(() => {
    if (!finished) return;
    toast({ title: state.success ?? "Alteração registrada." });
    dialog?.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per result
  }, [state]);
  const form = (
    <form action={dispatch} aria-label={title} className="grid gap-3.5">
      {children}
      {state.error && <Notice tone="danger">{state.error}</Notice>}
      {state.success && !finished && <Notice tone="success">{state.success}</Notice>}
      {state.link && (
        <TextArea
          label="Link privado do convite"
          readOnly
          value={state.link}
          rows={4}
          hint="Este link permite ativar a identidade convidada. Compartilhe apenas com o destinatário."
        />
      )}
      <div className={dialog ? "flex flex-wrap justify-end gap-3" : undefined}>
        {dialog && (
          <Button type="button" variant="ghost" onClick={dialog.close}>
            {state.link ? "Fechar" : "Cancelar"}
          </Button>
        )}
        {!(dialog && state.link) && (
          <Button type="submit" variant={variant} loading={pending} size={plain ? "lg" : "md"} className={plain ? "w-full" : undefined}>
            {pending ? "Processando…" : submit}
          </Button>
        )}
      </div>
    </form>
  );
  if (plain || dialog) return form;
  if (bare)
    return (
      <div className="rounded-xl bg-canvas/60 p-4">
        <h3 className="mb-3 text-[15.5px] font-extrabold tracking-tight text-ink">{title}</h3>
        {form}
      </div>
    );
  return <Card title={title}>{form}</Card>;
}
