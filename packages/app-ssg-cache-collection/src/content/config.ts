import { defineCollection } from 'astro:content';
import exampleRouteConfig from '@config/example-route';
import exampleChannelConfig from '@config/example-channel';
import exampleSingleConfig from '@config/example-single';
import exampleStructureConfig from '@config/example-structure';
import indexConfig from '@config/index';

/**
 * LIMITATION: cannot use dynamic keys (e.g. `[exampleRouteConfig.cacheKey]`)
 */
export const collections = {
  'example-route': defineCollection({
    type: 'data',
    schema: exampleRouteConfig.schema,
  }),
  'example-channel': defineCollection({
    type: 'data',
    schema: exampleChannelConfig.schema,
  }),
  'example-single': defineCollection({
    type: 'data',
    schema: exampleSingleConfig.schema,
  }),
  'example-structure': defineCollection({
    type: 'data',
    schema: exampleStructureConfig.schema,
  }),
  index: defineCollection({
    type: 'data',
    schema: indexConfig.schema,
  }),
};
