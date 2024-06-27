import { writeFileSync } from "node:fs";
import path from "node:path";
import makeCacheDirectory from "@lib/craft-cms/make-cache-directory.ts";
import type { Entry } from "@lib/craft-cms/fetch-entries.ts";

export interface Props {
  entries: Array<Entry>;
  uriPrefix?: string;
}

export default async function ({ entries, uriPrefix }: Props): Promise<void> {
  const staticPaths = entries.map((entry) => {
    let slug = entry.uri;

    if (uriPrefix) {
      slug = entry.uri.replace(new RegExp(`^${uriPrefix}/`), "");
    }

    return { params: { slug: slug } };
  });

  const fileContent = [
    `const staticPaths = ${JSON.stringify(staticPaths).replace(
      '"params":{}',
      '"params":{"slug":undefined}'
    )};`,
    "",
    `export default staticPaths;`,
    "",
  ].join("\n");

  const dir = await makeCacheDirectory({ uriPrefix });

  const file = path.join(dir, "static-paths.ts");

  writeFileSync(file, fileContent);
}
