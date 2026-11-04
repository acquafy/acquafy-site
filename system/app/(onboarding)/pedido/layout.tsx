import { buyNow, requireFeature } from "@/lib/flags";

// The flag is checked here, above loading.tsx: a notFound() thrown inside the streamed page would still answer 200.
export default async function OrderLayout({ children }: { children: React.ReactNode }) {
  await requireFeature(buyNow);
  return children;
}
