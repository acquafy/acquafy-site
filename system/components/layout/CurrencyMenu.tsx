// components/layout/CurrencyMenu.tsx
"use client";

import { Check, ChevronDown } from "lucide-react";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { CurrencyFlag } from "@/components/ui/CurrencyFlag";
import { Popover } from "@/components/ui/Popover";
import { CURRENCIES, currencyList } from "@/lib/currency";
import { cn } from "@/lib/cn";

/** Display-currency selector. Contract values stay in USD; only their presentation changes. */
export function CurrencyMenu() {
  const { currency, setCurrency } = useCurrency();
  const toast = useToast();

  return (
    <Popover
      label="Moeda de exibição"
      panelClassName="w-72"
      trigger={(props) => (
        <button
          type="button"
          {...props}
          aria-label={`Moeda de exibição: ${CURRENCIES[currency].name}`}
          className="flex items-center gap-2 rounded-lg border border-line bg-card px-3 py-2 text-[15px] font-semibold text-ink hover:bg-brand-soft/60 focus-visible:outline-2 focus-visible:outline-brand"
        >
          <CurrencyFlag code={currency} />
          {CURRENCIES[currency].short}
          <ChevronDown className="size-4 text-ink-soft" aria-hidden="true" />
        </button>
      )}
    >
      {({ close }) => (
        <div role="listbox" aria-label="Moeda de exibição">
          {currencyList.map((c) => (
            <button
              key={c.code}
              type="button"
              role="option"
              aria-selected={c.code === currency}
              onClick={() => {
                setCurrency(c.code);
                close();
                toast({ title: `Valores em ${c.name}`, description: c.code === "USD" ? "Moeda do contrato." : "Conversão por taxa de referência.", tone: "info" });
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-brand-soft focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand",
                c.code === currency && "bg-brand-soft/60",
              )}
            >
              <CurrencyFlag code={c.code} className="size-7" />
              <span className="min-w-0 flex-1">
                <span className="block text-[14.5px] font-semibold text-ink">
                  {c.short} · {c.code}
                </span>
                <span className="block text-[12.5px] text-ink-soft">{c.name}</span>
              </span>
              {c.code === currency && <Check className="size-[18px] text-brand" aria-hidden="true" />}
            </button>
          ))}
          <p className="px-3 pt-2 pb-1.5 text-[12px] leading-snug text-ink-mute">Os repasses são pagos em US$. Outras moedas usam uma taxa de referência apenas para consulta.</p>
        </div>
      )}
    </Popover>
  );
}
