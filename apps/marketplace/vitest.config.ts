import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Tests render components to markup, so they need the same automatic JSX runtime the app builds with.
// Stated here because the app's tsconfig is a solution file (`files: []` plus references), which the
// JSX transform does not follow to find `"jsx": "react-jsx"`.
export default defineConfig({
  plugins: [react()],
  oxc: { jsx: { runtime: 'automatic' } },
  test: { include: ['test/**/*.test.{ts,tsx}'] },
})
