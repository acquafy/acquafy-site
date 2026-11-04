"use client";
import { useActionState } from "react";
import type { ActionResult } from "@/lib/enrollment/types";
export function ActionForm({
  action,
  title,
  submit = "Salvar",
  children,
}: {
  action: (state: ActionResult, form: FormData) => Promise<ActionResult>;
  title: string;
  submit?: string;
  children: React.ReactNode;
}) {
  const [state, dispatch, pending] = useActionState(action, {});
  return (
    <form action={dispatch} className="live-card live-form">
      <h2>{title}</h2>
      {children}
      {state.error && (
        <p role="alert" className="live-note live-error">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="live-note live-success">
          {state.success}
        </p>
      )}
      {state.link && (
        <label className="live-field">
          Link privado do convite
          <textarea
            readOnly
            value={state.link}
            rows={4}
            aria-label="Link privado do convite"
          />
          <small>
            Este link permite ativar a identidade convidada. Compartilhe apenas
            com o destinatário.
          </small>
        </label>
      )}
      <button className="live-button" disabled={pending}>
        {pending ? "Processando…" : submit}
      </button>
    </form>
  );
}
