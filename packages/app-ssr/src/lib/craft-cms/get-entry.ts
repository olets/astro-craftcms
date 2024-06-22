import fetchContent from "@lib/craft-cms/fetch-content";
import url from "@lib/craft-cms/url";

export interface BaseEntry {
  uri: string;
}

interface Props {
  query: string;
  slug: string;
  uriPrefix?: string;
}

export default async function <T extends BaseEntry>({
  query,
  slug,
  uriPrefix,
}: Props): Promise<T | undefined> {
  const entries: T[] = await fetchContent<T>(query);

  const needleUrl = url([uriPrefix, slug].filter((v) => v).join("/"));

  const entry = entries.find((entry) => url(entry.uri) === needleUrl);

  return entry;
}
