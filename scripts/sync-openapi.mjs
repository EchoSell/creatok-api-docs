import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const appDirectory = process.argv[2];
if (!appDirectory) throw new Error("Usage: node scripts/sync-openapi.mjs /path/to/creatok-app");
const output = execFileSync(process.execPath, [
  "--import", "tsx", "-e",
  'const { OPEN_API_DOCUMENT } = require("./lib/api-platform/openapi-document.ts"); process.stdout.write(JSON.stringify(OPEN_API_DOCUMENT));',
], { cwd: resolve(appDirectory), encoding: "utf8", maxBuffer: 10 * 1024 * 1024 });
const spec = JSON.parse(output);
if (spec.openapi !== "3.1.0" || !spec.paths?.["/videos/generation"] || !spec.components?.schemas?.Job) {
  throw new Error("The app did not export a recognized CreatOK OpenAPI document");
}
const destination = fileURLToPath(new URL("../api-reference/openapi.json", import.meta.url));
writeFileSync(destination, JSON.stringify(spec, null, 2) + "\n");
console.log(`Exported OpenAPI ${spec.info.version} to ${destination}`);
