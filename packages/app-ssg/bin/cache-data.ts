import { Glob } from "bun";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";
import fetchContent from "@lib/craft-cms/fetch-content";

interface CacheEntriesProps {
  dir: string;
  entries: object;
}

export interface CacheStaticPathsProps {
  dir: string;
  entries: Array<any>;
  uriPrefix?: string;
}

await cacheData();

async function cacheData() {
  const fileSuffix = ".ts";

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pattern = path.join(__dirname, `/../src/page-configs/*${fileSuffix}`);
  const glob = new Glob(pattern);

  for await (const file of glob.scan(".")) {
    const { hasDynamicRoutes, query, uriPrefix } = await import(file);

    const entries = await fetchContent({
      query,
      url: process.env.CRAFT_CMS_GRAPHQL_URL,
    });

    if (!entries || entries.length === 0) {
      console.warn(`No entries found for ${file}`);
      continue;
    }

    const dir = await makeCacheDirectory(uriPrefix);

    await cacheEntries({ dir, entries });

    if (hasDynamicRoutes) {
      await cacheStaticPaths({ dir, entries, uriPrefix });
    }

    console.log(`Data fetched and cached for ${uriPrefix || "index"}`);
  }
}

async function cacheEntries({
  dir,
  entries,
}: CacheEntriesProps): Promise<void> {
  const file = path.join(dir, "entries.json");

  const data = [JSON.stringify(entries), ""].join("\n");

  writeFileSync(file, data);
}

async function cacheStaticPaths({
  dir,
  entries,
  uriPrefix,
}: CacheStaticPathsProps): Promise<void> {
  const staticPaths = entries.map((entry) => {
    let slug = entry.uri;

    if (uriPrefix) {
      slug = entry.uri.replace(new RegExp(`^${uriPrefix}/`), "");
    }

    return { params: { slug: slug } };
  });

  const file = path.join(dir, "static-paths.json");

  const data = [
    JSON.stringify(staticPaths).replace(
      '"params":{}',
      '"params":{"slug":undefined}'
    ),
    "",
  ].join("\n");

  writeFileSync(file, data);
}

async function makeCacheDirectory(uriPrefix: string = ""): Promise<string> {
  const dir = path.join("src/data", uriPrefix);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  return dir;
}
