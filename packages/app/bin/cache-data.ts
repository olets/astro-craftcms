import path from "node:path";
import { Glob } from "bun";
import { fileURLToPath } from "node:url";
import 'dotenv/config'
import cacheEntries from "@lib/craft-cms/cache-entries.ts";
import cacheStaticPaths from "@lib/craft-cms/cache-static-paths";
import fetchEntries from "@lib/craft-cms/fetch-entries.ts";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const fileSuffix = ".ts"

const pattern = path.join(__dirname, `/../src/queries/**/*${fileSuffix}`);

const glob = new Glob(pattern);

for await (const file of glob.scan(".")) {
  const uriPrefix = path.basename(file, fileSuffix)
  
  const queryProps = await import(file)
    .then(m => {
      return m.default
    })
    .catch(_ => console.warn(`No query file found for ${uriPrefix}`));

  if (!queryProps) {
    continue;
  }
  
  const entries = await fetchEntries({...queryProps, url: process.env.CRAFT_CMS_GRAPHQL_URL});

  await cacheEntries({ entries, uriPrefix });
  await cacheStaticPaths({ entries, uriPrefix });

  console.log(`Data fetched and cached for ${uriPrefix}`);
}
