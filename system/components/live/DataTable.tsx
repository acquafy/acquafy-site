// components/live/DataTable.tsx
import { Inbox } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";

export type Column = {
  heading: string;
  /** Secondary columns hide when the card is narrow (`@xl`), instead of scrolling sideways. */
  secondary?: boolean;
  align?: "right";
};

/** Table in the portal's style: captioned, `scope="col"`, no horizontal scroll (secondary columns hide by container width). */
export function DataTable({
  caption,
  title,
  action,
  columns,
  rows,
  empty = "Nenhum registro cadastrado para esta conta.",
}: {
  caption: string;
  title?: string;
  action?: ReactNode;
  columns: Column[];
  rows: ReactNode[][];
  empty?: string;
}) {
  return (
    <Card title={title} action={action} container>
      {rows.length ? (
        <div className="overflow-hidden rounded-lg border border-line">
          <table className="w-full text-left text-[14px] [&_td]:align-top">
            <caption className="sr-only">{caption}</caption>
            <thead>
              <tr className="bg-canvas/70 text-[12.5px] font-bold">
                {columns.map((c) => (
                  <th key={c.heading} scope="col" className={cn("px-3 py-2.5 whitespace-nowrap", c.align === "right" && "text-right", c.secondary && "hidden @xl:table-cell")}>
                    {c.heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={cn("px-3 py-3 [overflow-wrap:anywhere]", columns[j]?.align === "right" && "tabular text-right whitespace-nowrap", columns[j]?.secondary && "hidden @xl:table-cell")}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState icon={Inbox} title="Nada por aqui ainda" description={empty} />
      )}
    </Card>
  );
}
