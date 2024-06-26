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
    handleError('fetch-api: CRAFT_CMS_GRAPHQL_URL is not defined');

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
    let message = '';

    if (!response?.ok) {
      message = ['fetch-api: response not ok', response?.status].join('\n');
    } else if (error instanceof SyntaxError) {
      message = ['fetch-api: There was a SyntaxError', error].join('\n');
    } else {
      message = ['fetch-api: There was an error', error].join('\n');
    }

    handleError(message);

    return undefined;
  }

  const result = schema.safeParse(json.data);

  if (!result.success) {
    const message = `fetch-api: ${fromZodError(result.error).toString()}`;

    handleError(message);

    return undefined;
  }

  return result.data as z.infer<T>;
}

function handleError(message: string): void {
  if (import.meta.env.DEV) {
    throw new Error(message);
  }

  console.error(message);
}
