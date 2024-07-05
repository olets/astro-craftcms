import url from '@lib/craft-cms/url';

interface BaseEntry {
  uri: string;
}

export default async function <T extends BaseEntry[]>({
  entries,
  slug = '',
  uriPrefix = '',
}: {
  entries: T;
  slug?: string;
  uriPrefix?: string;
}): Promise<T[number] | undefined> {
  const needleUrl = url([uriPrefix, slug].filter((v) => v).join('/'));

  const entry = entries.find((entry) => {
    return url(entry.uri) === needleUrl;
  });

  return entry;
}
