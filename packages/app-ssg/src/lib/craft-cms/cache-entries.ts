import { writeFileSync } from "node:fs";
import path from "node:path";
import makeCacheDirectory from "@lib/craft-cms/make-cache-directory";

interface Props {
  entries: object;
  uriPrefix?: string;
}

export default async function ({ entries, uriPrefix }: Props): Promise<void> {
  const fileContent = [
    JSON.stringify(entries),
    "",
  ].join("\n");

  const dir = await makeCacheDirectory({ uriPrefix });

  const file = path.join(dir, "entries.json");

  writeFileSync(file, fileContent);
}
