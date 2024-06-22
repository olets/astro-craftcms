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

const uriPrefix = "example-route";

const config = { hasDynamicRoutes, query, uriPrefix };

export default config;
