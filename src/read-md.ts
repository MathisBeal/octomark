import fs from "fs-extra";

export async function read_md(md_file: string): Promise<string> {
  try {
    const content = await fs.readFile(md_file, "utf8");
    return content;
  } catch (error) {
    console.error(`Error reading Markdown file "${md_file}":`, error);
    throw error;
  }
}
