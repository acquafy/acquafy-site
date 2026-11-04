import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
const key = () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY)
    throw new Error("Activation unavailable");
  return process.env.SUPABASE_SERVICE_ROLE_KEY;
};
export function activationProof(user: string, enrollment: string) {
  const body = Buffer.from(
    JSON.stringify({ user, enrollment, expires: Date.now() + 900000 }),
  ).toString("base64url");
  return (
    body + "." + createHmac("sha256", key()).update(body).digest("base64url")
  );
}
export function validActivationProof(
  value: string | undefined,
  user: string,
  enrollment: string,
) {
  if (!value) return false;
  try {
    const [body, signature] = value.split(".");
    const actual = Buffer.from(signature ?? "", "base64url"),
      expected = createHmac("sha256", key()).update(body).digest();
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected))
      return false;
    const p = JSON.parse(Buffer.from(body, "base64url").toString());
    return (
      p.user === user &&
      p.enrollment === enrollment &&
      typeof p.expires === "number" &&
      p.expires > Date.now()
    );
  } catch {
    return false;
  }
}
