export default async function fetchApi<Entry>(query: string): Promise<Array<Entry>> {
  const response = await fetch(import.meta.env.CRAFT_CMS_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
    }),
  });

  const json = await response.json();

  const { entries }: { entries: Array<Entry> } = json.data;

  return entries;
}
