import { z } from 'zod';
import { createSingleConfig } from '@lib/craft-cms/create-config';

export interface Data {
  entries: {
    title: string;
    uri: string;
  }[];
}
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
    })
    .array(),
});

const config = createSingleConfig({
  cacheDirectory: 'sections__exampleSingle',
  query,
  querySchema,
});

export default config;
