const hasDynamicRoutes = false;

const query = `{
  entries (section: "homepage") {
    title
    url
    uri
  }
}`

const config = { hasDynamicRoutes, query };

export default config;
