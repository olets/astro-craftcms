export interface Entry {
  title: string;
  uri: string;
}

export interface Data {
  entries: Entry[];
}

export const cacheDirectory = 'sections__exampleChannel';

export const hasDynamicRoutes = true;

export const query = `{
  entries (section: "exampleChannel") {
    title
    uri
    url
  }
}`;

export const uriPrefix = 'example-channel';
