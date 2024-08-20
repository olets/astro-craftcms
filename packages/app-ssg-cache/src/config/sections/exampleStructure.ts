import { z } from 'zod';
import type { StructureConfig } from '@lib/craft-cms/types';

const query = `{
  entries (section: "exampleStructure") {
    children {
      title
      uri
    }
    parent {
      title
      uri
    }
    title
    uri
  }
}`;

const schema = z.object({
  entries: z
    .object({
      children: z
        .object({
          title: z.string(),
          uri: z.string(),
        })
        .array(),
      parent: z
        .object({
          title: z.string(),
          uri: z.string(),
        })
        .nullable(),
      title: z.string(),
      uri: z.string(),
    })
    .array(),
});

export default {
  cacheKey: 'sections__exampleStructure',
  query,
  schema,
  uriPrefix: 'example-structure',
} satisfies StructureConfig<typeof schema>;
