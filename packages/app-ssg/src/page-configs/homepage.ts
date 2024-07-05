import { homepageUrl } from '@lib/craft-cms/url';

interface Entry {
  title: string;
  uri: string;
}

export interface Data {
  entries: Entry[];
}

export const cacheDirectory = 'homepage';

export const hasDynamicRoutes = false;

export const query = `{
  entries (uri: "${homepageUrl}") {
    title
    url
    uri
  }  
}`;

export const uriPrefix = '';
