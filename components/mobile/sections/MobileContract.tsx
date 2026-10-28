// components/mobile/sections/MobileContract.tsx
"use client";

import { useState } from "react";
import { CalendarCheck, CircleCheck, CircleDollarSign, Coins, Download, FilePenLine, Hourglass, Printer, ScrollText } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileCard } from "@/components/mobile/ui/MobileCard";
import { MobileStatTile } from "@/components/mobile/ui/MobileStatTile";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Badge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/KpiCard";
import { Money } from "@/components/ui/Money";
import { CONTRACT_NUMBER, CONTRACT_PDF, COUNTERPARTY } from "@/config/contract-page";
import { contract, UNIT_PRICE } from "@/config/investor";
import { downloadFromUrl, openInNewTab } from "@/lib/fileActions";
import { diffDays, formatDate } from "@/lib/format";
import type { PortalSummary } from "@/lib/portal/schedule";
import { useContractEvents } from "@/lib/portal/useContractEvents";
import { MobileContractAmendmentSheet } from "./MobileContractAmendmentSheet";
import { MobileContractBuyback } from "./MobileContractBuyback";
import { MobileContractDetails } from "./MobileContractDetails";

/** Meu Contrato: status card with the main actions, four figures, details (chips) and the buy-back simulator. Owns the contract history. */
export function MobileContract({ summary: s }: { summary: PortalSummary }) {
  const toast = useToast();
  const { profile } = useProfile();
  const { events, addEvent } = useContractEvents(s.today);
  const [amendment, setAmendment] = useState(false);
  const monthsLeft = Math.max(0, Math.round(diffDays(s.today, contract.endDate) / 30.44));

  const download = () => {
    downloadFromUrl(CONTRACT_PDF.href, CONTRACT_PDF.filename);
    toast({ title: "Download iniciado", description: CONTRACT_PDF.filename });
  };
  const print = () => {
    if (openInNewTab(CONTRACT_PDF.href)) toast({ tone: "info", title: "Contrato aberto em nova aba", description: "Use o menu de compartilhar do navegador para imprimir." });
    else toast({ tone: "error", title: "Pop-up bloqueado", description: "Permita pop-ups deste site para abrir o contrato." });
  };

  return (
    <>
      <MobileCard as="section" aria-label="Situação do contrato" className="grid gap-3">
        <div className="flex items-start gap-3">
          <IconTile icon={ScrollText} tone="violet" className="size-12" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h2 className="text-[17px] leading-tight font-extrabold tracking-tight text-ink">{contract.title}</h2>
              <Badge tone="ok" icon={CircleCheck}>
                Ativo
              </Badge>
            </div>
            <p className="tabular mt-1 text-[13.5px] text-ink-soft">
              Contrato nº <strong className="text-ink">{CONTRACT_NUMBER}</strong>
            </p>
            <p className="text-[13.5px] text-ink-soft">
              <strong className="text-ink">{COUNTERPARTY}</strong> × <strong className="text-ink">{profile.name}</strong>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <MobileButton onClick={download}>
            <Download className="size-[18px]" aria-hidden="true" />
            Baixar
          </MobileButton>
          <MobileButton variant="secondary" onClick={print}>
            <Printer className="size-[18px]" aria-hidden="true" />
            Abrir PDF
          </MobileButton>
          <MobileButton variant="soft" className="col-span-2" onClick={() => setAmendment(true)}>
            <FilePenLine className="size-[18px]" aria-hidden="true" />
            Solicitar aditivo
          </MobileButton>
        </div>
      </MobileCard>

      <section aria-label="Indicadores do contrato" className="grid grid-cols-2 gap-3">
        <MobileStatTile icon={Coins} tone="blue" label="Investimento total" value={<Money value={s.invested} whole />} caption={`${s.units} purificadores Neo UP`} />
        <MobileStatTile icon={CircleDollarSign} tone="green" label="Repasse mensal" value={<Money value={s.monthlyPayout} whole />} caption={`${Math.round(contract.leaseShare * 100)}% do Lease`} />
        <MobileStatTile icon={Hourglass} tone="violet" label="Prazo" value={`${contract.termMonths} meses`} caption={`${s.installments.length} parcelas · ${s.receivedCount} recebidas`} />
        <MobileStatTile icon={CalendarCheck} tone="pink" label="Término" value={formatDate(contract.endDate)} caption={`em ${monthsLeft} meses`} />
      </section>

      <MobileContractDetails
        units={s.units}
        invested={s.invested}
        installments={s.installments.length}
        firstPayout={s.installments[0].paymentDate}
        receivedCount={s.receivedCount}
        events={events}
        onAmendment={() => setAmendment(true)}
      />
      <MobileContractBuyback units={s.units} unitPrice={UNIT_PRICE} buybackShare={contract.buybackShare} endDate={contract.endDate} addEvent={addEvent} />

      <MobileContractAmendmentSheet
        open={amendment}
        onClose={() => setAmendment(false)}
        onSubmit={(type, reason) => {
          const event = addEvent({ kind: "aditivo", title: `Solicitação de aditivo: ${type}`, description: reason });
          toast({ title: "Solicitação de aditivo enviada", description: `Protocolo ${event.protocol}. Nossa equipe responde em até 2 dias úteis.` });
        }}
      />
    </>
  );
}
