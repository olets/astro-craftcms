export interface Props {
  query: string;
  url?: string;
}

export interface Entry {
  sectionHandle: string;
  uri: string;
  [key: string]: string | number | boolean | null;
}

export default async function fetchContent({
  query,
  url = import.meta.env.CRAFT_CMS_GRAPHQL_URL,
}: Props): Promise<Array<Entry>> {
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

  const { entries }: { entries: Array<Entry> } = json.data;

  return entries;
}
