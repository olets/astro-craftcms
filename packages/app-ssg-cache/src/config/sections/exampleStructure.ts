import type { Config } from '@lib/craft-cms/types';

interface Child {
  id: number;
  title: string;
  uri: string;
}

interface Parent {
  id: number;
  title: string;
  uri: string;
}

export interface Entry {
  children: Child[];
  parent: Parent;
  title: string;
  uri: string;
}

export interface Data {
  entries: Entry[];
}

const config: Config = {
  cacheDirectory: 'sections__exampleStructure',
  hasDynamicRoutes: true,
  query: `{
    entries (section: "exampleStructure") {
      children {
        id
        title
        uri
      }  
      parent {
        id
        title
        uri
      }  
      title
      uri
    }  
  }`,
  uriPrefix: 'example-structure',
};

export default config;
