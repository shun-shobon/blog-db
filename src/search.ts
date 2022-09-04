import { expandGlob } from "fs/mod.ts";
import { basename, dirname, join } from "path/mod.ts";
import {
  asyncFilter,
  asyncMap,
  asyncToArray,
  fromAsyncIterable,
  pipe,
} from "iter_funcs/mod.ts";

const SEARCH_ARTICLES_FILE_PATTERN = "articles/*/main.md";

export type SearchArticlesResult = {
  slug: string;
  path: string;
};

export function searchArticles(
  srcroot: string,
): Promise<Array<SearchArticlesResult>> {
  const searchPattern = join(srcroot, SEARCH_ARTICLES_FILE_PATTERN);

  return pipe(
    expandGlob(searchPattern),
    fromAsyncIterable,
    asyncFilter((entry) => entry.isFile),
    asyncMap((entry) => {
      const slug = basename(dirname(entry.path));
      return { slug, path: entry.path };
    }),
    asyncToArray,
  );
}
