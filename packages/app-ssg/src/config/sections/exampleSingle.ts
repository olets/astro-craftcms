import type { Config } from '@lib/craft-cms/types';

interface Entry {
  title: string;
  uri: string;
}

export interface Data {
  entries: Entry[];
}

const config: Config = {
  cacheDirectory: 'sections__exampleSingle',
  hasDynamicRoutes: false,
  query: `{
    entries (uri: "example-single") {
      title
    }
  }`,
  uriPrefix: 'example-channel',
};

export default config;
