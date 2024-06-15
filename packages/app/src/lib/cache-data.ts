import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "url";
import fetchApi from "./craft-cms.ts";
import type { Props } from "./craft-cms.ts";

interface CacheEntry {
  slug: string;
  uri: string;
}

export default async function (queryProps: Props): Promise<void> {
  const entries = await fetchApi(queryProps) as CacheEntry[];

  const { slug: exemplarySlug = "", uri: exemplaryUri = "" } = entries[0];

  if (!exemplarySlug || !exemplaryUri) {
    console.log(`Entry generic must have a slug and a uri.`);
    return;
  }

  const uriPrefix = exemplaryUri.split(exemplarySlug)[0] || exemplaryUri;

  const staticPaths = entries.map((entry) => ({
    params: { slug: entry.slug },
  }));

  const content = [
    `const entries = ${JSON.stringify(entries)};`,
    "",
    `const uriPrefix: string = '${uriPrefix}';`,
    "",
    `const staticPaths = ${JSON.stringify(staticPaths)};`,
    "",
    `export { entries, staticPaths, uriPrefix };`,
  ].join("\n");

  // https://stackoverflow.com/a/71735771/1241736
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dir = path.resolve(path.join(__dirname, `../pages/${uriPrefix}`));

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const file = path.join(dir, "_/cache", "data.ts");

  writeFileSync(file, content);
}
