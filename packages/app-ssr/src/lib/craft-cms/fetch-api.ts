export default async function <T>(query: string): Promise<T | undefined> {
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

    return undefined;
  }

  const { data }: { data: T } = json;

  return data;
}
