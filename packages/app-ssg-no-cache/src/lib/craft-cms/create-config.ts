import { z } from 'zod';

const baseChannelOrStructureSchema = z.object({
  entries: z
    .object({
      uri: z.string(),
    })
    .array(),
});

const baseSingleSchema = z.object({
  entries: z.object({}).array(),
});

interface ChannelOrStructureConfigInputI<
  T extends typeof baseChannelOrStructureSchema,
> extends ConfigInputI<T> {
  uriPrefix: string;
}

export interface ChannelOrStructureConfigI<
  T extends typeof baseChannelOrStructureSchema,
> extends ChannelOrStructureConfigInputI<T> {
  hasDynamicRoutes: true;
}

interface ConfigInputI<T> {
  query: string;
  schema: T;
}

export interface RouteConfigI<T extends z.AnyZodObject>
  extends ConfigInputI<T> {
  hasDynamicRoutes: false;
}

interface SingleConfigInputI<T extends typeof baseSingleSchema>
  extends ConfigInputI<T> {}

export interface SingleConfigI<T extends typeof baseSingleSchema>
  extends SingleConfigInputI<T> {
  hasDynamicRoutes: false;
}

export function createChannelOrStructureConfig<
  T extends typeof baseChannelOrStructureSchema,
>(config: ChannelOrStructureConfigInputI<T>): ChannelOrStructureConfigI<T> {
  return {
    ...config,
    hasDynamicRoutes: true,
  };
}

export function createRouteConfig<T extends z.AnyZodObject>(
  config: ConfigInputI<T>,
): RouteConfigI<T> {
  return {
    ...config,
    hasDynamicRoutes: false,
  };
}

export function createSingleConfig<T extends typeof baseSingleSchema>(
  config: SingleConfigInputI<T>,
): SingleConfigI<T> {
  return {
    ...config,
    hasDynamicRoutes: false,
  };
}
