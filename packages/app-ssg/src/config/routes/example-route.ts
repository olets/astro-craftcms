import type { Config } from '@lib/craft-cms/types';

interface Entry {
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

const config: Config = {
  cacheDirectory: 'routes__example-route',
  hasDynamicRoutes: false,
  query: `{
    entries {
      id
      sectionHandle
      sectionId
      title
      typeHandle
      typeId
      uri
    }
  }`,
};

export default config;
