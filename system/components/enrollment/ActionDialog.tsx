"use client";
import type { ReactNode } from "react";
import type { ButtonSize, ButtonVariant } from "@/components/ui/Button";
import { FormDialog } from "@/components/ui/FormDialog";
import type { ActionResult } from "@/lib/enrollment/types";
import { ActionForm } from "./ActionForm";

/**
 * A button that opens a server-action form in a modal. With no fields it is a confirmation step
 * (`danger` for destructive ones: cancel, withdraw), so nothing irreversible happens on a single click.
 */
export function ActionDialog({
  action,
  title,
  trigger,
  icon,
  submit,
  description,
  size = "md",
  danger = false,
  triggerVariant = "outline",
  triggerSize = "sm",
  triggerLabel,
  defaultOpen,
  children,
}: {
  action: (state: ActionResult, form: FormData) => Promise<ActionResult>;
  title: string;
  /** Text of the button on the page. */
  trigger: ReactNode;
  icon?: ReactNode;
  /** Text of the confirm button inside the dialog (defaults to the trigger text). */
  submit?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  danger?: boolean;
  triggerVariant?: ButtonVariant;
  triggerSize?: ButtonSize;
  triggerLabel?: string;
  defaultOpen?: boolean;
  children?: ReactNode;
}) {
  return (
    <FormDialog
      trigger={trigger}
      icon={icon}
      variant={danger ? "danger" : triggerVariant}
      size={triggerSize}
      title={title}
      description={description}
      dialogSize={size}
      triggerLabel={triggerLabel}
      defaultOpen={defaultOpen}
    >
      <ActionForm action={action} title={title} submit={submit ?? (typeof trigger === "string" ? trigger : "Confirmar")} variant={danger ? "danger" : "primary"}>
        {children}
      </ActionForm>
    </FormDialog>
  );
}
