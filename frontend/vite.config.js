import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: Number(import.meta.env.VITE_PORT) || 5173, // Use VITE_PORT from .env file
    host: '0.0.0.0'
  },
  plugins: [react(),
    tailwindcss()
  ],
})
