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
      console.error('fetch-api: response not ok', response?.status);
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
