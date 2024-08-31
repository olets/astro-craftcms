import { Glob } from 'bun';
import { createHash } from 'node:crypto';
import { exists, mkdir } from 'node:fs/promises';
import path from 'node:path';
import fetchAPI from '@lib/craft-cms/fetch-api';
import staticPaths from '@lib/craft-cms/static-paths';

await cache();

/**
 * Fetch and cache Craft CMS data.
 */
async function cache() {
  const pattern = path.join(import.meta.dirname, `../src/config/**/*.ts`);

  const glob = new Glob(pattern);

  for await (const file of glob.scan('.')) {
    console.log(`${file}`);
    console.log(`    Processing`);

    /**
     * See src/lib/craft-cms/types.ts's ChannelConfig and RouteConfig
     */
    const { cacheKey, query, schema, uriPrefix } = await import(file).then(
      (m) => m.default,
    );

    const data = await fetchAPI({ query, schema });

    if (data === undefined) {
      console.warn(`    No data returned`);
      continue;
    }

    const dir = await makeCacheDirectory(cacheDirName(cacheKey, data));

    /**
     * Cache fetched data
     */
    await Bun.write(`${dir}/data.json`, JSON.stringify(data));

    if (uriPrefix) {
      /**
       * Cache static paths for dynamic routes
       * See src/lib/craft-cms/types.ts's ChannelConfig
       */
      await Bun.write(
        `${dir}/static-paths.json`,
        JSON.stringify(await staticPaths({ data, uriPrefix })),
      );
    }

    console.log(`    Data fetched and cached`);
    console.log();
  }
}

function cacheDirName(cacheKey: string, data: any): string {
  /**
   * DUPE src/pages/**.astro
   */
  const hash = createHash('sha256');

  hash.update(JSON.stringify(data));

  return `${cacheKey}__${hash.digest('hex')}`;
}

/**
 * Make a directory for cache data
 *
 * @param cacheDirectory the directory to create in the parent caches' directory
 * @returns
 */
async function makeCacheDirectory(cacheDirectory = ''): Promise<string> {
  const dir = `src/cache/${cacheDirectory}`;

  if (await exists(dir)) {
    return dir;
  }

  await mkdir(dir, { recursive: true });

  return dir;
}
