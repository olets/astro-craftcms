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
}): Promise<z.infer<T> | undefined> {
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

  const result = schema.safeParse(json.data);

  if (!result.success) {
    const message = `fetch-api: ${fromZodError(result.error).toString()}`;

    if (import.meta.env.DEV) {
      throw new Error(message);
    } else {
      console.log(message);

      return undefined;
    }
  }

  return result.data;
}
