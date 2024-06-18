import type { Props as FetchEntriesProps } from "@lib/craft-cms/fetch-entries";
import type { Entry } from "@lib/craft-cms/fetch-entries";
import fetchEntries from "@lib/craft-cms/fetch-entries";
import cacheEntries from "@lib/craft-cms/cache-entries";
import cacheStaticPaths from "@lib/craft-cms/cache-static-paths";
interface Props {
  queryProps: FetchEntriesProps;
  pathParam?: string;
  uriPrefix?: string;
}

export default async function getSectionEntry({
  queryProps,
  pathParam = "",
  uriPrefix = "",
}: Props): Promise<Entry | undefined> {
  // @TODO doesn't support root path.
  const uri = [uriPrefix, pathParam].filter((v) => v).join("/");

  let entries: Array<Entry> = [];

  if (import.meta.env.DEV) {
    entries = await fetchEntries(queryProps);
    await cacheEntries({ entries, uriPrefix });
    await cacheStaticPaths({ entries, uriPrefix });
  } else {
    entries = (await import(`../../data/${uriPrefix}/entries.ts`).then(
      (m) => m.default
    )) as Entry[];
  }

  let entry = entries.find((staticEntry) => staticEntry.uri === uri);

  type EntryType = typeof entry;

  return entry as EntryType;
}
