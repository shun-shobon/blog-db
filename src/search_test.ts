import { assert, assertEquals } from "testing/asserts.ts";

import { searchArticles } from "./search.ts";

Deno.test("searchArticles", async () => {
  const results = await searchArticles("example");

  assertEquals(results.length, 2);

  assert(results.some((result) => result.slug === "hello-world"));
  assert(results.some((result) => result.path.match("hello-world/main.md")));

  assert(results.some((result) => result.slug === "markdown-test"));
  assert(results.some((result) => result.path.match("markdown-test/main.md")));

  assert(!results.some((result) => result.slug === "invalid"));
  assert(!results.some((result) => result.path.match("inlivad/main.md")));
});
