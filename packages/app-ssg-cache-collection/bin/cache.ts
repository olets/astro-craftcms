import { $, Glob } from 'bun';
import path from 'node:path';
import fetchAPI from '@lib/craft-cms/fetch-api';

await cache();

/**
 * Fetch and cache Craft CMS data.
 */
async function cache() {
  const pattern = path.join(import.meta.dirname, `../src/config/**/*.ts`);

  const glob = new Glob(pattern);

  for await (const file of glob.scan('.')) {
    console.log(`Processing ${file}`);
    const basename = (await $`basename ${file}`.text())
      .trim()
      .replace(/\.ts$/, '');

    /**
     * See src/lib/craft-cms/types.ts's ChannelConfig and RouteConfig
     */
    const { query, schema } = await import(file).then((m) => m.default);

    const data = await fetchAPI({ query, schema });

    if (data === undefined) {
      console.warn(`No data returned for ${file}`);
      continue;
    }

    await Bun.write(
      `src/content/${basename}/data.json`,
      JSON.stringify({
        $schema: `../../../.astro/collections/${basename}.schema.json`,
        ...data,
      }),
    );

    console.log(`Data fetched and cached for ${file}`);
  }
}
