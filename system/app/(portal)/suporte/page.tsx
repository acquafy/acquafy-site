import { PortalPage, type Query } from "@/components/live/PortalPage";

export const metadata = { title: "Suporte" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  return <PortalPage view="suporte" query={await searchParams} />;
}
