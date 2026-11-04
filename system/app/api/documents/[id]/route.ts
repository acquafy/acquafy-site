import { context } from "@/lib/live/data";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { db } = await context();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id))
    return new Response("Arquivo não encontrado", { status: 404 });
  const { data, error } = await db
    .from("documents")
    .select("object_path,filename")
    .eq("id", id)
    .maybeSingle();
  if (error || !data)
    return new Response("Arquivo não encontrado", {
      status: 404,
      headers: { "Cache-Control": "private, no-store" },
    });
  const result = await db.storage
    .from("portal-documents")
    .createSignedUrl(data.object_path, 60, { download: data.filename });
  if (result.error)
    return new Response("Arquivo indisponível. Tente novamente.", {
      status: 503,
    });
  return new Response(null, {
    status: 303,
    headers: {
      Location: result.data.signedUrl,
      "Cache-Control": "private, no-store",
      "Referrer-Policy": "no-referrer",
    },
  });
}
