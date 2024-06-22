const hasDynamicRoutes = true;

const query = `{
  entries (section: "exampleStructure") {
    children {
      id
      title
      uri
    }
    parent {
      id
      title
      uri
    }
    title
    uri
  }
}`

const uriPrefix = "example-structure";

const config = { hasDynamicRoutes, query, uriPrefix };

export default config;
