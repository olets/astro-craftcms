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

const config = { query, sectionHandle };

export default config;
