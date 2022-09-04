export type Article = string;

export function readArticle(path: string): Promise<Article> {
  return Deno.readTextFile(path);
}
