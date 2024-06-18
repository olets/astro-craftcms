import path from "path";
import { mkdirSync } from "fs";
import { existsSync } from "node:fs";
import getCacheDirectory from "@lib/craft-cms/get-cache-directory";

export interface Props {
  uriPrefix?: string;
}

export default async function makeCacheDirectory({
  uriPrefix = "",
}: Props): Promise<string> {
  const dir = path.resolve(getCacheDirectory({ uriPrefix }));

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  return dir;
}
