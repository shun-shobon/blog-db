import { assert, assertEquals } from "testing/asserts.ts";

import { parse } from "./parse_old.ts";

const markdown = await Deno.readTextFile(
  "example/articles/hello-world/main.md",
);

Deno.test("parse", () => {
  const result = parse(markdown);
  console.log(result);

  assert(!(result instanceof Error));
  assertEquals(result.title, "こんにちは世界");
  assertEquals(result.postedAt.toJSON(), "2022-08-30");
  assertEquals(result.tags, ["test", "hello", "world"]);
});
