import { Glob } from 'bun';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import fetchAPI from '@lib/craft-cms/fetch-api';
import staticPaths from '@lib/craft-cms/static-paths';

await cache();

/**
 * Fetch and cache Craft CMS data.
 */
async function cache() {
  const fileSuffix = '.ts';

  const glob = new Glob(
    `${import.meta.dirname}/../src/config/**/*${fileSuffix}`.replace('//', '/'),
  );

  for await (const file of glob.scan('.')) {
    console.log(`Processing ${file}`);
    const {
      cacheDirectory,
      hasDynamicRoutes,
      query,
      querySchema,
      uriPrefix = '',
    } = await import(file).then((m) => m.default);

    const data = await fetchAPI({ query, schema: querySchema });

    if (data === undefined) {
      console.warn(`No data returned for ${file}`);
      continue;
    }

    const dir = await makeCacheDirectory(cacheDirectory);

    /**
     * Cache fetched data
     */
    writeFileSync(`${dir}/data.json`, [JSON.stringify(data), ''].join('\n'));

    if (hasDynamicRoutes) {
      /**
       * Cache static paths for dynamic routes
       */
      writeFileSync(
        `${dir}/static-paths.json`,
        [
          JSON.stringify(
            await staticPaths({ entries: data?.entries, uriPrefix }),
          ),
          '',
        ].join('\n'),
      );
    }

    console.log(`Data fetched and cached for ${file}`);
  }
}

/**
 * Make a directory for cache data
 *
 * @param cacheDirectory the directory to create in the parent caches' directory
 * @returns
 */
async function makeCacheDirectory(cacheDirectory = ''): Promise<string> {
  const dir = `src/cache/${cacheDirectory}`;

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  return dir;
}
