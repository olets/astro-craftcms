const hasDynamicRoutes = false;

const sectionHandle = "homepage";

const query = `{
  entries (section: "${sectionHandle}") {
    sectionHandle
    title
    url
    uri
  }
}`

const config = { hasDynamicRoutes, query, sectionHandle };

export default config;
