import type { GetStaticPathsResult } from 'astro';

interface BaseT {
  uri: string;
}

/**
 * Builds Astro static paths from fetched data.
 *
 * @template T the response's data's type
 * @augments T BaseT { uri: string  };
 * @param query the GraphQL query
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
    return [{ params: { slug: undefined } }];
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
