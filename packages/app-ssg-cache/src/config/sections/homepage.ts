import { z } from 'zod';
import { createSingleConfig } from '@lib/craft-cms/create-config';

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

const querySchema = z.object({
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

const config = createSingleConfig({
  cacheDirectory: 'sections__homepage',
  query,
  querySchema,
});

export default config;
