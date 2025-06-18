import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {port: 5000},
  build: {
    outDir: 'dist' // make sure Render publishes from here
  },
  // This enables proper client-side routing in Render
  base: '/',
})
