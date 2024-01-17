import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:3000',
        changeOrigin: true,
        secure: false, // Установите в true, если ваш сервер самоподписанный
      },
    },
    https: {
      key: './CRMServe-private.key',
      cert: './CRMServe.crt',
    }
  },
  plugins: [react()],
})
