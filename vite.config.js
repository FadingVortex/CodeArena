import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'




// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    // 配置自动导入插件
    AutoImport({
      imports: ['vue', 'vue-router', 'vuex'], // 自动导入vue和vue-router相关函数
      resolvers:[ElementPlusResolver()]       // 指定要使用的组件解析器
    }),
    Components({resolvers:[ElementPlusResolver()]})   
  ],
  resolve: {
    alias: {'@': path.resolve(__dirname, './src'),},  
  },  
  server: {
    proxy: {
      '/hello-mycross': {
        target: 'http://localhost:8081', // 目标服务器
        changeOrigin: true, // 是否改变源地址
        rewrite: (path) => path.replace(/^\/hello-mycross/, ''),
      }
    }
  },
})
