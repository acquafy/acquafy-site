// components/ui/Card.tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  title?: ReactNode;
  /** Right side of the header: a select, a button, a legend… */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Makes the card a size container, so its children can adapt to the card's own width (`@md:`, `@xl:`…). */
  container?: boolean;
  id?: string;
};

export function Card({ title, action, children, className, container = false, id }: CardProps) {
  return (
    <section id={id} className={cn("card min-w-0 p-5", container && "@container", className)}>
      {(title || action) && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          {title && <h2 className="text-[18px] leading-tight font-extrabold tracking-tight text-ink">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
