export const hasDynamicRoutes = false;

export const query = `{
  entries (section: "homepage") {
    title
    url
    uri
  }
}`;
