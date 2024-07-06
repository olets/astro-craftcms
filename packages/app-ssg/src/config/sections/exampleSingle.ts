export interface Entry {
  title: string;
  uri: string;
}

export interface Data {
  entries: Entry[];
}

export const cacheDirectory = 'sections__exampleSingle';

export const hasDynamicRoutes = false;

export const query = `{
  entries (uri: "example-single") {
    title
  }
}`;
