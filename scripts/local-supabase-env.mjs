import { execFileSync } from "node:child_process";
import { writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const target = fileURLToPath(new URL("../system/.env.local", import.meta.url));
if (existsSync(target)) throw new Error("system/.env.local already exists; preserve it and configure SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY manually.");
const output = execFileSync("supabase", ["status", "--output", "env"], { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] });
const values = Object.fromEntries(output.split("\n").flatMap((line) => {
  const match = /^([A-Z_]+)="(.*)"$/.exec(line);
  return match ? [[match[1], match[2]]] : [];
}));
const key = values.PUBLISHABLE_KEY || values.ANON_KEY;
if (!values.API_URL || !key) throw new Error("Local Supabase URL or publishable key unavailable");
writeFileSync(target, `SUPABASE_URL=${values.API_URL}\nSUPABASE_PUBLISHABLE_KEY=${key}\n`, { mode: 0o600 });
console.log("Configured system/.env.local with local Supabase. No administrator key was copied.");
