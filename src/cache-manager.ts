import fs from "fs-extra";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CACHE_DIR = path.join(__dirname, "../.css-cache"); // Remonte d'un cran si on est dans dist/

export async function clean_cache(): Promise<void> {
  if (await fs.pathExists(CACHE_DIR)) {
    const files = await fs.readdir(CACHE_DIR);
    for (const file of files) {
      await fs.remove(path.join(CACHE_DIR, file));
    }
    console.log("[octomark] 🧹 Cache emptied (files removed).");
  } else {
    console.log("[octomark] ℹ️  Cache folder doesn't exist.");
  }
}
