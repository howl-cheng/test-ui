import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import pxtorem from 'postcss-pxtorem'
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
  css: {
    postcss: {
      plugins: [
        pxtorem({
          // 1rem = 100px（结合 src/utils/rem.js 中的 baseSize）
          rootValue: 100,
          propList: ['*'],
          mediaQuery: false,
          // 不排除 node_modules，确保第三方样式也会被转换
          // 如需排除，可设置为 /ignore/i 或函数
          replace: true,
          minPixelValue: 1,
          unitPrecision: 6,
          selectorBlackList: ['van']
        })
      ]
    },
  },
  server: {
    proxy: {
      '/dev-api': {
        target: 'http://192.168.0.5:8889',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ''),
      },
    },
  },
})
