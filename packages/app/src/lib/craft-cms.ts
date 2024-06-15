export interface Props {
  additionalArguments?: string,
  additionalFields?: string,
  section: string,
}

export default async function fetchApi({ additionalArguments, additionalFields, section }: Props): Promise<Array<object>> {
  const query = `{
    entries (${[
      section ? `section: "${section}"` : "",
      additionalArguments,
    ].join(', ')}) {
      slug
      uri
      ${additionalFields}
    }
  }`

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
