import { defineCollection } from 'astro:content';
import exampleChannelConfig from '@config/example-channel';
import exampleRouteConfig from '@config/example-route';
import exampleSingleConfig from '@config/example-single';
import exampleStructureConfig from '@config/example-structure';
import indexConfig from '@config/index';

/**
 * Note: cannot use dynamic keys in the `collections` object
 */
export const collections = {
  'example-channel': defineCollection({
    type: 'data',
    schema: exampleChannelConfig.schema,
  }),
  'example-route': defineCollection({
    type: 'data',
    schema: exampleRouteConfig.schema,
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
