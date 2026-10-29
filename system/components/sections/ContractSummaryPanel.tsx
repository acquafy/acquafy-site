// components/sections/ContractSummaryPanel.tsx
import { Badge } from "@/components/ui/Badge";
import { DefinitionList, type DefinitionRow } from "@/components/ui/DefinitionList";
import { Money } from "@/components/ui/Money";
import { CONTRACT_NUMBER, COUNTERPARTY } from "@/config/contract-page";
import { contract } from "@/config/investor";
import { formatDate } from "@/lib/format";

type Props = {
  units: number;
  invested: number;
  installments: number;
  firstPayout: string;
  receivedCount: number;
};

/**"Resumo" tab: the commercial conditions in two label/value columns. */
export function ContractSummaryPanel({ units, invested, installments, firstPayout, receivedCount }: Props) {
  const left: DefinitionRow[] = [
    { label: "Número do contrato", value: CONTRACT_NUMBER },
    {
      label: "Situação",
      value: (
        <Badge tone="ok" dot>
          Ativo
        </Badge>
      ),
    },
    { label: "Contratada", value: COUNTERPARTY },
    { label: "Data de início", value: formatDate(contract.startDate) },
    { label: "Término", value: formatDate(contract.endDate) },
    { label: "Prazo", value: `${contract.termMonths} meses` },
    { label: "Próxima revisão", value: formatDate(contract.nextReview) },
  ];
  const right: DefinitionRow[] = [
    { label: "Unidades", value: `${units} Neo UP` },
    { label: "Investimento total", value: <Money value={invested} /> },
    { label: "Valor de cada parcela", value: <Money value={contract.installmentValue} /> },
    { label: "Parcelas (recebidas/total)", value: `${receivedCount}/${installments}` },
    { label: "Primeiro repasse", value: formatDate(firstPayout) },
    { label: "Participação no Lease", value: `${Math.round(contract.leaseShare * 100)}%` },
    { label: "Recompra opcional", value: `${Math.round(contract.buybackShare * 100)}% do valor investido` },
    { label: "Forma de pagamento", value: contract.paymentMethod },
  ];

  return (
    <div className="grid gap-x-10 @[820px]:grid-cols-2">
      <DefinitionList rows={left} />
      <DefinitionList rows={right} />
    </div>
  );
}
