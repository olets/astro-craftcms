import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "url";

interface XEntry {
  slug: string;
  uri: string;
}

async function cacheData<Entry>(
  channel: String,
  entryType: String
): Promise<void> {
  const entries = (await fetchData<Entry>(channel)) as XEntry[];

  const { slug: exemplarySlug = "", uri: exemplaryUri = "" } = entries[0];

  const uriPrefix = exemplaryUri.split(exemplarySlug)[0] || exemplaryUri;

  const staticPaths = entries.map((entry) => ({
    params: { slug: entry.slug },
  }));

  const content = [
    `import type { ${entryType} } from '@env.d.ts';`,
    "",
    `const entries: Array<${entryType}> = ${JSON.stringify(entries)};`,
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
  const dir = path.resolve(path.join(__dirname, "../src/data"));

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const file = path.join(
    dir,
    `${uriPrefix.replace(/\/+$/, "")}.ts`
  );

  writeFileSync(file, content);
}

// @TODO refactor to something like https://docs.astro.build/en/guides/cms/strapi/#creating-the-api-wrapper
async function fetchData<Entry>(section: String = "*", uri: String = "*"): Promise<Array<Entry>> {
  const response = await fetch("http://astro-craftcms.ddev.site/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
          query getEntries {
            entries (section: "${section}", uri: "${uri}") {
              slug
              title
              uri
            }
          }
        `,
      variables: {
        section: section,
        uri: uri,
      },
    }),
  });

  const json = await response.json();

  const { entries }: { entries: Array<Entry> } = json.data;

  return entries;
}

export { cacheData, fetchData };