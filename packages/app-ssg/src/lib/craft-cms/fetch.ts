/**
 * In SSR mode, fetches data from a GraphQL endpoint.
 * In production, fetches data from local cache.
 *
 * @template T the response's data's type
 * @param cacheDirectory the directory in which to look for cache data
 * @param query the GraphQL query
 * @returns {Promise<T|undefined>}
 */
export default async function CraftCMSFetch<T>({
  cacheDirectory = '',
  query,
}: {
  cacheDirectory?: string;
  query: string;
}): Promise<T | undefined> {
  if (import.meta.env.SSR) {
    return await fetchAPI<T>(query);
  }

  return await fetchCache<T>(cacheDirectory);
}

/**
 * Fetches data from a GraphQL endpoint.
 *
 * @template T the response's data's type
 * @param query the GraphQL query
 * @returns {Promise<T|undefined>}
 */
export async function fetchAPI<T>(query: string): Promise<T | undefined> {
  let json;
  let response;

  const url = import.meta.env.CRAFT_CMS_GRAPHQL_URL;

  if (url === undefined) {
    console.warn('fetchAPI: CRAFT_CMS_GRAPHQL_URL is not defined');
    return undefined;
  }

  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: query,
      }),
    });

    json = await response.json();
  } catch (error) {
    if (!response?.ok) {
      console.error('fetchAPI: response not ok', response?.status);
    } else if (error instanceof SyntaxError) {
      console.error('fetchAPI: There was a SyntaxError', error);
    } else {
      console.error('fetchAPI: There was an error', error);
    }

    return undefined;
  }

  const { data }: { data: T } = json;

  return data;
}

/**
 * Fetches data from local cache.
 *
 * @template T — the response's data's type
 * @param cacheDirectory the directory in which to look for cache data
 * @returns {Promise<T|undefined>}
 */
async function fetchCache<T>(cacheDirectory: string): Promise<T | undefined> {
  // Vite's glob import, because Astro.glob isn't available here and dynamic import doesn't resolve tsconfig path aliases here.
  // https://vitejs.dev/guide/features.html#glob-import

  // Maintenance note: `@<dir>` here and `\/<dir>\/` below must be kept in sync.
  const allCachedData: Record<string, T> =
    import.meta.glob('@cache/**/data.json', {
      import: 'default',
      eager: true,
    }) || {};

  // Maintenance note: `\/<dir>\/` here and `@<dir>` above must be kept in sync.
  const key = Object.keys(allCachedData).find((k) => {
    const dir = k.replace(/.*\/cache\/([^/]*)\/?data.json/, '$1');

    return dir === cacheDirectory;
  });

  if (!key) {
    console.warn('fetchCache: No data found', cacheDirectory);
    return undefined;
  }

  return allCachedData[key];
}
