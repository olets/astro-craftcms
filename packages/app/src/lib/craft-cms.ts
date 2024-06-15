export default async function fetchApi(query: string): Promise<Array<object>> {
  const response = await fetch(import.meta.env.CRAFT_CMS_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
    }),
  });

  const json = await response.json();

  const { entries }: { entries: Array<object> } = json.data;

  return entries;
}
