// components/ui/ProgressBar.tsx
import { cn } from "@/lib/cn";

export function ProgressBar({ value, label, className }: { value: number; label: string; className?: string }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)} className={cn("h-1.5 w-full rounded-full bg-line", className)}>
      <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${Math.max(pct, pct > 0 ? 3 : 0)}%` }} />
    </div>
  );
}
