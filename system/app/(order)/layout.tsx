// app/(order)/layout.tsx
//
// One order's page (/pedidos/<id>) in the purchase-flow frame with the product on the left. It sits outside the
// (portal) group because that group's frame is a single column; the providers are the same.
import { PortalProviders } from "@/components/providers/PortalProviders";

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return <PortalProviders currency="USD">{children}</PortalProviders>;
}
