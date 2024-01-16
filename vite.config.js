import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    https:{
      key: './CRMServe-private.key',
      cert: './CRMServe.crt',
    }
  },
  plugins: [react()],
})
