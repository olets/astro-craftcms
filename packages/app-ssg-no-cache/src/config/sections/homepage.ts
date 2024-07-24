import { z } from 'zod';
import { createSingleConfig } from '@lib/craft-cms/create-config';

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

const config = createSingleConfig({ query, schema });

export default config;
