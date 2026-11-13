"use client";

/**
 * Header of the purchase flow on the website (product pages, step 1 "Configurar"). The portal renders the same header
 * for the order page and the screens after it (system/components/flow/FlowShell.tsx); keep both in step.
 * 80px and fixed, like the site header, so the page offset (body pt-[80px]) and the product layout stay the same.
 */
const STEPS = ["Configurar", "Pedido", "Pagamento", "Acompanhar"] as const;

export default function FlowHeader({
  step = 1,
  stepHrefs,
}: {
  step?: 1 | 2 | 3 | 4;
  /** Optional link for each step (index 0–3). When provided, the step label becomes a clickable link. */
  stepHrefs?: (string | undefined)[];
}) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-[80px] flex items-center gap-[16px] border-b border-[#e8ecf4] bg-white px-[16px] md:px-[32px]">
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- cross-app: full navigation required */}
      <a href="/" aria-label="Acquafy · voltar ao site" className="shrink-0 rounded-[6px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0233c3]">
        {/* eslint-disable-next-line @next/next/no-img-element -- small SVG logo, same asset as the site header */}
        <img src="/figma-assets/logo-b.svg" alt="Acquafy" width={169} height={28} className="h-[28px] w-auto" />
      </a>

      <ol aria-label="Etapas da compra" className="mx-auto hidden md:flex items-center gap-[8px] text-[13px]">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const state = n < step ? "done" : n === step ? "current" : "next";
          const href = stepHrefs?.[i];
          const inner = (
            <span
              aria-current={state === "current" ? "step" : undefined}
              className={`flex items-center gap-[6px] font-avenir-heavy ${state === "current" ? "text-[#1f2e91]" : state === "done" ? "text-[#0233c3]" : "text-[#8a8f97]"}`}
            >
              <span
                aria-hidden="true"
                className={`grid size-[24px] place-items-center rounded-full text-[12px] ${state === "current" ? "text-white" : state === "done" ? "bg-[#eef2ff] text-[#0233c3]" : "bg-[#f6f9fe] text-[#8a8f97]"}`}
                style={state === "current" ? { background: "linear-gradient(135deg, #0233c3, #0569ff)" } : undefined}
              >
                {state === "done" ? "✓" : n}
              </span>
              {label}
            </span>
          );
          return (
            <li key={label} className="flex items-center gap-[8px]">
              {i > 0 && <span aria-hidden="true" className="h-px w-[24px] bg-[#e8ecf4]" />}
              {href ? (
                <button
                  type="button"
                  onClick={() => { window.location.href = href; }}
                  className="cursor-pointer rounded-[6px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0233c3] hover:opacity-70 transition-opacity"
                >
                  {inner}
                </button>
              ) : inner}
            </li>
          );
        })}
      </ol>
      <p className="mx-auto hidden sm:block md:hidden whitespace-nowrap font-avenir-heavy text-[13px] text-[#1f2e91]">
        Etapa {step} de 4 · {STEPS[step - 1]}
      </p>

      <nav aria-label="Conta" className="ml-auto flex shrink-0 items-center gap-[4px] md:gap-[8px] text-[14px]">
        <a href="/app/pedidos" className="rounded-[8px] px-[12px] py-[8px] font-avenir-heavy text-[#4b5563] hover:text-[#0233c3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0233c3]">
          Meus pedidos
        </a>
        <a href="/central-de-suporte" className="hidden sm:inline-block rounded-[8px] px-[12px] py-[8px] font-avenir-heavy text-[#4b5563] hover:text-[#0233c3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0233c3]">
          Ajuda
        </a>
      </nav>
    </header>
  );
}
