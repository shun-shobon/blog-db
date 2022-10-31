import { parse as parseYaml } from "encoding/yaml.ts";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import { Temporal } from "temporal";
import { isObject, trying } from "./utils.ts";

export type ParsedArticle = Frontmatter & {
  // TODO: ASTに置き換える
  content: string;
};

export function parse(markdown: string): ParsedArticle | ParseError {
  const result = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .parse(markdown);

  const frontmatterNode = result.children.find((node) => node.type === "yaml");
  if (!frontmatterNode || frontmatterNode.type !== "yaml") {
    return new ParseError("Frontmatter is not found");
  }

  const frontmatter = parseFrontmatter(frontmatterNode.value);
  if (frontmatter instanceof ParseError) {
    return frontmatter;
  }

  return {
    title: frontmatter.title,
    postedAt: frontmatter.postedAt,
    tags: frontmatter.tags,
    // TODO: ASTに置き換える
    content: markdown,
  };
}

class ParseError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "ParseError";
  }
}

type Frontmatter = {
  title: string;
  postedAt: Temporal.PlainDate;
  tags: Array<string>;
};

function parseFrontmatter(frontmatter: string): Frontmatter | ParseError {
  const parsed = trying(() => parseYaml(frontmatter));
  if (parsed instanceof Error) {
    return new ParseError("Frontmatter is not valid YAML");
  }

  if (!isObject(parsed)) {
    return new ParseError("frontmatter is not valid");
  }

  if (typeof parsed.title !== "string") {
    return new ParseError("missing property: title");
  }

  console.log(parsed.postedAt);
  if (typeof parsed.postedAt !== "string") {
    return new ParseError("missing property: postedAt");
  }

  if (
    !Array.isArray(parsed.tags) ||
    !parsed.tags.every((tag) => typeof tag === "string")
  ) {
    return new ParseError("missing property: tags");
  }

  const postedAt = Temporal.PlainDate.from(parsed.postedAt);

  return {
    title: parsed.title,
    postedAt,
    tags: parsed.tags,
  };
}
