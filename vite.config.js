import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    server: {
        port: 5173,  // 前端端口改为 5173，避免和后端冲突
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',  // 后端地址
                changeOrigin: true
            }
        }
    }
})
