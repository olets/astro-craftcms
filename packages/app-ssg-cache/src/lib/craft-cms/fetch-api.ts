import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

/**
 * Fetches and validates data from a GraphQL endpoint.
 *
 * @param query the GraphQL query
 * @param schema the response's data's schema
 * @returns
 */
export default async function fetchAPI<T extends z.ZodTypeAny>({
  query,
  schema,
}: {
  query: string;
  schema: T;
}): Promise<z.infer<T>> {
  let json;
  let response;

  const url = import.meta.env.CRAFT_CMS_GRAPHQL_URL;

  if (url === undefined) {
    throw new Error('fetch-api: CRAFT_CMS_GRAPHQL_URL is not defined');
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
    let message = '';

    if (!response?.ok) {
      message = [
        'fetch-api: response not ok. Is the CMS reachable?',
        response?.status,
      ].join('\n');
    } else if (error instanceof SyntaxError) {
      message = ['fetch-api: There was a SyntaxError', error].join('\n');
    } else {
      message = ['fetch-api: There was an error', error].join('\n');
    }

    throw new Error(message);
  }

  const result = schema.safeParse(json.data);

  if (!result.success) {
    const message = `fetch-api: ${fromZodError(result.error).toString()}`;

    throw new Error(message);
  }

  return result.data as z.infer<T>;
}
