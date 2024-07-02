export interface Entry {
  title: string;
  uri: string;
}

export const hasDynamicRoutes = false;

export const query = `{
  entries (section: "exampleSingle") {
    title
    uri
  }
}`;

export interface Data {
  entries: Entry[];
}

export const uriPrefix = 'example-single';
