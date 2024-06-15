import fetchApi from "@lib/craft-cms.ts";
import type { Props as fetchApiProps } from "@lib/craft-cms.ts";

interface Props<Entry> {
  entries: Array<Entry>;
  queryProps: fetchApiProps;
  slug: string;
  uriPrefix: string;
}

interface Entry {
  slug: string;
}

export default async function getEntry<T extends Entry>({
  entries,
  queryProps,
  slug,
  uriPrefix,
}: Props<T>): Promise<T | undefined> {
  const uri = [uriPrefix, slug].join("");

  let entry = entries.find((staticEntry) => staticEntry.slug === slug);

  if (import.meta.env.DEV) {
    const dynamicEntries = (await fetchApi({
      ...queryProps,
      additionalArguments: `uri: "${uri}"`,
    })) as Array<T>;

    if (dynamicEntries.length > 0) {
      entry = dynamicEntries[0];
    }
  }

  return entry;
}
