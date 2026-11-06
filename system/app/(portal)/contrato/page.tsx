import { PortalPage, type Query } from "@/components/live/PortalPage";

export const metadata = { title: "Contratos" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  return <PortalPage view="contrato" query={await searchParams} />;
}
