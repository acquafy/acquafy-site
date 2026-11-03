// components/sections/ContractSignature.tsx
"use client";

import { BadgeCheck, Building2, Copy, Download, Fingerprint, UserRound } from "lucide-react";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { IconTile } from "@/components/ui/KpiCard";
import { DOCUMENT_HASH, SIGNATURE_PDF, signatures } from "@/config/contract-page";
import { copyText, downloadFromUrl } from "@/lib/fileActions";
import { formatDate } from "@/lib/format";

/**"Assinatura" tab: digital-signature status of both parties, the document hash and the signature certificate. */
export function ContractSignature() {
  const toast = useToast();
  const { profile } = useProfile();

  const copyHash = async () => {
    const ok = await copyText(DOCUMENT_HASH);
    toast(
      ok
        ? { title: "Hash copiado", description: "O hash do documento está na área de transferência." }
        : { tone: "error", title: "Não foi possível copiar", description: "Seu navegador bloqueou a área de transferência." },
    );
  };

  const download = () => {
    downloadFromUrl(SIGNATURE_PDF.href, SIGNATURE_PDF.filename);
    toast({ title: "Download iniciado", description: SIGNATURE_PDF.filename });
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 @[640px]:grid-cols-2">
        {signatures.map((sig) => {
          const mine = sig.signer === null;
          return (
            <article key={sig.party} className="flex min-w-0 items-start gap-3 rounded-xl border border-line/80 p-4">
              <IconTile icon={mine ? UserRound : Building2} tone={mine ? "blue" : "violet"} className="size-12" />
              <div className="min-w-0 flex-1 leading-snug">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <h3 className="text-[15.5px] font-bold text-ink">{sig.party}</h3>
                  <Badge tone="ok" icon={BadgeCheck}>
                    Assinado
                  </Badge>
                </div>
                <p className="text-[14.5px] text-ink">{mine ? profile.name : sig.signer}</p>
                <p className="text-[13.5px] text-ink-soft">{sig.role}</p>
                <p className="tabular mt-1.5 text-[13.5px] text-ink-soft">
                  {formatDate(sig.date)} às {sig.time} · IP {sig.ip}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="rounded-xl bg-canvas/70 p-4">
        <p className="flex items-center gap-2 text-[13.5px] font-semibold text-ink">
          <Fingerprint className="size-5 text-brand" aria-hidden="true" />
          Hash do documento (SHA-256)
        </p>
        <div className="mt-2 flex items-start gap-2">
          <code className="min-w-0 flex-1 rounded-lg bg-card px-3 py-2 font-mono text-[12.5px] leading-relaxed break-all text-ink">{DOCUMENT_HASH}</code>
          <IconButton icon={Copy} label="Copiar hash do documento" bordered onClick={copyHash} />
        </div>
        <p className="mt-2 text-[12.5px] text-ink-soft">Qualquer alteração no contrato muda este código, o que invalida a assinatura.</p>
      </div>

      <div>
        <Button variant="outline" onClick={download}>
          <Download className="size-5" aria-hidden="true" />
          Baixar comprovante de assinatura
        </Button>
      </div>
    </div>
  );
}
