// components/layout/LogoutDialog.tsx
"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/providers/ToastProvider";
import { endSession } from "@/lib/auth";

/** Confirmation before ending the session; used by the sidebar and the user menu. */
export function LogoutDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const toast = useToast();

  const confirm = () => {
    endSession();
    onClose();
    toast({ title: "Sessão encerrada", description: "Até logo! Você saiu do Portal do Investidor.", tone: "info" });
    router.replace("/login");
    router.refresh();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title="Sair da conta?"
      description="Você precisará entrar novamente para acessar o portal."
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={confirm}>
            <LogOut className="size-4" aria-hidden="true" />
            Sair
          </Button>
        </>
      }
    >
      <p className="text-[14.5px] text-ink-soft">Seus dados continuam seguros. Suas preferências ficam salvas neste navegador.</p>
    </Modal>
  );
}
