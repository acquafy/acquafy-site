// components/ui/Modal.tsx
"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  /** Buttons row, pinned to the bottom. */
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  /** Marks the dialog as the only thing `window.print()` should print (receipts). */
  printable?: boolean;
};

const SIZES = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl" } as const;

/**
 * Native <dialog>: focus trap, Escape and the inert page behind come from the browser. We add the
 * backdrop-click close and a scroll lock.
 */
export function Modal({ open, onClose, title, description, children, footer, size = "md", printable = false }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={cn(
        "m-auto max-h-[min(90dvh,48rem)] w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border-0 bg-card p-0 text-ink backdrop:bg-navy-950/55 backdrop:backdrop-blur-sm",
        SIZES[size],
        printable && "print-area",
      )}
    >
      {open && (
        <div className="flex max-h-[min(90dvh,48rem)] flex-col">
          <header className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
            <div className="min-w-0">
              <h2 id={titleId} className="text-[20px] leading-tight font-extrabold tracking-tight">
                {title}
              </h2>
              {description && (
                <p id={descId} className="mt-1 text-[14px] text-ink-soft">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              aria-label="Fechar"
              onClick={onClose}
              data-print-hide
              className="rounded-lg p-1.5 text-ink-soft hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>
          {footer && (
            <footer data-print-hide className="flex flex-wrap justify-end gap-3 border-t border-line bg-canvas/50 px-6 py-4">
              {footer}
            </footer>
          )}
        </div>
      )}
    </dialog>
  );
}
