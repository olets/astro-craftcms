import { z } from 'zod';
import type { RouteConfig } from '@lib/craft-cms/types';

const query = `{
  entries {
    sectionHandle
    title
    typeHandle
    uri
  }
}`;

const schema = z.object({
  entries: z
    .object({
      sectionHandle: z.string(),
      title: z.string(),
      typeHandle: z.string(),
      uri: z.string(),
    })
    .array(),
});

export default {
  cacheDirectory: 'routes__example-route',
  hasDynamicRoutes: false,
  query,
  schema,
} satisfies RouteConfig<typeof schema>;
