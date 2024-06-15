import fetchApi from "@lib/craft-cms.ts";

interface Props<Entry> {
  entries: Array<Entry>;
  query: string;
  slug: string;
  uriPrefix: string;
}

export default async function getEntry<Entry>({
  entries,
  query,
  slug,
  uriPrefix,
}: Props<Entry>): Promise<Entry | undefined> {
  const uri = [uriPrefix, slug].join("");

  // @ts-ignore-next-line // @TODO resolve
  let entry = entries.find((staticEntry: Entry) => staticEntry.slug === slug);

  if (import.meta.env.DEV) {
    const dynamicEntries = (await fetchApi(query)) as Array<Entry>;

    if (dynamicEntries.length > 0) {
      entry = dynamicEntries[0];
    }
  }

  return entry;
}
