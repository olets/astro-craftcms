import { z } from 'zod';
import type { ChannelConfig } from '@lib/craft-cms/types';

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

export default {
  query,
  schema,
  uriPrefix: 'example-channel',
} satisfies ChannelConfig<typeof schema>;
