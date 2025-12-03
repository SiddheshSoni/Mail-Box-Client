import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['quill'],
  },
   test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'], // or './vitest.setup.ts'
  },
})
