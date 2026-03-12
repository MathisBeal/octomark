declare module "generate-github-markdown-css" {
  interface Options {
    list?: boolean;
    [key: string]: any;
  }
  function githubMarkdownCss(options?: Options): Promise<string>;
  export default githubMarkdownCss;
}
