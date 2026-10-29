// components/sections/ContractHeader.tsx
"use client";

import { CircleCheck, Download, FilePenLine, Printer, ScrollText } from "lucide-react";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/KpiCard";
import { CONTRACT_NUMBER, CONTRACT_PDF, COUNTERPARTY } from "@/config/contract-page";
import { contract } from "@/config/investor";
import { downloadFromUrl, openInNewTab } from "@/lib/fileActions";
import { useContract } from "./ContractProvider";

/** Status card of the contract: identity, parties and the three main actions. */
export function ContractHeader() {
  const toast = useToast();
  const { profile } = useProfile();
  const { openAmendment } = useContract();

  const download = () => {
    downloadFromUrl(CONTRACT_PDF.href, CONTRACT_PDF.filename);
    toast({ title: "Download iniciado", description: CONTRACT_PDF.filename });
  };

  const print = () => {
    if (openInNewTab(CONTRACT_PDF.href)) {
      toast({ tone: "info", title: "Contrato aberto em nova aba", description: "Use Ctrl + P (ou ⌘ + P) no visualizador para imprimir." });
    } else {
      toast({ tone: "error", title: "Pop-up bloqueado", description: "Permita pop-ups deste site para abrir o contrato para impressão." });
    }
  };

  return (
    <section aria-labelledby="contract-title" className="card @container min-w-0 p-5">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <div className="flex min-w-0 flex-1 basis-96 items-center gap-4">
          <IconTile icon={ScrollText} tone="violet" className="size-16" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <h2 id="contract-title" className="text-[20px] leading-tight font-extrabold tracking-tight text-ink">
                {contract.title}
              </h2>
              <Badge tone="ok" icon={CircleCheck}>
                Ativo
              </Badge>
            </div>
            <p className="tabular mt-1 text-[14.5px] text-ink-soft">
              Contrato nº <strong className="font-bold text-ink">{CONTRACT_NUMBER}</strong>
            </p>
            <p className="text-[14.5px] text-ink-soft">
              Partes: <strong className="font-bold text-ink">{COUNTERPARTY}</strong> × <strong className="font-bold text-ink">{profile.name}</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Button onClick={download}>
            <Download className="size-5" aria-hidden="true" />
            Baixar contrato
          </Button>
          <Button variant="outline" onClick={print}>
            <Printer className="size-5" aria-hidden="true" />
            Imprimir
          </Button>
          <Button variant="soft" onClick={openAmendment}>
            <FilePenLine className="size-5" aria-hidden="true" />
            Solicitar aditivo
          </Button>
        </div>
      </div>
    </section>
  );
}
