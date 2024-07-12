import { z } from 'zod';

const query = `{
  entries {
    sectionHandle
    title
    typeHandle
    uri
  }
}`;

const querySchema = z.object({
  entries: z
    .object({
      sectionHandle: z.string(),
      title: z.string(),
      typeHandle: z.string(),
      uri: z.string(),
    })
    .array(),
});

const config = {
  cacheDirectory: 'routes__example-route',
  hasDynamicRoutes: false,
  query,
  querySchema,
};

export default config;
