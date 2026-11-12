import { serverClient } from "@/lib/live/data";

/**
 * Public availability for the website's product pages (same origin): in stock or not, and the delivery time.
 * No unit counts. Cached briefly at the edge.
 */
export async function GET() {
  const db = await serverClient();
  const [rows, settings] = await Promise.all([db.rpc("stock_availability"), db.from("order_settings").select("made_to_order_weeks").single()]);
  if (rows.error || settings.error) return new Response("Stock unavailable", { status: 503 });
  return Response.json(
    { madeToOrderWeeks: settings.data.made_to_order_weeks, rows: rows.data },
    { headers: { "Cache-Control": "public, max-age=30, s-maxage=30, stale-while-revalidate=120" } },
  );
}
