// components/sections/CalendarExportButton.tsx
"use client";

import { Download } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/Button";
import { downloadFile } from "@/lib/download";
import { buildIcs } from "@/lib/portal/ics";
import type { Installment } from "@/lib/portal/schedule";

export function CalendarExportButton({ installments }: { installments: Installment[] }) {
  const toast = useToast();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        downloadFile("repasses-acquafy.ics", buildIcs(installments), "text/calendar;charset=utf-8");
        toast({ title: "Calendário exportado", description: `${installments.length} repasses em formato .ics (Google, Apple, Outlook).` });
      }}
    >
      <Download className="size-4" aria-hidden="true" />
      Exportar Calendário
    </Button>
  );
}
