import githubMarkdownCss from "generate-github-markdown-css";

/**
 * Fetch the list of available GitHub themes
 * @returns An array of theme names
 */
export async function list_themes(): Promise<string[]> {
  const themes = (await githubMarkdownCss({ list: true })) as string;
  return themes.split("\n");
}

/**
 * Fetches the list of available GitHub themes and prints them in a user-friendly format.
 * Each theme is prefixed with a bullet point for better readability.
 * The output is displayed in the console.
 *
 * Example output:
 * 🎨 Available GitHub themes:
 *   - light
 *   - dark
 *   - dark_high_contrast
 *   ...
 */
export async function print_themes() {
  const themes = await list_themes();
  let themeList = "";
  themes.forEach((theme) => {
    themeList += `  - ${theme}\n`;
  });

  console.log("\n🎨 Available GitHub themes:");
  console.log(themeList);
}
