// components/mobile/ios/IosFlowColumn.tsx
"use client";

import type { ReactNode } from "react";
import { MobileFlowSplit } from "@/components/mobile/sections/MobileFlowSplit";

/**
 * Entry screen (login). On a phone they render as they are; on a tablet or foldable they become the split layout of the
 * desktop login (brand on one side, form or highlights on the other), see MobileFlowSplit.
 */
export function IosFlowColumn({ children }: { children: ReactNode }) {
  return <MobileFlowSplit>{children}</MobileFlowSplit>;
}
