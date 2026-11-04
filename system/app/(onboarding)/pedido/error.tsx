"use client";
import { CloudOff, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="conteudo" className="mx-auto w-full max-w-3xl p-4 lg:p-6">
      <Card>
        <EmptyState
          icon={CloudOff}
          title="Não foi possível carregar os dados"
          description="Nenhuma informação de demonstração será exibida. Tente novamente em instantes."
          action={
            <Button onClick={reset}>
              <RotateCw className="size-4" aria-hidden="true" />
              Tentar novamente
            </Button>
          }
        />
      </Card>
    </main>
  );
}
