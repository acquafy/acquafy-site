import { PortalPage, type Query } from "@/components/live/PortalPage";

export const metadata = { title: "Dashboard" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  return <PortalPage view="dashboard" query={await searchParams} />;
}
