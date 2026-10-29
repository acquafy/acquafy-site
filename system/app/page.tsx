// app/page.tsx
import { redirect } from "next/navigation";

/** The root opens the Base hub (screens, components, organisms); the portal itself starts at /home. */
export default function Home() {
  redirect("/base");
}
