import url from '@lib/craft-cms/url';

interface BaseEntry {
  uri: string;
}

/**
 * Finds the entry with the given URI, if it exists.
 *
 * @template T the response's data's type
 * @augments T BaseEntry
 * @param entries
 * @param uri
 * @returns {Promise<T|undefined>}
 */
export default async function getEntry<T extends BaseEntry>({
  entries,
  uri,
}: {
  entries: T[];
  uri: string;
}): Promise<T | undefined> {
  const urilessEntries: T[] = [];

  if (entries === undefined || entries.length === 0) {
    console.warn('get-entry: no entries provided');
    return undefined;
  }

  if (entries[0]?.uri === undefined) {
    console.warn('get-entry: all entries must have a uri property');
  }

  const entry = entries.find((entry) => {
    if (entry.uri === undefined) {
      urilessEntries.push(entry);
    }

    return url(entry.uri) === url(uri);
  });

  if (entry === undefined && urilessEntries.length > 0) {
    console.log(
      'get-entry: no matching entry found. Was it one of these URI-less entries?',
      urilessEntries,
    );
  }

  return entry;
}
