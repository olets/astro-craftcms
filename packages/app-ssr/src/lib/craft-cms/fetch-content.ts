export interface BaseEntry {
  uri: string;
}

export default async function fetchContent(query: string): Promise<Array<BaseEntry>> {
  const url = import.meta.env.CRAFT_CMS_GRAPHQL_URL;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
    }),
  });

  const json = await response.json();

  for (const { message } of json.errors || []) {
    throw new Error(message);
  }

  const { entries }: { entries: Array<BaseEntry> } = json.data;

  return entries;
}
