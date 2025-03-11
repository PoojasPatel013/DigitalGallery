import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: Number(import.meta.env.PORT) || 5173, // Convert PORT to a number and use 5173 as fallback
    host: '0.0.0.0', // Allow external access for Render
  },
  plugins: [react(),
    tailwindcss()
  ],
})
