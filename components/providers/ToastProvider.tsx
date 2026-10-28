// components/providers/ToastProvider.tsx
"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CircleAlert, CircleCheck, Info, X } from "lucide-react";

type ToastTone = "success" | "error" | "info";
type ToastInput = { title: string; description?: string; tone?: ToastTone };
type ToastItem = ToastInput & { id: number; tone: ToastTone };

const ToastContext = createContext<(toast: ToastInput) => void>(() => {});

const TONES: Record<ToastTone, { icon: typeof Info; cls: string }> = {
  success: { icon: CircleCheck, cls: "text-ok" },
  error: { icon: CircleAlert, cls: "text-danger" },
  info: { icon: Info, cls: "text-brand" },
};

const LIFETIME_MS = 4500;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);
  const region = useRef<HTMLDivElement>(null);

  const dismiss = useCallback((id: number) => setItems((list) => list.filter((t) => t.id !== id)), []);

  const toast = useCallback(
    (input: ToastInput) => {
      const id = nextId.current++;
      setItems((list) => [...list.slice(-3), { ...input, id, tone: input.tone ?? "success" }]);
      window.setTimeout(() => dismiss(id), LIFETIME_MS);
    },
    [dismiss],
  );

  // The region lives in the top layer (popover) so toasts stay visible above open dialogs.
  useEffect(() => {
    const el = region.current;
    if (!el || typeof el.showPopover !== "function") return;
    if (items.length && !el.matches(":popover-open")) el.showPopover();
    if (!items.length && el.matches(":popover-open")) el.hidePopover();
  }, [items.length]);

  const value = useMemo(() => toast, [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        ref={region}
        popover="manual"
        role="region"
        aria-label="Avisos"
        aria-live="polite"
        className="fixed inset-[auto_1rem_1rem_auto] m-0 w-[min(24rem,calc(100vw-2rem))] border-0 bg-transparent p-0"
      >
        <ul className="flex flex-col gap-2">
          {items.map((t) => {
            const { icon: Icon, cls } = TONES[t.tone];
            return (
              <li key={t.id} className="card flex items-start gap-3 border border-line p-3.5">
                <Icon className={`mt-0.5 size-5 shrink-0 ${cls}`} aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-[14.5px] font-bold text-ink">{t.title}</p>
                  {t.description && <p className="text-[13.5px] text-ink-soft">{t.description}</p>}
                </div>
                <button
                  type="button"
                  aria-label="Fechar aviso"
                  onClick={() => dismiss(t.id)}
                  className="rounded-md p-1 text-ink-mute hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </ToastContext.Provider>
  );
}

/** `const toast = useToast(); toast({ title:"Salvo"})` */
export function useToast(): (toast: ToastInput) => void {
  return useContext(ToastContext);
}
