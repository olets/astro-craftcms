import { z } from 'zod';
import type { SingleConfig } from '@lib/craft-cms/types';

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

const schema = z.object({
  entries: z
    .object({
      title: z.string(),
    })
    .array(),
});

export default {
  query,
  schema,
} satisfies SingleConfig<typeof schema>;
