import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "url";
import type { ExampleChannelEntry } from "@interfaces/example-channel-entry";

// @TODO refactor to something like https://docs.astro.build/en/guides/cms/strapi/#creating-the-api-wrapper
async function fetchData (uri: String = "*"): Promise<Array<ExampleChannelEntry>> {
  const response = await fetch("http://astro-craftcms.ddev.site/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
          query getEntries {
            entries (section: "exampleChannel", uri: "${uri}") {
              slug
              title
              uri
            }
          }
        `,
      variables: {
        uri: uri,
      },
    }),
  });

  const json = await response.json();

  const { entries }: { entries: Array<ExampleChannelEntry> } = json.data;

  return entries;
}

const entries = await fetchData();

const { slug: exemplarySlug = "", uri: exemplaryUri = "" } = entries[0];

const uriPrefix = exemplaryUri.split(exemplarySlug)[0] || exemplaryUri;

const staticPaths = entries.map((entry) => ({
  params: { slug: entry.slug },
  props: { entry },
}));

const content = [
  "import type { ExampleChannelEntry } from '@interfaces/example-channel-entry';",
  "",
  `const entries: Array<ExampleChannelEntry> = ${JSON.stringify(entries)};`,
  `const uriPrefix: string = '${uriPrefix}';`,
  `const staticPaths = ${JSON.stringify(staticPaths)};`,
  `export { entries, staticPaths, uriPrefix };`,
].join("\n");

// https://stackoverflow.com/a/71735771/1241736
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.resolve(path.join(__dirname, `../../src/pages/${uriPrefix}`));
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true });
}

writeFileSync(`${dir}/data.ts`, content);

export { fetchData };