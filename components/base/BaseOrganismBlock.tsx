// components/base/BaseOrganismBlock.tsx
import type { ReactNode } from "react";
import type { OrganismFile } from "@/lib/base/inventory";
import { BaseSub } from "./BaseSection";
import { PreviewBoundary } from "./PreviewBoundary";
import { DesktopStage, PhoneStage } from "./PreviewStage";
import type { PreviewSpec } from "./previews/types";

const PREVIEWS_HINT = "components/base/previews";

function Notice({ children, warn = false }: { children: ReactNode; warn?: boolean }) {
  return <p className={`rounded-lg border border-dashed px-4 py-3 text-[14px] ${warn ? "border-warn/50 bg-warn-soft text-ink" : "border-line text-ink-soft"}`}>{children}</p>;
}

/** One organism of the page: its name (and file) as the small label, the live preview right below (or why there is none). */
export function BaseOrganismBlock({ organism, preview }: { organism: OrganismFile; preview: PreviewSpec | undefined }) {
  const app = organism.kind === "mobile";
  const note = preview && "node" in preview ? preview.note : undefined;

  let body: ReactNode;
  if (!preview) {
    body = (
      <Notice warn>
        <strong>Sem pré-visualização.</strong> Adicione <code className="font-semibold">{organism.name}</code> ao mapa de previews em <code className="font-semibold">{PREVIEWS_HINT}</code>.
      </Notice>
    );
  } else if ("opensFrom" in preview) {
    body = (
      <Notice>
        Aparece ao abrir {preview.opensFrom}.{preview.reason && ` ${preview.reason}`}
      </Notice>
    );
  } else {
    body = (
      <PreviewBoundary>
        {app ? (
          <div className="flex flex-wrap items-start gap-x-6 gap-y-4">
            {(["ios", "android"] as const).map((platform) => (
              <div key={platform} className="min-w-0">
                <p className="mb-1.5 text-[11px] font-bold tracking-[0.08em] text-ink-mute uppercase">{platform === "ios" ? "iOS" : "Android"}</p>
                <div style={{ zoom: 0.78 }}>
                  <PhoneStage tall={preview.tall} platform={platform}>
                    {preview.node}
                  </PhoneStage>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <DesktopStage>{preview.node}</DesktopStage>
        )}
      </PreviewBoundary>
    );
  }

  return (
    <div id={organism.name} className={`min-w-0 scroll-mt-20 ${app ? "w-full" : ""}`}>
      <BaseSub>
        {organism.name} <span className="mt-0.5 block font-normal tracking-normal break-all text-ink-mute normal-case">{organism.file}</span>
      </BaseSub>
      {note && <p className="-mt-1.5 mb-2.5 text-[12px] text-ink-mute">{note}</p>}
      {body}
    </div>
  );
}
