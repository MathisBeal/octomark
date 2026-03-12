import fs from "fs-extra";
import githubMarkdownCss from "generate-github-markdown-css";
import path from "path";
import { CACHE_DIR } from "./cli.js";

/**
 * Makes sure the cache directory exists. If it doesn't exist, it will be created.
 */
async function ensure_cache_dir_exist() {
  await fs.ensureDir(CACHE_DIR);
}

/**
 * Checks if a cached CSS file for the specified theme exists and returns its path if it does.
 * If the file does not exist, it returns null.
 *
 * @param theme The name of the GitHub theme for which to check the cached CSS file.
 * @returns The path to the cached CSS file if it exists, otherwise null.
 */
async function cached_css(theme: string): Promise<string | null> {
  const cssPath = path.join(CACHE_DIR, `github-${theme}.css`);
  if (await fs.pathExists(cssPath)) {
    return cssPath;
  }
  return null;
}

/**
 * Checks if a cached CSS file is older than 24 hours.
 *
 * @param path The path to the cached CSS file that needs to be checked for staleness.
 * @returns True if the cached CSS file is older than 24 hours, otherwise false.
 */
async function cached_css_is_old(path: string): Promise<boolean> {
  return Date.now() - (await fs.stat(path)).mtimeMs > 86400000;
}

/**
 * Saves the CSS content for a specific GitHub theme in the cache.
 *
 * @param theme The name of the GitHub theme for which to save the CSS content in the cache.
 * @param css The CSS content to be saved in the cache.
 */
async function save_css_to_cache(theme: string, css: string): Promise<void> {
  const cssPath = path.join(CACHE_DIR, `github-${theme}.css`);
  await fs.writeFile(cssPath, css);
}

/**
 * Fetches the CSS for a specific GitHub theme and saves it in the cache. If the CSS for the
 * specified theme is successfully fetched and saved, the function returns true. If there is an
 * error during the fetching or saving process, it logs the error and returns false.
 *
 * @param theme The name of the GitHub theme for which to fetch and update the CSS in the cache.
 * @returns A boolean indicating whether the CSS for the specified theme was successfully fetched and saved in the cache.
 */
async function update_theme(theme: string): Promise<boolean> {
  console.log(`[octomark] Updating styles for "${theme}"...`);
  try {
    const css = (await githubMarkdownCss({
      light: theme,
      dark: theme,
      preserveVariables: true,
      useFixture: true,
    })) as string;

    await save_css_to_cache(theme, css);
    return true;
  } catch (error) {
    console.error(`Error fetching CSS for theme "${theme}":`, error);
    return false;
  }
}

export async function get_css(
  theme: string,
  force: boolean = false,
): Promise<string> {
  await ensure_cache_dir_exist();
  let cssPath = await cached_css(theme);
  let isOld = cssPath ? await cached_css_is_old(cssPath) : false;

  if (cssPath == null || isOld || force) {
    const updated = await update_theme(theme);
    if (!updated) {
      if (cssPath) {
        console.warn(
          `[octomark] Failed to update CSS for theme "${theme}". Using cached version.`,
        );
      } else {
        throw new Error(
          `Failed to fetch CSS for theme "${theme}" and no cached version is available.`,
        );
      }
    }
  }

  return fs.readFile(cssPath!, "utf8");
}
