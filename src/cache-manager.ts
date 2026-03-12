import fs from "fs-extra";
import path from "path";
import { CACHE_DIR } from "./cli.js";

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
