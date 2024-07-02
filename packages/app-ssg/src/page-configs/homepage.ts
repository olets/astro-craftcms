export interface Entry {
  title: string;
  uri: string;
}

export const hasDynamicRoutes = false;

export const query = `{
  entries (section: "homepage") {
    title
    url
    uri
  }
}`;
