import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/estudos-ia/', // necessário para GitHub Pages (corrigido)
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.shims.d.ts',
    include: ['src/**/*.test.tsx', 'src/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'text-summary', 'html'],
      exclude: ['src/stories/**', 'src/__tests__/**'],
      thresholds: {
        lines: 25,
        functions: 41,
        branches: 40,
        statements: 25,
      }
    },
  },
})