export default async function <T>(query: string): Promise<T | undefined> {
  let json;
  let response;

  const url = import.meta.env.CRAFT_CMS_GRAPHQL_URL;

  if (url === undefined) {
    console.warn('fetch-api: CRAFT_CMS_GRAPHQL_URL is not defined');
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
        `fetch-api: Fetch attempt returned the status code ${response?.status}`,
      );
    } else if (error instanceof SyntaxError) {
      console.error('fetch-api: There was a SyntaxError', error);
    } else {
      console.error('fetch-api: There was an error', error);
    }

    return undefined;
  }

  const { data }: { data: T } = json;

  return data;
}
