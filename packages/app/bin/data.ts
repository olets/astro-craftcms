import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "url";
import fetchApi from "@lib/craft-cms.ts";

interface Entry {
  slug?: string;
  uri?: string;
}

// @TODO add a check for whether T actually extends Entry
async function cacheData<T extends Entry>(query: string): Promise<void> {
  const entries: Array<T> = await fetchApi<T>(query);

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
  const dir = path.resolve(path.join(__dirname, `../src/pages/${uriPrefix}`));

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const file = path.join(dir, "_", "data.ts");

  writeFileSync(file, content);
}

export { cacheData };
