import type { Config } from '@lib/craft-cms/types';

interface Entry {
  title: string;
  uri: string;
}

export interface Data {
  entries: Entry[];
}

const config: Config = {
  cacheDirectory: 'sections__exampleChannel',
  hasDynamicRoutes: true,
  query: `{
    entries (section: "exampleChannel") {
      title
      uri
      url
    }
  }`,
  uriPrefix: 'example-channel',
};

export default config;
