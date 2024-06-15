import { $, Glob } from "bun";

const glob = new Glob("src/pages/**/cache-data.ts");

for await (const file of glob.scan(".")) {
  await $`bun ${file}`
}
