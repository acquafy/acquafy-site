// components/providers/SidebarProvider.tsx
"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { SIDEBAR_COOKIE, type SidebarMode } from "@/lib/sidebar";

type SidebarContextValue = {
  collapsed: boolean;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextValue>({ collapsed: false, toggle: () => {} });

/** Shared by the top bar's toggle button and the sidebar itself. `initial` comes from the cookie read on the server. */
export function SidebarProvider({ initial, children }: { initial: SidebarMode; children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(initial === "collapsed");

  const toggle = useCallback(() => {
    setCollapsed((current) => {
      const next = !current;
      document.cookie = `${SIDEBAR_COOKIE}=${next ? "collapsed" : "expanded"}; path=/; max-age=31536000; samesite=lax`;
      return next;
    });
  }, []);

  const value = useMemo(() => ({ collapsed, toggle }), [collapsed, toggle]);
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar(): SidebarContextValue {
  return useContext(SidebarContext);
}
