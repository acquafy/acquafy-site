import { readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const directories = ["components/sections", "components/mobile/sections", "components/ui", "components/mobile/ui", "components/layout", "components/mobile/ios", "components/mobile/android"];
const files = Object.fromEntries(directories.map((dir) => [dir, readdirSync(join(root, dir), { withFileTypes: true }).filter((e) => e.isFile()).map((e) => e.name).sort()]));
const mobileScreens = [];
for (const platform of ["ios", "android"]) {
  for (const group of ["(tabs)", "(flow)"]) {
    const base = `app/m/${platform}/${group}`;
    for (const name of readdirSync(join(root, base), { recursive: true })) {
      if (name === "page.tsx" || name.endsWith("/page.tsx")) mobileScreens.push(`${base}/${name}`);
    }
  }
}
const references = readdirSync(root).filter((name) => /\.(jpe?g|png)$/i.test(name)).sort();
writeFileSync(join(root, "config/base-inventory.json"), JSON.stringify({ files, mobileScreens: mobileScreens.sort(), references }, null, 2) + "\n");
