import { PortalPage, type Query } from "@/components/live/PortalPage";

export const metadata = { title: "Extrato" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  return <PortalPage view="extrato" query={await searchParams} />;
}
