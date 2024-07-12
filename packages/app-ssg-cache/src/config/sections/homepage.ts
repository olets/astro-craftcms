import type { Config } from '@lib/craft-cms/types';

interface Entry {
  title: string;
  uri: string;
}

export interface Data {
  entries: Entry[];
}

const config: Config = {
  cacheDirectory: 'sections__homepage',
  hasDynamicRoutes: false,
  query: `{
    entries(section: "homepage") {
      title
      ... on homepage_Entry {
        exampleField
      }
    }
  }`,
};

export default config;
