// app/m/duo/[[...rest]]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AndroidTabsLayout } from "@/components/mobile/android/AndroidBottomNav";
import { DeviceFrame } from "@/components/mobile/DeviceFrame";
import { DuoNav } from "@/components/mobile/duo/DuoNav";
import { DuoPhone } from "@/components/mobile/duo/DuoPhone";
import { IosTabsLayout } from "@/components/mobile/ios/IosTabBar";
import { MobileRoot } from "@/components/mobile/MobileRoot";
import { DEVICE_PARAM, isDevice, type Device } from "@/lib/mobile/devices";
import type { Platform } from "@/lib/mobile/platform";
import "../../duo.css";
import { PAGES } from "../pages";

export const metadata: Metadata = { title: "iOS e Android" };

const CAPTION: Record<Platform, Record<Device, string>> = {
  ios: { phone: "iOS 26 · Liquid Glass", tablet: "iPadOS 26 · Liquid Glass", foldable: "iOS foldable · Liquid Glass" },
  android: { phone: "Android · Material 3 Expressive", tablet: "Android tablet · Material 3 Expressive", foldable: "Foldable · Material 3 Expressive" },
};

function Phone({ platform, device, route, sub, embed }: { platform: Platform; device: Device; route: string; sub?: string; embed: boolean }) {
  const set = PAGES[platform];
  const Tabs = platform === "ios" ? IosTabsLayout : AndroidTabsLayout;
  let page: ReactNode;
  let tabs = true;

  if (route in set.flow) {
    const Page = set.flow[route];
    page = <Page />;
    tabs = false;
  } else if (route === "perfil" && sub) {
    const Section = set.section;
    page = <Section params={Promise.resolve({ secao: sub })} />;
  } else if (route in set.tabs) {
    const Page = set.tabs[route];
    page = <Page />;
  } else {
    notFound();
  }

  return (
    <DuoPhone platform={platform} device={device} caption={CAPTION[platform][device]} embed={embed}>
      <MobileRoot platform={platform} device={device}>
        <DeviceFrame platform={platform} bare>
          {tabs ? <Tabs>{page}</Tabs> : <div className="flex min-h-full flex-col">{page}</div>}
        </DeviceFrame>
      </MobileRoot>
    </DuoPhone>
  );
}

/**
 * The mobile app on both platforms at once: the real pages of /m/ios/<tela> and /m/android/<tela> rendered in the same document
 * (no iframes), so everything is clickable and inspectable. `?d=phone|tablet|foldable` picks the form factor (both platforms). Links inside a device load the target screen in all of them.
 */
export default async function DuoPage({ params, searchParams }: { params: Promise<{ rest?: string[] }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { rest = [] } = await params;
  const query = await searchParams;
  const [route = "home", sub] = rest;
  const asked = Array.isArray(query[DEVICE_PARAM]) ? query[DEVICE_PARAM][0] : query[DEVICE_PARAM];
  const device: Device = isDevice(asked) ? asked : "phone";
  // /base thumbnails: `?p=ios|android&embed=1` shows ONE device, with no menu, caption or scaling (the iframe is the device).
  const only = Array.isArray(query.p) ? query.p[0] : query.p;
  const embed = query.embed === "1";
  const platforms = only === "ios" || only === "android" ? ([only] as const) : (["ios", "android"] as const);

  if (embed) {
    return (
      <div className="duo-stage">
        {platforms.map((p) => (
          <Phone key={p} platform={p} device={device} route={route} sub={sub} embed />
        ))}
      </div>
    );
  }

  return (
    <div className="duo-stage flex min-h-dvh items-start text-ink">
      <DuoNav device={device} />
      <div
        className={
          device !== "phone"
            ? "flex min-h-dvh min-w-0 flex-1 flex-col items-center justify-center gap-10 p-4"
            : "flex min-h-dvh min-w-0 flex-1 flex-wrap content-center items-start justify-center gap-x-14 gap-y-10 p-4"
        }
      >
        {platforms.map((p) => (
          <Phone key={p} platform={p} device={device} route={route} sub={sub} embed={false} />
        ))}
      </div>
    </div>
  );
}
