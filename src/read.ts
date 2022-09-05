export type ArticleContent = string;

export function readArticle(path: string): Promise<ArticleContent> {
  return Deno.readTextFile(path);
}
