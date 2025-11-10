import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      dts: true
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'hny-ui': resolve(__dirname, '../packages/index.ts'),
      'hny-ui-styles': resolve(__dirname, '../packages/styles/index.scss'),
    },
  },
})
