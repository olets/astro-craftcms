import type { Props as FetchEntriesProps } from "@lib/craft-cms/fetch-entries";
import type { Entry } from "@lib/craft-cms/fetch-entries";
import fetchEntries from "@lib/craft-cms/fetch-entries";
import cacheEntries from "@lib/craft-cms/cache-entries";
import cacheStaticPaths from "@lib/craft-cms/cache-static-paths";

interface Props {
  queryProps: FetchEntriesProps;
  dataDirectory?: string;
}

/**
 * In dev mode, fetches and caches entries from local Craft CMS.
 * In production mode, imports entries from the local filesystem.
 * @returns
 */
export default async function getEntries({
  queryProps,
  dataDirectory = "",
}: Props): Promise<Array<Entry>> {
  let entries: Array<Entry> = [];

  if (import.meta.env.DEV) {
    entries = await fetchEntries(queryProps);
    await cacheEntries({ entries, uriPrefix: dataDirectory });
    await cacheStaticPaths({ entries, uriPrefix: dataDirectory });
  } else {
    entries = (await import(`../../data/${dataDirectory}/entries.json`).then(
      (m) => m.default
    )) as Array<Entry>;
  }

  return entries;
}
