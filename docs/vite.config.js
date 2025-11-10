import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import pxtorem from 'postcss-pxtorem'

export default defineConfig({

  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]',
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: true
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
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
    preprocessorOptions: {
      scss: {
        api: "modern-compiler"
      }
    }
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:8088',
        changeOrigin: true,
        ws: true,
        rewrite: (p) => p.replace(/^\/api/, '')
      }
    },
  },
})
