import type { Config } from '@lib/craft-cms/types';

export interface Data {
  entries: {
    sectionHandle: string;
    title: string;
    typeHandle: string;
    uri: string;
  }[];
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
