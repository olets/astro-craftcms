import { z } from 'zod';
import { createSingleConfig } from '@lib/craft-cms/create-config';

const query = `{
  entries (section: "exampleSingle") {
    title
    uri
  }
}`;

const querySchema = z.object({
  entries: z
    .object({
      title: z.string(),
      uri: z.string(),
    })
    .array(),
});

const config = createSingleConfig({
  query,
  querySchema,
});

export default config;
