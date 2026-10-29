// app/m/android/(flow)/layout.tsx
import type { ReactNode } from "react";

/** Screens without the tab bar (login): the page fills the whole screen height. */
export default function AndroidFlowLayout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-full flex-col">{children}</div>;
}
