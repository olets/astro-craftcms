import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: import.meta.env.DEV ? 'server' : 'static',
});