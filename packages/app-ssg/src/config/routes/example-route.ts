export interface Entry {
  id: number;
  sectionHandle: string;
  sectionId: string;
  title: string;
  typeHandle: string;
  typeId: string;
  uri: string;
}

export interface Data {
  entries: Entry[];
}

export const cacheDirectory = 'routes__example-route';

export const hasDynamicRoutes = false;

export const query = `{
  entries {
    id
    sectionHandle
    sectionId
    title
    typeHandle
    typeId
    uri
  }
}`;
