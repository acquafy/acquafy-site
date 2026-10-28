// components/base/BaseComponentDemos.tsx
"use client";

import { Bell, Download, FileText, Pencil, Trash2, Wallet } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useToast } from "@/components/providers/ToastProvider";
import { Accordion } from "@/components/ui/Accordion";
import { Avatar } from "@/components/ui/Avatar";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { BarChart } from "@/components/ui/BarChart";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { EmptyState } from "@/components/ui/EmptyState";
import { Checkbox, SearchInput, Select, Switch, TextField } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { IconTile, KpiCard } from "@/components/ui/KpiCard";
import { Menu } from "@/components/ui/Menu";
import { Modal } from "@/components/ui/Modal";
import { Money } from "@/components/ui/Money";
import { Pagination } from "@/components/ui/Pagination";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PurifierIcon } from "@/components/ui/PurifierIcon";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Stepper } from "@/components/ui/Stepper";
import { Tabs } from "@/components/ui/Tabs";

function Demo({ name, file, children }: { name: string; file: string; children: ReactNode }) {
  return (
    <Card title={name} container>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
      <p className="mt-4 border-t border-line pt-3 text-[12.5px] text-ink-mute">{file}</p>
    </Card>
  );
}

const TABS = [
  { id: "a", label: "Resumo" },
  { id: "b", label: "Detalhes", count: 3 },
  { id: "c", label: "Histórico" },
] as const;

const STEPS = [
  { id: "1", label: "Quantidade" },
  { id: "2", label: "Pagamento" },
  { id: "3", label: "Revisão" },
];

/** Live specimens of the web atoms/molecules (components/ui), so they can be reviewed side by side in Dia and Noite. */
export function BaseComponentDemos() {
  const toast = useToast();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("a");
  const [on, setOn] = useState(true);
  const [checked, setChecked] = useState(true);
  const [qty, setQty] = useState(5);
  const [page, setPage] = useState(2);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  return (
    <div className="grid gap-4 @container md:grid-cols-2">
      <Demo name="Button" file="components/ui/Button.tsx">
        <Button onClick={() => toast({ title: "Botão primário", tone: "success" })}>Primário</Button>
        <Button variant="outline">Contorno</Button>
        <Button variant="soft">Suave</Button>
        <Button variant="ghost">Fantasma</Button>
        <Button variant="danger">Perigo</Button>
        <Button size="sm">Pequeno</Button>
        <Button loading>Carregando</Button>
      </Demo>

      <Demo name="IconButton · Menu" file="components/ui/IconButton.tsx · Menu.tsx">
        <IconButton icon={Bell} label="Notificações" bordered />
        <IconButton icon={Download} label="Baixar" tone="muted" bordered />
        <IconButton icon={Trash2} label="Excluir" tone="danger" bordered />
        <Menu
          label="Ações"
          items={[
            { label: "Editar", icon: Pencil, onSelect: () => toast({ title: "Editar", tone: "info" }) },
            { label: "Baixar PDF", icon: FileText, onSelect: () => toast({ title: "Download iniciado", tone: "success" }) },
            { label: "Excluir", icon: Trash2, tone: "danger", separatorBefore: true, onSelect: () => toast({ title: "Excluído", tone: "info" }) },
          ]}
        />
      </Demo>

      <Demo name="Badge · StatusBadge" file="components/ui/Badge.tsx">
        <Badge tone="ok" dot>
          Ok
        </Badge>
        <Badge tone="warn">Atenção</Badge>
        <Badge tone="brand">Info</Badge>
        <Badge tone="violet">Novo</Badge>
        <Badge tone="danger">Erro</Badge>
        <Badge>Neutro</Badge>
        <StatusBadge kind="received" />
        <StatusBadge kind="pending" />
        <StatusBadge kind="next" />
        <StatusBadge kind="operation" />
        <StatusBadge kind="maintenance" />
      </Demo>

      <Demo name="KpiCard · IconTile" file="components/ui/KpiCard.tsx">
        <div className="grid w-full gap-3 @sm:grid-cols-2">
          <KpiCard icon={Wallet} tone="blue" label="Saldo do mês" value={<Money value={2450} />} caption="Ver extrato" captionHref="/extrato" />
          <KpiCard icon={PurifierIcon} tone="green" label="Em operação" value="12" caption="purificadores" />
        </div>
        <IconTile icon={Wallet} tone="violet" className="size-12" />
        <IconTile icon={Bell} tone="orange" className="size-12" />
        <IconTile icon={FileText} tone="pink" className="size-12" />
      </Demo>

      <Demo name="Tabs" file="components/ui/Tabs.tsx">
        <div className="w-full space-y-3">
          <Tabs items={[...TABS]} value={tab} onChange={setTab} label="Exemplo (pílula)" idPrefix="demo-pill" />
          <Tabs items={[...TABS]} value={tab} onChange={setTab} label="Exemplo (segmentado)" idPrefix="demo-seg" variant="segment" />
        </div>
      </Demo>

      <Demo name="Campos" file="components/ui/Field.tsx">
        <div className="grid w-full gap-3 @sm:grid-cols-2">
          <TextField label="Nome" placeholder="Seu nome" />
          <TextField label="E-mail" defaultValue="invalido" error="Informe um e-mail válido." />
          <Select
            label="Moeda"
            options={[
              { value: "USD", label: "USD" },
              { value: "BRL", label: "BRL" },
            ]}
          />
          <SearchInput label="Buscar" placeholder="Buscar…" />
        </div>
        <Switch checked={on} onChange={setOn} label="Receber avisos" />
        <Checkbox label="Li e aceito os termos" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      </Demo>

      <Demo name="QuantityStepper · Stepper" file="components/ui/QuantityStepper.tsx · Stepper.tsx">
        <div className="w-full space-y-4">
          <QuantityStepper label="Purificadores" value={qty} onChange={setQty} min={1} max={50} presets={[5, 10, 20]} />
          <Stepper steps={STEPS} current={step} onSelect={setStep} label="Solicitação" />
        </div>
      </Demo>

      <Demo name="ProgressBar · BarChart · DefinitionList" file="components/ui/ProgressBar.tsx · BarChart.tsx · DefinitionList.tsx">
        <div className="w-full space-y-4">
          <ProgressBar value={64} label="Contrato decorrido" />
          <BarChart
            ariaLabel="Repasses (exemplo)"
            max={3000}
            ticks={[0, 1000, 2000, 3000]}
            height={120}
            bars={[
              { label: "Jul", value: 1800, fill: "var(--color-brand)" },
              { label: "Ago", value: 2100, fill: "var(--color-brand)" },
              { label: "Set", value: 2450, fill: "var(--color-violet)" },
            ]}
          />
          <DefinitionList
            rows={[
              { label: "Modelo", value: "Neo UP" },
              { label: "Status", value: <StatusBadge kind="operation" /> },
            ]}
          />
        </div>
      </Demo>

      <Demo name="Pagination · Avatar · Accordion" file="components/ui/Pagination.tsx · Avatar.tsx · Accordion.tsx">
        <div className="w-full space-y-4">
          <Pagination page={page} pages={5} onChange={setPage} summary="Mostrando 11–20 de 48" />
          <Avatar name="André Valente" />
          <Accordion items={[{ id: "1", question: "Quando recebo o repasse?", answer: "Todo dia 10 do mês seguinte." }]} />
        </div>
      </Demo>

      <Demo name="Modal · EmptyState" file="components/ui/Modal.tsx · EmptyState.tsx">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Abrir modal
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Exemplo de modal"
          description="Dialog nativo com foco preso e fechamento por Esc."
          footer={<Button onClick={() => setOpen(false)}>Entendi</Button>}
        >
          <p className="text-[15px] text-ink-soft">Conteúdo do modal.</p>
        </Modal>
        <div className="w-full">
          <EmptyState icon={FileText} title="Nada por aqui" description="Quando houver itens, eles aparecem nesta lista." />
        </div>
      </Demo>
    </div>
  );
}
