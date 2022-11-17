import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type { Root } from "mdast";
import { unified } from "unified";

export function parseMarkdown(markdown: string): Root {
  const parser = unified().use(remarkParse).use(remarkGfm).use(remarkMath);

  return parser.parse(markdown);
}
