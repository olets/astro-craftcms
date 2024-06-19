const hasDynamicRoutes = true;

const sectionHandle = "exampleChannel";

const queryArgs = `section: "${sectionHandle}"`;

const queryFields = `
  title
  url
`;

const uriPrefix = "example-channel";

const config = { hasDynamicRoutes, queryArgs, queryFields, sectionHandle, uriPrefix };

export default config;
