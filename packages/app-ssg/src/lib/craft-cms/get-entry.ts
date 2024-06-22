import cacheEntries from "@lib/craft-cms/cache-entries";
import cacheStaticPaths from "@lib/craft-cms/cache-static-paths";
import fetchContent from "@lib/craft-cms/fetch-content";
import url from "@lib/craft-cms/url";

export interface BaseEntry {
  sectionHandle: string;
  uri: string;
}

interface Props {
  query: string;
  sectionHandle: string;
  slug?: string;
  uriPrefix?: string;
}

export default async function <T extends BaseEntry>({
  query,
  sectionHandle,
  slug,
  uriPrefix,
}: Props): Promise<T | undefined> {
  let entries: T[] = [] as T[];

  if (import.meta.env.DEV) {
    entries = await fetchContent<T>({ query });
    await cacheEntries({ entries, uriPrefix });
    await cacheStaticPaths({ entries, uriPrefix });
  } else {
    // Vite's glob import, because Astro.glob isn't available here.
    // https://vitejs.dev/guide/features.html#glob-import
    const allCachedData = import.meta.glob("@data/**/entries.json", {
      import: "default",
      eager: true,
    });

    entries = (Object.values(allCachedData) as T[][]).filter((arr) =>
      arr.every((entry) => entry.sectionHandle === sectionHandle)
    )[0];
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
