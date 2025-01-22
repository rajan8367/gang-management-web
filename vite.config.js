import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    devSourcemap: false, // Disable CSS source maps in development
  },
  build: {
    outDir: 'dist', // Output directory for the build
    rollupOptions: {
      // Rollup options for advanced configuration
    }
  },
  plugins: [react()],
})
