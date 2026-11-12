import { PortalPage, type Query } from "@/components/live/PortalPage";

export const metadata = { title: "Visão geral" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  return <PortalPage view="home" query={await searchParams} />;
}
