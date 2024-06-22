const hasDynamicRoutes = true;

const sectionHandle = "exampleChannel";

const query = `{
  entries (section: "${sectionHandle}") {
    sectionHandle
    title
    uri
    url
  }
}`

const uriPrefix = "example-channel";

const config = { hasDynamicRoutes, query, sectionHandle, uriPrefix };

export default config;
