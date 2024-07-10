import type { Config } from '@lib/craft-cms/types';
export interface Entry {
  children: {
    id: number;
    title: string;
    uri: string;
  }[];
  parent: {
    id: number;
    title: string;
    uri: string;
  };
  title: string;
  uri: string;
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
