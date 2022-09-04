import { assertMatch } from "testing/asserts.ts";

import { readArticle } from "./read.ts";

Deno.test("readArticle", async () => {
  const article = await readArticle("example/articles/hello-world/main.md");

  assertMatch(article, /^# こんにちは世界！$/m);
  assertMatch(article, /^Hello, world!$/m);
});
