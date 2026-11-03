// components/base/BaseScreenBoard.tsx
import Link from "next/link";
import { FORMAT_LABEL, type ScreenFormat } from "@/lib/base/formats";
import { DEVICE_LABEL, DEVICE_PARAM, DEVICES, type Device } from "@/lib/mobile/devices";
import { BaseIndexNav } from "./BaseIndexNav";
import { BaseSection, BaseSub } from "./BaseSection";
import { BaseScreenFrame } from "./BaseScreenFrame";
import { screenProgress, type ProductionGroup, type ResolvedScreen, type ScreenProgress } from "@/lib/base/screens";

const PROGRESS: Record<ScreenProgress, string> = { done: "Concluída", partial: "Em produção", queued: "Na fila" };

/** The app's thumbnails of one screen on one form factor, for each platform (iOS, Android) that has it. */
function AppFrames({ screen, device }: { screen: ResolvedScreen; device: Device }) {
  const ready = screen.platforms.filter((p) => p.platform !== "desktop" && p.state === "ready" && p.href);
  return (
    <>
      {ready.map((p) => (
        <BaseScreenFrame key={`${p.platform}-${device}`} platform={p.platform} device={device} href={p.href!} route={screen.mobile ?? undefined} title={screen.title} />
      ))}
    </>
  );
}

const NOT_APP = "Não se aplica: esta tela só existe no desktop.";

/**
 * The screens in production order on one long page, like the components and organisms pages: sticky index on the left (numbered, in
 * the production order), one section per screen on the right. Each screen is shown in its THREE formats, which are different
 * layouts and are never lumped together as "mobile": Desktop, Tablet e Foldable, Celulares; the app formats on both platforms
 * (iOS, Android), as live thumbnails.
 */
export function BaseScreenBoard({ groups, format }: { groups: ProductionGroup[]; format: ScreenFormat }) {
  const screens = groups.flatMap((g) => g.screens.map((s) => ({ s, group: g })));

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
      <BaseIndexNav title="Telas" items={screens.map(({ s }) => ({ id: s.id, name: `${String(s.order).padStart(2, "0")} · ${s.title}` }))} />

      <div className="min-w-0">
        {screens.map(({ s, group }) => {
          const desktop = s.platforms.find((p) => p.platform === "desktop");
          const hasApp = !!s.mobile;
          return (
            <BaseSection key={s.id} id={s.id} name={`${String(s.order).padStart(2, "0")} · ${s.title}`} origin={`${group.letter}. ${group.title} · ${PROGRESS[screenProgress(s)]}`}>
              {s.note && <p className="mb-4 text-[13px] text-ink-soft">{s.note}</p>}

              <BaseSub>
                {FORMAT_LABEL[format]}
                {format === "desktop" ? "" : " · iOS e Android"}
              </BaseSub>
              {format === "desktop" ? (
                desktop?.state === "ready" && desktop.href ? (
                  <div className="flex flex-wrap items-start gap-6">
                    <BaseScreenFrame platform="desktop" href={desktop.href} title={s.title} />
                  </div>
                ) : (
                  <p className="text-[13px] text-ink-mute">Não se aplica: esta tela só existe no app.</p>
                )
              ) : hasApp ? (
                <div className="flex flex-wrap items-start gap-x-6 gap-y-5">
                  {format === "tablet" ? (
                    <>
                      <AppFrames screen={s} device="tablet" />
                      <AppFrames screen={s} device="foldable" />
                    </>
                  ) : (
                    <AppFrames screen={s} device="phone" />
                  )}
                </div>
              ) : (
                <p className="text-[13px] text-ink-mute">{NOT_APP}</p>
              )}

              {hasApp && (
                <p className="mt-5 flex flex-wrap items-center gap-x-3 text-[13px] text-ink-soft">
                  <b className="font-semibold">Abrir iOS e Android lado a lado em:</b>
                  {DEVICES.map((d) => (
                    <Link
                      key={d}
                      href={`/m/duo/${s.mobile}${d === "phone" ? "" : `?${DEVICE_PARAM}=${d}`}`}
                      className="font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-brand"
                    >
                      {d === "phone" ? "Celulares" : DEVICE_LABEL[d]}
                    </Link>
                  ))}
                </p>
              )}

              <p className="mt-5 border-t border-line pt-3 text-[12.5px] text-ink-mute">
                <b className="font-semibold text-ink-soft">Referência:</b> {s.references.length ? s.references.map((r) => r.name).join(" · ") : "padrão de mercado"}
                <span className="mx-2">·</span>
                <b className="font-semibold text-ink-soft">Organismos:</b> {s.organismFiles.length}
              </p>
            </BaseSection>
          );
        })}
      </div>
    </div>
  );
}
