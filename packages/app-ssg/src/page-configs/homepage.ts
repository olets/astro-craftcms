const hasDynamicRoutes = false;

const sectionHandle = "homepage";

const query = `{
  entries (section: "${sectionHandle}") {
    sectionHandle
    title
    url
    uri
  }
}`

export interface Entry {
  sectionHandle: string;
  title: string;
  url: string;
  uri: string;
}

const config = { hasDynamicRoutes, query, sectionHandle };

export default config;
