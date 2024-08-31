import { defineCollection } from 'astro:content';
import exampleRouteConfig from '@config/routes/example-route';
import exampleChannelConfig from '@config/sections/exampleChannel';
import exampleSingleConfig from '@config/sections/exampleSingle';
import exampleStructureConfig from '@config/sections/exampleStructure';
import homepage from '@config/sections/homepage';

/**
 * LIMITATION: cannot use dynamic keys (e.g. `[exampleRouteConfig.cacheKey]`)
 */
export const collections = {
  routes__example_route: defineCollection({
    type: 'data',
    schema: exampleRouteConfig.schema,
  }),
  sections__exampleChannel: defineCollection({
    type: 'data',
    schema: exampleChannelConfig.schema,
  }),
  sections__exampleSingle: defineCollection({
    type: 'data',
    schema: exampleSingleConfig.schema,
  }),
  sections__exampleStructure: defineCollection({
    type: 'data',
    schema: exampleStructureConfig.schema,
  }),
  sections__homepage: defineCollection({
    type: 'data',
    schema: homepage.schema,
  }),
};
