// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path'; // Make sure to import 'resolve' from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@', // Your alias (e.g., '@')
        replacement: resolve(__dirname, './src'), // Path to your 'src' directory
      },
    ],
  },
  base: '/',
});
