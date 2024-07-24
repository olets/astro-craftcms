import { z } from 'zod';
import { createRouteConfig } from '@lib/craft-cms/create-config';

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

const config = createRouteConfig({ query, schema });

export default config;
