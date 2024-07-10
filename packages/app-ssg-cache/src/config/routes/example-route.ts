import type { Config } from '@lib/craft-cms/types';

interface Entry {
  sectionHandle: string;
  title: string;
  typeHandle: string;
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
      sectionHandle
      title
      typeHandle
      uri
    }
  }`,
};

export default config;
