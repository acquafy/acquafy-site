// Watches public/icon-audit/marks.json (written by the "Sincronizar marcações" button on /icones)
// and re-runs the icon build, so ticking MANTER ORIGINAL restores the originals in public/figma-assets.
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const root = path.resolve(__dirname, "..", "..");
const marks = path.join(root, "public", "icon-audit", "marks.json");
const py = process.platform === "win32" ? "python" : "python3";
let timer = null;
let running = false;
let again = false;

function build() {
  if (running) { again = true; return; }
  running = true;
  const t0 = Date.now();
  const p = spawn(py, ["-I", path.join(__dirname, "build2.py")], { cwd: __dirname, stdio: "inherit" });
  p.on("exit", (code) => {
    running = false;
    console.log(`[icons] build ${code === 0 ? "ok" : "FAILED (" + code + ")"} in ${Date.now() - t0}ms`);
    if (again) { again = false; build(); }
  });
}

fs.mkdirSync(path.dirname(marks), { recursive: true });
if (!fs.existsSync(marks)) fs.writeFileSync(marks, "{}");
let last = fs.readFileSync(marks, "utf8");
console.log("[icons] watching", marks);
build();

// poll the content: fs.watch is unreliable for files rewritten by another process on Windows
setInterval(() => {
  let cur;
  try { cur = fs.readFileSync(marks, "utf8"); } catch { return; }
  // ignore the timestamp-only rewrites the page does on every sync
  const strip = (s) => s.replace(/"updatedAt":\s*"[^"]*",?/, "");
  if (strip(cur) === strip(last)) { last = cur; return; }
  last = cur;
  clearTimeout(timer);
  timer = setTimeout(build, 300);
}, 700);
