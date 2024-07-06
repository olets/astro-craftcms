import { Glob } from 'bun';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchAPI } from '@lib/craft-cms/fetch';
import type { Config } from '@lib/craft-cms/types';

interface Entry {
  uri?: string;
  [key: string]: unknown;
}

interface Data {
  entries?: Entry[];
  [key: string]: unknown;
}

interface CacheDataProps {
  dir: string;
  data: Data;
}

export interface CacheStaticPathsProps {
  dir: string;
  data: Data;
  uriPrefix?: string;
}

await cache();

async function cache() {
  const fileSuffix = '.ts';

  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  const pattern = path.join(dirname, `/../src/config/**/*${fileSuffix}`);
  const glob = new Glob(pattern);

  for await (const file of glob.scan('.')) {
    const {
      cacheDirectory,
      hasDynamicRoutes,
      query,
      uriPrefix = '',
    } = await import(file).then((m) => m.default as Config);

    const data = (await fetchAPI(query)) as Data;

    if (data === undefined) {
      console.warn(`No data returned for ${file}`);
      continue;
    }

    const dir = await makeCacheDirectory(cacheDirectory);

    await cacheData({ dir, data });

    if (hasDynamicRoutes) {
      await cacheStaticPaths({
        dir,
        data,
        uriPrefix,
      });
    }

    console.log(`Data fetched and cached for ${file}`);
  }
}

async function cacheData({ dir, data }: CacheDataProps): Promise<void> {
  const file = path.join(dir, 'data.json');

  writeFileSync(file, [JSON.stringify(data), ''].join('\n'));
}

async function cacheStaticPaths({
  dir,
  data,
  uriPrefix,
}: CacheStaticPathsProps): Promise<void> {
  const { entries = [] } = data;

  const staticPaths = entries
    .map((entry) => {
      if (entry.uri === undefined) {
        return undefined;
      }

      let slug = entry.uri;

      if (uriPrefix) {
        slug = slug.replace(new RegExp(`^${uriPrefix}/`), '');
      }

      return { params: { slug: slug } };
    })
    .filter((v) => v !== undefined);

  const file = path.join(dir, 'static-paths.json');

  writeFileSync(
    file,
    [
      JSON.stringify(staticPaths).replace(
        '"params":{}',
        '"params":{"slug":undefined}',
      ),
      '',
    ].join('\n'),
  );
}

async function makeCacheDirectory(cacheDirectory = ''): Promise<string> {
  const dir = path.join('src/cache', cacheDirectory);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  return dir;
}
