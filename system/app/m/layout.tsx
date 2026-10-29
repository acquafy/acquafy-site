// app/m/layout.tsx
//
// Mobile app (/m/ios/*, /m/android/*, and the two-phone stage /m/duo/*). The proxy gates it: login is public, the
// rest needs a session.
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./ios.css";
import "./android.css";

export const metadata: Metadata = { title: { default: "Acquafy Investor", template: "%s · Acquafy Investor" } };

/** `viewport-fit=cover` makes `env(safe-area-inset-*)` report the notch and home indicator on a real phone. */
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function MobileLayout({ children }: { children: ReactNode }) {
  return children;
}
