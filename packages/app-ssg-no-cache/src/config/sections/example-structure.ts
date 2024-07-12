import { z } from 'zod';

const entrySchema = z.object({
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
});

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
  entries: entrySchema.array().nonempty(),
});

const config = {
  entrySchema,
  query,
  querySchema,
  uriPrefix: 'example-structure',
};

export default config;
