import url from '@lib/craft-cms/url';

interface BaseEntry {
  uri: string;
}

interface Props<T> {
  entries: T;
  slug?: string;
  uriPrefix?: string;
}

export default async function <T extends BaseEntry[]>({
  entries,
  slug = '',
  uriPrefix = '',
}: Props<T>): Promise<T[number] | undefined> {
  const needleUrl = url([uriPrefix, slug].filter((v) => v).join('/'));

  const entry = entries.find((entry) => {
    return url(entry.uri) === needleUrl;
  });

  return entry;
}
