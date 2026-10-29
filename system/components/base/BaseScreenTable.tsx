// components/base/BaseScreenTable.tsx
import { Fragment } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { BasePlatformLink } from "./BasePlatformLink";
import { PLATFORM_LABEL, screenProgress, type ProductionGroup, type ScreenProgress } from "@/lib/base/screens";

const TH = "px-4 py-3 text-left text-[12.5px] font-bold tracking-wide text-ink-mute uppercase";

const PROGRESS: Record<ScreenProgress, { tone: "ok" | "brand" | "neutral"; label: string }> = {
  done: { tone: "ok", label: "Concluída" },
  partial: { tone: "brand", label: "Em produção" },
  queued: { tone: "neutral", label: "Na fila" },
};

/**
 * Production board: the screens in the order they are built, in lettered sections (as in the Interfy production base).
 * Each row: its position in the queue, the three platforms, the design reference it follows and its organisms.
 */
export function BaseScreenTable({ groups }: { groups: ProductionGroup[] }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[64rem] border-collapse text-[14.5px]">
        <caption className="sr-only">Telas em ordem de produção, por plataforma</caption>
        <thead className="border-b border-line bg-canvas/50">
          <tr>
            <th scope="col" className={`${TH} w-14`}>
              #
            </th>
            <th scope="col" className={TH}>
              Tela
            </th>
            <th scope="col" className={TH}>
              Etapa
            </th>
            <th scope="col" className={TH}>
              Desktop
            </th>
            <th scope="col" className={TH}>
              iOS
            </th>
            <th scope="col" className={TH}>
              Android
            </th>
            <th scope="col" className={TH}>
              Referência
            </th>
            <th scope="col" className={TH}>
              Organismos
            </th>
          </tr>
        </thead>
        {groups.map((g) => (
          <Fragment key={g.id}>
            <tbody className="border-b border-line">
              <tr className="bg-brand-soft/50">
                <th scope="colgroup" colSpan={8} className="px-4 py-2.5 text-left">
                  <span className="text-[15px] font-extrabold text-ink">
                    {g.letter}. {g.title}
                  </span>
                  <span className="ml-3 text-[13px] font-normal text-ink-soft">{g.description}</span>
                </th>
              </tr>
            </tbody>
            <tbody className="divide-y divide-line border-b border-line last:border-0">
              {g.screens.map((s) => {
                const progress = PROGRESS[screenProgress(s)];
                return (
                  <tr key={s.id} id={s.id} className="scroll-mt-20 align-top">
                    <td className="tabular px-4 py-3 text-[15px] font-extrabold text-brand">{String(s.order).padStart(2, "0")}</td>
                    <th scope="row" className="px-4 py-3 text-left font-semibold text-ink">
                      {s.title}
                      {s.note && <span className="mt-0.5 block text-[13px] font-normal text-ink-soft">{s.note}</span>}
                    </th>
                    <td className="px-4 py-3">
                      <Badge tone={progress.tone} dot>
                        {progress.label}
                      </Badge>
                    </td>
                    {s.platforms.map((p) => (
                      <td key={p.platform} className="px-4 py-3">
                        <BasePlatformLink state={p} label={`${s.title} · ${PLATFORM_LABEL[p.platform]}`} />
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      {s.references.length === 0 ? (
                        <Badge tone="neutral">Padrão de mercado</Badge>
                      ) : (
                        <ul className="space-y-1">
                          {s.references.map((r) => (
                            <li key={r.name} className="text-[13px] text-ink-soft">
                              {r.name}
                              {!r.exists && <span className="ml-1 text-danger">(arquivo ausente)</span>}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <ul className="space-y-1">
                        {s.organismFiles.map((o) => (
                          <li key={o.file} className="flex items-center gap-1.5 text-[13px] text-ink-soft">
                            <span className="rounded bg-canvas px-1 text-[11px] font-bold text-ink-mute uppercase">{o.kind === "mobile" ? "app" : "web"}</span>
                            {o.name}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Fragment>
        ))}
      </table>
      <p className="border-t border-line px-4 py-3 text-[13px] text-ink-soft">
        As telas do app (menos{" "}
        <Link href="/m/ios/bem-vindo" className="font-semibold text-brand hover:underline">
          Bem-vindo
        </Link>{" "}
        e Login) pedem sessão: entre pelo Login e volte.
      </p>
    </div>
  );
}
