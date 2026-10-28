// app/m/android/(flow)/bem-vindo/page.tsx
import type { Metadata } from "next";
import { MobileWelcome } from "@/components/mobile/sections/MobileWelcome";

export const metadata: Metadata = { title: "Bem-vindo" };

export default function AndroidWelcomePage() {
  return <MobileWelcome />;
}
