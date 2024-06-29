import type { BaseEntry } from '@lib/craft-cms/types';

export interface Entry extends BaseEntry {
  title: string;
  url: string;
}

export const hasDynamicRoutes = false;

export const query = `{
  entries (section: "homepage") {
    title
    url
    uri
  }
}`;
