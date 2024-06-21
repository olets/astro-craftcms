const sectionHandle = "exampleChannel";

const query = `{
  entries (section: "${sectionHandle}") {
    sectionHandle
    title
    uri
    url
  }
}`

export interface Entry {
  sectionHandle: string;
  title: string;
  uri: string;
  url: string;
}

const uriPrefix = "example-channel";

const config = { query, sectionHandle, uriPrefix };

export default config;
