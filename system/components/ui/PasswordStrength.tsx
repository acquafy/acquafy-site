// components/ui/PasswordStrength.tsx
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/cn";

export type PasswordCheck = { id: string; label: string; ok: boolean; required: boolean };

export type PasswordReport = {
  checks: PasswordCheck[];
  /** 0 (empty) to 4. */
  score: 0 | 1 | 2 | 3 | 4;
  /** Meets every required rule. */
  valid: boolean;
};

export function checkPassword(value: string): PasswordReport {
  const checks: PasswordCheck[] = [
    { id: "len", label: "Pelo menos 8 caracteres", ok: value.length >= 8, required: true },
    { id: "case", label: "Letras maiúsculas e minúsculas", ok: /[a-zà-ú]/.test(value) && /[A-ZÀ-Ú]/.test(value), required: true },
    { id: "num", label: "Pelo menos um número", ok: /\d/.test(value), required: true },
    { id: "sym", label: "Um símbolo (recomendado)", ok: /[^A-Za-z0-9À-ú]/.test(value), required: false },
  ];
  const score = (value ? checks.filter((c) => c.ok).length : 0) as PasswordReport["score"];
  return { checks, score, valid: checks.every((c) => c.ok || !c.required) };
}

const LEVELS = [
  { label: "Digite uma senha", bar: "bg-line", text: "text-ink-mute" },
  { label: "Fraca", bar: "bg-danger", text: "text-danger" },
  { label: "Razoável", bar: "bg-warn", text: "text-warn" },
  { label: "Boa", bar: "bg-brand", text: "text-brand" },
  { label: "Forte", bar: "bg-ok", text: "text-ok" },
] as const;

/** Strength meter + rule checklist for a new password. */
export function PasswordStrength({ value, id, className }: { value: string; id?: string; className?: string }) {
  const { checks, score } = checkPassword(value);
  const level = LEVELS[score];
  return (
    <div id={id} className={cn("rounded-lg bg-canvas/70 p-3.5", className)}>
      <div className="flex items-center gap-3">
        <div className="grid flex-1 grid-cols-4 gap-1.5" aria-hidden="true">
          {[1, 2, 3, 4].map((n) => (
            <span key={n} className={cn("h-1.5 rounded-full transition-colors", n <= score ? level.bar : "bg-line")} />
          ))}
        </div>
        <p aria-live="polite" className={cn("w-28 shrink-0 text-right text-[13px] font-bold", level.text)}>
          <span className="sr-only">Força da senha: </span>
          {level.label}
        </p>
      </div>
      <ul className="mt-3 grid gap-1.5 text-[13px]">
        {checks.map((c) => (
          <li key={c.id} className={cn("flex items-center gap-2", c.ok ? "text-ok" : "text-ink-soft")}>
            {c.ok ? <Check className="size-4 shrink-0" strokeWidth={2.5} aria-hidden="true" /> : <Circle className="size-4 shrink-0" aria-hidden="true" />}
            <span>
              {c.label}
              <span className="sr-only">{c.ok ? "(atendido)" : "(pendente)"}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
