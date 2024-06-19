const hasDynamicRoutes = false;

const queryFields = `
  id
  sectionHandle
  sectionId
  title
  typeHandle
  typeId
  uri
`;

const uriPrefix = "example-route";

const config = { hasDynamicRoutes, queryFields, uriPrefix };

export default config;
