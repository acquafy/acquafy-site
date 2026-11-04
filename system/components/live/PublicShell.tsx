// components/live/PublicShell.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";

/** Frame of the order screens people can open before signing in: the portal's flat top bar (logo + links) over a centred content column. */
export function PublicShell({ signedIn, children }: { signedIn: boolean; children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-card">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-line bg-card px-4 lg:h-[4.5rem] lg:px-6">
        <Link href="/pedidos" aria-label="Acquafy Account" className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
          <Image src="/app/brand/acquafy-logo.webp" alt="Acquafy" width={560} height={93} priority className="h-5 w-auto lg:h-[1.625rem] dark:hidden" />
          <Image src="/app/brand/acquafy-logo-white.webp" alt="Acquafy" width={640} height={106} priority className="hidden h-5 w-auto lg:h-[1.625rem] dark:block" />
        </Link>
        <nav aria-label="Navegação" className="flex items-center gap-2 sm:gap-3">
          {/* Cross-application link: Next Link would add the portal basePath. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            className="hidden items-center gap-1.5 rounded-md px-2 text-[14.5px] font-semibold text-ink-soft hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:inline-flex"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar ao site
          </a>
          {signedIn ? (
            <ButtonLink href="/pedidos" variant="outline" size="sm">
              Meus pedidos
            </ButtonLink>
          ) : (
            <ButtonLink href="/login" variant="outline" size="sm">
              Entrar
            </ButtonLink>
          )}
        </nav>
      </header>
      <main id="conteudo" className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4 lg:p-6 [&>*]:shrink-0">
        {children}
      </main>
    </div>
  );
}
