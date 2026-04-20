/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint2'

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react(), eslint()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.js'
    }
  };
});