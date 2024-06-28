export const hasDynamicRoutes = true;

export const query = `{
  entries (section: "exampleChannel") {
    title
    uri
    url
  }
}`;

export const uriPrefix = 'example-channel';
