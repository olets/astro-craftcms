const hasDynamicRoutes = false;

const sectionHandle = "exampleSingle";

const query = `{
  entries (section: "${sectionHandle}") {
    sectionHandle
    title
    uri
  }
}`

const uriPrefix = "example-single";

const config = { hasDynamicRoutes, query, sectionHandle, uriPrefix };

export default config;
