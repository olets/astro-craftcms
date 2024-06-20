const hasDynamicRoutes = true;

const sectionHandle = "exampleStructure";

const query = `{
  entries (section: "${sectionHandle}") {
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
    sectionHandle
    title
    uri
  }
}`

const uriPrefix = "example-structure";

const config = { hasDynamicRoutes, query, sectionHandle, uriPrefix };

export default config;
