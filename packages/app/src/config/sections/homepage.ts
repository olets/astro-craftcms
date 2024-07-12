import { z } from 'zod';

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
  query,
  querySchema,
};

export default config;
