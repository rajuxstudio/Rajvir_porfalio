/**
 * Post-build steps for GitHub Pages.
 *
 * 1. 404.html — Pages has no server-side rewrite, so a deep link like
 *    /Rajvir_porfalio/design is a real 404. Serving a copy of index.html as
 *    404.html lets the SPA boot and React Router resolve the route.
 * 2. .nojekyll — belt and braces. It is also in /public (and therefore copied
 *    by Vite), but writing it here guarantees it exists even if public/ is
 *    ever cleared. Without it Pages runs Jekyll, which strips paths that
 *    begin with an underscore.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(here, "..", "dist");

if (!fs.existsSync(path.join(dist, "index.html"))) {
  console.error("postbuild: dist/index.html not found — did the build run?");
  process.exit(1);
}

fs.copyFileSync(path.join(dist, "index.html"), path.join(dist, "404.html"));
fs.writeFileSync(path.join(dist, ".nojekyll"), "");

console.log("postbuild: wrote dist/404.html and dist/.nojekyll");
