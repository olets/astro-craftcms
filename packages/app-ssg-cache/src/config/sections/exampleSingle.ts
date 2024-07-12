import { z } from 'zod';

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
  cacheDirectory: 'sections__exampleSingle',
  hasDynamicRoutes: false,
  query,
  querySchema,
};

export default config;
