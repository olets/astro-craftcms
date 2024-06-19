import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
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
