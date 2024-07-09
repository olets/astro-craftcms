/**
 * Fetches data from a GraphQL endpoint.
 *
 * @template T the response's data's type
 * @param query the GraphQL query
 * @returns {Promise<T|undefined>}
 */
export default async function fetchAPI<T>(
  query: string,
): Promise<T | undefined> {
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
