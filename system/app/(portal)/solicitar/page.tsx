import { PortalPage, type Query } from "@/components/live/PortalPage";

export const metadata = { title: "Solicitações" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  return <PortalPage view="solicitar" query={await searchParams} />;
}
