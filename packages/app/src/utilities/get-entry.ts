import fetchApi from "@lib/craft-cms.ts";

interface Props<Entry> {
  entries: Array<Entry>;
  query: string;
  slug: string;
  uriPrefix: string;
}

interface Entry {
  slug: string;
}

export default async function getEntry<T extends Entry>({
  entries,
  query,
  slug,
  uriPrefix,
}: Props<T>): Promise<T | undefined> {
  const uri = [uriPrefix, slug].join("");

  let entry = entries.find((staticEntry) => staticEntry.slug === slug);

  if (import.meta.env.DEV) {
    const dynamicEntries = (await fetchApi(query)) as Array<T>;

    if (dynamicEntries.length > 0) {
      entry = dynamicEntries[0];
    }
  }

  return entry;
}
