"use client";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { LogoutDialog } from "@/components/layout/LogoutDialog";
import { Button } from "@/components/ui/Button";

/** "Sair da conta" on the profile screen: opens the same confirmation as the side menu. */
export function SignOutButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="button" variant="outline" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        <LogOut className="size-4" aria-hidden="true" />
        Sair da conta
      </Button>
      <LogoutDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
