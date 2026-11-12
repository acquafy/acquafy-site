import { LoaderCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function Loading() {
  return (
    <Card>
      <p role="status" className="flex items-center justify-center gap-3 py-10 text-[15px] text-ink-soft">
        <LoaderCircle className="size-5 animate-spin text-brand" aria-hidden="true" />
        Carregando os registros da conta…
      </p>
    </Card>
  );
}
