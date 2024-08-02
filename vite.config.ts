/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // base: '/RS-React-Course-2024Q3/',
  plugins: [react()],
  test: {
    globals: true,
    css: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      enabled: true,
      all: true,
      reporter: ['text'],
      include: ["src/**/*.tsx", "src/**/*.ts"],
      exclude: [
        "src/vite-env.d.ts",
        "src/pages/_document.tsx",
        "src/pages/api/hello.ts",
      ],
    },
  },
});