import fetchContent from '@lib/craft-cms/fetch-content';
import url from '@lib/craft-cms/url';

interface BaseEntry {
  uri: string;
}

interface BaseData<T> {
  entries: T[];
}

interface Props {
  query: string;
  slug?: string;
  uriPrefix?: string;
}

export default async function <T extends BaseEntry>({
  query,
  slug = '',
  uriPrefix = '',
}: Props): Promise<T | undefined> {
  let entries: T[] = [];

  interface Data extends BaseData<T> {
    [key: string]: unknown;
  }

  if (import.meta.env.DEV) {
    const data = await fetchContent<Data>(query);

    if (data === undefined) {
      return undefined;
    }

    entries = data.entries;
  } else {
    // Vite's glob import, because Astro.glob isn't available here and dynamic import doesn't resolve tsconfig path aliases here.
    // https://vitejs.dev/guide/features.html#glob-import
    const allCachedData: Record<string, Data> = import.meta.glob(
      '@cache/**/data.json',
      {
        import: 'default',
        eager: true,
      },
    );

    const key = Object.keys(allCachedData).find((k) => {
      return k.replace(/.*\/cache\/([^/]*)\/?data.json/, '$1') === uriPrefix;
    });

    if (key) {
      const { entries: cachedEntries } = allCachedData[key];
      entries = cachedEntries;
    }
  }

  if (entries.length === 0) {
    return undefined;
  }

  const needleUrl = url([uriPrefix, slug].filter((v) => v).join('/'));

  const entry = entries.find((entry) => {
    return url(entry?.uri) === needleUrl;
  });

  return entry;
}
