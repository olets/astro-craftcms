import fetchContent from "@lib/craft-cms/fetch-content";
import url from "@lib/craft-cms/url";
import type { BaseEntry } from "@lib/craft-cms/types";

interface Props {
  query: string;
  slug?: string;
  uriPrefix?: string;
}

export default async function <T extends BaseEntry>({
  query,
  slug = "",
  uriPrefix = "",
}: Props): Promise<T | undefined> {
  let entries: T[] = [] as T[];

  if (import.meta.env.DEV) {
    entries = await fetchContent<T>({ query });
  } else {
    // Vite's glob import, because Astro.glob isn't available here and dynamic import doesn't resolve tsconfig path aliases here.
    // https://vitejs.dev/guide/features.html#glob-import
    const allCachedData = import.meta.glob("@data/**/entries.json", {
      import: "default",
      eager: true,
    });

    const key = Object.keys(allCachedData).find((k) => {
      return k.replace(/.*\/data\/([^\/]*)\/?entries.json/, "$1") === uriPrefix
    })

    if (key) {
      entries = allCachedData[key] as T[];
    }
  }

  if (!entries || entries.length === 0) {
    return undefined;
  }

  const needleUrl = url([uriPrefix, slug].filter((v) => v).join("/"));

  const entry = entries.find((entry) => {
    return url(entry?.uri) === needleUrl;
  });

  return entry;
}
