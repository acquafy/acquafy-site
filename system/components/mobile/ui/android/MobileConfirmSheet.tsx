// components/mobile/ui/android/MobileConfirmSheet.tsx
"use client";

import type { ReactNode } from "react";
import { AndroidDialog } from "@/components/mobile/android/AndroidDialog";
import { MobileButton } from "./MobileButton";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  /** Extra content between the description and the buttons (the document being deleted…). */
  children?: ReactNode;
  confirmLabel: string;
  /** Error-coloured confirm button, for destructive confirmations. */
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/** "Tem certeza?" as a Material 3 alert dialog: headline, supporting text and two text buttons on the right ("Cancelar", then the confirmation, red when `danger`). */
export function MobileConfirmSheet({ open, title, description, children, confirmLabel, danger = false, onConfirm, onCancel }: Props) {
  return (
    <AndroidDialog
      open={open}
      onClose={onCancel}
      title={title}
      description={description}
      actions={
        <>
          <MobileButton variant="ghost" size="sm" onClick={onCancel}>
            Cancelar
          </MobileButton>
          <MobileButton variant="ghost" size="sm" className={danger ? "md-btn-error" : undefined} onClick={onConfirm}>
            {confirmLabel}
          </MobileButton>
        </>
      }
    >
      {children}
    </AndroidDialog>
  );
}
