import type { GetStaticPathsResult } from 'astro';

interface BaseE {
  uri?: string;
}

export default async function <E extends BaseE>({
  entries,
  uriPrefix,
}: {
  entries: E[] | undefined;
  uriPrefix?: string;
}): Promise<GetStaticPathsResult> {
  if (entries === undefined) {
    return [{ params: { slug: undefined } }];
  }

  return entries.map((entry) => {
    let slug = entry?.uri;

    if (slug !== undefined && uriPrefix !== undefined) {
      slug = slug.replace(new RegExp(`^${uriPrefix}/`), '');
    }

    return {
      params: { slug: slug },
      props: { entry },
    };
  });
}
