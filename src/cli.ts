#!/usr/bin/env node
import meow from "meow";
import path from "path";
import { fileURLToPath } from "url";
import { generate_html_file } from "./handle-commands.js";
import { print_themes } from "./list-themes.js";

import { dirname } from "node:path";
import { clean_cache } from "./cache-manager.js";

// On recrée __dirname manuellement pour les modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CACHE_DIR = path.join(__dirname, "../.css-cache"); // Remonte d'un cran si on est dans dist/

const cli = meow(
  `
	Usage
	  $ octomark <input-file>

	Options
	  --theme, -t  Nom du thème GitHub [Default: light]
	  --list, -l   Afficher les thèmes disponibles
	  --force, -f  Forcer la mise à jour du cache CSS
	  --clean      Supprimer tout le cache CSS
	  --out, -o    Nom du fichier de sortie
	  --token      Token GitHub

	Exemple
  $ octomark --list
  $ octomark README.md -t dark
  $ octomark README.md -t dark --force
  $ octomark --clean
`,
  {
    importMeta: import.meta,
    flags: {
      theme: { type: "string", shortFlag: "t", default: "dark" },
      list: { type: "boolean", shortFlag: "l" },
      out: { type: "string", shortFlag: "o" },
      force: { type: "boolean", shortFlag: "f", default: false },
      clean: { type: "boolean" },
      token: { type: "string" },
    },
  },
);

async function run(): Promise<void> {
  // Case when "--clean" flag is used
  if (cli.flags.clean) {
    await clean_cache();
    return;
  }

  // Case when "--list" flag is used
  if (cli.flags.list) {
    await print_themes();
    return;
  }

  const inputFile = cli.input[0];
  // Prints the help message if no input file is provided and exits the program
  if (!inputFile) {
    cli.showHelp();
    return;
  }

  // Destructure the flags for easier access
  const { theme, out, token, force } = cli.flags;

  // Generate the output file name by replacing the input file's extension with ".html" if the "--out" flag is not provided
  const outputFile = out || inputFile.replace(/\.[^/.]+$/, "") + ".html";

  await generate_html_file(theme, inputFile, outputFile, force, token);
}

run();
