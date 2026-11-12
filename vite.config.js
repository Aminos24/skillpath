
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Vite configuration for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/skillpath/',
})
