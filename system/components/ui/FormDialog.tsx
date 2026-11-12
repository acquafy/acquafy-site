// components/ui/FormDialog.tsx
"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Button, type ButtonSize, type ButtonVariant } from "./Button";
import { Modal } from "./Modal";

type DialogContextValue = { close: () => void };

const DialogContext = createContext<DialogContextValue | null>(null);

/** Inside a `FormDialog`: lets a form close the dialog once its action finished. `null` outside of one. */
export const useFormDialog = () => useContext(DialogContext);

/**
 * A button that opens a form (or a confirmation) in a modal, so create/edit forms never take space on the page until asked for.
 * The children are server-rendered; forms inside drop their card frame and close the dialog when the action completes.
 */
export function FormDialog({
  trigger,
  icon,
  variant = "primary",
  size = "md",
  title,
  description,
  dialogSize = "md",
  defaultOpen = false,
  triggerClassName,
  triggerLabel,
  children,
}: {
  /** Text of the button that opens the dialog. */
  trigger: ReactNode;
  icon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  title: string;
  description?: string;
  dialogSize?: "sm" | "md" | "lg";
  /** Opens on first render (deep links such as "Preparar convite para este cadastro"). Re-key the dialog to open it again. */
  defaultOpen?: boolean;
  triggerClassName?: string;
  /** Accessible name when the visible text is ambiguous (e.g. the same "Editar" in every table row). */
  triggerLabel?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ close }), [close]);
  return (
    <>
      <Button type="button" variant={variant} size={size} className={triggerClassName} aria-label={triggerLabel} aria-haspopup="dialog" onClick={() => setOpen(true)}>
        {icon}
        {trigger}
      </Button>
      <Modal open={open} onClose={close} title={title} description={description} size={dialogSize}>
        <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
      </Modal>
    </>
  );
}
