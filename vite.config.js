import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // 백엔드 연결 시 아래 proxy 설정 사용
    proxy: {
       '/api': 'http://localhost:3000'
    }
  }
})
