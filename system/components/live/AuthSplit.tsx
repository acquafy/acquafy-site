// components/live/AuthSplit.tsx
import type { ReactNode } from "react";
import { LoginBrandPanel } from "@/components/sections/LoginBrandPanel";

/** The login's layout for every public sign-up screen: brand panel on the left, one card on the right (card on top of the panel on phones). */
export function AuthSplit({ title, subtitle, children, footer }: { title: string; subtitle?: ReactNode; children: ReactNode; footer?: ReactNode }) {
  return (
    <main id="conteudo" className="min-h-dvh lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <LoginBrandPanel />
      <div className="relative z-10 -mt-8 flex justify-center rounded-t-2xl px-4 pt-0 pb-8 lg:mt-0 lg:items-center lg:px-10 lg:py-10">
        <div className="w-full max-w-[30rem]">
          <div className="card p-6 sm:p-7 lg:rounded-xl">
            <h2 className="text-[26px] leading-tight font-extrabold tracking-tight text-ink">{title}</h2>
            {subtitle && <p className="mt-1 mb-5 text-[14.5px] text-ink-soft">{subtitle}</p>}
            {children}
          </div>
          {footer && <div className="mt-4 text-center text-[14.5px] text-ink-soft">{footer}</div>}
        </div>
      </div>
    </main>
  );
}

/** Text link in the brand blue, as used in the login ("Esqueci minha senha"). */
export const AUTH_LINK = "rounded-md font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
