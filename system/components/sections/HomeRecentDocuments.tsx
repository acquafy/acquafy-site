// components/sections/HomeRecentDocuments.tsx
import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/KpiCard";
import { officialDocuments } from "@/config/documents-page";
import { formatDate } from "@/lib/format";

const SHOWN = 4;

/** The latest official documents with a one-click download. */
export function HomeRecentDocuments() {
  const recent = [...officialDocuments]
    .filter((d) => d.file)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, SHOWN);

  return (
    <Card
      title="Documentos recentes"
      className="h-full"
      action={
        <Link href="/documentos" className="text-[13.5px] font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-brand">
          Ver todos
        </Link>
      }
    >
      <ul className="divide-y divide-line">
        {recent.map((doc) => (
          <li key={doc.id} className="flex items-center gap-3 py-3">
            <IconTile icon={FileText} tone="violet" className="size-10" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14.5px] font-bold text-ink">{doc.title}</span>
              <span className="block text-[13px] text-ink-soft">
                {doc.kind} · {formatDate(doc.date)}
              </span>
            </span>
            <a
              href={doc.file ?? "#"}
              download={doc.filename}
              aria-label={`Baixar ${doc.title}`}
              title={`Baixar ${doc.title}`}
              className="grid size-9 shrink-0 place-items-center rounded-lg border border-line text-brand hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand"
            >
              <Download className="size-[18px]" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}
