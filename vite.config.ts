import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// metti qui il tuo host esatto (quello mostrato nel messaggio “Blocked request…”)
const RAILWAY_HOST = 'cloudinary-textoverlay-generator2-production.up.railway.app'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    // Vite 6 richiede di whitelistarli
    allowedHosts: [RAILWAY_HOST, /\.railway\.app$/],
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: [RAILWAY_HOST, /\.railway\.app$/],
  },
})
