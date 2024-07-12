import { z } from 'zod';

const entrySchema = z.object({
  title: z.string(),
  uri: z.string(),
});

const query = `{
  entries (section: "exampleChannel") {
    title
    uri
  }
}`;

const querySchema = z.object({
  entries: entrySchema.array().nonempty(),
});

const config = {
  entrySchema,
  query,
  querySchema,
  uriPrefix: 'example-channel',
};

export default config;
