// components/base/previews/SharedPreviews.tsx
import { MobileHeaderActions } from "@/components/mobile/sections/MobileHeaderActions";
import type { PreviewMap } from "./types";

/** Organisms no screen claims: used by the header of several app screens. */
export const sharedPreviews: PreviewMap = {
  MobileHeaderActions: () => ({ node: <MobileHeaderActions />, tall: true }),
};
