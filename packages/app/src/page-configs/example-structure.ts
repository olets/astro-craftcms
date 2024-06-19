const hasDynamicRoutes = true;

const sectionHandle = "exampleStructure";

const queryArgs = `section: "${sectionHandle}"`;

const queryFields = `
  title
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
`;

const uriPrefix = "example-structure";

const config = { hasDynamicRoutes, queryArgs, queryFields, sectionHandle, uriPrefix };

export default config;