// components/ui/Stepper.tsx
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export type StepperStep = { id: string; label: string };

type StepperProps = {
  steps: readonly StepperStep[];
  /** Index of the current step. */
  current: number;
  /** Highest step already reached; steps up to it can be revisited. */
  reached?: number;
  onSelect?: (index: number) => void;
  /** Accessible name of the step list. */
  label: string;
  className?: string;
};

const CIRCLE = "grid size-9 shrink-0 place-items-center rounded-full text-[14px] font-bold transition";

/**
 * Ordered wizard progress. The current step carries `aria-current="step"`; finished steps can be
 * revisited. Labels adapt to the width of the stepper itself: all of them when there is room, only the
 * current one otherwise.
 */
export function Stepper({ steps, current, reached = current, onSelect, label, className }: StepperProps) {
  return (
    <nav aria-label={label} className={cn("@container", className)}>
      <ol className="flex items-center">
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          const last = i === steps.length - 1;
          const clickable = !!onSelect && i <= reached && !active;
          const circle = (
            <span
              className={cn(CIRCLE, done && "bg-brand text-white", active && "bg-brand-gradient text-white ring-4 ring-brand/20", !done && !active && "bg-canvas text-ink-mute")}
              aria-hidden="true"
            >
              {done ? <Check className="size-[18px]" strokeWidth={3} /> : i + 1}
            </span>
          );
          const text = (
            <span className={cn("min-w-0 text-left text-[14.5px] leading-tight font-semibold", active ? "text-ink" : "text-ink-soft", !active && "hidden @2xl:block")}>
              {step.label}
              <span className="sr-only">{done ? "(concluída)" : active ? "(etapa atual)" : "(pendente)"}</span>
            </span>
          );
          return (
            <li key={step.id} aria-current={active ? "step" : undefined} className={cn("flex items-center gap-3", !last && "flex-1", last && "flex-none")}>
              {clickable ? (
                <button
                  type="button"
                  onClick={() => onSelect?.(i)}
                  className="flex min-w-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  {circle}
                  {text}
                </button>
              ) : (
                <div className="flex min-w-0 items-center gap-2.5">
                  {circle}
                  {text}
                </div>
              )}
              {!last && <span aria-hidden="true" className={cn("mx-1 h-0.5 min-w-4 flex-1 rounded-full", i < current ? "bg-brand" : "bg-line")} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
