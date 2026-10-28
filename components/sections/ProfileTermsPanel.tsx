// components/sections/ProfileTermsPanel.tsx
"use client";

import { Download, FileText } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { ButtonLink } from "@/components/ui/Button";
import { TERMS_PDF, TERMS_VERSION, termsSections } from "@/config/profile-page";
import { ProfilePanel } from "./ProfilePanel";

export function ProfileTermsPanel({ pdfAvailable }: { pdfAvailable: boolean }) {
  const toast = useToast();
  return (
    <ProfilePanel
      id="termos"
      title="Termos e Condições"
      description="Políticas de uso e privacidade do Portal do Investidor."
      icon={FileText}
      tone="violet"
      action={
        pdfAvailable ? (
          <ButtonLink
            href={TERMS_PDF}
            external
            variant="outline"
            size="sm"
            download="termos-e-condicoes.pdf"
            onClick={() => toast({ title: "Download iniciado", description: "Termos e Condições (PDF)." })}
          >
            <Download className="size-4" aria-hidden="true" />
            Baixar PDF
          </ButtonLink>
        ) : undefined
      }
    >
      <p className="mb-3 text-[13px] font-medium text-ink-mute">{TERMS_VERSION}</p>
      <div
        role="region"
        aria-label="Texto dos Termos e Condições"
        tabIndex={0}
        className="max-h-[min(30rem,60dvh)] overflow-y-auto rounded-xl border border-line bg-canvas/40 p-5 [scrollbar-color:var(--scroll-thumb)_transparent] [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-brand"
      >
        <div className="grid gap-5">
          {termsSections.map((s) => (
            <article key={s.title}>
              <h3 className="text-[15.5px] font-bold text-ink">{s.title}</h3>
              <p className="mt-1 text-[14.5px] leading-relaxed text-ink-soft">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
      <p className="mt-3 text-[13px] text-ink-mute">
        {pdfAvailable ? "Resumo dos termos. A versão completa em PDF prevalece em caso de divergência." : "Resumo dos termos de uso e privacidade do portal."}
      </p>
    </ProfilePanel>
  );
}
