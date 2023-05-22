/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      exclude: [...configDefaults.exclude, 'main.tsx'],
      include: ['**/*.{jsx,tsx}'],
      all: true,
      src: ['src'],
      skipFull: false,
      provider: 'c8',
      reporter: ['text'],
    },
  },
  css: {
    devSourcemap: true,
  },
});
