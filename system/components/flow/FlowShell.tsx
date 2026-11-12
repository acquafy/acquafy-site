import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type FlowStep = 1 | 2 | 3 | 4;
export const FLOW_STEPS = ["Configurar", "Pedido", "Pagamento", "Acompanhar"] as const;
type NavItem = { href: string; label: string };

/**
 * Frame of every purchase-flow screen, shared with the website's product pages (components/flow/FlowHeader.tsx at the
 * repository root): an 80px header with the logo, the four steps, Help and the account; then either the split
 * (product image on the left, a 400/440px panel on the right that scrolls on its own) or one centred column.
 * Everything inside takes the `.flow` theme (app/globals.css): Avenir and the website's colours, light only.
 */
export function FlowShell({
  step,
  account,
  nav,
  stage,
  children,
}: {
  step: FlowStep;
  /** Signed-in e-mail, or null for a visitor (shows "Entrar"). */
  account: { email: string } | null;
  /** Customer menu (orders, leases, support, account) on the screens after the order. */
  nav?: NavItem[];
  /** Left side of the split: the product being ordered. Without it the content is one centred column. */
  stage?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flow min-h-dvh">
      <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-line bg-white px-4 md:px-8">
        {/* Cross-application links (website): Next Link would add the portal basePath. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" aria-label="Acquafy · voltar ao site" className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
          {/* eslint-disable-next-line @next/next/no-img-element -- website asset outside the portal basePath */}
          <img src="/figma-assets/logo-b.svg" alt="Acquafy" width={132} height={28} className="h-7 w-auto" />
        </a>
        <FlowSteps step={step} />
        <nav aria-label="Conta" className="ml-auto flex shrink-0 items-center gap-1 text-[14px] md:gap-2">
          {nav ? (
            <>
              <ul className="hidden items-center gap-1 lg:flex">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="rounded-lg px-3 py-2 font-semibold text-ink-soft hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <details className="relative lg:hidden">
                <summary className="cursor-pointer list-none rounded-lg border border-line px-3 py-2 font-semibold text-ink focus-visible:outline-2 focus-visible:outline-brand">Menu</summary>
                <ul className="absolute right-0 mt-2 grid w-52 gap-1 rounded-xl border border-line bg-white p-2 shadow-lg">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="block rounded-lg px-3 py-2 font-semibold text-ink hover:bg-canvas">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </>
          ) : account ? (
            <Link href="/pedidos" className="rounded-lg px-3 py-2 font-semibold text-ink-soft hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">
              Meus pedidos
            </Link>
          ) : (
            <Link href="/login" className="rounded-lg px-3 py-2 font-semibold text-ink-soft hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">
              Entrar
            </Link>
          )}
          <a href="/central-de-suporte" className="hidden rounded-lg px-3 py-2 font-semibold text-ink-soft hover:text-brand focus-visible:outline-2 focus-visible:outline-brand sm:inline-block">
            Ajuda
          </a>
        </nav>
      </header>

      {stage ? (
        <div className="md:grid md:h-[calc(100dvh-5rem)] md:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px]">
          <aside aria-label="Produto" className="relative h-[38vh] min-h-56 bg-canvas md:h-full">
            {stage}
          </aside>
          <main id="conteudo" className="@container flex min-w-0 flex-col gap-4 px-5 py-6 md:h-full md:overflow-y-auto md:border-l md:border-line [&>*]:shrink-0">
            {children}
          </main>
        </div>
      ) : (
        <main id="conteudo" className="@container mx-auto flex w-full max-w-[56rem] flex-col gap-4 px-4 py-8 md:px-8 [&>*]:shrink-0">
          {children}
        </main>
      )}
    </div>
  );
}

/** The four steps of the purchase; the current one is marked, the ones before it are done. */
export function FlowSteps({ step }: { step: FlowStep }) {
  return (
    <>
      <ol aria-label="Etapas da compra" className="mx-auto hidden items-center gap-2 text-[13px] md:flex">
        {FLOW_STEPS.map((label, i) => {
          const n = i + 1;
          const state = n < step ? "done" : n === step ? "current" : "next";
          return (
            <li key={label} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" className="h-px w-6 bg-line" />}
              <span
                aria-current={state === "current" ? "step" : undefined}
                className={cn(
                  "flex items-center gap-1.5 font-semibold",
                  state === "current" ? "text-ink" : state === "done" ? "text-brand" : "text-ink-mute",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-6 place-items-center rounded-full text-[12px]",
                    state === "current" ? "bg-brand-gradient text-white" : state === "done" ? "bg-brand-soft text-brand" : "bg-canvas text-ink-mute",
                  )}
                >
                  {state === "done" ? "✓" : n}
                </span>
                {label}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mx-auto hidden text-[13px] font-semibold whitespace-nowrap text-ink sm:block md:hidden">
        Etapa {step} de 4 · {FLOW_STEPS[step - 1]}
      </p>
    </>
  );
}

/** Left side of the split: the product being ordered, as large as the stage allows, with its name and colour. */
export function FlowStage({ image, title, detail }: { image: string; title: string; detail?: string }) {
  return (
    <figure className="flex h-full flex-col items-center justify-center gap-3 p-6">
      {/* eslint-disable-next-line @next/next/no-img-element -- website product image outside the portal basePath */}
      <img src={image} alt={title} className="min-h-0 w-full max-w-[34rem] flex-1 object-contain" />
      <figcaption className="text-center">
        <span className="block text-[20px] font-black tracking-tight text-ink">{title}</span>
        {detail && <span className="block text-[13.5px] text-ink-soft">{detail}</span>}
      </figcaption>
    </figure>
  );
}
