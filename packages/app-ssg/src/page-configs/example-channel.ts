import type { BaseEntry } from '@lib/craft-cms/types';

export interface Entry extends BaseEntry {
  title: string;
  url: string;
}

export const hasDynamicRoutes = true;

export const query = `{
  entries (section: "exampleChannel") {
    title
    uri
    url
  }
}`;

export const uriPrefix = 'example-channel';
