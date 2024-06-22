const hasDynamicRoutes = true;

const query = `{
  entries (section: "exampleChannel") {
    title
    uri
    url
  }
}`

const uriPrefix = "example-channel";

const config = { hasDynamicRoutes, query, uriPrefix };

export default config;
