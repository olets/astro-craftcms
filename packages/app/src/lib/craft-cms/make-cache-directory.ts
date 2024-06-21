import path from "path";
import { mkdirSync } from "fs";
import { existsSync } from "node:fs";

export interface Props {
  uriPrefix?: string;
}

export default async function makeCacheDirectory({
  uriPrefix = "",
}: Props): Promise<string> {
  const dir = path.join("src/data", uriPrefix);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  return dir;
}
