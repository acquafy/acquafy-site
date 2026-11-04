"use client";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export function LoginForgotModal({ open, onClose }: { open: boolean; initialEmail: string; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Recuperar acesso" footer={<Button onClick={onClose}>Voltar ao login</Button>}>
      <p className="text-[14.5px] text-ink-soft">Solicite a redefinição de senha ao responsável pela sua conta na Acquafy.</p>
    </Modal>
  );
}
