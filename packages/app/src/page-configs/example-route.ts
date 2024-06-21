const hasDynamicRoutes = false;

const query = `{
  entries {
    id
    sectionHandle
    sectionId
    title
    typeHandle
    typeId
    uri
  }
}`

export interface Entry {
  id: number;
  sectionHandle: string;
  sectionId: string;
  title: string;
  typeHandle: string;
  typeId: string;
  uri: string;
}

const uriPrefix = "example-route";

const config = { hasDynamicRoutes, query, uriPrefix };

export default config;
