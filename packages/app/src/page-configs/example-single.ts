const hasDynamicRoutes = false;

const sectionHandle = "exampleSingle";

const queryArgs = `section: "${sectionHandle}"`;

const queryFields = `
  title
  sectionHandle
`;

const uriPrefix = "example-single";

const config = { hasDynamicRoutes, queryArgs, queryFields, sectionHandle, uriPrefix };

export default config;