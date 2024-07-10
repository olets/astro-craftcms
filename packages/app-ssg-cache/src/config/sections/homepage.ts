import type { Config } from '@lib/craft-cms/types';

export interface Data {
  entries: {
    exampleField: string;
    title: string;
  }[];
  otherEntries: {
    sectionHandle: string;
    title: string;
    typeHandle: string;
    uri: string;
  }[];
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
    otherEntries: entries {
      sectionHandle
      title
      typeHandle
      uri
    }
  }`,
};

export default config;
