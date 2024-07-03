interface Props {
  cacheDirectory?: string;
  dev?: boolean;
  query: string;
}

export default async function CraftCMSFetch<T>({
  query,
  cacheDirectory = '',
  dev = import.meta.env.DEV,
}: Props): Promise<T | undefined> {
  if (dev) {
    return await fetchAPI<T>(query);
  }

  return await fetchCache<T>(cacheDirectory);
}

export async function fetchAPI<T>(query: string): Promise<T | undefined> {
  let json;
  let response;

  const url = import.meta.env.CRAFT_CMS_GRAPHQL_URL;

  if (url === undefined) {
    console.warn('fetch-content: CRAFT_CMS_GRAPHQL_URL is not defined');
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
      console.error(
        `fetch-content: Fetch attempt returned the status code ${response?.status}`,
      );
    } else if (error instanceof SyntaxError) {
      console.error('fetch-content: There was a SyntaxError', error);
    } else {
      console.error('fetch-content: There was an error', error);
    }
  }

  if (!json?.data) {
    console.warn('fetch-content: No data returned');
    return undefined;
  }

  const { data }: { data: T } = json;

  return data;
}

async function fetchCache<T>(cacheDirectory: string): Promise<T | undefined> {
  // Vite's glob import, because Astro.glob isn't available here and dynamic import doesn't resolve tsconfig path aliases here.
  // https://vitejs.dev/guide/features.html#glob-import
  const allCachedData: Record<string, T> =
    import.meta.glob('@cache/**/data.json', {
      import: 'default',
      eager: true,
    }) || {};

  const key = Object.keys(allCachedData).find((k) => {
    const dir = k.replace(/.*\/cache\/([^/]*)\/?data.json/, '$1');

    return dir === cacheDirectory;
  });

  if (!key) {
    return undefined;
  }

  return allCachedData[key];
}
