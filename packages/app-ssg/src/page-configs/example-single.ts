const hasDynamicRoutes = false;

const query = `{
  entries (section: "exampleSingle") {
    title
    uri
  }
}`

const uriPrefix = "example-single";

const config = { hasDynamicRoutes, query, uriPrefix };

export default config;
