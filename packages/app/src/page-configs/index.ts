const hasDynamicRoutes = false;

const sectionHandle = "homepage";

const queryArgs = `section: "${sectionHandle}"`;

const queryFields = `
  title
  url
`;

const config = { hasDynamicRoutes, queryArgs, queryFields, sectionHandle };

export default config;
