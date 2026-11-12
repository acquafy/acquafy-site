import { PortalPage, type Query } from "@/components/live/PortalPage";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  return <PortalPage view="contrato" query={await searchParams} />;
}
