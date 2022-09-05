import { output } from "./src/output.ts";
import { searchArticles } from "./src/search.ts";
import { readArticle } from "./src/read.ts";

const results = await searchArticles("example");
const articlePromises = results.map(async (result) => ({
  slug: result.slug,
  content: await readArticle(result.path),
}));
const articles = await Promise.all(articlePromises);

await output("articles.json", articles);
