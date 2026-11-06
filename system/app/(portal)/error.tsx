"use client";
import { CloudOff, RotateCw } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <Card>
      <EmptyState
        icon={CloudOff}
        title="Não foi possível carregar esta tela"
        description="Os dados não foram alterados. Tente novamente; se o problema continuar, abra um chamado ou volte ao início."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={reset}>
              <RotateCw className="size-4" aria-hidden="true" />
              Tentar novamente
            </Button>
            <ButtonLink href="/" variant="outline">
              Ir para o início
            </ButtonLink>
          </div>
        }
      />
    </Card>
  );
}
