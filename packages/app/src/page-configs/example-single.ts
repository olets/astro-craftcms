const hasDynamicRoutes = false;

const sectionHandle = "exampleSingle";

const query = `{
  entries (section: "${sectionHandle}") {
    sectionHandle
    title
    uri
  }
}`

export interface Entry {
  sectionHandle: string;
  title: string;
  uri: string;
}

const uriPrefix = "example-single";

const config = { hasDynamicRoutes, query, sectionHandle, uriPrefix };

export default config;
