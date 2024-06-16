import fetchApi from "@lib/craft-cms.ts";
import type { Props as fetchApiProps } from "@lib/craft-cms.ts";

interface Props<Entry> {
  entries: Array<Entry>;
  queryProps: fetchApiProps;
  path?: string;
  uriPrefix?: string;
}

interface Entry {
  uri: string;
}

/**
 * 
 * @param Props<T extends Entry>
 * @param Props.entries<Array<Entry>>
 * @param Props.queryProps<fetchApiProps>
 * @param Props.path<string> The Astro path relative to the Astro page file
 * @param Props.uriPrefix<string>
 * @returns 
 */
export default async function getEntry<T extends Entry>({
  entries,
  queryProps,
  path,
  uriPrefix,
}: Props<T>): Promise<T | undefined> {
  const uri = [uriPrefix, path].filter(v => v).join("/") || entries[0].uri;

  let entry = entries.find((staticEntry) => staticEntry.uri === uri);

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
