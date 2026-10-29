// components/base/previews/WelcomePreviews.tsx
import { MobileWelcome } from "@/components/mobile/sections/MobileWelcome";
import { MobileWelcomeCarousel } from "@/components/mobile/sections/MobileWelcomeCarousel";
import type { PreviewMap } from "./types";

export const welcomePreviews: PreviewMap = {
  MobileWelcome: () => ({ node: <MobileWelcome />, tall: true }),
  MobileWelcomeCarousel: () => ({ node: <MobileWelcomeCarousel /> }),
};
