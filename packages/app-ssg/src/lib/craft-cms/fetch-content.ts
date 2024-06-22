export interface Props {
  query: string;
  url?: string;
}

export default async function fetchContent<T>({
  query,
  url = import.meta.env.CRAFT_CMS_GRAPHQL_URL,
}: Props): Promise<Array<T>> {
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
  }

  if (!json?.data) {
    console.warn('fetch-content: No data returned')
    return [];
  }

  const { entries }: { entries: T[] } = json.data;
  
  // @ts-ignore ts(2339)
  if (entries?.length > 0 && !entries[0]?.uri) {
    console.warn('fetch-content: No uri found in entries. Ensure your query returns an array of entries with a uri property')
    
    return [];
  }

  return entries;
}
