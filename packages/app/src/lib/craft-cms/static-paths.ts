import type { GetStaticPathsResult } from 'astro';

interface Data {
  entries: {
    uri: string;
  }[];
}

/**
 * Builds Astro static paths from query response data.
 *
 * @template T the response data's type
 * @augments T Data
 * @param data
 * @param [uriPrefix] optional. The URI prefix to trim from entry URIs to determine the slug.
 * @returns
 */
export default async function <T extends Data>({
  data,
  uriPrefix,
}: {
  data: T;
  uriPrefix?: string;
}): Promise<GetStaticPathsResult> {
  const { entries } = data;

  return entries.map((entry) => {
    let slug = entry.uri;

    if (slug !== undefined && uriPrefix !== undefined) {
      slug = slug.replace(new RegExp(`^${uriPrefix}/`), '');
    }

    return {
      params: { slug },
      props: { data, entry },
    };
  });
}
