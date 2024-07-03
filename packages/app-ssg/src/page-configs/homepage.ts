interface Entry {
  title: string;
  uri: string;
}

export interface Data {
  entries: Entry[];
}

export const cacheDirectory = 'homepage';

export const hasDynamicRoutes = false;

export const query = `{
  entries (section: "homepage") {
    title
    url
    uri
  }  
}`;

export const uriPrefix = '';
