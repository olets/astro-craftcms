import path from "node:path";
import { Glob } from "bun";
import { fileURLToPath } from "node:url";
import "dotenv/config";
import cacheEntries from "@lib/craft-cms/cache-entries.ts";
import cacheStaticPaths from "@lib/craft-cms/cache-static-paths";
import fetchContent from "@lib/craft-cms/fetch-content";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const fileSuffix = ".ts";

const pattern = path.join(__dirname, `/../src/page-configs/*${fileSuffix}`);

const glob = new Glob(pattern);

for await (const file of glob.scan(".")) {
  const { hasDynamicRoutes, query, uriPrefix } = await import(file).then(
    (m) => {
      return m.default;
    }
  );

  const entries = await fetchContent({
    query,
    url: process.env.CRAFT_CMS_GRAPHQL_URL,
  });

  await cacheEntries({ entries, uriPrefix });

  if (hasDynamicRoutes) {
    await cacheStaticPaths({ entries, uriPrefix });
  }

  console.log(`Data fetched and cached for ${uriPrefix || "index"}`);
}
