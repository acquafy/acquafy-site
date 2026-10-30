import { NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Dev-only: lets the /icones review page save its marks to a file in the project, so they can be read without copy/paste.
const FILE = path.join(process.cwd(), "public", "icon-audit", "marks.json");

const notAvailable = () => NextResponse.json({ error: "not available" }, { status: 404 });

export async function GET() {
  if (process.env.NODE_ENV === "production") return notAvailable();
  try {
    return NextResponse.json(JSON.parse(await readFile(FILE, "utf8")));
  } catch {
    return NextResponse.json({});
  }
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") return notAvailable();
  const body = await req.json();
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(body, null, 2), "utf8");
  return NextResponse.json({ ok: true });
}
