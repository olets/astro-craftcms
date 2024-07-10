import type { Config } from '@lib/craft-cms/types';

export interface Data {
  entries: {
    title: string;
    uri: string;
  }[];
}

const config: Config = {
  cacheDirectory: 'sections__exampleSingle',
  hasDynamicRoutes: false,
  query: `{
    entries (uri: "example-single") {
      title
    }
  }`,
};

export default config;
