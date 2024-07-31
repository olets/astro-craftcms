import type { GetStaticPathsResult } from 'astro';

interface Entry {
  uri: string;
}

/**
 * Builds Astro static paths from entries.
 *
 * @template T the entries' type
 * @augments T Entry
 * @param entries
 * @param [uriPrefix] optional. The URI prefix to trim from entry URIs to determine the slug.
 * @returns
 */
export default async function <T extends Entry>({
  entries,
  uriPrefix,
}: {
  entries: T[] | undefined;
  uriPrefix?: string;
}): Promise<GetStaticPathsResult> {
  if (entries === undefined) {
    return [];
  }

  return entries.map((entry) => {
    let slug = entry.uri;

    if (slug !== undefined && uriPrefix !== undefined) {
      slug = slug.replace(new RegExp(`^${uriPrefix}/`), '');
    }

    return {
      params: { slug: slug },
      props: { entry },
    };
  });
}
