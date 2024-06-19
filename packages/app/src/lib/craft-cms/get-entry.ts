import type { Entry } from "@lib/craft-cms/fetch-entries";

interface Props {
  entries: Entry[];
  pathParam?: string;
  uriPrefix?: string;
}

// @TODO consider nixing this function, and just doing `find` in the page templates.
export default function getEntry({
  entries,
  pathParam = "",
  uriPrefix = "",
}: Props): Entry | undefined {
  // @TODO refactor: replace uriPrefix and pathParam with a uri single param, e.g. `my-prefix/${path}`
  const uri = [uriPrefix, pathParam].filter((v) => v).join("/");

  let entry = entries.find((staticEntry) => staticEntry.uri === uri);

  type EntryType = typeof entry;

  // @TODO infer type from the object keys.
  return entry as EntryType;
}
