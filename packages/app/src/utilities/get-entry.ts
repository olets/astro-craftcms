import { fetchData } from "@@bin/data.ts";

interface Props<Entry> {
  entries: Array<Entry>
  slug: string
  uriPrefix: string
}

export default async function getEntry<Entry>({
  entries,
  slug,
  uriPrefix,
}: Props<Entry>,): Promise<Entry | undefined> {
  const uri = [uriPrefix, slug].join("");

  // @ts-ignore-next-line // @TODO resolve
  let entry = entries.find((staticEntry) => staticEntry.slug === slug);

  if (import.meta.env.DEV) {
    const dynamicEntries = (await fetchData(uri)) as Array<Entry>;

    if (dynamicEntries.length > 0) {
      entry = dynamicEntries[0];
    }
  }

  return entry;
}
