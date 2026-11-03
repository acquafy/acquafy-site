"use client";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export function LoginAccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Solicitar acesso" description="O portal é exclusivo para usuários internos e parceiros autorizados." footer={<Button onClick={onClose}>Voltar ao login</Button>}>
      <p className="text-[14.5px] text-ink-soft">Entre em contato com seu responsável na Acquafy para solicitar uma conta. O cadastro e a liberação são realizados pela equipe.</p>
    </Modal>
  );
}
