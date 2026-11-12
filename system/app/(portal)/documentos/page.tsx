import { PortalPage, type Query } from "@/components/live/PortalPage";

export const metadata = { title: "Documentos" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  return <PortalPage view="documentos" query={await searchParams} />;
}
