"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function SidebarReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <aside
      ref={ref}
      className={`${className ?? ""} transition-all duration-500 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"}`}
    >
      {children}
    </aside>
  );
}
