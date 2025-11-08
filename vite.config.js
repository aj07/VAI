import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Uncomment below if deploying to a subdirectory like /VAI/
  // base: '/VAI/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
