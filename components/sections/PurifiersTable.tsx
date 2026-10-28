// components/sections/PurifiersTable.tsx
"use client";

import Image from "next/image";
import { Copy, ExternalLink, Eye, Wrench } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { StatusBadge } from "@/components/ui/Badge";
import { Menu } from "@/components/ui/Menu";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import { locationLabel, mapsUrl } from "@/lib/portal/purifiers";
import type { Purifier } from "@/config/investor";

type Props = {
  rows: Purifier[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onMaintenance: (p: Purifier) => void;
};

export function PurifiersTable({ rows, selectedId, onSelect, onMaintenance }: Props) {
  const toast = useToast();

  const copySerial = async (serial: string) => {
    try {
      await navigator.clipboard.writeText(serial);
      toast({ title: "Número de série copiado", description: serial });
    } catch {
      toast({ title: "Não foi possível copiar", description: serial, tone: "error" });
    }
  };

  return (
    <div className="@container">
      <table className="w-full text-left text-[14.5px]">
        <caption className="sr-only">Purificadores do investidor</caption>
        <thead>
          <tr className="border-b border-line text-[13px] font-bold text-ink">
            <th scope="col" className="w-10 px-2 py-3">
              #
            </th>
            <th scope="col" className="hidden w-14 px-2 py-3 @2xl:table-cell">
              <span className="sr-only">Imagem</span>
            </th>
            <th scope="col" className="px-2 py-3">
              Modelo
            </th>
            <th scope="col" className="px-2 py-3">
              Número de Série
            </th>
            <th scope="col" className="px-2 py-3">
              Situação
            </th>
            <th scope="col" className="hidden px-2 py-3 @xl:table-cell">
              Ativação
            </th>
            <th scope="col" className="hidden px-2 py-3 @lg:table-cell">
              Localização
            </th>
            <th scope="col" className="w-14 px-2 py-3 text-center">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => {
            const selected = selectedId === p.id;
            return (
              <tr
                key={p.id}
                aria-selected={selected}
                onClick={() => onSelect(p.id)}
                className={cn("cursor-pointer border-b border-line/70 transition-colors [&_td]:whitespace-nowrap", selected ? "bg-brand-soft/60" : "hover:bg-canvas/60")}
              >
                <td className="tabular px-2 py-1.5">{p.id}</td>
                <td className="hidden px-2 py-1.5 @2xl:table-cell">
                  <Image src="/brand/neo-up-thumb.webp" alt="" width={112} height={143} sizes="32px" className="h-10 w-auto" />
                </td>
                <td className="px-2 py-1.5 font-medium">{p.model}</td>
                <td className="px-2 py-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(p.id);
                    }}
                    className="tabular rounded font-medium text-brand hover:underline focus-visible:outline-2 focus-visible:outline-brand"
                  >
                    {p.serial}
                  </button>
                </td>
                <td className="px-2 py-1.5">
                  <StatusBadge kind={p.status} />
                </td>
                <td className="tabular hidden px-2 py-1.5 @xl:table-cell">{p.activationDate ? formatDate(p.activationDate) : "—"}</td>
                <td className="hidden px-2 py-1.5 @lg:table-cell">{locationLabel(p)}</td>
                <td className="px-2 py-1.5 text-center" onClick={(e) => e.stopPropagation()}>
                  <Menu
                    label={`Ações do purificador ${p.serial}`}
                    items={[
                      { label: "Ver detalhes", icon: Eye, onSelect: () => onSelect(p.id) },
                      { label: "Abrir no mapa", icon: ExternalLink, href: mapsUrl(p), external: true },
                      { label: "Copiar número de série", icon: Copy, onSelect: () => copySerial(p.serial) },
                      { label: "Solicitar manutenção", icon: Wrench, separatorBefore: true, onSelect: () => onMaintenance(p), disabled: p.status === "available" },
                    ]}
                  />
                </td>
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={8} className="px-2 py-10 text-center text-ink-soft">
                Nenhum purificador encontrado com esses filtros.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
