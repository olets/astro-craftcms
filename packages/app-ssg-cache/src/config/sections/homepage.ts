import type { Config } from '@lib/craft-cms/types';

interface Entry {
  exampleField: string;
  title: string;
}

interface OtherEntry {
  sectionHandle: string;
  title: string;
  typeHandle: string;
  uri: string;
}

export interface Data {
  entries: Entry[];
  otherEntries: OtherEntry[];
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
