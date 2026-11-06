import { PortalPage, type Query } from "@/components/live/PortalPage";

export const metadata = { title: "Minha conta" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  return <PortalPage view="perfil" query={await searchParams} />;
}
