import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync, writeFileSync } from 'fs'
import * as sass from 'sass'

// 递归复制目录和文件的函数
const copyDir = (src: string, dest: string) => {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true })
  }
  
  const items = readdirSync(src)
  items.forEach(item => {
    const srcPath = resolve(src, item)
    const destPath = resolve(dest, item)
    
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      copyFileSync(srcPath, destPath)
      console.log(`复制样式文件: ${item}`)
    }
  })
}

// 编译 SCSS 为 CSS 的函数
const compileScssToCss = (scssPath: string, cssPath: string) => {
  try {
    const result = sass.compile(scssPath, {
      style: 'compressed',
      sourceMap: false
    })
    writeFileSync(cssPath, result.css)
    console.log(`编译样式文件: ${scssPath} -> ${cssPath}`)
  } catch (error) {
    console.error(`编译样式文件失败: ${scssPath}`, error)
  }
}

// 自定义插件：复制和编译样式文件
const copyStylesPlugin = () => {
  return {
    name: 'copy-styles',
    writeBundle() {
      const stylesDir = resolve(__dirname, 'styles')
      const distStylesDir = resolve(__dirname, 'dist/styles')
      
      // 复制整个样式目录
      copyDir(stylesDir, distStylesDir)
      
      // 编译主样式文件为 CSS
      const mainScssPath = resolve(stylesDir, 'index.scss')
      const mainCssPath = resolve(distStylesDir, 'index.css')
      
      if (existsSync(mainScssPath)) {
        compileScssToCss(mainScssPath, mainCssPath)
      }
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: '.',
      include: ['**/*.ts', '**/*.vue'],
      exclude: ['vite.config.ts', '**/*.test.ts', 'node_modules/**/*'],
      outDir: 'dist',
      insertTypesEntry: true,
      cleanVueFileName: true,
      copyDtsFiles: true
    }),
    copyStylesPlugin()
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'index.ts'),
        'components/index': resolve(__dirname, 'components/index.ts'),
        'hooks/index': resolve(__dirname, 'hooks/index.ts'),
        'utils/index': resolve(__dirname, 'utils/index.ts'),
        'directive/index': resolve(__dirname, 'directive/index.ts'),
      },
      name: 'hnyUi',
      fileName: (format, entryName) => {
        return `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`
      },
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: { vue: 'Vue' },
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    }
  }
})
