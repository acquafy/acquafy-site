import { notFound } from "next/navigation";
import { context } from "@/lib/live/data";
import { Support } from "@/components/live/Support";
import { PageHeader } from "@/components/live/PageHeader";
import type { Query } from "@/components/live/PortalPage";

export const metadata = { title: "Fila de atendimento" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const { staff } = await context();
  if (!staff) notFound();
  return (
    <>
      <PageHeader title="Fila de atendimento" subtitle="Chamados de todas as contas. Respostas ficam visíveis para os membros da conta." />
      <Support queue query={await searchParams} />
    </>
  );
}
