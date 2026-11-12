import { PortalPage, type Query } from "@/components/live/PortalPage";

export const metadata = { title: "Calendário de repasses" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  return <PortalPage view="calendario" query={await searchParams} />;
}
