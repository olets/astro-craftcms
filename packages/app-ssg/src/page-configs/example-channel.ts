export interface Entry {
  title: string;
  uri: string;
}

export const hasDynamicRoutes = true;

export const query = `{
  entries (section: "exampleChannel") {
    title
    uri
    url
  }
}`;

export const uriPrefix = 'example-channel';
