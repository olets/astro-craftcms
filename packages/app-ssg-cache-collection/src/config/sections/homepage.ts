import { z } from 'zod';
import type { SingleConfig } from '@lib/craft-cms/types';

export interface Data {
  entries: {
    exampleField: string;
    title: string;
  }[];
  otherEntries: {
    sectionHandle: string;
    title: string;
    typeHandle: string;
    uri: string;
  }[];
}

const query = `{
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
}`;

const schema = z.object({
  entries: z
    .object({
      exampleField: z.string(),
      title: z.string(),
    })
    .array(),
  otherEntries: z
    .object({
      sectionHandle: z.string(),
      title: z.string(),
      typeHandle: z.string(),
      uri: z.string(),
    })
    .array(),
});

export default {
  cacheKey: 'sections__homepage',
  query,
  schema,
} satisfies SingleConfig<typeof schema>;
