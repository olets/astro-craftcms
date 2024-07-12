import { z } from 'zod';
import { createChannelOrStructureConfig } from '@lib/craft-cms/create-config';

const query = `{
  entries (section: "exampleChannel") {
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

const config = createChannelOrStructureConfig({
  cacheDirectory: 'sections__exampleChannel',
  query,
  querySchema,
  uriPrefix: 'example-channel',
});

export default config;
