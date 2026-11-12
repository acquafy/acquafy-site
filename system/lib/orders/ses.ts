import "server-only";
import { createHash, createHmac } from "node:crypto";

// Amazon SES (API v2, SendEmail) for the order e-mails, signed with AWS Signature Version 4 so no AWS SDK is needed.
// Settings: SES_REGION (e.g. us-east-1), SES_ACCESS_KEY_ID and SES_SECRET_ACCESS_KEY of an IAM user that may only
// send from the verified identity (the AWS_* names are reserved on Vercel).

export function sesConfigured() {
  return !!process.env.SES_REGION && !!process.env.SES_ACCESS_KEY_ID && !!process.env.SES_SECRET_ACCESS_KEY;
}

const sha256 = (data: string) => createHash("sha256").update(data, "utf8").digest("hex");
const hmac = (key: string | Buffer, data: string) => createHmac("sha256", key).update(data, "utf8").digest();

/** Signs a JSON request with SigV4 and returns the headers to send (exported for tests). */
export function signRequest(input: { method: string; host: string; path: string; body: string; region: string; service: string; accessKeyId: string; secretAccessKey: string; now?: Date }) {
  const date = (input.now ?? new Date()).toISOString().replace(/[:-]|\.\d{3}/g, ""); // 20261112T231500Z
  const day = date.slice(0, 8);
  const payloadHash = sha256(input.body);
  const headers: Record<string, string> = { "content-type": "application/json", host: input.host, "x-amz-content-sha256": payloadHash, "x-amz-date": date };
  const signedHeaders = Object.keys(headers).sort().join(";");
  const canonicalHeaders = Object.keys(headers)
    .sort()
    .map((k) => `${k}:${headers[k]}\n`)
    .join("");
  const canonical = [input.method, input.path, "", canonicalHeaders, signedHeaders, payloadHash].join("\n");
  const scope = `${day}/${input.region}/${input.service}/aws4_request`;
  const toSign = ["AWS4-HMAC-SHA256", date, scope, sha256(canonical)].join("\n");
  const key = hmac(hmac(hmac(hmac(`AWS4${input.secretAccessKey}`, day), input.region), input.service), "aws4_request");
  const signature = createHmac("sha256", key).update(toSign, "utf8").digest("hex");
  return <Record<string, string>>{
    ...headers,
    authorization: `AWS4-HMAC-SHA256 Credential=${input.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
  };
}

/** Sends one e-mail; returns the SES message id, or throws "SES <status>: <message>". */
export async function sendSesEmail(mail: { from: string; to: string; subject: string; html: string; text: string }) {
  const region = process.env.SES_REGION!;
  const host = `email.${region}.amazonaws.com`;
  const path = "/v2/email/outbound-emails";
  const body = JSON.stringify({
    FromEmailAddress: mail.from,
    Destination: { ToAddresses: [mail.to] },
    Content: {
      Simple: {
        Subject: { Data: mail.subject, Charset: "UTF-8" },
        Body: { Html: { Data: mail.html, Charset: "UTF-8" }, Text: { Data: mail.text, Charset: "UTF-8" } },
      },
    },
  });
  const headers = signRequest({ method: "POST", host, path, body, region, service: "ses", accessKeyId: process.env.SES_ACCESS_KEY_ID!, secretAccessKey: process.env.SES_SECRET_ACCESS_KEY! });
  // fetch sets Host itself.
  const sent = Object.fromEntries(Object.entries(headers).filter(([k]) => k !== "host"));
  const res = await fetch(`https://${host}${path}`, { method: "POST", headers: sent, body, signal: AbortSignal.timeout(10000) });
  const result = (await res.json().catch(() => ({}))) as { MessageId?: string; message?: string; Message?: string };
  if (!res.ok) throw Error(`SES ${res.status}: ${(result.message ?? result.Message ?? "error").slice(0, 200)}`);
  return result.MessageId ?? null;
}
