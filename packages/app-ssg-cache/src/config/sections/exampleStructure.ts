import { z } from 'zod';
import { createChannelOrStructureConfig } from '@lib/craft-cms/create-config';

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

const querySchema = z.object({
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

const config = createChannelOrStructureConfig({
  cacheDirectory: 'sections__exampleStructure',
  query,
  querySchema,
  uriPrefix: 'example-structure',
});

export default config;
