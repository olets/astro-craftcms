import { z } from 'zod';

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
    .array()
    .nonempty(),
});

const config = {
  entrySchema,
  query,
  querySchema,
  uriPrefix: 'example-channel',
};

export default config;
