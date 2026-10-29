// components/mobile/sections/MobileProfileTerms.tsx
"use client";

import { Download } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileDisclosureGroup } from "@/components/mobile/ui/MobileDisclosure";
import { useToast } from "@/components/providers/ToastProvider";
import { TERMS_PDF, TERMS_VERSION, termsSections } from "@/config/profile-page";
import { downloadFromUrl } from "@/lib/fileActions";

/** Termos e Condições: the sections as expandable rows and, when the file exists, the PDF download. */
export function MobileProfileTerms({ termsPdf }: { termsPdf: boolean }) {
  const toast = useToast();
  return (
    <>
      <p className="px-1 text-[13.5px] text-ink-soft">{TERMS_VERSION}</p>
      <MobileDisclosureGroup label="Termos e Condições" items={termsSections.map((t) => ({ id: t.title, title: t.title, content: t.body }))} />
      {termsPdf && (
        <MobileButton
          variant="secondary"
          size="lg"
          full
          onClick={() => {
            downloadFromUrl(TERMS_PDF, "termos-e-condicoes.pdf");
            toast({ title: "Download iniciado", description: "termos-e-condicoes.pdf" });
          }}
        >
          <Download className="size-5" aria-hidden="true" />
          Baixar termos em PDF
        </MobileButton>
      )}
    </>
  );
}
