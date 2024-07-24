import { z } from 'zod';
import { createChannelOrStructureConfig } from '@lib/craft-cms/create-config';

const query = `{
  entries (section: "exampleChannel") {
    title
    uri
  }
}`;

const schema = z.object({
  entries: z
    .object({
      title: z.string(),
      uri: z.string(),
    })
    .array(),
});

const config = createChannelOrStructureConfig({
  query,
  schema,
  uriPrefix: 'example-channel',
});

export default config;
