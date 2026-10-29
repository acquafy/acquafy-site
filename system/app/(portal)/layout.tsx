// app/(portal)/layout.tsx
import { cookies } from "next/headers";
import { PageHeading } from "@/components/layout/PageHeading";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { PortalProviders } from "@/components/providers/PortalProviders";
import { SidebarProvider } from "@/components/providers/SidebarProvider";
import { CURRENCY_COOKIE, DEFAULT_CURRENCY, isCurrency } from "@/lib/currency";
import { buildSearchIndex } from "@/lib/portal/search-index";
import { isSidebarMode, SIDEBAR_COOKIE } from "@/lib/sidebar";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const savedCurrency = jar.get(CURRENCY_COOKIE)?.value;
  const savedSidebar = jar.get(SIDEBAR_COOKIE)?.value;
  const currency = isCurrency(savedCurrency) ? savedCurrency : DEFAULT_CURRENCY;

  return (
    <PortalProviders currency={currency}>
      <SidebarProvider initial={isSidebarMode(savedSidebar) ? savedSidebar : "expanded"}>
        <div className="flex min-h-dvh lg:h-dvh lg:overflow-hidden">
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:font-semibold focus:text-brand"
          >
            Ir para o conteúdo
          </a>
          {/* Edge to edge, as in the Interfy admin: the menu is full height and flush with the left edge; the top bar
 and the content fill the rest, and the content scrolls all the way to the right edge. */}
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <TopBar searchEntries={buildSearchIndex()} />
            {/* `@container`: every grid inside answers to the width of this column, not of the window. Children never
 shrink (`shrink-0`), so a short window scrolls the column instead of squashing cards. The top bar sits
 outside this scroll area, so it stays pinned. */}
            <main id="conteudo" className="@container relative min-h-0 min-w-0 flex-1 bg-card lg:overflow-y-auto [scrollbar-color:var(--scroll-thumb)_transparent] [scrollbar-width:thin]">
              <div className="flex flex-col gap-4 p-4 lg:p-6 [&>*]:shrink-0">
                <PageHeading />
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </PortalProviders>
  );
}
