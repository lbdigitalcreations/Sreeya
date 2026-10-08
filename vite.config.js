import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Sreeya/',
  server: {
    port: 8000,
    open: true
  }
})
