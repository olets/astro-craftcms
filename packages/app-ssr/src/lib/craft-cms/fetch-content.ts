import type { BaseEntry } from "@lib/craft-cms/types";

export default async function <T extends BaseEntry>(query: string): Promise<T[]> {
  const url = import.meta.env.CRAFT_CMS_GRAPHQL_URL;

  let json;
  let response;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query,
      }),
    });

    json = await response.json();
  } catch (error) {
    if (!response?.ok) {
      console.error(`fetch-content: Fetch attempt returned the status code ${response?.status}`)
    } else if (error instanceof SyntaxError) {
      console.error('fetch-content: There was a SyntaxError', error);
    } else {
      console.error('fetch-content: There was an error', error);
    }

    return [];
  }

  if (!json?.data) {
    console.warn('fetch-content: No data returned');
    return [];
  }

  const { entries = [] }: { entries: T[] } = json.data;
  
  // @SYNC src/lib/craft-cms/fetch-content.ts, src/lib/craft-cms/types.ts
  if (entries.length > 0 && !entries[0]?.uri) {
    console.warn('fetch-content: No uri found in entries. Ensure your query returns an array of entries with a uri property')
    return [];
  }

  return entries;
}
