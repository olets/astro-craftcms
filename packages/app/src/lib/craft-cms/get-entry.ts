import type { Props as FetchEntriesProps } from "@lib/craft-cms/fetch-entries";
import type { Entry } from "@lib/craft-cms/fetch-entries";
import getEntries from "@lib/craft-cms/get-entries";

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

  const entries: Array<Entry> = await getEntries({ queryProps, cacheDirectory: uriPrefix });

  let entry = entries.find((staticEntry) => staticEntry.uri === uri);

  type EntryType = typeof entry;

  return entry as EntryType;

}
