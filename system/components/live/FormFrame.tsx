"use client";
import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonVariant } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useFormDialog } from "@/components/ui/FormDialog";
import { Submit } from "./Submit";

/**
 * Closes the surrounding dialog when the form's server action finishes (success or not: the result is shown on the page,
 * which these actions redirect back to). Brings the page to the top so that result is in view.
 */
function CloseWhenDone({ close }: { close: () => void }) {
  const { pending } = useFormStatus();
  const was = useRef(false);
  useEffect(() => {
    if (was.current && !pending) {
      close();
      document.getElementById("conteudo")?.scrollTo({ top: 0 });
    }
    was.current = pending;
  }, [pending, close]);
  return null;
}

/**
 * Frame of a redirecting server-action form (`Form` in Fields.tsx): a titled card on the page, or just the form with
 * Cancel + submit when it sits inside a `FormDialog`.
 */
export function FormFrame({
  action,
  title,
  submit = "Salvar",
  variant = "primary",
  children,
}: {
  action: (form: FormData) => Promise<void>;
  title: string;
  submit?: string;
  variant?: ButtonVariant;
  children: React.ReactNode;
}) {
  const dialog = useFormDialog();
  const form = (
    <form action={action} aria-label={title} className="grid gap-3.5">
      {children}
      <div className={dialog ? "flex flex-wrap justify-end gap-3" : undefined}>
        {dialog && (
          <Button type="button" variant="ghost" onClick={dialog.close}>
            Cancelar
          </Button>
        )}
        <Submit variant={variant}>{submit}</Submit>
      </div>
      {dialog && <CloseWhenDone close={dialog.close} />}
    </form>
  );
  return dialog ? form : <Card title={title}>{form}</Card>;
}
