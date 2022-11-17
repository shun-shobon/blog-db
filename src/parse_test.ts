import { assertEquals } from "testing/asserts.ts";
import type { Delete, Heading, Paragraph, Text } from "mdast";
import type { InlineMath } from "mdast-util-math";
import { parseMarkdown } from "./parse.ts";

Deno.test("parseMarkdown", () => {
  const markdown = `# Heading 1

~~strikethrough~~ text $y = ax + b$
`;
  const result = parseMarkdown(markdown);

  const heading1 = result.children[0] as Heading;
  assertEquals(heading1.type, "heading");
  assertEquals(heading1.depth, 1);
  const heading1Text = heading1.children[0] as Text;
  assertEquals(heading1Text.value, "Heading 1");

  const paragraph = result.children[1] as Paragraph;
  type Content = [Delete, Text, InlineMath];
  const [strikethrough, text, math] = paragraph.children as Content;

  assertEquals(strikethrough.type, "delete");
  const strikethroughText = strikethrough.children[0] as Text;
  assertEquals(strikethroughText.value, "strikethrough");

  assertEquals(text.type, "text");
  assertEquals(text.value, " text ");

  assertEquals(math.type, "inlineMath");
  assertEquals(math.value, "y = ax + b");
});
