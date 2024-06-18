import { writeFileSync } from "fs";
import path from "path";
import makeCacheDirectory from "@lib/craft-cms/make-cache-directory";

interface Props {
  entries: object;
  uriPrefix: string;
}

export default async function ({ entries, uriPrefix }: Props): Promise<void> {
  const fileContent = [
    `const entries = ${JSON.stringify(entries)};`,
    "",
    `export default entries;`,
    "",
  ].join("\n");

  const dir = await makeCacheDirectory({ uriPrefix });

  const file = path.join(dir, "entries.ts");

  writeFileSync(file, fileContent);
}
