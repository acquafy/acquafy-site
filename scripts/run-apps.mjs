import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";

const root = fileURLToPath(new URL("../", import.meta.url));
const mode = process.argv[2];
if (!["dev", "start"].includes(mode)) throw new Error("Expected dev or start");
nextEnv.loadEnvConfig(root, mode === "dev");
const sitePort = process.env.PORT ?? "3000";
const portalPort = process.env.PORTAL_PORT ?? "3001";
if (sitePort === portalPort) throw new Error("PORT and PORTAL_PORT must differ");
const children = [];
let stopping = false;

function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill("SIGTERM");
  process.exitCode = code;
}

for (const [directory, port, host] of [["system/", portalPort, "127.0.0.1"], ["", sitePort, "0.0.0.0"]]) {
  const cwd = fileURLToPath(new URL(`../${directory}`, import.meta.url));
  const require = createRequire(`${cwd}/package.json`);
  const env = { ...process.env, PORTAL_ORIGIN: `http://127.0.0.1:${portalPort}` };
  // Each Next process must still load its own workspace's .env.local.
  delete env.__NEXT_PROCESSED_ENV;
  const child = spawn(process.execPath, [require.resolve("next/dist/bin/next"), mode, "--port", port, "--hostname", host], {
    cwd, stdio: "inherit", env,
  });
  children.push(child);
  child.on("error", (error) => { console.error(error.message); stop(1); });
  child.on("exit", (code) => { if (!stopping) stop(code || 1); });
}
process.on("SIGINT", () => stop());
process.on("SIGTERM", () => stop());
