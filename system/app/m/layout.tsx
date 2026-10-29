// app/m/layout.tsx
//
// Mobile app (/m/ios/*, /m/android/*). The proxy gates it: welcome and login are public, the rest needs a session.
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./ios.css";
import "./android.css";
import "./embed.css";

export const metadata: Metadata = { title: { default: "Acquafy Investor", template: "%s · Acquafy Investor" } };

/** `viewport-fit=cover` makes `env(safe-area-inset-*)` report the notch and home indicator on a real phone. */
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

/** Runs before paint: marks the page as embedded when it is the content of a phone in the two-phone stage (see embed.css). */
const EMBED_FLAG = `if (window.self !== window.top) document.documentElement.setAttribute("data-embedded", "");`;

export default function MobileLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: EMBED_FLAG }} />
      {children}
    </>
  );
}
