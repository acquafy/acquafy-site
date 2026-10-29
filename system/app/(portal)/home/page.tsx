// app/(portal)/home/page.tsx
import type { Metadata } from "next";
import { HomeHelp } from "@/components/sections/HomeHelp";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeQuickActions } from "@/components/sections/HomeQuickActions";
import { HomeRecentDocuments } from "@/components/sections/HomeRecentDocuments";
import { HomeToday } from "@/components/sections/HomeToday";

export const metadata: Metadata = { title: "Home" };

/** Home: shortcuts and what needs doing today. The numbers live in the Dashboard. */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeQuickActions />
      <div className="grid gap-4 @4xl:grid-cols-[1.15fr_1fr]">
        <HomeToday />
        <div className="grid items-start gap-4">
          <HomeRecentDocuments />
          <HomeHelp />
        </div>
      </div>
    </>
  );
}
