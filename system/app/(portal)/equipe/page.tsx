import { notFound } from "next/navigation";
import { context } from "@/lib/live/data";
import { Support } from "@/components/live/Support";
import type { Query } from "@/components/live/PortalPage";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const { staff } = await context();
  if (!staff) notFound();
  return (
    <>
      <h1>Fila de atendimento</h1>
      <p className="live-muted">
        Chamados de todas as contas. Respostas ficam visíveis para os membros da
        conta.
      </p>
      <Support queue query={await searchParams} />
    </>
  );
}
