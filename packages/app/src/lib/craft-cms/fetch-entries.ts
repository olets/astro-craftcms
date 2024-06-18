export interface Props {
  args?: string;
  fieldsBesidesUri?: string;
  url?: string;
}

export interface Entry {
  uri: string;
  [key: string]: string | number | boolean | null;
}

export default async function fetchEntries({
  args,
  fieldsBesidesUri,
  url = import.meta.env.CRAFT_CMS_GRAPHQL_URL,
}: Props): Promise<Array<Entry>> {
  const query = `{
    entries ${args ? `(${args})` : ""} {
      uri
      ${fieldsBesidesUri || ""}
    }
  }`;

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
