// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // 👈 Esto permite que las rutas funcionen bien en producción/Vercel
  plugins: [react()]
})

