import { z } from 'zod';

const channelSchema = z.object({
  entries: z
    .object({
      uri: z.string(),
    })
    .array(),
});

const routeSchema = z.object({});

const singleSchema = z.object({
  entries: z.object({}).array(),
});

interface Config<T> {
  query: string;
  schema: T;
}

export interface ChannelConfig<T extends typeof channelSchema>
  extends Config<T> {
  uriPrefix: string;
}

export interface RouteConfig<T extends typeof routeSchema> extends Config<T> {}

export interface SingleConfig<T extends typeof singleSchema>
  extends Config<T> {}

export interface StructureConfig<T extends typeof channelSchema>
  extends ChannelConfig<T> {}
