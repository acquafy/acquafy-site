// components/mobile/sections/MobilePurifierDetailSheet.tsx
"use client";

import Image from "next/image";
import { Copy, FileText, Map as MapIcon, MapPin, Wrench } from "lucide-react";
import { MobileButton, MobileButtonLink } from "@/components/mobile/ui/MobileButton";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";
import { useToast } from "@/components/providers/ToastProvider";
import { StatusBadge } from "@/components/ui/Badge";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { contract, type Purifier } from "@/config/investor";
import type { MaintenanceRequest } from "@/config/mobile-purifiers";
import { copyText } from "@/lib/fileActions";
import { formatDate } from "@/lib/format";
import { useHeld } from "@/lib/mobile/useHeld";
import { locationLabel, mapsUrl, reviewDate } from "@/lib/portal/purifiers";

type Props = {
  purifier: Purifier | null;
  requests: MaintenanceRequest[];
  onClose: () => void;
  onMaintenance: (p: Purifier) => void;
};

/** Details of one purifier with the actions: copy S/N, open on the map, request maintenance, see the contract. */
export function MobilePurifierDetailSheet({ purifier, requests, onClose, onMaintenance }: Props) {
  const toast = useToast();
  const p = useHeld(purifier);

  const copySerial = async () => {
    if (!p) return;
    const ok = await copyText(p.serial);
    toast(ok ? { title: "Número de série copiado", description: p.serial } : { tone: "error", title: "Não foi possível copiar", description: "O navegador bloqueou a área de transferência." });
  };

  return (
    <MobileSheet
      open={!!purifier}
      onClose={onClose}
      size="full"
      title={p ? p.model : "Purificador"}
      description={p ? `S/N ${p.serial}` : undefined}
      footer={
        p && (
          <div className="grid grid-cols-2 gap-2.5">
            <MobileButtonLink href={mapsUrl(p)} external variant="secondary" size="md">
              <MapIcon className="size-5" aria-hidden="true" />
              Abrir no mapa
            </MobileButtonLink>
            <MobileButton disabled={p.status === "available"} onClick={() => onMaintenance(p)}>
              <Wrench className="size-5" aria-hidden="true" />
              Manutenção
            </MobileButton>
          </div>
        )
      }
    >
      {p && (
        <div className="grid gap-4">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-[14px] bg-[radial-gradient(ellipse_at_50%_60%,var(--photo-a),var(--photo-b)_75%)] p-3">
            <Image src="/brand/neo-up.webp" alt={`Purificador ${p.model}`} width={420} height={536} sizes="120px" className="h-[120px] w-auto" />
            <div className="grid min-w-0 justify-items-start gap-2">
              <StatusBadge kind={p.status} />
              <p className="flex items-center gap-1.5 text-[14px] text-ink">
                <MapPin className="size-4 shrink-0 text-brand" aria-hidden="true" />
                {locationLabel(p)}
              </p>
              <MobileButton variant="soft" size="sm" onClick={copySerial} aria-label={`Copiar número de série ${p.serial}`}>
                <Copy className="size-4" aria-hidden="true" />
                Copiar S/N
              </MobileButton>
            </div>
          </div>

          <DefinitionList
            rows={[
              { label: "Modelo", value: p.model },
              { label: "Número de série", value: p.serial },
              { label: "Data de ativação", value: p.activationDate ? formatDate(p.activationDate) : "—" },
              { label: "Contrato", value: `${contract.termMonths} meses` },
              { label: "Próxima revisão", value: p.activationDate ? formatDate(reviewDate(p.activationDate)) : "—" },
              { label: "Cliente final", value: p.endCustomer ? "Sim" : "Em estoque" },
            ]}
          />

          <section aria-label="Manutenções">
            <h3 className="mb-1.5 text-[13px] font-semibold tracking-wide text-ink-mute uppercase">Manutenções</h3>
            {requests.length === 0 ? (
              <p className="rounded-[12px] bg-canvas/70 p-3 text-[14px] text-ink-soft">{p.status === "available" ? "Esta unidade está no estoque da Acquafy, aguardando instalação." : "Nenhuma manutenção registrada. Se notar qualquer problema, solicite uma manutenção."}</p>
            ) : (
              <ul className="divide-y divide-line rounded-[12px] border border-line">
                {requests.map((r) => (
                  <li key={r.id} className="p-3 text-[14px]">
                    <p className="flex justify-between gap-3 font-semibold text-ink">
                      {r.reason}
                      <time className="tabular text-[13px] font-medium text-ink-soft">{formatDate(r.createdAt)}</time>
                    </p>
                    <p className="text-ink-soft">{r.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <MobileButtonLink href={{ route: "contract" }} variant="ghost" size="md" full onClick={onClose}>
            <FileText className="size-5" aria-hidden="true" />
            Ver contrato
          </MobileButtonLink>
        </div>
      )}
    </MobileSheet>
  );
}
