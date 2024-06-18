import path from "path";

import type { Props } from "@lib/craft-cms/make-cache-directory";

export default function getCacheDirectory({ uriPrefix = "" }: Props): string {
  const dir = path.resolve(
    path.join("src/data", uriPrefix)
  );

  return dir;
}
