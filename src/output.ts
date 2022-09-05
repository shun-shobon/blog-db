import { type ArticleContent } from "./read.ts";

export type Article = {
  slug: string;
  content: ArticleContent;
};

export async function output(
  path: string,
  articles: Array<Article>,
): Promise<void> {
  const result = JSON.stringify(articles, null, 2);

  await Deno.writeTextFile(path, result);
}
