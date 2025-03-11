import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: import.meta.env.PORT || 5173, // Use Render's port or fallback to 5173
    host: '0.0.0.0', // Ensure it listens on all interfaces
  },

  plugins: [react(),
    tailwindcss()
  ],
})
