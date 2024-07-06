import type { Config } from '@lib/craft-cms/types';
import { homepageUrl } from '@lib/craft-cms/url';

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
    entries (uri: "${homepageUrl}") {
      title
      url
      uri
    }
  }`,
};

export default config;
