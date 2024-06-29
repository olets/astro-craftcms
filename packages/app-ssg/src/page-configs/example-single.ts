import type { BaseEntry } from '@lib/craft-cms/types';

export interface Entry extends BaseEntry {
  title: string;
  uri: string;
}

export const hasDynamicRoutes = false;

export const query = `{
  entries (section: "exampleSingle") {
    title
    uri
  }
}`;

export const uriPrefix = 'example-single';
