import { writeFileSync } from "fs";
import path from "path";
import makeCacheDirectory from "@lib/craft-cms/make-cache-directory.ts";
import type { Entry } from "@lib/craft-cms/fetch-entries.ts";

export interface Props {
  entries: Array<Entry>;
  uriPrefix?: string;
}

export default async function ({ entries, uriPrefix }: Props): Promise<void> {
  const staticPaths = entries.map((entry) => {
    let path = entry.uri;

    if (uriPrefix) {
      path = entry.uri.replace(new RegExp(`^${uriPrefix}/`), "");
    }

    return { params: { path: path } };
  });

  const fileContent = [
    `const staticPaths = ${JSON.stringify(staticPaths).replace(
      '"params":{}',
      '"params":{"path":undefined}'
    )};`,
    "",
    `export default staticPaths;`,
    "",
  ].join("\n");

  const dir = await makeCacheDirectory({ uriPrefix });

  const file = path.join(dir, "static-paths.ts");

  writeFileSync(file, fileContent);
}
