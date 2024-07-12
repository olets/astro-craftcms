import { z } from 'zod';

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
    .array()
    .nonempty(),
});

const config = {
  query,
  querySchema,
};

export default config;
