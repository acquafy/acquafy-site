import { serverClient } from "@/lib/live/data";
import { customerDestination } from "@/lib/orders/destination";
import { publicOrigin } from "@/lib/enrollment/server";
export async function GET(request: Request) {
  const u = new URL(request.url),
    code = u.searchParams.get("code");
  if (code) {
    const db = await serverClient();
    const { error } = await db.auth.exchangeCodeForSession(code);
    if (!error)
      return Response.redirect(
        publicOrigin() +
          "/app" +
          customerDestination(u.searchParams.get("next")),
      );
  }
  return Response.redirect(publicOrigin() + "/app/login?confirmation=retry");
}
