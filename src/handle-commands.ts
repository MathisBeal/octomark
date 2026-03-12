import fs from "fs-extra";
import { get_css } from "./css-files.js";
import { get_github_markdown } from "./github-api.js";
import { read_md } from "./read-md.js";

export async function generate_html_file(
  theme: string,
  in_file: string,
  out_file: string,
  force: boolean,
  token?: string,
): Promise<void> {
  try {
    const css = await get_css(theme, force);
    const md = await read_md(in_file);
    const html_formatted = await get_github_markdown(md, token);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
          margin-inline: auto !important; 
        }

        .markdown-body {
          box-sizing: border-box;
          min-width: 200px;
          max-width: 980px;
          padding: 45px;
        }
        @media (max-width: 767px) { .markdown-body { padding: 15px; } }
        ${css}
    </style>
</head>
<body class="markdown-body">
    ${html_formatted}
</body>
</html>`;

    await fs.writeFile(out_file, html);
    console.log(`✔ Success! Created ${out_file}`);
  } catch (err: any) {
    console.error(`✖ Error: ${err.message}`);
    process.exit(1);
  }
}
