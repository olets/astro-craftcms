import type { Props as FetchEntriesProps } from "@lib/craft-cms/fetch-entries";
import type { Entry } from "@lib/craft-cms/fetch-entries";
import fetchEntries from "@lib/craft-cms/fetch-entries";
import cacheEntries from "@lib/craft-cms/cache-entries";
import cacheStaticPaths from "@lib/craft-cms/cache-static-paths";

interface Props {
  queryProps: FetchEntriesProps;
  cacheDirectory?: string;
}

export default async function getEntries({ queryProps, cacheDirectory = ""}: Props): Promise<Entry[]> {
  let entries: Array<Entry> = [];

  if (import.meta.env.DEV) {
    entries = await fetchEntries( queryProps);
    await cacheEntries({ entries, uriPrefix: cacheDirectory });
    await cacheStaticPaths({ entries, uriPrefix: cacheDirectory });
  } else {
    entries = (await import(`../../data/${cacheDirectory}/entries.ts`).then(
      (m) => m.default
    )) as Entry[];
  }

  return entries;
}