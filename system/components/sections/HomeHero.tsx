// components/sections/HomeHero.tsx
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { WaterBackdrop } from "@/components/ui/WaterBackdrop";
import { Money } from "@/components/ui/Money";
import { formatDateLong } from "@/lib/format";
import { getPortalSummary } from "@/lib/portal/schedule";

/** First thing on Home: the one date that matters next (the payout), with the two follow-up actions. */
export function HomeHero() {
  const s = getPortalSummary();
  const next = s.next;

  return (
    <section aria-label="Próximo repasse" className="card @container relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_85%_45%,var(--hero-a)_0%,var(--hero-b)_45%,var(--hero-c)_100%)]">
      {/* Gaussian blur softens the wave edges (more like real water); the slight scale hides the faded border. */}
      <WaterBackdrop className="pointer-events-none absolute inset-0 -z-10 size-full scale-105 blur-[3px]" />
      <div className="grid items-center gap-2 @2xl:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="px-6 py-7 @2xl:px-9 @2xl:py-8">
          <p className="flex items-center gap-2 text-[13.5px] font-bold tracking-wide text-brand uppercase">
            <CalendarDays className="size-4" aria-hidden="true" />
            Próximo repasse
          </p>
          {next ? (
            <>
              <p className="mt-2 text-[clamp(1.5rem,1rem+1.6cqw,2.125rem)] leading-[1.15] font-extrabold text-ink">
                Em {s.daysToNext} dias,{" "}
                <span className="bg-gradient-to-r from-brand to-violet bg-clip-text text-transparent">
                  <Money value={next.amount} />
                </span>
              </p>
              <p className="mt-1 text-[15.5px] text-ink-soft">Pagamento em {formatDateLong(next.paymentDate)}, por transferência bancária.</p>
            </>
          ) : (
            <p className="mt-2 text-[1.5rem] font-extrabold text-ink">Todos os repasses do contrato foram pagos.</p>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink href="/calendario">Ver calendário</ButtonLink>
            <ButtonLink href="/extrato" variant="outline">
              Abrir extrato
            </ButtonLink>
          </div>
        </div>

        <div aria-hidden="true" className="relative hidden h-full min-h-[14rem] @2xl:block">
          <span className="absolute top-8 left-6 size-3 rounded-full bg-white/80" />
          <span className="absolute top-20 right-10 size-2 rounded-full bg-white/90" />
          <span className="absolute bottom-12 left-3 size-4 rounded-full bg-white/70" />
          <Image src="/brand/neo-up.webp" alt="" width={420} height={536} priority sizes="208px" className="absolute right-4 bottom-3 h-[13rem] w-auto drop-shadow-2xl" />
        </div>
      </div>
    </section>
  );
}
