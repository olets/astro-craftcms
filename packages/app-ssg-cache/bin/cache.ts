import { $, Glob } from 'bun';
import path from 'node:path';
import fetchAPI from '@lib/craft-cms/fetch-api';

await cache();

/**
 * Fetch and cache Craft CMS data.
 */
async function cache() {
  const pattern = path.join(import.meta.dirname, '../src/config/**/*.ts');

  const glob = new Glob(pattern);

  for await (const file of glob.scan('.')) {
    const basename = (await $`basename ${file}`.text()).trim();
    const indentation = '    ';

    console.log(`src/config/${basename}`);
    console.log(`${indentation}Processing`);

    const basenameWithoutExtension = basename.replace(/\.ts$/, '');

    /**
     * See src/lib/craft-cms/types.ts's ChannelConfig and RouteConfig
     */
    const { query, schema } = await import(file).then((m) => m.default);

    const data = await fetchAPI({ query, schema });

    if (data === undefined) {
      console.warn(`${indentation}No data returned`);
      continue;
    }

    await Bun.write(
      `src/content/${basenameWithoutExtension}/cms-cache.json`,
      JSON.stringify({
        $schema: `../../../.astro/collections/${basenameWithoutExtension}.schema.json`,
        ...data,
      }),
    );

    console.log(`${indentation}Data fetched and cached\n`);
  }
}
