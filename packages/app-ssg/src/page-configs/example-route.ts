import type { BaseEntry } from '@lib/craft-cms/types';

export interface Entry extends BaseEntry {
  id: number;
  sectionHandle: string;
  sectionId: string;
  title: string;
  typeHandle: string;
  typeId: string;
}

export const hasDynamicRoutes = false;

export const query = `{
  entries {
    id
    sectionHandle
    sectionId
    title
    typeHandle
    typeId
    uri
  }
}`;

export const uriPrefix = 'example-route';
