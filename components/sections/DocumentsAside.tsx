// components/sections/DocumentsAside.tsx
import { BookOpen, CalendarDays, FilePlus2, FileText, Headset, Receipt, ScrollText, ShieldCheck, Upload } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { ACCEPTED_EXTENSIONS, MAX_UPLOAD_BYTES, type DocCategory } from "@/config/documents-page";
import { formatBytes } from "@/lib/fileActions";
import { formatDate } from "@/lib/format";

type Props = {
  total: number;
  byCategory: Record<DocCategory, number>;
  mine: number;
  totalBytes: number;
  lastUpdate: string | null;
  onUpload: () => void;
};

const ICON = "size-5 text-brand";

/** Side column: library summary, upload call-to-action and the support shortcut. */
export function DocumentsAside({ total, byCategory, mine, totalBytes, lastUpdate, onUpload }: Props) {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <Card title="Resumo dos documentos">
        <DefinitionList
          rows={[
            { icon: <FileText className={ICON} aria-hidden="true" />, label: "Total de documentos", value: String(total) },
            { icon: <ScrollText className={ICON} aria-hidden="true" />, label: "Contratos", value: String(byCategory.contratos) },
            { icon: <Receipt className={ICON} aria-hidden="true" />, label: "Comprovantes", value: String(byCategory.comprovantes) },
            { icon: <BookOpen className={ICON} aria-hidden="true" />, label: "Manuais", value: String(byCategory.manuais) },
            { icon: <FilePlus2 className={ICON} aria-hidden="true" />, label: "Enviados por você", value: String(mine) },
            { icon: <CalendarDays className={ICON} aria-hidden="true" />, label: "Última atualização", value: lastUpdate ? formatDate(lastUpdate) : "—" },
          ]}
        />
        <p className="mt-2 text-[13px] text-ink-soft">Espaço utilizado: {formatBytes(totalBytes)}</p>
      </Card>

      <Card title="Enviar documento">
        <p className="text-[14.5px] leading-relaxed text-ink-soft">
          Tem um comprovante ou documento para guardar junto ao seu contrato? Envie aqui: aceitamos{" "}
          {ACCEPTED_EXTENSIONS.filter((e) => e !== "jpeg")
            .map((e) => e.toUpperCase())
            .join(", ")}{" "}
          de até {formatBytes(MAX_UPLOAD_BYTES)}.
        </p>
        <Button variant="outline" className="mt-4 w-full" onClick={onUpload}>
          <Upload className="size-5" aria-hidden="true" />
          Enviar documento
        </Button>
        <p className="mt-3 flex gap-2 rounded-lg bg-violet-soft p-3 text-[12.5px] leading-snug text-violet">
          <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Seus documentos são privados e ficam visíveis somente para você.
        </p>
      </Card>

      <Card title="Não encontrou algo?">
        <p className="text-[14.5px] leading-relaxed text-ink-soft">Se faltar algum documento do seu contrato, nossa equipe envia para você.</p>
        <ButtonLink href="/suporte" className="mt-4 w-full">
          <Headset className="size-5" aria-hidden="true" />
          Falar com o suporte
        </ButtonLink>
      </Card>
    </div>
  );
}
