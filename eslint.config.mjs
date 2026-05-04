import astroPlugin from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';
import astroParser from 'astro-eslint-parser';
import prettierPlugin from 'eslint-plugin-prettier/recommended';

export default [
  // Configurações base do Astro
  ...astroPlugin.configs.recommended,

  // Integração com Prettier
  prettierPlugin,
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
        sourceType: 'module',
      },
    },
    rules: {
      // Regras personalizadas para Astro aqui
    },
  },

  {
    // Ignorar pastas de build e cache
    ignores: ['dist/', '.astro/', 'node_modules/', 'public/'],
  },
];
