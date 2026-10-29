// app/m/duo/pages.tsx
//
// The page of every mobile screen, per platform, so the two-phone stage can render both without iframes. A new screen needs its
// two pages listed here (flow = no tab bar).
import type { ComponentType } from "react";
import AndroidLogin from "@/app/m/android/(flow)/login/page";
import AndroidCalendar from "@/app/m/android/(tabs)/calendario/page";
import AndroidContract from "@/app/m/android/(tabs)/contrato/page";
import AndroidDocuments from "@/app/m/android/(tabs)/documentos/page";
import AndroidFinance from "@/app/m/android/(tabs)/financeiro/page";
import AndroidHome from "@/app/m/android/(tabs)/home/page";
import AndroidProfile from "@/app/m/android/(tabs)/perfil/page";
import AndroidProfileSection from "@/app/m/android/(tabs)/perfil/[secao]/page";
import AndroidPurifiers from "@/app/m/android/(tabs)/purificadores/page";
import AndroidRequest from "@/app/m/android/(tabs)/solicitar/page";
import AndroidSupport from "@/app/m/android/(tabs)/suporte/page";
import IosLogin from "@/app/m/ios/(flow)/login/page";
import IosCalendar from "@/app/m/ios/(tabs)/calendario/page";
import IosContract from "@/app/m/ios/(tabs)/contrato/page";
import IosDocuments from "@/app/m/ios/(tabs)/documentos/page";
import IosFinance from "@/app/m/ios/(tabs)/financeiro/page";
import IosHome from "@/app/m/ios/(tabs)/home/page";
import IosProfile from "@/app/m/ios/(tabs)/perfil/page";
import IosProfileSection from "@/app/m/ios/(tabs)/perfil/[secao]/page";
import IosPurifiers from "@/app/m/ios/(tabs)/purificadores/page";
import IosRequest from "@/app/m/ios/(tabs)/solicitar/page";
import IosSupport from "@/app/m/ios/(tabs)/suporte/page";
import type { Platform } from "@/lib/mobile/platform";

type Screen = ComponentType;
type SectionScreen = ComponentType<{ params: Promise<{ secao: string }> }>;

export const PAGES: Record<Platform, { flow: Record<string, Screen>; tabs: Record<string, Screen>; section: SectionScreen }> = {
  ios: {
    flow: { login: IosLogin },
    tabs: {
      home: IosHome,
      purificadores: IosPurifiers,
      financeiro: IosFinance,
      documentos: IosDocuments,
      perfil: IosProfile,
      calendario: IosCalendar,
      contrato: IosContract,
      solicitar: IosRequest,
      suporte: IosSupport,
    },
    section: IosProfileSection,
  },
  android: {
    flow: { login: AndroidLogin },
    tabs: {
      home: AndroidHome,
      purificadores: AndroidPurifiers,
      financeiro: AndroidFinance,
      documentos: AndroidDocuments,
      perfil: AndroidProfile,
      calendario: AndroidCalendar,
      contrato: AndroidContract,
      solicitar: AndroidRequest,
      suporte: AndroidSupport,
    },
    section: AndroidProfileSection,
  },
};
