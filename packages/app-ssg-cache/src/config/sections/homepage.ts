import { z } from 'zod';

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

const config = {
  cacheDirectory: 'sections__homepage',
  hasDynamicRoutes: false,
  query,
  querySchema,
};

export default config;
