import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // 👈 Esto es esencial para rutas relativas en producción
  plugins: [react()]
})
