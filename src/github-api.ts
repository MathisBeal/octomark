import { Octokit } from "@octokit/core";

export async function get_github_markdown(
  mdContent: string,
  token?: string,
): Promise<string> {
  const octokit = new Octokit({ auth: token });
  const response = await octokit.request("POST /markdown", {
    text: mdContent,
    headers: { "X-GitHub-Api-Version": "2022-11-28" },
    mode: "gfm",
  });
  return response.data;
}
