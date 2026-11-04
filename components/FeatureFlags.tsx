"use client";
import { createContext, useContext, type ReactNode } from "react";
import type { FeatureValues } from "@/lib/flags";

// Flags are evaluated on the server (lib/flags.ts) by the root layout and handed to client components here, so the
// first paint already matches the flag (no flash of a button that is about to disappear).
const OFF: FeatureValues = { bePartner: false, buyNow: false, investorRegistration: false };
const FeatureFlagsContext = createContext<FeatureValues>(OFF);

export function FeatureFlagsProvider({ value, children }: { value: FeatureValues; children: ReactNode }) {
  return <FeatureFlagsContext.Provider value={value}>{children}</FeatureFlagsContext.Provider>;
}

export function useFeature(name: keyof FeatureValues): boolean {
  return useContext(FeatureFlagsContext)[name];
}

/** Renders `children` only while the feature is on (or `otherwise` while it is off). */
export function Feature({ name, children, otherwise = null }: { name: keyof FeatureValues; children: ReactNode; otherwise?: ReactNode }) {
  return useFeature(name) ? <>{children}</> : <>{otherwise}</>;
}
