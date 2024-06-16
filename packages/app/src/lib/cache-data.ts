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
  const entries = (await fetchApi(queryProps)) as CacheEntry[];

  const { slug, uri } = entries[0];

  if (!slug || !uri) {
    console.log(`Entry generic must have a slug and a uri.`);
    return;
  }

  let uriPrefix: string | undefined = undefined;

  if (slug !== uri) {
    uriPrefix = uri.replace(new RegExp(`/${slug}$`), "");
  }

  const staticPaths = entries.map((entry) => {
    let path: string | undefined = undefined;

    if (uriPrefix) {
      path = entry.uri.replace(new RegExp(`^${uriPrefix}/`), "");
    }

    return { params: { path: path } };
    // If uri is "channel/entry" and slug is "channel", path is "entry".
    // If uri is "single" and slug is "single", path is "".
  });
  // const { params } = staticPaths[0]
  // const statics = JSON.stringify(staticPaths).replace('"params":{}', '"params":{"path":undefined}');
  // console.log({params, statics});
  // return

  const content = [
    `const entries = ${JSON.stringify(entries)};`,
    "",
    `const uriPrefix = ${JSON.stringify(uriPrefix)};`,
    "",
    `const staticPaths = ${JSON.stringify(staticPaths).replace(
      '"params":{}',
      '"params":{"path":undefined}'
    )};`,
    "",
    `export { entries, staticPaths, uriPrefix };`,
  ].join("\n");

  // https://stackoverflow.com/a/71735771/1241736
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dir = path.resolve(
    path.join(__dirname, `../pages/${uriPrefix || uri}`)
  );

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const file = path.join(dir, "_/cache", "data.ts");

  writeFileSync(file, content);
}
