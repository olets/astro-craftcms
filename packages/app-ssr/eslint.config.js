import { includeIgnoreFile } from '@eslint/compat';
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  includeIgnoreFile(`${meta.env.dirname}/.gitignore`),
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  ...eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
];
