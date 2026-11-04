import { context } from "@/lib/live/data";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { db } = await context();
  const { id } = await params;
  if (!/^[a-f0-9-]{36}$/i.test(id))
    return new Response("Não encontrado", { status: 404 });
  const { data, error } = await db
    .from("agreement_acceptances")
    .select(
      "agreement_text,commercial_terms,signer_name,accepted_at,evidence_hash,user_id",
    )
    .eq("enrollment_id", id)
    .maybeSingle();
  if (error || !data) return new Response("Não encontrado", { status: 404 });
  const body = [
    data.agreement_text,
    "",
    "QUADRO COMERCIAL",
    JSON.stringify(data.commercial_terms, null, 2),
    "",
    "EVIDÊNCIA DO ACEITE",
    `Representante: ${data.signer_name}`,
    `Identidade autenticada: ${data.user_id}`,
    `Registrado em: ${data.accepted_at}`,
    `SHA-256 do texto e quadro comercial: ${data.evidence_hash}`,
  ].join("\n");
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="acordo-${id}.txt"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
