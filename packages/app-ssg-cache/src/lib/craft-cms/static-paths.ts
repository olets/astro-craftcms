import type { GetStaticPathsResult } from 'astro';

interface BaseT {
  uri: string;
}

/**
 * Builds Astro static paths from entries.
 *
 * @template T the response's data's type
 * @augments T BaseT { uri: string  };
 * @param query the GraphQL query
 * @param [uriPrefix] optional. The URI prefix to trim from entry URIs to determine the slug.
 * @returns
 */
export default async function <T extends BaseT>({
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
