import path from "path";
import { Glob } from "bun";
import { fileURLToPath } from "url";
import 'dotenv/config'
import cacheEntries from "@lib/craft-cms/cache-entries.ts";
import cacheStaticPaths from "@lib/craft-cms/cache-static-paths";
import fetchEntries from "@lib/craft-cms/fetch-entries.ts";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const pattern = path.join(__dirname, "/../src/pages/[^_]*/[[]...path[]].astro");

const glob = new Glob(pattern);

for await (const file of glob.scan(".")) {
  const uriPrefix = path.basename(path.dirname(file))
  
  const queryProps = await import(`../src/queries/${uriPrefix}`).then(m => m.default);
  
  const entries = await fetchEntries({...queryProps, url: process.env.CRAFT_CMS_GRAPHQL_URL});
  // console.log({ entries })
  // continue

  await cacheEntries({ entries, uriPrefix });
  await cacheStaticPaths({ entries, uriPrefix });
}
