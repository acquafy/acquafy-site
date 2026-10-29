// components/base/previews/OpenDemo.tsx
"use client";

import { useState, type ReactNode } from "react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { Button } from "@/components/ui/Button";

/** For modals and sheets: the open state. App sheets start OPEN (they live inside the phone panel, so nothing to click); web modals are native dialogs that take over the page, so they start closed behind an "Abrir" button. */
export function OpenDemo({ label = "Abrir", app = false, children }: { label?: string; app?: boolean; children: (open: boolean, setOpen: (open: boolean) => void) => ReactNode }) {
  const [open, setOpen] = useState(app);
  return (
    <>
      {app ? (
        <MobileButton variant="secondary" onClick={() => setOpen(true)}>
          {label}
        </MobileButton>
      ) : (
        <Button variant="outline" onClick={() => setOpen(true)}>
          {label}
        </Button>
      )}
      {children(open, setOpen)}
    </>
  );
}
